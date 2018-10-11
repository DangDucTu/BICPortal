using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Config.Pattern;
using Utils;
using DataContext;

namespace WorkFlowBLL
{
    /// <summary>
    /// Lớp các hàm xử lý với quyền của các chức năng
    /// Author: trung.pham
    /// </summary>
    public class RoleFunctionBll
    {
        #region Properties
        /// <summary>
        /// Thể hiện của đối tượng
        /// </summary>
        public static RoleFunctionBll Instance
        {
            get
            {
                return Singleton<RoleFunctionBll>.Instance;
            }
        }
        #endregion
        /// <summary>
        /// Xóa 1 Role của 1 function
        /// Author: mauthanh.tran
        /// </summary>
        /// <param name="roleId"></param>
        /// <param name="functionId"></param>
        /// <returns></returns>
        public int DeleteRoleOfFunction(int roleId, int functionId)
        {
            if (!AdminUtil.IsLogin) return 0;
            bool isDelete = true;
            var objListFunction = DbAdmin.ContentInstance.uspFunctionGetListByParentId(functionId);
            foreach (var objfunc in objListFunction)
            {
                var itemId = objfunc.FunctionId;
                if (DbAdmin.ContentInstance.uspRoleFunctionCheckExist(roleId, itemId) == 1)
                {
                    isDelete = false;
                    break;
                }
            }
            if (isDelete)
            {
                try
                {
                    DbAdmin.ContentInstance.uspRoleFunctionDelete(roleId, functionId);
                    //new LogBll().InsertLog((int)Config.Enums.LogActionEnum.Delete, "Xóa chức năng trong nhóm chức năng [functionId:" + functionId.ToString() + "][roleId:" + roleId.ToString() + "]");
                    return 1;
                }
                catch
                {
                    return -1;
                }
            }
            return -2;

        }

        /// <summary>
        /// Thêm chức năng vào danh sách nhóm chức năng
        /// Author: MauThanh.tran
        /// </summary>
        /// <param name="functionId"></param>
        /// <param name="roleIds"></param>
        /// <returns>-1: Lỗi; 1:Thành công</returns>
        public int InsertListRoleFunction(int functionId, string roleIds)
        {
            if (!AdminUtil.IsLogin) return 0;
            var result = DbAdmin.ContentInstance.uspRoleFunctionInsertByRoleList(functionId, roleIds);
            //if (result > 0)
            //{
            //    new LogBll().InsertLog((int)Config.Enums.LogActionEnum.AddNew, "Thêm chức năng vào nhóm chức năng [functionId: " + functionId.ToString() + "][roleIds:" + roleIds.ToString() + "]");
            //}
            return result;
        }

        public int InsertRoleFunctionById(int functionId, int roleId)
        {
            if (!AdminUtil.IsLogin) return 0;
            var objFunction = DbAdmin.ContentInstance.uspFunctionGetById(functionId).FirstOrDefault();
            int parentId = objFunction == null ? 0 : (objFunction.ParentId.HasValue ? objFunction.ParentId.Value : 0);
            if (parentId > 0)
            {
                if (DbAdmin.ContentInstance.uspRoleFunctionCheckExist(roleId, parentId) == 0)
                    InsertRoleFunctionById(parentId, roleId);
            }
            if (DbAdmin.ContentInstance.uspRoleFunctionCheckExist(roleId, functionId) == 0)
            {
                DbAdmin.ContentInstance.uspRoleFunctionInsert(functionId, roleId);
            }
            //new LogBll().InsertLog((int)Config.Enums.LogActionEnum.AddNew, "Thêm chức năng vào nhóm chức năng [functionId: " + functionId.ToString() + "][roleIds:" + roleId.ToString() + "]");
            return 1;
        }

    }
}
