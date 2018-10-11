<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPageAdmin.master" AutoEventWireup="true" CodeFile="FunctionInfo.aspx.cs" Inherits="admin_pages_FunctionInfo" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
    <script src="/Js/pages/FunctionInfo.js" type="text/javascript"></script>
    <script src="/Js/popup/FunctionChooseRole.js" type="text/javascript"></script>
    <script src="/Js/popup/FunctionUpdate.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(function (parameters) {
            Pages_SystemFunctionInfo.documentReady(<%=FunctionId %>);
        });
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">    
    <div class="container_data" id="divInfoWrapper">
        <div class="header_container">
            <span class="container_text">Thông tin Chức năng</span>
            <div class="adminBox_Control">
                <ul>
                    <li id="aAddRole" class="action icon_add">Thêm nhóm người dùng</li>
                    <li id="aUpdateFunction" class="action icon_edit">Sửa thông tin</li>
                </ul>
            </div>
            <div class="clear"></div>
        </div>
        <div class="content">
            <div class="form nl" style="width: 500px;">
                <div class="row">
                    <ul>
                        <li class="text">Chức năng cha:</li>
                        <li class="info" id="lbParentName"></li>
                    </ul>
                    <div class="clear"></div>
                </div>
                <div class="row">
                    <ul>
                        <li class="text">Tên chức năng:</li>
                        <li class="info" id="lbName"></li>
                    </ul>
                    <div class="clear"></div>
                </div>
                <div class="row">
                    <ul>
                        <li class="text">Url:</li>
                        <li class="info" id="lbUrl"></li>
                    </ul>
                    <div class="clear"></div>
                </div>
                <div class="row">
                    <ul>
                        <li class="text">Trạng thái:</li>
                        <li class="info" id="lbStatus"></li>
                    </ul>
                    <div class="clear"></div>
                </div>
                <div class="row">
                    <ul>
                        <li class="text">Hiển thị menu:</li>
                        <li class="info" id="lbShowInMenu"></li>
                    </ul>
                    <div class="clear"></div>
                </div>
                <div class="row">
                    <ul>
                        <li class="text">Thứ tự:</li>
                        <li class="info" id="lbOrder"></li>
                    </ul>
                    <div class="clear"></div>
                </div>                
            </div>
            <div class="form nr" style="width: 500px">
                <table class="table" width="100%">
                    <thead>
                        <tr>
                            <th style="width: 30px">
                                <input type="checkbox" id="CA" class="checkall cbincol">
                            </th>
                            <th>Nhóm chức năng</th>
                            <th style="width: 30px"><a href="javascript:" id="ACA" style="width: 30px; float: right;"
                                        title="Xóa các tài khoản được chọn ra khỏi nhóm">Xóa</a></th>
                        </tr>
                    </thead>
                    <tbody id="tbListRole">
                    </tbody>
                </table>
            </div>
            <div class="clear"></div>
        </div>
    </div>
</asp:Content>

