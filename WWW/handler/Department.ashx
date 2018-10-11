<%@ WebHandler Language="C#" Class="Department" %>

using System;
using System.Web;
using WorkFlowBLL;

public class Department : IHttpHandler {
    
    public void ProcessRequest (HttpContext context) {
         string type = context.Request.QueryString["t"] ?? string.Empty;
         switch (type)
         {
             case "GetListDepartment":
                 GetListDepartment(context);
                 break;

             case "GetInfoDepartment":
                 GetInfoDepartment(context);
                 break;
                 
             case "GetAdminForDepartment":
                 GetAdminForDepartment(context);
                 break;
                 
             case "GetListAdminNotInDepartment":
                 GetListAdminNotInDepartment(context);
                 break;
                 
             case "GetListAdminByDepartment":
                 GetListAdminByDepartment(context);
                 break;
         }
    }

    public void GetListDepartment(HttpContext context)
    {
        int status = Convert.ToInt32(context.Request.QueryString["status"]);
        string json = Newtonsoft.Json.JsonConvert.SerializeObject(DepartmentBll.Instance.GetListDepartment(status));
        context.Response.Write(json);
    }

    public void GetInfoDepartment(HttpContext context)
    {
        int departmentId = Convert.ToInt32(context.Request.QueryString["departmentId"]);
        string json = Newtonsoft.Json.JsonConvert.SerializeObject(DepartmentBll.Instance.GetInfoDepartment(departmentId));
        context.Response.Write(json);
    }

    public void GetAdminForDepartment(HttpContext context)
    {
        string name = context.Request.QueryString["name"];
        int type = Convert.ToInt32(context.Request.QueryString["type"]);
        string json = Newtonsoft.Json.JsonConvert.SerializeObject(DepartmentBll.Instance.GetAdminForDepartment(name, type));
        context.Response.Write(json);
    }

    public void GetListAdminNotInDepartment(HttpContext context)
    {
        string json = Newtonsoft.Json.JsonConvert.SerializeObject(DepartmentBll.Instance.GetListAdminNotInDepartment());
        context.Response.Write(json);
    }

    public void GetListAdminByDepartment(HttpContext context)
    {
        int departmentId = context.Request.QueryString["departmentId"] != null ? Convert.ToInt32(context.Request.QueryString["departmentId"]) : Utils.AdminUtil.DepartmentId;
        string json = Newtonsoft.Json.JsonConvert.SerializeObject(DepartmentBll.Instance.GetListAdminByDepartment(departmentId));
        context.Response.Write(json);
    }
 
    public bool IsReusable {
        get {
            return true;
        }
    }

}