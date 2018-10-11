using System.Collections.Generic;
using System.Linq;
using Utils;
using DataContext;
using EntityBLL;
using Config.Pattern;
using System;

namespace WorkFlowBLL
{
    public class CodeManagementBll
    {
        #region Properties
        /// <summary>
        /// Thể hiện của đối tượng
        /// </summary>
        public static CodeManagementBll Instance
        {
            get
            {
                return Singleton<CodeManagementBll>.Instance;
            }
        }
        #endregion

        #region Report

        public uspCodeListGetInfoResult GetInfoCode(int reportId)
        {
            return DbCodeManagement.ContentInstance.uspCodeListGetInfo(reportId).ToList().FirstOrDefault();
        }


        public int InsertCodeList(string code, string name, string segment, string account, string effectiveDate, string requester, int status, int field, int type)
        {
            IFormatProvider culture = new System.Globalization.CultureInfo("en-US", true);
            return DbCodeManagement.ContentInstance.uspCodeListInsert(account, code, name, type, field, segment, Convert.ToDateTime(effectiveDate + " 18:00:00", culture), requester, status);
        }

        public int UpdateCode(int codeId, string code, string name, string segment, string account, string effectiveDate, string requester, int status, int field, int type)
        {
            IFormatProvider culture = new System.Globalization.CultureInfo("en-US", true);
            return DbCodeManagement.ContentInstance.uspCodeListEdit(account, codeId, name, type, field, segment, Convert.ToDateTime(effectiveDate + " 18:00:00", culture), requester, status);
        }

        public List<uspCodeListCountResult> GetOverviewCodeManagement(string account)
        {
            return DbCodeManagement.ContentInstance.uspCodeListCount(account).ToList();
        }

        public ClassExtend<int, uspCodeListGetListResult> GetListCode(string account, int type, int status, int field, string requester, string segment, DateTime fromDate, DateTime toDate, int page, int pagesize)
        {
            int? totalRecord = 0;
            ClassExtend<int, uspCodeListGetListResult> item = new ClassExtend<int, uspCodeListGetListResult>();
            item.Items = DbCodeManagement.ContentInstance.uspCodeListGetList(status, type, field, requester, segment, fromDate, toDate, pagesize, page, ref totalRecord).ToList();
            item.TotalRecord = totalRecord.Value;
            return item;
        }

        public List<uspCodeListGetTypeResult> GetListType(int fieldId)
        {
            return DbCodeManagement.ContentInstance.uspCodeListGetType(fieldId).ToList();
        }

        public List<uspCodeListGetFieldListResult> GetListField()
        {
            return DbCodeManagement.ContentInstance.uspCodeListGetFieldList().ToList();
        }
        #endregion

    }
}
