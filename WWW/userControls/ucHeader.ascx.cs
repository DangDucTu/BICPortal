using System;
using Utils;
using System.Web;

public partial class admin_userControls_ucHeader : System.Web.UI.UserControl
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!AdminUtil.IsLogin)
        {            
            Response.Redirect("/login");
        }
    }
    protected void lbtLogout_Click(object sender, EventArgs e)
    {
        AdminUtil.Logout();
        Response.Redirect("/login");
    }
}