<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPageAdmin.master" AutoEventWireup="true"
    CodeFile="SalesProductivity.aspx.cs" Inherits="pages_charts_SalesProductivity" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <link href="/css/dashboard.css" rel="stylesheet" type="text/css" />
    
    <script src="/js/popup/dashboard/SalesProductivity.js" type="text/javascript"></script>
    <link href="/css/sale_productivity.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript">
        $(function () {
            page_SaleProductivity.documentReady('en');
        });
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div class="dashboard sales-productivity">
        <div style="border-bottom: 2px solid #333; position: relative; margin-top: 12px;">
            <p class="title" style="float: left">
                RETAIL SALES PRODUCTIVITY<br /><span>May 2014</span></p>
            <table style="float: right;" id="tbTitle">
                <tbody> 
                    <tr>
                        <td style="text-align: left; font-style: italic;">
                            Language:
                        </td>
                        <td style="text-align: left;">
                            <a href="/retail-sales-productivity-vi" style="font-size: 12px; color: Green; text-decoration: underline;">Tiếng Việt</a>
                        </td>
                    </tr>                       
                    <tr>
                        <td style="text-align: left; font-style: italic;">
                            Balance unit:
                        </td>
                        <td style="text-align: left; font-weight: bold">
                            Million VND
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2" style="text-align: left; font-size: 13px; font-style: italic;">Loan productivity: New Disbursement/Headcount </td>
                    </tr>
                    <tr>
                        <td colspan="2" style="text-align: left; font-size: 13px; font-style: italic;">Deposit productivity: New Balance/Headcount</td>
                    </tr>
                </tbody>
            </table>
            <div class="clear">
            </div>
        </div>
        <div class="box">
            <p class="title">
                Snapshot</p>
            
            <div id="snapshot" style="float: left; padding: 10px; width: 630px;">
                <table class="tg first" style="margin: 0">
                    <tr>
                        <th class="tg-drd7" style="padding-left: 20px; text-align: left;">
                            Product
                            <br />
                        </th>
                        <th class="tg-drd7">
                            Actual
                        </th>
                        <th class="tg-drd7">
                            Target
                        </th>
                        <th class="tg-drd7">
                            % Target
                        </th>
                        <%--<th class="tg-drd7" rowspan="2">
                            Jan 2014
                        </th>
                        <th class="tg-drd7" rowspan="2">
                            Feb 2014
                        </th>
                        <th class="tg-drd7" rowspan="2">
                            Mar 2014
                        </th>
                        <th class="tg-drd7" rowspan="2">
                            Apr 2014
                        </th>--%>
                        <%--<th class="tg-drd7" colspan="3">
                            May 2014
                        </th>--%>
                    </tr>
                    <tbody id="Tbody1">
                        <tr>
                            <td style="text-align: left">Loan</td>
                            <%--<td style="background: url(/images/admin/icon/red.png) no-repeat 5px 50%;">1.079</td>
                            <td style="background: url(/images/admin/icon/red.png) no-repeat 5px 50%;">406</td>
                            <td style="background: url(/images/admin/icon/red.png) no-repeat 5px 50%;">949</td>
                            <td style="background: url(/images/admin/icon/red.png) no-repeat 5px 50%;">1.387</td>--%>
                            <td>928</td>
                            <td>1.077</td>
                            <td style="background: url(/images/admin/icon/green.png) no-repeat 5px 50%;">86%</td>
                        </tr>
                        <tr>
                            <td style="text-align: left">Deposit</td>
                            <%--<td style="background: url(/images/admin/icon/green.png) no-repeat 5px 50%;">4.089</td>
                            <td style="background: url(/images/admin/icon/green.png) no-repeat 5px 50%;">3.660</td>
                            <td style="background: url(/images/admin/icon/green.png) no-repeat 5px 50%;">4.037</td>
                            <td style="background: url(/images/admin/icon/green.png) no-repeat 5px 50%;">3.295</td>--%>
                            <td>3.248</td>
                            <td>8.393</td>
                            <td style="background: url(/images/admin/icon/red.png) no-repeat 5px 50%; padding-left: 20px;">39%</td>
                        </tr>
                    </tbody>
                </table>
                <table class="tg second" style="width: 280px">
                    <tr>
                        <td style="background: url(/images/admin/icon/red.png) no-repeat 5px 50%; padding: 2px 30px; text-align: left;"><strong>Worse than target of that month</strong></td>
                    </tr>
                    <tr>
                        <td style="background: url(/images/admin/icon/green.png) no-repeat 5px 50%; padding: 2px 30px; text-align: left;"><strong>Equal/Better than target of that month</strong></td>
                    </tr>
                    <%--<tr>
                        <td colspan="2" style="text-align: left; font-style: italic;">Loan productivity: New Disbursement/Headcount </td>
                    </tr>
                    <tr>
                        <td colspan="2" style="text-align: left; font-style: italic;">Deposit productivity: New Balance/Headcount </td>
                    </tr>--%>
                </table>
            </div>

            <asp:Panel ID="panel1" CssClass="chart-productivity" runat="server">
            </asp:Panel>
            <div class="clear"></div>
        </div>

        <div class="box">
            <p class="title">
                Branch VS. Alternative Channel Productivity</p>
            <asp:Panel ID="panel2" CssClass="chart-left" runat="server">
            </asp:Panel>
            <asp:Panel ID="panel3" CssClass="chart-left" runat="server">
            </asp:Panel>
            <asp:Panel ID="panel4" CssClass="chart-right" runat="server">
            </asp:Panel>
            <asp:Panel ID="panel5" CssClass="chart-right" runat="server">
            </asp:Panel>
            <div class="clear"></div>
        </div>
        <div class="box">
            <p class="title">Month-to-month Productivity Comparison</p>
            <div style="width: 48%; float: left; padding: 10px;">
                <p style="border: 1px solid #A6A6A6; padding: 5px; background: #D9D9D9; font-size: 15px; color: #2788A1; text-align:center">Productivity As Of May</p>
                <table class="tg">
                        
                        <tr>
                            <th class="tg-drd7" rowspan="2">
                                Productivity <br />
                            </th>
                            <th class="tg-drd7" colspan="3">
                                Branch
                            </th>
                            <th class="tg-drd7" colspan="3">
                                AC
                            </th>
                        </tr>
                        <tr>
                            <td class="tg-drd7">
                                PSE <br /> CASA + TD<br>
                            </td>
                            <td class="tg-drd7">
                                PSE Loan<br>
                            </td>
                            <td class="tg-drd7">
                                PB
                            </td>
                            <td class="tg-drd7">
                                Consumer<br>
                                Lending<br>
                            </td>
                            <td class="tg-drd7">
                                Workside<br>
                                Banking<br>
                            </td>
                            <td class="tg-drd7">
                                Asset<br>
                                Partnership<br>
                            </td>
                        </tr>
                          <tbody id="tbListProductivityCurrent">
                            
                        </tbody>                       
                    </table>
            </div>
            <div style="width: 48%; float: right; padding: 10px;">
                <p style="border: 1px solid #A6A6A6; padding: 5px; background: #D9D9D9; font-size: 15px; color: #2788A1; text-align: center">Productivity As Of April</p>
                <table class="tg">
                        
                        <tr>
                            <th class="tg-drd7" rowspan="2">
                                Productivity <br />
                            </th>
                            <th class="tg-drd7" colspan="3">
                                Branch
                            </th>
                            <th class="tg-drd7" colspan="3">
                                AC
                            </th>
                        </tr>
                        <tr>
                            <td class="tg-drd7">
                                PSE <br /> CASA + TD<br>
                            </td>
                            <td class="tg-drd7">
                                PSE Loan<br>
                            </td>
                            <td class="tg-drd7">
                                PB
                            </td>
                            <td class="tg-drd7">
                                Consumer<br>
                                Lending<br>
                            </td>
                            <td class="tg-drd7">
                                Workside<br>
                                Banking<br>
                            </td>
                            <td class="tg-drd7">
                                Asset<br>
                                Partnership<br>
                            </td>
                        </tr>
                          <tbody id="tbListProductivityPrevious">
                            
                        </tbody>                       
                    </table>
            </div>
            <div class="clear"></div>
        </div>
    </div>
</asp:Content>
