<%@ WebHandler Language="C#" Class="AdminHandler" %>

using System;
using System.Web;
using WorkFlowBLL;

public class AdminHandler : IHttpHandler {
    
    public void ProcessRequest (HttpContext context) {
        string type = context.Request.QueryString["t"] ?? string.Empty;
        switch (type)
        {
            case "AdminGetList":
                AdminGetList(context);
                break;
            case "AdminGetInfo":
                AdminGetInfo(context);
                break;
            case "GetMyProfile":
                GetMyProfile(context);
                break;
            case "GetAdminList":
                GetAdminList(context);
                break;
            case "GetAdminInfo":
                GetAdminInfo(context);
                break;
            case "GetAdminListNotInRole":
                GetAdminListNotInRole(context);
                break;
            case "GetListAccountByRole":
                GetListAccountByRole(context);
                break;
            case "GetUserName":
                GetUserName(context);
                break;            
        }
    }

    /// <summary>
    /// Lấy thông tin của Admin đang đăng nhập
    /// </summary>
    /// <param name="context"></param>
    private void GetMyProfile(HttpContext context)
    {
        var adminId = Utils.AdminUtil.AdminId;
        var adminInfo = AdminBll.Instance.GetAdminById(adminId);
        if (adminInfo == null) return;
        var objResult = new
        {
            adminInfo.AdminId,
            adminInfo.Name,
            adminInfo.FullName,
            adminInfo.Status,
            adminInfo.CreateById            
        };
        string jsonString = Newtonsoft.Json.JsonConvert.SerializeObject(objResult);
        context.Response.ContentType = "application/json";
        context.Response.Write(jsonString);
    }    

    /// <summary>
    /// Lấy danh sách Admin
    /// </summary>
    /// <param name="context"></param>
    public void GetAdminList(HttpContext context)
    {
        var adminList = AdminBll.Instance.GetAdminList();
        string jsonString = Newtonsoft.Json.JsonConvert.SerializeObject(adminList);
        context.Response.ContentType = "application/json";
        context.Response.Write(jsonString);
    }
    /// <summary>
    /// Lấy thông tin Admin
    /// </summary>
    /// <param name="context"></param>
    public void GetAdminInfo(HttpContext context)
    {
        var adminId = Convert.ToInt32(context.Request.QueryString["adminId"] ?? "-1");
        var adminInfo = AdminBll.Instance.GetAdminById(adminId);
        if (adminInfo == null) return;
        var objResult = new
        {
            adminInfo.AdminId,
            adminInfo.Name,
            adminInfo.FullName,
            adminInfo.Status,
            adminInfo.CreateById            
        };
        string jsonString = Newtonsoft.Json.JsonConvert.SerializeObject(objResult);
        context.Response.ContentType = "application/json";
        context.Response.Write(jsonString);
    }
    public void GetAdminListNotInRole(HttpContext context)
    {
        string userName = context.Request.QueryString["userName"] ?? "";
        int roleId = Convert.ToInt32(context.Request.QueryString["roleId"] ?? "-1");
        var listAdmin = AdminBll.Instance.GetListAdminNotInRole(userName, roleId);
        string jsonString = Newtonsoft.Json.JsonConvert.SerializeObject(listAdmin);
        context.Response.ContentType = "application/json";
        context.Response.Write(jsonString);
    }
    public void GetListAccountByRole(HttpContext context)
    {
        int roleId = Convert.ToInt32(context.Request.QueryString["RoleId"] ?? "-1");
        var objAccount = AdminBll.Instance.GetAdminByRoleId(roleId);
        string jsonString = Newtonsoft.Json.JsonConvert.SerializeObject(objAccount);
        context.Response.ContentType = "application/json";
        context.Response.Write(jsonString);
    }
    /// <summary>
    /// Lấy tên đăng nhập
    /// </summary>
    /// <param name="context"></param>
    public void GetUserName(HttpContext context)
    {
        var objAccount = Utils.AdminUtil.AdminName;
        string jsonString = Newtonsoft.Json.JsonConvert.SerializeObject(objAccount);
        context.Response.ContentType = "application/json";
        context.Response.Write(jsonString);
    }
    
    private void AdminGetList(HttpContext context)
    {
        var lst = AdminBll.Instance.AdminGetList();
        var obj = new
        {
            Items = lst,
            TotalRecord = lst.Count
        };
        string jsonString = Newtonsoft.Json.JsonConvert.SerializeObject(obj);
        context.Response.ContentType = "application/json";
        context.Response.Write(jsonString);
    }

    private void AdminGetInfo(HttpContext context)
    {
        int id = Convert.ToInt32(context.Request.QueryString["id"] ?? "-1");
        var obj = AdminBll.Instance.AdminGetInfoById(id);
        string jsonString = Newtonsoft.Json.JsonConvert.SerializeObject(obj);
        context.Response.ContentType = "application/json";
        context.Response.Write(jsonString);
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }
}