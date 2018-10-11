using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class pages_report_BIReportView : System.Web.UI.Page
{
    protected string ReportId { get; set; }
    protected void Page_Load(object sender, EventArgs e)
    {
        ReportId = Request.QueryString["Id"] ?? "0";
    }
}