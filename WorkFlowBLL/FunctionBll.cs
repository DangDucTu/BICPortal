using System.Collections.Generic;
using System.Linq;
using Utils;
using DataContext;
using EntityBLL;
using Config.Pattern;
using EntityBLL;

namespace WorkFlowBLL
{
    public class FunctionBll
    {
        #region Properties
        /// <summary>
        /// Thể hiện của đối tượng
        /// </summary>
        public static FunctionBll Instance
        {
            get
            {
                return Singleton<FunctionBll>.Instance;
            }
        }
        #endregion

        public List<uspFunctionGetListAllowAdminAccessResult> GetListFunctionAllowAdminAccess(int adminId)
        {
            return DbAdmin.ContentInstance.uspFunctionGetListAllowAdminAccess(adminId).ToList();
        }
        public uspFunctionGetByIdResult GetFunctionById(int functionId)
        {
            return DbAdmin.ContentInstance.uspFunctionGetById(functionId).FirstOrDefault();
        }
        /// <summary>
        /// Lấy tất cả các function với status !=2
        /// </summary>
        /// <returns></returns>
        public ClassExtend<string, uspFunctionGetListResult> FunctionGetList()
        {
            if (!AdminUtil.IsLogin) return null;
            var objReturn = new ClassExtend<string, uspFunctionGetListResult>();
            objReturn.Items = DbAdmin.ContentInstance.uspFunctionGetList().ToList();
            objReturn.TotalRecord = objReturn.Items.Count;
            objReturn.Info = null;
            return objReturn;
        }
        /// <summary>
        /// Thêm 1 function
        /// </summary>
        /// <param name="parentId">ID function cha: 0:root function</param>
        /// <param name="name">Tên function</param>
        /// <param name="url">url:""=null</param>
        /// <param name="icon">icon:""=null</param>
        /// <param name="order">thứ tự</param>
        /// <param name="status">Trạng thái: 0: khóa, 1: hoạt động, 2:xóa</param>
        public int InsertFunction(int? parentId, string name, string url, int order, int status, bool showInMenu)
        {
            if (!AdminUtil.IsLogin) return 0;
            var result = DbAdmin.ContentInstance.uspFunctionInsert(name, url, parentId, order, status, showInMenu);
            if (result > 0)
            {
                //new LogBll().InsertLog((int)Config.Enums.LogActionEnum.AddNew, "Thêm chức năng: " + name.ToString());
            }
            return result;

        }

        public bool IsChildFunction(int? functionId)
        {
            int result = DbAdmin.ContentInstance.uspFunctionCheckExistsChild(functionId);
            return (result == 1) ? true : false;
        }

        public int TotalChildLevel(int? functionId)
        {
            int childLevel = 0;
            if (IsChildFunction(functionId))
            {
                childLevel++;
                var objChildNode = DbAdmin.ContentInstance.uspFunctionGetListByParentId(functionId).ToList();
                foreach (var objitem in objChildNode)
                {
                    if (IsChildFunction(objitem.FunctionId))
                    {
                        childLevel += TotalChildLevel(objitem.FunctionId);
                    }
                }
            }
            return childLevel;
        }

        /// <summary>
        /// Lấy level của function (chỉ lấy đến level 2)
        /// </summary>
        /// <param name="functionId"></param>
        /// <returns></returns>
        public int LevelOfFunction(int? functionId)
        {
            if (functionId == 0 || functionId == -1) return -1;
            int level = 1;
            var parentId = DbAdmin.ContentInstance.uspFunctionGetById(functionId).FirstOrDefault().ParentId;
            if (parentId == 0) return level;
            return level + 1;
        }

        /// <summary>
        /// Kiểm tra có được update function trên hay không?
        /// </summary>
        /// <param name="functionId"></param>
        /// <param name="parentId"></param>
        /// <returns></returns>
        public bool isUpdate(int functionId, int? parentId)
        {
            var m_parentId = DbAdmin.ContentInstance.uspFunctionGetById(functionId).FirstOrDefault().ParentId;
            if (m_parentId == parentId) return true;
            int levelParent = LevelOfFunction(parentId);
            int childnode = TotalChildLevel(functionId) + 1;
            if (levelParent + childnode <= 3)
                return true;
            else
                return false;
        }

        /// <summary>
        /// Sừa function
        /// </summary>
        /// /// <param name="functionId">ID function</param>
        /// <param name="parentId">ID function cha: 0:root function</param>
        /// <param name="name">Tên function</param>
        /// <param name="url">url:""=null</param>
        /// <param name="icon">icon:""=null</param>
        /// <param name="order">thứ tự</param>
        /// <param name="status">Trạng thái: 0: khóa, 1: hoạt động, 2:xóa</param>
        public int UpdateFunction(int functionId, string name, string url, int? parentId, int order, int status, bool showInMenu)
        {
            if (!AdminUtil.IsLogin) return 0;
            if (isUpdate(functionId, parentId))
            {
                var result = DbAdmin.ContentInstance.uspFunctionUpdateByFunctionId(functionId, name, url, parentId, order, status, showInMenu);
                //if (result == 1)
                //{
                //    new LogBll().InsertLog((int)Config.Enums.LogActionEnum.Edit, "Sửa chức năng có mã: " + functionId.ToString());
                //}
                return result;
            }
            else
                return -2;

        }
        /// <summary>
        /// Thay đổi trạng thái Function
        /// </summary>
        /// <param name="functionId">id function</param>
        /// <param name="status">Trạng thái:0-Khóa; 1:Hoạt động; 2:Xóa </param>
        public int ChangeFunctionStatus(int functionId, int status = 0)
        {
            if (!AdminUtil.IsLogin) return 0;
            var result = DbAdmin.ContentInstance.uspFunctionUpdateStatus(functionId, status);
            if (result == 1)
            {
                var sLog = string.Format("Thay đổi trạng thái chức năng: id={0},status={1}", functionId, status);
                //new LogBll().InsertLog((int)Config.Enums.LogActionEnum.ChangeStatus, sLog);
            }
            return result;

        }
        public int DeleteFunction(int functionId)
        {
            if (!AdminUtil.IsLogin) return 0;
            if (DbAdmin.ContentInstance.uspFunctionCheckExistsChild(functionId) == 1)
                return -2;
            try
            {
                var result = DbAdmin.ContentInstance.uspFunctionDeleteById(functionId);
                //new LogBll().InsertLog((int)Config.Enums.LogActionEnum.Delete, "Xóa chức năng có mã: " + functionId.ToString());
                return 1;
            }
            catch
            {
                return -1;
            }

        }
        public List<uspFunctionGetListByRoleIdResult> GetListFunctionByRoleId(int roleId)
        {
            return DbAdmin.ContentInstance.uspFunctionGetListByRoleId(roleId).ToList();
        }
    }
}
