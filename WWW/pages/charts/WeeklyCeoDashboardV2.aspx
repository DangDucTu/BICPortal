<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPageAdmin.master" AutoEventWireup="true" CodeFile="WeeklyCeoDashboardV2.aspx.cs" Inherits="pages_charts_WeeklyCeoDashboardV2" %>

<%@ Register Assembly="DevExpress.Web.v13.1, Version=13.1.4.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a"
    Namespace="DevExpress.Web.ASPxEditors" TagPrefix="dx" %>
<%@ Register Assembly="DevExpress.XtraCharts.v13.1.Web, Version=13.1.4.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a"
    Namespace="DevExpress.XtraCharts.Web" TagPrefix="dxchartsui" %>
<%@ Register assembly="DevExpress.XtraCharts.v13.1, Version=13.1.4.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" namespace="DevExpress.XtraCharts" tagprefix="cc1" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
    
    <script src="/js/popup/dashboard/WeeklyCeoDashboard.js" type="text/javascript"></script>
    <link href="/css/dashboard.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript">
        $(document).ready(function () {
            pages_WeeklyCeoDashboard.documentReady('<%= date%>', 'en');

        });
    </script>
    <style type="text/css">
        .dxpc-contentWrapper table,.dxbebt,#ctl00_ContentPlaceHolder1_cbSegment {margin-top: 0 !important;}
        #ctl00_ContentPlaceHolder1_chartTimeline table {margin-top: 0;}
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
    
    <div class="dashboard ceo-weekly-dashboard">
        <div style="border-bottom: 2px solid #333;">
            <p class="title" style="float: left">
                WEEKLY CEO DASHBOARD
                <br />
                <span>S&D CAT CANH</span></p>
                <table id="tbTitle" style="float: right; width: 20%;">
                    <tr style="display: none">
                        <td style="text-align: left; font-style: italic;">
                            Language:
                        </td>
                        <td style="text-align: right;">
                            <a href="/weekly-ceo-dashboard-vi" style="font-size: 12px; color: Green; text-decoration: underline;">Tiếng Việt</a>
                        </td>
                    </tr>  
                    <tr>
                        <td style="text-align: left; font-style: italic;">Date:</td>
                        <td style="text-align: right; color: Red; font-size: 16px; font-weight: bold;">
                            <asp:DropDownList ID="ddlDate" runat="server" AutoPostBack="true" 
                                onselectedindexchanged="ddlDate_SelectedIndexChanged">
                            </asp:DropDownList>
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align: left; font-style: italic;">% Elapsed Time:</td>
                        <td style="text-align: right; color: Red; font-size: 16px; font-weight: bold;"><%=elapsedTime %>%</td>
                    </tr>
                    <tr>
                        <td style="text-align: left; font-style: italic;">Balance unit:</td>
                        <td style="text-align: right; font-weight: bold">Billion VND</td>
                    </tr>
                </table>
                <div class="clear"></div>
        </div>       
        
        <div class="box summary">
            <p class="title">WEEKLY PERFORMANCE TRENDS</p>
            <div style="margin: 10px; float: left; width: 565px;">
                <p style="padding: 5px 0">I. DEPOSIT</p>

                <dxchartsui:WebChartControl ClientInstanceName="chart" ID="chartRetail1" Width="565px"
                    runat="server" CrosshairEnabled="True" Height="200px">
                </dxchartsui:WebChartControl><br />
                <dxchartsui:WebChartControl ClientInstanceName="chart" ID="chartRetail2" Width="565px"
                    runat="server" CrosshairEnabled="True" Height="200px">
                </dxchartsui:WebChartControl>
                <p style="padding: 5px 0">II. LOAN</p>
                <dxchartsui:WebChartControl ClientInstanceName="chart" ID="chartRetail3" Width="565px"
                    runat="server" CrosshairEnabled="True" Height="200px">
                </dxchartsui:WebChartControl><br />
                <dxchartsui:WebChartControl ClientInstanceName="chart" ID="chartRetail4" Width="565px"
                    runat="server" CrosshairEnabled="True" Height="200px">
                </dxchartsui:WebChartControl>
            </div>
            <div style="margin: 10px; float: right; width: 565px;">
                <p style="padding: 5px 0">&nbsp;</p>

                <dxchartsui:WebChartControl ClientInstanceName="chart" ID="chartSme1" Width="565px"
                    runat="server" CrosshairEnabled="True" Height="200px">
                </dxchartsui:WebChartControl><br />
                <dxchartsui:WebChartControl ClientInstanceName="chart" ID="chartSme2" Width="565px"
                    runat="server" CrosshairEnabled="True" Height="200px">
                </dxchartsui:WebChartControl>
                <p style="padding: 5px 0">&nbsp;</p>
                <dxchartsui:WebChartControl ClientInstanceName="chart" ID="chartSme3" Width="565px"
                    runat="server" CrosshairEnabled="True" Height="200px">
                </dxchartsui:WebChartControl><br />
                <dxchartsui:WebChartControl ClientInstanceName="chart" ID="chartSme4" Width="565px"
                    runat="server" CrosshairEnabled="True" Height="200px">
                </dxchartsui:WebChartControl>
            </div>
            
            <p style="font-style: italic; font-size: 12px; margin-left: 10px; padding: 0; font-weight:normal">EOP Loan Balance of Retail include Credit Card balance</p>
            <p style="font-style: italic; font-size: 12px; margin-left: 10px; padding: 0; font-weight:normal">EOP Balance of SME include Big Loan, New balance/new disbursement of SME has removed Big Loan</p>
            <div class="clear"></div>
        </div>
        <div class="box target">
            <p class="title">
                TARGET ACHIEVEMENT - GROWTH TARGET</p>

            <div class="loan-deposit">
                <p class="ld-title">ACTUAL EOP LOAN VS. YEAR-END TARGET</p>
                <div class="gauge">
                    <div class="chart">
                    <span class="value-current vc1"></span>
                    <span>Target <%=GetMonthByLang(target, "en") %></span>
                    <span class="value-target vt1"></span>
                    <span style="position: absolute; bottom: 0; left: 0;">2013 <br /> Actual</span>
                    <span style="position: absolute; bottom: 0; right: 0;">2014 <br /> Target</span>
                        <%--<dx:ASPxGaugeControl ID="gaugeControl1" runat="server">
                        </dx:ASPxGaugeControl>--%>
                        <asp:Panel ID="panel1" runat="server"></asp:Panel>
                    </div>
                    <p style="padding: 0; text-align: center; font-size: 15px; color: #C00066">RETAIL</p>
                    <p style="padding: 10px; text-align: center; width: 60%; margin: 5px auto; border: 2px solid #333;"><span class="gt1" style="color: #C00066"></span> GROWTH TARGET</p>
                </div>
                <div class="gauge">
                <div class="chart">
                    <span class="value-current vc2"></span>
                    <span>Target <%=GetMonthByLang(target, "en") %></span>
                    <span class="value-target vt2"></span>
                    <span style="position: absolute; bottom: 0; left: 0;">2013 <br /> Actual</span>
                    <span style="position: absolute; bottom: 0; right: 0;">2014 <br /> Target</span>
                    <asp:Panel ID="panel2" runat="server"></asp:Panel>
                </div>
                    <p style="padding: 0; text-align: center; font-size: 15px; color: #C00066">SME</p>
                    <p style="padding: 10px; text-align: center; width: 60%; margin: 5px auto; border: 2px solid #333;"><span class="gt2" style="color: #C00066"></span> GROWTH TARGET</p>
                </div>
            </div>

            <div class="loan-deposit" style="float: right;">
                <p class="ld-title">ACTUAL EOP DEPOSIT VS. YEAR-END TARGET</p>
                <div class="gauge">
                <div class="chart">
                    <span class="value-current vc3"></span>
                    <span>Target <%=GetMonthByLang(target, "en") %></span>
                    <span class="value-target vt3"></span>
                    <span style="position: absolute; bottom: 0; left: 0;">2013 <br /> Actual</span>
                    <span style="position: absolute; bottom: 0; right: 0;">2014 <br /> Target</span>
                    <asp:Panel ID="panel3" runat="server"></asp:Panel>
                </div>
                    <p style="padding: 0; text-align: center; font-size: 15px; color: #C00066">RETAIL</p>
                    <p style="padding: 10px; text-align: center; width: 60%; margin: 5px auto; border: 2px solid #333;"><span class="gt3" style="color: #C00066"></span> GROWTH TARGET</p>
                </div>
                <div class="gauge">
                <div class="chart">
                    <span class="value-current vc4"></span>
                    <span>Target <%=GetMonthByLang(target, "en") %></span>
                    <span class="value-target vt4"></span>
                    <span style="position: absolute; bottom: 0; left: 0;">2013 <br /> Actual</span>
                    <span style="position: absolute; bottom: 0; right: 0;">2014 <br /> Target</span>
                    <asp:Panel ID="panel4" runat="server"></asp:Panel>
                </div>
                    <p style="padding: 0; text-align: center; font-size: 15px; color: #C00066">SME</p>
                    <p style="padding: 10px; text-align: center; width: 60%; margin: 5px auto; border: 2px solid #333;"><span class="gt4" style="color: #C00066"></span> GROWTH TARGET</p>
                </div>
            </div>
            <div class="clear"></div>
        </div>
        <div class="box productivity">
            <p class="title">
                SALES PRODUCTIVITY (Updated Monthly)</p>

            <div class="overview">
            <p class="title">OVER VIEW</p>    

                <table style="width: 100%">
                    <tr>
                        <th style="text-align: left; font-size: 14px;">
                            LOAN &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </th>
                        <th class="dt1">
                            
                        </th>
                        <th class="dt2">
                            
                        </th>
                        <th>
                            +/-
                        </th>
                    </tr>
                    <tr>
                        <td style="text-align: left">
                            Retail
                        </td>
                        <td class="rt1">
                            
                        </td>                            
                        <td class="rt2">
                            
                        </td>
                        <td class="rt3">
                            
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align: left; font-size: 14px;">
                            SME
                        </td>
                        <td class="sme1">
                            
                        </td>
                        <td class="sme2">
                            
                        </td>
                        <td class="sme3">
                            
                        </td>
                    </tr>
                    <tr>                        
                        <td colspan="4" style="font-style:italic; text-align: left;">
                            Unit: Billion VND
                        </td>
                    </tr>
                </table>

                <table style="width: 100%;">
                    <tr>
                        <th style="text-align: left; font-size: 14px;">
                            DEPOSIT
                        </th>
                        <th class="dt3">
                            
                        </th>
                        <th class="dt4">
                            
                        </th>
                        <th>
                            +/-
                        </th>
                    </tr>
                    <tr>
                        <td style="text-align: left">
                            Retail
                        </td>
                        <td class="rt4">
                            
                        </td>                            
                        <td class="rt5">
                            
                        </td>
                        <td class="rt6">
                            
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align: left; font-size: 14px;">
                            SME
                        </td>
                        <td class="sme4">
                            
                        </td>
                        <td class="sme5">
                            
                        </td>
                        <td class="sme6">
                            
                        </td>
                    </tr>
                    <tr>                        
                        <td colspan="4" style="font-style:italic; text-align: left;">
                            Unit: Billion VND
                        </td>
                    </tr>
                </table>
            </div>
            <div class="overview timeline" style="float: right; margin-top: 10px; border: none; width: auto;">
                <p class="title" style="border: 1px solid #A6A6A6">
                TIMELINE</p>
                <div style="float: left; margin-top: 15px;">
                    
                    <dxchartsui:WebChartControl ClientInstanceName="chart" ID="chartTimeline" Width="500px" runat="server" 
                        oncustomcallback="chartTimeline_CustomCallback" EnableClientSideAPI="true">
                    </dxchartsui:WebChartControl>
                </div>
                <ul style="float: left; margin: 10px 0 0 12px;">
                    <li style="padding: 2px 4px 0 0; font-weight: bold; text-align: right;
                        font-family: Tahoma; font-size: 12px; text-align: left">Segment:</li>
                    <li>
                        <%--<asp:DropDownList ID="ddlSegment" CssClass="select" Width="130px" 
                            runat="server" AutoPostBack="True" 
                            onselectedindexchanged="ddlSegment_SelectedIndexChanged">                            
                            <asp:ListItem Value="retail">Retail</asp:ListItem>
                            <asp:ListItem Value="sme">SME</asp:ListItem>
                            <asp:ListItem Value="sme-removing big loan/deposit">SME-Removing big loan/deposit</asp:ListItem>                            
                        </asp:DropDownList>--%>
                        <dx:ASPxComboBox ID="cbSegment" runat="server" Width="130px" Height="25px" ValueType="System.String">
                            <Items>
                                <dx:ListEditItem Value="retail" Text="Retail" Selected="true" />
                                <dx:ListEditItem Value="sme" Text="SME" />
                                <dx:ListEditItem Value="sme-removing big loan/deposit" Text="SME-Removing big loan/deposit" />
                            </Items>
                            <ClientSideEvents SelectedIndexChanged="function(s, e) {
                                chart.PerformCallback(&quot;TimeLine&quot;);
                            }" />
                        </dx:ASPxComboBox>
                    </li>
                </ul>
            </div>
            <div class="clear"></div>
            <span style="font-style:italic; font-size: 12px; float: left; margin-left: 10px;">* Disbursement has removed contracts belong to branches but don't have sale code to allocate and the rest of salesman in branches such as teller, cashier . . .</span>
            <div class="clear"></div>
            <div class="position" style="width: 100%;">
                <p style="border: 1px solid #A6A6A6; padding: 5px; margin: 10px 10px 0 10px; background: #D9D9D9; font-size: 15px; color: #C80000;">BY POSITION, PRODUCT - <%=product_month %></p>
                <div style="float: left; width:60%; padding: 10px;">
                    <p style="padding: 0 0 5px 0; border-bottom: 1px solid #000;">RETAIL&nbsp;&nbsp;&nbsp;
                        <%--<span style="background:#FE0000">&nbsp;&nbsp;&nbsp;</span> <span style="font-size: 11px">Productivity < Benchmark</span>
                        &nbsp;&nbsp;&nbsp;<span style="background:#92D050">&nbsp;&nbsp;&nbsp;</span> <span style="font-size: 11px">Productivity >= Benchmark</span>--%>
                    </p>
                    <table class="tg">
                        
                        <tr>
                            <th class="tg-drd7" rowspan="2">
                                Sale productivity<br>
                                (Million VND)<br>
                            </th>
                            <th class="tg-drd7" colspan="3">
                                Branch
                            </th>
                            <th class="tg-drd7" colspan="3">
                                AC
                            </th>
                        </tr>
                        <tr>
                            <td class="tg-drd7">
                                PSE CASA + TD<br>
                            </td>
                            <td class="tg-drd7">
                                PSE Loan<br>
                            </td>
                            <td class="tg-drd7">
                                PB
                            </td>
                            <td class="tg-drd7">
                                Consumer<br>
                                Lending<br>
                            </td>
                            <td class="tg-drd7">
                                Workside<br>
                                Banking<br>
                            </td>
                            <td class="tg-drd7">
                                Asset<br>
                                Partnership<br>
                            </td>
                        </tr>
                          <tbody id="tbListProductivityRetail">
                            
                        </tbody>                       
                    </table>
                </div>
                
                <div class="sme" style="float: right; width:35%; padding: 10px;">
                    <p style="padding: 0 0 5px 0; border-bottom: 1px solid #000;">SME</p>
                    <table class="tg">
                        <tr>
                            <th class="tg-3dpa">
                                Sales productivity<br>
                                (Million VND)<br>
                            </th>
                            <th class="tg-3dpa">
                                SBO <br />
                            </th>
                            <th class="tg-3dpa">
                                MBO <br />
                            </th>
                        </tr>
                        <tbody id="tbListProductivitySme0">
                            
                        </tbody>
                        <tr>
                            <td colspan="3" style="text-align: left; font-weight: bold; background: #B7DEE8">Removing big loan/deposit (>30 billion)</td>
                        </tr>
                        <tbody id="tbListProductivitySme1">
                        </tbody>
                    </table>
                    </div>
                    <div class="clear"></div>
            </div>
            <div class="clear"></div>
            <span style="font-style: italic; font-size: 12px; float: left; margin-left: 10px;">* Number of new account for CASA and number of new card issued for Credit Card</span><div class="clear"></div>
        </div>
        
        <div class="box" style="display: none;">
            <p class="title">
                PERFORMANCE</p>
            <div style="padding: 10px">
                <style type="text/css">
                    .performance
                    {
                        margin-bottom: 15px;
                    }
                    .performance tr.header
                    {
                        background-color: #FFC000;
                        font-size: 15px;
                    }
                    .performance tr.header th
                    {
                        padding: 2px 0;
                        margin-bottom: 10px;
                        text-align: right;
                        font-size: 14px;
                    }
                    .performance tr td
                    {
                        font-size: 12px;
                        padding: 2px 0;
                        text-align: right;
                    }
                    .performance tr td img
                    {
                        margin-bottom: 2px;
                    }
                </style>
                <div>
                    <table style="width: 100%" class="performance">
                        <tr class="header">
                            <th style="text-align: left; width: 100px; padding-left: 10px;">
                                LOAN
                            </th>
                            <th style="width: 190px;">
                                EOP BALANCE
                                <br>
                                (BILLION VND)
                            </th>
                            <th>
                                % MONTH-END
                                <br>
                                TARGET
                            </th>
                            <th>
                                % YEAR-END
                                <br>
                                TARGET
                            </th>
                            <th>
                                % GROWTH
                                <br>
                                TARGET
                            </th>
                            <th>
                                +/- LAST WEEK
                            </th>
                            <th>
                                +/- YOY
                            </th>
                        </tr>
                        <tbody id="tbPerformance1">
                        </tbody>
                    </table>
                </div>
                <div>
                    <table style="width: 100%" class="performance">
                        <tr class="header">
                            <th style="text-align: left; width: 100px; padding-left: 10px;">
                                DEPOSIT
                            </th>
                            <th style="width: 190px;">
                                EOP BALANCE
                                <br>
                                (BILLION VND)
                            </th>
                            <th>
                                % MONTH-END
                                <br>
                                TARGET
                            </th>
                            <th>
                                % YEAR-END
                                <br>
                                TARGET
                            </th>
                            <th>
                                % GROWTH
                                <br>
                                TARGET
                            </th>
                            <th>
                                +/- LAST WEEK
                            </th>
                            <th>
                                +/- YOY
                            </th>
                        </tr>
                        <tbody id="tbPerformance2">
                        </tbody>
                    </table>
                </div>
                <div>
                    <table style="width: 100%" class="performance">
                        <tr class="header">
                            <th style="text-align: left; width: 100px; padding-left: 10px;">
                                CUSTOMER
                            </th>
                            <th style="width: 190px;">
                                EOP CUSTOMER
                            </th>
                            <th>
                                % MONTH-END
                                <br>
                                TARGET
                            </th>
                            <th>
                                % YEAR-END
                                <br>
                                TARGET
                            </th>
                            <th>
                                % GROWTH
                                <br>
                                TARGET
                            </th>
                            <th>
                                +/- LAST WEEK
                            </th>
                            <th>
                                +/- YOY
                            </th>
                        </tr>
                        <tbody id="tbPerformance3">
                        </tbody>
                    </table>
                </div>
            </div>
            <span style="font-style: italic; font-size: 12px; float: left; margin-left: 10px;">Note:
                Numbers have removed bad bank</span>
            <div class="clear">
            </div>
        </div>

        
    </div>
</asp:Content>
