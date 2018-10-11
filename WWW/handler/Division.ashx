<%@ WebHandler Language="C#" Class="Division" %>

using System;
using System.Web;
using WorkFlowBLL;

public class Division : IHttpHandler {
    
    public void ProcessRequest (HttpContext context) {
         string type = context.Request.QueryString["t"] ?? string.Empty;
         switch (type)
         {
             case "GetListDivision":
                 GetListDivision(context);
                 break;
             case "GetInfoDivision":
                 GetInfoDivision(context);
                 break;
             case "GetAdminForDepartment":
                 GetAdminForDepartment(context);
                 break;
             case "GetListAdminNotInDivision":
                 GetListAdminNotInDivision(context);
                 break;
             case "GetListAdminByDivision":
                 GetListAdminByDivision(context);
                 break;
         }
    }

    public void GetListDivision(HttpContext context)
    {
        int status = Convert.ToInt32(context.Request.QueryString["status"]);
        string json = Newtonsoft.Json.JsonConvert.SerializeObject(DivisionBll.Instance.GetListDivision(status));
        context.Response.Write(json);
    }

    public void GetInfoDivision(HttpContext context)
    {
        int divisionId = Convert.ToInt32(context.Request.QueryString["divisionId"]);
        string json = Newtonsoft.Json.JsonConvert.SerializeObject(DivisionBll.Instance.GetInfoDivision(divisionId));
        context.Response.Write(json);
    }

    public void GetAdminForDepartment(HttpContext context)
    {
        string name = context.Request.QueryString["name"];
        int type = Convert.ToInt32(context.Request.QueryString["type"]);
        string json = Newtonsoft.Json.JsonConvert.SerializeObject(DepartmentBll.Instance.GetAdminForDepartment(name, type));
        context.Response.Write(json);
    }

    public void GetListAdminNotInDivision(HttpContext context)
    {
        string json = Newtonsoft.Json.JsonConvert.SerializeObject(DivisionBll.Instance.GetListAdminNotInDivision());
        context.Response.Write(json);
    }

    public void GetListAdminByDivision(HttpContext context)
    {
        int divisionId = context.Request.QueryString["divisionId"] != null ? Convert.ToInt32(context.Request.QueryString["divisionId"]) : Utils.AdminUtil.DivisionId;
        string json = Newtonsoft.Json.JsonConvert.SerializeObject(DivisionBll.Instance.GetListAdminByDivision(divisionId));
        context.Response.Write(json);
    }
 
    public bool IsReusable {
        get {
            return true;
        }
    }

}