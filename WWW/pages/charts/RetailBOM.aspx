<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPageAdmin.master" AutoEventWireup="true"
    CodeFile="RetailBOM.aspx.cs" Inherits="pages_charts_RetailBOM" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <link href="/css/dashboard.css?v=1" rel="stylesheet" type="text/css" />

    <script src="/js/popup/dashboard/RetailBom.js" type="text/javascript"></script>
    <link href="/css/retail-bom.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript">
        $(function () {
            page_RetailBom.documentReady();
        });
    </script>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div class="dashboard">
        <div style="border-bottom: 2px solid #333; position: relative;">
            <p class="title-das" style="float: left; font-size: 25px; padding-top: 10px;">
                RETAIL BOM DASHBOARD
            </p>
            <div class="clear">
            </div>
        </div>
        <div class="filter"> 
            <select style="float: right;" id="ddlType">
                <option value="actual">Actual</option>
                <option value="target">Target</option>
            </select>   
            <select style="float: left;" id="ddlYear">
                <option value="2014">2014</option>
            </select>
            <div class="clear"></div>
        </div>
        <div class="box" style="padding: 5px 0; position: relative; margin-top: 2px;">
            <table class="channel">
                <tr>
                    <th colspan="3" style="background: #215967; color: #eee; font-size: 12px;">
                        Sales
                    </th>
                </tr>
                <tr>
                    <th style="color: Red;">
                        Deposit
                    </th>
                    <td>
                        EOP Balance
                    </td>
                    <td>
                        <i>bil/%</i>
                    </td>
                </tr>
                <tr>
                    <th rowspan="2">
                        Term deposit and others
                    </th>
                    <td>
                        New balance
                    </td>
                    <td>
                        <i>bil/%</i>
                    </td>
                </tr>
                <tr>
                    <td>
                        EOP balance
                    </td>
                    <td>
                        <i>bil/%</i>
                    </td>
                </tr>
                <tr>
                    <th rowspan="2">
                        Current accounts
                    </th>
                    <td>
                        Total number of accounts
                    </td>
                    <td>
                        <i>accts/%</i>
                    </td>
                </tr>
                <tr>
                    <td>
                        EOP balance
                    </td>
                    <td>
                        <i>bil/%</i>
                    </td>
                </tr>
                <tr>
                    <th rowspan="2" style="color: Red;">
                        Loans (incl. credit cards)
                    </th>
                    <td>
                        Disbursement
                    </td>
                    <td>
                        <i>bil/%</i>
                    </td>
                </tr>
                <tr>
                    <td>
                        EOP Outstanding
                    </td>
                    <td>
                        <i>bil/%</i>
                    </td>
                </tr>
                <tr>
                    <th rowspan="5">
                        EOP outstanding
                    </th>
                    <td>
                        Auto Loan
                    </td>
                    <td>
                        <i>bil/%</i>
                    </td>
                </tr>
                <tr>
                    <td>
                        Consumption Loan (Group)
                    </td>
                    <td>
                        <i>bil/%</i>
                    </td>
                </tr>
                <tr>
                    <td>
                        Home Loan
                    </td>
                    <td>
                        <i>bil/%</i>
                    </td>
                </tr>
                <tr>
                    <td>
                        Household Business
                    </td>
                    <td>
                        <i>bil/%</i>
                    </td>
                </tr>
                <tr>
                    <td>
                        Unsecured loans
                    </td>
                    <td>
                        <i>bil/%</i>
                    </td>
                </tr>
                <tr>
                    <th rowspan="2" style="color: Red;">
                        Credit cards
                    </th>
                    <td>
                        Total number of cards
                    </td>
                    <td>
                        <i>accts/%</i>
                    </td>
                </tr>
                <tr>
                    <td>
                        Outstanding balance
                    </td>
                    <td>
                        <i>bil/%</i>
                    </td>
                </tr>
                <tr>
                    <th colspan="3" style="background: #215967; color: #eee; font-size: 12px;">
                        Financials
                    </th>
                </tr>
                <tr>
                    <th style="color: Red">
                        Profit before Tax (PBT)
                    </th>
                    <td>
                        PBT
                    </td>
                    <td>
                        <i>bil/%</i>
                    </td>
                </tr>
                <tr>
                    <th rowspan="2">
                        Income
                    </th>
                    <td>
                        TOI
                    </td>
                    <td>
                        <i>bil/%</i>
                    </td>
                </tr>
                <tr>
                    <td>
                        Extraodinary gain
                    </td>
                    <td>
                        <i>bil/%</i>
                    </td>
                </tr>

                <tr>
                    <th rowspan="3">
                        Costs
                    </th>
                    <td>
                        Direct cost
                    </td>
                    <td>
                        <i>bil/%</i>
                    </td>
                </tr>
                <tr>
                    <td>
                        Allocated cost
                    </td>
                    <td>
                        <i>bil/%</i>
                    </td>
                </tr>
                <tr>
                    <td>
                        Provision
                    </td>
                    <td>
                        <i>bil/%</i>
                    </td>
                </tr>
                <tbody class="tb1">
                <tr>
                    <th colspan="3" style="background: #215967; color: #eee; font-size: 12px;">
                        Service quality
                    </th>
                </tr>

                <tr>
                    <th style="color: Red">TTD</th>
                    <td>TTD (by calendar days)</td>
                    <td><i>day(s)</i></td>
                </tr>
                <tr>
                    <th rowspan="7">TTD by calendar days</th>
                    <td>Auto Loan</td>
                    <td><i>day(s)</i></td>
                </tr>
                <tr>                    
                    <td>Consumption Loan</td>
                    <td><i>day(s)</i></td>
                </tr>
                <tr>                    
                    <td>Home Loan</td>
                    <td><i>day(s)</i></td>
                </tr>
                <tr>                    
                    <td>Home Renovation</td>
                    <td><i>day(s)</i></td>
                </tr>
                <tr>                    
                    <td>Household Business</td>
                    <td><i>day(s)</i></td>
                </tr>
                <tr>                    
                    <td>Overdraft</td>
                    <td><i>day(s)</i></td>
                </tr>
                <tr>                    
                    <td>UPL</td>
                    <td><i>day(s)</i></td>
                </tr>                

                <tr>
                    <th style="color: Red">VPB TAT</th>
                    <td>VPB TAT (by calendar days)</td>
                    <td><i>day(s)</i></td>
                </tr>
                <tr>
                    <th rowspan="7">VPB TAT by calendar days</th>
                    <td>Auto Loan</td>
                    <td><i>day(s)</i></td>
                </tr>
                <tr>                    
                    <td>Consumption Loan</td>
                    <td><i>day(s)</i></td>
                </tr>
                <tr>                    
                    <td>Home Loan</td>
                    <td><i>day(s)</i></td>
                </tr>
                <tr>                    
                    <td>Home Renovation</td>
                    <td><i>day(s)</i></td>
                </tr>
                <tr>                    
                    <td>Household Business</td>
                    <td><i>day(s)</i></td>
                </tr>
                <tr>                    
                    <td>Overdraft</td>
                    <td><i>day(s)</i></td>
                </tr>
                <tr>                    
                    <td>UPL</td>
                    <td><i>day(s)</i></td>
                </tr>

                <tr>
                    <th colspan="3" style="background: #215967; color: #eee; font-size: 12px;">
                        Risk and operations
                    </th>
                </tr>
                <tr>
                    <th style="color:Red">Credit application net approval rate</th>
                    <td>Net approval rate</td>
                    <td><i>%</i></td>
                </tr>

                <tr>
                    <td rowspan="8">Approval rate by products</td>
                    <td>Auto Loan</td>
                    <td><i>%</i></td>
                </tr>
                <tr>                    
                    <td>Consumption Loan</td>
                    <td><i>%</i></td>
                </tr>
                <tr>                    
                    <td>Home Loan</td>
                    <td><i>%</i></td>
                </tr>
                <tr>                    
                    <td>Home Renovation</td>
                    <td><i>%</i></td>
                </tr>
                <tr>                    
                    <td>Household Business</td>
                    <td><i>%</i></td>
                </tr>
                <tr>                    
                    <td>Overdraft</td>
                    <td><i>%</i></td>
                </tr>
                <tr>                    
                    <td>UPL</td>
                    <td><i>%</i></td>
                </tr>
                <tr>                    
                    <td>Credit card</td>
                    <td><i>%</i></td>
                </tr>
                <tr>
                    <th rowspan="2" style="color: Red">Credit risk</th>
                    <td>Total NPL</td>
                    <td><i>bil</i></td>
                </tr>
                <tr>                    
                    <td>%NPL</td>
                    <td><i>%</i></td>
                </tr>
                <tr>
                    <th rowspan="6">%NPL by products</th>
                    <td>Auto Loan</td>
                    <td><i>%</i></td>
                </tr>
                <tr>
                    <td>Consumption Loan</td>
                    <td><i>%</i></td>
                </tr>
                <tr>
                    <td>Home Renovation</td>
                    <td><i>%</i></td>
                </tr>
                <tr>
                    <td>Household Business</td>
                    <td><i>%</i></td>
                </tr>
                <tr>
                    <td>UPL</td>
                    <td><i>%</i></td>
                </tr>
                <tr>
                    <td>Credit cards</td>
                    <td><i>%</i></td>
                </tr>
                </tbody>
                <tr>
                    <th colspan="3" style="background: #215967; color: #eee; font-size: 12px;">
                        HR
                    </th>
                </tr>
                <tr>
                    <th rowspan="2" style="color: Red">Number of employees</th>
                    <td>Branches</td>
                    <td><i>head(s)</i></td>
                </tr>
                <tr>
                    <td>AC</td>
                    <td><i>head(s)</i></td>
                </tr>
                <tr>
                    <th rowspan="2" style="color: Red">FTE</th>
                    <td>Branches</td>
                    <td><i>head(s)</i></td>
                </tr>
                <tr>
                    <td>AC</td>
                    <td><i>head(s)</i></td>
                </tr>
            </table>
            <table class="values">
                <tr>
                    <th>Jan</th>
                    <th>Feb</th>
                    <th>Mar</th>
                    <th>Apr</th>
                    <th>May</th>
                    <th>Jun</th>
                    <th>Jul</th>
                    <th>Aug</th>
                    <th>Sep</th>
                    <th>Oct</th>
                    <th>Nov</th>
                    <th>Dec</th>
                </tr>
                <tbody id="tbRetailBom1">
                </tbody>
            </table>
            <table class="values vl">
                <tr>
                    <th>Jan</th>
                    <th>Feb</th>
                    <th>Mar</th>
                    <th>Apr</th>
                    <th>May</th>
                    <th>Jun</th>
                    <th>Jul</th>
                    <th>Aug</th>
                    <th>Sep</th>
                    <th>Oct</th>
                    <th>Nov</th>
                    <th>Dec</th>
                </tr>
                <tbody id="tbRetailBom2">
                </tbody>
            </table>
            <table class="values vl tb1">
                <tr>
                    <th>Jan</th>
                    <th>Feb</th>
                    <th>Mar</th>
                    <th>Apr</th>
                    <th>May</th>
                    <th>Jun</th>
                    <th>Jul</th>
                    <th>Aug</th>
                    <th>Sep</th>
                    <th>Oct</th>
                    <th>Nov</th>
                    <th>Dec</th>
                </tr>
                <tbody id="tbRetailBom3">
                </tbody>
            </table>
            <table class="values vl tb1">
                <tr>
                    <th>Jan</th>
                    <th>Feb</th>
                    <th>Mar</th>
                    <th>Apr</th>
                    <th>May</th>
                    <th>Jun</th>
                    <th>Jul</th>
                    <th>Aug</th>
                    <th>Sep</th>
                    <th>Oct</th>
                    <th>Nov</th>
                    <th>Dec</th>
                </tr>
                <tbody id="tbRetailBom4">
                </tbody>
            </table>
            <table class="values vl">
                <tr>
                    <th>Jan</th>
                    <th>Feb</th>
                    <th>Mar</th>
                    <th>Apr</th>
                    <th>May</th>
                    <th>Jun</th>
                    <th>Jul</th>
                    <th>Aug</th>
                    <th>Sep</th>
                    <th>Oct</th>
                    <th>Nov</th>
                    <th>Dec</th>
                </tr>
                <tbody id="tbRetailBom5">
                </tbody>
            </table>
            <div class="clear">
            </div>
        </div>
        <div class="source">
            <p style="font-weight: bold;">(*) Source:</p>
            <p>- Retail BOM Meeting Report</p>
            <p>- Monthly Retail Sales Performance Report</p>
            <p>- Porfolio Quality Report</p>
            <p>- Daily FinnOne TAT Report for Retail</p>
        </div>
    </div>
</asp:Content>
