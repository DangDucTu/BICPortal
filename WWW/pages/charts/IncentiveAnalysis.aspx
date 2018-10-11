<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPageAdmin.master" AutoEventWireup="true"
    CodeFile="IncentiveAnalysis.aspx.cs" Inherits="pages_charts_IncentiveAnalysis" %>

<%@ Register Assembly="DevExpress.XtraCharts.v13.1.Web, Version=13.1.4.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a"
    Namespace="DevExpress.XtraCharts.Web" TagPrefix="dxchartsui" %>
<%@ Register Assembly="DevExpress.Web.v13.1, Version=13.1.4.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a"
    Namespace="DevExpress.Web.ASPxEditors" TagPrefix="dx" %>
<%@ Register Assembly="DevExpress.XtraCharts.v13.1, Version=13.1.4.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a"
    Namespace="DevExpress.XtraCharts" TagPrefix="cc1" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <link href="/css/dashboard.css" rel="stylesheet" type="text/css" />
    <link href="/css/incentive-analysis.css" rel="stylesheet" type="text/css" />
    <script src="/js/popup/dashboard/Incentive.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(function () {
            pages_IncentiveDashboard.documentReady('Jul-14');
        });
    </script>
    
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div class="dashboard incentive">
        <div style="border-bottom: 2px solid #333; position: relative;">
            <p class="title-das" style="float: left">
                MONTHLY PAYOUT DASHBOARD
            </p>
            <table style="width: 140px; float: right; font-size: 12px;">
                <tr>
                    <td style="text-align: left">
                        Month:
                    </td>
                    <td style="text-align: right">
                            09/2014
                    </td>
                </tr>
                <tr>
                    <td style="text-align: left">
                        Incentive unit:
                    </td>
                    <td style="text-align: right">
                            Million VND
                    </td>
                </tr>
            </table>
            <div class="clear">
            </div>
        </div> 
        <div class="box">
            <p class="title">
                Current month figure</p>
        </div>
        <div class="execute-hightlight">
            <div style="border: 1px solid #999; padding: 5px;">
                <h4>
                    Executive summary:</h4>
                <p>
                   - Generally, total Incentive for Retail and SME gradually increases over the reported period
                </p>
                <p>
                   - PB's incentive amount made up the largest part of total Retail Incentive from March to May. However, incentive for this position dramatically decreased in June and remains quite stable since then due to new Incentive policy while Incentive for other positions of Retail (except for WB Official) steadily went up
                </p>
                <p>
                    - The reporting period also witnessed a stability in the proportion of Incentive amongst positions belonging to SME: Incentive for MBO and SBO has always been accounted for the largest part, in comparison with the other two positions. However Incentive for DSA possesses the highest growth, almost doubles the payout amount in August compared to that in July
                </p>

                <p style="margin-top: 20px; font-weight: normal;">(*) This position mechanism was applied since Mar 2014, so we do not have data for every position in Jan and Feb</p>
            </div>
            <%--<p style="margin-top: 8px;">
                <span style="color: Red; font-weight: bold">(*)</span> Incentive for unofficial
                employee is calculated based on monthly salary causing blank on incentive amount
                for this position</p>
            <p>
                <span style="color: Red; font-weight: bold">(*) +/-</span> last month and % growth
                last month were calculated based on Incentive amount received by sales
            </p>--%>
            <%--<table style="width: 150px; margin-top: 10px;">
                <tr>
                    <td style="width: 50px;">
                        <img src="/images/admin/icon/up.png" />
                    </td>
                    <td style="text-align: left">
                        Positive growth
                    </td>
                </tr>
                <tr>
                    <td>
                        <img src="/images/admin/icon/down.png" />
                    </td>
                    <td style="text-align: left">
                        Negative growth
                    </td>
                </tr>
            </table>--%>
        </div>
        <div style="float: left; margin-top: 5px;">
            <table class="channel" style="width: 220px; float: left">
                <tr style="background: #C4D79B">
                    <td colspan="2">
                        &nbsp;<br />
                        &nbsp;
                    </td>
                </tr>
                <tr>
                    <td rowspan="3" style="text-align: center; font-weight: bold;">
                        SME
                    </td>
                    <td>
                        MBO/SBO
                    </td>
                </tr>
                <tr>
                    <td>
                        PSA
                    </td>
                </tr>
                <tr>
                    <td>
                        DSA
                    </td>
                </tr>
                <tr>
                    <td colspan="2" style="background: #F2DCDB; text-align: center; font-weight: bold; font-size: 12px;">
                        TOTAL SME
                    </td>
                </tr>
                <tr>
                    <td rowspan="9" style="text-align: center; font-weight: bold;">
                        RETAIL (BRANCH)
                    </td>
                    <td>
                        PB
                    </td>
                </tr>
                <tr>
                    <td>
                        PSE Loan Agent
                    </td>
                </tr>
                <tr>
                    <td>
                        PSE Loan Official
                    </td>
                </tr>
                <tr>
                    <td>
                        PSE CASA Agent
                    </td>
                </tr>
                <tr>
                    <td>
                        PSE CASA Official
                    </td>
                </tr>
                <tr>
                    <td>
                        RM/SRM
                    </td>
                </tr>
                <tr>
                    <td>
                        Head of Sales
                    </td>
                </tr>
                <tr>
                    <td>
                        Head of Hub
                    </td>
                </tr>
                <tr>
                    <td>
                        Branch Manager
                    </td>
                </tr>
                <tr>
                    <td rowspan="6" style="text-align: center; font-weight: bold;">
                        RETAIL (AC)
                    </td>
                    <td>
                        AP - Agent
                    </td>
                </tr>
                <tr>
                    <td>
                        AP - Official
                    </td>
                </tr>
                <tr>
                    <td>
                        CL - Agent
                    </td>
                </tr>
                <tr>
                    <td>
                        CL - Official
                    </td>
                </tr>
                <tr>
                    <td>
                        WB - Agent
                    </td>
                </tr>
                <tr>
                    <td>
                        WB - Official
                    </td>
                </tr>
                <tr>
                    <td colspan="2" style="background: #F2DCDB; text-align: center; font-weight: bold; font-size: 12px;">
                        TOTAL RETAIL
                    </td>
                </tr>
                <tr>
                    <td colspan="2" style="background: #F2DCDB; text-align: center; font-weight: bold; font-size: 12px;">
                        TOTAL FOR RETAIL AND SME
                    </td>
                </tr>
            </table>
            <table class="tb-amount">
                <tr>
                    <th>
                       YTD 
                    </th>
                    <th>
                        Jan - 2014
                    </th>
                    <th>
                        Feb - 2014
                    </th>
                    <th>
                        Mar - 2014
                    </th>
                    <th>
                        Apr - 2014
                    </th>
                    <th>
                        May - 2014
                    </th>
                    <th>
                        Jun - 2014
                    </th>
                    <th>
                        Jul - 2014
                    </th>
                    <th>
                        Aug - 2014
                    </th>
                    <th>
                        Sep - 2014
                    </th>
                    <th>
                        Oct - 2014
                    </th>
                    <th>
                        Nov - 2014
                    </th>
                    <th>
                        Dec - 2014
                    </th>
                </tr>
                <tbody id="tbListIncentiveCurrentMonth">
                </tbody>
            </table>
            <div class="clear">
            </div>
        </div>
        
        <div class="clear">
        </div>
        <div class="box">
            <p class="title">
                Incentive amount over the last months
            </p>
        </div>
        <div class="incentive-amount-filter">
            <dx:ASPxComboBox ID="cbDivision" runat="server" Width="140px" Height="25px" ValueType="System.String">
                <Items>
                    <dx:ListEditItem Value="sme" Selected="true" Text="SME" />
                    <dx:ListEditItem Value="retail" Text="RETAIL" />
                </Items>
                <ClientSideEvents SelectedIndexChanged="function(s, e) {
                                cbProduct.PerformCallback(&quot;TimeLine&quot;);
                            }" />
            </dx:ASPxComboBox>
            <dx:ASPxComboBox ID="cbProduct" ClientInstanceName="cbProduct" EnableClientSideAPI="true"
                runat="server" Width="140px" Height="25px" ValueType="System.String" OnCallback="cbProduct_Callback">
                <Items>
                    <dx:ListEditItem Value="A" Selected="true" Text="MBO/SBO" />
                    <dx:ListEditItem Value="B" Text="PSA" />
                    <dx:ListEditItem Value="C" Text="DSA" />
                </Items>
                <ClientSideEvents SelectedIndexChanged="function(s, e) {
                                chart2.PerformCallback(&quot;TimeLine1&quot;);
                            }" />
            </dx:ASPxComboBox>
            <div class="clear">
            </div>
        </div>
        <div style="width: 580px; float: left; margin-top: 5px;">
            <dxchartsui:WebChartControl ID="chart1" Width="580px" runat="server">
            </dxchartsui:WebChartControl>
        </div>
        <div style="width: 440px; float: left; margin: 5px 0 0 10px;">
            <dxchartsui:WebChartControl ID="chart2" ClientInstanceName="chart2" EnableClientSideAPI="true"
                Width="440px" runat="server" OnCustomCallback="chart2_CustomCallback">
            </dxchartsui:WebChartControl>
        </div>
        <div class="clear">
        </div>
        <div class="box">
            <p class="title">
                Incentive differences among positions
            </p>
             <div style="margin: 5px auto; width:130px;">
            <dx:ASPxComboBox ID="cbInsentiveRetail" runat="server" Width="130px" Height="25px"
                ValueType="System.String">
                <Items>
                    <dx:ListEditItem Value="Sep" Selected="true" Text="Sep-14" />
                    <dx:ListEditItem Value="Aug" Text="Aug-14" />
                    <dx:ListEditItem Value="Jul" Text="Jul-14" />
                    <dx:ListEditItem Value="Jun" Text="Jun-14" />
                    <dx:ListEditItem Value="May" Text="May-14" />
                    <dx:ListEditItem Value="Apr" Text="Apr-14" />
                    <dx:ListEditItem Value="Mar" Text="Mar-14" />
                    <dx:ListEditItem Value="Feb" Text="Feb-14" />
                    <dx:ListEditItem Value="Jan" Text="Jan-14" />
                    <dx:ListEditItem Value="YTD" Text="YTD" />
                </Items>
                <ClientSideEvents SelectedIndexChanged="function(s, e) {
                                chart3.PerformCallback(&quot;TimeLine&quot;);
                                chart4.PerformCallback(&quot;TimeLine&quot;);
                            }" />
            </dx:ASPxComboBox>
        </div>
        <%--<div style="float: right; margin-top: 5px;">
            <dx:ASPxComboBox ID="cbInsentiveSme" runat="server" Width="130px" Height="25px" ValueType="System.String">
                <Items>
                    <dx:ListEditItem Value="Jul-14" Selected="true" Text="Jul-14" />
                    <dx:ListEditItem Value="Jun-14" Text="Jun-14" />
                    <dx:ListEditItem Value="May-14" Text="May-14" />
                </Items>
                
            </dx:ASPxComboBox>
        </div>--%>
        <div class="clear">
        </div>
        <div style="width: 580px; float: left; margin-top: 5px;">
            <dxchartsui:WebChartControl ID="chart3" Width="580px" Height="300px" ClientInstanceName="chart3"
                EnableClientSideAPI="true" runat="server" OnCustomCallback="chart3_CustomCallback">
            </dxchartsui:WebChartControl>
        </div>
        <div style="width: 580px; float: right; margin: 5px 0;">
            <dxchartsui:WebChartControl ID="chart4" Width="580px" Height="300px" ClientInstanceName="chart4"
                EnableClientSideAPI="true" runat="server" OnCustomCallback="chart4_CustomCallback">
            </dxchartsui:WebChartControl>
        </div>
        <div class="clear">
        </div>
        </div>
       
        <%--<div class="box glossary">
            <p class="title">
                GLOSSARY</p>
            <table style="margin: 5px 0; width: 100%; float: left">
                <tr style="background: #C4D79B">
                    
                    <th style="width: 350px;">
                        Team
                    </th>
                    <th>
                        Description
                    </th>
                </tr>
                <tr>                    
                    <td>
                        <strong>% salemen getting incentive</strong>
                    </td>
                    <td>
                        Ratio between the number of salemen getting Incentive and the total number of salemen
                        on each category
                    </td>
                </tr>
                <tr>
                    <td>
                        <strong>Incentive per saleman </strong>
                    </td>
                    <td>
                        Total Incentive devided by total number of salemen
                    </td>
                </tr>
                <tr>
                    <td>
                        <strong>+/- last month </strong>
                    </td>
                    <td>
                        Substraction of the incentive paid this month and the incentive paid last month
                    </td>
                </tr>
                <tr>
                    <td>
                        <strong>% growth last month </strong>
                    </td>
                    <td>
                        +/- last month divided by last month incentive
                    </td>
                </tr>
                <tr>
                    <td>
                        <strong>AP</strong>
                    </td>
                    <td>
                        Asset Partnership
                    </td>
                </tr>
                <tr>
                    <td>
                        <strong>CL</strong>
                    </td>
                    <td>
                        Consumer Lending
                    </td>
                </tr>
                <tr>
                    <td>
                        <strong>WB</strong>
                    </td>
                    <td>
                        Worksite Banking
                    </td>
                </tr>
            </table>
        </div>--%>
    </div>
</asp:Content>
