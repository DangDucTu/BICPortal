<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/MasterPageAdmin.master" CodeFile="RequestManagement.aspx.cs" Inherits="pages_report_RequestManagement" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <script src="/js/popup/report/RequestReportList.js?v=1" type="text/javascript"></script>
    <script type="text/javascript">
        $(function () {
            page_ReportList.documentReady('<%=accountName %>');
        });
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <style type="text/css">
        .p-create-report {
            padding: 3px 0 0 0;
            font-size: 12px;
            font-weight: normal;
        }
    </style>
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
                        <li class="text">Code/Name:</li>
                        <li>
                            <input type="text" id="txtReportName1" />                            
                        </li> 
                        <li class="text liDate">Received From:</li>
                        <li class="liDate">
                            <input type="text" style="width: 100px;" id="txtFromDate" />
                        </li>
                        <li class="text liDate">Received To:</li>
                        <li class="liDate">
                            <input type="text" style="width: 100px;" id="txtToDate" />
                        </li>
                        <li class="text">Department:</li>
                        <li>
                            <select id="ddlDepartment" style="width: 141px">
                                <option value="-1" selected="selected">[-- All --]</option>
                            </select>
                        </li>
                        <li class="text">PIC:</li>
                        <li>
                            <select style="width: 120px;" class="select" id="ddlPIC">
                                <option value="" selected="selected">[-- All --]</option>
                            </select>
                        </li>                           
                        <li class="text">Status:</li>
                        <li>
                              <select style="width: 120px;" class="select" id="ddlStatus">
                                <option value="-1">--Choose status--</option>
                                <option value="1">Rejected</option>
                                <option value="2">Canceled</option>
                                <option value="3">Under discussion – Client</option>
                                <option value="4">Under discussion – BICC</option>
                                <option value="5">Code writing</option>
                                <option value="6">Report finalization</option>
                                <option value="7">Completed</option>
                            </select>
                        </li>
                    </ul>
                    <div class="clear">
                    </div>
                </div>
            </div>
            <div align="left" class="form_btn" style="display: none">
                <input type="button" id="btnSearchReportList" class="button" value="Search" /></div>
            <div class="clear">
            </div>
        </div>
    </div>
    <div class="container_data" id="divListWrapper">
        <div class="header_container">
            <span class="container_text">REPORT LIST
            </span>
            <div class="adminBox_Control">
                <ul>
                    <li id="liAddReportList" class="action icon_add">Add new</li>
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
                        <th>
                            Request Id
                        </th>
                        <th>
                            Request Name
                        </th>
                        <th>
                            Client Email
                        </th>                        
                        <th>
                            Client Division
                        </th>
                        <th>
                            PIC
                        </th>
                        <th>
                            Department
                        </th>
                        <th>
                            Type
                        </th>                        
                        <th>
                            Received Date
                        </th>
                        <th>
                            Status
                        </th>
                        <th>
                            Delivery Date
                        </th>
                        <th>
                            Sending Type
                        </th>
                        <th>
                            Report Code
                        </th>
                        <th style="width: 100px">
                            Choose Function
                        </th>
                    </tr>
                </thead>
                <tbody id="tbListReportList">
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

