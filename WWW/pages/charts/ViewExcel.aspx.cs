using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class pages_charts_ViewExcel : System.Web.UI.Page
{
    protected string t = string.Empty;
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            if (Page.RouteData.Values["t"] != null)
                t = Page.RouteData.Values["t"].ToString();
        }
    }
}