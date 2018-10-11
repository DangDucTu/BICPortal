using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using WorkFlowBLL;

/// <summary>
/// Summary description for DepartmentWS
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class DepartmentWS : System.Web.Services.WebService {

    public DepartmentWS () {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod]
    public int InsertDepartment(string name, int adminId, string description, int status)
    {
        return DepartmentBll.Instance.InsertDepartment(name, adminId, description, status);
    }

    [WebMethod]
    public int UpdateDepartment(int departmentId, string name, int adminId, string description, int status)
    {
        return DepartmentBll.Instance.UpdateDepartment(departmentId, name, adminId, description, status);
    }

    [WebMethod]
    public int DeleteDepartment(int departmentId)
    {
        return DepartmentBll.Instance.DeleteDeparment(departmentId);
    }

    [WebMethod]
    public int UpdateAdminDepartment(string adminIds, int departmentId)
    {
        return DepartmentBll.Instance.UpdateAdminDepartment(adminIds, departmentId);
    }

    [WebMethod]
    public int RemoveMemberDepartment(int adminId)
    {
        return DepartmentBll.Instance.RemoveMemberDepartment(adminId);
    }
}
