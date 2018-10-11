<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Download.aspx.cs" Inherits="pages_report_Download" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>System Report Manager</title>
    <script src="/js/framework/jquery-1.7.2.min.js" type="text/javascript"></script>

    <script type="text/javascript">
        $(function () {
            window.location.href = "/handler/Report.ashx?t=Download&fileName=/<%= fileName %>";
        });
    </script>
</head>
<body>
    <form id="form1" runat="server">
    <div>
    
    </div>
    </form>
</body>
</html>
