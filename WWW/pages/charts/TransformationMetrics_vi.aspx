<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPageAdmin.master" AutoEventWireup="true" CodeFile="TransformationMetrics_vi.aspx.cs" Inherits="pages_charts_TransformationMetrics_vi" %>

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
                BẢNG THEO DÕI CÁC CHỈ TIÊU CHUYỂN ĐỔI TOÀN HÀNG
            </p>
            <ul class="tat-tab">
                <li class="active">IMPACT ON SALES</li> 
                <li>IMPACT ON SERVICES</li>
                <li>IMPACT ON EFFICIENCY</li>               
            </ul>
            <table style="width: 130px; float: right; margin-bottom: 26px; font-size: 12px; display: block">
                <tr>
                    <td style="text-align: left">
                        Ngôn ngữ:
                    </td>
                    <td style="text-align: right">
                        <a style="color: Green; text-decoration: underline;" href="transformation-metrics">
                            Tiếng Anh</a>
                    </td>
                </tr>
            </table>
            <div class="clear">
            </div>
        </div>
        
        <div id="impact-on-sales">
        <table style="width: 100%; margin: 5px 0; background:#DAEEF3">
            <tr>
                <td style="width: 200px; font-size: 13px; font-weight: bold;">Tóm tắt nội dung</td>
                <td style="text-align: left">1. Trong tháng 2, do kỳ nghỉ Tết dài ngày, năng suất bán của cả KHCN và SME đều giảm đối với cả tín dụng và huy động vốn <br />
2. Theo đó, tổng huy động mới và tổng giải ngân trong tháng 2 của KHCN và SME cũng đều giảm. <br />
3. Tỷ lệ CASA trên tổng huy động của KHCN và SME đều giảm trong tháng 2. <br />
4. Tỷ lệ sử dụng ebanking tiếp tục tăng đạt 35% trong khi tỷ lệ sản phẩm bình quân trên một khách hàng cũng tăng trở lại 1.22 sau 2 tháng duy trì ở mức 1.21 <br />
</td>
            </tr>                        
        </table>

        <div class="box transformation-metric">
            <p class="title"><span class="tooltip1">1. Năng suất bán sản phẩm huy động - Số dư huy động  mới (Tỷ đồng)</span></p>
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
                <span class="tooltip2">2. Năng suất bán sản phẩm vay (không tính thẻ tín dụng) - Số tiền giải ngân (Tỷ đồng)</span></p>
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
            <p class="title"><span class="tooltip3">3. Số dư huy động mới (Tỷ đồng)</span></p>
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
                <span class="tooltip4">4. Dư nợ giải ngân mới (Tỷ đồng)</span></p>
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
            <p class="title"><span class="tooltip5">5. Tỷ lệ tiền gửi thanh toán trên tổng huy động vốn (%)</span></p>
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
                <span class="tooltip6">6. Số lượng khách hàng hoạt động &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></p>
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
            <p class="title"><span class="tooltip7">7. Tỷ lệ sử dụng Ebanking (%)</span></p>
            <dxchartsui:WebChartControl ID="chartMetric13" Width="380px" runat="server">
            </dxchartsui:WebChartControl>
        </div>
        <div class="box transformation-metric" style="width: 380px; float: left;">
            <p class="title"><span class="tooltip8">8. Tỷ lệ sản phẩm bình quân trên một khách hàng sử dụng</span></p>
            <dxchartsui:WebChartControl ID="chartMetric14" Width="380px" runat="server">
            </dxchartsui:WebChartControl>
        </div>
        <div class="box transformation-metric" style="width: 380px; float: right;">
            <p class="title"><span class="tooltip9">9. Tỷ lệ thu phí trên tổng thu nhập</span></p>
            <dxchartsui:WebChartControl ID="chartMetric15" Width="380px" runat="server">
            </dxchartsui:WebChartControl>
        </div>
        <div class="clear"></div>
        </div>
        <div id="impact-on-services" style="display: none">
            <table style="width: 100%; margin: 5px 0; background: #DAEEF3">
                <tr>
                    <td style="width: 200px; font-size: 13px; font-weight: bold;">
                        Tóm tắt nội dung
                    </td>
                    <td style="text-align: left">
                        1. TAT giảm đáng kể trong tháng 2
                    </td>
                </tr>
            </table>
            <div class="box transformation-metric" style="width: 580px; float: left;">
            <p class="title"><span class="tooltip10">10. Thời gian ra quyết định theo ngày thực tế</span></p>
            <dxchartsui:WebChartControl ID="chartMetric16" Width="580px" Height="300px" runat="server">
            </dxchartsui:WebChartControl>
        </div>
        <div class="box transformation-metric" style="width: 580px; float: right;">
            <p class="title"><span class="tooltip11">11. Thời gian xử lý theo ngày thực tế tại VPBank</span></p>
            <dxchartsui:WebChartControl ID="chartMetric17" Width="580px" Height="300px" runat="server">
            </dxchartsui:WebChartControl>
        </div>
        </div>
        <div class="clear"></div>
        <div id="impact-on-efficiency" style="display: none">
            <table style="width: 100%; margin: 5px 0; background: #DAEEF3">
                <tr>
                    <td style="width: 200px; font-size: 13px; font-weight: bold;">
                        Tóm tắt nội dung
                    </td>
                    <td style="text-align: left">
                        1. Nợ xấu của KHCN tăng lên 9.79% sau khi được điều chỉnh trong khi tỷ lệ nợ xấu của SME vẫn được duy trì ở mức 0.03%
                    </td>
                </tr>
            </table>
            <div class="box transformation-metric" style="width: 380px; float: left; margin-right: 18px;">
            <p class="title"><span class="tooltip12">12. Tỷ lệ khoản vay đạt chuẩn</span></p>
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

