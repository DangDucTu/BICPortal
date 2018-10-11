using System;
using System.Collections.Generic;
using System.Linq;
using Config.Pattern;
using EntityBLL;
using DataContext;
using Utils;
using System.Web;

namespace WorkFlowBLL
{
    public class AdminBll
    {
        #region Properties
        /// <summary>
        /// Thể hiện của đối tượng
        /// </summary>
        public static AdminBll Instance
        {
            get
            {
                return Singleton<AdminBll>.Instance;
            }
        }
        #endregion

        #region Function
        /// <summary>
        /// Lấy danh sách chức năng
        /// </summary>
        /// <param name="shopId"></param>
        /// <returns></returns>
        public List<uspFunctionGetListResult> FunctionGetList()
        {
            return DbAdmin.ContentInstance.uspFunctionGetList().ToList();
        }

        public List<ClassExtend<uspFunctionGetListResult, uspFunctionGetListResult>> GetMenuShopGroup(int shopId)
        {
            var rel = new List<ClassExtend<uspFunctionGetListResult, uspFunctionGetListResult>>();
            var cates = FunctionGetList();
            foreach (var c in cates.Where(cate => (cate.ParentId ?? -1) < 0))
            {
                var r = new ClassExtend<uspFunctionGetListResult, uspFunctionGetListResult>();
                r.Info = c;
                r.Items = cates.Where(child => child.ParentId == c.FunctionId).ToList();
                rel.Add(r);
            }
            return rel;
        }
        #endregion

        #region Login
        /// <summary>
        /// Thêm Log
        /// </summary>
        /// <param name="action"></param>
        /// <param name="description"></param>
        public void InsertLog(int action, string description)
        {
            try
            {
                int logByUserId = AdminUtil.AdminId;
                string page = HttpContext.Current.Request.Headers["Referer"].Substring(Config.Global.Settings.WebRoot.Length);
                DbAdmin.ContentInstance.uspLogInsert(page, action, description, logByUserId);
            }
            catch (Exception)
            {
                throw;
            }
        }

        /// <summary>
        /// Check Login
        /// </summary>
        /// <param name="userName"></param>
        /// <param name="password"></param>
        /// <returns></returns>
        public bool CheckLogin(string userName, string password)
        {
            string passwordMd5 = EncryptionUtil.GetMd5(password);
            var ret = DbAdmin.ContentInstance.uspAdminCheckLogin(userName, passwordMd5);
            if (ret > 0)
            {
                var objUserInfo = DbAdmin.ContentInstance.uspAdminGetInfoLogin(userName, passwordMd5).FirstOrDefault();
                if (objUserInfo == null) return false;
                int departmentId = DepartmentBll.Instance.CheckManagerDepartment(objUserInfo.AdminId);
                AdminUtil.SetAdminInfo(objUserInfo.AdminId, userName, objUserInfo.RoleId.Value, departmentId);
                InsertLog((int)Config.Enums.LogActionEnum.Login, "[" + AdminUtil.AdminName + "]" + " Đăng nhập hệ thống");
                return true;
            }
            return false;
            //return true;
        }

        #endregion

        #region Admin
        /// <summary>
        /// Lấy danh sách Admin
        /// </summary>
        /// <returns></returns>
        public List<uspAdminGetListResult> AdminGetList()
        {
            return DbAdmin.ContentInstance.uspAdminGetList().ToList();
        }

        /// <summary>
        /// Lấy thông tin Admin
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public uspAdminGetByIdResult AdminGetInfoById(int id)
        {
            return DbAdmin.ContentInstance.uspAdminGetById(id).FirstOrDefault();
        }

        public int AdminDelete(int id)
        {
            return DbAdmin.ContentInstance.uspAdminDelete(id);
        }

        public int AdminUpdateStatus(int id, int status)
        {
            return DbAdmin.ContentInstance.uspAdminUpdateStatus(id, status);
        }

        public int AdminEdit(int adminId, string userName, string password, int status, string fullName)
        {
            string passwordMd5 = EncryptionUtil.GetMd5(password);
            return DbAdmin.ContentInstance.uspAdminEdit(adminId, userName, passwordMd5, false, status, fullName, AdminUtil.AdminId);
        }

        public int AdminChangePass(int adminId, string passOld, string passNew)
        {
            string passOldMd5 = EncryptionUtil.GetMd5(passOld);
            string passNewMd5 = EncryptionUtil.GetMd5(passNew);
            return DbAdmin.ContentInstance.uspAdminChangePassword(adminId, passOldMd5, passNewMd5);
        }

        #endregion

        #region PhanQuyen
        /// <summary>
        /// Lấy thông tin Admin theo AdminId
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public uspAdminGetByIdResult GetAdminById(int id)
        {
            return DbAdmin.ContentInstance.uspAdminGetById(id).FirstOrDefault();
        }

        /// <summary>
        /// Lấy danh sách Admin không nằm trong Role
        /// Author: Mauthanh.tran
        /// </summary>
        /// <param name="userName"></param>
        /// <param name="roleId"></param>
        /// <param name="currentPage"></param>
        /// <param name="pageSize"></param>
        /// <returns></returns>
        public List<uspAdminGetListNotInRoleResult> GetListAdminNotInRole(string userName, int roleId)
        {
            return DbAdmin.ContentInstance.uspAdminGetListNotInRole(userName, roleId).ToList();
        }
        /// <summary>
        /// Lấy danh sách Admin nằm trong Role
        /// </summary>
        /// <param name="roleId"></param>
        /// <returns></returns>
        public List<uspAdminGetListByRoleIdResult> GetAdminByRoleId(int roleId)
        {
            return DbAdmin.ContentInstance.uspAdminGetListByRoleId(roleId).ToList();
        }
        /// <summary>
        /// Lấy danh sách Admin
        /// </summary>
        /// <returns></returns>
        public List<uspAdminGetListResult> GetAdminList()
        {
            return DbAdmin.ContentInstance.uspAdminGetList().ToList();
        }

        /// <summary>
        /// Thêm người quản trị
        /// </summary>
        /// <param name="userName"></param>
        /// <param name="password"></param>
        /// <param name="fullName"></param>
        /// <param name="email"></param>
        /// <param name="phone"></param>
        /// <param name="sex"></param>
        /// <param name="description"></param>
        /// <param name="status"></param>
        /// <param name="isAdmin"></param>
        /// <returns>0: Chưa Login,-2: Tài khoản đã tồn tại, -1: Lỗi, 1: Thành công</returns>
        public int InsertAdmin(string userName, string password, string fullName, int createById, int status, bool isAdmin, int roleId, int typeAdmin)
        {
            if (!AdminUtil.IsLogin) return 0;
            //TODO: Set Password default 123456
            password = EncryptionUtil.GetMd5("123456");
            var result = DbAdmin.ContentInstance.uspAdminInsert(userName, password, isAdmin, status, fullName, AdminUtil.AdminId, roleId, typeAdmin);
            return result;
        }
        /// <summary>
        /// Sửa thông tin người quản trị
        /// </summary>
        /// <param name="adminId"></param>
        /// <param name="fullName"></param>
        /// <param name="email"></param>
        /// <param name="phone"></param>
        /// <param name="sex"></param>
        /// <param name="description"></param>
        /// <param name="status"></param>       
        /// <returns>0: Chưa Login,-2: Tài khoản đã tồn tại, -1: Lỗi, 1: Thành công</returns>
        public int UpdateAdmin(int adminId, string fullName, int status = 0)
        {
            if (!AdminUtil.IsLogin) return 0;
            var result = DbAdmin.ContentInstance.uspAdminUpdateInfo(adminId, status, fullName);
            //if (result > 1)
            //{
            //    new LogBll().InsertLog((int)Config.Enums.LogActionEnum.Edit, "Sửa Admin [adminId:" + adminId.ToString() + "][fullName:" + fullName + "][email:" + email + "][phone:" + phone + "][sex:" + sex.ToString() + "][status:" + status.ToString() + "]");
            //}
            return result;
        }

        /// <summary>
        /// Cập nhật thông tin cá nhân
        /// </summary>
        /// <returns>
        /// 0: NOT LOGIN
        /// -1: Lỗi
        /// </returns>
        public int UpdateMyProfile(string fullName)
        {
            if (!AdminUtil.IsLogin) return 0;
            var adminId = AdminUtil.AdminId;
            var adminInfo = GetAdminById(adminId);
            if (adminInfo == null)
                return -1;
            int? status = adminInfo.Status;
            var result = DbAdmin.ContentInstance.uspAdminUpdateInfo(adminId, status, fullName);
            //if (result == 1)
            //{
            //    new LogBll().InsertLog((int)Config.Enums.LogActionEnum.Edit, "Cập nhật thông tin cá nhân [adminId:" + adminId.ToString() + "][fullName:" + fullName + "][email:" + email + "][phone:" + phone + "]");
            //}
            return result;
        }

        /// <summary>
        /// Xóa tài khoản: Nếu admin chưa từng login vào thì xóa hẳn db, còn không sẽ đổi trạng thái 2
        /// </summary>
        /// <param name="adminId"></param>
        /// <returns>0: Chưa Login, -1: Lỗi, 1: Thành công</returns>
        public int DeleteAdmin(int adminId)
        {
            if (!AdminUtil.IsLogin) return 0;
            var result = DbAdmin.ContentInstance.uspAdminDelete(adminId);
            //if (result == 1)
            //{
            //    new LogBll().InsertLog((int)Config.Enums.LogActionEnum.Delete, "Xóa Admin [adminId:" + adminId.ToString() + "]");
            //}
            return result;
        }

        /// <summary>
        /// Xác định có quyền trên chức năng hay không?
        /// </summary>
        public static bool IsPermission(string funtion)
        {
            if (funtion.IndexOf("?") != -1)
                funtion = funtion.Substring(0, funtion.IndexOf("?", 0)).ToLower();

            if (!String.IsNullOrEmpty(AdminUtil.Permission) && !funtion.Equals(string.Empty))
            {
                var permissionList = AdminUtil.Permission.Split('|');
                return AdminUtil.Permission.Split('|').Any(c => c.Equals(funtion));
            }
            return false;
        }

        /// <summary>
        /// Thiết lập lại mật khẩu cho Admin
        /// </summary>
        /// <param name="userName"></param>
        /// <param name="password"></param>
        /// <returns>
        /// 0: NOT Login
        /// -1: Không Set được mật khẩu
        /// Lớn hơn 0: Thành công
        /// </returns>
        public int SetPassword(string userName, string password)
        {
            if (!AdminUtil.IsLogin) return 0;
            password = Utils.EncryptionUtil.GetMd5(password);
            var retValue = DbAdmin.ContentInstance.uspAdminSetPassword(userName, password);
            if (retValue <= 0) return -1;
            return retValue;
        }

        /// <summary>
        /// Đổi mật khẩu
        /// </summary>
        /// <returns>
        /// 0: Chưa Login
        /// -1: Không đúng Username hoặc password
        /// 1: Thành công
        /// </returns>
        public int ChangePassword(string userName, string oldPassword, string newPassword)
        {
            if (!AdminUtil.IsLogin) return 0;
            oldPassword = Utils.EncryptionUtil.GetMd5(oldPassword);
            newPassword = Utils.EncryptionUtil.GetMd5(newPassword);
            var retValue = DbAdmin.ContentInstance.uspAdminChangePasswordOther(userName, oldPassword, newPassword);
            return retValue;
        }

        /// <summary>
        /// Thay đổi trạng thái hoạt động của admin
        /// </summary>
        /// <param name="adminId"></param>
        /// <param name="status">Trạng thái: 0 - Bị Khóa, 1 - Hoạt động, 2 - Xóa</param>
        /// <returns>0: chưa Login, -1: Lỗi, 1: Thành công</returns>
        public int ChangeStatus(int adminId, int status)
        {
            if (!AdminUtil.IsLogin) return 0;
            var result = DbAdmin.ContentInstance.uspAdminUpdateStatus(adminId, status);
            //if (result == 1)
            //{
            //    new LogBll().InsertLog((int)Config.Enums.LogActionEnum.ChangeStatus, "Thay đổi trạng thái cho Admin [adminId:" + adminId.ToString() + "][status:" + status.ToString() + "]");
            //}
            return result;
        }
        #endregion

        #region TaiKhoan
        public int RegistryAccountInsert(string name, string password, string fullName, string address, string mobile, int sex, string email)
        {
            string passwordMd5 = EncryptionUtil.GetMd5(password);
            var result = DbAdmin.ContentInstance.uspAdminRegistryInsert(name, passwordMd5, fullName, address, mobile, sex, email);
            if (result > 0)
            {
                var objUserInfo = AdminGetInfoByName(name);
                if (objUserInfo != null)
                {
                    UserUtil.SetUserLogin(objUserInfo.AdminId, name);
                }
            }
            return result;
        }

        public uspAdminGetInfoByNameResult AdminGetInfoByName(string name)
        {
            return DbAdmin.ContentInstance.uspAdminGetInfoByName(name).FirstOrDefault();
        }

        public int RegistryAccountCheckLogin(string name, string password)
        {
            string passwordMd5 = EncryptionUtil.GetMd5(password);
            var ret = DbAdmin.ContentInstance.uspAdminRegistryCheckLogin(name, passwordMd5);
            if (ret > 0)
            {
                var objUserInfo = AdminGetInfoByName(name);
                if (objUserInfo != null)
                {
                    UserUtil.SetUserLogin(objUserInfo.AdminId, name);
                }
                else
                {
                    return -1;
                }
            }
            return ret;
        }
        #endregion
    }
}
