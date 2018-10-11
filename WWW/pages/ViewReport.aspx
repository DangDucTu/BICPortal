<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPageAdmin.master" AutoEventWireup="true"
    CodeFile="ViewReport.aspx.cs" Inherits="pages_ViewReport" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <script src="/js/popup/ViewReport.js?v=1" type="text/javascript"></script>
    <script type="text/javascript">
        $(function () {
            page_ViewReport.documentReady();
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
                            <input style="width: 100px;" type="text" id="txtFromDate" />
                        </li>
                        <li class="text liDate">To Date:</li>     
                         <li class="liDate">
                            <input style="width: 100px;" type="text" id="txtToDate" />
                        </li>

                        <li class="text">Department:</li>
                        <li>
                            <select id="ddlDepartment" style="width: 100px">
                                <option value="0">[-- All --]</option>
                            </select>
                        </li>
                        <li class="text">Frequency:</li>        
                        <li>
                            <select style="width: 100px;" class="select" id="ddlFrequency">
                                <option value="-1" selected="selected">[-- All --]</option>
                                <option value="1">DAILY</option>
                                <option value="2">WEEKLY</option>
                                <option value="3">MONTHLY</option>
                                <option value="4">ONE-OFF</option>
                                <option value="5">REALTIME</option>
                            </select>
                        </li>

                        <li class="text">Status:</li>
                        <li>
                            <select style="width: 100px;" class="select" id="ddlStatus">
                                <option value="-1">[-- All --]</option>
                                <option value="0">Ongoing</option>
                                <option value="4">Completed</option> 
                                <option value="1">&nbsp;&nbsp;Ontime</option>                                                               
                                <option value="3">&nbsp;&nbsp;Delay</option>
                                <option value="2">Pending</option>
                            </select>
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
            <div class="adminBox_Control">
                <ul>
                    <li id="liExport" class="action icon_add" onclick="javascript:page_ViewReport.exportExcel();">Export</li>
                </ul>
            </div>            
            <div class="clear">
            </div>
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
                        <th>
                           Department
                        </th>
                        <th>
                            Frequency
                        </th>                        
                        <th>
                            Deadline
                        </th>
                        <th>
                            PIC
                        </th>
                        <th>
                            Upload By
                        </th>
                        <th>
                            Date Upload
                        </th>
                        <th>
                            Status
                        </th>
                        <th>
                            
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
