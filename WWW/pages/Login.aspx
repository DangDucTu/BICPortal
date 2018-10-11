<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Login.aspx.cs" Inherits="admin_pages_Login" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title>Login System</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <script src="/js/framework/jquery-1.7.2.min.js" type="text/javascript"></script>
    <link href="/css/reset.css" rel="stylesheet" type="text/css" />
    <link href="/css/login.css" rel="stylesheet" type="text/css" />
    <style type="text/css">
        .login
        {
            cursor: pointer;
        }
    </style>
    <script type="text/javascript">
        $(document).ready(function () {
            $("#txtUserName").focus();
            $(".login").hover(function () {
                $(this).addClass('ui-state-hover');
            },
            function () {
                $(this).removeClass('ui-state-hover');
            });
            $("#message-error").click(function () {
                $("#message-error").hide();
            });
        });     

    </script>
</head>
<body>
    <form id="form1" runat="server">
    <div id="login">
        <!-- login -->
        <%--     <div style="padding: 10px 0px 20px 0px;">
        <img src="/images/title_dn.png" />
        </div>--%>
        <div class="title">
            <h5>
                Login</h5>
            <div class="corner tl">
            </div>
            <div class="corner tr">
            </div>
        </div>
        <asp:Panel ID="pnlMessages" runat="server" Visible="false">
            <div class="messages">
                <div id="message-error" class="message message-error">
                    <div class="image">
                        <img src="/images/admin/error.png" alt="Error" height="32" />
                    </div>
                    <div class="text">
                        <h6>
                            Error Login</h6>
                        <span>Fail account name or password </span>&nbsp;</div>
                    <div class="dismiss">
                        <a href="#message-error"></a>
                    </div>
                </div>
            </div>
        </asp:Panel>
        <div class="inner">
            <div class="form">
                <!-- fields -->
                <div class="fields">
                    <div class="field">
                        <div class="label">
                            <label for="username" style="line-height: 20px;">
                                Account Name:</label>
                        </div>
                        <div class="input bg_name">
                            <asp:TextBox ID="txtUserName" runat="server" TabIndex="1" class="focus" Text=""></asp:TextBox>
                        </div>
                    </div>
                    <div class="field">
                        <div class="label">
                            <label for="password" style="line-height: 20px;">
                                Password:</label>
                        </div>
                        <div class="input">
                            <asp:TextBox ID="txtPassword" TextMode="Password" runat="server" TabIndex="2" class="focus" Text="admin"></asp:TextBox>
                        </div>
                    </div>
                    <div class="buttons">                        
                        <asp:Button class="ui-button ui-widget ui-state-default ui-corner-all login" Text="Login"
                            ID="btnLogin" runat="server" OnClick="btnLogin_Click" TabIndex="3" />
                        <%--<a href="/login.aspx?action=forgetpass" style="color: #005FA3; font-family: Arial !important;
                            font-size: 14px !important; padding-left: 10px;">Quên mật khẩu?</a>--%>
                    </div>
                </div>
                <!-- end fields -->
            </div>
        </div>
        <!-- end login -->
    </div>
    </form>
</body>
</html>
