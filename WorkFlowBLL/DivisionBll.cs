using System.Collections.Generic;
using System.Linq;
using Utils;
using DataContext;
using EntityBLL;
using Config.Pattern;
using System;

namespace WorkFlowBLL
{
    public class DivisionBll
    {

        #region Properties
        /// <summary>
        /// Thể hiện của đối tượng
        /// </summary>
        public static DivisionBll Instance
        {
            get
            {
                return Singleton<DivisionBll>.Instance;
            }
        }
        #endregion


        public int InsertDivision(string name, string divisionCode, int status)
        {
            return DbDivision.ContentInstance.uspDivisionInsert(name, divisionCode, status);
        }

        public int UpdateDivision(int departmentId, string name, string divisionCode, int status)
        {
            return DbDivision.ContentInstance.uspDivisionUpdate(departmentId, name, divisionCode, status);
        }

        public int DeleteDeparment(int departmentId)
        {
            return DbDepartment.ContentInstance.uspDepartmentDelete(departmentId);
        }

        public List<uspDivisionGetListResult> GetListDivision(int status)
        {
            return DbDivision.ContentInstance.uspDivisionGetList(status).ToList();
        }

        public uspDivisionGetByIdResult GetInfoDivision(int departmentId)
        {
            return DbDivision.ContentInstance.uspDivisionGetById(departmentId).ToList().FirstOrDefault();
        }

        public List<uspAdminGetForDepartmentResult> GetAdminForDepartment(string name, int type)
        {
            return DbDepartment.ContentInstance.uspAdminGetForDepartment(name, type).ToList();
        }

        public List<uspDivisionGetNotInDivisionAdminListResult> GetListAdminNotInDivision()
        {
            return DbDivision.ContentInstance.uspDivisionGetNotInDivisionAdminList().ToList();
        }

        public int UpdateAdminDivision(string adminIds, int divisionId)
        {
            return DbDivision.ContentInstance.uspDivisionUpdateAdminDivisionId(adminIds, divisionId);
        }

        public List<uspDivisionGetAdminListByDivisionIdResult> GetListAdminByDivision(int departmentId)
        {
            return DbDivision.ContentInstance.uspDivisionGetAdminListByDivisionId(departmentId).ToList();
        }

        public int RemoveMemberDivision(int adminId)
        {
            return DbDivision.ContentInstance.uspDivisionRemoveMember(adminId);
        }

        public int CheckManagerDepartment(int adminId)
        {
            return DbDepartment.ContentInstance.uspDepartmentCheckManager(adminId);
        }
    }
}
