using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using WorkFlowBLL;

/// <summary>
/// Summary description for PermissionWS
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class PermissionWS : System.Web.Services.WebService {

    public PermissionWS()
    {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }
    /// <summary>
    /// Xóa danh sách quyền của AdminId
    /// Author:trung.pham
    /// </summary>
    /// <param name="adminId"></param>
    /// <param name="roleIds">Danh sách roleIds phân cách bằng dấu ,</param>
    /// <returns>-1: Lỗi, 1: Thành công</returns>
    [WebMethod(EnableSession = true)]
    public int DeletePermisstionByRoleList(int adminId, string roleIds)
    {
        return PermissionBll.Instance.DeletePermisstionByRoleList(adminId, roleIds);
    }
    /// <summary>
    /// Thêm nhóm quyền vào AdminId
    /// Author:trung.pham
    /// </summary>
    /// <param name="adminId"></param>
    /// <param name="roleIds">Danh sách roleIds phân cách bằng dấu ,</param>
    /// <returns>-1: Lỗi, 1: Thành công</returns>
    [WebMethod(EnableSession = true)]
    public int InsertPermissionByRoleList(int adminId, string roleIds)
    {
        return PermissionBll.Instance.InsertPermissionByRoleList(adminId, roleIds);
    }
    [WebMethod(EnableSession = true)]
    public int DeletePermisionByListAdmin(int roleId, string listAdmin)
    {
        return PermissionBll.Instance.DeletePermisionByListAdmin(roleId, listAdmin);
    }
    [WebMethod(EnableSession = true)]
    public int DeletePermision(int roleId, int adminId)
    {
        return PermissionBll.Instance.DeletePermision(roleId, adminId);
    }
    
}
