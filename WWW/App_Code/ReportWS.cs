using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using WorkFlowBLL;

/// <summary>
/// Summary description for ReportWS
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class ReportWS : System.Web.Services.WebService
{

    public ReportWS()
    {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod]
    public int InsertReport(int reportListId, string deadline)
    {
        return ReportBll.Instance.InsertReport(reportListId, deadline);
    }

    [WebMethod]
    public int UpdateStatusReport(int reportId, int status, string description)
    {
        return ReportBll.Instance.UpdateStatusReport(reportId, status, description);
    }

    [WebMethod]
    public int DeleteReport(int reportId)
    {
        return ReportBll.Instance.DeleteReport(reportId);
    }

    [WebMethod]
    public int UploadReport(int reportId, string fileName, string timeKeyData, string reportLink)
    {
        return ReportBll.Instance.UploadReport(reportId, fileName, Utils.AdminUtil.AdminName, timeKeyData, reportLink);
    }

    [WebMethod]
    public int InsertReportList(string requestId, string account, string accountBackup, int isAuto, string toolOfReport)
    {
        return ReportBll.Instance.InsertReportList(requestId, account, accountBackup, isAuto, toolOfReport);
    }

    [WebMethod]
    public int UpdateReportList(int reportListId, string requestId, string account, string accountBackup, int isAuto, string toolOfReport)
    {
        return ReportBll.Instance.UpdateReportList(reportListId, requestId, account, accountBackup, isAuto, toolOfReport);
    }

    [WebMethod]
    public int CreateReportByFrequency(int reportListId, string fromDate, string toDate, int action)
    {
        IFormatProvider culture = new System.Globalization.CultureInfo("en-US", true);
        return ReportBll.Instance.CreateReportByFrequency(reportListId, Convert.ToDateTime(fromDate, culture), Convert.ToDateTime(toDate, culture), action);
    }

    [WebMethod]
    public int UpdateStatusReportList(int reportListId, int status)
    {
        return ReportBll.Instance.UpdateStatusReportList(reportListId, status);
    }

    [WebMethod]
    public int UpdateReportListClient(string adminIds, int reportListId)
    {
        return ReportBll.Instance.UpdateReportListClient(adminIds, reportListId);
    }

    [WebMethod]
    public int RemoveReportListClient(int id)
    {
        return ReportBll.Instance.RemoveReportListClient(id);
    }

    [WebMethod]
    public int UpdateRequestForm(int reportListId, string requestForm)
    {
        return ReportBll.Instance.UpdateRequestForm(reportListId, requestForm);
    }

    [WebMethod]
    public int UpdateKeyIndicator(int id, string indicator, string unit, float? t1, float? t2, float? t3, float? t4, float? t5,
            float? t6, float? t7, float? t8, float? t9, float? t10, float? t11, float? t12)
    {
        return Dashboard.Instance.UpdateKeyIndicator(id, indicator, unit, t1, t2, t3, t4, t5, t6, t7, t8, t9, t10, t11, t12);
    }
}
