<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPageAdmin.master" AutoEventWireup="true"
    CodeFile="SmeIncentivePayout.aspx.cs" Inherits="pages_charts_SmeIncentivePayout" %>

<%@ Register Assembly="DevExpress.XtraCharts.v13.1.Web, Version=13.1.4.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a"
    Namespace="DevExpress.XtraCharts.Web" TagPrefix="dxchartsui" %>
<%@ Register assembly="DevExpress.XtraCharts.v13.1, Version=13.1.4.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" namespace="DevExpress.XtraCharts" tagprefix="cc1" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <script src="/js/popup/dashboard/SmeIncentive.js" type="text/javascript"></script>
    <link href="/css/dashboard.css?v=1" rel="stylesheet" type="text/css" />
    <link href="/css/sme-incentive.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript">
        $(function () {
            page_SmeIncentive.documentReady();
        });
    </script>
    
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div class="dashboard">
        <div style="border-bottom: 1px solid #666; position: relative;">
            <p class="title-das" style="float: left; font-size: 25px; padding-top: 1px;">
                SME INCENTIVE PAYOUT DASHBOARD (Position MBO/SBO)
                
            </p>
            <div class="filter">
            <asp:DropDownList ID="ddlMonth" runat="server" AutoPostBack="true" 
                onselectedindexchanged="ddlMonth_SelectedIndexChanged">
                <asp:ListItem Value="1">Jan</asp:ListItem>
                <asp:ListItem Value="2">Feb</asp:ListItem>
                <asp:ListItem Value="3">Mar</asp:ListItem>
                <asp:ListItem Value="4">Apr</asp:ListItem>
                <asp:ListItem Value="5">May</asp:ListItem>
                <asp:ListItem Value="6">Jun</asp:ListItem>
                <asp:ListItem Value="7">Jul</asp:ListItem>
                <asp:ListItem Value="8">Aug</asp:ListItem>
                <asp:ListItem Value="9">Sep</asp:ListItem>
                <asp:ListItem Value="10">Oct</asp:ListItem>
                <asp:ListItem Value="11">Nov</asp:ListItem>
                <asp:ListItem Value="12">Dec</asp:ListItem>
            </asp:DropDownList>
            <select style="float: right; margin-right: 5px;" id="ddlYear">
                <option value="2014">2014</option>
            </select>
            <span style="float: right; font-size: 14px; margin: 3px 10px 0 0; font-style: italic;">Unit: Million VND</span>
            <div class="clear">
            </div>
        </div>
            <div class="clear">
            </div>
        </div>
        
        <div style="padding: 5px 0; position: relative; margin-top: 2px; border: 2px solid #333">
            <table class="overview">
                <tr>
                    <th rowspan="2" class="left">
                        FOR THE
                        <br />
                        SELECTED MONTH
                    </th>
                    <th>
                        YTM Incentive
                    </th>
                    <th>
                        Incentive
                    </th>
                    <th>
                        #Salesman
                    </th>
                    <th>
                        #Eligible salesman
                    </th>
                </tr>
                <tr>
                    <td id="overview1">
                    </td>
                    <td id="overview2">
                    </td>
                    <td id="overview3">
                    </td>
                    <td id="overview4">
                    </td>
                </tr>
            </table>
        </div>
        <table class="tb-by-month-title">
            <tr>
                <th>
                    Month
                </th>
            </tr>
            <tr>
                <td>
                    Total Incentive
                </td>
            </tr>
            <tr class="even">
                <td>
                    # Salesman
                </td>
            </tr>
            <tr>
                <td>
                    # Eligible salesman
                </td>
            </tr>
            <tr class="even">
                <td>
                    % Eligible salesman
                </td>
            </tr>
            <tr>
                <td>
                    Average Incentive/Salesman
                </td>
            </tr>
            <tr class="even">
                <td>
                    Average Incentive/Eligible salesman
                </td>
            </tr>
        </table>
        <table class="tb-by-month">
            <tr>
                <th>
                    Jan
                </th>
                <th>
                    Feb
                </th>
                <th>
                    Mar
                </th>
                <th>
                    Apr
                </th>
                <th>
                    May
                </th>
                <th>
                    Jun
                </th>
                <th>
                    Jul
                </th>
                <th>
                    Aug
                </th>
                <th>
                    Sep
                </th>
                <th>
                    Oct
                </th>
                <th>
                    Nov
                </th>
                <th>
                    Dec
                </th>
            </tr>
            <tbody id="tbIncentiveByMonth">
            </tbody>
        </table>
        <div class="clear">
        </div>
        <div class="incentive" style="margin-top: 5px;">
            <div style="float: left">
                <dxchartsui:WebChartControl ID="incentiveByRegion" Width="585px" Height="250px" runat="server">
                </dxchartsui:WebChartControl>
            </div>
            <div style="float: right">
                <dxchartsui:WebChartControl ID="incentiveByPosition" Width="585px" Height="250px" runat="server">
                </dxchartsui:WebChartControl>
            </div>
            <div class="clear">
            </div>
        </div>
        <div class="incentive-bottom">
            <p style="padding:0 0 5px 0; font-size: 12px;">Top 5 Salesman By Point Incentive</p>
            <div style="width: 585px; float: left;">                
                <table class="tb-top-5">
                    <tr>
                        <th style="width: 200px;">
                            Salesman
                        </th>
                        <th>
                            Branch
                        </th>
                        <th>
                            Zone
                        </th>
                        <th>
                            Title
                        </th>
                        <th style="width: 100px;">
                            Point
                            <br />
                            Incentive
                        </th>
                    </tr>
                    <tbody id="tbTopByPoint">
                    </tbody>
                </table>

                <p style="padding:0 0 5px 0; font-size: 12px;">Top 5 Salesman By Increasing Point Incentive</p>
                <table class="tb-top-5">
                    <tr>
                        <th style="width: 200px;">
                            Salesman
                        </th>
                        <th>
                            Branch
                        </th>
                        <th>
                            Zone
                        </th>
                        <th>
                            Title
                        </th>
                        <th style="width: 100px;">
                            Increasing <br />
                            Point
                            <br />
                            Incentive
                        </th>
                    </tr>
                    <tbody id="tbTopByIncreasingPoint">
                    </tbody>
                </table>
            </div>
            <div style="width: 585px; float: right;">
                <dxchartsui:WebChartControl ID="productContribution" Width="585px" Height="317px" runat="server">
                </dxchartsui:WebChartControl>
            </div>
            <div class="clear"></div>
        </div>

        <p style="padding:0; font-weight: bold; margin-top: -10px; font-size: 12px; font-style: italic;">Based on the Policy 51/2014/QĐi-TGD - 01/01/2014</p>
    </div>
</asp:Content>
