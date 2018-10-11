<%@ WebHandler Language="C#" Class="FunctionHandler" %>

using System;
using System.Web;
using WorkFlowBLL;
using System.Web.SessionState;
public class FunctionHandler : IHttpHandler, IReadOnlySessionState
{
    public void ProcessRequest(HttpContext context)
    {
        string type = context.Request.QueryString["t"] ?? string.Empty;
        switch (type)
        {
            case "GetListFunction":
                GetListFunction(context);
                break;
            case "GetFunctionInfo":
                GetFunctionById(context);
                break;
            case "GetCreatDate":
                GetCreateDate(context);
                break;
            case "GetListFunctionByRoleId":
                GetListFunctionByRoleId(context);
                break;
        }
    }
    public void GetCreateDate(HttpContext context)
    {
        context.Response.ContentType = "application/json";
        context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(new { CreateDate = DateTime.Now }));
    }
    
    public void GetFunctionById(HttpContext context)
    {
        var functionId = Convert.ToInt32(context.Request.QueryString["FunctionId"] ?? "-1");
        var function = FunctionBll.Instance.GetFunctionById(functionId);
        if (function == null) return;
        var rootImages = "";// Config.Global.Settings.UrlFunctionIcon;
        if (function != null)
        {
            var parentName = "";
            if (Convert.ToInt32(function.ParentId) > 0)
            {
                parentName = FunctionBll.Instance.GetFunctionById(Convert.ToInt32(function.ParentId)).Name;
            }
            if (parentName.Equals(""))
            {
                parentName = "-------";
            }
            var objFunction = new { ParentId = function.ParentId, ParentName = parentName, Name = function.Name, Url = function.Url, Status = function.Status, function.ShowInMenu, Order = function.Order, RootImage = rootImages };
            string jsonString = Newtonsoft.Json.JsonConvert.SerializeObject(objFunction);
            context.Response.ContentType = "application/json";
            context.Response.Write(jsonString);
        }
        else
        {
            context.Response.ContentType = "application/json";
            context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(new { result = -1 }));
        }
    }
    public void GetListFunction(HttpContext context)
    {
        var listFunction = FunctionBll.Instance.FunctionGetList();
        var strFunction = context.Request.Headers["Referer"].Replace("http://", "");
        strFunction = strFunction.Substring(strFunction.IndexOf("/"));
        var objReturn = new
        {
            Items = listFunction.Items,
            Info = listFunction.Info,
            TotalRecord = listFunction.TotalRecord
        };
        string jsonString = Newtonsoft.Json.JsonConvert.SerializeObject(objReturn);
        context.Response.ContentType = "application/json";
        context.Response.Write(jsonString);
    }

    public void GetListFunctionByRoleId(HttpContext context)
    {
        int roleId = Convert.ToInt32(context.Request.QueryString["roleId"] ?? "-1");
        var listFunction = FunctionBll.Instance.GetListFunctionByRoleId(roleId);
        string jsonString = Newtonsoft.Json.JsonConvert.SerializeObject(listFunction);
        context.Response.ContentType = "application/json";
        context.Response.Write(jsonString);
    }
    public bool IsReusable
    {
        get
        {
            return false;
        }
    }
}