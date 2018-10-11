using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;
using WorkFlowBLL;

/// <summary>
/// Summary description for ReportWS
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class BIReportWS : System.Web.Services.WebService
{

    public BIReportWS()
    {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod]
    public int InsertBIReport(string reportName, string client, string emailClient, string deadline, int frequency, string account, string accountBackup, int isAuto, string description, string urlReport)
    {
        return BiReportBll.Instance.InsertBIReport(Utils.AdminUtil.DepartmentId, reportName, client, emailClient, deadline, frequency, account, accountBackup, isAuto, description, urlReport);
    }

    [WebMethod]
    public int UpdateBIReportList(int reportListId, string reportName, string client, string emailClient, string deadline, int frequency, string account, string accountBackup, int isAuto, string description, string urlReport)
    {
        return BiReportBll.Instance.UpdateBIReportList(reportListId, reportName, client, emailClient, deadline, frequency, account, accountBackup, isAuto, description, urlReport);
    }

    [WebMethod]
    public int UpdateStatusBiReportList(int reportListId, int status)
    {
        return BiReportBll.Instance.UpdateStatusBiReportList(reportListId, status);
    }
}
