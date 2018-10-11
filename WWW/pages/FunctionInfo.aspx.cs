using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class admin_pages_FunctionInfo : System.Web.UI.Page
{
    protected string FunctionId { get; set; }
    protected void Page_Load(object sender, EventArgs e)
    {
        FunctionId = Request.QueryString["Id"] ?? "0";
    }
}