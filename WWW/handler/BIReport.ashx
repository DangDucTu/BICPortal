<%@ WebHandler Language="C#" Class="BIReport" %>

using System;
using System.Web;
using WorkFlowBLL;
using System.Web.SessionState;
using System.IO;
using Excel = Microsoft.Office.Interop.Excel;

public class BIReport : IHttpHandler
{

    public void ProcessRequest(HttpContext context)
    {
        string type = context.Request.QueryString["t"] ?? string.Empty;
        switch (type)
        {
            case "GetBIReportList":
                GetBIReportList(context);
                break;
            case "GetBiReportInfo":
                GetBiReportInfo(context);
                break;
            case "GetInfoBIReportList":
                GetInfoBIReportList(context);
                break;
        }
    }

    public bool IsReusable
    {
        get
        {
            return true;
        }
    }
    public void GetBIReportList(HttpContext context)
    {
        string reportName = context.Request.QueryString["reportName"] ?? "";
        int frequency = Convert.ToInt32(context.Request.QueryString["frequency"]);
        string account = context.Request.QueryString["account"] ?? "";
        int status = Convert.ToInt32(context.Request.QueryString["status"]);
        string json = Newtonsoft.Json.JsonConvert.SerializeObject(BiReportBll.Instance.GetListReportList(reportName, frequency, account, status));
        context.Response.Write(json);
    }

    public void GetBiReportInfo(HttpContext context)
    {
        int reportId = Convert.ToInt32(context.Request.QueryString["id"] ?? "0");
        string json = Newtonsoft.Json.JsonConvert.SerializeObject(BiReportBll.Instance.GetBiReportInfo(reportId));
        context.Response.Write(json);
    }

    public void GetInfoBIReportList(HttpContext context)
    {
        int reportListId = Convert.ToInt32(context.Request.QueryString["reportListId"]);
        string json = Newtonsoft.Json.JsonConvert.SerializeObject(BiReportBll.Instance.GetInfoBiReportList(reportListId));
        context.Response.Write(json);
    }

}