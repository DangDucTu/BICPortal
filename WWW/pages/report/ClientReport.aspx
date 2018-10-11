<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPageAdmin.master" AutoEventWireup="true" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <script src="/js/popup/report/ReportClient.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(function () {
            page_ClientReport.documentReady();
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
                        <%--<li class="text">Report Name:</li>
                        
                        <li>
                            <input type="text" id="txtReportName" />
                        </li> --%> 
                        
                        <li class="text">Frequency:</li>        
                        <li>
                            <select style="width: 141px;" class="select" id="ddlFrequency">
                                <option value="-1" selected="selected">[-- All --]</option>
                                <option value="1">Daily</option>
                                <option value="2">Weekly</option>
                                <option value="3">Monthly</option>
                                <option value="4">One-off</option>                                
                            </select>
                        </li>

                        <%--<li class="text">PIC:</li>
                        <li>
                            <input type="text" id="txtAccountName" />
                        </li>--%>
                         
                        <%--<li class="text">Status:</li>
                        <li>
                            <select style="width: 120px;" class="select" id="ddlStatus">
                                <option value="-1">[-- All --]</option>
                                <option value="0">On Going</option>
                                <option value="4" selected="selected">Complete</option> 
                                <option value="1">&nbsp;&nbsp;On Time</option>                                                               
                                <option value="3">&nbsp;&nbsp;Overtime</option>
                                <option value="2">Not Complete</option>
                            </select>
                        </li>--%>

                        <li class="text liDate">From Date:</li>     
                         <li class="liDate">
                            <input type="text" id="txtFromDate" />
                        </li>
                        <li class="text liDate">To Date:</li>     
                         <li class="liDate">
                            <input type="text" id="txtToDate" />
                        </li>
                    </ul>

                    <div class="clear">
                    </div>
                </div>
            </div>
            <div align="left" class="form_btn">
                <input type="button" id="btnSearch" class="button" value="Search" /></div>
            <div class="clear">
            </div>
        </div>
    </div>
    <div class="container_data" id="divListWrapper">
        <div class="header_container">
            <span class="container_text">View Report (<span id="spTotalRecord"></span>)
            </span>
            <%--<div class="adminBox_Control">
                <ul>
                    <li id="liExport" class="action icon_add" onclick="javascript:page_ClientReport.exportExcel();">Export</li>
                </ul>
            </div>            
            <div class="clear">
            </div>--%>
        </div>
        <div class="content" id="divListReport">
            <table border="0" cellpadding="0" cellspacing="0" class="table" width="100%">
                <thead>
                    <tr>
                        <th style="width: 20px">
                           Order
                        </th>
                        <th>
                           Report Code
                        </th>
                        <th>
                           Report Name
                        </th>
                        <%--<th>
                           Department
                        </th>--%>
                        <th>
                            Frequency
                        </th>
                        <th>
                            PIC
                        </th>                        
                        <th>
                            Deadline
                        </th>                        
                        <%--<th>
                            Upload By
                        </th>--%>
                        <th>
                            Date Upload
                        </th>
                        <th>
                            Status
                        </th>
                        <th style="width: 60px">
                            Download
                        </th>
                    </tr>
                </thead>
                <tbody id="tbListReport">
                </tbody>
            </table>
            <div class="clear">
            </div>
            <div class="form_btn" id="divPaging" style="display: none">
                <div class="clear">
                </div>
            </div>
        </div>
    </div>
</asp:Content>

