<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/MasterPageAdmin.master" CodeFile="CodeList.aspx.cs" Inherits="pages_report_RequestManagement" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <script src="/js/popup/dg/CodeList.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(function () {
            page_CodeList.documentReady('<%=accountName %>');
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
        .ul-row {
            display: table;
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
                        <li class="text">Field:</li>
                        <li>
                            <select id="ddlFieldSearch" style="width: 141px">
                                <option value="-1" selected="selected">[-- All --]</option>
                            </select>
                        </li>
                        <li class="text">Type:</li>
                        <li>
                            <select id="ddlTypeSearch" style="width: 141px">
                                <option value="-1" selected="selected">[-- All --]</option>
                            </select>
                        </li>
                        <li class="text">Segment:</li>
                        <li>
                            <input type="text" id="txtSegmentSearch" />
                        </li>
                        <li class="text">Status:</li>
                        <li>
                            <select id="ddlStatusSearch" style="width: 141px">
                                <option value="-1" selected="selected">[-- All --]</option>
                                <option value="1">Invalid</option>
                                <option value="2">Valid</option>
                            </select>
                        </li>
                    </ul>
                    <ul>
                        <li class="text ">Requestor:</li>
                        <li>
                            <input type="text" style="width: 100px;" id="txtRequestorSearch" />
                        </li>
                        <li class="text ">From Date:</li>
                        <li>
                            <input type="text" style="width: 100px;" id="txtFromDateSearch" />
                        </li>
                        <li class="text ">To Date:</li>
                        <li>
                            <input type="text" style="width: 100px;" id="txtToDateSearch" />
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
                    <li id="liImportExcel" class="action icon_add">Import Excel</li>
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
                        <th>Code
                        </th>
                        <th>Name
                        </th>
                        <th>Field
                        </th>
                        <th>Type
                        </th>
                        <th>Segment
                        </th>
                        <th>Effective Date
                        </th>
                        <th>Requester
                        </th>
                        <th>Status
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

