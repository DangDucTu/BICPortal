<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPageAdmin.master" AutoEventWireup="true"
    CodeFile="Department.aspx.cs" Inherits="pages_Department" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <script src="/js/popup/Department.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(function () {
            pages_Department.documentReady();
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
                        
                        <li class="text">Status:</li>
                        <li>
                            <select style="width: 100px;" class="select" id="ddlStatus">
                                <option value="-1" selected="selected">[-- All --]</option>
                                <option value="1">Active</option>
                                <option value="0">Lock</option>
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
    <div class="container_data" id="divListWrapper" style="float: left;">
        <div class="header_container">
            <span class="container_text">Department <span style="color: Red" id="spNameDepartment"></span>
            </span>
            <div class="adminBox_Control">
                <ul>
                    <li id="liAddDepartment" class="action icon_add">Add new</li>
                </ul>
            </div>
            <div class="clear">
            </div>
        </div>
        <div class="content" id="divListDerpartment">
            <table border="0" cellpadding="0" cellspacing="0" class="table">
                <thead>
                    <tr>
                        <th style="width: 20px">
                            STT
                        </th>
                        <th style="width: 250px">
                            Name
                        </th>
                        <th style="width: 100px">
                            Manager
                        </th>
                        <th style="width: 80px">
                            Status
                        </th>
                        <th>
                            Choose Function
                        </th>
                    </tr>
                </thead>
                <tbody id="tbListDepartment">
                </tbody>
            </table>            
        </div>
    </div>
    <div class="container_data" id="divListAccount" style="float: left; margin-left: 20px; display: none">
        <div class="header_container">
            <span class="container_text">Member
            </span>
            <div class="adminBox_Control">
                <ul>
                    <li id="liAddMember" class="action icon_add">Add Member</li>
                </ul>
            </div>
            <div class="clear">
            </div>
        </div>
        <div class="content">
            <table border="0" cellpadding="0" cellspacing="0" class="table">
                <thead>
                    <tr>
                        <th style="width: 20px">
                            STT
                        </th>
                        <th style="width: 100px">
                            Account Name
                        </th>
                        <th style="width: 100px">
                            Full Name
                        </th>
                        
                        <th>
                            Remove
                        </th>
                    </tr>
                </thead>
                <tbody id="tbListAccount">
                </tbody>
            </table>            
        </div>
    </div>
</asp:Content>
