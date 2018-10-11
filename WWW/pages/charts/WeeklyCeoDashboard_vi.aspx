<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPageAdmin.master" AutoEventWireup="true"
    CodeFile="WeeklyCeoDashboard_vi.aspx.cs" Inherits="pages_charts_WeeklyCeoDashboard_vi" %>

<%@ Register Assembly="DevExpress.Web.v13.1, Version=13.1.4.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a"
    Namespace="DevExpress.Web.ASPxEditors" TagPrefix="dx" %>

<%@ Register Assembly="DevExpress.XtraCharts.v13.1.Web, Version=13.1.4.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a"
    Namespace="DevExpress.XtraCharts.Web" TagPrefix="dxchartsui" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <script src="/js/popup/dashboard/WeeklyCeoDashboard.js" type="text/javascript"></script>
    <link href="/css/dashboard.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript">
        $(document).ready(function () {
            pages_WeeklyCeoDashboard.documentReady('<%= date%>','vi');
        });
    </script>  
    <style type="text/css">
        .dxpc-contentWrapper table,.dxbebt,#ctl00_ContentPlaceHolder1_cbSegment {margin-top: 0 !important;}
        #ctl00_ContentPlaceHolder1_chartTimeline table {margin-top: 0;}
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div class="dashboard ceo-weekly-dashboard">
        <div style="border-bottom: 2px solid #333;">
            <p class="title" style="float: left">
                WEEKLY CEO DASHBOARD
                <br />
                <span>S&D CAT CANH</span></p>
            <table id="tbTitle" style="float: right; width: 20%;">
                <tr>
                        <td style="text-align: left; font-style: italic;">
                            Ngôn ngữ:
                        </td>
                        <td style="text-align: right;">
                            <a href="/weekly-ceo-dashboard" style="font-size: 12px; color: Green; text-decoration: underline;">English</a>
                        </td>
                    </tr>  
                <tr>
                    <td style="text-align: left; font-style: italic;">
                        Ngày:
                    </td>
                    <td style="text-align: right; color: Red; font-size: 16px; font-weight: bold;">
                        <asp:DropDownList ID="ddlDate" runat="server" AutoPostBack="true" OnSelectedIndexChanged="ddlDate_SelectedIndexChanged">

                        </asp:DropDownList>
                    </td>
                </tr>
                <tr>
                    <td style="text-align: left; font-style: italic;">
                        % Thời gian đã qua:
                    </td>
                    <td style="text-align: right; color: Red; font-size: 16px; font-weight: bold;">
                        <%=elapsedTime %>%
                    </td>
                </tr>
                <tr>
                    <td style="text-align: left; font-style: italic;">
                        Đơn vị:
                    </td>
                    <td style="text-align: right; font-weight: bold">
                        Tỷ VND
                    </td>
                </tr>
            </table>
            <div class="clear">
            </div>
        </div>
        <div class="box summary">
            <p class="title">
                TỔNG QUAN</p>
            <table style="width: 10%">
                <tr>
                    <th colspan="2" style="color: #C00000; padding: 8px; background: #E8E8E8;">
                        &nbsp;
                    </th>
                </tr>
                <tr>
                    <td>
                        &nbsp;
                    </td>
                </tr>
                <tr>
                    <td style="text-align: left; padding-left: 10px; font-size: 12px;">
                        <strong>KH CÁ NHÂN</strong>
                    </td>
                </tr>
                <tr>
                    <td style="text-align: left; padding-left: 10px; font-size: 12px;">
                        <strong>KH DOANH NGHIỆP</strong>
                    </td>
                </tr>
            </table>
            <table>
                <tr>
                    <th colspan="2" style="color: #C00000; padding: 8px; background: #E8E8E8; font-size: 14px;">
                        SỐ DƯ CUỐI KỲ
                    </th>
                </tr>
                <tr>
                    <td style="font-weight: bold; font-style: italic; font-size: 15px;">
                        <u>Cho vay</u>
                    </td>
                    <td style="font-weight: bold; font-style: italic; font-size: 15px;">
                        <u>Huy động</u>
                    </td>
                </tr>
                <tbody id="tbSummary1">
                </tbody>
            </table>
            <table>
                <tr>
                    <th colspan="2" style="color: #C00000; padding: 8px; background: #E8E8E8; font-size: 14px;">
                        KẾ HOẠCH CUỐI NĂM ĐẠT ĐƯỢC
                    </th>
                </tr>
                <tr>
                    <td style="font-weight: bold; font-style: italic; font-size: 15px;">
                        <u>Cho vay</u>
                    </td>
                    <td style="font-weight: bold; font-style: italic; font-size: 15px;">
                        <u>Huy động</u>
                    </td>
                </tr>
                <tbody id="tbSummary2">
                </tbody>
            </table>
            <table>
                <tr>
                    <th colspan="2" style="color: #C00000; padding: 8px; background: #E8E8E8; font-size: 14px;">
                        NĂNG SUẤT BÁN HÀNG (Tỷ VNĐ/Nhân viên bán)
                    </th>
                </tr>
                <tr>
                    <td style="font-weight: bold; font-style: italic; font-size: 15px;">
                        <u>Cho vay</u>
                    </td>
                    <td style="font-weight: bold; font-style: italic; font-size: 15px;">
                        <u>Huy động</u>
                    </td>
                </tr>
                <tbody id="tbSummary3">
                </tbody>
            </table>
            <div class="clear">
            </div>
        </div>
        <div class="box target">
            <p class="title">
                HOÀN THÀNH KẾ HOẠCH - KẾ HOẠCH TĂNG TRƯỞNG</p>
            <div class="loan-deposit">
                <p class="ld-title">
                    CHO VAY CUỐI KỲ THỰC TẾ & KẾ HOẠCH CUỐI NĂM</p>
                <div class="gauge">
                    <div class="chart">
                        <span class="value-current vc1"></span><span>Kế hoạch
                            <%=GetMonthByLang(target, "vi") %></span> <span class="value-target vt1"></span><span style="position: absolute;
                                bottom: 0; left: 0;">Kết quả
                                <br />
                                cuối năm 2013</span><span style="position: absolute; bottom: 0; right: 0;">Kế hoạch
                                    <br />
                                    cuối năm 2014</span></span>
                        <asp:Panel ID="panel1" runat="server">
                        </asp:Panel>
                    </div>
                    <p style="padding: 0; text-align: center; font-size: 15px; color: #C00066">
                        KH CÁ NHÂN</p>
                    <p style="padding: 10px; text-align: center; width: 82%; margin: 5px auto; border: 2px solid #333;">
                        <span class="gt1" style="color: #C00066"></span> KẾ HOẠCH TĂNG TRƯỞNG</p>
                </div>
                <div class="gauge">
                    <div class="chart">
                        <span class="value-current vc2"></span><span>Kế hoạch
                            <%=GetMonthByLang(target, "vi") %></span> <span class="value-target vt2"></span><span style="position: absolute;
                                bottom: 0; left: 0;">Kết quả
                                <br />
                                cuối năm 2013</span><span style="position: absolute; bottom: 0; right: 0;">Kế hoạch
                                    <br />
                                    cuối năm 2014</span></span>
                        <asp:Panel ID="panel2" runat="server">
                        </asp:Panel>
                    </div>
                    <p style="padding: 0; text-align: center; font-size: 15px; color: #C00066">
                        KH DOANH NGHIỆP</p>
                    <p style="padding: 10px; text-align: center; width: 82%; margin: 5px auto; border: 2px solid #333;">
                        <span class="gt2" style="color: #C00066"></span> KẾ HOẠCH TĂNG TRƯỞNG</p>
                </div>
            </div>
            <div class="loan-deposit" style="float: right;">
                <p class="ld-title">
                    CHO VAY CUỐI KỲ THỰC TẾ & KẾ HOẠCH CUỐI NĂM</p>
                <div class="gauge">
                    <div class="chart">
                        <span class="value-current vc3"></span><span>Kế hoạch
                            <%=GetMonthByLang(target, "vi") %></span> <span class="value-target vt3"></span><span style="position: absolute;
                                bottom: 0; left: 0;">Kết quả
                                <br />
                                cuối năm 2013</span><span style="position: absolute; bottom: 0; right: 0;">Kế hoạch
                                    <br />
                                    cuối năm 2014</span>
                        <asp:Panel ID="panel3" runat="server">
                        </asp:Panel>
                    </div>
                    <p style="padding: 0; text-align: center; font-size: 15px; color: #C00066">
                        KH CÁ NHÂN</p>
                    <p style="padding: 10px; text-align: center; width: 82%; margin: 5px auto; border: 2px solid #333;">
                        <span class="gt3" style="color: #C00066"></span> KẾ HOẠCH TĂNG TRƯỞNG</p>
                </div>
                <div class="gauge">
                    <div class="chart">
                        <span class="value-current vc4"></span><span>Kế hoạch
                            <%=GetMonthByLang(target, "vi") %></span> <span class="value-target vt4"></span><span style="position: absolute;
                                bottom: 0; left: 0;">Kết quả
                                <br />
                                cuối năm 2013</span><span style="position: absolute; bottom: 0; right: 0;">Kế hoạch
                                    <br />
                                    cuối năm 2014</span>                        
                        <asp:Panel ID="panel4" runat="server">
                        </asp:Panel>
                    </div>
                    <p style="padding: 0; text-align: center; font-size: 15px; color: #C00066">
                        KH DOANH NGHIỆP</p>
                    <p style="padding: 10px; text-align: center; width: 82%; margin: 5px auto; border: 2px solid #333;">
                        <span class="gt4" style="color: #C00066"></span> KẾ HOẠCH TĂNG TRƯỞNG</p>
                </div>
            </div>
            <div class="clear">
            </div>
        </div>
        <div class="box productivity">
            <p class="title">
                NĂNG SUẤT BÁN HÀNG (Cập nhật hàng tháng)</p>
            <div class="overview">
                <p class="title">
                    TỔNG QUAN</p>
                <table style="width: 100%">
                    <tr>
                        <th style="text-align: left; font-size: 14px;">
                            CHO VAY &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </th>
                        <th class="dt1">
                        </th>
                        <th class="dt2">
                        </th>
                        <th>
                            +/-
                        </th>
                    </tr>
                    <tr>
                        <td style="text-align: left">
                            KH Cá nhân
                        </td>
                        <td class="rt1">
                        </td>
                        <td class="rt2">
                        </td>
                        <td class="rt3">
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align: left; font-size: 14px;">
                            KH Doanh nghiệp
                        </td>
                        <td class="sme1">
                        </td>
                        <td class="sme2">
                        </td>
                        <td class="sme3">
                        </td>
                    </tr>
                    <tr>
                        <td colspan="4" style="font-style: italic; text-align: left;">
                            Đơn vị: Tỷ VNĐ
                        </td>
                    </tr>
                </table>
                <table style="width: 100%;">
                    <tr>
                        <th style="text-align: left; font-size: 14px;">
                            HUY ĐỘNG
                        </th>
                        <th class="dt3">
                        </th>
                        <th class="dt4">
                        </th>
                        <th>
                            +/-
                        </th>
                    </tr>
                    <tr>
                        <td style="text-align: left">
                            KH Cá nhân
                        </td>
                        <td class="rt4">
                        </td>
                        <td class="rt5">
                        </td>
                        <td class="rt6">
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align: left; font-size: 14px;">
                            KH Doanh nghiệp
                        </td>
                        <td class="sme4">
                        </td>
                        <td class="sme5">
                        </td>
                        <td class="sme6">
                        </td>
                    </tr>
                    <tr>
                        <td colspan="4" style="font-style: italic; text-align: left;">
                            Đơn vị: Tỷ VNĐ
                        </td>
                    </tr>
                </table>
            </div>
            <div class="overview timeline" style="float: right; margin-top: 10px; border: none;
                width: auto;">
                <p class="title" style="border: 1px solid #A6A6A6">
                    THEO THỜI GIAN</p>
                <div style="float: left; margin-top: 15px;">
                    <dxchartsui:WebChartControl ID="chartTimeline" ClientInstanceName="chart" 
                        oncustomcallback="chartTimeline_CustomCallback" EnableClientSideAPI="true" Width="500px" runat="server">
                    </dxchartsui:WebChartControl>
                </div>
                <ul style="float: left; margin: 10px 0 0 12px;">
                    <li style="padding: 2px 4px 0 0; font-weight: bold; text-align: right; font-family: Tahoma;
                        font-size: 12px; text-align: left">Phân khúc:</li>
                    <li>
                        <%--<asp:DropDownList ID="ddlSegment" CssClass="select" Width="130px" runat="server"
                            AutoPostBack="True" OnSelectedIndexChanged="ddlSegment_SelectedIndexChanged">
                            <asp:ListItem Value="retail">KH Cá nhân</asp:ListItem>
                            <asp:ListItem Value="sme">KH Doanh nghiệp</asp:ListItem>
                            <asp:ListItem Value="sme-removing big loan/deposit">KH Doanh nghiệp bỏ vay/huy động lớn</asp:ListItem>
                        </asp:DropDownList>--%>
                        
                    </li>
                    <dx:ASPxComboBox ID="cbSegment" runat="server" Width="130px" Height="25px" ValueType="System.String">
                        <Items>
                            <dx:ListEditItem Value="retail" Text="Retail" Selected="true" />
                            <dx:ListEditItem Value="sme" Text="SME" />
                            <dx:ListEditItem Value="sme-removing big loan/deposit" Text="SME-Removing big loan/deposit" />
                        </Items>
                        <ClientSideEvents SelectedIndexChanged="function(s, e) {
                            chart.PerformCallback(&quot;TimeLine&quot;);
                        }" />
                    </dx:ASPxComboBox>
                </ul>
            </div>
            <div class="clear">
            </div>
            <span style="font-style: italic; font-size: 12px; float: left; margin-left: 10px;">*
                Giải ngân không bao gồm các hợp đồng thuộc chi nhánh mà không có mã nhân viên phân bổ và các nhân viên 
                bán còn lại tại các chi nhánh như giao dịch viên, thủ quỹ, ...</span>
            <div class="clear">
            </div>
            <div class="position" style="width: 100%;">
                <p style="border: 1px solid #A6A6A6; padding: 5px; margin: 10px 10px 0 10px; background: #D9D9D9;
                    font-size: 15px; color: #C80000;">
                    THEO CHỨC DANH, SẢN PHẨM - <%=GetMonthByLang(product_month.Split('-')[0],"vi") %>-<%=product_month.Split('-')[1] %></p>
                <div style="float: left; width: 60%; padding: 10px;">
                    <p style="padding: 0 0 5px 0; border-bottom: 1px solid #000;">
                        KH CÁ NHÂN&nbsp;&nbsp;&nbsp; <span style="background: #FE0000">&nbsp;&nbsp;&nbsp;</span>
                        <span style="font-size: 11px">Năng suất < Kế hoạch</span> &nbsp;&nbsp;&nbsp;<span
                            style="background: #92D050">&nbsp;&nbsp;&nbsp;</span> <span style="font-size: 11px">
                                Năng suất >= Kế hoạch</span>
                    </p>
                    <table class="tg">
                        <tr>
                            <th class="tg-drd7" rowspan="2">
                                Năng suất bán hàng<br>
                                (Triệu VNĐ)<br>
                            </th>
                            <th class="tg-drd7" colspan="3">
                                Chi nhánh
                            </th>
                            <th class="tg-drd7" colspan="3">
                                Kênh thay thế
                            </th>
                        </tr>
                        <tr>
                            <td class="tg-drd7">
                                PSE CASA + TD<br>
                            </td>
                            <td class="tg-drd7">
                                PSE Loan<br>
                            </td>
                            <td class="tg-drd7">
                                PB
                            </td>
                            <td class="tg-drd7">
                                TT Cho vay<br>
                                Tiêu dùng<br>
                            </td>
                            <td class="tg-drd7">
                                P.Bán tại<br>
                                Công sở<br>
                            </td>
                            <td class="tg-drd7">
                                TT PT Đối tác<br>
                                Sp vay TSĐB<br>
                            </td>
                        </tr>
                        <tbody id="tbListProductivityRetail">
                        </tbody>
                    </table>
                </div>
                <div class="sme" style="float: right; width: 35%; padding: 10px;">
                    <p style="padding: 0 0 5px 0; border-bottom: 1px solid #000;">
                        KH DOANH NGHIỆP</p>
                    <table class="tg">
                        <tr>
                            <th class="tg-3dpa">
                                Năng suất bán hàng<br>
                                (Triệu VNĐ)<br>
                            </th>
                            <th class="tg-3dpa">
                                SBO
                                <br />
                            </th>
                            <th class="tg-3dpa">
                                MBO
                                <br />
                            </th>
                        </tr>
                        <tbody id="tbListProductivitySme0">
                        </tbody>
                        <tr>
                            <td colspan="3" style="text-align: left; font-weight: bold; background: #B7DEE8">
                                Loại bỏ cho vay/huy động lớn (>30 triệu)
                            </td>
                        </tr>
                        <tbody id="tbListProductivitySme1">
                        </tbody>
                    </table>
                </div>
                <div class="clear">
                </div>
            </div>
            <div class="clear">
            </div>
            <span style="font-style: italic; font-size: 12px; float: left; margin-left: 10px;">*
                Số tài khoản CASA mới và số lượng thẻ tín dụng mới được phát hành</span><div
                    class="clear">
                </div>
        </div>
        <div class="box">
            <p class="title">
                KẾT QUẢ KINH DOANH</p>
            <div style="padding: 10px">
                <style type="text/css">
                    .performance
                    {
                        margin-bottom: 15px;
                    }
                    .performance tr.header
                    {
                        background-color: #FFC000;
                        font-size: 15px;
                    }
                    .performance tr.header th
                    {
                        padding: 2px 0;
                        margin-bottom: 10px;
                        text-align: right;
                        font-size: 14px;
                    }
                    .performance tr td
                    {
                        font-size: 12px;
                        padding: 2px 0;
                        text-align: right;
                    }
                    .performance tr td img
                    {
                        margin-bottom: 2px;
                    }
                </style>
                <div>
                    <table style="width: 100%" class="performance">
                        <tr class="header">
                            <th style="text-align: left; width: 100px; padding-left: 10px;">
                                CHO VAY
                            </th>
                            <th style="width: 190px;">
                                SỐ DƯ CUỐI KỲ
                                <br>
                                (TỶ VND)
                            </th>
                            <th>
                                % KẾ HOẠCH
                                <br>
                                CUỐI THÁNG
                            </th>
                            <th>
                                % KẾ HOẠCH
                                <br>
                                CUỐI NĂM
                            </th>
                            <th>
                                % KẾ HOẠCH
                                <br>
                                TĂNG TRƯỞNG
                            </th>
                            <th>
                                +/- TUẦN TRƯỚC
                            </th>
                            <th>
                                +/- CÙNG KỲ
                                <br />
                                NĂM TRƯỚC
                            </th>
                        </tr>
                        <tbody id="tbPerformance1">
                        </tbody>
                    </table>
                </div>
                <div>
                    <table style="width: 100%" class="performance">
                        <tr class="header">
                            <th style="text-align: left; width: 100px; padding-left: 10px;">
                                HUY ĐỘNG
                            </th>
                            <th style="width: 190px;">
                                SỐ DƯ CUỐI KỲ
                                <br>
                                (TỶ VND)
                            </th>
                            <th>
                                % KẾ HOẠCH
                                <br>
                                CUỐI THÁNG
                            </th>
                            <th>
                                % KẾ HOẠCH
                                <br>
                                CUỐI NĂM
                            </th>
                            <th>
                                % KẾ HOẠCH
                                <br>
                                TĂNG TRƯỞNG
                            </th>
                            <th>
                                +/- TUẦN TRƯỚC
                            </th>
                            <th>
                                +/- CÙNG KỲ
                                <br />
                                NĂM TRƯỚC
                            </th>
                        </tr>
                        <tbody id="tbPerformance2">
                        </tbody>
                    </table>
                </div>
                <div>
                    <table style="width: 100%" class="performance">
                        <tr class="header">
                            <th style="text-align: left; width: 100px; padding-left: 10px;">
                                KHÁCH HÀNG
                            </th>
                            <th style="width: 190px;">
                                SỐ KH LŨY KẾ
                            </th>
                            <th>
                                % KẾ HOẠCH
                                <br>
                                CUỐI THÁNG
                            </th>
                            <th>
                                % KẾ HOẠCH
                                <br>
                                CUỐI NĂM
                            </th>
                            <th>
                                % KẾ HOẠCH
                                <br>
                                TĂNG TRƯỞNG
                            </th>
                            <th>
                                +/- TUẦN TRƯỚC
                            </th>
                            <th>
                                +/- CÙNG KỲ
                                <br />
                                NĂM TRƯỚC
                            </th>
                        </tr>
                        <tbody id="tbPerformance3">
                        </tbody>
                    </table>
                </div>
            </div>
            <span style="font-style: italic; font-size: 12px; float: left; margin-left: 10px;">Chú ý:
                Số liệu không bao gồm bad bank</span>
            <div class="clear">
            </div>
        </div>
    </div>
</asp:Content>
