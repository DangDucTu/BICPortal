using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DataContext;
using Utils;
using Config.Pattern;

namespace WorkFlowBLL
{
    public class PermissionBll
    {
        #region Properties
        /// <summary>
        /// Thể hiện của đối tượng
        /// </summary>
        public static PermissionBll Instance
        {
            get
            {
                return Singleton<PermissionBll>.Instance;
            }
        }
        #endregion

        /// <summary>
        /// Xóa nhóm quyền theo danh sách roleIds
        /// Author:hoan.trinh
        /// </summary>
        /// <param name="adminId"></param>
        /// <param name="roleIds">Danh sách roleIds phân cách bằng dấu ,</param>
        /// <returns>-1: Lỗi, 1: Thành công</returns>
        public int DeletePermisstionByRoleList(int adminId, string roleIds)
        {
            if (!AdminUtil.IsLogin) return 0;
            var result = DbAdmin.ContentInstance.uspPermissionDeleteByRoleList(adminId, roleIds);
            //if (result > 0)
            //{
            //    new LogBll().InsertLog((int)Config.Enums.LogActionEnum.Delete, "Xóa quyền [roleIds: " + roleIds + "][adminId:" + adminId.ToString() + "]");
            //}
            return result;
        }
        /// <summary>
        /// Xóa nhóm quyền theo danh sách adminIds
        /// </summary>
        /// <param name="roleId"></param>
        /// <param name="adminIds"></param>
        /// <returns></returns>
        public int DeletePermisstionByAdminList(int roleId, string adminIds)
        {
            if (!AdminUtil.IsLogin) return 0;
            var result = DbAdmin.ContentInstance.uspPermissionDeleteByAdminList(adminIds, roleId);
            //if (result > 0)
            //{
            //    new LogBll().InsertLog((int)Config.Enums.LogActionEnum.Delete, "Xóa quyền [roleId: " + roleId.ToString() + "][adminIds:" + adminIds + "]");
            //}
            return result;
        }
        /// <summary>
        /// Thêm nhóm quyền theo danh sách roleIds
        /// Author:trung.pham
        /// </summary>
        /// <param name="adminId"></param>
        /// <param name="roleIds">Danh sách roleIds phân cách bằng dấu ,</param>
        /// <returns>-1: Lỗi, 1: Thành công</returns>
        public int InsertPermissionByRoleList(int adminId, string roleIds)
        {
            if (!AdminUtil.IsLogin) return 0;
            var result = DbAdmin.ContentInstance.uspPermissionInsertByRoleList(adminId, roleIds);
            //if (result > 0)
            //{
            //    new LogBll().InsertLog((int)Config.Enums.LogActionEnum.AddNew, "Thêm quyền [roleIds: " + roleIds + "][adminId:" + adminId.ToString() + "]");
            //}
            return result;
        }
        public int DeletePermisionByListAdmin(int roleId, string listAdmin)
        {
            if (!AdminUtil.IsLogin) return 0;
            var result = DbAdmin.ContentInstance.uspPermissionDeleteByAdminList(listAdmin, roleId);
            //if (result > 0)
            //{
            //    new LogBll().InsertLog((int)Config.Enums.LogActionEnum.Delete, "Xóa quyền [roleId:" + roleId.ToString() + "][adminIds: " + listAdmin + "]");
            //}
            return result;
        }
        public int DeletePermision(int roleId, int adminId)
        {
            if (!AdminUtil.IsLogin) return 0;
            var result = DbAdmin.ContentInstance.uspPermissionDelete(adminId, roleId);
            //if (result > 0)
            //{
            //    new LogBll().InsertLog((int)Config.Enums.LogActionEnum.Delete, "Xóa quyền [roleId: " + roleId.ToString() + "][adminId: " + adminId.ToString() + "]");
            //}
            return result;
        }
        /// <summary>
        /// Thêm nhóm quyền cho danh sách admin
        /// </summary>
        /// <param name="roleId"></param>
        /// <param name="listAdmin"></param>
        /// <returns></returns>
        public int AddPermisionForListAdmin(int roleId, string listAdmin)
        {
            if (!AdminUtil.IsLogin) return 0;
            return DbAdmin.ContentInstance.uspPermissionInsertByAdminList(listAdmin, roleId);
        }

        /// <summary>
        /// Kiểm tra người quản trị có được phép vào URL hiện tại không?
        /// </summary>
        /// <param name="adminId"></param>
        /// <param name="url"></param>
        /// <returns></returns>
        public bool IsAllowAccessUrl(string url)
        {
            if (!AdminUtil.IsLogin) return false;
            return DbAdmin.ContentInstance.uspPermissionCheckUrlAllowAccess(AdminUtil.AdminId, url) == 1;
        }
    }
}