using System.Collections.Generic;
using System.Linq;
using Utils;
using DataContext;
using EntityBLL;
using Config.Pattern;
using System;

namespace WorkFlowBLL
{
    public class DepartmentBll
    {

        #region Properties
        /// <summary>
        /// Thể hiện của đối tượng
        /// </summary>
        public static DepartmentBll Instance
        {
            get
            {
                return Singleton<DepartmentBll>.Instance;
            }
        }
        #endregion


        public int InsertDepartment(string name, int adminId, string description, int status)
        {
            return DbDepartment.ContentInstance.uspDepartmentInsert(name, adminId, description, status);
        }

        public int UpdateDepartment(int departmentId, string name, int adminId, string description, int status)
        {
            return DbDepartment.ContentInstance.uspDepartmentUpdate(departmentId, name, adminId, description, status);
        }

        public int DeleteDeparment(int departmentId)
        {
            return DbDepartment.ContentInstance.uspDepartmentDelete(departmentId);
        }

        public List<uspDepartmentGetListResult> GetListDepartment(int status)
        {
            return DbDepartment.ContentInstance.uspDepartmentGetList(status).ToList();
        }

        public uspDepartmentGetByIdResult GetInfoDepartment(int departmentId)
        {
            return DbDepartment.ContentInstance.uspDepartmentGetById(departmentId).ToList().FirstOrDefault();
        }

        public List<uspAdminGetForDepartmentResult> GetAdminForDepartment(string name, int type)
        {
            return DbDepartment.ContentInstance.uspAdminGetForDepartment(name, type).ToList();
        }

        public List<uspAdminNotInDepartmentGetListResult> GetListAdminNotInDepartment()
        {
            return DbDepartment.ContentInstance.uspAdminNotInDepartmentGetList().ToList();
        }

        public int UpdateAdminDepartment(string adminIds, int departmentId)
        {
            return DbDepartment.ContentInstance.uspAdminUpdateDepartment(adminIds, departmentId);
        }

        public List<uspAdminGetListByDepartmentResult> GetListAdminByDepartment(int departmentId)
        {
            return DbDepartment.ContentInstance.uspAdminGetListByDepartment(departmentId).ToList();
        }

        public int RemoveMemberDepartment(int adminId)
        {
            return DbDepartment.ContentInstance.uspDepartmentRemoveMember(adminId);
        }

        public int CheckManagerDepartment(int adminId)
        {
            return DbDepartment.ContentInstance.uspDepartmentCheckManager(adminId);
        }
    }
}
