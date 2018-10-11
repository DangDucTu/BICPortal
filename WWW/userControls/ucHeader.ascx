<%@ Control Language="C#" AutoEventWireup="true" CodeFile="ucHeader.ascx.cs" Inherits="admin_userControls_ucHeader" %>
<script src="/js/lib/jquery.PrintArea.js" type="text/javascript"></script>
<div class="topbar" style="position: relative">
<script type="text/javascript">
    $(function () {
        $("#myslidemenu ul li").live("click", function () {
            $(this).addClass("abc");
        });
        $("#btnPrint").live('click', function () {
            //window.print();

            var mode = "popup";
            var close = true;
            var extraCss = "";

            var print = "div.dashboard";

            var keepAttr = ["class", "id", "style", "on"];            

            var headElements = '<meta charset="utf-8" />,<meta http-equiv="X-UA-Compatible" content="IE=edge"/>';

            var options = { mode: mode, popClose: close, extraCss: extraCss, retainAttr: keepAttr, extraHead: headElements };

            $(print).printArea(options);
        });
    });
</script>
    <img src="/images/logo_vpb.png" style="height: 68px; float: left; margin-top:1px;" alt="logo" />
    <img src="/images/logo.png" style="height: 40px; float: left; margin: 15px;" alt="logo" />
    <div class="webtitle">        
        <span id="spanWebTitle">Business Intelligence Competency Center</span>
    </div>
    <div style="float: right; padding-right: 8px; margin-top: 0;">
        &nbsp; Hi <span style="font-weight: bold; text-transform: uppercase;" id="spanUserName">
            <%= Utils.AdminUtil.AdminName %></span> member | <%--<a href="javascript:;" onclick="pages_Admin.showPopupChangePass(-1)">
                    Change password</a> |--%> <%--<a href="javascript:__doPostBack('ctl00$ucHeader$lbtLogout','')">Thoát</a>--%>
        <asp:LinkButton ID="lbtLogout" runat="server" Text="Logout" onclick="lbtLogout_Click" /><br />
        <img src="/images/print_icon.gif" id="btnPrint" title="Print" alt="" style="position: absolute; right:0; bottom: 5px; cursor: pointer" />
    </div>    
</div>