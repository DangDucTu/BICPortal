<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPageAdmin.master" AutoEventWireup="true"
    CodeFile="Default.aspx.cs" Inherits="pages_Default" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">  
    <style type="text/css">
        .home-page {width: 1180px; margin: 0 auto;}
        .box-left {width: 570px; float: left;}
        .box-right {width: 570px; float: right;}
        .home-page .title {
            background: #dbdddd;
            box-shadow: 1px 1px 3px #999;
            color: #666;
            font-family: Trebuchet MS;
            font-size: 18px;
            padding: 6px;
        }
        .tbHome {width: 100%; margin-top: 5px;}
        .tbHome tr th {
            background: #F1F0EE;
            color: #99afa9;
            padding: 5px 0;
            text-align: left;
            font-size: 14px;
        }
        .tbHome tr td 
        {
            padding: 10px 0 10px 5px;
            text-align: left;
            border-bottom: 1px solid #E1E2E2;
            font-size: 14px;
            color: #777;
            font-family:Trebuchet MS;
        }
        .tbHome tr td a {color: #00adef; font-family: Trebuchet MS;}
        .tbHome tr td a:hover {text-decoration: underline;}
        .tbHome tr td span {float: right; padding-right: 10px; font-size: 12px;}
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div class="home-page" style="display: none">
        <%--<div class="box-left">
            <div class="upcoming-report">
                <p class="title">Upcoming Reports</p>
                <table class="tbHome">
                    <tr>
                        <th style="width: 280px; padding-left: 5px;">Name</th>
                        <th style="text-align:center">Client</th>
                        <th style="text-align:center">Timeline</th>
                        <th style="text-align:center">Frequency</th>
                    </tr>
                    <tbody>   
                        <tr>
                            <td>Collection report</td>                            
                            <td style="text-align:center">Retail BOM</td>
                            <td style="text-align:center">10/08/2014</td>
                            <td style="text-align:center">Monthly</td>
                        </tr>  
                        <tr>
                            <td>ENR, NPL, and Provision report</td>
                            <td style="text-align:center">Retail BOM</td>
                            <td style="text-align:center">15/08/2014</td>
                            <td style="text-align:center">Daily</td>
                        </tr> 
                        <tr>
                            <td>Origination report</td>
                            <td style="text-align:center">Retail BOM</td>
                            <td style="text-align:center">22/08/2014</td>
                            <td style="text-align:center">Monthly</td>
                        </tr>
                        <tr>
                            <td>Sales Effectiveness MIS</td>
                            <td style="text-align:center">Retail BOM</td>
                            <td style="text-align:center">15/09/2014</td>
                            <td style="text-align:center">Weekly</td>
                        </tr>                     
                    </tbody>
                </table>
            </div>
        </div>--%>
        <div class="box-right" style="width: 700px; float: left; background:#eee;">
            <div class="upcoming-report" id="upcomingReport" runat="server" style="margin-bottom: 20px;">
                <p class="title">New Released Reports</p>
                <table class="tbHome">
                    <tr>
                        <th style="width: 360px; padding-left: 5px;">Name</th>
                        <th style="text-align:center">Format</th>
                        <th style="text-align:center">Client</th>
                        <th style="text-align:center">Frequency</th>
                    </tr>
                    <tbody>
                        <%--<tr>
                            <td><a href="/transformation-metrics">Transformation Metrics</a></td>
                            <td style="text-align:center">Online</td>
                            <td style="text-align:center">CEO</td>
                            <td style="text-align:center">Monthly</td>
                        </tr>--%>
                        <tr>
                            <td><a href="/weekly-retail-application-pipeline-tat-report">Weekly retail application pipeline/TAT report</a></td>
                            <td style="text-align:center">Online</td>
                            <td style="text-align:center">CEO</td>
                            <td style="text-align:center">Weekly</td>
                        </tr>
                        <%--<tr>
                            <td><a href="/weekly-ceo-dashboard">Weekly CEO dashboard</a></td>
                            <td style="text-align:center">Online</td>
                            <td style="text-align:center">CEO</td>
                            <td style="text-align:center">Weekly</td>
                        </tr>   --%> 
                        
                        <tr>
                            <td><a href="/view-excel/retail-monthly">Monthly Retail sales performance report</a> <a style="float: right;font-size: 11px; color: #000;" href="/upload/BICC_Monthly retail sales performance report_20141031.xlsx">Download</a></td>
                            <td style="text-align:center">Excel</td>
                            <td style="text-align:center">CEO</td>
                            <td style="text-align:center">Monthly</td>
                        </tr>
                        <tr>
                            <td><a href="/view-excel/sme-monthly">Monthly SME sales performance report</a> <a style="float: right;font-size: 11px; color: #000;" href="/upload/BICC_SME Monthly sales performance report_20141130.xlsb">Download</a></td>
                            <td style="text-align:center">Excel</td>
                            <td style="text-align:center">CEO</td>
                            <td style="text-align:center">Monthly</td>
                        </tr>
                                  
                        <tr>
                            <td><a href="/view-excel/retail">Weekly Retail sales performance report</a> <a style="float: right;font-size: 11px; color: #000;" href="/upload/BICC_Weekly retail sales performance report_20141129.xlsx">Download</a></td>
                            <td style="text-align:center">Excel</td>
                            <td style="text-align:center">CEO</td>
                            <td style="text-align:center">Weekly</td>
                        </tr>
                        <tr>
                            <td><a href="/view-excel/sme">Weekly SME sales performance report</a> <a style="float: right;font-size: 11px; color: #000;" href="/upload/BICC_SME Weekly sales performance report_20141129.xlsx">Download</a></td>
                            <td style="text-align:center">Excel</td>
                            <td style="text-align:center">CEO</td>
                            <td style="text-align:center">Weekly</td>
                        </tr>  
						<%--<tr>
                            <td><a href="/retail-sales-productivity">Retail sales productivity</a></td>   
                            <td style="text-align:center">Online</td>                         
                            <td style="text-align:center">CEO</td>
                            <td style="text-align:center">Monthly</td>
                        </tr> --%>						
                    </tbody>
                </table>
            </div>
            <%--<div class="event">
                <p class="title">Events</p>
                <table class="tbHome">
                    <tr>
                        <th style="width: 280px; padding-left: 5px;">Name</th>
                        <th>Place</th>
                        <th>Date</th>
                    </tr>
                    <tbody>
                        <tr>
                            <td>Team Buiding</td>
                            <td>Nhà hàng</td>
                            <td>25/07/2014</td>
                        </tr>
                        <tr>
                            <td>Chia sẻ kinh nghiệm</td>
                            <td>Phòng họp</td>
                            <td>19/07/2014</td>
                        </tr>
                        <tr>
                            <td>Du lịch biển Thiên Cầm</td>
                            <td>Cẩm Xuyên - Hà Tĩnh</td>
                            <td>19/06/2014</td>
                        </tr>
                    </tbody>
               </table>
            </div>--%>
        </div>
        <div class="clear"></div>
    </div>
</asp:Content>
