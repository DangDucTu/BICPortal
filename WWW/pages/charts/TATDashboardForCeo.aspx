<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPageAdmin.master" AutoEventWireup="true"
    CodeFile="TATDashboardForCeo.aspx.cs" Inherits="pages_charts_TATDashboardForCeo" %>

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
                <li class="active">Application - Including Resubmission</li>
                <li>Application - Excluding Resubmission</li>
                <li>TTD</li>
                <li>SLA</li>
            </ul>
            <table style="width: 130px; float: right; margin-bottom: 26px; font-size: 12px;">
                <tr>
                    <td style="text-align: left">
                        Language:
                    </td>
                    <td style="text-align: right">
                        <a style="color: Green; text-decoration: underline;" href="weekly-retail-application-pipeline-tat-report-vi">Vietnamese</a>
                    </td>
                </tr>
            </table>
            <div class="clear">
            </div>
        </div>
        <div class="box application" style="padding-bottom: 5px;">
            <p style="background: #339933; margin-bottom: 5px;" class="title">
                APPLICATION PIPELINE (INCLUDING RE-SUBMISSION) - BY PRODUCT</p>
            <table style="width: 180px; float: left;" class="channel">
                <tr>
                    <th style="text-align: center; padding: 18.5px 0; background: #D8E4BC; font-size: 11px;">
                        Channel/Region
                        <br />
                    </th>
                </tr>
                <tr>
                    <td style="background: #C4D79B">
                        <strong>By product</strong>
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
                        Channel/Region
                        <br />
                    </th>
                </tr>
                <tr>
                    <td style="background: #C4D79B">
                        <strong>By product</strong>
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
                        New application
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
                        Approved application
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
                        Rejected application
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
                        Cancelled application
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
                        Approval rate (%)
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
                        Cancellation rate (%)
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
        <div class="box application" style="padding-bottom: 5px;">
            <p style="background: #339933; margin-bottom: 5px;" class="title">
                APPLICATION PIPELINE (INCLUDING RE-SUBMISSION) - BY CHANNEL</p>
            <table style="width: 180px; float: left;" class="channel">
                <tr>
                    <th style="text-align: center; padding: 18.5px 0; background: #D8E4BC; font-size: 11px;
                        border-top: 1px solid #999;">
                        Channel/Region
                        <br />
                    </th>
                </tr>
                <tr>
                    <td style="background: #C4D79B;">
                        <strong>By channel</strong>
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
                        Channel/Region
                        <br />
                    </th>
                </tr>
                <tr>
                    <td style="background: #C4D79B;">
                        <strong>By channel</strong>
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
                        New application
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
                        Approved application
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
                        Rejected application
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
                        Cancelled application
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
                        Approval rate (%)
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
                        Cancellation rate (%)
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
            <div class="clear"></div>
        </div>
        <div class="box application">
            <p style="background: #339933; margin-bottom: 5px;" class="title">
                APPLICATION PIPELINE (INCLUDING RE-SUBMISSION) - CHART</p>
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
            <div class="box resubmit" style="padding-bottom: 5px;">
                <p style="background: #339933; margin-bottom: 5px;" class="title">
                    APPLICATION PIPELINE (EXCLUDING RE-SUBMISSION) - BY PRODUCT</p>
                <table style="width: 180px; float: left;" class="channel">
                    <tr>
                        <th style="text-align: center; padding: 18.5px 0; background: #D8E4BC; font-size: 11px;">
                            Channel/Region
                            <br />
                        </th>
                    </tr>
                    <tr>
                        <td style="background: #C4D79B">
                            <strong>By product</strong>
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
                            Channel/Region
                            <br />
                        </th>
                    </tr>
                    <tr>
                        <td style="background: #C4D79B">
                            <strong>By product</strong>
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
                            New application
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
                            Approved application
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
                            Rejected application
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
                            Cancelled application
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
                            Approval rate (%)
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
                            Cancellation rate (%)
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
            <div class="box resubmit" style="padding-bottom: 5px;">
                <p style="background: #339933; margin-bottom: 5px;" class="title">
                    APPLICATION PIPELINE (EXCLUDING RE-SUBMISSION) - BY CHANNEL</p>
                <table style="width: 180px; float: left;" class="channel">
                    <tr>
                        <th style="text-align: center; padding: 18.5px 0; background: #D8E4BC; font-size: 11px;
                            border-top: 1px solid #999;">
                            Channel/Region
                            <br />
                        </th>
                    </tr>
                    <tr>
                        <td style="background: #C4D79B;">
                            <strong>By channel</strong>
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
                            Channel/Region
                            <br />
                        </th>
                    </tr>
                    <tr>
                        <td style="background: #C4D79B;">
                            <strong>By channel</strong>
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
                            New application
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
                            Approved application
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
                            Rejected application
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
                            Cancelled application
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
                            Approval rate (%)
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
                            Cancellation rate (%)
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
                    APPLICATION PIPELINE (EXCLUDING RE-SUBMISSION) - CHART</p>
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
                    TOTAL TIME TO DISBURSEMENT</p>
            </div>
            <div class="notes">
                <table>
                    <tr>
                        <td colspan="2" style="font-weight: bold; text-decoration: underline;">
                            NOTES:
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Stg 1-Time at QDE step (at Branches)
                        </td>
                        <td>
                            Stg 6-Time at Field Investigation step
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Stg 2-Time on-hold at QDE step (at Branches)
                        </td>
                        <td>
                            Stg 7-Waiting time for customer confirmation on loan conditions (at branches/customer)
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Stg 3-Time at DDE step (at CPC-UW)
                        </td>
                        <td>
                            Stg 8-Document Preparation (at CPC-CA) time
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Stg 4-Underwriting stage (at CPC UW) - excluded time at Phone verfication & Field
                            Investigation step
                        </td>
                        <td>
                            Stg 9-Notarization/Securitization/pending time for document submission before document preparation & disbursement (at CPC-CA, Branches)
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Stg 5-Time at Phone Verification step
                        </td>
                        <td>
                            Stg 10-Disbursement (at CPC-CA) time
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
                            Comments for
                            <%=wc4 %>
                            (<%=w4 %>)</h5>
                        <br />
                        <p>
                            Total time to disbursement is
                            <%=c8.Split('|')[0] %>
                            days, out of that:</p>
                        <p>
                            &nbsp;&nbsp;- Total customer confirmation & post approval <br /> documentation time contributed
                            <%=c8.Split('|')[1] %>%</p>
                        <p>
                            &nbsp;&nbsp;- Desicioning time is
                            <%=c8.Split('|')[2] %>
                            days</p>
                        <p>
                            Compared with last month:</p>
                        <p>
                            &nbsp;&nbsp;- Total time to disbursement
                            <% if (Convert.ToInt32(c8.Split('|')[3]) < 0)
                               {
                                   Response.Write("went down by " + -Convert.ToInt32(c8.Split('|')[3]));
                               }
                               else Response.Write("went up by " + c8.Split('|')[3]); %>%
                        </p>
                        <p>
                            &nbsp;&nbsp;- Total customer confirmation & post approval <br /> documentation time
                            <% if (Convert.ToInt32(c8.Split('|')[4]) < 0)
                               {
                                   Response.Write("decreased " + -Convert.ToInt32(c8.Split('|')[4]));
                               }
                               else Response.Write("increased " + c8.Split('|')[4]); %>%
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
                            Comments for
                            <%=wc4 %>
                            (<%=w4 %>)</h5>
                        <br />
                        <p>
                            Total time to disbursement is
                            <%=c1.Split('|')[0] %>
                            days, out of that:</p>
                        <p>
                            &nbsp;&nbsp;- Total customer confirmation & post approval <br /> documentation time contributed
                            <%=c1.Split('|')[1] %>%</p>
                        <p>
                            &nbsp;&nbsp;- Desicioning time is
                            <%=c1.Split('|')[2] %>
                            days</p>
                        <p>
                            Compared with last month:</p>
                        <p>
                            &nbsp;&nbsp;- Total time to disbursement
                            <% if (Convert.ToInt32(c1.Split('|')[3]) < 0)
                               {
                                   Response.Write("went down by " + -Convert.ToInt32(c1.Split('|')[3]));
                               }
                               else Response.Write("went up by " + c1.Split('|')[3]); %>%
                        </p>
                        <p>
                            &nbsp;&nbsp;- Total customer confirmation & post approval <br /> documentation time
                            <% if (Convert.ToInt32(c1.Split('|')[4]) < 0)
                               {
                                   Response.Write("decreased " + -Convert.ToInt32(c1.Split('|')[4]));
                               }
                               else Response.Write("increased " + c1.Split('|')[4]); %>%</p>
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
                            Comments for
                            <%=wc4 %>
                            (<%=w4 %>)</h5>
                        <br />
                        <p>
                            Total time to disbursement is
                            <%=c2.Split('|')[0] %>
                            days, out of that:</p>
                        <p>
                            &nbsp;&nbsp;- Total customer confirmation & post approval <br /> documentation time contributed
                            <%=c2.Split('|')[1] %>%</p>
                        <p>
                            &nbsp;&nbsp;- Desicioning time is
                            <%=c2.Split('|')[2] %>
                            days</p>
                        <p>
                            Compared with last month:</p>
                        <p>
                            &nbsp;&nbsp;- Total time to disbursement
                            <% if (Convert.ToInt32(c2.Split('|')[3]) < 0)
                               {
                                   Response.Write("went down by " + -Convert.ToInt32(c2.Split('|')[3]));
                               }
                               else Response.Write("went up by " + c2.Split('|')[3]); %>%
                        </p>
                        <p>
                            &nbsp;&nbsp;- Total customer confirmation & post approval <br /> documentation time
                            <% if (Convert.ToInt32(c2.Split('|')[4]) < 0)
                               {
                                   Response.Write("decreased " + -Convert.ToInt32(c2.Split('|')[4]));
                               }
                               else Response.Write("increased " + c2.Split('|')[4]); %>%</p>
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
                            Comments for
                            <%=wc4 %>
                            (<%=w4 %>)</h5>
                        <br />
                        <p>
                            Total time to disbursement is
                            <%=c3.Split('|')[0] %>
                            days, out of that:</p>
                        <p>
                            &nbsp;&nbsp;- Total customer confirmation & post approval <br /> documentation time contributed
                            <%=c3.Split('|')[1] %>%</p>
                        <p>
                            &nbsp;&nbsp;- Desicioning time is
                            <%=c3.Split('|')[2] %>
                            days</p>
                        <p>
                            Compared with last month:</p>
                        <p>
                            &nbsp;&nbsp;- Total time to disbursement
                            <% if (Convert.ToInt32(c3.Split('|')[3]) < 0)
                               {
                                   Response.Write("went down by " + -Convert.ToInt32(c3.Split('|')[3]));
                               }
                               else Response.Write("went up by " + c3.Split('|')[3]); %>%
                        </p>
                        <p>
                            &nbsp;&nbsp;- Total customer confirmation & post approval <br /> documentation time
                            <% if (Convert.ToInt32(c3.Split('|')[4]) < 0)
                               {
                                   Response.Write("decreased " + -Convert.ToInt32(c3.Split('|')[4]));
                               }
                               else Response.Write("increased " + c3.Split('|')[4]); %>%</p>
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
                            Comments for
                            <%=wc4 %>
                            (<%=w4 %>)</h5>
                        <br />
                        <p>
                            Total time to disbursement is
                            <%=c4.Split('|')[0] %>
                            days, out of that:</p>
                        <p>
                            &nbsp;&nbsp;- Total customer confirmation & post approval <br /> documentation time contributed
                            <%=c4.Split('|')[1] %>%</p>
                        <p>
                            &nbsp;&nbsp;- Desicioning time is
                            <%=c4.Split('|')[2] %>
                            days</p>
                        <p>
                            Compared with last month:</p>
                        <p>
                            &nbsp;&nbsp;- Total time to disbursement
                            <% if (Convert.ToInt32(c4.Split('|')[3]) < 0)
                               {
                                   Response.Write("went down by " + -Convert.ToInt32(c4.Split('|')[3]));
                               }
                               else Response.Write("went up by " + c4.Split('|')[3]); %>%
                        </p>
                        <p>
                            &nbsp;&nbsp;- Total customer confirmation & post approval <br /> documentation time
                            <% if (Convert.ToInt32(c4.Split('|')[4]) < 0)
                               {
                                   Response.Write("decreased " + -Convert.ToInt32(c4.Split('|')[4]));
                               }
                               else Response.Write("increased " + c4.Split('|')[4]); %>%</p>
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
                            Comments for
                            <%=wc4 %>
                            (<%=w4 %>)</h5>
                        <br />
                        <p>
                            Total time to disbursement is
                            <%=c5.Split('|')[0] %>
                            days, out of that:</p>
                        <p>
                            &nbsp;&nbsp;- Total customer confirmation & post approval <br /> documentation time contributed
                            <%=c5.Split('|')[1] %>%</p>
                        <p>
                            &nbsp;&nbsp;- Desicioning time is
                            <%=c5.Split('|')[2] %>
                            days</p>
                        <p>
                            Compared with last month:</p>
                        <p>
                            &nbsp;&nbsp;- Total time to disbursement
                            <% if (Convert.ToInt32(c5.Split('|')[3]) < 0)
                               {
                                   Response.Write("went down by " + -Convert.ToInt32(c5.Split('|')[3]));
                               }
                               else Response.Write("went up by " + c5.Split('|')[3]); %>%
                        </p>
                        <p>
                            &nbsp;&nbsp;- Total customer confirmation & post approval <br /> documentation time
                            <% if (Convert.ToInt32(c5.Split('|')[4]) < 0)
                               {
                                   Response.Write("decreased " + -Convert.ToInt32(c5.Split('|')[4]));
                               }
                               else Response.Write("increased " + c5.Split('|')[4]); %>%</p>
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
                            Comments for
                            <%=wc4 %>
                            (<%=w4 %>)</h5>
                        <br />
                        <p>
                            Total time to disbursement is
                            <%=c6.Split('|')[0] %>
                            days, out of that:</p>
                        <p>
                            &nbsp;&nbsp;- Total customer confirmation & post approval <br /> documentation time contributed
                            <%=c6.Split('|')[1] %>%</p>
                        <p>
                            &nbsp;&nbsp;- Desicioning time is
                            <%=c6.Split('|')[2] %>
                            days</p>
                        <p>
                            Compared with last month:</p>
                        <p>
                            &nbsp;&nbsp;- Total time to disbursement
                            <% if (Convert.ToInt32(c6.Split('|')[3]) < 0)
                               {
                                   Response.Write("went down by " + -Convert.ToInt32(c6.Split('|')[3]));
                               }
                               else Response.Write("went up by " + c6.Split('|')[3]); %>%
                        </p>
                        <p>
                            &nbsp;&nbsp;- Total customer confirmation & post approval <br /> documentation time
                            <% if (Convert.ToInt32(c6.Split('|')[4]) < 0)
                               {
                                   Response.Write("decreased " + -Convert.ToInt32(c6.Split('|')[4]));
                               }
                               else Response.Write("increased " + c6.Split('|')[4]); %>%</p>
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
                            Comments for
                            <%=wc4 %>
                            (<%=w4 %>)</h5>
                        <br />
                        <p>
                            Total Embossing time is
                            <%=c7.Split('|')[0] %>
                            days, out of that:</p>
                        <%--<p>
                            &nbsp;&nbsp;- Total customer confirmation & post approval <br /> documentation time contributed
                            <%=c7.Split('|')[1] %>%</p>--%>
                        <p>
                            &nbsp;&nbsp;- Desicioning time is
                            <%=c7.Split('|')[2] %>
                            days</p>
                        <p>
                            Compared with last month:</p>
                        <p>
                            &nbsp;&nbsp;- Total Embossing time
                            <% if (Convert.ToInt32(c7.Split('|')[3]) < 0)
                               {
                                   Response.Write("went down by " + -Convert.ToInt32(c7.Split('|')[3]));
                               }
                               else Response.Write("went up by " + c7.Split('|')[3]); %>%
                        </p>
                        <%--<p>
                            &nbsp;&nbsp;- Total customer confirmation & post approval <br /> documentation time
                            <% if (Convert.ToInt32(c7.Split('|')[4]) < 0)
                               {
                                   Response.Write("decreased " + -Convert.ToInt32(c7.Split('|')[4]));
                               }
                               else Response.Write("increased " + c7.Split('|')[4]); %>%</p>--%>
                    </div>
                    <div class="clear">
                    </div>
                </div>
            </div>
        </div>
        <div class="sla" style="display: none; height: 1000px;">
            <div class="box">
                <p class="title" style="background: #339933;">
                    SLA - BY PRODUCT</p>
            </div>
            <table class="tg">
                <tr>
                    <th class="tg-drd7" rowspan="2">
                        Loan Type
                    </th>
                    <th class="tg-drd7" colspan="3">
                        From submission To decision
                    </th>
                    <th class="tg-drd7" colspan="3">
                        Document preparation
                    </th>
                    <th class="tg-drd7" colspan="3">
                        Disbursement
                    </th>
                </tr>
                <tr>
                    <th class="tg-drd7">
                        Target
                    </th>
                    <th class="tg-drd7">
                        % met SLA
                    </th>
                    <th class="tg-drd7">
                        Status
                    </th>
                    <th class="tg-drd7">
                        Target
                    </th>
                    <th class="tg-drd7">
                        % met SLA
                    </th>
                    <th class="tg-drd7">
                        Status
                    </th>
                    <th class="tg-drd7">
                        Target
                    </th>
                    <th class="tg-drd7">
                        % met SLA
                    </th>
                    <th class="tg-drd7">
                        Status
                    </th>
                </tr>
                <tbody id="tbListSla">
                </tbody>
            </table>
            <div class="notes">
                <table>
                    <tr>
                        <td style="font-weight: bold; text-decoration: underline;">
                            Note:
                        </td>
                    </tr>
                    <tr>
                        <td>
                            - <strong>Data source:</strong> LOS data
                        </td>
                    </tr>
                    <tr>
                        <td>
                            - <strong>Period of report:</strong> Month-to-date (from 1st of month to date of
                            report)
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <strong>- SLA:</strong>SLA will be calculated by calendar time frame (included night
                            time, but excluded holidays, 1/2 Saturday & Sunday)
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <strong>- Conditions of calculation:</strong>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>- From submission To decision:</strong>
                            SLA will be calculated from the time of last submission of sale people (no document
                            missing) till the time to get decision (included time for Phone verification & Field
                            investigation also)
                        </td>
                    </tr>
                    <tr>
                        <td>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>- Document preparation:</strong> SLA will
                            be calculated from the time of CSO received application from distributor till the
                            time document finished & uploaded to LOS
                        </td>
                    </tr>
                    <tr>
                        <td>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>- Disbursement:</strong> SLA will be
                            calculated from the time of CSO received all needed document for disbursement till
                            the time finished disbursement stage in LOS
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <strong>- Sample of calculation:</strong>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>- From submission To decision:</strong>
                            based on applications approved from 1st of month to date of report
                        </td>
                    </tr>
                    <tr>
                        <td>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>- Document preparation:</strong> based
                            on applications disbursed from 1st of month to date of report, but excluded all
                            applications distributed to CSO after 4.30 p.m
                        </td>
                    </tr>
                    <tr>
                        <td>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>- Disbursement:</strong> based on applications
                            disbursed from 1st of month to date of report, but excluded all applications distributed
                            to CSO after 4.30 p.m
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <strong>- Colour note:</strong>
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
