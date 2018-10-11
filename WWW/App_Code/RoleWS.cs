using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using WorkFlowBLL;

/// <summary>
/// Summary description for RoleWS
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class RoleWS : System.Web.Services.WebService {
    public RoleWS()
    {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod(EnableSession = true)]
    public int InsertRole(string name, string description, int status)
    {
        return RoleBll.Instance.InsertRole(name, description, status);
    }

    [WebMethod(EnableSession = true)]
    public int UpdateRole(int roleId, string name, string description, int status)
    {
        return RoleBll.Instance.UpdateRole(roleId, name, description, status);
    }

    [WebMethod(EnableSession = true)]
    public int ChangeStatus(int roleId, int status)
    {
        return RoleBll.Instance.ChangeStatus(roleId, status);
    }

    [WebMethod(EnableSession = true)]
    public int DeleteListRole(string listRoleId)
    {
        string[] listRole = listRoleId.Split(',');
        var result = 1;
        foreach (string item in listRole)
        {
            result = ChangeStatus(Convert.ToInt32(item), 2);
            if (result == 0)
                return 0;
        }
        return result;
    }
    [WebMethod(EnableSession = true)]
    public int DeleteRole(int roleId)
    {
        return RoleBll.Instance.DeleteRole(roleId);
    }
    [WebMethod(EnableSession = true)]
    public int DeleteRoleByAdminId(int adminId, string roleIds)
    {
        return new RoleBll().DeleteRoleByAdminId(adminId, roleIds);
    }    
    
}
