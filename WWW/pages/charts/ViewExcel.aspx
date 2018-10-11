<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPageAdmin.master" AutoEventWireup="true" CodeFile="ViewExcel.aspx.cs" Inherits="pages_charts_ViewExcel" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
    <script type="text/javascript">
        $(function () {
            var t = '<%=t %>';
            if (t == 'sme')
                $("#view-excel").html('<iframe src="https://onedrive.live.com/embed?cid=5C6EBBD962DEBFF0&resid=5C6EBBD962DEBFF0%21580&authkey=AM5Zok_4NBv3OWc&em=2" width="100%" height="520" frameborder="0" scrolling="no"></iframe>');
            else if (t == 'retail')
                $("#view-excel").html('<iframe src="https://onedrive.live.com/embed?cid=5C6EBBD962DEBFF0&resid=5C6EBBD962DEBFF0%21579&authkey=AGqHnWlwOD-Q-Ew&em=2" width="100%" height="520" frameborder="0" scrolling="no"></iframe>');
            else if (t == 'sme-monthly')
                $("#view-excel").html('<iframe src="https://onedrive.live.com/embed?cid=5C6EBBD962DEBFF0&resid=5C6EBBD962DEBFF0%21542&authkey=AKp-UZk3qUfgiKQ&em=2" width="100%" height="520" frameborder="0" scrolling="no"></iframe>');
            else if (t == 'retail-monthly')
                $("#view-excel").html('<iframe src="https://onedrive.live.com/embed?cid=5C6EBBD962DEBFF0&resid=5C6EBBD962DEBFF0%21558&authkey=ALyjxAfNDhhDP5E&em=2" width="100%" height="520" frameborder="0" scrolling="no"></iframe>');
        });
    </script>    
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
    <div id="view-excel"></div>   
</asp:Content>

