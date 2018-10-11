<%@ WebHandler Language="C#" Class="IssueTracking" %>

using System;
using System.Web;
using WorkFlowBLL;
using System.Web.SessionState;
using System.IO;
using Excel = Microsoft.Office.Interop.Excel;

public class IssueTracking : IHttpHandler, IReadOnlySessionState
{

    public void ProcessRequest(HttpContext context)
    {
        string type = context.Request.QueryString["t"] ?? string.Empty;
        switch (type)
        {
            case "GetListDivisionByAccount":
                GetListDivisionByAccount(context);
                break;
            case "GetListAllDivision":
                GetListAllDivision(context);
                break;
            case "GetListPICBiccByAccount":
                GetListPICBiccByAccount(context);
                break;
            case "GetReportListClient":
                GetReportListClient(context);
                break;
            case "GetListReportListClient":
                GetListReportListClient(context);
                break;
            case "GetListReportForClient":
                GetListReportForClient(context);
                break;

            case "GetInfoIssueTracking":
                GetInfoIssueTracking(context);
                break;

            case "GetListReport":
                GetListReport(context);
                break;

            case "GetListReportByMember":
                GetListReportByMember(context);
                break;

            case "GetListReportForView":
                GetListReportForView(context);
                break;

            case "GetListIssueTracking":
                GetListIssueTracking(context);
                break;
            case "GetListReportListForView":
                GetListReportListForView(context);
                break;

            case "GetInfoReportList":
                GetInfoReportList(context);
                break;

            case "upload":
                UpLoadFile(context);
                break;
            case "uploadRequestForm":
                UpLoadFileRequestForm(context);
                break;

            case "Download":
                DownloadFile(context);
                break;

            case "GetDeadline":
                GetDeadline(context);
                break;
            case "CheckAccountPermission":
                CheckAccountPermission(context);
                break;
        }
    }

    public void GetInfoIssueTracking(HttpContext context)
    {
        int issueId = Convert.ToInt32(context.Request.QueryString["issueId"] ?? "-1");
        string account = context.Request.QueryString["account"] ?? "";
        string json = Newtonsoft.Json.JsonConvert.SerializeObject(IssueTrackingBLL.Instance.GetIssueTrackingInfo(account, issueId));
        context.Response.Write(json);
    }

    public void CheckAccountPermission(HttpContext context)
    {
        string account = context.Request.QueryString["account"] ?? "";
        string json = Newtonsoft.Json.JsonConvert.SerializeObject(IssueTrackingBLL.Instance.CheckAccountPermission(account));
        context.Response.Write(json);
    }

    public void GetListReport(HttpContext context)
    {
        int managerId = Utils.AdminUtil.DepartmentId;
        if (context.Request.QueryString["departmentId"] != null)
            managerId = Convert.ToInt32(context.Request.QueryString["departmentId"] ?? "0");
        string reportName = context.Request.QueryString["reportName"] ?? "";

        string accountName = context.Request.QueryString["accountName"] ?? "";

        int frequency = Convert.ToInt32(context.Request.QueryString["frequency"]);
        int isComplete = Convert.ToInt32(context.Request.QueryString["isComplete"]);
        int status = Convert.ToInt32(context.Request.QueryString["status"]);
        int isBackup = 0;
        string pic = context.Request.QueryString["pic"];
        int reportType = Convert.ToInt32(context.Request.QueryString["reportType"]);
        int reportUpdateType = Convert.ToInt32(context.Request.QueryString["reportUpdateType"]);

        IFormatProvider culture = new System.Globalization.CultureInfo("en-US", true);
        DateTime fromDate = Convert.ToDateTime((context.Request.QueryString["fromDate"]).Trim() ?? "1/1/2010", culture);
        DateTime toDate = Convert.ToDateTime((context.Request.QueryString["toDate"] + " 23:59:59").Trim() ?? "1/1/2020", culture);
        int page = Convert.ToInt32(context.Request.QueryString["page"] ?? "1");
        int pageSize = Convert.ToInt32(context.Request.QueryString["pageSize"] ?? "10");

        string json = Newtonsoft.Json.JsonConvert.SerializeObject(ReportBll.Instance.GetListReport(reportName, pic, reportType, reportUpdateType, managerId, frequency, accountName, fromDate, toDate, isComplete, status, isBackup, page, pageSize));
        context.Response.Write(json);
    }

    public void GetListReportByMember(HttpContext context)
    {
        int managerId = 0;
        string reportName = context.Request.QueryString["reportName"] ?? "";

        string accountName = Utils.AdminUtil.AdminName;

        int frequency = Convert.ToInt32(context.Request.QueryString["frequency"]);
        int isComplete = Convert.ToInt32(context.Request.QueryString["isComplete"]);
        int status = Convert.ToInt32(context.Request.QueryString["status"]);
        int isBackup = 1;
        string pic = "";
        int reportType = -1;
        int reportUpdateType = -1;

        IFormatProvider culture = new System.Globalization.CultureInfo("en-US", true);
        DateTime fromDate = Convert.ToDateTime((context.Request.QueryString["fromDate"]).Trim() ?? "1/1/2010", culture);
        DateTime toDate = Convert.ToDateTime((context.Request.QueryString["toDate"] + " 23:59:59").Trim() ?? "1/1/2020", culture);
        int page = Convert.ToInt32(context.Request.QueryString["page"] ?? "1");
        int pageSize = Convert.ToInt32(context.Request.QueryString["pageSize"] ?? "20");

        string json = Newtonsoft.Json.JsonConvert.SerializeObject(ReportBll.Instance.GetListReport(reportName, pic, reportType, reportUpdateType, managerId, frequency, accountName, fromDate, toDate, isComplete, status, isBackup, page, pageSize));
        context.Response.Write(json);
    }

    public void GetListReportForView(HttpContext context)
    {
        string reportName = context.Request.QueryString["reportName"] ?? "";

        IFormatProvider culture = new System.Globalization.CultureInfo("en-US", true);
        DateTime fromDate = Convert.ToDateTime((context.Request.QueryString["fromDate"]).Trim() ?? "1/1/2010", culture);
        DateTime toDate = Convert.ToDateTime((context.Request.QueryString["toDate"] + " 23:59:59").Trim() ?? "1/1/2020", culture);
        string accountName = context.Request.QueryString["accountName"] ?? "";
        int departmentId = Convert.ToInt32(context.Request.QueryString["departmentId"]);
        int page = Convert.ToInt32(context.Request.QueryString["page"] ?? "1");
        int pageSize = Convert.ToInt32(context.Request.QueryString["pageSize"] ?? "20");

        string json = Newtonsoft.Json.JsonConvert.SerializeObject(ReportBll.Instance.GetListReportForView(reportName, accountName, departmentId, fromDate, toDate, page, pageSize));
        context.Response.Write(json);
    }

    public void GetListReportForClient(HttpContext context)
    {
        //string reportName = context.Request.QueryString["reportName"] ?? "";

        IFormatProvider culture = new System.Globalization.CultureInfo("en-US", true);
        DateTime fromDate = Convert.ToDateTime((context.Request.QueryString["fromDate"]).Trim() ?? "1/1/2010", culture);
        DateTime toDate = Convert.ToDateTime((context.Request.QueryString["toDate"] + " 23:59:59").Trim() ?? "1/1/2020", culture);
        //string accountName = context.Request.QueryString["accountName"] ?? "";
        int page = Convert.ToInt32(context.Request.QueryString["page"] ?? "1");
        int pageSize = Convert.ToInt32(context.Request.QueryString["pageSize"] ?? "20");

        string json = Newtonsoft.Json.JsonConvert.SerializeObject(ReportBll.Instance.GetListReportForClient(fromDate, toDate, page, pageSize));
        context.Response.Write(json);
    }

    public void GetListIssueTracking(HttpContext context)
    {
        int division = string.IsNullOrEmpty(context.Request.QueryString["division"]) ? -1 : Convert.ToInt32(context.Request.QueryString["division"]);
        string account = context.Request.QueryString["account"] ?? "";
        string issueCode = context.Request.QueryString["issueCode"] ?? "";
        int status = string.IsNullOrEmpty(context.Request.QueryString["status"]) ? -1 : Convert.ToInt32(context.Request.QueryString["status"]);
        string fromDate = context.Request.QueryString["fromDate"] ?? "";
        string toDate = context.Request.QueryString["toDate"] ?? "";
        string picBu = context.Request.QueryString["picBu"] ?? "";
        string picBicc = context.Request.QueryString["picBicc"].Equals("-1") ? "" : context.Request.QueryString["picBicc"];
        int updating_status = string.IsNullOrEmpty(context.Request.QueryString["updating_status"]) ? -1 : Convert.ToInt32(context.Request.QueryString["updating_status"]);

        int page = Convert.ToInt32(context.Request.QueryString["page"]);
        int pageSize = Convert.ToInt32(context.Request.QueryString["pageSize"]);
        string json = Newtonsoft.Json.JsonConvert.SerializeObject(IssueTrackingBLL.Instance.GetListIssueTracking(account, division, status, updating_status, fromDate, toDate, issueCode, page, pageSize, picBu, picBicc));
        context.Response.Write(json);
    }

    public void GetListReportListForView(HttpContext context)
    {
        string reportName = context.Request.QueryString["reportName"] ?? "";
        int departmentId = Convert.ToInt32(context.Request.QueryString["departmentid"]);
        int frequency = Convert.ToInt32(context.Request.QueryString["frequency"]);
        string account = context.Request.QueryString["account"] ?? "";
        int status = Convert.ToInt32(context.Request.QueryString["status"]);
        string json = Newtonsoft.Json.JsonConvert.SerializeObject(ReportBll.Instance.GetListReportList(reportName, departmentId, frequency, account, status));
        context.Response.Write(json);
    }

    public void GetInfoReportList(HttpContext context)
    {
        int reportListId = Convert.ToInt32(context.Request.QueryString["reportListId"]);
        string json = Newtonsoft.Json.JsonConvert.SerializeObject(ReportBll.Instance.GetInfoReportList(reportListId));
        context.Response.Write(json);

    }
    public void GetListAllDivision(HttpContext context)
    {
        string json = Newtonsoft.Json.JsonConvert.SerializeObject(IssueTrackingBLL.Instance.GetListAllDivision());
        context.Response.Write(json);
    }

    public void GetListDivisionByAccount(HttpContext context)
    {
        //int reportListId = Convert.ToInt32(context.Request.QueryString["reportListId"]);
        string accountName = context.Request.QueryString["account"];
        string json = Newtonsoft.Json.JsonConvert.SerializeObject(IssueTrackingBLL.Instance.GetListDivisionByAccount(accountName));
        context.Response.Write(json);
    }
    public void GetListPICBiccByAccount(HttpContext context)
    {
        //int reportListId = Convert.ToInt32(context.Request.QueryString["reportListId"]);
        string accountName = context.Request.QueryString["account"];
        string json = Newtonsoft.Json.JsonConvert.SerializeObject(IssueTrackingBLL.Instance.GetListPICBiccByAccount(accountName));
        context.Response.Write(json);
    }
    public void GetReportListClient(HttpContext context)
    {
        int reportListId = Convert.ToInt32(context.Request.QueryString["reportListId"]);
        string accountName = context.Request.QueryString["AccountName"];
        string json = Newtonsoft.Json.JsonConvert.SerializeObject(ReportBll.Instance.GetReportListClient(reportListId, accountName));
        context.Response.Write(json);
    }

    public void GetListReportListClient(HttpContext context)
    {
        int reportListId = Convert.ToInt32(context.Request.QueryString["reportListId"]);
        string json = Newtonsoft.Json.JsonConvert.SerializeObject(ReportBll.Instance.GetListReportListClient(reportListId));
        context.Response.Write(json);
    }

    /// <summary>
    /// Upload Ảnh
    /// </summary>
    /// <param name="context"></param>
    private void UpLoadFile(HttpContext context)
    {
        int isAuto = Convert.ToInt32(context.Request.QueryString["isAuto"]);
        HttpPostedFile postFile = context.Request.Files["txtFileUpload"];
        string timeKeyData = context.Request.QueryString["timeKeyData"];
        string reportLink = context.Request.QueryString["reportLink"];

        if (isAuto == 1 && postFile.FileName.Length == 0)
            context.Response.Write(1 + "|a|" + timeKeyData);
        else
        {
            var oldFileName = context.Request.Params["hfOldFileUpload"] ?? string.Empty;
            var fileName = context.Request.QueryString["fileName"];

            string newFileName = string.Empty;
            int result = Upload(postFile, fileName, oldFileName, timeKeyData, isAuto, out newFileName);
            context.Response.ContentType = "text/plain";

            if (result == 1)
            {
                context.Response.Write(result + "|" + newFileName + "|" + timeKeyData + "|" + reportLink);
            }
            else
            {
                context.Response.Write(result);
            }
        }
    }

    private void UpLoadFileRequestForm(HttpContext context)
    {
        HttpPostedFile postFile = context.Request.Files["txtFileUpload"];
        var oldFileName = context.Request.Params["hfOldFileUpload"] ?? string.Empty;
        var fileName = context.Request.QueryString["fileName"];
        string newFileName = string.Empty;
        int result = UploadRequestForm(postFile, fileName, oldFileName, out newFileName);
        context.Response.ContentType = "text/plain";
        if (result == 1)
        {
            context.Response.Write(result + "|" + newFileName);
        }
        else
        {
            context.Response.Write(result);
        }
    }

    private static int UploadRequestForm(HttpPostedFile postFile, string name, string oldFileName, out string newImageUrl)
    {
        var strExt = postFile.FileName.Substring(postFile.FileName.LastIndexOf(".", System.StringComparison.Ordinal)).ToLower();
        const string strExts = ".xls|.xlsx|.pdf|.ppt|.doc|.docx|.jpg|.png";
        newImageUrl = string.Empty;
        if (strExts.IndexOf(strExt, System.StringComparison.Ordinal) == -1)
        {
            return -1;
        }

        IFormatProvider culture = new System.Globalization.CultureInfo("en-US", true);

        string newFileName = System.Text.RegularExpressions.Regex.Replace(name.Trim(), "[^a-zA-Z0-9_]+", "_") + strExt;

        //newImageUrl = "/"
        //    + DateTime.Now.Year + "/" + DateTime.Now.Month
        //    + "/" + newFileName;

        newImageUrl = "/" + newFileName;

        var path = Config.Global.Settings.ResourcesUploadFileRequestForm;

        //var subPath = DateTime.Now.Year + "\\" + DateTime.Now.Month + "\\";

        //newFileName = subPath + newFileName;


        if (!Directory.Exists(path))
        {
            Directory.CreateDirectory(path);
        }

        if (!string.IsNullOrEmpty(oldFileName))
        {
            //newImageUrl = oldFileName;

            var oldFileFullPath = Config.Global.Settings.ResourcesUploadFileRequestForm + oldFileName.TrimStart('/').Replace('/', '\\'); ;
            if (File.Exists(oldFileFullPath))
            {
                var fiOldFile = new FileInfo(oldFileFullPath) { Attributes = FileAttributes.Archive };
                fiOldFile.Delete();
            }
        }

        var fileName = path + newFileName;

        postFile.SaveAs(fileName);
        return 1;
    }

    /// <summary>
    /// Upload file
    /// </summary>
    /// <param name="postFile"></param>
    /// <param name="strName"></param>
    /// <returns>1: Thành công, -1: Sai định dạnh cho phép, -2: Sai loại file cho phép, -3: Exception</returns>
    private static int Upload(HttpPostedFile postFile, string name, string oldFileName, string timeKeyData, int isAuto, out string newImageUrl)
    {
        var strExt = postFile.FileName.Substring(postFile.FileName.LastIndexOf(".", System.StringComparison.Ordinal)).ToLower();
        const string strExts = ".xls|.xlsx|.pdf|.ppt|.pptx|.jpg|.png|.xlsb|.xlsm|.rar";
        newImageUrl = string.Empty;
        if (strExts.IndexOf(strExt, System.StringComparison.Ordinal) == -1)
        {
            return -1;
        }

        IFormatProvider culture = new System.Globalization.CultureInfo("en-US", true);
        DateTime key = Convert.ToDateTime(timeKeyData, culture);

        string newFileName = string.Empty;
        if (isAuto == 0)
            newFileName = System.Text.RegularExpressions.Regex.Replace(name.Trim(), "[^a-zA-Z0-9_]+", "_") + "_" + key.ToString("yyyyMMdd") + strExt;
        else if (isAuto == 1)
            newFileName = System.Text.RegularExpressions.Regex.Replace(name.Trim(), "[^a-zA-Z0-9_]+", "_") + strExt;

        //newImageUrl = "/"
        //    + DateTime.Now.Year + "/" + DateTime.Now.Month
        //    + "/" + newFileName;

        newImageUrl = "/" + newFileName;

        var path = Config.Global.Settings.ResourcesUploadFile;

        //var subPath = DateTime.Now.Year + "\\" + DateTime.Now.Month + "\\";

        //newFileName = subPath + newFileName;


        if (!Directory.Exists(path))
        {
            Directory.CreateDirectory(path);
        }

        if (!string.IsNullOrEmpty(oldFileName))
        {
            var oldFileFullPath = Config.Global.Settings.ResourcesUploadFile + oldFileName.TrimStart('/').Replace('/', '\\'); ;
            if (File.Exists(oldFileFullPath))
            {
                var fiOldFile = new FileInfo(oldFileFullPath) { Attributes = FileAttributes.Archive };
                fiOldFile.Delete();
            }
        }

        var fileName = path + newFileName;

        postFile.SaveAs(fileName);
        return 1;
    }

    private void DownloadFile(HttpContext context)
    {
        string fileName = context.Request.QueryString["fileName"].Replace("/", "");

        string path = Config.Global.Settings.ResourcesUploadFile + fileName;

        if (System.IO.File.Exists(path))
        {
            context.Response.Clear();
            context.Response.ClearContent();
            context.Response.ClearHeaders();
            context.Response.ContentType = "application/ms-excel";
            context.Response.AddHeader("Content-Disposition", "attachment;filename=" + fileName);

            System.IO.StreamReader filestream = new System.IO.StreamReader(path);
            using (System.IO.BinaryReader reader = new System.IO.BinaryReader(filestream.BaseStream))
            {
                int counterByte = 0;
                int BUFFER_SIZE = 1024 * 50;
                byte[] buf = new byte[BUFFER_SIZE];
                int n = reader.Read(buf, 0, BUFFER_SIZE);
                while (n > 0)
                {
                    context.Response.OutputStream.Write(buf, 0, n);
                    n = reader.Read(buf, 0, BUFFER_SIZE);
                    context.Response.Flush();
                    counterByte += n;
                }
                reader.Close();

                WorkFlowBLL.ReportBll.Instance.UpdateTotalDownloadReport("/" + fileName);
            }
        }
        else context.Response.Write("Not exist path.");
    }

    public class deadline
    {
        public string parameter { get; set; }

        public deadline(string _parameter)
        {
            parameter = _parameter;
        }
    }

    public void GetDeadline(HttpContext context)
    {
        string frequency = context.Request.QueryString["frequency"];
        System.Collections.Generic.List<deadline> lstDeadline = new System.Collections.Generic.List<deadline>();
        if (frequency.Equals("weekly"))
        {

            lstDeadline.Add(new deadline("Monday"));
            lstDeadline.Add(new deadline("Tuesday"));
            lstDeadline.Add(new deadline("Wednesday"));
            lstDeadline.Add(new deadline("Thursday"));
            lstDeadline.Add(new deadline("Friday"));
            lstDeadline.Add(new deadline("Saturday"));
        }
        else if (frequency.Equals("monthly"))
        {
            string item = "";
            for (int i = 1; i <= 31; i++)
            {
                if (i < 10) item = "0" + i;
                else item = i.ToString();
                lstDeadline.Add(new deadline(item));
            }
        }

        string json = Newtonsoft.Json.JsonConvert.SerializeObject(lstDeadline);
        context.Response.Write(json);
    }

    public bool IsReusable
    {
        get
        {
            return true;
        }
    }

}