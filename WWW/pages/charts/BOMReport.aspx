<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPageAdmin.master" AutoEventWireup="true" CodeFile="BOMReport.aspx.cs" Inherits="pages_charts_BOMReport" %>

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
    <div class="home-page">        
        <div class="box-left" style="width: 100%; background:#eee;">
            <div style="margin-bottom: 20px;">
                <p class="title">BOM Reports</p>
                <table class="tbHome">
                    <tr>
                        <th style="width: 360px; padding-left: 5px;">Name</th>
                        <th style="text-align:center">Format</th>
                        <th style="text-align:center">Frequency</th>
						<%--<th style="text-align:center">Reporting Date</th>--%>
						<th style="text-align:left">Person In Charge (PIC)</th>
                    </tr>
                    <tbody>                               
                        <tr>
                            <td><a href="/weekly-retail-application-pipeline-tat-report">Weekly Retail application pipeline/TAT report</a></td>
                            <td style="text-align:center">Online</td>
                            <td style="text-align:center">Weekly</td>
							<%--<td style="text-align:center">27/09/2014</td>--%>
							<td style="text-align:left"><a href="mailto:phuongmh1@vpbank.com.vn">Mai Huy Phương</a></td>
                        </tr>                                       

                        <tr>
                            <td><a href="/view-excel/retail-monthly">Monthly Retail sales performance report</a> <a style="float: right;font-size: 11px; color: #000;" href="/upload/BICC_Monthly retail sales performance report_20141129.xlsx">Download</a></td>
                            <td style="text-align:center">Excel</td>
                            <td style="text-align:center">Weekly</td>
							<%--<td style="text-align:center">31/07/2014</td>--%>							
                            <td style="text-align:left"><a href="mailto:thuanpn1@vpbank.com.vn">Phạm Ngọc Thuần</a></td>
                        </tr>
                        <tr>
                            <td><a href="/view-excel/sme-monthly">Monthly SME sales performance report</a> <a style="float: right;font-size: 11px; color: #000;" href="/upload/BICC_SME Monthly sales performance report_20141130.xlsb">Download</a></td>
                            <td style="text-align:center">Excel</td>
                            <td style="text-align:center">Weekly</td>
							<%--<td style="text-align:center">31/07/2014</td>--%>
							<td style="text-align:left"><a href="mailto:trangtt6@vpbank.com.vn">Trần Thu Trang</a></td>
                        </tr>

                        <tr>
                            <td><a href="/view-excel/retail">Weekly Retail sales performance report</a> <a style="float: right;font-size: 11px; color: #000;" href="/upload/BICC_Weekly retail sales performance report_20141227.xlsx">Download</a></td>
                            <td style="text-align:center">Excel</td>
                            <td style="text-align:center">Weekly</td>
							<%--<td style="text-align:center">27/09/2014</td>--%>							
                            <td style="text-align:left"><a href="mailto:thuanpn1@vpbank.com.vn">Phạm Ngọc Thuần</a></td>
                        </tr>
                        <tr>
                            <td><a href="/view-excel/sme">Weekly SME sales performance report</a> <a style="float: right;font-size: 11px; color: #000;" href="/upload/BICC_SME Weekly sales performance report_20141227.xlsx">Download</a></td>
                            <td style="text-align:center">Excel</td>
                            <td style="text-align:center">Weekly</td>
							<%--<td style="text-align:center">27/09/2014</td>--%>
							<td style="text-align:left"><a href="mailto:trangtt6@vpbank.com.vn">Trần Thu Trang</a></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
        </div>
        <div class="clear"></div>
    </div>
</asp:Content>



