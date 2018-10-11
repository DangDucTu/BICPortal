<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPageAdmin.master" AutoEventWireup="true"
    CodeFile="Admin.aspx.cs" Inherits="admin_pages_Admin" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <script src="/js/Admin.js?t=1" type="text/javascript"></script>
    <script type="text/javascript">
        $(function () {
            pages_Admin.pageInit();
        })
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div class="container_data" id="divList">
        <div class="header_container">
            <span class="container_text">Account List <span id="spTotalRecord"></span>
            </span>
            <div class="adminBox_Control">
                <ul>
                    <li>
                        <select id="selPagesize">
                            <option value="20" selected="selected">20 record/page</option>
                            <option value="50">50 record/page</option>
                            <option value="100">100 record/page</option>
                        </select>
                    </li>
                </ul>
            </div>
            <div class="adminBox_Control">
                <ul>
                    <li id="aAdd" class="action icon_add">Add New</li>
                    <%--                   <li id="aEnable" onclick="pages_Admin.changeStatus(-1,1)" class="action icon_active">
                        Hiển thị</li>
                    <li id="aDisable" onclick="pages_Admin.changeStatus(-1,0)" class="action icon_lock">Khóa</li>
                    <li id="aDelete" class="action icon_delete">Xóa</li>--%>
                </ul>
            </div>
            <div class="clear">
            </div>
        </div>
        <div class="content">
            <div>
                <table class="table" width="100%" cellspacing="0" cellpadding="0" border="0">
                    <thead>
                        <tr>
                            <%--          <th class="selected" style="width: 30px">
                                <input type="checkbox" id="checkAll" value="" />
                            </th>--%>
                            <th style="width: 30px">
                                STT
                            </th>
                            <th>
                                Account Name
                            </th>
                            <th>
                                Full Name
                            </th>                            
                            <th style="width: 110px">
                                Status
                            </th>
                            <th style="width: 150px">
                            </th>
                        </tr>
                    </thead>
                    <tbody id="tbList">
                    </tbody>
                </table>
            </div>
            <div class="clear">
            </div>
        </div>
    </div>
</asp:Content>
