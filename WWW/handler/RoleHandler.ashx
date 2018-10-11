<%@ WebHandler Language="C#" Class="RoleHandler" %>

using System;
using System.Web;
using System.Web.SessionState;
using WorkFlowBLL;

public class RoleHandler : IHttpHandler, IReadOnlySessionState
{
    public void ProcessRequest(HttpContext context)
    {
        string type = context.Request.QueryString["t"] ?? string.Empty;
        switch (type)
        {
            case "GetListRole":
                GetListRole(context);
                break;
            case "GetListRoleOther":
                GetListRoleOther(context);
                break;                
            case "GetInfo":
                GetRoleInfo(context);
                break;
            case "GetRoleListByAdminId":
                GetRoleListByAdminId(context);
                break;
            case "GetRoleListNotInAdmin":
                GetRoleListNotInAdmin(context);
                break;
            case "GetListRoleByFunctionId":
                GetRoleListByFunctionId(context);
                break;
            case "GetListRoleNotInFunction":
                GetListRoleNotInFunction(context);
                break;
        }
    }
    public void GetListRole(HttpContext context)
    {
        var listRole = RoleBll.Instance.GetListRole();
        var strFunction = "";
        try
        {
            strFunction = context.Request.Headers["Referer"].Replace("http://", "") ?? "";
            strFunction = strFunction.Substring(strFunction.IndexOf("/"));
        }
        catch
        {                        
        }                
        string jsonString = Newtonsoft.Json.JsonConvert.SerializeObject(listRole);
        context.Response.ContentType = "application/json";
        context.Response.Write(jsonString);
    }
    
    public void GetListRoleOther(HttpContext context)
    {
        var listRole = RoleBll.Instance.GetListRoleOther();
        var strFunction = "";
        try
        {
            strFunction = context.Request.Headers["Referer"].Replace("http://", "") ?? "";
            strFunction = strFunction.Substring(strFunction.IndexOf("/"));
        }
        catch
        {                        
        }                
        string jsonString = Newtonsoft.Json.JsonConvert.SerializeObject(listRole);
        context.Response.ContentType = "application/json";
        context.Response.Write(jsonString);
    }
    
    public void GetRoleInfo(HttpContext context)
    {
        var listRole = RoleBll.Instance.GetRoleById(Convert.ToInt32(context.Request["roleId"]));
        var obj = new { RoleId = listRole.RoleId, Name = listRole.Name, Description = listRole.Description, CreateDate = listRole.CreateDate, Status = listRole.Status };
        string jsonString = Newtonsoft.Json.JsonConvert.SerializeObject(obj);
        context.Response.ContentType = "application/json";
        context.Response.Write(jsonString);
    }
    /// <summary>
    /// Lấy danh sách nhóm quyền theo functionId
    /// </summary>
    /// <param name="context"></param>
    public void GetRoleListByFunctionId(HttpContext context)
    {
        var functionId = Convert.ToInt32(context.Request.QueryString["FunctionId"] ?? "-1");
        var roleList = RoleBll.Instance.GetListRoleByFunctionId(functionId);
        var jsonString = Newtonsoft.Json.JsonConvert.SerializeObject(roleList);
        context.Response.ContentType = "application/json";
        context.Response.Write(jsonString);
    }
    /// <summary>
    /// Lấy danh sách Role theo adminId
    /// </summary>
    /// <param name="context"></param>
    public void GetRoleListByAdminId(HttpContext context)
    {
        var adminId = Convert.ToInt32(context.Request.QueryString["adminId"] ?? "-1");
        var roleList = RoleBll.Instance.GetRoleListByAdminId(adminId);
        var jsonString = Newtonsoft.Json.JsonConvert.SerializeObject(roleList);
        context.Response.ContentType = "application/json";
        context.Response.Write(jsonString);
    }
    /// <summary>
    /// trung.pham
    /// </summary>
    /// <param name="context"></param>
    public void GetRoleListNotInAdmin(HttpContext context)
    {
        var adminId = Convert.ToInt32(context.Request.QueryString["adminId"] ?? "-1");
        var rolelist = RoleBll.Instance.GetRoleListNotInAdmin(adminId);
        string jsonString = Newtonsoft.Json.JsonConvert.SerializeObject(rolelist);
        context.Response.ContentType = "application/json";
        context.Response.Write(jsonString);
    }
    public void GetListRoleNotInFunction(HttpContext context)
    {
        int functionId = Convert.ToInt32(context.Request.QueryString["functionId"] ?? "-1");
        var listRole = RoleBll.Instance.GetListRoleNotInFunction(functionId);
        string jsonString = Newtonsoft.Json.JsonConvert.SerializeObject(listRole);
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