using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using WorkFlowBLL;

/// <summary>
/// Summary description for HrWS
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class HrWS : System.Web.Services.WebService {

    public HrWS () {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod]
    public int InsertHr(string dao, string hrStaff, string saleName, string gender, string branchCode, string channel, string team, string position,
            string subPosition, string dateStart, string nationalId, string phone, string dob, string email, string payroll, string address, string note)
    {
        return HR.Instance.InsertHr(dao, hrStaff, saleName, gender, branchCode, channel,
            team, position, subPosition, dateStart, nationalId, phone, dob, email, payroll, address, note);
    }

    [WebMethod]
    public int UpdateHr(string saleCode, string dao, string hrStaff, string saleName, string gender, string branchCode, string channel, string team, string dateStart, string nationalId, string phone, string dob, string email, string payroll, string address, string note)
    {
        return HR.Instance.UpdateHr(saleCode, dao, hrStaff, saleName, gender,
            channel, team, dateStart, nationalId, phone, dob, email, payroll, address, note);
    }

    [WebMethod]
    public int SaleOffHr(string saleCode, string dateOff)
    {
        return HR.Instance.SaleOffHr(saleCode, dateOff);
    }
}
