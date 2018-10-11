using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Utils;

public partial class pages_report_RequestManagement : System.Web.UI.Page
{
    protected string accountName = string.Empty;
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            if (AdminUtil.IsLogin)
                accountName = AdminUtil.AdminName;
        }
    }
}