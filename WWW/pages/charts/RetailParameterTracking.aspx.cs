using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using WorkFlowBLL;

public partial class pages_charts_RetailParameterTracking : System.Web.UI.Page
{
    public string lastDate = DateTime.Now.ToString("MM/dd/yyyy");
    
    protected void Page_Load(object sender, EventArgs e)
    {
        if(!IsPostBack) {
            lastDate = Dashboard.Instance.TrackingGetLastDate().Date.Value.ToString("MM/dd/yyyy");
        }
    }
}