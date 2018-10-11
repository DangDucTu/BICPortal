<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPageAdmin.master" AutoEventWireup="true" CodeFile="Role.aspx.cs" Inherits="admin_pages_Role" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <script src="/js/pages/Role.js" type="text/javascript"></script>
    <script src="/js/popup/RoleUpdate.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(function (parameters) {
            Pages_SystemRole.documentReady();
        });
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">    
    <div class="container_data" id="divListWrapper">
        <div class="header_container">
            <span class="container_text">Group Function</span>
            <div class="adminBox_Control">
                <ul> 
                    <li id="liAddRole" class="action icon_add">Add New</li>
                </ul>
            </div>
            <div class="clear">
            </div>
        </div>
        <div class="content" id="divRoleList">
        </div>
    </div>
</asp:Content>


