using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using WorkFlowBLL;
using DevExpress.XtraCharts;
using DevExpress.XtraCharts.Web;

public partial class pages_charts_TransformationMetrics : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
            this.BindChartSales();
    }

    protected void BindChartSales()
    {
        var obj = Dashboard.Instance.TransformationMetricsSales();
        if (obj != null && obj.Count > 0)
        {
            Series series1 = new Series("Retail", ViewType.Line);
            series1.DataSource = obj.Where(c => c.TYPE==1 && c.DIVISION.Equals("Retail"));
            series1.ArgumentDataMember = "MONTH";
            series1.ValueDataMembers[0] = "AMOUNT";

            chartMetric1.Series.Clear();
            chartMetric1.Series.AddRange(new Series[] { series1 });
            chartMetric1.Legend.Visible = false;

            GetChartTitle(chartMetric1, "Retail",
                ChartTitleDockStyle.Top, true, "Arial", 11, System.Drawing.FontStyle.Bold, System.Drawing.Color.FromArgb(49, 134, 172), 10);

            series1 = new Series("SME", ViewType.Line);
            series1.DataSource = obj.Where(c => c.TYPE == 1 && c.DIVISION.Equals("SME"));
            series1.ArgumentDataMember = "MONTH";
            series1.ValueDataMembers[0] = "AMOUNT";

            chartMetric2.Series.Clear();
            chartMetric2.Series.AddRange(new Series[] { series1 });
            chartMetric2.Legend.Visible = false;

            GetChartTitle(chartMetric2, "SME",
                ChartTitleDockStyle.Top, true, "Arial", 11, System.Drawing.FontStyle.Bold, System.Drawing.Color.FromArgb(49, 134, 172), 10);

            series1 = new Series("Retail", ViewType.Line);
            series1.DataSource = obj.Where(c => c.TYPE == 2 && c.DIVISION.Equals("Retail"));
            series1.ArgumentDataMember = "MONTH";
            series1.ValueDataMembers[0] = "AMOUNT";

            chartMetric3.Series.Clear();
            chartMetric3.Series.AddRange(new Series[] { series1 });
            chartMetric3.Legend.Visible = false;

            GetChartTitle(chartMetric3, "Retail",
                ChartTitleDockStyle.Top, true, "Arial", 11, System.Drawing.FontStyle.Bold, System.Drawing.Color.FromArgb(49, 134, 172), 10);

            series1 = new Series("SME", ViewType.Line);
            series1.DataSource = obj.Where(c => c.TYPE == 2 && c.DIVISION.Equals("SME"));
            series1.ArgumentDataMember = "MONTH";
            series1.ValueDataMembers[0] = "AMOUNT";

            chartMetric4.Series.Clear();
            chartMetric4.Series.AddRange(new Series[] { series1 });
            chartMetric4.Legend.Visible = false;

            GetChartTitle(chartMetric4, "SME",
                ChartTitleDockStyle.Top, true, "Arial", 11, System.Drawing.FontStyle.Bold, System.Drawing.Color.FromArgb(49, 134, 172), 10);

        /*-------------------------------------------------------------------------*/

            series1 = new Series("Total", ViewType.Line);
            var a = obj.Where(c => c.TYPE == 3 && c.SERIES == 1 && c.DIVISION.Equals("Retail"));
            foreach (var item in a)
            {
                item.AMOUNT = Convert.ToInt32(item.AMOUNT);
            }
            series1.DataSource = a;
            series1.ArgumentDataMember = "MONTH";
            series1.ValueDataMembers[0] = "AMOUNT";

            Series series2 = new Series("Total excl .PB", ViewType.Line);
            var b = obj.Where(c => c.TYPE == 3 && c.SERIES == 2 && c.DIVISION.Equals("Retail"));
            foreach (var item in b)
            {
                item.AMOUNT = Convert.ToInt32(item.AMOUNT);
            }
            series2.DataSource = b;
            series2.ArgumentDataMember = "MONTH";
            series2.ValueDataMembers[0] = "AMOUNT";

            chartMetric5.Series.Clear();
            chartMetric5.Series.AddRange(new Series[] { series1, series2 });
            chartMetric5.Legend.Visible = false;

            GetChartTitle(chartMetric5, "Retail",
                ChartTitleDockStyle.Top, true, "Arial", 11, System.Drawing.FontStyle.Bold, System.Drawing.Color.FromArgb(49, 134, 172), 10);

            chartMetric5.Legend.Visible = true;
            chartMetric5.Legend.AlignmentHorizontal = LegendAlignmentHorizontal.Center;
            chartMetric5.Legend.AlignmentVertical = LegendAlignmentVertical.BottomOutside;
            chartMetric5.Legend.Direction = LegendDirection.LeftToRight;
            chartMetric5.Legend.Border.Visible = false;

            series1 = new Series("SME", ViewType.Line);
            series1.DataSource = obj.Where(c => c.TYPE == 3 && c.DIVISION.Equals("SME"));
            series1.ArgumentDataMember = "MONTH";
            series1.ValueDataMembers[0] = "AMOUNT";

            chartMetric6.Series.Clear();
            chartMetric6.Series.AddRange(new Series[] { series1 });
            chartMetric6.Legend.Visible = false;

            GetChartTitle(chartMetric6, "SME",
                ChartTitleDockStyle.Top, true, "Arial", 11, System.Drawing.FontStyle.Bold, System.Drawing.Color.FromArgb(49, 134, 172), 10);

            series1 = new Series("Total", ViewType.Line);
            series1.DataSource = obj.Where(c => c.TYPE == 4 && c.SERIES == 1 && c.DIVISION.Equals("Retail"));
            series1.ArgumentDataMember = "MONTH";
            series1.ValueDataMembers[0] = "AMOUNT";

            series2 = new Series("Total excl .PB", ViewType.Line);
            series2.DataSource = obj.Where(c => c.TYPE == 4 && c.SERIES == 2 && c.DIVISION.Equals("Retail"));
            series2.ArgumentDataMember = "MONTH";
            series2.ValueDataMembers[0] = "AMOUNT";

            chartMetric7.Series.Clear();
            chartMetric7.Series.AddRange(new Series[] { series1, series2 });
            chartMetric7.Legend.Visible = false;

            GetChartTitle(chartMetric7, "Retail",
                ChartTitleDockStyle.Top, true, "Arial", 11, System.Drawing.FontStyle.Bold, System.Drawing.Color.FromArgb(49, 134, 172), 10);

            chartMetric7.Legend.Visible = true;
            chartMetric7.Legend.AlignmentHorizontal = LegendAlignmentHorizontal.Center;
            chartMetric7.Legend.AlignmentVertical = LegendAlignmentVertical.BottomOutside;
            chartMetric7.Legend.Direction = LegendDirection.LeftToRight;
            chartMetric7.Legend.Border.Visible = false;

            series1 = new Series("SME", ViewType.Line);
            series1.DataSource = obj.Where(c => c.TYPE == 4 && c.DIVISION.Equals("SME"));
            series1.ArgumentDataMember = "MONTH";
            series1.ValueDataMembers[0] = "AMOUNT";

            chartMetric8.Series.Clear();
            chartMetric8.Series.AddRange(new Series[] { series1 });
            chartMetric8.Legend.Visible = false;

            GetChartTitle(chartMetric8, "SME",
                ChartTitleDockStyle.Top, true, "Arial", 11, System.Drawing.FontStyle.Bold, System.Drawing.Color.FromArgb(49, 134, 172), 10);

        /*************************************************************************************/

            series1 = new Series("Retail", ViewType.Line);
            series1.DataSource = obj.Where(c => c.TYPE == 5 && c.DIVISION.Equals("Retail"));
            series1.ArgumentDataMember = "MONTH";
            series1.ValueDataMembers[0] = "AMOUNT";            

            chartMetric9.Series.Clear();
            chartMetric9.Series.AddRange(new Series[] { series1 });
            chartMetric9.Legend.Visible = false;

            GetChartTitle(chartMetric9, "Retail",
                ChartTitleDockStyle.Top, true, "Arial", 11, System.Drawing.FontStyle.Bold, System.Drawing.Color.FromArgb(49, 134, 172), 10);

            series1 = new Series("SME", ViewType.Line);
            series1.DataSource = obj.Where(c => c.TYPE == 5 && c.SERIES == 1 && c.DIVISION.Equals("SME"));
            series1.ArgumentDataMember = "MONTH";
            series1.ValueDataMembers[0] = "AMOUNT";

            chartMetric10.Series.Clear();
            chartMetric10.Series.AddRange(new Series[] { series1 });
            chartMetric10.Legend.Visible = false;

            GetChartTitle(chartMetric10, "SME",
                ChartTitleDockStyle.Top, true, "Arial", 11, System.Drawing.FontStyle.Bold, System.Drawing.Color.FromArgb(49, 134, 172), 10);

            series1 = new Series("Total CIF", ViewType.Line);
            series1.DataSource = obj.Where(c => c.TYPE == 6 && c.SERIES == 1 && c.DIVISION.Equals("Retail"));
            series1.ArgumentDataMember = "MONTH";
            series1.ValueDataMembers[0] = "AMOUNT";

            series2 = new Series("Active customer", ViewType.Line);
            series2.DataSource = obj.Where(c => c.TYPE == 6 && c.SERIES == 2 && c.DIVISION.Equals("Retail"));
            series2.ArgumentDataMember = "MONTH";
            series2.ValueDataMembers[0] = "AMOUNT";

            chartMetric11.Series.Clear();
            chartMetric11.Series.AddRange(new Series[] { series1, series2 });
            chartMetric11.Legend.Visible = false;

            GetChartTitle(chartMetric11, "Retail",
                ChartTitleDockStyle.Top, true, "Arial", 11, System.Drawing.FontStyle.Bold, System.Drawing.Color.FromArgb(49, 134, 172), 10);

            chartMetric11.Legend.Visible = true;
            chartMetric11.Legend.AlignmentHorizontal = LegendAlignmentHorizontal.Center;
            chartMetric11.Legend.AlignmentVertical = LegendAlignmentVertical.BottomOutside;
            chartMetric11.Legend.Direction = LegendDirection.LeftToRight;
            chartMetric11.Legend.Border.Visible = false;

            series1 = new Series("Total", ViewType.Line);
            series1.DataSource = obj.Where(c => c.TYPE == 6 && c.SERIES == 1 && c.DIVISION.Equals("SME"));
            series1.ArgumentDataMember = "MONTH";
            series1.ValueDataMembers[0] = "AMOUNT";

            series2 = new Series("Total excl .PB", ViewType.Line);
            series2.DataSource = obj.Where(c => c.TYPE == 6 && c.SERIES == 2 && c.DIVISION.Equals("SME"));
            series2.ArgumentDataMember = "MONTH";
            series2.ValueDataMembers[0] = "AMOUNT";

            chartMetric12.Series.Clear();
            chartMetric12.Series.AddRange(new Series[] { series1 });
            chartMetric12.Legend.Visible = false;

            GetChartTitle(chartMetric12, "SME",
                ChartTitleDockStyle.Top, true, "Arial", 11, System.Drawing.FontStyle.Bold, System.Drawing.Color.FromArgb(49, 134, 172), 10);

            chartMetric12.Legend.Visible = true;
            chartMetric12.Legend.AlignmentHorizontal = LegendAlignmentHorizontal.Center;
            chartMetric12.Legend.AlignmentVertical = LegendAlignmentVertical.BottomOutside;
            chartMetric12.Legend.Direction = LegendDirection.LeftToRight;
            chartMetric12.Legend.Border.Visible = false;

            series1 = new Series("SME", ViewType.Line);
            series1.DataSource = obj.Where(c => c.TYPE == 7);
            series1.ArgumentDataMember = "MONTH";
            series1.ValueDataMembers[0] = "AMOUNT";

            chartMetric13.Series.Clear();
            chartMetric13.Series.AddRange(new Series[] { series1 });
            chartMetric13.Legend.Visible = false;

            GetChartTitle(chartMetric13, "Number of Active Ebanking Users per <br> Active Retail Customer",
                ChartTitleDockStyle.Top, true, "Arial", 11, System.Drawing.FontStyle.Bold, System.Drawing.Color.FromArgb(49, 134, 172), 10);

            series1 = new Series("SME", ViewType.Line);
            series1.DataSource = obj.Where(c => c.TYPE == 8);
            series1.ArgumentDataMember = "MONTH";
            series1.ValueDataMembers[0] = "AMOUNT";

            chartMetric14.Series.Clear();
            chartMetric14.Series.AddRange(new Series[] { series1 });
            chartMetric14.Legend.Visible = false;

            GetChartTitle(chartMetric14, "Retail",
                ChartTitleDockStyle.Top, true, "Arial", 11, System.Drawing.FontStyle.Bold, System.Drawing.Color.FromArgb(49, 134, 172), 10);

            series1 = new Series("SME", ViewType.Line);
            series1.DataSource = obj.Where(c => c.TYPE == 9);
            series1.ArgumentDataMember = "MONTH";
            series1.ValueDataMembers[0] = "AMOUNT";

            chartMetric15.Series.Clear();
            chartMetric15.Series.AddRange(new Series[] { series1 });
            chartMetric15.Legend.Visible = false;

            GetChartTitle(chartMetric15, "Overall VPBank",
                ChartTitleDockStyle.Top, true, "Arial", 11, System.Drawing.FontStyle.Bold, System.Drawing.Color.FromArgb(49, 134, 172), 10);

            /*-----------------------------------------------------------------------------------------------*/

            series1 = new Series("Credit Card (Retail)", ViewType.Line);
            series1.DataSource = obj.Where(c => c.TYPE == 10 && c.SERIES == 1);
            series1.ArgumentDataMember = "MONTH";
            series1.ValueDataMembers[0] = "AMOUNT";

            series2 = new Series("Total loan excl. CC (Retail)", ViewType.Line);
            series2.DataSource = obj.Where(c => c.TYPE == 10 && c.SERIES == 2);
            series2.ArgumentDataMember = "MONTH";
            series2.ValueDataMembers[0] = "AMOUNT";

            Series series3 = new Series("Total loan (SME)", ViewType.Line);
            series3.DataSource = obj.Where(c => c.TYPE == 10 && c.SERIES == 3);
            series3.ArgumentDataMember = "MONTH";
            series3.ValueDataMembers[0] = "AMOUNT";

            chartMetric16.Series.Clear();
            chartMetric16.Series.AddRange(new Series[] { series1, series2, series3 });
            chartMetric16.Legend.Visible = false;

            GetChartTitle(chartMetric16, "",
                ChartTitleDockStyle.Top, true, "Arial", 11, System.Drawing.FontStyle.Bold, System.Drawing.Color.FromArgb(49, 134, 172), 10);

            chartMetric16.Legend.Visible = true;
            chartMetric16.Legend.AlignmentHorizontal = LegendAlignmentHorizontal.Center;
            chartMetric16.Legend.AlignmentVertical = LegendAlignmentVertical.BottomOutside;
            chartMetric16.Legend.Direction = LegendDirection.LeftToRight;
            chartMetric16.Legend.Border.Visible = false;

            series1 = new Series("Credit Card (Retail)", ViewType.Line);
            series1.DataSource = obj.Where(c => c.TYPE == 11 && c.SERIES == 1);
            series1.ArgumentDataMember = "MONTH";
            series1.ValueDataMembers[0] = "AMOUNT";

            series2 = new Series("Total loan excl. CC (Retail)", ViewType.Line);
            series2.DataSource = obj.Where(c => c.TYPE == 11 && c.SERIES == 2);
            series2.ArgumentDataMember = "MONTH";
            series2.ValueDataMembers[0] = "AMOUNT";
            

            series3 = new Series("Total loan (SME)", ViewType.Line);
            series3.DataSource = obj.Where(c => c.TYPE == 11 && c.SERIES == 3);
            series3.ArgumentDataMember = "MONTH";
            series3.ValueDataMembers[0] = "AMOUNT";

            chartMetric17.Series.Clear();
            chartMetric17.Series.AddRange(new Series[] { series1, series2, series3 });
            chartMetric17.Legend.Visible = false;

            GetChartTitle(chartMetric17, "",
                ChartTitleDockStyle.Top, true, "Arial", 11, System.Drawing.FontStyle.Bold, System.Drawing.Color.FromArgb(49, 134, 172), 10);

            chartMetric17.Legend.Visible = true;
            chartMetric17.Legend.AlignmentHorizontal = LegendAlignmentHorizontal.Center;
            chartMetric17.Legend.AlignmentVertical = LegendAlignmentVertical.BottomOutside;
            chartMetric17.Legend.Direction = LegendDirection.LeftToRight;
            chartMetric17.Legend.Border.Visible = false;

            /*--------------------------------------------------------------------------------------------*/

            series1 = new Series("Retail", ViewType.Line);
            series1.DataSource = obj.Where(c => c.TYPE == 12 && c.SERIES == 1);
            series1.ArgumentDataMember = "MONTH";
            series1.ValueDataMembers[0] = "AMOUNT";

            series2 = new Series("SME", ViewType.Line);
            series2.DataSource = obj.Where(c => c.TYPE == 12 && c.SERIES == 2);
            series2.ArgumentDataMember = "MONTH";
            series2.ValueDataMembers[0] = "AMOUNT";

            chartMetric18.Series.Clear();
            chartMetric18.Series.AddRange(new Series[] { series1, series2 });
            chartMetric18.Legend.Visible = false;

            GetChartTitle(chartMetric18, "",
                ChartTitleDockStyle.Top, true, "Arial", 11, System.Drawing.FontStyle.Bold, System.Drawing.Color.FromArgb(49, 134, 172), 10);

            chartMetric18.Legend.Visible = true;
            chartMetric18.Legend.AlignmentHorizontal = LegendAlignmentHorizontal.Center;
            chartMetric18.Legend.AlignmentVertical = LegendAlignmentVertical.BottomOutside;
            chartMetric18.Legend.Direction = LegendDirection.LeftToRight;
            chartMetric18.Legend.Border.Visible = false;

            series1 = new Series("Retail", ViewType.Line);
            series1.DataSource = obj.Where(c => c.TYPE == 13 && c.SERIES == 1);
            series1.ArgumentDataMember = "MONTH";
            series1.ValueDataMembers[0] = "AMOUNT";

            series2 = new Series("SME", ViewType.Line);
            series2.DataSource = obj.Where(c => c.TYPE == 13 && c.SERIES == 2);
            series2.ArgumentDataMember = "MONTH";
            series2.ValueDataMembers[0] = "AMOUNT";

            chartMetric19.Series.Clear();
            chartMetric19.Series.AddRange(new Series[] { series1, series2 });
            chartMetric19.Legend.Visible = false;

            GetChartTitle(chartMetric19, "Ratio of Amount Past Due 30 Days <br> or more over",
                ChartTitleDockStyle.Top, true, "Arial", 11, System.Drawing.FontStyle.Bold, System.Drawing.Color.FromArgb(49, 134, 172), 10);

            chartMetric19.Legend.Visible = true;
            chartMetric19.Legend.AlignmentHorizontal = LegendAlignmentHorizontal.Center;
            chartMetric19.Legend.AlignmentVertical = LegendAlignmentVertical.BottomOutside;
            chartMetric19.Legend.Direction = LegendDirection.LeftToRight;
            chartMetric19.Legend.Border.Visible = false;

            series1 = new Series("Retail", ViewType.Line);
            series1.DataSource = obj.Where(c => c.TYPE == 14 && c.SERIES == 1);
            series1.ArgumentDataMember = "MONTH";
            series1.ValueDataMembers[0] = "AMOUNT";

            series2 = new Series("SME", ViewType.Line);
            series2.DataSource = obj.Where(c => c.TYPE == 14 && c.SERIES == 2);
            series2.ArgumentDataMember = "MONTH";
            series2.ValueDataMembers[0] = "AMOUNT";

            chartMetric20.Series.Clear();
            chartMetric20.Series.AddRange(new Series[] { series1, series2 });
            chartMetric20.Legend.Visible = false;

            GetChartTitle(chartMetric20, "",
                ChartTitleDockStyle.Top, true, "Arial", 11, System.Drawing.FontStyle.Bold, System.Drawing.Color.FromArgb(49, 134, 172), 10);

            chartMetric20.Legend.Visible = true;
            chartMetric20.Legend.AlignmentHorizontal = LegendAlignmentHorizontal.Center;
            chartMetric20.Legend.AlignmentVertical = LegendAlignmentVertical.BottomOutside;
            chartMetric20.Legend.Direction = LegendDirection.LeftToRight;
            chartMetric20.Legend.Border.Visible = false;
        }
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

        foreach (Series series in chartId.Series)
        {
            series.LabelsVisibility = DevExpress.Utils.DefaultBoolean.True;
            LineSeriesView view = (LineSeriesView)series.View;
            view.PointMarkerOptions.Kind = MarkerKind.Diamond;
            view.PointMarkerOptions.Size = 8;

            series.Label.Border.Visible = false;
            series.Label.LineVisible = false;
            series.Label.LineLength = 10;
            series.Label.Antialiasing = false;
            series.Label.BackColor = System.Drawing.Color.Transparent;
            series.Label.Font = new System.Drawing.Font("Tahoma", 8, System.Drawing.FontStyle.Regular);

            series.Label.TextColor = System.Drawing.Color.Black;

            
        }

        ((XYDiagram)chartId.Diagram).AxisY.Visible = false;
        ((XYDiagram)chartId.Diagram).AxisY.Label.Visible = false;
        ((XYDiagram)chartId.Diagram).AxisY.GridLines.Visible = false;
        chartId.BorderOptions.Color = System.Drawing.Color.White;
    }
}