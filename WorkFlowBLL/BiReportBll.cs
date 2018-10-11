using Config.Pattern;
using DataContext;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WorkFlowBLL
{
    public class BiReportBll
    {
        #region Properties
        /// <summary>
        /// Thể hiện của đối tượng
        /// </summary>
        public static BiReportBll Instance
        {
            get
            {
                return Singleton<BiReportBll>.Instance;
            }
        }
        #endregion

        #region Report List
        public List<uspBIReportGetListResult> GetListReportList(string reportName, int frequency, string account, int status)
        {
            return DbBIReport.ContentInstance.uspBIReportGetList(reportName, Utils.AdminUtil.DepartmentId, frequency, account, status).ToList();
        }

        public uspBiReportListGetInfoResult GetInfoBiReportList(int reportListId)
        {
            return DbBIReport.ContentInstance.uspBiReportListGetInfo(reportListId).ToList().FirstOrDefault();
        }

        #endregion

        #region Report

        public uspBIReportGetInfoResult GetBiReportInfo(int ReportId)
        {
            return DbBIReport.ContentInstance.uspBIReportGetInfo(ReportId).FirstOrDefault();
        }
        public int InsertBIReport(int departmentId, string reportName, string client, string emailClient, string deadline, int frequency, string account, string accountBackup, int isAuto, string description, string urlReport)
        {
            return DbBIReport.ContentInstance.uspBIReportInsert(departmentId, reportName, client, emailClient, deadline, frequency, account, accountBackup, isAuto, description, urlReport);
        }

        public int UpdateBIReportList(int reportListId, string reportName, string client, string emailClient, string deadline, int frequency, string account, string accountBackup, int isAuto, string description, string urlReport)
        {
            return DbBIReport.ContentInstance.uspBIReportListUpdate(reportListId, reportName, client, emailClient, deadline, frequency, account, accountBackup, isAuto, description, urlReport);
        }
        public int UpdateStatusBiReportList(int reportListId, int status)
        {
            return DbBIReport.ContentInstance.uspBIReportListUpdateStatus(reportListId, status);
        }
        #endregion
    }
}
