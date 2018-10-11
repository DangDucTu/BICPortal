using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using WorkFlowBLL;
using DevExpress.XtraCharts;
using DevExpress.XtraCharts.Web;
using System.Drawing;

public partial class pages_charts_IncentiveAnalysis : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            this.BindIncentiveBusiness();
            this.BindIncentivePosition();
            this.BindPieChartRetail();
            this.BindPieChartSme();
        }
    }

    protected void BindIncentiveBusiness()
    {
        var obj = Dashboard.Instance.IncentiveByBusiness();

        Series series1 = new Series("SME", ViewType.Bar);
        series1.DataSource = obj.Where(c => c.PRODUCT == "SME");
        series1.ArgumentDataMember = "PARAMETER";
        series1.ValueDataMembers[0] = "AMOUNT";
        series1.LabelsVisibility = DevExpress.Utils.DefaultBoolean.True;

        Series series2 = new Series("RETAIL", ViewType.Bar);
        series2.DataSource = obj.Where(c => c.PRODUCT == "Retail");
        series2.ArgumentDataMember = "PARAMETER";
        series2.ValueDataMembers[0] = "AMOUNT";
        series2.LabelsVisibility = DevExpress.Utils.DefaultBoolean.True;

        chart1.Series.Clear();
        chart1.Series.AddRange(new Series[] { series1, series2 });

        GetChartTitle(chart1, "By business units",
            ChartTitleDockStyle.Top, true, "Arial", 11, System.Drawing.FontStyle.Bold, System.Drawing.Color.FromArgb(49, 134, 172), 10);

    }

    public void GetChartTitle(WebChartControl chartId, string title, ChartTitleDockStyle titleDock, bool antialiasing,
        string fontName, int fontSize, System.Drawing.FontStyle fontStyle, System.Drawing.Color color, int indent)
    {
        ChartTitle chartTitle1 = new ChartTitle();
        chartTitle1.Text = title;

        chartTitle1.Dock = titleDock;

        // Customize a title's appearance.
        chartTitle1.Antialiasing = antialiasing;
        chartTitle1.Font = new System.Drawing.Font(fontName, fontSize, fontStyle);
        chartTitle1.TextColor = System.Drawing.Color.Red;
        chartTitle1.Indent = indent;

        chartId.Titles.Clear();
        chartId.Titles.Add(chartTitle1);
    }

    protected void cbProduct_Callback(object sender, DevExpress.Web.ASPxClasses.CallbackEventArgsBase e)
    {
        if (e.Parameter == "TimeLine")
        {
            cbProduct.Items.Clear();
            string teams = (string)cbDivision.Value;
            switch (teams)
            {
                case "sme":
                    cbProduct.Items.Add("MBO/SBO", "A");
                    cbProduct.Items.Add("PSA", "B");
                    cbProduct.Items.Add("DSA", "C");
                    cbProduct.SelectedIndex = 0;
                    break;
                case "retail":
                    cbProduct.Items.Add("PB", "E");
                    cbProduct.Items.Add("PSE Loan Agent", "F");
                    cbProduct.Items.Add("PSE Loan Official", "G");
                    cbProduct.Items.Add("PSE CASA Agent", "H");
                    cbProduct.Items.Add("PSE CASA Official", "I");
                    cbProduct.Items.Add("RM/SRM", "J");
                    cbProduct.Items.Add("Head of Sales", "K");
                    cbProduct.Items.Add("Head of Hub", "L");
                    cbProduct.Items.Add("Branch Manager", "M");
                    cbProduct.Items.Add("AP Agent", "N");
                    cbProduct.Items.Add("AP Official", "O");
                    cbProduct.Items.Add("CL Agent", "P");
                    cbProduct.Items.Add("CL Official", "Q");
                    cbProduct.Items.Add("WB Agent", "R");
                    cbProduct.Items.Add("WB Official", "S");
                    cbProduct.SelectedIndex = 0;
                    break;
            }
        }
    }

    protected void BindIncentivePosition()
    {
        string division = (string)cbDivision.Value;
        string product = (string)cbProduct.Value;

        var obj = Dashboard.Instance.IncentiveByPosition(product);

        Series series1 = new Series("POSITION", ViewType.Bar);
        series1.DataSource = obj;
        series1.ArgumentDataMember = "PARAMETER";
        series1.ValueDataMembers[0] = "AMOUNT";
        series1.LabelsVisibility = DevExpress.Utils.DefaultBoolean.True;

        chart2.Series.Clear();
        chart2.Series.Add(series1);
        chart2.Legend.Visible = false;

        GetChartTitle(chart2, "By positions",
            ChartTitleDockStyle.Top, true, "Arial", 11, System.Drawing.FontStyle.Bold, System.Drawing.Color.FromArgb(49, 134, 172), 10);
    }

    protected void chart2_CustomCallback(object sender, CustomCallbackEventArgs e)
    {
        if (e.Parameter == "TimeLine1")
            BindIncentivePosition();
    }


    protected void BindPieChartRetail()
    {
        string month = (string)cbInsentiveRetail.Value;

        var obj = Dashboard.Instance.IncentiveRetail(month);

        Series series1 = new Series("Retail", ViewType.Pie);
        
        series1.DataSource = obj;
        series1.ArgumentDataMember = "PRODUCT";
        series1.ValueDataMembers[0] = "AMOUNT";
        series1.LabelsVisibility = DevExpress.Utils.DefaultBoolean.False;

        PiePointOptions PointOptions = (PiePointOptions)series1.Label.PointOptions;
        PointOptions.PercentOptions.ValueAsPercent = true;
        PointOptions.PointView = PointView.ArgumentAndValues;
        PointOptions.ValueNumericOptions.Format = NumericFormat.Percent;
        PointOptions.ValueNumericOptions.Precision = 0;
        //PieSeriesLabel label = (PieSeriesLabel)series1.Label;
        //label.Position = PieSeriesLabelPosition.Radial;
        //label.LineVisible = false;

        chart3.Series.Clear();
        chart3.Series.Add(series1);
        chart3.Legend.Visible = true;
        chart3.BorderOptions.Color = Color.White;

        GetChartTitle(chart3, "RETAIL",
            ChartTitleDockStyle.Top, true, "Arial", 11, System.Drawing.FontStyle.Bold, System.Drawing.Color.FromArgb(49, 134, 172), 10);
        
    }

    protected void BindPieChartSme()
    {
        string month = (string)cbInsentiveRetail.Value;

        var obj = Dashboard.Instance.IncentiveSme(month);

        Series series1 = new Series("SME", ViewType.Pie);
        series1.DataSource = obj;
        series1.ArgumentDataMember = "PRODUCT";
        series1.ValueDataMembers[0] = "AMOUNT";
        series1.LabelsVisibility = DevExpress.Utils.DefaultBoolean.False;


        PiePointOptions PointOptions = (PiePointOptions)series1.Label.PointOptions;
        PointOptions.PercentOptions.ValueAsPercent = true;
        PointOptions.PointView = PointView.ArgumentAndValues;
        PointOptions.ValueNumericOptions.Format = NumericFormat.Percent;
        PointOptions.ValueNumericOptions.Precision = 0;

        chart4.Series.Clear();
        chart4.Series.Add(series1);
        chart4.Legend.Visible = true;
        chart4.BorderOptions.Color = Color.White;

        GetChartTitle(chart4, "SME",
            ChartTitleDockStyle.Top, true, "Arial", 11, System.Drawing.FontStyle.Bold, System.Drawing.Color.FromArgb(49, 134, 172), 10);

    }

    protected void chart3_CustomCallback(object sender, CustomCallbackEventArgs e)
    {
        if (e.Parameter.Equals("TimeLine"))
            BindPieChartRetail();
    }

    protected void chart4_CustomCallback(object sender, CustomCallbackEventArgs e)
    {
        if (e.Parameter.Equals("TimeLine"))
            BindPieChartSme();
    }
}