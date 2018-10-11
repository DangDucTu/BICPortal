using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class pages_charts_KeyIdicator : System.Web.UI.Page
{
    protected string account = string.Empty;
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            account = Utils.AdminUtil.AdminName;
        }
    }
}