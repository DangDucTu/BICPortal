<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPageAdmin.master" AutoEventWireup="true"
    CodeFile="Function.aspx.cs" Inherits="admin_pages_Function" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <script src="/js/pages/Function.js" type="text/javascript"></script>
    <script src="/js/popup/FunctionUpdate.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(function (parameters) {
            Pages_SystemFunction.documentReady();
        });
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">    
    <div class="container_data" id="divListWrapper">
        <div class="header_container">
            <span class="container_text">Functions</span>
            <div class="adminBox_Control">
                <ul>
                    <li id="liAddFunction" class="action icon_add">Add New</li>
                </ul>
            </div>
            <div class="clear">
            </div>
        </div>
        <div class="content" id="divListFunction">
            <table border="0" cellpadding="0" cellspacing="0" class="table" width="100%">
                <thead>
                    <tr>
                        <th style="width: 30px">
                            STT
                        </th>
                        <th style="width: 350px">
                            Name Function
                        </th>
                        <th>
                            Url
                        </th>
                        <th style="width: 80px">
                            Show Menu
                        </th>
                        <th style="width: 80px">
                            Status
                        </th>
                        <th style="width: 155px">
                            Choose Function
                        </th>
                    </tr>
                </thead>
                <tbody id="tbFunctionList">
                </tbody>
            </table>
        </div>
    </div>
</asp:Content>
