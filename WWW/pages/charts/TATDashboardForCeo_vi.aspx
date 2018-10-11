<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPageAdmin.master" AutoEventWireup="true"
    CodeFile="TATDashboardForCeo_vi.aspx.cs" Inherits="pages_charts_TATDashboardForCeo_vi" %>

<%@ Register Assembly="DevExpress.XtraCharts.v13.1.Web, Version=13.1.4.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a"
    Namespace="DevExpress.XtraCharts.Web" TagPrefix="dxchartsui" %>
<%@ Register Assembly="DevExpress.XtraCharts.v13.1, Version=13.1.4.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a"
    Namespace="DevExpress.XtraCharts" TagPrefix="cc1" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <link href="/css/dashboard.css?v=1" rel="stylesheet" type="text/css" />
    <script src="/js/popup/dashboard/TatCeo.js" type="text/javascript"></script>
    <link href="/css/tat_ceo.css?v=1" rel="stylesheet" type="text/css" />
    <script type="text/javascript">
        $(function () {
            page_TATCeo.documentReady();
        });
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div class="dashboard">
        <div style="border-bottom: 2px solid #333; position: relative;">
            <p class="title-das" style="float: left; font-size: 22px; padding-top: 18px;">
                WEEKLY RETAIL APPLICATION PIPELINE/TAT REPORT
            </p>
            <ul class="tat-tab">
                <li class="active">Hồ sơ - Bao gồm trình lại</li>
                <li>Hồ sơ - Không bao gồm trình lại</li>
                <li>Thời gian giải ngân</li>
                <li>SLA</li>
            </ul>
            <table style="width: 130px; float: right; margin-bottom: 26px; font-size: 12px;">
                <tr>
                    <td style="text-align: left">
                        Ngôn ngữ:
                    </td>
                    <td style="text-align: right">
                        <a style="color: Green; text-decoration: underline;" href="weekly-retail-application-pipeline-tat-report">English</a>
                    </td>
                </tr>
            </table>
            <div class="clear">
            </div>
        </div>
        <div class="box application" style="padding-bottom: 5px">
            <p style="background: #339933; margin-bottom: 5px;" class="title">
                SỐ LƯỢNG HỒ SƠ VÀ TỶ LỆ PHÊ DUYỆT (BAO GỒM HỒ SƠ TRÌNH LẠI) - THEO SẢN PHẨM</p>
            <table style="width: 180px; float: left;" class="channel">
                <tr>
                    <th style="text-align: center; padding: 18.5px 0; background: #D8E4BC; font-size: 11px;">
                        Tiêu chí sản phẩm
                        <br />
                    </th>
                </tr>
                <tr>
                    <td style="background: #C4D79B">
                        <strong>Theo sản phẩm</strong>
                    </td>
                </tr>
                <tr>
                    <td style="background: #F2DCDB; border-bottom: 1px solid #333;">
                        <strong>All products</strong>
                    </td>
                </tr>
                <tr>
                    <td style="padding-left: 20px;">
                        <strong>Auto Loan</strong>
                    </td>
                </tr>
                <tr>
                    <td style="padding-left: 20px;">
                        <strong>Consumption Loan</strong>
                    </td>
                </tr>
                <tr>
                    <td style="padding-left: 20px;">
                        <strong>Home Loan</strong>
                    </td>
                </tr>
                <tr>
                    <td style="padding-left: 20px;">
                        <strong>Household Business Loan</strong>
                    </td>
                </tr>
                <tr>
                    <td style="padding-left: 20px;">
                        <strong>Overdraft</strong>
                    </td>
                </tr>
                <tr>
                    <td style="padding-left: 20px;">
                        <strong>UPL</strong>
                    </td>
                </tr>
                <tr>
                    <td style="padding-left: 20px;">
                        <strong>Credit Card</strong>
                    </td>
                </tr>
                <tr>
                    <th style="text-align: center; padding: 18.5px 0; background: #D8E4BC; font-size: 11px;
                        border-top: 2px solid #999;">
                        Tiêu chí sản phẩm
                        <br />
                    </th>
                </tr>
                <tr>
                    <td style="background: #C4D79B">
                        <strong>Theo sản phẩm</strong>
                    </td>
                </tr>
                <tr>
                    <td style="background: #F2DCDB; border-bottom: 1px solid #333;">
                        <strong>All products</strong>
                    </td>
                </tr>
                <tr>
                    <td style="padding-left: 20px;">
                        <strong>Auto Loan</strong>
                    </td>
                </tr>
                <tr>
                    <td style="padding-left: 20px;">
                        <strong>Consumption Loan</strong>
                    </td>
                </tr>
                <tr>
                    <td style="padding-left: 20px;">
                        <strong>Home Loan</strong>
                    </td>
                </tr>
                <tr>
                    <td style="padding-left: 20px;">
                        <strong>Household Business Loan</strong>
                    </td>
                </tr>
                <tr>
                    <td style="padding-left: 20px;">
                        <strong>Overdraft</strong>
                    </td>
                </tr>
                <tr>
                    <td style="padding-left: 20px;">
                        <strong>UPL</strong>
                    </td>
                </tr>
                <tr>
                    <td style="padding-left: 20px;">
                        <strong>Credit Card</strong>
                    </td>
                </tr>
            </table>
            <table style="float: left;" class="tb1 by-product">
                <tr>
                    <th colspan="4">
                        Hồ sơ mở mới trong tuần
                    </th>
                </tr>
                <tr>
                    <th>
                        <%=w1 %>
                        <br />
                        <%=wc1 %>
                    </th>
                    <th>
                        <%=w2 %>
                        <br />
                        <%=wc2 %>
                    </th>
                    <th>
                        <%=w3 %>
                        <br />
                        <%=wc3 %>
                    </th>
                    <th>
                        <%=w4 %>
                        <br />
                        <%=wc4 %>
                    </th>
                </tr>
                <tr>
                    <td colspan="4" style="background: #C4D79B">
                        &nbsp;
                    </td>
                </tr>
                <tbody id="tbApplicationByProduct1">
                </tbody>
            </table>
            <table style="float: left;" class="tb1 by-product">
                <tr>
                    <th colspan="4">
                        Hồ sơ phê duyệt trong tuần
                    </th>
                </tr>
                <tr>
                    <th>
                        <%=w1 %>
                        <br />
                        <%=wc1 %>
                    </th>
                    <th>
                        <%=w2 %>
                        <br />
                        <%=wc2 %>
                    </th>
                    <th>
                        <%=w3 %>
                        <br />
                        <%=wc3 %>
                    </th>
                    <th>
                        <%=w4 %>
                        <br />
                        <%=wc4 %>
                    </th>
                </tr>
                <tr>
                    <td colspan="4" style="background: #C4D79B">
                        &nbsp;
                    </td>
                </tr>
                <tbody id="tbApplicationByProduct2">
                </tbody>
            </table>
            <table style="float: left;" class="tb1 by-product">
                <tr>
                    <th colspan="4">
                        Hồ sơ từ chối trong tuần
                    </th>
                </tr>
                <tr>
                    <th>
                        <%=w1 %>
                        <br />
                        <%=wc1 %>
                    </th>
                    <th>
                        <%=w2 %>
                        <br />
                        <%=wc2 %>
                    </th>
                    <th>
                        <%=w3 %>
                        <br />
                        <%=wc3 %>
                    </th>
                    <th>
                        <%=w4 %>
                        <br />
                        <%=wc4 %>
                    </th>
                </tr>
                <tr>
                    <td colspan="4" style="background: #C4D79B">
                        &nbsp;
                    </td>
                </tr>
                <tbody id="tbApplicationByProduct3">
                </tbody>
            </table>
            <table style="float: left;" class="tb1 by-product">
                <tr>
                    <th colspan="4">
                        Hồ sơ hủy trong tuần
                    </th>
                </tr>
                <tr>
                    <th>
                        <%=w1 %>
                        <br />
                        <%=wc1 %>
                    </th>
                    <th>
                        <%=w2 %>
                        <br />
                        <%=wc2 %>
                    </th>
                    <th>
                        <%=w3 %>
                        <br />
                        <%=wc3 %>
                    </th>
                    <th>
                        <%=w4 %>
                        <br />
                        <%=wc4 %>
                    </th>
                </tr>
                <tr>
                    <td colspan="4" style="background: #C4D79B">
                        &nbsp;
                    </td>
                </tr>
                <tbody id="tbApplicationByProduct4">
                </tbody>
            </table>
            <table style="float: left;" class="tb1 by-product">
                <tr>
                    <th colspan="4">
                        Tỷ lệ phê duyệt (%)
                    </th>
                </tr>
                <tr>
                    <th>
                        <%=w1 %>
                        <br />
                        <%=wc1 %>
                    </th>
                    <th>
                        <%=w2 %>
                        <br />
                        <%=wc2 %>
                    </th>
                    <th>
                        <%=w3 %>
                        <br />
                        <%=wc3 %>
                    </th>
                    <th>
                        <%=w4 %>
                        <br />
                        <%=wc4 %>
                    </th>
                </tr>
                <tr>
                    <td colspan="4" style="background: #C4D79B">
                        &nbsp;
                    </td>
                </tr>
                <tbody id="tbApplicationByProduct5">
                </tbody>
            </table>
            <table style="float: left;" class="tb1 by-product">
                <tr>
                    <th colspan="4">
                        Tỷ lệ hủy bỏ (%)
                    </th>
                </tr>
                <tr>
                    <th>
                        <%=w1 %>
                        <br />
                        <%=wc1 %>
                    </th>
                    <th>
                        <%=w2 %>
                        <br />
                        <%=wc2 %>
                    </th>
                    <th>
                        <%=w3 %>
                        <br />
                        <%=wc3 %>
                    </th>
                    <th>
                        <%=w4 %>
                        <br />
                        <%=wc4 %>
                    </th>
                </tr>
                <tr>
                    <td colspan="4" style="background: #C4D79B">
                        &nbsp;
                    </td>
                </tr>
                <tbody id="tbApplicationByProduct6">
                </tbody>
            </table>
            <div class="clear">
            </div>
        </div>
        <div class="box application" style="padding-bottom: 5px">
            <p style="background: #339933; margin-bottom: 5px;" class="title">
                SỐ LƯỢNG HỒ SƠ VÀ TỶ LỆ PHÊ DUYỆT (BAO GỒM HỒ SƠ TRÌNH LẠI) - THEO KÊNH BÁN</p>
            <table style="width: 180px; float: left;" class="channel">
                <tr>
                    <th style="text-align: center; padding: 18.5px 0; background: #D8E4BC; font-size: 11px;
                        border-top: 1px solid #999;">
                        Tiêu chí sản phẩm
                        <br />
                    </th>
                </tr>
                <tr>
                    <td style="background: #C4D79B;">
                        <strong>Theo kênh bán</strong>
                    </td>
                </tr>
                <tr>
                    <td style="background: #F2DCDB; border-bottom: 1px solid #333;">
                        <strong>All channels</strong>
                    </td>
                </tr>
                <tr>
                    <td style="background: #F2DCDB;">
                        <strong>Asset Partnership</strong>
                    </td>
                </tr>
                <tr>
                    <td style="padding-left: 20px;">
                        <strong>North</strong>
                    </td>
                </tr>
                <tr>
                    <td style="padding-left: 20px;">
                        <strong>South</strong>
                    </td>
                </tr>
                <tr>
                    <td style="background: #F2DCDB;">
                        <strong>Consumer Lending</strong>
                    </td>
                </tr>
                <tr>
                    <td style="padding-left: 20px;">
                        <strong>North</strong>
                    </td>
                </tr>
                <tr>
                    <td style="padding-left: 20px;">
                        <strong>South</strong>
                    </td>
                </tr>
                <tr>
                    <td style="background: #F2DCDB;">
                        <strong>Worksite Banking</strong>
                    </td>
                </tr>
                <tr>
                    <td style="padding-left: 20px;">
                        <strong>North</strong>
                    </td>
                </tr>
                <tr>
                    <td style="padding-left: 20px;">
                        <strong>South</strong>
                    </td>
                </tr>
                <tr>
                    <td style="background: #F2DCDB;">
                        <strong>Branch</strong>
                    </td>
                </tr>
                <tr>
                    <td style="padding-left: 20px;">
                        <strong>Region 01</strong>
                    </td>
                </tr>
                <tr>
                    <td style="padding-left: 20px;">
                        <strong>Region 02</strong>
                    </td>
                </tr>
                <tr>
                    <td style="padding-left: 20px;">
                        <strong>Region 03</strong>
                    </td>
                </tr>
                <tr>
                    <td style="padding-left: 20px;">
                        <strong>Region 04</strong>
                    </td>
                </tr>
                <tr>
                    <td style="padding-left: 20px;">
                        <strong>Region 05</strong>
                    </td>
                </tr>
                <tr>
                    <td style="padding-left: 20px;">
                        <strong>Region 06</strong>
                    </td>
                </tr>
                <tr>
                    <td style="padding-left: 20px;">
                        <strong>Region 07</strong>
                    </td>
                </tr>
                <tr>
                    <td style="padding-left: 20px;">
                        <strong>Region 08</strong>
                    </td>
                </tr>
                <tr>
                    <td style="padding-left: 20px;">
                        <strong>Region 09</strong>
                    </td>
                </tr>
                <tr>
                    <td style="padding-left: 20px;">
                        <strong>Region 10</strong>
                    </td>
                </tr>
                <tr>
                    <td style="background: #F2DCDB;">
                        <strong>Unallocated</strong>
                    </td>
                </tr>
                <tr>
                    <th style="text-align: center; padding: 18.5px 0; background: #D8E4BC; font-size: 11px;
                        border-top: 2px solid #999;">
                        Tiêu chí sản phẩm
                        <br />
                    </th>
                </tr>
                <tr>
                    <td style="background: #C4D79B;">
                        <strong>Theo kênh bán</strong>
                    </td>
                </tr>
                <tr>
                    <td style="background: #F2DCDB; border-bottom: 1px solid #333;">
                        <strong>All channels</strong>
                    </td>
                </tr>
                <tr>
                    <td style="background: #F2DCDB;">
                        <strong>Asset Partnership</strong>
                    </td>
                </tr>
                <tr>
                    <td style="padding-left: 20px;">
                        <strong>North</strong>
                    </td>
                </tr>
                <tr>
                    <td style="padding-left: 20px;">
                        <strong>South</strong>
                    </td>
                </tr>
                <tr>
                    <td style="background: #F2DCDB;">
                        <strong>Consumer Lending</strong>
                    </td>
                </tr>
                <tr>
                    <td style="padding-left: 20px;">
                        <strong>North</strong>
                    </td>
                </tr>
                <tr>
                    <td style="padding-left: 20px;">
                        <strong>South</strong>
                    </td>
                </tr>
                <tr>
                    <td style="background: #F2DCDB;">
                        <strong>Worksite Banking</strong>
                    </td>
                </tr>
                <tr>
                    <td style="padding-left: 20px;">
                        <strong>North</strong>
                    </td>
                </tr>
                <tr>
                    <td style="padding-left: 20px;">
                        <strong>South</strong>
                    </td>
                </tr>
                <tr>
                    <td style="background: #F2DCDB;">
                        <strong>Branch</strong>
                    </td>
                </tr>
                <tr>
                    <td style="padding-left: 20px;">
                        <strong>Region 01</strong>
                    </td>
                </tr>
                <tr>
                    <td style="padding-left: 20px;">
                        <strong>Region 02</strong>
                    </td>
                </tr>
                <tr>
                    <td style="padding-left: 20px;">
                        <strong>Region 03</strong>
                    </td>
                </tr>
                <tr>
                    <td style="padding-left: 20px;">
                        <strong>Region 04</strong>
                    </td>
                </tr>
                <tr>
                    <td style="padding-left: 20px;">
                        <strong>Region 05</strong>
                    </td>
                </tr>
                <tr>
                    <td style="padding-left: 20px;">
                        <strong>Region 06</strong>
                    </td>
                </tr>
                <tr>
                    <td style="padding-left: 20px;">
                        <strong>Region 07</strong>
                    </td>
                </tr>
                <tr>
                    <td style="padding-left: 20px;">
                        <strong>Region 08</strong>
                    </td>
                </tr>
                <tr>
                    <td style="padding-left: 20px;">
                        <strong>Region 09</strong>
                    </td>
                </tr>
                <tr>
                    <td style="padding-left: 20px;">
                        <strong>Region 10</strong>
                    </td>
                </tr>
                <tr>
                    <td style="background: #F2DCDB;">
                        <strong>Unallocated</strong>
                    </td>
                </tr>
            </table>
            <table style="float: left;" class="tb1 by-channel">
                <tr>
                    <th colspan="4">
                        Hồ sơ mở mới trong tuần
                    </th>
                </tr>
                <tr>
                    <th>
                        <%=w1 %>
                        <br />
                        <%=wc1 %>
                    </th>
                    <th>
                        <%=w2 %>
                        <br />
                        <%=wc2 %>
                    </th>
                    <th>
                        <%=w3 %>
                        <br />
                        <%=wc3 %>
                    </th>
                    <th>
                        <%=w4 %>
                        <br />
                        <%=wc4 %>
                    </th>
                </tr>
                <tr>
                    <td colspan="4" style="background: #C4D79B">
                        &nbsp;
                    </td>
                </tr>
                <tbody id="tbApplication1">
                </tbody>
            </table>
            <table style="float: left;" class="tb1 by-channel">
                <tr>
                    <th colspan="4">
                        Hồ sơ phê duyệt trong tuần
                    </th>
                </tr>
                <tr>
                    <th>
                        <%=w1 %>
                        <br />
                        <%=wc1 %>
                    </th>
                    <th>
                        <%=w2 %>
                        <br />
                        <%=wc2 %>
                    </th>
                    <th>
                        <%=w3 %>
                        <br />
                        <%=wc3 %>
                    </th>
                    <th>
                        <%=w4 %>
                        <br />
                        <%=wc4 %>
                    </th>
                </tr>
                <tr>
                    <td colspan="4" style="background: #C4D79B">
                        &nbsp;
                    </td>
                </tr>
                <tbody id="tbApplication2">
                </tbody>
            </table>
            <table style="float: left;" class="tb1 by-channel">
                <tr>
                    <th colspan="4">
                        Hồ sơ từ chối trong tuần
                    </th>
                </tr>
                <tr>
                    <th>
                        <%=w1 %>
                        <br />
                        <%=wc1 %>
                    </th>
                    <th>
                        <%=w2 %>
                        <br />
                        <%=wc2 %>
                    </th>
                    <th>
                        <%=w3 %>
                        <br />
                        <%=wc3 %>
                    </th>
                    <th>
                        <%=w4 %>
                        <br />
                        <%=wc4 %>
                    </th>
                </tr>
                <tr>
                    <td colspan="4" style="background: #C4D79B">
                        &nbsp;
                    </td>
                </tr>
                <tbody id="tbApplication3">
                </tbody>
            </table>
            <table style="float: left;" class="tb1 by-channel">
                <tr>
                    <th colspan="4">
                        Hồ sơ hủy bỏ trong tuần
                    </th>
                </tr>
                <tr>
                    <th>
                        <%=w1 %>
                        <br />
                        <%=wc1 %>
                    </th>
                    <th>
                        <%=w2 %>
                        <br />
                        <%=wc2 %>
                    </th>
                    <th>
                        <%=w3 %>
                        <br />
                        <%=wc3 %>
                    </th>
                    <th>
                        <%=w4 %>
                        <br />
                        <%=wc4 %>
                    </th>
                </tr>
                <tr>
                    <td colspan="4" style="background: #C4D79B">
                        &nbsp;
                    </td>
                </tr>
                <tbody id="tbApplication4">
                </tbody>
            </table>
            <table style="float: left;" class="tb1 by-channel">
                <tr>
                    <th colspan="4">
                        Tỷ lệ phê duyệt (%)
                    </th>
                </tr>
                <tr>
                    <th>
                        <%=w1 %>
                        <br />
                        <%=wc1 %>
                    </th>
                    <th>
                        <%=w2 %>
                        <br />
                        <%=wc2 %>
                    </th>
                    <th>
                        <%=w3 %>
                        <br />
                        <%=wc3 %>
                    </th>
                    <th>
                        <%=w4 %>
                        <br />
                        <%=wc4 %>
                    </th>
                </tr>
                <tr>
                    <td colspan="4" style="background: #C4D79B">
                        &nbsp;
                    </td>
                </tr>
                <tbody id="tbApplication5">
                </tbody>
            </table>
            <table style="float: left;" class="tb1 by-channel">
                <tr>
                    <th colspan="4">
                        Tỷ lệ hủy bỏ (%)
                    </th>
                </tr>
                <tr>
                    <th>
                        <%=w1 %>
                        <br />
                        <%=wc1 %>
                    </th>
                    <th>
                        <%=w2 %>
                        <br />
                        <%=wc2 %>
                    </th>
                    <th>
                        <%=w3 %>
                        <br />
                        <%=wc3 %>
                    </th>
                    <th>
                        <%=w4 %>
                        <br />
                        <%=wc4 %>
                    </th>
                </tr>
                <tr>
                    <td colspan="4" style="background: #C4D79B">
                        &nbsp;
                    </td>
                </tr>
                <tbody id="tbApplication6">
                </tbody>
            </table>
        </div>
        <div class="box application">
            <p style="background: #339933; margin-bottom: 5px;" class="title">
                SỐ LƯỢNG HỒ SƠ VÀ TỶ LỆ PHÊ DUYỆT (BAO GỒM HỒ SƠ TRÌNH LẠI) - BIỂU ĐỒ</p>
            <div class="application-chart">
                <div class="app-chart" style="float: left">
                    <dxchartsui:WebChartControl ID="chartByProduct1" Width="580px" runat="server">
                    </dxchartsui:WebChartControl>
                </div>
                <div class="app-chart" style="float: right">
                    <dxchartsui:WebChartControl ID="chartByProduct2" Width="580px" runat="server">
                    </dxchartsui:WebChartControl>
                </div>
                <div class="app-chart" style="float: left">
                    <dxchartsui:WebChartControl ID="chartByProduct3" Width="580px" runat="server">
                    </dxchartsui:WebChartControl>
                </div>
                <div class="app-chart" style="float: right">
                    <dxchartsui:WebChartControl ID="chartByProduct4" Width="580px" runat="server">
                    </dxchartsui:WebChartControl>
                </div>
                <div class="app-chart" style="float: left">
                    <dxchartsui:WebChartControl ID="chartByProduct5" Width="580px" runat="server">
                    </dxchartsui:WebChartControl>
                </div>
                <div class="app-chart" style="float: right">
                    <dxchartsui:WebChartControl ID="chartByProduct6" Width="580px" runat="server">
                    </dxchartsui:WebChartControl>
                </div>
                <div class="clear">
                </div>
            </div>
            <div class="application-chart">
                <div class="app-chart" style="float: left">
                    <dxchartsui:WebChartControl ID="chart1" Width="580px" runat="server">
                    </dxchartsui:WebChartControl>
                </div>
                <div class="app-chart" style="float: right">
                    <dxchartsui:WebChartControl ID="chart2" Width="580px" runat="server">
                    </dxchartsui:WebChartControl>
                </div>
                <div class="app-chart" style="float: left">
                    <dxchartsui:WebChartControl ID="chart3" Width="580px" runat="server">
                    </dxchartsui:WebChartControl>
                </div>
                <div class="app-chart" style="float: right">
                    <dxchartsui:WebChartControl ID="chart4" Width="580px" runat="server">
                    </dxchartsui:WebChartControl>
                </div>
                <div class="app-chart" style="float: left">
                    <dxchartsui:WebChartControl ID="chart5" Width="580px" runat="server">
                    </dxchartsui:WebChartControl>
                </div>
                <div class="app-chart" style="float: right">
                    <dxchartsui:WebChartControl ID="chart6" Width="580px" runat="server">
                    </dxchartsui:WebChartControl>
                </div>
                <div class="clear">
                </div>
            </div>
        </div>
        <div class="app-resubmit" style="display: none">
            <div class="box resubmit" style="padding-bottom: 5px">
                <p style="background: #339933; margin-bottom: 5px;" class="title">
                    SỐ LƯỢNG HỒ SƠ VÀ TỶ LỆ PHÊ DUYỆT (KHÔNG BAO GỒM HỒ SƠ TRÌNH LẠI) - THEO SẢN PHẨM</p>
                <table style="width: 180px; float: left;" class="channel">
                    <tr>
                        <th style="text-align: center; padding: 18.5px 0; background: #D8E4BC; font-size: 11px;">
                            Tiêu chí sản phẩm
                            <br />
                        </th>
                    </tr>
                    <tr>
                        <td style="background: #C4D79B">
                            <strong>Theo sản phẩm</strong>
                        </td>
                    </tr>
                    <tr>
                    <td style="background: #F2DCDB; border-bottom: 1px solid #333;">
                        <strong>All products</strong>
                    </td>
                </tr>
                    <tr>
                        <td style="padding-left: 20px;">
                            <strong>Auto Loan</strong>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding-left: 20px;">
                            <strong>Consumption Loan</strong>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding-left: 20px;">
                            <strong>Home Loan</strong>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding-left: 20px;">
                            <strong>Household Business Loan</strong>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding-left: 20px;">
                            <strong>Overdraft</strong>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding-left: 20px;">
                            <strong>UPL</strong>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding-left: 20px;">
                            <strong>Credit Card</strong>
                        </td>
                    </tr>
                    <tr>
                        <th style="text-align: center; padding: 18.5px 0; background: #D8E4BC; font-size: 11px;
                            border-top: 2px solid #999;">
                            Tiêu chí sản phẩm
                            <br />
                        </th>
                    </tr>
                    <tr>
                        <td style="background: #C4D79B">
                            <strong>Theo sản phẩm</strong>
                        </td>
                    </tr>
                    <tr>
                    <td style="background: #F2DCDB; border-bottom: 1px solid #333;">
                        <strong>All products</strong>
                    </td>
                </tr>
                    <tr>
                        <td style="padding-left: 20px;">
                            <strong>Auto Loan</strong>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding-left: 20px;">
                            <strong>Consumption Loan</strong>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding-left: 20px;">
                            <strong>Home Loan</strong>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding-left: 20px;">
                            <strong>Household Business Loan</strong>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding-left: 20px;">
                            <strong>Overdraft</strong>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding-left: 20px;">
                            <strong>UPL</strong>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding-left: 20px;">
                            <strong>Credit Card</strong>
                        </td>
                    </tr>
                </table>
                <table style="float: left;" class="tb1 by-product">
                    <tr>
                        <th colspan="4">
                            Hồ sơ mở mới trong tuần
                        </th>
                    </tr>
                    <tr>
                        <th>
                            <%=w1 %>
                            <br />
                            <%=wc1 %>
                        </th>
                        <th>
                            <%=w2 %>
                            <br />
                            <%=wc2 %>
                        </th>
                        <th>
                            <%=w3 %>
                            <br />
                            <%=wc3 %>
                        </th>
                        <th>
                            <%=w4 %>
                            <br />
                            <%=wc4 %>
                        </th>
                    </tr>
                    <tr>
                        <td colspan="4" style="background: #C4D79B">
                            &nbsp;
                        </td>
                    </tr>
                    <tbody id="tbApplicationByProductErs1">
                    </tbody>
                </table>
                <table style="float: left;" class="tb1 by-product">
                    <tr>
                        <th colspan="4">
                            Hồ sơ phê duyệt trong tuần
                        </th>
                    </tr>
                    <tr>
                        <th>
                            <%=w1 %>
                            <br />
                            <%=wc1 %>
                        </th>
                        <th>
                            <%=w2 %>
                            <br />
                            <%=wc2 %>
                        </th>
                        <th>
                            <%=w3 %>
                            <br />
                            <%=wc3 %>
                        </th>
                        <th>
                            <%=w4 %>
                            <br />
                            <%=wc4 %>
                        </th>
                    </tr>
                    <tr>
                        <td colspan="4" style="background: #C4D79B">
                            &nbsp;
                        </td>
                    </tr>
                    <tbody id="tbApplicationByProductErs2">
                    </tbody>
                </table>
                <table style="float: left;" class="tb1 by-product">
                    <tr>
                        <th colspan="4">
                            Hồ sơ từ chối trong tuần
                        </th>
                    </tr>
                    <tr>
                        <th>
                            <%=w1 %>
                            <br />
                            <%=wc1 %>
                        </th>
                        <th>
                            <%=w2 %>
                            <br />
                            <%=wc2 %>
                        </th>
                        <th>
                            <%=w3 %>
                            <br />
                            <%=wc3 %>
                        </th>
                        <th>
                            <%=w4 %>
                            <br />
                            <%=wc4 %>
                        </th>
                    </tr>
                    <tr>
                        <td colspan="4" style="background: #C4D79B">
                            &nbsp;
                        </td>
                    </tr>
                    <tbody id="tbApplicationByProductErs3">
                    </tbody>
                </table>
                <table style="float: left;" class="tb1 by-product">
                    <tr>
                        <th colspan="4">
                            Hồ sơ hủy trong tuần
                        </th>
                    </tr>
                    <tr>
                        <th>
                            <%=w1 %>
                            <br />
                            <%=wc1 %>
                        </th>
                        <th>
                            <%=w2 %>
                            <br />
                            <%=wc2 %>
                        </th>
                        <th>
                            <%=w3 %>
                            <br />
                            <%=wc3 %>
                        </th>
                        <th>
                            <%=w4 %>
                            <br />
                            <%=wc4 %>
                        </th>
                    </tr>
                    <tr>
                        <td colspan="4" style="background: #C4D79B">
                            &nbsp;
                        </td>
                    </tr>
                    <tbody id="tbApplicationByProductErs4">
                    </tbody>
                </table>
                <table style="float: left;" class="tb1 by-product">
                    <tr>
                        <th colspan="4">
                            Tỷ lệ phê duyệt (%)
                        </th>
                    </tr>
                    <tr>
                        <th>
                            <%=w1 %>
                            <br />
                            <%=wc1 %>
                        </th>
                        <th>
                            <%=w2 %>
                            <br />
                            <%=wc2 %>
                        </th>
                        <th>
                            <%=w3 %>
                            <br />
                            <%=wc3 %>
                        </th>
                        <th>
                            <%=w4 %>
                            <br />
                            <%=wc4 %>
                        </th>
                    </tr>
                    <tr>
                        <td colspan="4" style="background: #C4D79B">
                            &nbsp;
                        </td>
                    </tr>
                    <tbody id="tbApplicationByProductErs5">
                    </tbody>
                </table>
                <table style="float: left;" class="tb1 by-product">
                    <tr>
                        <th colspan="4">
                            Tỷ lệ hủy bỏ (%)
                        </th>
                    </tr>
                    <tr>
                        <th>
                            <%=w1 %>
                            <br />
                            <%=wc1 %>
                        </th>
                        <th>
                            <%=w2 %>
                            <br />
                            <%=wc2 %>
                        </th>
                        <th>
                            <%=w3 %>
                            <br />
                            <%=wc3 %>
                        </th>
                        <th>
                            <%=w4 %>
                            <br />
                            <%=wc4 %>
                        </th>
                    </tr>
                    <tr>
                        <td colspan="4" style="background: #C4D79B">
                            &nbsp;
                        </td>
                    </tr>
                    <tbody id="tbApplicationByProductErs6">
                    </tbody>
                </table>
                <div class="clear">
                </div>
            </div>
            <div class="box resubmit" style="padding-bottom: 5px">
                <p style="background: #339933; margin-bottom: 5px;" class="title">
                    SỐ LƯỢNG HỒ SƠ VÀ TỶ LỆ PHÊ DUYỆT (KHÔNG BAO GỒM HỒ SƠ TRÌNH LẠI) - THEO KÊNH BÁN</p>
                <table style="width: 180px; float: left;" class="channel">
                    <tr>
                        <th style="text-align: center; padding: 18.5px 0; background: #D8E4BC; font-size: 11px;
                            border-top: 1px solid #999;">
                            Tiêu chí sản phẩm
                            <br />
                        </th>
                    </tr>
                    <tr>
                        <td style="background: #C4D79B;">
                            <strong>Theo kênh bán</strong>
                        </td>
                    </tr>
                    <tr>
                    <td style="background: #F2DCDB; border-bottom: 1px solid #333;">
                        <strong>All channels</strong>
                    </td>
                </tr>
                    <tr>
                        <td style="background: #F2DCDB;">
                            <strong>Asset Partnership</strong>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding-left: 20px;">
                            <strong>North</strong>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding-left: 20px;">
                            <strong>South</strong>
                        </td>
                    </tr>
                    <tr>
                        <td style="background: #F2DCDB;">
                            <strong>Consumer Lending</strong>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding-left: 20px;">
                            <strong>North</strong>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding-left: 20px;">
                            <strong>South</strong>
                        </td>
                    </tr>
                    <tr>
                        <td style="background: #F2DCDB;">
                            <strong>Worksite Banking</strong>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding-left: 20px;">
                            <strong>North</strong>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding-left: 20px;">
                            <strong>South</strong>
                        </td>
                    </tr>
                    <tr>
                        <td style="background: #F2DCDB;">
                            <strong>Branch</strong>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding-left: 20px;">
                            <strong>Region 01</strong>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding-left: 20px;">
                            <strong>Region 02</strong>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding-left: 20px;">
                            <strong>Region 03</strong>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding-left: 20px;">
                            <strong>Region 04</strong>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding-left: 20px;">
                            <strong>Region 05</strong>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding-left: 20px;">
                            <strong>Region 06</strong>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding-left: 20px;">
                            <strong>Region 07</strong>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding-left: 20px;">
                            <strong>Region 08</strong>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding-left: 20px;">
                            <strong>Region 09</strong>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding-left: 20px;">
                            <strong>Region 10</strong>
                        </td>
                    </tr>
                    <tr>
                        <td style="background: #F2DCDB;">
                            <strong>Unallocated</strong>
                        </td>
                    </tr>
                    <tr>
                        <th style="text-align: center; padding: 18.5px 0; background: #D8E4BC; font-size: 11px;
                            border-top: 2px solid #999;">
                            Tiêu chí sản phẩm
                            <br />
                        </th>
                    </tr>
                    <tr>
                        <td style="background: #C4D79B;">
                            <strong>Theo kênh bán</strong>
                        </td>
                    </tr>
                    <tr>
                    <td style="background: #F2DCDB; border-bottom: 1px solid #333;">
                        <strong>All channels</strong>
                    </td>
                </tr>
                    <tr>
                        <td style="background: #F2DCDB;">
                            <strong>Asset Partnership</strong>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding-left: 20px;">
                            <strong>North</strong>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding-left: 20px;">
                            <strong>South</strong>
                        </td>
                    </tr>
                    <tr>
                        <td style="background: #F2DCDB;">
                            <strong>Consumer Lending</strong>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding-left: 20px;">
                            <strong>North</strong>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding-left: 20px;">
                            <strong>South</strong>
                        </td>
                    </tr>
                    <tr>
                        <td style="background: #F2DCDB;">
                            <strong>Worksite Banking</strong>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding-left: 20px;">
                            <strong>North</strong>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding-left: 20px;">
                            <strong>South</strong>
                        </td>
                    </tr>
                    <tr>
                        <td style="background: #F2DCDB;">
                            <strong>Branch</strong>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding-left: 20px;">
                            <strong>Region 01</strong>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding-left: 20px;">
                            <strong>Region 02</strong>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding-left: 20px;">
                            <strong>Region 03</strong>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding-left: 20px;">
                            <strong>Region 04</strong>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding-left: 20px;">
                            <strong>Region 05</strong>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding-left: 20px;">
                            <strong>Region 06</strong>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding-left: 20px;">
                            <strong>Region 07</strong>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding-left: 20px;">
                            <strong>Region 08</strong>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding-left: 20px;">
                            <strong>Region 09</strong>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding-left: 20px;">
                            <strong>Region 10</strong>
                        </td>
                    </tr>
                    <tr>
                        <td style="background: #F2DCDB;">
                            <strong>Unallocated</strong>
                        </td>
                    </tr>
                </table>
                <table style="float: left;" class="tb1 by-channel">
                    <tr>
                        <th colspan="4">
                            Hồ sơ mở mới trong tuần
                        </th>
                    </tr>
                    <tr>
                        <th>
                            <%=w1 %>
                            <br />
                            <%=wc1 %>
                        </th>
                        <th>
                            <%=w2 %>
                            <br />
                            <%=wc2 %>
                        </th>
                        <th>
                            <%=w3 %>
                            <br />
                            <%=wc3 %>
                        </th>
                        <th>
                            <%=w4 %>
                            <br />
                            <%=wc4 %>
                        </th>
                    </tr>
                    <tr>
                        <td colspan="4" style="background: #C4D79B">
                            &nbsp;
                        </td>
                    </tr>
                    <tbody id="tbApplicationErs1">
                    </tbody>
                </table>
                <table style="float: left;" class="tb1 by-channel">
                    <tr>
                        <th colspan="4">
                            Hồ sơ phê duyệt trong tuần
                        </th>
                    </tr>
                    <tr>
                        <th>
                            <%=w1 %>
                            <br />
                            <%=wc1 %>
                        </th>
                        <th>
                            <%=w2 %>
                            <br />
                            <%=wc2 %>
                        </th>
                        <th>
                            <%=w3 %>
                            <br />
                            <%=wc3 %>
                        </th>
                        <th>
                            <%=w4 %>
                            <br />
                            <%=wc4 %>
                        </th>
                    </tr>
                    <tr>
                        <td colspan="4" style="background: #C4D79B">
                            &nbsp;
                        </td>
                    </tr>
                    <tbody id="tbApplicationErs2">
                    </tbody>
                </table>
                <table style="float: left;" class="tb1 by-channel">
                    <tr>
                        <th colspan="4">
                            Hồ sơ từ chối trong tuần
                        </th>
                    </tr>
                    <tr>
                        <th>
                            <%=w1 %>
                            <br />
                            <%=wc1 %>
                        </th>
                        <th>
                            <%=w2 %>
                            <br />
                            <%=wc2 %>
                        </th>
                        <th>
                            <%=w3 %>
                            <br />
                            <%=wc3 %>
                        </th>
                        <th>
                            <%=w4 %>
                            <br />
                            <%=wc4 %>
                        </th>
                    </tr>
                    <tr>
                        <td colspan="4" style="background: #C4D79B">
                            &nbsp;
                        </td>
                    </tr>
                    <tbody id="tbApplicationErs3">
                    </tbody>
                </table>
                <table style="float: left;" class="tb1 by-channel">
                    <tr>
                        <th colspan="4">
                            Hồ sơ hủy bỏ trong tuần
                        </th>
                    </tr>
                    <tr>
                        <th>
                            <%=w1 %>
                            <br />
                            <%=wc1 %>
                        </th>
                        <th>
                            <%=w2 %>
                            <br />
                            <%=wc2 %>
                        </th>
                        <th>
                            <%=w3 %>
                            <br />
                            <%=wc3 %>
                        </th>
                        <th>
                            <%=w4 %>
                            <br />
                            <%=wc4 %>
                        </th>
                    </tr>
                    <tr>
                        <td colspan="4" style="background: #C4D79B">
                            &nbsp;
                        </td>
                    </tr>
                    <tbody id="tbApplicationErs4">
                    </tbody>
                </table>
                <table style="float: left;" class="tb1 by-channel">
                    <tr>
                        <th colspan="4">
                            Tỷ lệ phê duyệt (%)
                        </th>
                    </tr>
                    <tr>
                        <th>
                            <%=w1 %>
                            <br />
                            <%=wc1 %>
                        </th>
                        <th>
                            <%=w2 %>
                            <br />
                            <%=wc2 %>
                        </th>
                        <th>
                            <%=w3 %>
                            <br />
                            <%=wc3 %>
                        </th>
                        <th>
                            <%=w4 %>
                            <br />
                            <%=wc4 %>
                        </th>
                    </tr>
                    <tr>
                        <td colspan="4" style="background: #C4D79B">
                            &nbsp;
                        </td>
                    </tr>
                    <tbody id="tbApplicationErs5">
                    </tbody>
                </table>
                <table style="float: left;" class="tb1 by-channel">
                    <tr>
                        <th colspan="4">
                            Tỷ lệ hủy bỏ (%)
                        </th>
                    </tr>
                    <tr>
                        <th>
                            <%=w1 %>
                            <br />
                            <%=wc1 %>
                        </th>
                        <th>
                            <%=w2 %>
                            <br />
                            <%=wc2 %>
                        </th>
                        <th>
                            <%=w3 %>
                            <br />
                            <%=wc3 %>
                        </th>
                        <th>
                            <%=w4 %>
                            <br />
                            <%=wc4 %>
                        </th>
                    </tr>
                    <tr>
                        <td colspan="4" style="background: #C4D79B">
                            &nbsp;
                        </td>
                    </tr>
                    <tbody id="tbApplicationErs6">
                    </tbody>
                </table>
                <div class="clear">
                </div>
            </div>
            <div class="box resubmit">
                <p style="background: #339933; margin-bottom: 5px;" class="title">
                    SỐ LƯỢNG HỒ SƠ VÀ TỶ LỆ PHÊ DUYỆT (KHÔNG BAO GỒM HỒ SƠ TRÌNH LẠI) - BIỂU ĐỒ</p>
                <div class="application-chart">
                    <div class="app-chart" style="float: left">
                        <dxchartsui:WebChartControl ID="chartByProductErs1" Width="580px" runat="server">
                        </dxchartsui:WebChartControl>
                    </div>
                    <div class="app-chart" style="float: right">
                        <dxchartsui:WebChartControl ID="chartByProductErs2" Width="580px" runat="server">
                        </dxchartsui:WebChartControl>
                    </div>
                    <div class="app-chart" style="float: left">
                        <dxchartsui:WebChartControl ID="chartByProductErs3" Width="580px" runat="server">
                        </dxchartsui:WebChartControl>
                    </div>
                    <div class="app-chart" style="float: right">
                        <dxchartsui:WebChartControl ID="chartByProductErs4" Width="580px" runat="server">
                        </dxchartsui:WebChartControl>
                    </div>
                    <div class="app-chart" style="float: left">
                        <dxchartsui:WebChartControl ID="chartByProductErs5" Width="580px" runat="server">
                        </dxchartsui:WebChartControl>
                    </div>
                    <div class="app-chart" style="float: right">
                        <dxchartsui:WebChartControl ID="chartByProductErs6" Width="580px" runat="server">
                        </dxchartsui:WebChartControl>
                    </div>
                    <div class="clear">
                    </div>
                </div>
                <div class="application-chart">
                    <div class="app-chart" style="float: left">
                        <dxchartsui:WebChartControl ID="chartErs1" Width="580px" runat="server">
                        </dxchartsui:WebChartControl>
                    </div>
                    <div class="app-chart" style="float: right">
                        <dxchartsui:WebChartControl ID="chartErs2" Width="580px" runat="server">
                        </dxchartsui:WebChartControl>
                    </div>
                    <div class="app-chart" style="float: left">
                        <dxchartsui:WebChartControl ID="chartErs3" Width="580px" runat="server">
                        </dxchartsui:WebChartControl>
                    </div>
                    <div class="app-chart" style="float: right">
                        <dxchartsui:WebChartControl ID="chartErs4" Width="580px" runat="server">
                        </dxchartsui:WebChartControl>
                    </div>
                    <div class="app-chart" style="float: left">
                        <dxchartsui:WebChartControl ID="chartErs5" Width="580px" runat="server">
                        </dxchartsui:WebChartControl>
                    </div>
                    <div class="app-chart" style="float: right">
                        <dxchartsui:WebChartControl ID="chartErs6" Width="580px" runat="server">
                        </dxchartsui:WebChartControl>
                    </div>
                    <div class="clear">
                    </div>
                </div>
            </div>
        </div>
        <div class="tat-turn" style="display: none">
            <div class="box">
                <p style="background: #339933" class="title">
                    TỔNG THỜI GIAN GIẢI NGÂN HỒ SƠ (TTD)</p>
            </div>
            <div class="notes">
                <table>
                    <tr>
                        <td colspan="2" style="font-weight: bold; text-decoration: underline;">
                            Ghi chú:
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Bước 1-Thời gian nhập liệu hồ sơ tại bước QDE (tại chi nhánh)
                        </td>
                        <td>
                            Bước 6-Thời gian tại bước thực địa
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Bước 2-Thời gian bổ sung các hồ sơ thiếu tại bước QDE (tại chi nhánh)
                        </td>
                        <td>
                            Bước 7-Thời gian chờ KH xác nhận nghị quyết phê duyệt (tại chi nhánh/khách hàng)
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Bước 3-Thời gian kiểm soát nhập liệu và nhập liệu tại bước DDE (tại CPC-UW)
                        </td>
                        <td>
                            Bước 8-Thời gian soạn thảo hồ sơ (tại CPC-CA)
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Bước 4-Thời gian thầm định và phê duyệt hồ sơ (tại CPC UW) - loại trừ thời gian
                            gọi điện và thực địa KH
                        </td>
                        <td>
                            Bước 9-Thời gian công chứng/Đăng ký giao dịch TSĐB/Bổ sung các hồ sơ cần thiết
                            cho việc soạn thảo và giải ngân (tại CPC-CA, chi nhánh)
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Bước 5-Thời gian tại bước gọi điện cho khách hàng
                        </td>
                        <td>
                            Bước 10-Thời gian giải ngân hồ sơ (tại CPC-CA)
                        </td>
                    </tr>
                </table>
            </div>
            <div class="box-child" id="box-child-8">
                <p class="title">
                    Overall (excluded credit card)</p>
                <div class="box-child-content">
                    <div style="width: 350px; float: left; margin: 0px;">
                        <dxchartsui:WebChartControl ID="chartProduct8" Width="350px" runat="server">
                        </dxchartsui:WebChartControl>
                    </div>
                    <div class="stage" style="width: 550px; float: left; margin: 0px;">
                        <dxchartsui:WebChartControl ID="chartStage8" Width="550px" runat="server" OnCustomDrawSeries="chartStage8_CustomDrawSeries">
                        </dxchartsui:WebChartControl>
                    </div>
                    <div class="comment">
                        <h5>
                            Nhận xét
                            <%=wc4 %>
                            (<%=w4 %>)</h5>
                        
                        <p>
                            Tổng thời gian giải ngân là
                            <%=c8.Split('|')[0] %>
                            ngày, trong đó:</p>
                        <p>
                            &nbsp;&nbsp;- Tổng thời gian xác nhận nghị quyết và chuẩn bị các giấy tờ cần thiết sau phê duyệt chiếm
                            <%=c8.Split('|')[1] %>%</p>
                        <p>
                            &nbsp;&nbsp;- Tổng thời gian từ khi hồ sơ được mở mới đến khi
                            
                            được phê duyệt là
                            <%=c8.Split('|')[2] %>
                            ngày</p>
                        <p>
                            So sánh với tháng trước đó:</p>
                        <p>
                            &nbsp;&nbsp;- Tổng thời gian giải ngân
                            <% if (Convert.ToInt32(c8.Split('|')[3]) < 0)
                               {
                                   Response.Write("giảm " + -Convert.ToInt32(c8.Split('|')[3]));
                               }
                               else Response.Write("tăng " + c8.Split('|')[3]); %>%
                        </p>
                        <p>
                            &nbsp;&nbsp;- Tổng thời gian xác nhận nghị quyết và chuẩn bị các giấy tờ cần thiết sau phê duyệt
                            <% if (Convert.ToInt32(c8.Split('|')[4]) < 0)
                               {
                                   Response.Write("giảm " + -Convert.ToInt32(c8.Split('|')[4]));
                               }
                               else Response.Write("tăng " + c8.Split('|')[4]); %>%
                        </p>
                    </div>
                    <div class="clear">
                    </div>
                </div>
            </div>
            <div class="box-child" id="box-child-1">
                <p class="title">
                    Auto Loan</p>
                <div class="box-child-content">
                    <div style="width: 350px; float: left; margin: 0px;">
                        <dxchartsui:WebChartControl ID="chartProduct1" Width="350px" runat="server">
                        </dxchartsui:WebChartControl>
                    </div>
                    <div class="stage" style="width: 550px; float: left; margin: 0px;">
                        <dxchartsui:WebChartControl ID="chartStage1" Width="550px" runat="server" OnCustomDrawSeries="chartStage1_CustomDrawSeries">
                        </dxchartsui:WebChartControl>
                    </div>
                    <div class="comment">
                        <h5>
                            Nhận xét
                            <%=wc4 %>
                            (<%=w4 %>)</h5>
                        
                        <p>
                            Tổng thời gian giải ngân là
                            <%=c1.Split('|')[0] %>
                            ngày, trong đó:</p>
                        <p>
                            &nbsp;&nbsp;- Tổng thời gian xác nhận nghị quyết và chuẩn bị các giấy tờ cần thiết sau phê duyệt chiếm
                            <%=c1.Split('|')[1] %>%</p>
                        <p>
                            &nbsp;&nbsp;- Tổng thời gian từ khi hồ sơ được mở mới đến khi
                            
                            được phê duyệt là
                            <%=c1.Split('|')[2] %>
                            ngày</p>
                        <p>
                            So sánh với tháng trước đó:</p>
                        <p>
                            &nbsp;&nbsp;- Tổng thời gian giải ngân
                            <% if (Convert.ToInt32(c1.Split('|')[3]) < 0)
                               {
                                   Response.Write("giảm " + -Convert.ToInt32(c1.Split('|')[3]));
                               }
                               else Response.Write("tăng " + c1.Split('|')[3]); %>%
                        </p>
                        <p>
                            &nbsp;&nbsp;- Tổng thời gian xác nhận nghị quyết và chuẩn bị các giấy tờ cần thiết sau phê duyệt
                            <% if (Convert.ToInt32(c1.Split('|')[4]) < 0)
                               {
                                   Response.Write("giảm " + -Convert.ToInt32(c1.Split('|')[4]));
                               }
                               else Response.Write("tăng " + c1.Split('|')[4]); %>%</p>
                    </div>
                    <div class="clear">
                    </div>
                </div>
            </div>
            <div class="box-child" id="box-child-2">
                <p class="title">
                    Consumption Loan</p>
                <div class="box-child-content">
                    <div style="width: 350px; float: left; margin: 0px;">
                        <dxchartsui:WebChartControl ID="chartProduct2" Width="350px" runat="server">
                        </dxchartsui:WebChartControl>
                    </div>
                    <div class="stage" style="width: 550px; float: left; margin: 0px;">
                        <dxchartsui:WebChartControl ID="chartStage2" Width="550px" runat="server" OnCustomDrawSeries="chartStage2_CustomDrawSeries">
                        </dxchartsui:WebChartControl>
                    </div>
                    <div class="comment">
                        <h5>
                            Nhận xét
                            <%=wc4 %>
                            (<%=w4 %>)</h5>
                        
                        <p>
                            Tổng thời gian giải ngân là
                            <%=c2.Split('|')[0] %>
                            ngày, trong đó:</p>
                        <p>
                            &nbsp;&nbsp;- Tổng thời gian xác nhận nghị quyết và chuẩn bị các giấy tờ cần thiết sau phê duyệt chiếm
                            <%=c2.Split('|')[1] %>%</p>
                        <p>
                            &nbsp;&nbsp;- Tổng thời gian từ khi hồ sơ được mở mới đến khi
                            
                            được phê duyệt là
                            <%=c2.Split('|')[2] %>
                            ngày</p>
                        <p>
                            So sánh với tháng trước đó:</p>
                        <p>
                            &nbsp;&nbsp;- Tổng thời gian giải ngân
                            <% if (Convert.ToInt32(c2.Split('|')[3]) < 0)
                               {
                                   Response.Write("giảm " + -Convert.ToInt32(c2.Split('|')[3]));
                               }
                               else Response.Write("tăng " + c2.Split('|')[3]); %>%
                        </p>
                        <p>
                            &nbsp;&nbsp;- Tổng thời gian xác nhận nghị quyết và chuẩn bị các giấy tờ cần thiết sau phê duyệt
                            <% if (Convert.ToInt32(c2.Split('|')[4]) < 0)
                               {
                                   Response.Write("giảm " + -Convert.ToInt32(c2.Split('|')[4]));
                               }
                               else Response.Write("tăng " + c2.Split('|')[4]); %>%</p>
                    </div>
                    <div class="clear">
                    </div>
                </div>
            </div>
            <div class="box-child" id="box-child-3">
                <p class="title">
                    Home Loan</p>
                <div class="box-child-content">
                    <div style="width: 350px; float: left; margin: 0px;">
                        <dxchartsui:WebChartControl ID="chartProduct3" Width="350px" runat="server">
                        </dxchartsui:WebChartControl>
                    </div>
                    <div class="stage" style="width: 550px; float: left; margin: 0px;">
                        <dxchartsui:WebChartControl ID="chartStage3" Width="550px" runat="server" OnCustomDrawSeries="chartStage3_CustomDrawSeries">
                        </dxchartsui:WebChartControl>
                    </div>
                    <div class="comment">
                        <h5>
                            Nhận xét
                            <%=wc4 %>
                            (<%=w4 %>)</h5>
                        
                        <p>
                            Tổng thời gian giải ngân là
                            <%=c3.Split('|')[0] %>
                            ngày, trong đó:</p>
                        <p>
                            &nbsp;&nbsp;- Tổng thời gian xác nhận nghị quyết và chuẩn bị các giấy tờ cần thiết sau phê duyệt chiếm
                            <%=c3.Split('|')[1] %>%</p>
                        <p>
                            &nbsp;&nbsp;- Tổng thời gian từ khi hồ sơ được mở mới đến khi
                            
                            được phê duyệt là
                            <%=c3.Split('|')[2] %>
                            ngày</p>
                        <p>
                            So sánh với tháng trước đó:</p>
                        <p>
                            &nbsp;&nbsp;- Tổng thời gian giải ngân
                            <% if (Convert.ToInt32(c3.Split('|')[3]) < 0)
                               {
                                   Response.Write("giảm " + -Convert.ToInt32(c3.Split('|')[3]));
                               }
                               else Response.Write("tăng " + c3.Split('|')[3]); %>%
                        </p>
                        <p>
                            &nbsp;&nbsp;- Tổng thời gian xác nhận nghị quyết và chuẩn bị các giấy tờ cần thiết sau phê duyệt
                            <% if (Convert.ToInt32(c3.Split('|')[4]) < 0)
                               {
                                   Response.Write("giảm " + -Convert.ToInt32(c3.Split('|')[4]));
                               }
                               else Response.Write("tăng " + c3.Split('|')[4]); %>%</p>
                    </div>
                    <div class="clear">
                    </div>
                </div>
            </div>
            <div class="box-child" id="box-child-4">
                <p class="title">
                    Household Business Loan</p>
                <div class="box-child-content">
                    <div style="width: 350px; float: left; margin: 0px;">
                        <dxchartsui:WebChartControl ID="chartProduct4" Width="350px" runat="server">
                        </dxchartsui:WebChartControl>
                    </div>
                    <div class="stage" style="width: 550px; float: left; margin: 0px;">
                        <dxchartsui:WebChartControl ID="chartStage4" Width="550px" runat="server" OnCustomDrawSeries="chartStage4_CustomDrawSeries">
                        </dxchartsui:WebChartControl>
                    </div>
                    <div class="comment">
                        <h5>
                            Nhận xét
                            <%=wc4 %>
                            (<%=w4 %>)</h5>
                        
                        <p>
                            Tổng thời gian giải ngân là
                            <%=c4.Split('|')[0] %>
                            ngày, trong đó:</p>
                        <p>
                            &nbsp;&nbsp;- Tổng thời gian xác nhận nghị quyết và chuẩn bị các giấy tờ cần thiết sau phê duyệt chiếm
                            <%=c4.Split('|')[1] %>%</p>
                        <p>
                            &nbsp;&nbsp;- Tổng thời gian từ khi hồ sơ được mở mới đến khi
                            
                            được phê duyệt là
                            <%=c4.Split('|')[2] %>
                            ngày</p>
                        <p>
                            So sánh với tháng trước đó:</p>
                        <p>
                            &nbsp;&nbsp;- Tổng thời gian giải ngân
                            <% if (Convert.ToInt32(c4.Split('|')[3]) < 0)
                               {
                                   Response.Write("giảm " + -Convert.ToInt32(c4.Split('|')[3]));
                               }
                               else Response.Write("tăng " + c4.Split('|')[3]); %>%
                        </p>
                        <p>
                            &nbsp;&nbsp;- Tổng thời gian xác nhận nghị quyết và chuẩn bị các giấy tờ cần thiết sau phê duyệt
                            <% if (Convert.ToInt32(c4.Split('|')[4]) < 0)
                               {
                                   Response.Write("giảm " + -Convert.ToInt32(c4.Split('|')[4]));
                               }
                               else Response.Write("tăng " + c4.Split('|')[4]); %>%</p>
                    </div>
                    <div class="clear">
                    </div>
                </div>
            </div>
            <div class="box-child" id="box-child-5">
                <p class="title">
                    Overdraft</p>
                <div class="box-child-content">
                    <div style="width: 350px; float: left; margin: 0px;">
                        <dxchartsui:WebChartControl ID="chartProduct5" Width="350px" runat="server">
                        </dxchartsui:WebChartControl>
                    </div>
                    <div class="stage" style="width: 550px; float: left; margin: 0px;">
                        <dxchartsui:WebChartControl ID="chartStage5" Width="550px" runat="server" OnCustomDrawSeries="chartStage5_CustomDrawSeries">
                        </dxchartsui:WebChartControl>
                    </div>
                    <div class="comment">
                        <h5>
                            Nhận xét
                            <%=wc4 %>
                            (<%=w4 %>)</h5>
                        
                        <p>
                            Tổng thời gian giải ngân là
                            <%=c5.Split('|')[0] %>
                            ngày, trong đó:</p>
                        <p>
                            &nbsp;&nbsp;- Tổng thời gian xác nhận nghị quyết và chuẩn bị các giấy tờ cần thiết sau phê duyệt chiếm
                            <%=c5.Split('|')[1] %>%</p>
                        <p>
                            &nbsp;&nbsp;- Tổng thời gian từ khi hồ sơ được mở mới đến khi
                            
                            được phê duyệt là
                            <%=c5.Split('|')[2] %>
                            ngày</p>
                        <p>
                            So sánh với tháng trước đó:</p>
                        <p>
                            &nbsp;&nbsp;- Tổng thời gian giải ngân
                            <% if (Convert.ToInt32(c5.Split('|')[3]) < 0)
                               {
                                   Response.Write("giảm " + -Convert.ToInt32(c5.Split('|')[3]));
                               }
                               else Response.Write("tăng " + c5.Split('|')[3]); %>%
                        </p>
                        <p>
                            &nbsp;&nbsp;- Tổng thời gian xác nhận nghị quyết và chuẩn bị các giấy tờ cần thiết sau phê duyệt
                            <% if (Convert.ToInt32(c5.Split('|')[4]) < 0)
                               {
                                   Response.Write("giảm " + -Convert.ToInt32(c5.Split('|')[4]));
                               }
                               else Response.Write("tăng " + c5.Split('|')[4]); %>%</p>
                    </div>
                    <div class="clear">
                    </div>
                </div>
            </div>
            <div class="box-child" id="box-child-6">
                <p class="title">
                    UPL</p>
                <div class="box-child-content">
                    <div style="width: 350px; float: left; margin: 0px;">
                        <dxchartsui:WebChartControl ID="chartProduct6" Width="350px" runat="server">
                        </dxchartsui:WebChartControl>
                    </div>
                    <div class="stage" style="width: 550px; float: left; margin: 0px;">
                        <dxchartsui:WebChartControl ID="chartStage6" Width="550px" runat="server" OnCustomDrawSeries="chartStage6_CustomDrawSeries">
                        </dxchartsui:WebChartControl>
                    </div>
                    <div class="comment">
                        <h5>
                            Nhận xét
                            <%=wc4 %>
                            (<%=w4 %>)</h5>
                        
                        <p>
                            Tổng thời gian giải ngân là
                            <%=c6.Split('|')[0] %>
                            ngày, trong đó:</p>
                        <p>
                            &nbsp;&nbsp;- Tổng thời gian xác nhận nghị quyết và chuẩn bị các giấy tờ cần thiết sau phê duyệt chiếm
                            <%=c6.Split('|')[1] %>%</p>
                        <p>
                            &nbsp;&nbsp;- Tổng thời gian từ khi hồ sơ được mở mới đến khi
                            
                            được phê duyệt là
                            <%=c6.Split('|')[2] %>
                            ngày</p>
                        <p>
                            So sánh với tháng trước đó:</p>
                        <p>
                            &nbsp;&nbsp;- Tổng thời gian giải ngân
                            <% if (Convert.ToInt32(c6.Split('|')[3]) < 0)
                               {
                                   Response.Write("giảm " + -Convert.ToInt32(c6.Split('|')[3]));
                               }
                               else Response.Write("tăng " + c6.Split('|')[3]); %>%
                        </p>
                        <p>
                            &nbsp;&nbsp;- Tổng thời gian xác nhận nghị quyết và chuẩn bị các giấy tờ cần thiết sau phê duyệt
                            <% if (Convert.ToInt32(c6.Split('|')[4]) < 0)
                               {
                                   Response.Write("giảm " + -Convert.ToInt32(c6.Split('|')[4]));
                               }
                               else Response.Write("tăng " + c6.Split('|')[4]); %>%</p>
                    </div>
                    <div class="clear">
                    </div>
                </div>
            </div>
            <div class="box-child" id="box-child-7">
                <p class="title">
                    Credit card</p>
                <div class="box-child-content">
                    <div style="width: 350px; float: left; margin: 0px;">
                        <dxchartsui:WebChartControl ID="chartProduct7" Width="350px" runat="server">
                        </dxchartsui:WebChartControl>
                    </div>
                    <div class="stage" style="width: 550px; float: left; margin: 0px;">
                        <dxchartsui:WebChartControl ID="chartStage7" Width="550px" runat="server" OnCustomDrawSeries="chartStage7_CustomDrawSeries">
                        </dxchartsui:WebChartControl>
                    </div>
                    <div class="comment">
                        <h5>
                            Nhận xét
                            <%=wc4 %>
                            (<%=w4 %>)</h5>
                            <br />
                        
                        <p>
                            &nbsp;&nbsp;- Tổng thời gian in thẻ là
                            <%=c7.Split('|')[0] %>
                            ngày, trong đó:</p>
                        <%--<p>
                            &nbsp;&nbsp;- Tổng thời gian xác nhận nghị quyết và chuẩn bị các giấy tờ cần thiết sau phê duyệt chiếm
                            <%=c7.Split('|')[1] %>%</p>--%>
                        <p>
                            &nbsp;&nbsp;- Tổng thời gian từ khi hồ sơ được mở mới đến khi
                            
                            được phê duyệt là
                            <%=c7.Split('|')[2] %>
                            ngày</p>
                        <p>
                            So sánh với tháng trước đó:</p>
                        <p>
                            &nbsp;&nbsp;- Tổng thời gian in thẻ
                            <% if (Convert.ToInt32(c7.Split('|')[3]) < 0)
                               {
                                   Response.Write("giảm " + -Convert.ToInt32(c7.Split('|')[3]));
                               }
                               else Response.Write("tăng " + c7.Split('|')[3]); %>%
                        </p>
                        <%--<p>
                            &nbsp;&nbsp;- Tổng thời gian xác nhận nghị quyết và chuẩn bị các giấy tờ cần thiết sau phê duyệt
                            <% if (Convert.ToInt32(c7.Split('|')[4]) < 0)
                               {
                                   Response.Write("giảm " + -Convert.ToInt32(c7.Split('|')[4]));
                               }
                               else Response.Write("tăng " + c7.Split('|')[4]); %>%</p>--%>
                    </div>
                    <div class="clear">
                    </div>
                </div>
            </div>
        </div>
        <div class="sla" style="display: none; height: 1000px;">
            <div class="box">
                <p class="title" style="background: #339933;">
                    TỶ LỆ ĐẠT SLA - THEO SẢN PHẨM</p>
            </div>
            <table class="tg">
                <tr>
                    <th class="tg-drd7" rowspan="2">
                        Sản phẩm
                    </th>
                    <th class="tg-drd7" colspan="3">
                        Từ khi hồ sơ được phê duyệt đến khi ra quyết định cho vay
                    </th>
                    <th class="tg-drd7" colspan="3">
                        Soạn thảo hồ sơ
                    </th>
                    <th class="tg-drd7" colspan="3">
                        Giải ngân
                    </th>
                </tr>
                <tr>
                    <th class="tg-drd7">
                        SLA cam kết
                    </th>
                    <th class="tg-drd7">
                        % đạt SLA
                    </th>
                    <th class="tg-drd7">
                        Trạng thái
                    </th>
                    <th class="tg-drd7">
                        SLA cam kết
                    </th>
                    <th class="tg-drd7">
                        % đạt SLA
                    </th>
                    <th class="tg-drd7">
                        Trạng thái
                    </th>
                    <th class="tg-drd7">
                        SLA cam kết
                    </th>
                    <th class="tg-drd7">
                        % đạt SLA
                    </th>
                    <th class="tg-drd7">
                        Trạng thái
                    </th>
                </tr>
                <tbody id="tbListSla">
                </tbody>
            </table>
            <div class="notes">
                <table>
                    <tr>
                        <td style="font-weight: bold; text-decoration: underline;">
                            Ghi chú:
                        </td>
                    </tr>
                    <tr>
                        <td>
                            - <strong>Nguồn dữ liệu báo cáo:</strong> Dữ liệu từ hệ thống LOS
                        </td>
                    </tr>
                    <tr>
                        <td>
                            - <strong>Thời gian báo cáo:</strong> Từ ngày mùng 1 của tháng đến thời điểm báo
                            cáo
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <strong>- Điều kiện tính toán SLA:</strong>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>- Từ khi hồ sơ được trình đến khi ra quyết
                                định cho vay:</strong> SLA được tính từ thời điểm nhân viên bán đệ trình lần
                            cuối cùng (đầy đủ hết các giấy tờ cần thiết) đến thời điểm CPC đưa ra quyết định
                            cho vay (bao gồm cả thời gian cho bước Gọi điện và Thực địa KH)
                        </td>
                    </tr>
                    <tr>
                        <td>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>- Soạn thảo hồ sơ:</strong> SLA được
                            tính từ thời điểm CSO được phân bổ hồ sơ đến khi hồ sơ được hoàn thành và đăng tải
                            lên hệ thống LOS
                        </td>
                    </tr>
                    <tr>
                        <td>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>- Giải ngân:</strong> SLA được tính
                            từ thời điểm CSO nhận được đầy đủ hồ sơ cần thiết đến khi bước giải ngân được hoàn
                            tất trên hệ thống LOS
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <strong>- Mẫu tính toán SLA:</strong>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>- Từ khi hồ sơ được trình đến khi ra quyết
                                định cho vay:</strong> dựa vào số lượng hồ sơ được phê duyệt từ ngày mùng 1
                            của tháng đến thời điểm báo cáo
                        </td>
                    </tr>
                    <tr>
                        <td>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>- Soạn thảo hồ sơ:</strong> tính toán
                            dựa trên số lượng hồ sơ được giải ngân từ ngày mùng 1 của tháng đến ngày báo cáo,
                            loại trừ các hồ sơ được phân bổ cho CSO sau 16:30
                        </td>
                    </tr>
                    <tr>
                        <td>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>- Giải ngân:</strong> tính toán dựa
                            trên số lượng hồ sơ được giải ngân từ ngày mùng 1 của tháng đến ngày báo cáo, loại
                            trừ tất cả các hồ sơ được phân bổ cho CSO sau 16:30
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <strong>- Chú thích màu sắc:</strong>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <table style="width: 120px; margin-left: 120px;">
                                <tr>
                                    <td>
                                        <img src="/images/admin/icon/green.png" />
                                    </td>
                                    <td style="text-align: right">
                                        >= 90%
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <img src="/images/admin/icon/yellow.png" />
                                    </td>
                                    <td style="text-align: right">
                                        80% - 90%
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <img src="/images/admin/icon/red.png" />
                                    </td>
                                    <td style="text-align: right">
                                        < 80%
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</asp:Content>
