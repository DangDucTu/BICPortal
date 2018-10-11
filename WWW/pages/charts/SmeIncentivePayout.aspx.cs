using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using WorkFlowBLL;
using DevExpress.XtraCharts;
using DevExpress.XtraCharts.Web;
using System.Web.UI.WebControls;
using System.Drawing;

public partial class pages_charts_SmeIncentivePayout : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            GetchartIncentive(incentiveByRegion, "Region");
            GetchartIncentive(incentiveByPosition, "Position");
            BindPieChartContribution();
        }
    }

    public void GetchartIncentive(WebChartControl wc, string type)
    {
        int month = Convert.ToInt32(ddlMonth.SelectedValue);
        var objRegion = Dashboard.Instance.SmeIncentivePayout(2014, month).Where(c => c.By.Equals(type));

        Series series1 = new Series("Incentive", ViewType.Bar);
        series1.DataSource = objRegion.Where(c => c.Parameter.Equals("Incentive"));
        series1.ArgumentDataMember = "Type";
        series1.ValueDataMembers[0] = "Value";

        Series series2 = new Series("# Eligible salesman", ViewType.Point);
        series2.DataSource = objRegion.Where(c => c.Parameter.Equals("# Eligible salesman"));
        series2.ArgumentDataMember = "Type";
        series2.ValueDataMembers[0] = "Value";

        Series series3 = new Series("# Salesman", ViewType.Point);
        series3.DataSource = objRegion.Where(c => c.Parameter.Equals("# Salesman"));
        series3.ArgumentDataMember = "Type";
        series3.ValueDataMembers[0] = "Value";

        wc.Series.Clear();
        wc.Series.AddRange(new Series[] { series1, series2, series3 });

        // Create two secondary axes, and add them to the chart's Diagram.
        SecondaryAxisY myAxisY = new SecondaryAxisY("my Y-Axis");
        ((XYDiagram)wc.Diagram).SecondaryAxesY.Clear();
        ((XYDiagram)wc.Diagram).SecondaryAxesY.Add(myAxisY);

        // Assign the series2 to the created axes.
        ((PointSeriesView)series3.View).AxisY = myAxisY;
        myAxisY.Title.Visible = true;
        myAxisY.Title.Alignment = StringAlignment.Center;
        myAxisY.Title.Text = "#Salesman";
        myAxisY.Title.TextColor = Color.Black;
        myAxisY.Title.Antialiasing = true;
        myAxisY.Title.Font = new Font("Tahoma", 9, FontStyle.Bold);

        DisplayOptionChart(wc);

        string title = string.Empty;
        title = wc.ID.Equals("incentiveByRegion") ? "Incentive by Region" : "Incentive by Position";

        GetChartTitle(wc, title,
            ChartTitleDockStyle.Top, true, "Arial", 9, System.Drawing.FontStyle.Bold, System.Drawing.Color.Red, 10);

        XYDiagram diagram = (XYDiagram)wc.Diagram;

        // Customize the appearance of the X-axis title.
        diagram.AxisY.Title.Visible = true;
        diagram.AxisY.Title.Alignment = StringAlignment.Center;
        diagram.AxisY.Title.Text = "Incentive";
        diagram.AxisY.Title.TextColor = Color.Black;
        diagram.AxisY.Title.Antialiasing = true;
        diagram.AxisY.Title.Font = new Font("Tahoma", 10, FontStyle.Bold);
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
        chartTitle1.TextColor = color;
        chartTitle1.Indent = indent;

        chartId.Titles.Clear();
        chartId.Titles.Add(chartTitle1);
    }

    protected void DisplayOptionChart(WebChartControl chart)
    {
        foreach (Series series in chart.Series)
        {
            series.LabelsVisibility = DevExpress.Utils.DefaultBoolean.False;
            series.Label.Border.Visible = false;
            series.Label.LineVisible = false;
            series.Label.LineLength = 2;
            series.Label.Antialiasing = false;
            series.Label.BackColor = System.Drawing.Color.Transparent;
            series.Label.Font = new System.Drawing.Font("Tahoma", 7, System.Drawing.FontStyle.Regular);
        }

        Legend legend = chart.Legend;

        // Display the chart control's legend.
        legend.Visible = true;

        // Define its margins and alignment relative to the diagram.        
        legend.AlignmentHorizontal = LegendAlignmentHorizontal.Center;
        legend.AlignmentVertical = LegendAlignmentVertical.BottomOutside;
        legend.Direction = LegendDirection.LeftToRight;
        legend.Border.Visible = false;

        ((XYDiagram)chart.Diagram).AxisY.Visible = true;
        ((XYDiagram)chart.Diagram).AxisY.Label.Visible = true;
        ((XYDiagram)chart.Diagram).AxisY.GridLines.Visible = false;
    }

    protected void BindPieChartContribution()
    {
        int month = Convert.ToInt32(ddlMonth.SelectedValue);
        int year = 2014;

        var obj = Dashboard.Instance.SmeIncentiveContribution(year, month);

        Series series1 = new Series("SME", ViewType.Pie);
        series1.DataSource = obj;
        series1.ArgumentDataMember = "Parameter";
        series1.ValueDataMembers[0] = "Value";
        series1.LabelsVisibility = DevExpress.Utils.DefaultBoolean.True;

        PiePointOptions PointOptions = (PiePointOptions)series1.Label.PointOptions;
        PointOptions.PercentOptions.ValueAsPercent = true;
        PointOptions.PointView = PointView.ArgumentAndValues;
        PointOptions.ValueNumericOptions.Format = NumericFormat.Percent;
        PointOptions.ValueNumericOptions.Precision = 2;


        productContribution.Legend.Visible = false;


        productContribution.Series.Clear();
        productContribution.Series.Add(series1);

        GetChartTitle(productContribution, "Product Contribution in Incentive",
            ChartTitleDockStyle.Top, true, "Arial", 11, System.Drawing.FontStyle.Bold, System.Drawing.Color.Red, 10);

    }

    protected void ddlMonth_SelectedIndexChanged(object sender, EventArgs e)
    {
        GetchartIncentive(incentiveByRegion, "Region");
        GetchartIncentive(incentiveByPosition, "Position");
        BindPieChartContribution();
    }
}