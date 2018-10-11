<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPageAdmin.master" AutoEventWireup="true" CodeFile="KeyIdicator.aspx.cs" Inherits="pages_charts_KeyIdicator" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <script src="/js/popup/dashboard/KeyIndicator.js?v=1" type="text/javascript"></script>
    <script type="text/javascript">
        $(function () {
            pages_KeyIndicator.documentReady('<%=account %>');
        });
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="divSearch" class="container_data">
        <div class="header_container">
            <span class="container_text">Search</span>
            <div class="clear">
            </div>
        </div>
        <div class="content">
            <div class="form">
                <div class="row">
                    <ul>
                        <li class="text">YEAR:</li>
                        <li>
                            <select id="ddlYear" style="width: 100px">                               
                                <option value="2015">2015</option>
                                <option value="2014">2014</option>                                
                            </select>                            
                        </li> 
                        <li class="text">PIC:</li>
                        <li>
                            <select id="ddlPic" style="width: 150px">
                                <option value="">[-- All --]</option>
                                <option value="anhcp">anhcp</option>
                                <option value="daott">daott</option>
                                <option value="giangpt3">giangpt3</option>
                                <option value="huyenln">huyenln</option>
                                <option value="kieuanh">kieuanh</option>
                                <option value="khanhntb">khanhntb</option>
                                <option value="phuongmh1">phuongmh1</option>
                            </select>                            
                        </li> 
                    </ul>
                    <div class="clear">
                    </div>
                </div>
            </div>
            <div class="clear">
            </div>
        </div>
    </div>
    <div class="container_data" id="divListWrapper">
        <div class="header_container">
            <span class="container_text">KEY INDICATOR
            </span>
            <div class="adminBox_Control">
                <ul>
                    <%--<li id="liAddIndicator" class="action icon_add">Add new</li>
                    <li id="liExport" class="action icon_add" onclick="javascript:page_ReportList.exportExcel();">Export</li>--%>
                </ul>
            </div>
            <div class="clear">
            </div>
        </div>
        <div class="content" id="divListReportList">
            <table border="0" cellpadding="0" cellspacing="0" class="table" width="100%">
                <thead>
                    <tr>
                        <th style="width: 20px">
                            Order
                        </th>
                        <th style="width: 220px;">
                            Indicator
                        </th>
                        <th>
                            Unit
                        </th>                        
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
                        <th>PIC</th>
                        <th>Deadline</th>
                    </tr>
                </thead>
                <tbody id="tbListKeyIndicator">
                </tbody>
            </table>
            <%--<div class="clear">
            </div>
            <div class="form_btn" id="divPaging" style="display: none">
                <div class="clear">
                </div>
            </div>--%>
        </div>
    </div>
</asp:Content>

