using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class admin_pages_RoleInfo : System.Web.UI.Page
{
    protected string RoleId { get; set; }

    protected void Page_Load(object sender, EventArgs e)
    {
        RoleId = Request.QueryString["Id"] ?? "0";
    }
}