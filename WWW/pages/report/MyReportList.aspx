<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPageAdmin.master" AutoEventWireup="true" CodeFile="MyReportList.aspx.cs" Inherits="pages_report_MyReportList" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <script src="/js/popup/report/ReportList.js?v=1" type="text/javascript"></script>
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
                        <li class="text">Frequency:</li>
                        <li>
                            <select style="width: 100px;" class="select" id="ddlFrequency">
                                <option value="-1" selected="selected">[-- All --]</option>
                                <option value="1">Daily</option>
                                <option value="2">Weekly</option>
                                <option value="3">Monthly</option>
                                <option value="4">Quarterly</option>
                                <option value="5">Yearly</option>
                                <option value="6">Fortnightly</option>
                                <%--<option value="5">Every 2 weeks</option>
                                <option value="6">Thrice a week</option>
                                <option value="7">End of campaign</option>
                                <option value="8">Half month</option>--%>
                            </select>
                        </li>
                        <li class="text">Status:</li>
                        <li>
                            <select style="width: 120px;" class="select" id="ddlStatus">
                                <option value="1" selected="selected">Ongoing</option>
                                <option value="2">Closed</option>
                            </select>
                        </li>
                    </ul>
                    <div class="clear">
                    </div>
                </div>
            </div>
            <div align="left" class="form_btn" style="display: none">
                <input type="button" id="btnSearchReportList" class="button" value="Search" />
            </div>
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
                    <%--<li id="liExport" class="action icon_add" onclick="javascript:page_ReportList.exportExcel();">Export</li>--%>
                </ul>
            </div>
            <div class="clear">
            </div>
        </div>
        <div class="content" id="divListReportList">
            <table border="0" cellpadding="0" cellspacing="0" class="table" width="100%">
                <thead>
                    <tr>
                        <th style="width: 20px">Order
                        </th>
                        <th style="width: 150px;">Report Code
                        </th>
                        <th style="width: 150px;">Request Id
                        </th>
                        <th style="width: 350px">Report Name
                        </th>
                        <th>Frequency
                        </th>
                        <th>Deadline
                        </th>
                        <th>Type
                        </th>
                        <th>PIC
                        </th>
                        <th>Email Client
                        </th>
                        <th style="width: 20px">
                            <span title="Total Download">TT-DL</span>
                        </th>
                        <th style="width: 100px">Choose Function
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

