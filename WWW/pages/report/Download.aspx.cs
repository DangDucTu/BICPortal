using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class pages_report_Download : System.Web.UI.Page
{
    public string fileName = string.Empty;
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            fileName = Request.QueryString["n"].ToString();
        }
    }
}