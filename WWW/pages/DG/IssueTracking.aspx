<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPageAdmin.master" AutoEventWireup="true" CodeFile="IssueTracking.aspx.cs" Inherits="pages_DG_IssueTracking" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <script src="/js/popup/dg/IssueTracking.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(function () {
            page_IssueTracking.documentReady('<%=accountName %>');
        });
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <style>
        .p-create-report {
            padding: 3px 0 0 0;
            font-size: 12px;
            font-weight: normal;
        }

        .ul-row {
            display: table;
        }

        .text-info {
            font-weight: bold;
            padding-right: 4px;
            padding-top: 8px;
            /*width: 105px;*/
            text-align: right;
            font-family: Tahoma;
            font-size: 11px;
        }

        .have_change {
            color: red;
        }

        .text-scroll {
            overflow-y: scroll;
            max-height: 80px;
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
                    <ul class="ul-row">
                        <li class="text liDate">Division:</li>
                        <li class="liDate">
                            <select style="width: 100px;" class="select" id="ddlSearchDivision">
                                <option value="-1" selected="selected">[-- All --]</option>
                            </select>
                        </li>
                        <li class="text">Status:</li>
                        <li>
                            <select style="width: 100px;" class="select" id="ddlSearchStatus">
                                <option value="-1" selected="selected">[-- All --]</option>
                                <option value="1">Under discussion</option>
                                <option value="2">Implementing solution</option>
                                <option value="3">Finished on time</option>
                                <option value="4">Finished late</option>
                                <option value="5">Pending at discussion</option>
                                <option value="6">Pending at implementation</option>
                            </select>
                        </li>
                        <li class="text">PIC from BU/SU:</li>
                        <li>
                            <input style="width: 100px;" type="text" id="txtSearchPicBu" />
                        </li>
                        <li class="text">PIC form BICC:</li>
                        <li>
                            <select style="width: 100px;" class="select" id="ddlSearchPicBICC">
                                <option value="-1" selected="selected">[-- All --]</option>
                            </select>
                        </li>
                    </ul>
                    <ul>
                        <li class="text liDate">From Date:</li>
                        <li class="liDate">
                            <input style="width: 100px;" type="text" id="txtFromDate" />
                        </li>
                        <li class="text liDate">To Date:</li>
                        <li class="liDate">
                            <input style="width: 100px;" type="text" id="txtToDate" />
                        </li>
                        <li class="text">Data issue code:</li>
                        <li>
                            <input style="width: 100px;" type="text" id="txtSearchIssueCode" />
                        </li>
                    </ul>
                    <div class="clear">
                    </div>
                </div>
            </div>
            <div align="left" class="form_btn">
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
                    <li id="liExport" class="action icon_add" onclick="javascript:page_ReportList.exportExcel();">Export</li>
                </ul>
            </div>
            <div class="clear">
            </div>
        </div>
        <div class="content" id="divListReportList">
            <table border="0" cellpadding="0" cellspacing="0" class="table" width="100%">
                <thead>
                    <tr>
                        <th>Order
                        </th>
                        <th>Data issue code
                        </th>
                        <th>Division
                        </th>
                        <th>Summary
                        </th>
                        <th>Issue Status
                        </th>
                        <th>Current assignee
                        </th>
                        <th>Creation date
                        </th>
                        <th>Est. deadline
                        </th>
                        <th>Finish date
                        </th>
                        <th>Pending days
                        </th>
                        <th>BIC PIC
                        </th>
                        <th>BU PIC
                        </th>
                        <th>Updating status
                        </th>
                        <th>Update time
                        </th>
                        <th>Update by
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

