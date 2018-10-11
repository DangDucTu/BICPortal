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
public class RequestReportWS : System.Web.Services.WebService
{

    public RequestReportWS()
    {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod]
    public int InsertReportList(string requestName, string client, string emailClient, string deadline, int requestType, string receive, string account, int requestStatus, int requestSendType, string reportType, string requestDescription, string frequency, int noTracerReceived, int noTracerSolved, string requestReasonCan, string requestDiscussMan, string requestInformClient)
    {
        return RequestReportBll.Instance.InsertReportList(requestName, client, emailClient, requestType, receive, requestStatus, deadline, account, requestSendType, reportType, requestDescription, frequency, noTracerReceived, noTracerSolved, requestReasonCan, requestDiscussMan, requestInformClient);
    }

    [WebMethod]
    public int UpdateReportList(int reportListId, string requestName, string client, string emailClient, string deadline, int requestType, string receive, string account, int requestStatus, int requestSendType, string reportType, string requestDescription, string frequency, int noTracerReceived, int noTracerSolved, string requestReasonCan, string requestDiscussMan, string requestInformClient)
    {
        return RequestReportBll.Instance.UpdateReportList(reportListId, requestName, client, emailClient, requestType, receive, requestStatus, deadline, account, requestSendType, reportType, requestDescription, frequency, noTracerReceived, noTracerSolved, requestReasonCan, requestDiscussMan, requestInformClient);
    }

}
