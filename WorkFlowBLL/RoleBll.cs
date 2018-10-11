using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Config.Pattern;
using Utils;
using DataContext;

namespace WorkFlowBLL
{
    public class RoleBll
    {
        #region Properties
        /// <summary>
        /// Thể hiện của đối tượng
        /// </summary>
        public static RoleBll Instance
        {
            get
            {
                return Singleton<RoleBll>.Instance;
            }
        }
        #endregion
        /// <summary>
        /// Lấy thông tin về Nhóm người dùng
        /// </summary>
        /// <param name="roleId"> ID của nhóm người dùng</param>
        /// <returns></returns>
        /// 
        public uspRoleGetByIdResult GetRoleById(int roleId)
        {
            if (!AdminUtil.IsLogin) return null;
            return DbAdmin.ContentInstance.uspRoleGetById(roleId).FirstOrDefault();
        }
        /// <summary>
        /// Lấy danh sách nhóm người dùng
        /// </summary>
        /// <returns></returns>
        public List<uspRoleGetListResult> GetListRole()
        {
            if (!AdminUtil.IsLogin) return null;
            return DbAdmin.ContentInstance.uspRoleGetList().ToList();
        }
        public List<uspRoleGetListTaiKhoanResult> GetListRoleOther()
        {
            if (!AdminUtil.IsLogin) return null;
            return DbAdmin.ContentInstance.uspRoleGetListTaiKhoan().ToList();
        }
        /// <summary>
        /// Thêm mới nhóm người dùng
        /// </summary>
        /// <param name="name">Tên nhóm</param>
        /// <param name="description">Miêu tả</param>
        /// <param name="status">Trạng thái:0-Khóa; 1:Hoạt động; 2:Xóa </param>
        public int InsertRole(string name, string description, int status = 0)
        {
            if (!AdminUtil.IsLogin) return 0;
            var result = DbAdmin.ContentInstance.uspRoleInsert(name, status, description);
            //if (result == 1)
            //{
            //    new LogBll().InsertLog((int)Config.Enums.LogActionEnum.AddNew, "Thêm nhóm chức năng [name: " + name + "][status:" + status + "]");
            //}
            return result;
        }
        /// <summary>
        /// Cập nhật nhóm người dùng
        /// </summary>
        /// <param name="roleId"></param>
        /// <param name="name">Tên nhóm</param>
        /// <param name="description">Miêu tả</param>       
        /// <param name="status">Trạng thái:0-Khóa; 1:Hoạt động; 2:Xóa </param>
        public int UpdateRole(int roleId, string name, string description, int status)
        {
            if (!AdminUtil.IsLogin) return 0;
            var result = DbAdmin.ContentInstance.uspRoleUpdateInfo(roleId, name, status, description);
            //if (result == 1)
            //{
            //    new LogBll().InsertLog((int)Config.Enums.LogActionEnum.Edit, "Sửa nhóm chức năng [roleId: " + roleId.ToString() + "][name:" + name + "][status:" + status + "]");
            //}
            return result;
        }
        /// <summary>
        /// Thay đổi trạng thái Role
        /// </summary>
        /// <param name="roleId"></param>
        /// <param name="status">Trạng thái:0-Khóa; 1:Hoạt động; 2:Xóa </param>
        public int ChangeStatus(int roleId, int status = 0)
        {
            if (!AdminUtil.IsLogin) return 0;
            var result = DbAdmin.ContentInstance.uspRoleUpdateStatus(roleId, status);
            //if (result == 1)
            //{
            //    new LogBll().InsertLog((int)Config.Enums.LogActionEnum.ChangeStatus, "Thay đổi trạng thái nhóm chức năng [roleId: " + roleId.ToString() + "][status:" + status.ToString() + "]");
            //}
            return result;
        }
        /// <summary>
        /// Xóa 1 Role
        /// </summary>
        /// <param name="roleId"></param>
        /// <returns></returns>
        public int DeleteRole(int roleId)
        {
            if (!AdminUtil.IsLogin) return 0;
            var result = DbAdmin.ContentInstance.uspRoleDelete(roleId);
            //if (result == 1)
            //{
            //    new LogBll().InsertLog((int)Config.Enums.LogActionEnum.Delete, "Xóa nhóm chức năng [roleId: " + roleId.ToString() + "]");
            //}
            return result;

        }
        /// <summary>
        /// Lấy danh sách nhóm quyền theo adminId
        /// Author:trung.pham
        /// </summary>
        /// <param name="adminId"></param>
        /// <returns></returns>
        public List<uspRoleGetListByAdminIdResult> GetRoleListByAdminId(int adminId)
        {
            if (!AdminUtil.IsLogin) return null;
            return DbAdmin.ContentInstance.uspRoleGetListByAdminId(adminId).ToList();
        }
        /// <summary>
        /// Lây danh sách nhóm quyền chưa phân cho AdminId 
        /// Author:trung.pham
        /// </summary>
        /// <param name="adminId"></param>
        /// <returns></returns>
        public List<uspRoleGetListNotInAdminResult> GetRoleListNotInAdmin(int adminId)
        {
            if (!AdminUtil.IsLogin) return null;
            return DbAdmin.ContentInstance.uspRoleGetListNotInAdmin(adminId).ToList();
        }
        /// <summary>
        /// Xóa nhóm quyền theo AdminId
        /// Author:trung.pham
        /// </summary>
        /// <param name="adminId"></param>
        /// <param name="roleIds">Danh sách roleIds phân cách bằng dấu ,</param>
        /// <returns>0: Chưa Login, -1: Lỗi, 1: Thành công</returns>
        public int DeleteRoleByAdminId(int adminId, string roleIds)
        {
            if (!AdminUtil.IsLogin) return 0;
            var result = DbAdmin.ContentInstance.uspPermissionDeleteByRoleList(adminId, roleIds);
            //if (result > 0)
            //{
            //    new LogBll().InsertLog((int)Config.Enums.LogActionEnum.Delete, "Xóa nhóm quyền của Admin có mã:" + adminId.ToString());
            //}
            return result;
        }

        /// <summary>
        /// Lấy ra danh sách Role chưa FunctionId
        /// Author: Mauthanh.tran
        /// </summary>
        /// <param name="functionId"></param>
        /// <returns></returns>
        public List<uspRoleGetListByFunctionIdResult> GetListRoleByFunctionId(int functionId)
        {
            if (!AdminUtil.IsLogin) return null;
            return DbAdmin.ContentInstance.uspRoleGetListByFunctionId(functionId).ToList();
        }
        /// <summary>
        /// Lấy ra danh sách các Nhóm chức năng không chứa FunctionId
        /// Author: MauThanh.Tran
        /// </summary>
        /// <param name="functionId"></param>
        /// <returns></returns>
        public List<uspRoleGetListNotInFunctionResult> GetListRoleNotInFunction(int functionId)
        {
            if (!AdminUtil.IsLogin) return null;
            return DbAdmin.ContentInstance.uspRoleGetListNotInFunction(functionId).ToList();
        }
    }
}
