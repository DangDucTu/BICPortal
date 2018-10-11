using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using DevExpress.XtraCharts.Web;
using DevExpress.XtraCharts;
using WorkFlowBLL;
using DevExpress.Web.ASPxGauges;
using DevExpress.Web.ASPxGauges.Gauges.Circular;
using DevExpress.XtraGauges.Core.Model;
using DevExpress.Utils;
using System.Collections;
using System.Drawing;

public partial class pages_charts_WeeklyCeoDashboardV2 : System.Web.UI.Page
{
    public string date
    {
        get { return ViewState["date"].ToString(); }
        set { ViewState["date"] = value; }
    }
    public int elapsedTime
    {
        get { return (int)ViewState["elapsedTime"]; }
        set { ViewState["elapsedTime"] = value; }
    }
    public string target
    {
        get { return ViewState["target"].ToString(); }
        set { ViewState["target"] = value; }
    }
    public string product_month
    {
        get { return ViewState["product_month"].ToString(); }
        set { ViewState["product_month"] = value; }
    }

    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {          
            var lstDate = Dashboard.Instance.GetCeoDate();
            if (lstDate != null)
            {
                foreach (var item in lstDate)
                    ddlDate.Items.Add(new ListItem(Convert.ToDateTime(item.date).ToString("MM/dd/yyyy"), Convert.ToDateTime(item.date).ToString("MM/dd/yyyy")));

                // Get elapsed time
                date = ddlDate.SelectedValue;
                var objTime = Dashboard.Instance.GetCeoTime(date);
                if (objTime != null)
                {
                    elapsedTime = (int)objTime.elapsed_time;
                    target = objTime.target;
                    product_month = objTime.product_month;
                }

                GetPerformanceTrends();
                GetCircularGauge();
                GetChart();
            }
        }
    }

    public void GetPerformanceTrends()
    {
        // Retail
        var obj = Dashboard.Instance.GetCeoRetail(date);
        foreach (var item in obj)
        {
            item.date_text = item.date.ToString("dd/MM/yyyy");
        }

        Series series1 = new Series("Retail", ViewType.Line);
        series1.DataSource = obj.Where(c => c.type == 1).OrderBy(c => c.date);
        series1.ArgumentDataMember = "date_text";
        series1.ValueDataMembers[0] = "amount";
        series1.ArgumentScaleType = ScaleType.Auto;
        series1.LabelsVisibility = DevExpress.Utils.DefaultBoolean.True;

        chartRetail1.Series.Clear();
        chartRetail1.Series.Add(series1);

        GetInfoCommon(chartRetail1, "NEW DEPOSIT BALANCE - RETAIL");

        series1 = new Series("Retail", ViewType.Line);
        series1.DataSource = obj.Where(c => c.type == 2).OrderBy(c => c.date);
        series1.ArgumentDataMember = "date_text";
        series1.ValueDataMembers[0] = "amount";
        series1.ArgumentScaleType = ScaleType.Auto;
        series1.LabelsVisibility = DevExpress.Utils.DefaultBoolean.True;

        chartRetail2.Series.Clear();
        chartRetail2.Series.Add(series1);

        GetInfoCommon(chartRetail2, "EOP DEPOSIT BALANCE - RETAIL");

        series1 = new Series("Branch", ViewType.Line);
        series1.DataSource = obj.Where(c => c.type == 3 && c.channel=="Branch").OrderBy(c => c.date);
        series1.ArgumentDataMember = "date_text";
        series1.ValueDataMembers[0] = "amount";
        series1.ArgumentScaleType = ScaleType.Auto;

        Series series2 = new Series("AC", ViewType.Line);
        series2.DataSource = obj.Where(c => c.type == 3 && c.channel == "AC").OrderBy(c => c.date);
        series2.ArgumentDataMember = "date_text";
        series2.ValueDataMembers[0] = "amount";
        series2.ArgumentScaleType = ScaleType.Auto;

        Series series3 = new Series("Retail", ViewType.Spline);
        series3.DataSource = obj.Where(c => c.type == 3 && c.channel == "Retail").OrderBy(c => c.date);
        series3.ArgumentDataMember = "date_text";
        series3.ValueDataMembers[0] = "amount";
        series3.ArgumentScaleType = ScaleType.Auto;
        series3.LabelsVisibility = DevExpress.Utils.DefaultBoolean.True;

        chartRetail3.Series.Clear();
        chartRetail3.Series.AddRange(new Series[] { series1, series2, series3 });

        GetInfoCommon(chartRetail3, "NEW DISBURSMENT - RETAIL");

        series1 = new Series("Branch", ViewType.Line);
        series1.DataSource = obj.Where(c => c.type == 4 && c.channel == "Branch").OrderBy(c => c.date);
        series1.ArgumentDataMember = "date_text";
        series1.ValueDataMembers[0] = "amount";
        series1.ArgumentScaleType = ScaleType.Auto;

        series2 = new Series("AC", ViewType.Line);
        series2.DataSource = obj.Where(c => c.type == 4 && c.channel == "AC").OrderBy(c => c.date);
        series2.ArgumentDataMember = "date_text";
        series2.ValueDataMembers[0] = "amount";
        series2.ArgumentScaleType = ScaleType.Auto;

        series3 = new Series("Retail", ViewType.Spline);
        series3.DataSource = obj.Where(c => c.type == 4 && c.channel == "Retail").OrderBy(c => c.date);
        series3.ArgumentDataMember = "date_text";
        series3.ValueDataMembers[0] = "amount";
        series3.ArgumentScaleType = ScaleType.Auto;
        series3.LabelsVisibility = DevExpress.Utils.DefaultBoolean.True;

        chartRetail4.Series.Clear();
        chartRetail4.Series.AddRange(new Series[] { series1, series2, series3 });

        GetInfoCommon(chartRetail4, "EOP LOAN BALANCE - RETAIL");


        // Sme
        var obj1 = Dashboard.Instance.GetCeoSme(date);
        foreach (var item in obj1)
        {
            item.date_text = item.date.ToString("dd/MM/yyyy");
        }

        series1 = new Series("SME", ViewType.Line);
        series1.DataSource = obj1.Where(c => c.type == 1).OrderBy(c => c.date);
        series1.ArgumentDataMember = "date_text";
        series1.ValueDataMembers[0] = "amount";
        series1.ArgumentScaleType = ScaleType.Auto;
        series1.LabelsVisibility = DevExpress.Utils.DefaultBoolean.True;

        chartSme1.Series.Clear();
        chartSme1.Series.Add(series1);

        GetInfoCommon(chartSme1, "NEW DEPOSIT BALANCE - SME");

        series1 = new Series("SME", ViewType.Line);
        series1.DataSource = obj1.Where(c => c.type == 2).OrderBy(c => c.date);
        series1.ArgumentDataMember = "date_text";
        series1.ValueDataMembers[0] = "amount";
        series1.ArgumentScaleType = ScaleType.Auto;
        series1.LabelsVisibility = DevExpress.Utils.DefaultBoolean.True;

        chartSme2.Series.Clear();
        chartSme2.Series.Add(series1);

        GetInfoCommon(chartSme2, "EOP DEPOSIT BALANCE - SME");

        series1 = new Series("SME", ViewType.Line);
        series1.DataSource = obj1.Where(c => c.type == 3).OrderBy(c => c.date);
        series1.ArgumentDataMember = "date_text";
        series1.ValueDataMembers[0] = "amount";
        series1.ArgumentScaleType = ScaleType.Auto;
        series1.LabelsVisibility = DevExpress.Utils.DefaultBoolean.True;

        chartSme3.Series.Clear();
        chartSme3.Series.Add(series1);

        GetInfoCommon(chartSme3, "NEW DISBURSMENT - SME");

        series1 = new Series("SME", ViewType.Line);
        series1.DataSource = obj1.Where(c => c.type == 4).OrderBy(c => c.date);
        series1.ArgumentDataMember = "date_text";
        series1.ValueDataMembers[0] = "amount";
        series1.ArgumentScaleType = ScaleType.Auto;
        series1.LabelsVisibility = DevExpress.Utils.DefaultBoolean.True;

        chartSme4.Series.Clear();
        chartSme4.Series.Add(series1);

        GetInfoCommon(chartSme4, "EOP LOAN BALANCE - SME");

    }

    public void GetInfoCommon(WebChartControl chart, string title)
    {
        foreach (Series series in chart.Series)
        {
            LineSeriesView view = (LineSeriesView)series.View;
            view.PointMarkerOptions.Kind = MarkerKind.Diamond;
            view.PointMarkerOptions.Size = 8;
            
            
        }
        Legend legend = chart.Legend;

        // Display the chart control's legend.
        legend.Visible = true;

        // Define its margins and alignment relative to the diagram.        
        legend.AlignmentHorizontal = LegendAlignmentHorizontal.Center;
        legend.AlignmentVertical = LegendAlignmentVertical.BottomOutside;
        legend.Direction = LegendDirection.LeftToRight;
        legend.Border.Visible = false;
        GetChartTitle(chart, title,
            ChartTitleDockStyle.Top, true, "Arial", 10, FontStyle.Bold, Color.FromArgb(49, 134, 172), 10);
        XYDiagram myDiagram = (XYDiagram)chart.Diagram;

        myDiagram.AxisX.Interlaced = true;
        myDiagram.AxisX.GridSpacing = 10;
        myDiagram.AxisX.Label.Angle = -20;

        chart.BorderOptions.Color = Color.FromArgb(192,192,192);
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

    public void GetChart()
    {
        string segment = (string)cbSegment.Value;

        Series series1 = new Series("Loan", ViewType.Bar);
        var objLoan = Dashboard.Instance.CeoProductivityChart(date, segment, "loan");
        series1.DataSource = objLoan;

        series1.ArgumentDataMember = "month";
        series1.ValueDataMembers[0] = "value";
        series1.ArgumentScaleType = ScaleType.Auto;
        series1.LabelsVisibility = DevExpress.Utils.DefaultBoolean.True;

        Series series2 = new Series("Deposit", ViewType.Line);
        var objDeposit = Dashboard.Instance.CeoProductivityChart(date, segment, "deposit");
        series2.DataSource = objDeposit;

        series2.ArgumentDataMember = "month";
        series2.ValueDataMembers[0] = "value";
        series2.ArgumentScaleType = ScaleType.Auto;
        series2.LabelsVisibility = DevExpress.Utils.DefaultBoolean.True;

        chartTimeline.Series.Clear();

        chartTimeline.Series.AddRange(new Series[] { series1, series2 });


        // Create two secondary axes, and add them to the chart's Diagram.
        SecondaryAxisY myAxisY = new SecondaryAxisY("my Y-Axis");
        ((XYDiagram)chartTimeline.Diagram).SecondaryAxesY.Clear();
        ((XYDiagram)chartTimeline.Diagram).SecondaryAxesY.Add(myAxisY);

        // Assign the series2 to the created axes.
        ((LineSeriesView)series2.View).AxisY = myAxisY;

        Legend legend = chartTimeline.Legend;

        // Display the chart control's legend.
        legend.Visible = true;

        // Define its margins and alignment relative to the diagram.        
        legend.AlignmentHorizontal = LegendAlignmentHorizontal.Center;
        legend.AlignmentVertical = LegendAlignmentVertical.BottomOutside;
        legend.Direction = LegendDirection.LeftToRight;
        legend.Border.Visible = false;


        ((SideBySideBarSeriesLabel)series1.Label).Position = BarSeriesLabelPosition.Center;
        //((SideBySideBarSeriesLabel)series3.Label).Position = BarSeriesLabelPosition.Center;
    }

    protected void ddlSegment_SelectedIndexChanged(object sender, EventArgs e)
    {
        GetChart();
        GetCircularGauge();
    }

    protected void GetCircularGauge()
    {
        var lstSpeedometerLoan = Dashboard.Instance.GetCeoSpeedometer(date, "loan");
        if (lstSpeedometerLoan != null && lstSpeedometerLoan.Count == 2)
        {
            ASPxGaugeControl gaugeControl1 = new ASPxGaugeControl();
            ASPxGaugeControl gaugeControl2 = new ASPxGaugeControl();
            CreateCircularGauge(gaugeControl1, (Single)lstSpeedometerLoan[0].min_year.Value, (Single)lstSpeedometerLoan[0].max_year.Value, (Single)lstSpeedometerLoan[0].current_value.Value, (Single)lstSpeedometerLoan[0].max_month.Value, 7, 4, 1);
            CreateCircularGauge(gaugeControl2, (Single)lstSpeedometerLoan[1].min_year.Value, (Single)lstSpeedometerLoan[1].max_year.Value, (Single)lstSpeedometerLoan[1].current_value.Value, (Single)lstSpeedometerLoan[1].max_month.Value, 7, 4, 2);
        }

        var lstSpeedometerDeposit = Dashboard.Instance.GetCeoSpeedometer(date, "deposit");
        if (lstSpeedometerDeposit != null && lstSpeedometerDeposit.Count == 2)
        {
            ASPxGaugeControl gaugeControl3 = new ASPxGaugeControl();
            ASPxGaugeControl gaugeControl4 = new ASPxGaugeControl();
            CreateCircularGauge(gaugeControl3, (Single)lstSpeedometerDeposit[0].min_year.Value, (Single)lstSpeedometerDeposit[0].max_year.Value, (Single)lstSpeedometerDeposit[0].current_value.Value, (Single)lstSpeedometerDeposit[0].max_month.Value, 7, 4, 3);
            CreateCircularGauge(gaugeControl4, (Single)lstSpeedometerDeposit[1].min_year.Value, (Single)lstSpeedometerDeposit[1].max_year.Value, (Single)lstSpeedometerDeposit[1].current_value.Value, (Single)lstSpeedometerDeposit[1].max_month.Value, 7, 4, 4);
        }
    }

    protected void CreateCircularGauge(ASPxGaugeControl gaugeControl, float minValue, float maxValue, float value1, float value2, int majorTickCount, int minorTickCount, int order)
    {
        // Creates a new instance of the CircularGauge class and adds it
        // to the gauge control's Gauges collection.
        CircularGauge circularGauge = (CircularGauge)gaugeControl.AddGauge(DevExpress.XtraGauges.Base.GaugeType.Circular);

        // Adds the default elements (a scale, background layer, needle and spindle cap).
        circularGauge.AddDefaultElements();
        //circularGauge.AddScale();
        circularGauge.AddNeedle();

        System.Drawing.Rectangle abc = new System.Drawing.Rectangle(6, 6, 248, 248);
        circularGauge.Bounds = abc;

        // Changes the background layer's paint style.
        ArcScaleBackgroundLayer background = circularGauge.BackgroundLayers[0];
        background.ShapeType = BackgroundLayerShapeType.CircularThreeFourth_Style25;

        background.Size = new System.Drawing.SizeF(250, 224);
        background.ScaleCenterPos = new DevExpress.XtraGauges.Core.Base.PointF2D((Single)0.5, (Single)0.56);

        // Customizes the scale's settings.
        ArcScaleComponent scale = circularGauge.Scales[0];
        scale.MinValue = minValue;
        scale.MaxValue = maxValue;
        scale.Value = value1;
        scale.MajorTickCount = majorTickCount;
        scale.MajorTickmark.FormatString = "{0:F0}";
        scale.MajorTickmark.ShapeType = TickmarkShapeType.Circular_Style25_1;
        scale.RadiusX = 95; scale.RadiusY = (Single)95.5;
        scale.StartAngle = -225;
        scale.MajorTickmark.ShapeOffset = -6;
        scale.MajorTickmark.TextOffset = -22;
        scale.MajorTickmark.AllowTickOverlap = true;
        scale.MinorTickCount = minorTickCount;
        scale.MinorTickmark.ShapeType = TickmarkShapeType.Circular_Style25_2;
        scale.MinorTickmark.ShapeOffset = -2;
        scale.AppearanceTickmarkText.TextBrush = new DevExpress.XtraGauges.Core.Drawing.SolidBrushObject(System.Drawing.Color.White);
        scale.AppearanceTickmarkText.Font = new System.Drawing.Font("tahoma", (Single)8.25);
        scale.StartAngle = -225;
        scale.EndAngle = 45;

        // Changes the needle's paint style.
        ArcScaleNeedleComponent needle = circularGauge.Needles[0];
        needle.ShapeType = NeedleShapeType.CircularFull_Style3;
        needle.ArcScale = scale;
        needle.StartOffset = (Single)(-16.5);
        needle.EndOffset = 20;
        needle.ZOrder = -40;

        // Changes the needle's paint style.
        ArcScaleNeedleComponent needli = circularGauge.Needles[1];
        needli.ShapeType = NeedleShapeType.CircularFull_Style25;
        needli.ArcScale = scale;
        needli.Value = value2;
        needli.StartOffset = (Single)(-16.5);
        needli.EndOffset = 5;
        needli.ZOrder = -50;

        gaugeControl.Width = Unit.Pixel(260);
        gaugeControl.Height = Unit.Pixel(260);
        DevExpress.Web.ASPxGauges.Base.ThicknessWeb a = new DevExpress.Web.ASPxGauges.Base.ThicknessWeb(0, 15, 0, 0);
        gaugeControl.LayoutPadding = a;

        gaugeControl.EnableViewState = false;
        gaugeControl.SaveStateOnCallbacks = false;

        if (order == 1)
            panel1.Controls.Add(gaugeControl);
        else if (order == 2)
            panel2.Controls.Add(gaugeControl);
        else if (order == 3)
            panel3.Controls.Add(gaugeControl);
        else if (order == 4)
            panel4.Controls.Add(gaugeControl);
    }

    protected void ddlDate_SelectedIndexChanged(object sender, EventArgs e)
    {
        date = ddlDate.SelectedValue;
        GetPerformanceTrends();
        GetChart();
        GetCircularGauge();

        var objTime = Dashboard.Instance.GetCeoTime(date);
        if (objTime != null)
        {
            elapsedTime = (int)objTime.elapsed_time;
            target = objTime.target;
            product_month = objTime.product_month;
        }
    }

    protected string GetMonthByLang(string month, string lang)
    {
        if (lang.Equals("en")) return month;
        else
        {
            switch (month.ToUpper())
            {
                case "JAN":
                    return "T1";
                case "FEB":
                    return "T2";
                case "MAR":
                    return "T3";
                case "APR":
                    return "T4";
                case "MAY":
                    return "T5";
                case "JUN":
                    return "T6";
                case "JUL":
                    return "T7";
                case "AUG":
                    return "T8";
                case "SEP":
                    return "T9";
                case "OCT":
                    return "T10";
                case "NOV":
                    return "T11";
                case "DEC":
                    return "T12";
            }
        } return "";
    }

    protected void chartTimeline_CustomCallback(object sender, CustomCallbackEventArgs e)
    {
        if (e.Parameter == "TimeLine")
            PerformTimeLineAction();
    }

    void PerformTimeLineAction()
    {
        GetChart();
    }
}