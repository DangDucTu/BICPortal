using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Utils;

public partial class MasterPageAdmin : System.Web.UI.MasterPage
{
    private string[] arrAllowUrl = 
    {
        "/pages/Portal.aspx",                                       
        "/pages/AccessDeny.aspx",
        "/pages/Login.aspx",                                       
    };

    protected void Page_Init(object sender, EventArgs e)
    {
        if (!AdminUtil.IsLogin)
        {
            Response.Redirect("/pages/Login.aspx");
        }

        if (!arrAllowUrl.Any(c => c.Equals(Request.Url.AbsolutePath, StringComparison.OrdinalIgnoreCase)))
            if (!WorkFlowBLL.PermissionBll.Instance.IsAllowAccessUrl(Request.Url.AbsolutePath))
            {
                Response.Redirect("/pages/AccessDeny.aspx");
            }
    }

    protected void Page_Load(object sender, EventArgs e)
    {

    }
}
