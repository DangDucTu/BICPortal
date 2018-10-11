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
public class DivisionWS : System.Web.Services.WebService
{

    public DivisionWS () {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod]
    public int InsertDivision(string name, string divisionCode, int status)
    {
        return DivisionBll.Instance.InsertDivision(name, divisionCode, status);
    }

    [WebMethod]
    public int UpdateDivision(int divisionId, string name, string divisionCode, int status)
    {
        return DivisionBll.Instance.UpdateDivision(divisionId, name, divisionCode, status);
    }

    [WebMethod]
    public int DeleteDepartment(int departmentId)
    {
        return DepartmentBll.Instance.DeleteDeparment(departmentId);
    }

    [WebMethod]
    public int UpdateAdminDivsion(string adminIds, int divisionId)
    {
        return DivisionBll.Instance.UpdateAdminDivision(adminIds, divisionId);
    }

    [WebMethod]
    public int RemoveMemberDivision(int adminId)
    {
        return DivisionBll.Instance.RemoveMemberDivision(adminId);
    }
}
