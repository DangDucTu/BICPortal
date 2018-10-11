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
public class IssueTrackingWS : System.Web.Services.WebService
{

    public IssueTrackingWS()
    {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod]
    public int InsertIssueTracking(int divisionId, string picBICC, int status, string issueCreateDate, string firstFeedbackDate, string summary, string description, string picBU, string currAssignee, string deadline, string finishDate, string agreeSolution, string note, string account)
    {
        DateTime IssueCreateDate = DateTime.Now;
        return IssueTrackingBLL.Instance.InsertIssueTracking(divisionId, picBICC, status, IssueCreateDate, firstFeedbackDate, summary, description, picBU, currAssignee, deadline, finishDate, agreeSolution, note, account);
    }
    [WebMethod]
    public int UpdateIssueTracking(int issueCode, int divisionId, string picBICC, int status, string issueCreateDate, string firstFeedbackDate, string summary, string description, string picBU, string currAssignee, string deadline, string finishDate, string agreeSolution, string note, string account)
    {
        return IssueTrackingBLL.Instance.UpdateIssueTracking(issueCode, divisionId, picBICC, status, issueCreateDate, firstFeedbackDate, summary, description, picBU, currAssignee, deadline, finishDate, agreeSolution, note, account);
    }
    [WebMethod]
    public int ConfirmIssueTracking(int issueCode, string account)
    {
        int result = IssueTrackingBLL.Instance.ConfirmIssueTracking(issueCode, account);
        return result;
    }

    [WebMethod]
    public int DeleteIssueTracking(int issueId, string account)
    {
        int result = IssueTrackingBLL.Instance.DeleteIssueTrackingByInfo(issueId, account);
        return result;
    }


}