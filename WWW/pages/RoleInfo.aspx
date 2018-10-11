<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPageAdmin.master" AutoEventWireup="true" CodeFile="RoleInfo.aspx.cs" Inherits="admin_pages_RoleInfo" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
    <script src="/js/pages/RoleInfo.js" type="text/javascript"></script>
    <script src="/js/popup/RoleUpdate.js" type="text/javascript"></script>
    <script src="/js/popup/ChooseAdmin.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(function(parameters) {
            Pages_SystemRoleInfo.documentReady(<%=RoleId%>);
        });
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server"> 
    <div class="container_data" id="divListWrapper">
        <div class="header_container">
            <span class="container_text">Info group function</span>
            <div class="adminBox_Control">
                <ul>
                    <li id="aAddAdmin" class="action icon_add">Add User</li>
                    <li id="aUpdateRole" class="action icon_edit">Edit Info</li>
                </ul>
            </div>
            <div class="clear"></div>
        </div>
        <div class="content">
            <div class="form nl" style="width: 500px">
                <div class="row">
                    <ul>
                        <li class="text" style="width: 80px;min-width: 80px;">Group Name:</li>
                        <li class="info" style="width: 265px;" id="lbName"></li>
                    </ul>
                    <div class="clear"></div>
                </div>
                <div class="row">                
                    <ul>
                        <li class="text" style="width: 80px;min-width: 80px;">Description:</li>
                        <li class="info" style="width: 265px;" id="lbDescription"></li>
                    </ul>
                    <div class="clear"></div>
                </div>
                <div class="row">
                    <ul>
                        <li class="text" style="width: 80px;min-width: 80px;">Status:</li>
                        <li class="info" id="lbStatus"></li>
                    </ul>
                    <div class="clear"></div>
                </div>
                <div class="row">
                    <ul>
                        <li class="text" style="width: 80px;min-width: 80px;">Created Date:</li>
                        <li class="info" id="lbCreateDate"></li>
                    </ul>
                    <div class="clear"></div>
                </div>
            </div>
            <div class="form nr" style="width: 350px">
                <table class="tableNb" style="width: 100%">
                    <thead>
                        <tr>
                            <th style="padding:9px 3px 6px 5px">Role User</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding: 0px;" id="DivListFunction">
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="form nr" style="width: 300px">
                <table class="table" width="100%">
                    <thead>
                        <tr>
                            <th style="width: 25px">
                                <input type="checkbox" id="CA" class="checkall cbincol"/>
                            </th>
                            <th>Account List</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody id="tbAccountList">
                        
                    </tbody>
                </table>
            </div>
            <div class="clear"></div>
        </div>
    </div>
</asp:Content>
