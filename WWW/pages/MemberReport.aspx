<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPageAdmin.master" AutoEventWireup="true"
    CodeFile="MemberReport.aspx.cs" Inherits="pages_MemberReport" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">

    <script src="/js/lib/ZeroClipboard.js" type="text/javascript"></script>
    <script src="/js/popup/MemberReport.js?v=1" type="text/javascript"></script>


    <script type="text/javascript">
        $(function () {
            page_MemberReport.documentReady();
        });
    </script>
    <style type="text/css">
        .form .row ul > li.text {
            width: 90px !important;
        }
    </style>
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
                        <li class="text liDate">Code/Name:</li>
                        <li class="liDate">
                            <input type="text" id="txtCodeName" />
                        </li>
                        <li class="text liDate">From Date:</li>
                        <li class="liDate">
                            <input type="text" style="width: 100px;" id="txtFromDate" />
                        </li>
                        <li class="text liDate">To Date:</li>
                        <li class="liDate">
                            <input type="text" style="width: 100px;" id="txtToDate" />
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
                                <option value="7">Semi-annual</option>
                            </select>
                        </li>
                        <li class="text">Status:</li>
                        <li>
                            <select style="width: 100px;" class="select" id="ddlStatus">
                                <option value="-1">[-- All --]</option>
                                <option value="0">Ongoing</option>
                                <option value="4">Completed</option>
                                <option value="1">&nbsp;&nbsp;On Time</option>
                                <option value="3">&nbsp;&nbsp;Delay</option>
                                <option value="2">Pending</option>
                            </select>
                        </li>

                        <li class="text" style="display: none">Backup:</li>
                        <li>
                            <select style="width: 100px; display: none" class="select" id="ddlBackup">
                                <option value="0">MY REPORT</option>
                                <option value="1">BACKUP</option>
                            </select>
                        </li>
                        <div class="clear">
                        </div>
                    </ul>
                </div>
            </div>
            <div align="left" class="form_btn">
                <input type="button" id="btnSearch" class="button" value="Search" />
            </div>
            <div class="clear">
            </div>
        </div>
    </div>
    <div class="container_data" id="divListWrapper">
        <div class="header_container">
            <span class="container_text">Report (<span id="spTotalRecord"></span>) </span>
        </div>
        <div class="content" id="divListReport">
            <table border="0" cellpadding="0" cellspacing="0" class="table" width="100%">
                <thead>
                    <tr>
                        <th style="width: 20px">Order
                        </th>
                        <th>Report Code
                        </th>
                        <th>Report Name
                        </th>
                        <th>Frequency
                        </th>
                        <th>Deadline
                        </th>
                        <th>Type
                        </th>
                        <th>Upload By
                        </th>
                        <th>Date Upload
                        </th>
                        <th>Status
                        </th>
                        <th style="width: 100px">Choose Function
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
