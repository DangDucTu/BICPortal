<%@ WebHandler Language="C#" Class="RequestReport" %>

using System;
using System.Web;
using WorkFlowBLL;
using System.Web.SessionState;
using System.IO;
using Excel = Microsoft.Office.Interop.Excel;

public class RequestReport : IHttpHandler, IReadOnlySessionState
{

    public void ProcessRequest(HttpContext context)
    {
        string type = context.Request.QueryString["t"] ?? string.Empty;
        switch (type)
        {
            case "GetListRequestReportList":
                GetListRequestReportList(context);
                break;
            case "GetInfoRequestReport":
                GetInfoRequestReport(context);
                break;
            case "GetInfoRequestForCreateReport":
                GetInfoRequestForCreateReport(context);
                break;
            case "upload":
                UpLoadFile(context);
                break;
        }
    }

    public void GetListRequestReportList(HttpContext context)
    {
        string requestName = context.Request.QueryString["requestName"] ?? "";
        string receiveFrom = context.Request.QueryString["receiveFrom"] ?? "";
        string receiveTo = context.Request.QueryString["receiveTo"] ?? "";
        int department = Convert.ToInt32(context.Request.QueryString["department"]);
        string account = context.Request.QueryString["account"] ?? "";
        string pic = context.Request.QueryString["pic"] ?? "";
        int status = Convert.ToInt32(context.Request.QueryString["status"]);

        int page = Convert.ToInt32(context.Request.QueryString["page"]);
        int pageSize = Convert.ToInt32(context.Request.QueryString["pageSize"]);
        string json = Newtonsoft.Json.JsonConvert.SerializeObject(RequestReportBll.Instance.GetListRequestReportList(requestName, receiveFrom, receiveTo, department, account, status, pic, page, pageSize));
        context.Response.Write(json);
    }

    public void GetInfoRequestReport(HttpContext context)
    {
        int reportListId = Convert.ToInt32(context.Request.QueryString["reportListId"]);
        string json = Newtonsoft.Json.JsonConvert.SerializeObject(RequestReportBll.Instance.GetInfoReportList(reportListId));
        context.Response.Write(json);

    }

    public void GetInfoRequestForCreateReport(HttpContext context)
    {
        int reportListId = Convert.ToInt32(context.Request.QueryString["reportListId"]);
        string accountName = context.Request.QueryString["accountName"];
        string json = Newtonsoft.Json.JsonConvert.SerializeObject(RequestReportBll.Instance.GetInfoRequestForReportList(reportListId,accountName));
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
                context.Response.Write(result + "|" + newFileName + "|" + timeKeyData);
            }
            else
            {
                context.Response.Write(result);
            }
        }
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
        const string strExts = ".xls|.xlsx|.pdf|.ppt|.pptx|.jpg|.png|.xlsb";
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

        var path = Config.Global.Settings.ResourcesUploadEmailFile;

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


    public bool IsReusable
    {
        get
        {
            return true;
        }
    }
}