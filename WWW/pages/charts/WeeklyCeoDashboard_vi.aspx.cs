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

public partial class pages_charts_WeeklyCeoDashboard_vi : System.Web.UI.Page
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

                GetCircularGauge();
                GetChart();
            }
        }
    }

    public void GetChart()
    {
        //string segment = ddlSegment.SelectedValue;
        string segment = (string)cbSegment.Value;

        Series series1 = new Series("Cho vay", ViewType.Bar);
        var objLoan = Dashboard.Instance.CeoProductivityChart(date, segment, "loan");
        series1.DataSource = objLoan;

        series1.ArgumentDataMember = "month";
        series1.ValueDataMembers[0] = "value";
        series1.ArgumentScaleType = ScaleType.Auto;
        series1.LabelsVisibility = DevExpress.Utils.DefaultBoolean.True;

        Series series2 = new Series("Huy động", ViewType.Line);
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
                case "JANUARY":
                    return "T1";
                case "FEB":
                case "FEBRUARY":
                    return "T2";
                case "MAR":
                case "MARCH":
                    return "T3";
                case "APR":
                case "APRIL":
                    return "T4";
                case "MAY":
                    return "T5";
                case "JUN":
                    return "T6";
                case "JUL":
                case "JULY":
                    return "T7";
                case "AUG":
                case "AUGUST":
                    return "T8";
                case "SEP":
                case "SEPTEMBER":
                    return "T9";
                case "OCT":
                case "OCTOBER":
                    return "T10";
                case "NOV":
                case "NOVEMBER":
                    return "T11";
                case "DEC":
                case "DECEMBER":
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