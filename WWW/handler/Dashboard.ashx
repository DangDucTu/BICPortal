<%@ WebHandler Language="C#" Class="Dashboard" %>

using System;
using System.Web;
using WorkFlowBLL;
using System.Linq;


public class Dashboard : IHttpHandler {
    
    public void ProcessRequest (HttpContext context) {
        string type = context.Request.QueryString["t"] ?? string.Empty;
        switch (type)
        {
            case "GetCeoSummary":
                GetCeoSummary(context);
                break;
            case "GetOtherInfoCeoSpeedometer":
                GetOtherInfoCeoSpeedometer(context);
                break;
            case "GetCeoProductivityTable":
                GetCeoProductivityTable(context);
                break;
            case "GetCeoPerformance":
                GetCeoPerformance(context);
                break;
            case "GetCeoProductivityRetail":
                GetCeoProductivityRetail(context);
                break;
            case "GetCeoProductivitySme":
                GetCeoProductivitySme(context);
                break;
                
            case "TrackingDailyRetailParameterFTD":
                TrackingDailyRetailParameterFTD(context);
                break;
            case "TrackingDailyRetailParameterMTD":
                TrackingDailyRetailParameterMTD(context);
                break;
            case "TrackingMonthlyRetailCustomers":
                TrackingMonthlyRetailCustomers(context);
                break;                
            case "TrackingGetMonth":
                TrackingGetMonth(context);
                break;
            case "TrackingWeeklySMEParameter":
                TrackingWeeklySMEParameter(context);
                break;
            case "TrackingWeeklySMEParameterGetDate":
                TrackingWeeklySMEParameterGetDate(context);
                break;

            case "ProductivityRetailMonthlyActualTableCurrent":
                ProductivityRetailMonthlyActualTableCurrent(context);
                break;
            case "ProductivityRetailMonthlyActualTablePrevious":
                ProductivityRetailMonthlyActualTablePrevious(context);
                break; 
            case "TrackingWeeklySMEParameterGetBranch":
                TrackingWeeklySMEParameterGetBranch(context);
                break;
                
            case "TATApplication":
                TATApplication(context);
                break;
            case "TATApplicationByProduct":
                TATApplicationByProduct(context);
                break;
            case "TATApplicationErs":
                TATApplicationErs(context);
                break;
            case "TATApplicationByProductErs":
                TATApplicationByProductErs(context);
                break;
            case "TATSla":
                TATSla(context);
                break;
                
            case "IncentiveCurrentMonth":
                IncentiveCurrentMonth(context);
                break;
                
            case "KeyIndicator":
                KeyIndicator(context);
                break;
            case "KeyIndicatorGetInfo":
                KeyIndicatorGetInfo(context);
                break;
                
            case "GetListRetailBomActual":
                GetListRetailBomActual(context);
                break;

            case "GetListRetailBomTarget":
                GetListRetailBomTarget(context);
                break;
                
            case "SmeIncentiveOverview":
                SmeIncentiveOverview(context);
                break;
            case "SmeIncentiveByMonth":
                SmeIncentiveByMonth(context);
                break;
            case "SmeIncentiveTopSaleman":
                SmeIncentiveTopSaleman(context);
                break;
        }
    }

    public void GetCeoSummary(HttpContext context)
    {
        string date = context.Request.QueryString["date"];
        int title = Convert.ToInt32(context.Request.QueryString["title"]);

        string json = Newtonsoft.Json.JsonConvert.SerializeObject(WorkFlowBLL.Dashboard.Instance.GetCeoSummary(date, title));
        context.Response.Write(json);
    }

    public void GetOtherInfoCeoSpeedometer(HttpContext context)
    {
        string date = context.Request.QueryString["date"];
        string json = Newtonsoft.Json.JsonConvert.SerializeObject(WorkFlowBLL.Dashboard.Instance.GetOtherInfoCeoSpeedometer(date));
        context.Response.Write(json);
    }

    public void GetCeoProductivityTable(HttpContext context)
    {
        string date = context.Request.QueryString["date"];
        string json = Newtonsoft.Json.JsonConvert.SerializeObject(WorkFlowBLL.Dashboard.Instance.GetCeoProductivityTable(date));
        context.Response.Write(json);
    }

    public void GetCeoPerformance(HttpContext context)
    {
        string date = context.Request.QueryString["date"];
        int table = Convert.ToInt32(context.Request.QueryString["table"]);
        string json = Newtonsoft.Json.JsonConvert.SerializeObject(WorkFlowBLL.Dashboard.Instance.GetCeoPerformance(date, table));
        context.Response.Write(json);
    }

    public void GetCeoProductivityRetail(HttpContext context)
    {
        string date = context.Request.QueryString["date"];
        string json = Newtonsoft.Json.JsonConvert.SerializeObject(WorkFlowBLL.Dashboard.Instance.GetCeoProductivityRetail(date));
        context.Response.Write(json);
    }

    public void GetCeoProductivitySme(HttpContext context)
    {
        string date = context.Request.QueryString["date"];
        int loaibigloan = Convert.ToInt32(context.Request.QueryString["loaibigloan"]);
        string json = Newtonsoft.Json.JsonConvert.SerializeObject(WorkFlowBLL.Dashboard.Instance.GetCeoProductivitySme(date, loaibigloan));
        context.Response.Write(json);
    }   

    public void TrackingDailyRetailParameterFTD(HttpContext context)
    {
        string date = context.Request.QueryString["date"];
        string channel = context.Request.QueryString["channel"] ?? "";
        string region = context.Request.QueryString["region"] ?? "";
        string json = Newtonsoft.Json.JsonConvert.SerializeObject(WorkFlowBLL.Dashboard.Instance.TrackingDailyRetailParameterFTD(date, channel, region));
        context.Response.Write(json);
    }

    public void TrackingDailyRetailParameterMTD(HttpContext context)
    {
        string date = context.Request.QueryString["date"];
        string channel = context.Request.QueryString["channel"] ?? "";
        string region = context.Request.QueryString["region"] ?? "";
        string json = Newtonsoft.Json.JsonConvert.SerializeObject(WorkFlowBLL.Dashboard.Instance.TrackingDailyRetailParameterMTD(date, channel, region));
        context.Response.Write(json);
    }

    public void TrackingMonthlyRetailCustomers(HttpContext context)
    {
        string month = context.Request.QueryString["month"];
        string channel = context.Request.QueryString["channel"];

        string json = Newtonsoft.Json.JsonConvert.SerializeObject(WorkFlowBLL.Dashboard.Instance.TrackingMonthlyRetailCustomers(month, channel));
        context.Response.Write(json);
    }

    public void TrackingGetMonth(HttpContext context)
    {
        string json = Newtonsoft.Json.JsonConvert.SerializeObject(WorkFlowBLL.Dashboard.Instance.TrackingGetMonth());
        context.Response.Write(json);
    }

    public void TrackingWeeklySMEParameter(HttpContext context)
    {
        string date = context.Request.QueryString["date"];
        string region = context.Request.QueryString["region"] ?? "";
        string branch = context.Request.QueryString["branch"] ?? "";
        string json = Newtonsoft.Json.JsonConvert.SerializeObject(WorkFlowBLL.Dashboard.Instance.TrackingWeeklySMEParameter(date, region, branch));
        context.Response.Write(json);
    }

    public void TrackingWeeklySMEParameterGetDate(HttpContext context)
    {
        string json = Newtonsoft.Json.JsonConvert.SerializeObject(WorkFlowBLL.Dashboard.Instance.TrackingWeeklySMEParameterGetDate());
        context.Response.Write(json);
    }

    public void TrackingWeeklySMEParameterGetBranch(HttpContext context)
    {
        string region = context.Request.QueryString["region"];
        string json = Newtonsoft.Json.JsonConvert.SerializeObject(WorkFlowBLL.Dashboard.Instance.TrackingWeeklySMEParameterGetBranch(region));
        context.Response.Write(json);
    }


    public void ProductivityRetailMonthlyActualTableCurrent(HttpContext context)
    {
        string json = Newtonsoft.Json.JsonConvert.SerializeObject(WorkFlowBLL.Dashboard.Instance.ProductivityRetailMonthlyActualTableCurrent());
        context.Response.Write(json);
    }

    public void ProductivityRetailMonthlyActualTablePrevious(HttpContext context)
    {
        string json = Newtonsoft.Json.JsonConvert.SerializeObject(WorkFlowBLL.Dashboard.Instance.ProductivityRetailMonthlyActualTablePrevious());
        context.Response.Write(json);
    }    

    public void TATApplication(HttpContext context)
    {
        int type = Convert.ToInt32(context.Request.QueryString["type"]);
        string json = Newtonsoft.Json.JsonConvert.SerializeObject(WorkFlowBLL.Dashboard.Instance.TATApplication(type));
        context.Response.Write(json);
    }

    public void TATApplicationByProduct(HttpContext context)
    {
        int type = Convert.ToInt32(context.Request.QueryString["type"]);
        string json = Newtonsoft.Json.JsonConvert.SerializeObject(WorkFlowBLL.Dashboard.Instance.TATApplicationByProduct(type));
        context.Response.Write(json);
    }

    public void TATApplicationErs(HttpContext context)
    {
        int type = Convert.ToInt32(context.Request.QueryString["type"]);
        string json = Newtonsoft.Json.JsonConvert.SerializeObject(WorkFlowBLL.Dashboard.Instance.TATApplicationErs(type));
        context.Response.Write(json);
    }

    public void TATApplicationByProductErs(HttpContext context)
    {
        int type = Convert.ToInt32(context.Request.QueryString["type"]);
        string json = Newtonsoft.Json.JsonConvert.SerializeObject(WorkFlowBLL.Dashboard.Instance.TATApplicationByProductErs(type));
        context.Response.Write(json);
    }

    public void TATSla(HttpContext context)
    {
        string json = Newtonsoft.Json.JsonConvert.SerializeObject(WorkFlowBLL.Dashboard.Instance.TATSla());
        context.Response.Write(json);
    }

    public void IncentiveCurrentMonth(HttpContext context)
    {
        string json = Newtonsoft.Json.JsonConvert.SerializeObject(WorkFlowBLL.Dashboard.Instance.IncentiveCurrentMonth());
        context.Response.Write(json);            
    }

    public void KeyIndicator(HttpContext context)
    {
        string pic = context.Request.QueryString["pic"];
        int year = Convert.ToInt32(context.Request.QueryString["year"]);
        string json = Newtonsoft.Json.JsonConvert.SerializeObject(WorkFlowBLL.Dashboard.Instance.KeyIndicator(pic, year));
        context.Response.Write(json);
    }

    public void KeyIndicatorGetInfo(HttpContext context)
    {
        int id = Convert.ToInt32(context.Request.QueryString["id"]);
        string json = Newtonsoft.Json.JsonConvert.SerializeObject(WorkFlowBLL.Dashboard.Instance.KeyIndicatorGetInfo(id));
        context.Response.Write(json);
    }

    public void GetListRetailBomActual(HttpContext context)
    {
        int channel = Convert.ToInt32(context.Request.QueryString["channel"]);
        string json = Newtonsoft.Json.JsonConvert.SerializeObject(WorkFlowBLL.Dashboard.Instance.GetListRetailBomActual(channel));
        context.Response.Write(json);
    }

    public void GetListRetailBomTarget(HttpContext context)
    {
        int channel = Convert.ToInt32(context.Request.QueryString["channel"]);
        string json = Newtonsoft.Json.JsonConvert.SerializeObject(WorkFlowBLL.Dashboard.Instance.GetListRetailBomTarget(channel));
        context.Response.Write(json);
    }

    public void SmeIncentiveOverview(HttpContext context)
    {
        int year = Convert.ToInt32(context.Request.QueryString["year"]);
        int month = Convert.ToInt32(context.Request.QueryString["month"]);

        string json = Newtonsoft.Json.JsonConvert.SerializeObject(WorkFlowBLL.Dashboard.Instance.SmeIncentiveOverview(year, month));
        context.Response.Write(json);
    }

    public void SmeIncentiveByMonth(HttpContext context)
    {
        int year = Convert.ToInt32(context.Request.QueryString["year"]);

        string json = Newtonsoft.Json.JsonConvert.SerializeObject(WorkFlowBLL.Dashboard.Instance.SmeIncentiveByMonth(year));
        context.Response.Write(json);
    }

    public void SmeIncentiveTopSaleman(HttpContext context)
    {
        int year = Convert.ToInt32(context.Request.QueryString["year"]);
        int month = Convert.ToInt32(context.Request.QueryString["month"]);
        string by = context.Request.QueryString["by"];

        string json = Newtonsoft.Json.JsonConvert.SerializeObject(WorkFlowBLL.Dashboard.Instance.SmeIncentiveTopSaleman(year, month, by));
        context.Response.Write(json);
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

}