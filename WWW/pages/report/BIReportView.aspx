<%@ Page Language="C#" MasterPageFile="~/MasterPageAdmin.master" AutoEventWireup="true" CodeFile="BIReportView.aspx.cs" Inherits="pages_report_BIReportView" %>


<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
    <script src="/js/popup/report/BIReportView.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(function(parameters) {
            page_ReportView.documentReady(<%=ReportId%>);
        });
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server"> 
    <div class="container_data" id="divListWrapper">
        <iframe width="800" id="biReportInfo" height="600" src="" frameborder="0" allowFullScreen="true"></iframe>
    </div>
</asp:Content>