using System.Collections.Generic;
using System.Linq;
using Utils;
using DataContext;
using EntityBLL;
using Config.Pattern;
using System;

namespace WorkFlowBLL
{
    public class ReportBll
    {
        #region Properties
        /// <summary>
        /// Thể hiện của đối tượng
        /// </summary>
        public static ReportBll Instance
        {
            get
            {
                return Singleton<ReportBll>.Instance;
            }
        }
        #endregion

        #region Report

        public int InsertReport(int reportListId, string deadline)
        {
            IFormatProvider culture = new System.Globalization.CultureInfo("en-US", true);
            return DbReport.ContentInstance.uspReportInsert(reportListId, Convert.ToDateTime(deadline + " 18:00:00", culture));
        }

        public int UpdateStatusReport(int reportId, int status, string description)
        {
            return DbReport.ContentInstance.uspReportUpdateStatus(reportId, status, description);
        }

        public int DeleteReport(int reportId)
        {
            return DbReport.ContentInstance.uspReportDelete(reportId);
        }

        public int UploadReport(int reportId, string fileName, string accountUpload, string timeKeyData, string reportLink)
        {
            return DbReport.ContentInstance.uspReportUpload(reportId, fileName, accountUpload, timeKeyData, reportLink);
        }

        public uspReportGetByIdResult GetInfoReport(int reportId)
        {
            return DbReport.ContentInstance.uspReportGetById(reportId).ToList().FirstOrDefault();
        }

        public ClassExtend<int, uspReportGetListResult> GetListReport(string reportName, string pic, int reportType, int reportUpdateType, int managerId, int frequency, string accountName, DateTime fromDate, DateTime toDate, int isComplete, int status, int isBackup, int page, int pageSize)
        {
            int? totalRecord = 0;
            ClassExtend<int, uspReportGetListResult> Item = new ClassExtend<int, uspReportGetListResult>();
            Item.Items = DbReport.ContentInstance.uspReportGetList(reportName, pic, reportType, reportUpdateType, managerId, frequency, accountName, fromDate, toDate, isComplete, status, isBackup, page, pageSize, ref totalRecord).ToList();
            Item.TotalRecord = totalRecord.Value;
            return Item;
        }

        public ClassExtend<int, uspReportGetListForViewResult> GetListReportForView(string reportName, string accountName, int deparmentId, DateTime fromDate, DateTime toDate, int page, int pageSize)
        {
            int? totalRecord = 0;
            ClassExtend<int, uspReportGetListForViewResult> Item = new ClassExtend<int, uspReportGetListForViewResult>();
            Item.Items = DbReport.ContentInstance.uspReportGetListForView(reportName, accountName, deparmentId, fromDate, toDate, page, pageSize, ref totalRecord).ToList();
            Item.TotalRecord = totalRecord.Value;
            return Item;
        }

        public ClassExtend<int, uspReportGetListForClientResult> GetListReportForClient(DateTime fromDate, DateTime toDate, int page, int pageSize)
        {
            int? totalRecord = 0;
            ClassExtend<int, uspReportGetListForClientResult> Item = new ClassExtend<int, uspReportGetListForClientResult>();
            Item.Items = DbReport.ContentInstance.uspReportGetListForClient(Utils.AdminUtil.AdminId, fromDate, toDate, page, pageSize, ref totalRecord).ToList();
            Item.TotalRecord = totalRecord.Value;
            return Item;
        }

        #endregion

        #region ReportList

        public int InsertReportList(string requestId, string account, string accountBackup, int isAuto, string toolOfReport)
        {
            return DbReport.ContentInstance.uspReportListInsert(requestId, account, accountBackup, isAuto, toolOfReport);
        }

        public int UpdateReportList(int reportListId, string requestId, string account, string accountBackup, int isAuto, string toolOfReport)
        {
            return DbReport.ContentInstance.uspReportListUpdate(reportListId, requestId, account, accountBackup, isAuto, toolOfReport);
        }

        public List<uspReportListGetListResult> GetListReportList(string reportName, int frequency, string account, int status)
        {
            return DbReport.ContentInstance.uspReportListGetList(reportName, Utils.AdminUtil.DepartmentId, frequency, account, status).ToList();
        }

        public List<uspReportListGetListResult> GetListReportList(string reportName, int departmentId, int frequency, string account, int status)
        {
            return DbReport.ContentInstance.uspReportListGetList(reportName, departmentId, frequency, account, status).ToList();
        }

        public uspReportListGetInfoResult GetInfoReportList(int reportListId)
        {
            return DbReport.ContentInstance.uspReportListGetInfo(reportListId).ToList().FirstOrDefault();
        }

        public int CreateReportByFrequency(int reportListId, DateTime fromDate, DateTime toDate, int action)
        {
            return DbReport.ContentInstance.uspReportCreateByFrequency(reportListId, fromDate, toDate, action);
        }

        public int UpdateStatusReportList(int reportListId, int status)
        {
            return DbReport.ContentInstance.uspReportListUpdateStatus(reportListId, status);
        }

        public List<uspReportListGetClientResult> GetReportListClient(int reportListId, string accountName)
        {
            return DbReport.ContentInstance.uspReportListGetClient(reportListId, accountName).ToList();
        }

        public int UpdateReportListClient(string adminIds, int reportListId)
        {
            return DbReport.ContentInstance.uspReportListUpdateClient(adminIds, reportListId);
        }

        public List<uspReportListGetListClientResult> GetListReportListClient(int reportListId)
        {
            return DbReport.ContentInstance.uspReportListGetListClient(reportListId).ToList();
        }

        public int RemoveReportListClient(int id)
        {
            return DbReport.ContentInstance.uspReportListRemoveClient(id);
        }

        public int UpdateRequestForm(int reportListId, string requestForm)
        {
            return DbReport.ContentInstance.uspRequestFormUpdate(reportListId, requestForm);
        }

        public int UpdateTotalDownloadReport(string fileName)
        {
            return DbReport.ContentInstance.uspReportListUpdateTotalDownload(fileName);
        }

        #endregion

        public List<uspSendEmailReportResult> SendEmailToPIC()
        {
            return DbReport.ContentInstance.uspSendEmailReport().ToList();
        }
    }
}
