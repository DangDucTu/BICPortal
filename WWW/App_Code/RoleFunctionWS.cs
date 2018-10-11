using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using WorkFlowBLL;

/// <summary>
/// Summary description for RoleFunctionWS
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class RoleFunctionWS : System.Web.Services.WebService {

    public RoleFunctionWS()
    {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }
    [WebMethod(EnableSession = true)]
    public string DeleteListRoleOfFunction(int functionId, string listRoleId)
    {
        string[] listRole = listRoleId.Split(',');
        string strFunction = "";
        var isDeleted = 1;
        foreach (string item in listRole)
        {
            isDeleted = DeleteRoleOfFunction(Convert.ToInt32(item), functionId);
            if (isDeleted == -1)
            {
                strFunction += (FunctionBll.Instance.GetFunctionById(Convert.ToInt32(item))).Name + ", ";
            }
            if (isDeleted == 0)
                return "-1";
        }
        if (strFunction.Length > 2)
            strFunction = strFunction.Substring(0, strFunction.Length - 2);
        return strFunction;
    }
    [WebMethod(EnableSession = true)]
    public int DeleteRoleOfFunction(int roleId, int functionId)
    {
        return RoleFunctionBll.Instance.DeleteRoleOfFunction(roleId, functionId);
    }

    [WebMethod(EnableSession = true)]
    public int InsertListRoleFunction(int functionId, string roleIds)
    {
        return RoleFunctionBll.Instance.InsertListRoleFunction(functionId, roleIds);
    }
    [WebMethod(EnableSession = true)]
    public int InsertRoleFunctionById(int functionId, int roleId)
    {
        return RoleFunctionBll.Instance.InsertRoleFunctionById(functionId, roleId);
    }
    
}
