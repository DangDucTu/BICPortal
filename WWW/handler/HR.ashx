<%@ WebHandler Language="C#" Class="HR" %>

using System;
using System.Web;
using WorkFlowBLL;

public class HR : IHttpHandler {
    
    public void ProcessRequest (HttpContext context) {
        string type = context.Request.QueryString["t"] ?? string.Empty;
        switch (type)
        {
            case "GetListHR":
                GetListHR(context);
                break;
            case "GetListTeam":
                GetListTeam(context);
                break;
            case "GetListChannel":
                GetListChannel(context);
                break;
            case "GetListPosition":
                GetListPosition(context);
                break;
            case "GetListSubPosition":
                GetListSubPosition(context);
                break;
            case "GetInfoHr":
                GetInfoHr(context);
                break;
        }
    }

    public void GetListHR(HttpContext context)
    {
        string saleSupport = Utils.AdminUtil.AdminName;
        string saleCode = context.Request.QueryString["saleCode"];
        string saleName = context.Request.QueryString["saleName"];
        string team = context.Request.QueryString["team"];

        int page = Convert.ToInt32(context.Request.QueryString["page"]);
        int pageSize = Convert.ToInt32(context.Request.QueryString["pageSize"]);

        string json = Newtonsoft.Json.JsonConvert.SerializeObject(WorkFlowBLL.HR.Instance.GetListHR(saleSupport, saleCode, saleName, team, page, pageSize));
        context.Response.Write(json);
    }

    public void GetListTeam(HttpContext context)
    {
        string json = Newtonsoft.Json.JsonConvert.SerializeObject(WorkFlowBLL.HR.Instance.GetListTeam());
        context.Response.Write(json);
    }

    public void GetListChannel(HttpContext context)
    {
        string json = Newtonsoft.Json.JsonConvert.SerializeObject(WorkFlowBLL.HR.Instance.GetListChannel());
        context.Response.Write(json);
    }

    public void GetListPosition(HttpContext context)
    {
        string channel = context.Request.QueryString["channel"];
        string json = Newtonsoft.Json.JsonConvert.SerializeObject(WorkFlowBLL.HR.Instance.GetListPosition(channel));
        context.Response.Write(json);
    }

    public void GetListSubPosition(HttpContext context)
    {
        string channel = context.Request.QueryString["channel"];
        string position = context.Request.QueryString["position"];
        string json = Newtonsoft.Json.JsonConvert.SerializeObject(WorkFlowBLL.HR.Instance.GetListSubPosition(channel, position));
        context.Response.Write(json);
    }

    public void GetInfoHr(HttpContext context)
    {
        string saleCode = context.Request.QueryString["saleCode"];
        string json = Newtonsoft.Json.JsonConvert.SerializeObject(WorkFlowBLL.HR.Instance.GetInfoHr(saleCode));
        context.Response.Write(json);
    }
 
    public bool IsReusable {
        get {
            return true;
        }
    }

}