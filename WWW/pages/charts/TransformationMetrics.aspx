<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPageAdmin.master" AutoEventWireup="true"
    CodeFile="TransformationMetrics.aspx.cs" Inherits="pages_charts_TransformationMetrics" %>

<%@ Register Assembly="DevExpress.XtraCharts.v13.1.Web, Version=13.1.4.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a"
    Namespace="DevExpress.XtraCharts.Web" TagPrefix="dxchartsui" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <link href="/css/dashboard.css?v=1" rel="stylesheet" type="text/css" />

    <script type="text/javascript">
        $(function () {
            for (var i = 1; i <= 13; i++) {
                $('.tooltip' + i).qtip({ content: { url: '/templates/pages/dashboard/transformation/tooltip' + i + '.htm' }, style: { name: 'green', tip: true, border: { radius: 3 }, width: { min: 500} }, show: { effect: { type: 'slide'} }, position: { corner: { tooltip: 'topMiddle'} }, hide: { delay: 200} });
            }
            $('.tooltip14').qtip({ content: { url: '/templates/pages/dashboard/transformation/tooltip14.htm' }, style: { name: 'green', tip: true, border: { radius: 3 }, width: { min: 500} }, show: { effect: { type: 'slide'} }, position: { corner: { tooltip: 'topRight'} }, hide: { delay: 200} });
            $(".tat-tab li").live('click', function () {
                $(".tat-tab li").removeClass("active");
                $(this).addClass("active");

                var tab = $(this).html();
                switch (tab) {
                    case "IMPACT ON SALES":
                        $("#impact-on-services").slideUp('slow');
                        $("#impact-on-efficiency").slideUp('slow');
                        $("#impact-on-sales").slideDown('slow');
                        break;
                    case "IMPACT ON SERVICES":
                        $("#impact-on-efficiency").slideUp('slow');
                        $("#impact-on-sales").slideUp('slow');
                        $("#impact-on-services").slideDown('slow');
                        break;
                    case "IMPACT ON EFFICIENCY":
                        $("#impact-on-efficiency").slideDown('slow');
                        $("#impact-on-services").slideUp('slow');
                        $("#impact-on-sales").slideUp('slow');
                        break;
                }
            });
        });
    </script>

    <style type="text/css">
        .dashboard {margin-bottom: 100px;}
        .dashboard .box .title {background: #339933;}
        .dashboard .box .title span {font-size: 15px; font-weight: bold;}
        .metric-chart {padding: 5px 5px 0 5px;}
        .metric-chart .chart {margin-bottom:5px;}
        .dashboard .box .title {text-transform: none;}
        #impact-on-sales .dxchartsuiTooltip,
        #impact-on-sales .dxchartsuiCrosshairVLine {display: none;}
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div class="dashboard">
        <div style="border-bottom: 2px solid #333; position: relative;">
            <p class="title-das" style="float: left; font-size: 22px; padding-top: 18px;">
                BANK TRANSFORMATION ASSESSMENT DASHBOARD
            </p>
            <ul class="tat-tab">
                <li class="active">IMPACT ON SALES</li> 
                <li>IMPACT ON SERVICES</li>
                <li>IMPACT ON EFFICIENCY</li>               
            </ul>
            <table style="width: 130px; float: right; margin-bottom: 26px; font-size: 12px; display: block">
                <tr>
                    <td style="text-align: left">
                        Language:
                    </td>
                    <td style="text-align: right">
                        <a style="color: Green; text-decoration: underline;" href="transformation-metrics-vi">
                            Vietnamese</a>
                    </td>
                </tr>
            </table>
            <div class="clear">
            </div>
        </div>
        
        <div id="impact-on-sales">
        <table style="width: 100%; margin: 5px 0; background:#DAEEF3">
            <tr>
                <td style="width: 200px; font-size: 13px; font-weight: bold;">Executive Summary</td>
                <td style="text-align: left">1. In November, Retail sales productivity - Deposits continue to decrease to 5.49 bil/FTE. SME sales productivity - Deposit also drop from 7.99 to 5.04 bil.<br />
2. While sales productivity - Loan of Retail decrease from 1.48 to 1.13, one for SME increase highly from 5.59 to 7.14.<br />
3. Net fee income to total income ratio increase from 9.1% to 11.13%
</td>
            </tr>                        
        </table>

        <div class="box transformation-metric">
            <p class="title"><span class="tooltip1">1. Sales productivity (Deposits) - New balance (Billion VND)</span></p>
            <div class="metric-chart">
                <div class="chart" style="float:left">
                    <dxchartsui:WebChartControl ID="chartMetric1" Width="580px" runat="server">
                    </dxchartsui:WebChartControl>
                </div>
                <div class="chart" style="float:right">
                    <dxchartsui:WebChartControl ID="chartMetric2" Width="580px" runat="server">
                    </dxchartsui:WebChartControl>
                </div>
                <div class="clear">
                </div>
            </div>
        </div>
        <div class="box transformation-metric">
            <p class="title">
                <span class="tooltip2">2. Sales productivity (Loan excl. Credit Card) - Disbursement (Billion VND)</span></p>
            <div class="metric-chart">
                <div class="chart" style="float: left">
                    <dxchartsui:WebChartControl ID="chartMetric3" Width="580px" runat="server">
                    </dxchartsui:WebChartControl>
                </div>
                <div class="chart" style="float: right">
                    <dxchartsui:WebChartControl ID="chartMetric4" Width="580px" runat="server">
                    </dxchartsui:WebChartControl>
                </div>
                <div class="clear">
                </div>
            </div>
        </div>

        <div class="box transformation-metric">
            <p class="title"><span class="tooltip3">3. New deposit balance  - By Division (Billion VND)</span></p>
            <div class="metric-chart">
                <div class="chart" style="float:left">
                    <dxchartsui:WebChartControl ID="chartMetric5" Width="580px" runat="server">
                    </dxchartsui:WebChartControl>
                </div>
                <div class="chart" style="float:right">
                    <dxchartsui:WebChartControl ID="chartMetric6" Width="580px" runat="server">
                    </dxchartsui:WebChartControl>
                </div>
                <div class="clear">
                </div>
            </div>
        </div>
        <div class="box transformation-metric">
            <p class="title">
                <span class="tooltip4">4. Disbursement - By Division (Billion VND)</span></p>
            <div class="metric-chart">
                <div class="chart" style="float: left">
                    <dxchartsui:WebChartControl ID="chartMetric7" Width="580px" runat="server">
                    </dxchartsui:WebChartControl>
                </div>
                <div class="chart" style="float: right">
                    <dxchartsui:WebChartControl ID="chartMetric8" Width="580px" runat="server">
                    </dxchartsui:WebChartControl>
                </div>
                <div class="clear">
                </div>
            </div>
        </div>

        <div class="box transformation-metric">
            <p class="title"><span class="tooltip5">5. CASA to total Deposit ratio (Unit: %)</span></p>
            <div class="metric-chart">
                <div class="chart" style="float:left">
                    <dxchartsui:WebChartControl ID="chartMetric9" Width="580px" runat="server">
                    </dxchartsui:WebChartControl>
                </div>
                <div class="chart" style="float:right">
                    <dxchartsui:WebChartControl ID="chartMetric10" Width="580px" runat="server">
                    </dxchartsui:WebChartControl>
                </div>
                <div class="clear">
                </div>
            </div>
        </div>
        <div class="box transformation-metric">
            <p class="title">
                <span class="tooltip6">6. Active customers &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></p>
            <div class="metric-chart">
                <div class="chart" style="float: left">
                    <dxchartsui:WebChartControl ID="chartMetric11" Width="580px" runat="server">
                    </dxchartsui:WebChartControl>
                </div>
                <div class="chart" style="float: right">
                    <dxchartsui:WebChartControl ID="chartMetric12" Width="580px" runat="server">
                    </dxchartsui:WebChartControl>
                </div>
                <div class="clear">
                </div>
            </div>
        </div>

        <div class="box transformation-metric" style="width: 380px; float: left; margin-right: 18px;">
            <p class="title"><span class="tooltip7">7. Ebanking usage (Unit: %)</span></p>
            <dxchartsui:WebChartControl ID="chartMetric13" Width="380px" runat="server">
            </dxchartsui:WebChartControl>
        </div>
        <div class="box transformation-metric" style="width: 380px; float: left;">
            <p class="title"><span class="tooltip8">8. Product holding ratio</span></p>
            <dxchartsui:WebChartControl ID="chartMetric14" Width="380px" runat="server">
            </dxchartsui:WebChartControl>
        </div>
        <div class="box transformation-metric" style="width: 380px; float: right;">
            <p class="title"><span class="tooltip9">9. Fee income to total income</span></p>
            <dxchartsui:WebChartControl ID="chartMetric15" Width="380px" runat="server">
            </dxchartsui:WebChartControl>
        </div>
        <div class="clear"></div>
        </div>
        <div id="impact-on-services" style="display: none">
            <table style="width: 100%; margin: 5px 0; background: #DAEEF3">
                <tr>
                    <td style="width: 200px; font-size: 13px; font-weight: bold;">
                        Executive Summary
                    </td>
                    <td style="text-align: left">
                        The decreasing trend of DT and TAT for all products are reserve while DT and TAT increase significantly in November.
                    </td>
                </tr>
            </table>
            <div class="box transformation-metric" style="width: 580px; float: left;">
            <p class="title"><span class="tooltip10">10. Decisioning Time (DT) in Calendar Days</span></p>
            <dxchartsui:WebChartControl ID="chartMetric16" Width="580px" Height="300px" runat="server">
            </dxchartsui:WebChartControl>
        </div>
        <div class="box transformation-metric" style="width: 580px; float: right;">
            <p class="title"><span class="tooltip11">11. VPBank TAT in Calendar Days</span></p>
            <dxchartsui:WebChartControl ID="chartMetric17" Width="580px" Height="300px" runat="server">
            </dxchartsui:WebChartControl>
        </div>
        </div>
        <div class="clear"></div>
        <div id="impact-on-efficiency" style="display: none">
            <table style="width: 100%; margin: 5px 0; background: #DAEEF3">
                <tr>
                    <td style="width: 200px; font-size: 13px; font-weight: bold;">
                        Executive Summary
                    </td>
                    <td style="text-align: left">
                        1. Standard loan ratio of SME decrease highly due to non-standardized process<br />
2. NPL of Retail and SME decrease in November but still very high, 9.39% (including badbook) for Retail and 3.86% for SME
                    </td>
                </tr>
            </table>
            <div class="box transformation-metric" style="width: 380px; float: left; margin-right: 18px;">
            <p class="title"><span class="tooltip12">12. Standard loan ratio</span></p>
            <dxchartsui:WebChartControl ID="chartMetric18" Width="380px" Height="250px" runat="server">
            </dxchartsui:WebChartControl>
        </div>
        <div class="box transformation-metric" style="width: 380px; float: left;">
            <p class="title"><span class="tooltip13">13. Risk cost - NPL (Unit: %)</span></p>
            <dxchartsui:WebChartControl ID="chartMetric19" Width="380px" Height="250px" runat="server">
            </dxchartsui:WebChartControl>
        </div>
        <div class="box transformation-metric" style="width: 380px; float: right;">
            <p class="title"><span class="tooltip14">14. Front office to Mid & Back office staff ratio</span></p>
            <dxchartsui:WebChartControl ID="chartMetric20" Width="380px" Height="250px" runat="server">
            </dxchartsui:WebChartControl>
        </div>
        </div>
        <div class="clear"></div>
    </div>
</asp:Content>
