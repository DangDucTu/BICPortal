using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using WorkFlowBLL;

/// <summary>
/// Summary description for FunctionWS
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class FunctionWS : System.Web.Services.WebService {

    public FunctionWS()
    {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }
    [WebMethod(EnableSession = true)]
    public int InsertFunction(int? parentId, string name, string url, int order, int status, bool showInMenu)
    {
        return FunctionBll.Instance.InsertFunction(parentId, name, url, order, status = 1, showInMenu = true);
    }

    [WebMethod(EnableSession = true)]
    public int UpdateFunction(int functionId, string name, string url, int? parentId, int order, int status, bool showInMenu)
    {
        return FunctionBll.Instance.UpdateFunction(functionId, name, url, parentId, order, status, showInMenu);
    }

    [WebMethod(EnableSession = true)]
    public int ChangeFunctionStatus(int functionId, int status)
    {
        return FunctionBll.Instance.ChangeFunctionStatus(functionId, status);
    }
    [WebMethod(EnableSession = true)]
    public string DeleteListFunction(string listFunctionId)
    {
        string[] listFunction = listFunctionId.Split(',');
        string strFunction = "";
        var isDeleted = 1;
        foreach (string item in listFunction)
        {
            isDeleted = DeleteFunction(Convert.ToInt32(item));
            if (isDeleted == -2)
            {
                strFunction += (FunctionBll.Instance.GetFunctionById(Convert.ToInt32(item))).Name + ", ";
            }
            if (isDeleted == 0)
            {
                return "0";
            }
        }
        if (strFunction.Length > 2)
            strFunction = strFunction.Substring(0, strFunction.Length - 2);
        return strFunction;
    }
    [WebMethod(EnableSession = true)]
    public int DeleteFunction(int functionId)
    {
        return FunctionBll.Instance.DeleteFunction(functionId);
    }
    
}
