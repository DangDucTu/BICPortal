using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using WorkFlowBLL;
using DevExpress.XtraCharts;
using DevExpress.XtraCharts.Web;

public partial class pages_charts_TATDashboardForCeo : System.Web.UI.Page
{
    public string w1, w2, w3, w4 = string.Empty;
    public string wc1, wc2, wc3, wc4 = string.Empty;
    public string c1, c2, c3, c4, c5, c6, c7, c8;
    

    protected void Page_Load(object sender, EventArgs e)
    {
        c1 = c2 = c3 = c4 = c5 = c6 = c7 = c8 = "0|0|0|0|0";
        string[] products = {"Auto Loan", "Consumption Loan", "Home Loan", "Household Business Loan", "Overdraft", "UPL",
                            "Credit card", "Overall (excluded credit card)"};
        if (!IsPostBack)
        {
            var tatDate = Dashboard.Instance.TATDate();
            if (tatDate != null && tatDate.Count == 4)
            {
                w4 = tatDate[0].Date;
                w3 = tatDate[1].Date;
                w2 = tatDate[2].Date;
                w1 = tatDate[3].Date;

                wc4 = tatDate[0].Week;
                wc3 = tatDate[1].Week;
                wc2 = tatDate[2].Week;
                wc1 = tatDate[3].Week;
            }

            var tatComment = Dashboard.Instance.TATComment();
            if (tatComment != null && tatComment.Count == 8)
            {
                c1 = tatComment.First(c => c.Product == "Auto Loan").Arg;
                c2 = tatComment.First(c => c.Product == "Consumption Loan").Arg;
                c3 = tatComment.First(c => c.Product == "Home Loan").Arg;
                c4 = tatComment.First(c => c.Product == "Household Business Loan").Arg;
                c5 = tatComment.First(c => c.Product == "Overdraft").Arg;
                c6 = tatComment.First(c => c.Product == "UPL").Arg;
                c7 = tatComment.First(c => c.Product == "Credit card").Arg;
                c8 = tatComment.First(c => c.Product == "Overall").Arg;
            }

            GetApplicationByProductChart();
            GetApplicationChart();

            GetApplicationByProductChartErs();
            GetApplicationChartErs();

            foreach (var product in products)
            {
                GetTurnAroundTime(product);
            }
        }
    }

    protected void GetApplicationByProductChart()
    {
        var obj = Dashboard.Instance.TATApplicationByProductGetChart();
        if (obj.Count == 0) return;

        Series series1 = new Series(w1, ViewType.Bar);
        series1.DataSource = obj.Where(c => c.Date == w1 & c.Type == 1);
        series1.ArgumentDataMember = "Channel";
        series1.ValueDataMembers[0] = "Amount";

        Series series2 = new Series(w2, ViewType.Bar);
        series2.DataSource = obj.Where(c => c.Date == w2 & c.Type == 1);
        series2.ArgumentDataMember = "Channel";
        series2.ValueDataMembers[0] = "Amount";

        Series series3 = new Series(w3, ViewType.Bar);
        series3.DataSource = obj.Where(c => c.Date == w3 & c.Type == 1);
        series3.ArgumentDataMember = "Channel";
        series3.ValueDataMembers[0] = "Amount";

        Series series4 = new Series(w4, ViewType.Bar);
        series4.DataSource = obj.Where(c => c.Date == w4 & c.Type == 1);
        series4.ArgumentDataMember = "Channel";
        series4.ValueDataMembers[0] = "Amount";

        chartByProduct1.Series.Clear();
        chartByProduct1.Series.AddRange(new Series[] { series1, series2, series3, series4 });

        DisplayOptionChart(chartByProduct1);

        GetChartTitle(chartByProduct1, "By product - No of  new application created",
            ChartTitleDockStyle.Top, true, "Arial", 10, System.Drawing.FontStyle.Bold, System.Drawing.Color.FromArgb(49, 134, 172), 10);

        chartByProduct1.ToolTipEnabled = DevExpress.Utils.DefaultBoolean.False;

        series1 = new Series(w1, ViewType.Bar);
        series1.DataSource = obj.Where(c => c.Date == w1 & c.Type == 2);
        series1.ArgumentDataMember = "Channel";
        series1.ValueDataMembers[0] = "Amount";

        series2 = new Series(w2, ViewType.Bar);
        series2.DataSource = obj.Where(c => c.Date == w2 & c.Type == 2);
        series2.ArgumentDataMember = "Channel";
        series2.ValueDataMembers[0] = "Amount";

        series3 = new Series(w3, ViewType.Bar);
        series3.DataSource = obj.Where(c => c.Date == w3 & c.Type == 2);
        series3.ArgumentDataMember = "Channel";
        series3.ValueDataMembers[0] = "Amount";

        series4 = new Series(w4, ViewType.Bar);
        series4.DataSource = obj.Where(c => c.Date == w4 & c.Type == 2);
        series4.ArgumentDataMember = "Channel";
        series4.ValueDataMembers[0] = "Amount";

        chartByProduct2.Series.Clear();
        chartByProduct2.Series.AddRange(new Series[] { series1, series2, series3, series4 });

        DisplayOptionChart(chartByProduct2);

        GetChartTitle(chartByProduct2, "By product - No of application approved",
            ChartTitleDockStyle.Top, true, "Arial", 10, System.Drawing.FontStyle.Bold, System.Drawing.Color.FromArgb(49, 134, 172), 10);

        series1 = new Series(w1, ViewType.Bar);
        series1.DataSource = obj.Where(c => c.Date == w1 & c.Type == 3);
        series1.ArgumentDataMember = "Channel";
        series1.ValueDataMembers[0] = "Amount";

        series2 = new Series(w2, ViewType.Bar);
        series2.DataSource = obj.Where(c => c.Date == w2 & c.Type == 3);
        series2.ArgumentDataMember = "Channel";
        series2.ValueDataMembers[0] = "Amount";

        series3 = new Series(w3, ViewType.Bar);
        series3.DataSource = obj.Where(c => c.Date == w3 & c.Type == 3);
        series3.ArgumentDataMember = "Channel";
        series3.ValueDataMembers[0] = "Amount";

        series4 = new Series(w4, ViewType.Bar);
        series4.DataSource = obj.Where(c => c.Date == w4 & c.Type == 3);
        series4.ArgumentDataMember = "Channel";
        series4.ValueDataMembers[0] = "Amount";

        chartByProduct3.Series.Clear();
        chartByProduct3.Series.AddRange(new Series[] { series1, series2, series3, series4 });

        DisplayOptionChart(chartByProduct3);

        GetChartTitle(chartByProduct3, "By product - No of application rejected",
            ChartTitleDockStyle.Top, true, "Arial", 10, System.Drawing.FontStyle.Bold, System.Drawing.Color.FromArgb(49, 134, 172), 10);


        series1 = new Series(w1, ViewType.Bar);
        series1.DataSource = obj.Where(c => c.Date == w1 & c.Type == 4);
        series1.ArgumentDataMember = "Channel";
        series1.ValueDataMembers[0] = "Amount";

        series2 = new Series(w2, ViewType.Bar);
        series2.DataSource = obj.Where(c => c.Date == w2 & c.Type == 4);
        series2.ArgumentDataMember = "Channel";
        series2.ValueDataMembers[0] = "Amount";

        series3 = new Series(w3, ViewType.Bar);
        series3.DataSource = obj.Where(c => c.Date == w3 & c.Type == 4);
        series3.ArgumentDataMember = "Channel";
        series3.ValueDataMembers[0] = "Amount";

        series4 = new Series(w4, ViewType.Bar);
        series4.DataSource = obj.Where(c => c.Date == w4 & c.Type == 4);
        series4.ArgumentDataMember = "Channel";
        series4.ValueDataMembers[0] = "Amount";

        chartByProduct4.Series.Clear();
        chartByProduct4.Series.AddRange(new Series[] { series1, series2, series3, series4 });

        DisplayOptionChart(chartByProduct4);

        GetChartTitle(chartByProduct4, "By product - No of application cancelled",
            ChartTitleDockStyle.Top, true, "Arial", 10, System.Drawing.FontStyle.Bold, System.Drawing.Color.FromArgb(49, 134, 172), 10);


        series1 = new Series(w1, ViewType.Bar);
        series1.DataSource = obj.Where(c => c.Date == w1 & c.Type == 5);
        series1.ArgumentDataMember = "Channel";
        series1.ValueDataMembers[0] = "Amount";

        series2 = new Series(w2, ViewType.Bar);
        series2.DataSource = obj.Where(c => c.Date == w2 & c.Type == 5);
        series2.ArgumentDataMember = "Channel";
        series2.ValueDataMembers[0] = "Amount";

        series3 = new Series(w3, ViewType.Bar);
        series3.DataSource = obj.Where(c => c.Date == w3 & c.Type == 5);
        series3.ArgumentDataMember = "Channel";
        series3.ValueDataMembers[0] = "Amount";

        series4 = new Series(w4, ViewType.Bar);
        series4.DataSource = obj.Where(c => c.Date == w4 & c.Type == 5);
        series4.ArgumentDataMember = "Channel";
        series4.ValueDataMembers[0] = "Amount";

        chartByProduct5.Series.Clear();
        chartByProduct5.Series.AddRange(new Series[] { series1, series2, series3, series4 });

        DisplayOptionChart(chartByProduct5);

        GetChartTitle(chartByProduct5, "By product - % Approval rate (Unit: %)",
            ChartTitleDockStyle.Top, true, "Arial", 10, System.Drawing.FontStyle.Bold, System.Drawing.Color.FromArgb(49, 134, 172), 10);


        series1 = new Series(w1, ViewType.Bar);
        series1.DataSource = obj.Where(c => c.Date == w1 & c.Type == 6);
        series1.ArgumentDataMember = "Channel";
        series1.ValueDataMembers[0] = "Amount";

        series2 = new Series(w2, ViewType.Bar);
        series2.DataSource = obj.Where(c => c.Date == w2 & c.Type == 6);
        series2.ArgumentDataMember = "Channel";
        series2.ValueDataMembers[0] = "Amount";

        series3 = new Series(w3, ViewType.Bar);
        series3.DataSource = obj.Where(c => c.Date == w3 & c.Type == 6);
        series3.ArgumentDataMember = "Channel";
        series3.ValueDataMembers[0] = "Amount";

        series4 = new Series(w4, ViewType.Bar);
        series4.DataSource = obj.Where(c => c.Date == w4 & c.Type == 6);
        series4.ArgumentDataMember = "Channel";
        series4.ValueDataMembers[0] = "Amount";

        chartByProduct6.Series.Clear();
        chartByProduct6.Series.AddRange(new Series[] { series1, series2, series3, series4 });

        DisplayOptionChart(chartByProduct6);

        GetChartTitle(chartByProduct6, "By product - % Cancellation rate (Unit: %)",
            ChartTitleDockStyle.Top, true, "Arial", 10, System.Drawing.FontStyle.Bold, System.Drawing.Color.FromArgb(49, 134, 172), 10);
    }

    protected void GetApplicationByProductChartErs()
    {
        var obj = Dashboard.Instance.TATApplicationByProductGetChart();
        if (obj.Count == 0) return;

        Series series1 = new Series(w1, ViewType.Bar);
        series1.DataSource = obj.Where(c => c.Date == w1 & c.Type == 1);
        series1.ArgumentDataMember = "Channel";
        series1.ValueDataMembers[0] = "Amount";

        Series series2 = new Series(w2, ViewType.Bar);
        series2.DataSource = obj.Where(c => c.Date == w2 & c.Type == 1);
        series2.ArgumentDataMember = "Channel";
        series2.ValueDataMembers[0] = "Amount";

        Series series3 = new Series(w3, ViewType.Bar);
        series3.DataSource = obj.Where(c => c.Date == w3 & c.Type == 1);
        series3.ArgumentDataMember = "Channel";
        series3.ValueDataMembers[0] = "Amount";

        Series series4 = new Series(w4, ViewType.Bar);
        series4.DataSource = obj.Where(c => c.Date == w4 & c.Type == 1);
        series4.ArgumentDataMember = "Channel";
        series4.ValueDataMembers[0] = "Amount";

        chartByProductErs1.Series.Clear();
        chartByProductErs1.Series.AddRange(new Series[] { series1, series2, series3, series4 });

        DisplayOptionChart(chartByProductErs1);

        GetChartTitle(chartByProductErs1, "By product - No of  new application created",
            ChartTitleDockStyle.Top, true, "Arial", 10, System.Drawing.FontStyle.Bold, System.Drawing.Color.FromArgb(49, 134, 172), 10);

        chartByProduct1.ToolTipEnabled = DevExpress.Utils.DefaultBoolean.False;

        series1 = new Series(w1, ViewType.Bar);
        series1.DataSource = obj.Where(c => c.Date == w1 & c.Type == 2);
        series1.ArgumentDataMember = "Channel";
        series1.ValueDataMembers[0] = "Amount";

        series2 = new Series(w2, ViewType.Bar);
        series2.DataSource = obj.Where(c => c.Date == w2 & c.Type == 2);
        series2.ArgumentDataMember = "Channel";
        series2.ValueDataMembers[0] = "Amount";

        series3 = new Series(w3, ViewType.Bar);
        series3.DataSource = obj.Where(c => c.Date == w3 & c.Type == 2);
        series3.ArgumentDataMember = "Channel";
        series3.ValueDataMembers[0] = "Amount";

        series4 = new Series(w4, ViewType.Bar);
        series4.DataSource = obj.Where(c => c.Date == w4 & c.Type == 2);
        series4.ArgumentDataMember = "Channel";
        series4.ValueDataMembers[0] = "Amount";

        chartByProductErs2.Series.Clear();
        chartByProductErs2.Series.AddRange(new Series[] { series1, series2, series3, series4 });

        DisplayOptionChart(chartByProductErs2);

        GetChartTitle(chartByProductErs2, "By product - No of application approved",
            ChartTitleDockStyle.Top, true, "Arial", 10, System.Drawing.FontStyle.Bold, System.Drawing.Color.FromArgb(49, 134, 172), 10);

        series1 = new Series(w1, ViewType.Bar);
        series1.DataSource = obj.Where(c => c.Date == w1 & c.Type == 3);
        series1.ArgumentDataMember = "Channel";
        series1.ValueDataMembers[0] = "Amount";

        series2 = new Series(w2, ViewType.Bar);
        series2.DataSource = obj.Where(c => c.Date == w2 & c.Type == 3);
        series2.ArgumentDataMember = "Channel";
        series2.ValueDataMembers[0] = "Amount";

        series3 = new Series(w3, ViewType.Bar);
        series3.DataSource = obj.Where(c => c.Date == w3 & c.Type == 3);
        series3.ArgumentDataMember = "Channel";
        series3.ValueDataMembers[0] = "Amount";

        series4 = new Series(w4, ViewType.Bar);
        series4.DataSource = obj.Where(c => c.Date == w4 & c.Type == 3);
        series4.ArgumentDataMember = "Channel";
        series4.ValueDataMembers[0] = "Amount";

        chartByProductErs3.Series.Clear();
        chartByProductErs3.Series.AddRange(new Series[] { series1, series2, series3, series4 });

        DisplayOptionChart(chartByProductErs3);

        GetChartTitle(chartByProductErs3, "By product - No of application rejected",
            ChartTitleDockStyle.Top, true, "Arial", 10, System.Drawing.FontStyle.Bold, System.Drawing.Color.FromArgb(49, 134, 172), 10);


        series1 = new Series(w1, ViewType.Bar);
        series1.DataSource = obj.Where(c => c.Date == w1 & c.Type == 4);
        series1.ArgumentDataMember = "Channel";
        series1.ValueDataMembers[0] = "Amount";

        series2 = new Series(w2, ViewType.Bar);
        series2.DataSource = obj.Where(c => c.Date == w2 & c.Type == 4);
        series2.ArgumentDataMember = "Channel";
        series2.ValueDataMembers[0] = "Amount";

        series3 = new Series(w3, ViewType.Bar);
        series3.DataSource = obj.Where(c => c.Date == w3 & c.Type == 4);
        series3.ArgumentDataMember = "Channel";
        series3.ValueDataMembers[0] = "Amount";

        series4 = new Series(w4, ViewType.Bar);
        series4.DataSource = obj.Where(c => c.Date == w4 & c.Type == 4);
        series4.ArgumentDataMember = "Channel";
        series4.ValueDataMembers[0] = "Amount";

        chartByProductErs4.Series.Clear();
        chartByProductErs4.Series.AddRange(new Series[] { series1, series2, series3, series4 });

        DisplayOptionChart(chartByProductErs4);

        GetChartTitle(chartByProductErs4, "By product - No of application cancelled",
            ChartTitleDockStyle.Top, true, "Arial", 10, System.Drawing.FontStyle.Bold, System.Drawing.Color.FromArgb(49, 134, 172), 10);


        series1 = new Series(w1, ViewType.Bar);
        series1.DataSource = obj.Where(c => c.Date == w1 & c.Type == 5);
        series1.ArgumentDataMember = "Channel";
        series1.ValueDataMembers[0] = "Amount";

        series2 = new Series(w2, ViewType.Bar);
        series2.DataSource = obj.Where(c => c.Date == w2 & c.Type == 5);
        series2.ArgumentDataMember = "Channel";
        series2.ValueDataMembers[0] = "Amount";

        series3 = new Series(w3, ViewType.Bar);
        series3.DataSource = obj.Where(c => c.Date == w3 & c.Type == 5);
        series3.ArgumentDataMember = "Channel";
        series3.ValueDataMembers[0] = "Amount";

        series4 = new Series(w4, ViewType.Bar);
        series4.DataSource = obj.Where(c => c.Date == w4 & c.Type == 5);
        series4.ArgumentDataMember = "Channel";
        series4.ValueDataMembers[0] = "Amount";

        chartByProductErs5.Series.Clear();
        chartByProductErs5.Series.AddRange(new Series[] { series1, series2, series3, series4 });

        DisplayOptionChart(chartByProductErs5);

        GetChartTitle(chartByProductErs5, "By product - % Approval rate (Unit: %)",
            ChartTitleDockStyle.Top, true, "Arial", 10, System.Drawing.FontStyle.Bold, System.Drawing.Color.FromArgb(49, 134, 172), 10);


        series1 = new Series(w1, ViewType.Bar);
        series1.DataSource = obj.Where(c => c.Date == w1 & c.Type == 6);
        series1.ArgumentDataMember = "Channel";
        series1.ValueDataMembers[0] = "Amount";

        series2 = new Series(w2, ViewType.Bar);
        series2.DataSource = obj.Where(c => c.Date == w2 & c.Type == 6);
        series2.ArgumentDataMember = "Channel";
        series2.ValueDataMembers[0] = "Amount";

        series3 = new Series(w3, ViewType.Bar);
        series3.DataSource = obj.Where(c => c.Date == w3 & c.Type == 6);
        series3.ArgumentDataMember = "Channel";
        series3.ValueDataMembers[0] = "Amount";

        series4 = new Series(w4, ViewType.Bar);
        series4.DataSource = obj.Where(c => c.Date == w4 & c.Type == 6);
        series4.ArgumentDataMember = "Channel";
        series4.ValueDataMembers[0] = "Amount";

        chartByProductErs6.Series.Clear();
        chartByProductErs6.Series.AddRange(new Series[] { series1, series2, series3, series4 });

        DisplayOptionChart(chartByProductErs6);

        GetChartTitle(chartByProductErs6, "By product - % Cancellation rate (Unit: %)",
            ChartTitleDockStyle.Top, true, "Arial", 10, System.Drawing.FontStyle.Bold, System.Drawing.Color.FromArgb(49, 134, 172), 10);
    }

    protected void GetApplicationChart()
    {         
        var obj = Dashboard.Instance.TATApplicationGetChart();
        if (obj.Count == 0) return;

        Series series1 = new Series(w1, ViewType.Bar);
        series1.DataSource = obj.Where(c => c.Date == w1 & c.Type == 1);
        series1.ArgumentDataMember = "Channel";
        series1.ValueDataMembers[0] = "Amount";

        Series series2 = new Series(w2, ViewType.Bar);
        series2.DataSource = obj.Where(c => c.Date == w2 & c.Type == 1);
        series2.ArgumentDataMember = "Channel";
        series2.ValueDataMembers[0] = "Amount";

        Series series3 = new Series(w3, ViewType.Bar);
        series3.DataSource = obj.Where(c => c.Date == w3 & c.Type == 1);
        series3.ArgumentDataMember = "Channel";
        series3.ValueDataMembers[0] = "Amount";

        Series series4 = new Series(w4, ViewType.Bar);
        series4.DataSource = obj.Where(c => c.Date == w4 & c.Type == 1);
        series4.ArgumentDataMember = "Channel";
        series4.ValueDataMembers[0] = "Amount";

        chart1.Series.Clear();
        chart1.Series.AddRange(new Series[] { series1, series2, series3, series4 });

        DisplayOptionChart(chart1);

        GetChartTitle(chart1, "By channel - No of  new application created",
            ChartTitleDockStyle.Top, true, "Arial", 10, System.Drawing.FontStyle.Bold, System.Drawing.Color.FromArgb(49, 134, 172), 10);

        chart1.ToolTipEnabled = DevExpress.Utils.DefaultBoolean.False;

        series1 = new Series(w1, ViewType.Bar);
        series1.DataSource = obj.Where(c => c.Date == w1 & c.Type == 2);
        series1.ArgumentDataMember = "Channel";
        series1.ValueDataMembers[0] = "Amount";        

        series2 = new Series(w2, ViewType.Bar);
        series2.DataSource = obj.Where(c => c.Date == w2 & c.Type == 2);
        series2.ArgumentDataMember = "Channel";
        series2.ValueDataMembers[0] = "Amount";

        series3 = new Series(w3, ViewType.Bar);
        series3.DataSource = obj.Where(c => c.Date == w3 & c.Type == 2);
        series3.ArgumentDataMember = "Channel";
        series3.ValueDataMembers[0] = "Amount";

        series4 = new Series(w4, ViewType.Bar);
        series4.DataSource = obj.Where(c => c.Date == w4 & c.Type == 2);
        series4.ArgumentDataMember = "Channel";
        series4.ValueDataMembers[0] = "Amount";

        chart2.Series.Clear();
        chart2.Series.AddRange(new Series[] { series1, series2, series3, series4 });

        DisplayOptionChart(chart2);

        GetChartTitle(chart2, "By channel - No of application approved",
            ChartTitleDockStyle.Top, true, "Arial", 10, System.Drawing.FontStyle.Bold, System.Drawing.Color.FromArgb(49, 134, 172), 10);

        series1 = new Series(w1, ViewType.Bar);
        series1.DataSource = obj.Where(c => c.Date == w1 & c.Type == 3);
        series1.ArgumentDataMember = "Channel";
        series1.ValueDataMembers[0] = "Amount";

        series2 = new Series(w2, ViewType.Bar);
        series2.DataSource = obj.Where(c => c.Date == w2 & c.Type == 3);
        series2.ArgumentDataMember = "Channel";
        series2.ValueDataMembers[0] = "Amount";

        series3 = new Series(w3, ViewType.Bar);
        series3.DataSource = obj.Where(c => c.Date == w3 & c.Type == 3);
        series3.ArgumentDataMember = "Channel";
        series3.ValueDataMembers[0] = "Amount";

        series4 = new Series(w4, ViewType.Bar);
        series4.DataSource = obj.Where(c => c.Date == w4 & c.Type == 3);
        series4.ArgumentDataMember = "Channel";
        series4.ValueDataMembers[0] = "Amount";

        chart3.Series.Clear();
        chart3.Series.AddRange(new Series[] { series1, series2, series3, series4 });

        DisplayOptionChart(chart3);

        GetChartTitle(chart3, "By channel - No of application rejected",
            ChartTitleDockStyle.Top, true, "Arial", 10, System.Drawing.FontStyle.Bold, System.Drawing.Color.FromArgb(49, 134, 172), 10);


        series1 = new Series(w1, ViewType.Bar);
        series1.DataSource = obj.Where(c => c.Date == w1 & c.Type == 4);
        series1.ArgumentDataMember = "Channel";
        series1.ValueDataMembers[0] = "Amount";

        series2 = new Series(w2, ViewType.Bar);
        series2.DataSource = obj.Where(c => c.Date == w2 & c.Type == 4);
        series2.ArgumentDataMember = "Channel";
        series2.ValueDataMembers[0] = "Amount";

        series3 = new Series(w3, ViewType.Bar);
        series3.DataSource = obj.Where(c => c.Date == w3 & c.Type == 4);
        series3.ArgumentDataMember = "Channel";
        series3.ValueDataMembers[0] = "Amount";

        series4 = new Series(w4, ViewType.Bar);
        series4.DataSource = obj.Where(c => c.Date == w4 & c.Type == 4);
        series4.ArgumentDataMember = "Channel";
        series4.ValueDataMembers[0] = "Amount";

        chart4.Series.Clear();
        chart4.Series.AddRange(new Series[] { series1, series2, series3, series4 });

        DisplayOptionChart(chart4);

        GetChartTitle(chart4, "By channel - No of application cancelled",
            ChartTitleDockStyle.Top, true, "Arial", 10, System.Drawing.FontStyle.Bold, System.Drawing.Color.FromArgb(49, 134, 172), 10);


        series1 = new Series(w1, ViewType.Bar);
        series1.DataSource = obj.Where(c => c.Date == w1 & c.Type == 5);
        series1.ArgumentDataMember = "Channel";
        series1.ValueDataMembers[0] = "Amount";

        series2 = new Series(w2, ViewType.Bar);
        series2.DataSource = obj.Where(c => c.Date == w2 & c.Type == 5);
        series2.ArgumentDataMember = "Channel";
        series2.ValueDataMembers[0] = "Amount";

        series3 = new Series(w3, ViewType.Bar);
        series3.DataSource = obj.Where(c => c.Date == w3 & c.Type == 5);
        series3.ArgumentDataMember = "Channel";
        series3.ValueDataMembers[0] = "Amount";

        series4 = new Series(w4, ViewType.Bar);
        series4.DataSource = obj.Where(c => c.Date == w4 & c.Type == 5);
        series4.ArgumentDataMember = "Channel";
        series4.ValueDataMembers[0] = "Amount";

        chart5.Series.Clear();
        chart5.Series.AddRange(new Series[] { series1, series2, series3, series4 });

        DisplayOptionChart(chart5);

        GetChartTitle(chart5, "By channel - % Approval rate (Unit: %)",
            ChartTitleDockStyle.Top, true, "Arial", 10, System.Drawing.FontStyle.Bold, System.Drawing.Color.FromArgb(49, 134, 172), 10);


        series1 = new Series(w1, ViewType.Bar);
        series1.DataSource = obj.Where(c => c.Date == w1 & c.Type == 6);
        series1.ArgumentDataMember = "Channel";
        series1.ValueDataMembers[0] = "Amount";

        series2 = new Series(w2, ViewType.Bar);
        series2.DataSource = obj.Where(c => c.Date == w2 & c.Type == 6);
        series2.ArgumentDataMember = "Channel";
        series2.ValueDataMembers[0] = "Amount";

        series3 = new Series(w3, ViewType.Bar);
        series3.DataSource = obj.Where(c => c.Date == w3 & c.Type == 6);
        series3.ArgumentDataMember = "Channel";
        series3.ValueDataMembers[0] = "Amount";

        series4 = new Series(w4, ViewType.Bar);
        series4.DataSource = obj.Where(c => c.Date == w4 & c.Type == 6);
        series4.ArgumentDataMember = "Channel";
        series4.ValueDataMembers[0] = "Amount";

        chart6.Series.Clear();
        chart6.Series.AddRange(new Series[] { series1, series2, series3, series4 });

        DisplayOptionChart(chart6);

        GetChartTitle(chart6, "By channel - % Cancellation rate (Unit: %)",
            ChartTitleDockStyle.Top, true, "Arial", 10, System.Drawing.FontStyle.Bold, System.Drawing.Color.FromArgb(49, 134, 172), 10);
    }

    protected void GetApplicationChartErs()
    {
        var obj = Dashboard.Instance.TATApplicationGetChartErs();
        if (obj.Count == 0) return;

        Series series1 = new Series(w1, ViewType.Bar);
        series1.DataSource = obj.Where(c => c.Date == w1 & c.Type == 1);
        series1.ArgumentDataMember = "Channel";
        series1.ValueDataMembers[0] = "Amount";

        Series series2 = new Series(w2, ViewType.Bar);
        series2.DataSource = obj.Where(c => c.Date == w2 & c.Type == 1);
        series2.ArgumentDataMember = "Channel";
        series2.ValueDataMembers[0] = "Amount";

        Series series3 = new Series(w3, ViewType.Bar);
        series3.DataSource = obj.Where(c => c.Date == w3 & c.Type == 1);
        series3.ArgumentDataMember = "Channel";
        series3.ValueDataMembers[0] = "Amount";

        Series series4 = new Series(w4, ViewType.Bar);
        series4.DataSource = obj.Where(c => c.Date == w4 & c.Type == 1);
        series4.ArgumentDataMember = "Channel";
        series4.ValueDataMembers[0] = "Amount";

        chartErs1.Series.Clear();
        chartErs1.Series.AddRange(new Series[] { series1, series2, series3, series4 });

        DisplayOptionChart(chartErs1);

        GetChartTitle(chartErs1, "By channel - No of  new application created",
            ChartTitleDockStyle.Top, true, "Arial", 10, System.Drawing.FontStyle.Bold, System.Drawing.Color.FromArgb(49, 134, 172), 10);

        chart1.ToolTipEnabled = DevExpress.Utils.DefaultBoolean.False;

        series1 = new Series(w1, ViewType.Bar);
        series1.DataSource = obj.Where(c => c.Date == w1 & c.Type == 2);
        series1.ArgumentDataMember = "Channel";
        series1.ValueDataMembers[0] = "Amount";

        series2 = new Series(w2, ViewType.Bar);
        series2.DataSource = obj.Where(c => c.Date == w2 & c.Type == 2);
        series2.ArgumentDataMember = "Channel";
        series2.ValueDataMembers[0] = "Amount";

        series3 = new Series(w3, ViewType.Bar);
        series3.DataSource = obj.Where(c => c.Date == w3 & c.Type == 2);
        series3.ArgumentDataMember = "Channel";
        series3.ValueDataMembers[0] = "Amount";

        series4 = new Series(w4, ViewType.Bar);
        series4.DataSource = obj.Where(c => c.Date == w4 & c.Type == 2);
        series4.ArgumentDataMember = "Channel";
        series4.ValueDataMembers[0] = "Amount";

        chartErs2.Series.Clear();
        chartErs2.Series.AddRange(new Series[] { series1, series2, series3, series4 });

        DisplayOptionChart(chartErs2);

        GetChartTitle(chartErs2, "By channel - No of application approved",
            ChartTitleDockStyle.Top, true, "Arial", 10, System.Drawing.FontStyle.Bold, System.Drawing.Color.FromArgb(49, 134, 172), 10);

        series1 = new Series(w1, ViewType.Bar);
        series1.DataSource = obj.Where(c => c.Date == w1 & c.Type == 3);
        series1.ArgumentDataMember = "Channel";
        series1.ValueDataMembers[0] = "Amount";

        series2 = new Series(w2, ViewType.Bar);
        series2.DataSource = obj.Where(c => c.Date == w2 & c.Type == 3);
        series2.ArgumentDataMember = "Channel";
        series2.ValueDataMembers[0] = "Amount";

        series3 = new Series(w3, ViewType.Bar);
        series3.DataSource = obj.Where(c => c.Date == w3 & c.Type == 3);
        series3.ArgumentDataMember = "Channel";
        series3.ValueDataMembers[0] = "Amount";

        series4 = new Series(w4, ViewType.Bar);
        series4.DataSource = obj.Where(c => c.Date == w4 & c.Type == 3);
        series4.ArgumentDataMember = "Channel";
        series4.ValueDataMembers[0] = "Amount";

        chartErs3.Series.Clear();
        chartErs3.Series.AddRange(new Series[] { series1, series2, series3, series4 });

        DisplayOptionChart(chartErs3);

        GetChartTitle(chartErs3, "By channel - No of application rejected",
            ChartTitleDockStyle.Top, true, "Arial", 10, System.Drawing.FontStyle.Bold, System.Drawing.Color.FromArgb(49, 134, 172), 10);


        series1 = new Series(w1, ViewType.Bar);
        series1.DataSource = obj.Where(c => c.Date == w1 & c.Type == 4);
        series1.ArgumentDataMember = "Channel";
        series1.ValueDataMembers[0] = "Amount";

        series2 = new Series(w2, ViewType.Bar);
        series2.DataSource = obj.Where(c => c.Date == w2 & c.Type == 4);
        series2.ArgumentDataMember = "Channel";
        series2.ValueDataMembers[0] = "Amount";

        series3 = new Series(w3, ViewType.Bar);
        series3.DataSource = obj.Where(c => c.Date == w3 & c.Type == 4);
        series3.ArgumentDataMember = "Channel";
        series3.ValueDataMembers[0] = "Amount";

        series4 = new Series(w4, ViewType.Bar);
        series4.DataSource = obj.Where(c => c.Date == w4 & c.Type == 4);
        series4.ArgumentDataMember = "Channel";
        series4.ValueDataMembers[0] = "Amount";

        chartErs4.Series.Clear();
        chartErs4.Series.AddRange(new Series[] { series1, series2, series3, series4 });

        DisplayOptionChart(chartErs4);

        GetChartTitle(chartErs4, "By channel - No of application cancelled",
            ChartTitleDockStyle.Top, true, "Arial", 10, System.Drawing.FontStyle.Bold, System.Drawing.Color.FromArgb(49, 134, 172), 10);


        series1 = new Series(w1, ViewType.Bar);
        series1.DataSource = obj.Where(c => c.Date == w1 & c.Type == 5);
        series1.ArgumentDataMember = "Channel";
        series1.ValueDataMembers[0] = "Amount";

        series2 = new Series(w2, ViewType.Bar);
        series2.DataSource = obj.Where(c => c.Date == w2 & c.Type == 5);
        series2.ArgumentDataMember = "Channel";
        series2.ValueDataMembers[0] = "Amount";

        series3 = new Series(w3, ViewType.Bar);
        series3.DataSource = obj.Where(c => c.Date == w3 & c.Type == 5);
        series3.ArgumentDataMember = "Channel";
        series3.ValueDataMembers[0] = "Amount";

        series4 = new Series(w4, ViewType.Bar);
        series4.DataSource = obj.Where(c => c.Date == w4 & c.Type == 5);
        series4.ArgumentDataMember = "Channel";
        series4.ValueDataMembers[0] = "Amount";

        chartErs5.Series.Clear();
        chartErs5.Series.AddRange(new Series[] { series1, series2, series3, series4 });

        DisplayOptionChart(chartErs5);

        GetChartTitle(chartErs5, "By channel - % Approval rate (Unit: %)",
            ChartTitleDockStyle.Top, true, "Arial", 10, System.Drawing.FontStyle.Bold, System.Drawing.Color.FromArgb(49, 134, 172), 10);


        series1 = new Series(w1, ViewType.Bar);
        series1.DataSource = obj.Where(c => c.Date == w1 & c.Type == 6);
        series1.ArgumentDataMember = "Channel";
        series1.ValueDataMembers[0] = "Amount";

        series2 = new Series(w2, ViewType.Bar);
        series2.DataSource = obj.Where(c => c.Date == w2 & c.Type == 6);
        series2.ArgumentDataMember = "Channel";
        series2.ValueDataMembers[0] = "Amount";

        series3 = new Series(w3, ViewType.Bar);
        series3.DataSource = obj.Where(c => c.Date == w3 & c.Type == 6);
        series3.ArgumentDataMember = "Channel";
        series3.ValueDataMembers[0] = "Amount";

        series4 = new Series(w4, ViewType.Bar);
        series4.DataSource = obj.Where(c => c.Date == w4 & c.Type == 6);
        series4.ArgumentDataMember = "Channel";
        series4.ValueDataMembers[0] = "Amount";

        chartErs6.Series.Clear();
        chartErs6.Series.AddRange(new Series[] { series1, series2, series3, series4 });

        DisplayOptionChart(chartErs6);

        GetChartTitle(chartErs6, "By channel - % Cancellation rate (Unit: %)",
            ChartTitleDockStyle.Top, true, "Arial", 10, System.Drawing.FontStyle.Bold, System.Drawing.Color.FromArgb(49, 134, 172), 10);
    }

    protected void GetTurnAroundTime(string product)
    {
        var obj = Dashboard.Instance.TATByVpb(product);
        if (obj.Count == 0) return;

        Series series1 = new Series("VPB TAT", ViewType.StackedBar);
        series1.DataSource = obj.Where(c => c.Name == "n1");
        series1.ArgumentDataMember = "Date";
        series1.ValueDataMembers[0] = "Amount";

        Series series2 = new Series("Customer confirmation time", ViewType.StackedBar);
        series2.DataSource = obj.Where(c => c.Name == "n2");
        series2.ArgumentDataMember = "Date";
        series2.ValueDataMembers[0] = "Amount";

        Series series3 = new Series("Post approval documentation time", ViewType.StackedBar);
        series3.DataSource = obj.Where(c => c.Name == "n3");
        series3.ArgumentDataMember = "Date";
        series3.ValueDataMembers[0] = "Amount";

        Series series4 = new Series("Total time to disbursement", ViewType.Spline);
        series4.DataSource = obj.Where(c => c.Name == "n4");
        series4.ArgumentDataMember = "Date";
        series4.ValueDataMembers[0] = "Amount";

        switch (product)
        {
            case "Auto Loan":
                chartProduct1.Series.Clear();
                chartProduct1.Series.AddRange(new Series[] { series1, series2, series3, series4 });

                DisplayOptionChartProduct(chartProduct1);

                GetChartTitle(chartProduct1, "VPB TAT",
                    ChartTitleDockStyle.Top, true, "Arial", 10, System.Drawing.FontStyle.Bold, System.Drawing.Color.FromArgb(49, 134, 172), 10);
                break;

            case "Consumption Loan":
                chartProduct2.Series.Clear();
                chartProduct2.Series.AddRange(new Series[] { series1, series2, series3, series4 });

                DisplayOptionChartProduct(chartProduct2);

                GetChartTitle(chartProduct2, "VPB TAT",
                    ChartTitleDockStyle.Top, true, "Arial", 10, System.Drawing.FontStyle.Bold, System.Drawing.Color.FromArgb(49, 134, 172), 10);
                break;

            case "Home Loan":
                chartProduct3.Series.Clear();
                chartProduct3.Series.AddRange(new Series[] { series1, series2, series3, series4 });

                DisplayOptionChartProduct(chartProduct3);

                GetChartTitle(chartProduct3, "VPB TAT",
                    ChartTitleDockStyle.Top, true, "Arial", 10, System.Drawing.FontStyle.Bold, System.Drawing.Color.FromArgb(49, 134, 172), 10);
                break;

            case "Household Business Loan":
                chartProduct4.Series.Clear();
                chartProduct4.Series.AddRange(new Series[] { series1, series2, series3, series4 });

                DisplayOptionChartProduct(chartProduct4);

                GetChartTitle(chartProduct4, "VPB TAT",
                    ChartTitleDockStyle.Top, true, "Arial", 10, System.Drawing.FontStyle.Bold, System.Drawing.Color.FromArgb(49, 134, 172), 10);
                break;

            case "Overdraft":
                chartProduct5.Series.Clear();
                chartProduct5.Series.AddRange(new Series[] { series1, series2, series3, series4 });

                DisplayOptionChartProduct(chartProduct5);

                GetChartTitle(chartProduct5, "VPB TAT",
                    ChartTitleDockStyle.Top, true, "Arial", 10, System.Drawing.FontStyle.Bold, System.Drawing.Color.FromArgb(49, 134, 172), 10);
                break;

            case "UPL":
                chartProduct6.Series.Clear();
                chartProduct6.Series.AddRange(new Series[] { series1, series2, series3, series4 });

                DisplayOptionChartProduct(chartProduct6);

                GetChartTitle(chartProduct6, "VPB TAT",
                    ChartTitleDockStyle.Top, true, "Arial", 10, System.Drawing.FontStyle.Bold, System.Drawing.Color.FromArgb(49, 134, 172), 10);
                break;

            case "Credit card":
                chartProduct7.Series.Clear();
                chartProduct7.Series.AddRange(new Series[] { series1, series2, series3, series4 });

                DisplayOptionChartProduct(chartProduct7);

                GetChartTitle(chartProduct7, "VPB TAT",
                    ChartTitleDockStyle.Top, true, "Arial", 10, System.Drawing.FontStyle.Bold, System.Drawing.Color.FromArgb(49, 134, 172), 10);
                break;

            case "Overall (excluded credit card)":
                chartProduct8.Series.Clear();
                chartProduct8.Series.AddRange(new Series[] { series1, series2, series3, series4 });

                DisplayOptionChartProduct(chartProduct8);

                GetChartTitle(chartProduct8, "VPB TAT",
                    ChartTitleDockStyle.Top, true, "Arial", 10, System.Drawing.FontStyle.Bold, System.Drawing.Color.FromArgb(49, 134, 172), 10);
                break;
        }
        GetStage(product);
    }

    public class Stage
    {
        public string Name { get; set; }
        public decimal Amount { get; set; }
        public string Product { get; set; }
        public int Type { get; set; }

        public Stage(string name, decimal amount, string product, int type)
        {
            Name = name;
            Amount = amount;
            Product = product;
            Type = type;
        }
    }

    protected void GetStage(string product)
    {
        var obj = Dashboard.Instance.TATByStage(product);        
        if (obj.Count == 0) return;        

        List<Stage> lstStage = new List<Stage>();
        foreach (var item in obj)
        {
            lstStage.Add(new Stage(item.Name, item.Amount.Value, item.Product, 1));
        }

        for (int i = 1; i < obj.Count - 1; i++)
        {
            decimal val = 0;
            for (int j = 0; j < i; j++)
            {
                val += lstStage[j].Amount;
            }
            lstStage.Add(new Stage(lstStage[i].Name, val, lstStage[i].Product, 2));
        }

        Series series1 = new Series("Detail", ViewType.StackedBar);
        series1.DataSource = lstStage.Where(c => c.Type == 2);
        series1.ArgumentDataMember = "Name";
        series1.ValueDataMembers[0] = "Amount";

        Series series2 = new Series("Detail1", ViewType.StackedBar);
        series2.DataSource = lstStage.Where(c => c.Type == 1);
        series2.ArgumentDataMember = "Name";
        series2.ValueDataMembers[0] = "Amount";

        switch (product)
        {
            case "Auto Loan":
                chartStage1.Series.Clear();
                chartStage1.Series.AddRange(new Series[] { series1, series2 });

                DisplayOptionChartProduct(chartStage1);

                GetChartTitle(chartStage1, "TTD by stage for " + w4,
                    ChartTitleDockStyle.Top, true, "Arial", 10, System.Drawing.FontStyle.Bold, System.Drawing.Color.FromArgb(49, 134, 172), 10);
                break;
            case "Consumption Loan":
                chartStage2.Series.Clear();
                chartStage2.Series.AddRange(new Series[] { series1, series2 });

                DisplayOptionChartProduct(chartStage2);

                GetChartTitle(chartStage2, "TTD by stage for " + w4,
                    ChartTitleDockStyle.Top, true, "Arial", 10, System.Drawing.FontStyle.Bold, System.Drawing.Color.FromArgb(49, 134, 172), 10);
                break;
            case "Home Loan":
                chartStage3.Series.Clear();
                chartStage3.Series.AddRange(new Series[] { series1, series2 });

                DisplayOptionChartProduct(chartStage3);

                GetChartTitle(chartStage3, "TTD by stage for " + w4,
                    ChartTitleDockStyle.Top, true, "Arial", 10, System.Drawing.FontStyle.Bold, System.Drawing.Color.FromArgb(49, 134, 172), 10);
                break;
            case "Household Business Loan":
                chartStage4.Series.Clear();
                chartStage4.Series.AddRange(new Series[] { series1, series2 });

                DisplayOptionChartProduct(chartStage4);

                GetChartTitle(chartStage4, "TTD by stage for " + w4,
                    ChartTitleDockStyle.Top, true, "Arial", 10, System.Drawing.FontStyle.Bold, System.Drawing.Color.FromArgb(49, 134, 172), 10);
                break;
            case "Overdraft":
                chartStage5.Series.Clear();
                chartStage5.Series.AddRange(new Series[] { series1, series2 });

                DisplayOptionChartProduct(chartStage5);

                GetChartTitle(chartStage5, "TTD by stage for " + w4,
                    ChartTitleDockStyle.Top, true, "Arial", 10, System.Drawing.FontStyle.Bold, System.Drawing.Color.FromArgb(49, 134, 172), 10);
                break;
            case "UPL":
                chartStage6.Series.Clear();
                chartStage6.Series.AddRange(new Series[] { series1, series2 });

                DisplayOptionChartProduct(chartStage6);

                GetChartTitle(chartStage6, "TTD by stage for " + w4,
                    ChartTitleDockStyle.Top, true, "Arial", 10, System.Drawing.FontStyle.Bold, System.Drawing.Color.FromArgb(49, 134, 172), 10);
                break;
            case "Credit card":
                chartStage7.Series.Clear();
                chartStage7.Series.AddRange(new Series[] { series1, series2 });

                DisplayOptionChartProduct(chartStage7);

                GetChartTitle(chartStage7, "TTD by stage for " + w4,
                    ChartTitleDockStyle.Top, true, "Arial", 10, System.Drawing.FontStyle.Bold, System.Drawing.Color.FromArgb(49, 134, 172), 10);
                break;
            case "Overall (excluded credit card)":
                chartStage8.Series.Clear();
                chartStage8.Series.AddRange(new Series[] { series1, series2 });

                DisplayOptionChartProduct(chartStage8);

                GetChartTitle(chartStage8, "TTD by stage for " + w4,
                    ChartTitleDockStyle.Top, true, "Arial", 10, System.Drawing.FontStyle.Bold, System.Drawing.Color.FromArgb(49, 134, 172), 10);
                break;
        }
        
    }

    protected void DisplayOptionChart(WebChartControl chart)
    {
        foreach (Series series in chart.Series)
        {
            series.LabelsVisibility = DevExpress.Utils.DefaultBoolean.True;
            series.Label.Border.Visible = false;
            series.Label.LineVisible = false;
            series.Label.LineLength = 2;
            series.Label.Antialiasing = false;
            series.Label.BackColor = System.Drawing.Color.Transparent;
            series.Label.Font = new System.Drawing.Font("Tahoma", 7, System.Drawing.FontStyle.Regular);
            ((SideBySideBarSeriesView)series.View).BarWidth = 0.8;
        }

        Legend legend = chart.Legend;

        // Display the chart control's legend.
        legend.Visible = true;

        // Define its margins and alignment relative to the diagram.        
        legend.AlignmentHorizontal = LegendAlignmentHorizontal.Right;
        legend.AlignmentVertical = LegendAlignmentVertical.TopOutside;
        legend.Direction = LegendDirection.LeftToRight;
        legend.Border.Visible = false;

        ((XYDiagram)chart.Diagram).AxisY.Visible = false;
        ((XYDiagram)chart.Diagram).AxisY.Label.Visible = false;
        ((XYDiagram)chart.Diagram).AxisY.GridLines.Visible = false;
    }

    protected void DisplayOptionChartProduct(WebChartControl chart)
    {
        foreach (Series series in chart.Series)
        {            
            series.LabelsVisibility = DevExpress.Utils.DefaultBoolean.True;
            if (series.Name.Equals("Detail"))
            {                
                series.LabelsVisibility = DevExpress.Utils.DefaultBoolean.False;
                
                ((BarSeriesView)series.View).Border.Color = System.Drawing.Color.White;
                
            }

            if (series.Name.Equals("Detail") || series.Name.Equals("Detail1"))
            {
                ((BarSeriesView)series.View).FillStyle.FillMode = FillMode.Solid;                  
            }

            series.Label.Font = new System.Drawing.Font("Tahoma", 7, System.Drawing.FontStyle.Regular);            
            
        }

        Legend legend = chart.Legend;

        // Display the chart control's legend.
        legend.Visible = false;

        ((XYDiagram)chart.Diagram).AxisY.Visible = false;
        ((XYDiagram)chart.Diagram).AxisY.Label.Visible = false;
        ((XYDiagram)chart.Diagram).AxisY.GridLines.Visible = false;

        chart.BorderOptions.Visible = false;
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

    protected void chartStage1_CustomDrawSeries(object sender, CustomDrawSeriesEventArgs e)
    {        
        if (e.Series.View is BarSeriesView)
        {            
            if (e.Series.Name.Equals("Detail"))
                e.SeriesDrawOptions.Color = System.Drawing.Color.White;
            else if (e.Series.Name.Equals("Detail1"))
                e.SeriesDrawOptions.Color = System.Drawing.Color.FromArgb(119,147,60);
        }
    }

    protected void chartStage2_CustomDrawSeries(object sender, CustomDrawSeriesEventArgs e)
    {
        if (e.Series.View is BarSeriesView)
        {
            if (e.Series.Name.Equals("Detail"))
                e.SeriesDrawOptions.Color = System.Drawing.Color.White;
            else if (e.Series.Name.Equals("Detail1"))
                e.SeriesDrawOptions.Color = System.Drawing.Color.FromArgb(119, 147, 60);
        }
    }

    protected void chartStage3_CustomDrawSeries(object sender, CustomDrawSeriesEventArgs e)
    {
        if (e.Series.View is BarSeriesView)
        {
            if (e.Series.Name.Equals("Detail"))
                e.SeriesDrawOptions.Color = System.Drawing.Color.White;
            else if (e.Series.Name.Equals("Detail1"))
                e.SeriesDrawOptions.Color = System.Drawing.Color.FromArgb(119, 147, 60);
        }
    }

    protected void chartStage4_CustomDrawSeries(object sender, CustomDrawSeriesEventArgs e)
    {
        if (e.Series.View is BarSeriesView)
        {
            if (e.Series.Name.Equals("Detail"))
                e.SeriesDrawOptions.Color = System.Drawing.Color.White;
            else if (e.Series.Name.Equals("Detail1"))
                e.SeriesDrawOptions.Color = System.Drawing.Color.FromArgb(119, 147, 60);            
        }
    }

    protected void chartStage5_CustomDrawSeries(object sender, CustomDrawSeriesEventArgs e)
    {
        if (e.Series.View is BarSeriesView)
        {
            if (e.Series.Name.Equals("Detail"))
                e.SeriesDrawOptions.Color = System.Drawing.Color.White;
            else if (e.Series.Name.Equals("Detail1"))
                e.SeriesDrawOptions.Color = System.Drawing.Color.FromArgb(119, 147, 60);
        }
    }

    protected void chartStage6_CustomDrawSeries(object sender, CustomDrawSeriesEventArgs e)
    {
        if (e.Series.View is BarSeriesView)
        {
            if (e.Series.Name.Equals("Detail"))
                e.SeriesDrawOptions.Color = System.Drawing.Color.White;
            else if (e.Series.Name.Equals("Detail1"))
                e.SeriesDrawOptions.Color = System.Drawing.Color.FromArgb(119, 147, 60);
        }
    }

    protected void chartStage7_CustomDrawSeries(object sender, CustomDrawSeriesEventArgs e)
    {
        if (e.Series.View is BarSeriesView)
        {
            if (e.Series.Name.Equals("Detail"))
                e.SeriesDrawOptions.Color = System.Drawing.Color.White;
            else if (e.Series.Name.Equals("Detail1"))
                e.SeriesDrawOptions.Color = System.Drawing.Color.FromArgb(119, 147, 60);
        }
    }

    protected void chartStage8_CustomDrawSeries(object sender, CustomDrawSeriesEventArgs e)
    {
        if (e.Series.View is BarSeriesView)
        {
            if (e.Series.Name.Equals("Detail"))
                e.SeriesDrawOptions.Color = System.Drawing.Color.White;
            else if (e.Series.Name.Equals("Detail1"))
                e.SeriesDrawOptions.Color = System.Drawing.Color.FromArgb(119, 147, 60);
        }
    }
}