using DevExpress.XtraCharts;
using DevExpress.XtraCharts.Web;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using WorkFlowBLL;

public partial class pages_charts_SalesProductivity : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            GetChartProductivity();
            GetChartBranchVsAC();
        }
    }

    protected void GetChartProductivity()
    {
        WebChartControl chartProductivity = new WebChartControl();
        //chartProductivity.BorderOptions.Visible = false;

        var obj1 = Dashboard.Instance.ProductivityRetailMonthlySnapshot("loan");
        
        Series series1 = new Series("Loan", ViewType.Spline);
        series1.DataSource = obj1;
        series1.ArgumentDataMember = "MONTH";
        series1.ValueDataMembers[0] = "Amount";
        series1.ArgumentScaleType = ScaleType.Auto;
        series1.LabelsVisibility = DevExpress.Utils.DefaultBoolean.True;

        var obj2 = Dashboard.Instance.ProductivityRetailMonthlySnapshot("deposit");

        Series series2 = new Series("Deposit", ViewType.Spline);
        series2.DataSource = obj2;
        series2.ArgumentDataMember = "MONTH";
        series2.ValueDataMembers[0] = "Amount";
        series2.ArgumentScaleType = ScaleType.Auto;
        series2.LabelsVisibility = DevExpress.Utils.DefaultBoolean.True;

        chartProductivity.Series.AddRange(new Series[] {series1, series2});

        GetChartTitle(chartProductivity, "Productivity By Product",
            ChartTitleDockStyle.Top, true, "Arial", 12, FontStyle.Bold, Color.FromArgb(49,134,172), 10);      

        foreach (Series series in chartProductivity.Series)
        {
            LineSeriesView view = (LineSeriesView)series.View;
            view.PointMarkerOptions.Kind = MarkerKind.Diamond;
            view.PointMarkerOptions.Size = 8;
        }

        chartProductivity.Legend.Visible = true;
        chartProductivity.Width = Unit.Pixel(500);
        chartProductivity.Height = Unit.Pixel(230);

        Legend legend = chartProductivity.Legend;

        // Display the chart control's legend.
        legend.Visible = true;

        // Define its margins and alignment relative to the diagram.        
        legend.AlignmentHorizontal = LegendAlignmentHorizontal.Center;
        legend.AlignmentVertical = LegendAlignmentVertical.BottomOutside;
        legend.Direction = LegendDirection.LeftToRight;
        legend.Border.Visible = false;

        panel1.Controls.Add(chartProductivity);

    }

    public void GetChartBranchVsAC()
    {
        WebChartControl chart1 = new WebChartControl();

        var obj1 = Dashboard.Instance.ProductivityRetailMonthlyBranchVsAC("Auto Loan", "Branch");

        Series series1 = new Series("Branch", ViewType.Spline);
        series1.DataSource = obj1;
        series1.ArgumentDataMember = "Month";
        series1.ValueDataMembers[0] = "Amount";
        series1.ArgumentScaleType = ScaleType.Auto;        

        var obj2 = Dashboard.Instance.ProductivityRetailMonthlyBranchVsAC("Auto Loan", "Alternative Channel");

        Series series2 = new Series("AC", ViewType.Spline);
        series2.DataSource = obj2;
        series2.ArgumentDataMember = "MONTH";
        series2.ValueDataMembers[0] = "Amount";
        series2.ArgumentScaleType = ScaleType.Auto;        

        chart1.Series.AddRange(new Series[] { series1, series2 });

        

        GetChartTitle(chart1, "Auto Loan",
            ChartTitleDockStyle.Top, true, "Arial", 12, FontStyle.Bold, Color.FromArgb(49, 134, 172), 10);

        this.FormatLegendChartBranchVsAC(chart1);

        panel2.Controls.Add(chart1);

        XYDiagram myDiagram = (XYDiagram)chart1.Diagram;

        myDiagram.AxisX.Interlaced = true;
        myDiagram.AxisX.GridSpacing = 10;
        myDiagram.AxisX.Label.Angle = -20;


        WebChartControl chart2 = new WebChartControl();

        obj1 = Dashboard.Instance.ProductivityRetailMonthlyBranchVsAC("Home Loan", "Branch");

        series1 = new Series("Branch", ViewType.Spline);
        series1.DataSource = obj1;
        series1.ArgumentDataMember = "Month";
        series1.ValueDataMembers[0] = "Amount";
        series1.ArgumentScaleType = ScaleType.Auto;

        obj2 = Dashboard.Instance.ProductivityRetailMonthlyBranchVsAC("Home Loan", "Alternative Channel");

        series2 = new Series("AC", ViewType.Spline);
        series2.DataSource = obj2;
        series2.ArgumentDataMember = "MONTH";
        series2.ValueDataMembers[0] = "Amount";
        series2.ArgumentScaleType = ScaleType.Auto;

        chart2.Series.AddRange(new Series[] { series1, series2 });

        GetChartTitle(chart2, "Home Loan",
            ChartTitleDockStyle.Top, true, "Arial", 12, FontStyle.Bold, Color.FromArgb(49, 134, 172), 10);

        this.FormatLegendChartBranchVsAC(chart2);

        panel3.Controls.Add(chart2);
        myDiagram = (XYDiagram)chart2.Diagram;

        myDiagram.AxisX.Interlaced = true;
        myDiagram.AxisX.GridSpacing = 10;
        myDiagram.AxisX.Label.Angle = -20;


        WebChartControl chart3 = new WebChartControl();

        obj1 = Dashboard.Instance.ProductivityRetailMonthlyBranchVsAC("Household Business Loan", "Branch");

        series1 = new Series("Branch", ViewType.Spline);
        series1.DataSource = obj1;
        series1.ArgumentDataMember = "Month";
        series1.ValueDataMembers[0] = "Amount";
        series1.ArgumentScaleType = ScaleType.Auto;

        obj2 = Dashboard.Instance.ProductivityRetailMonthlyBranchVsAC("Household Business Loan", "Alternative Channel");

        series2 = new Series("AC", ViewType.Spline);
        series2.DataSource = obj2;
        series2.ArgumentDataMember = "MONTH";
        series2.ValueDataMembers[0] = "Amount";
        series2.ArgumentScaleType = ScaleType.Auto;

        chart3.Series.AddRange(new Series[] { series1, series2 });

        GetChartTitle(chart3, "Household Business Loan",
            ChartTitleDockStyle.Top, true, "Arial", 12, FontStyle.Bold, Color.FromArgb(49, 134, 172), 10);

        this.FormatLegendChartBranchVsAC(chart3);

        panel4.Controls.Add(chart3);
        myDiagram = (XYDiagram)chart3.Diagram;

        myDiagram.AxisX.Interlaced = true;
        myDiagram.AxisX.GridSpacing = 10;
        myDiagram.AxisX.Label.Angle = 20;


        WebChartControl chart4 = new WebChartControl();

        obj1 = Dashboard.Instance.ProductivityRetailMonthlyBranchVsAC("Consumption Loan (Group)", "Branch");

        series1 = new Series("Branch", ViewType.Spline);
        series1.DataSource = obj1;
        series1.ArgumentDataMember = "Month";
        series1.ValueDataMembers[0] = "Amount";
        series1.ArgumentScaleType = ScaleType.Auto;

        obj2 = Dashboard.Instance.ProductivityRetailMonthlyBranchVsAC("Consumption Loan (Group)", "Alternative Channel");

        series2 = new Series("AC", ViewType.Spline);
        series2.DataSource = obj2;
        series2.ArgumentDataMember = "MONTH";
        series2.ValueDataMembers[0] = "Amount";
        series2.ArgumentScaleType = ScaleType.Auto;

        chart4.Series.AddRange(new Series[] { series1, series2 });

        GetChartTitle(chart4, "Consumption Loan (Group)",
            ChartTitleDockStyle.Top, true, "Arial", 12, FontStyle.Bold, Color.FromArgb(49, 134, 172), 10);

        this.FormatLegendChartBranchVsAC(chart4);

        panel5.Controls.Add(chart4);
        myDiagram = (XYDiagram)chart4.Diagram;

        myDiagram.AxisX.Interlaced = true;
        myDiagram.AxisX.GridSpacing = 10;
        myDiagram.AxisX.Label.Angle = 20;
    }

    protected void FormatLegendChartBranchVsAC(WebChartControl chart)
    {
        chart.Width = Unit.Pixel(270);
        chart.Height = Unit.Pixel(220);

        Legend legend = chart.Legend;

        // Display the chart control's legend.
        legend.Visible = true;

        // Define its margins and alignment relative to the diagram.        
        legend.AlignmentHorizontal = LegendAlignmentHorizontal.Center;
        legend.AlignmentVertical = LegendAlignmentVertical.BottomOutside;
        legend.Direction = LegendDirection.LeftToRight;
        legend.Border.Visible = false;

        foreach (Series series in chart.Series)
        {
            LineSeriesView view = (LineSeriesView)series.View;
            view.PointMarkerOptions.Kind = MarkerKind.Diamond;
        }
        chart.BorderOptions.Visible = false;
    }
    

    public void GetChartTitle(WebChartControl chartId, string title, ChartTitleDockStyle titleDock, bool antialiasing,
        string fontName, int fontSize, FontStyle fontStyle, Color color, int indent)
    {
        ChartTitle chartTitle1 = new ChartTitle();
        chartTitle1.Text = title;

        chartTitle1.Dock = titleDock;

        // Customize a title's appearance.
        chartTitle1.Antialiasing = antialiasing;
        chartTitle1.Font = new Font(fontName, fontSize, fontStyle);
        chartTitle1.TextColor = color;
        chartTitle1.Indent = indent;

        chartId.Titles.Clear();
        chartId.Titles.Add(chartTitle1);
    }
}