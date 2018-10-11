<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPageAdmin.master" AutoEventWireup="true"
    CodeFile="RetailParameterTracking.aspx.cs" Inherits="pages_charts_RetailParameterTracking" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <link href="/css/dashboard.css" rel="stylesheet" type="text/css" />
    <script src="/js/popup/dashboard/RetailParameterTracking.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(function () {
            page_RetailParameterTracking.documentReady('<%=lastDate %>');
        });
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div class="dashboard retail-parameter-tracking" style="width: 1300px;">
        <div style="border-bottom: 2px solid #333; position: relative;">
            <p class="title" style="float: left">
                BICC INTERNAL
                <br />
                <span>RETAIL PARAMETER TRACKING</span></p>
            
            <table id="tbTitle" style="float: right; width: 20%; position: absolute; right: 0;
                bottom: 0;">
                <tr>
                    <td style="text-align: left; font-style: italic; padding: 3px;">
                        Balance unit:
                    </td>
                    <td style="text-align: right; font-weight: bold">
                        Million VND
                    </td>
                </tr>
            </table>
            <div class="clear">
            </div>
        </div>
        <div class="box daily-update">
            <div class="filter" style="padding-top: 5px;">
                <input type="text" id="txtDate" style="width: 90px; font-weight: bold; text-align: right;
                    color: #FF0000; float: left; margin-left: 10px" />
                <select id="ddlRetail" style="float: left; margin-left: 10px;">
                    <option value="">[-- All Retail --]</option>
                    <option value="BRANCH">Branch</option>
                    <option value="AC">AC</option>
                </select>
                <select id="ddlRegion" style="float: left; display: none; margin-left: 10px;">
                    <option value="">[-- All Region --]</option>
                    <option value="Region 01">Region 01</option>
                    <option value="Region 02">Region 02</option>
                    <option value="Region 03">Region 03</option>
                    <option value="Region 04">Region 04</option>
                    <option value="Region 05">Region 05</option>
                    <option value="Region 06">Region 06</option>
                    <option value="Region 07">Region 07</option>
                    <option value="Region 08">Region 08</option>
                    <option value="Region 09">Region 09</option>
                    <option value="Region 10">Region 10</option>
                    <option value="Undefined">Undefined</option>
                </select>
                <div class="clear">
                </div>
            </div>
            
            <div style="padding: 0 10px; overflow: auto;">
                <table class="tg">
                    <tr><th style="color: #fff; background-color: #578ebe; font-weight: bold; font-size: 15px;" colspan="17">DAILY UPDATE</th></tr>
                    <tr>
                        <th class="tg-drd7" rowspan="2">
                            Indicator
                        </th>
                        <th class="tg-drd7" colspan="8">
                            Loan Products
                        </th>
                        <th class="tg-drd7" colspan="3">
                            Cards
                        </th>
                        <th class="tg-drd7" rowspan="2">
                            Total Loan & <br />Credit Card
                        </th>
                        <th class="tg-drd7" colspan="4">
                            Deposit Products
                        </th>                        
                    </tr>
                    <tr>
                        <td class="tg-drd7">
                            Securities
                        </td>
                        <td class="tg-drd7">
                            Household <br /> Business
                        </td>
                        <td class="tg-drd7">
                            Unsecured
                        </td>
                        <td class="tg-drd7">
                            Auto
                        </td>
                        <td class="tg-drd7">
                            Consumption
                        </td>
                        <td class="tg-drd7">
                            Home
                        </td>
                        <td class="tg-drd7">
                            Passbook
                        </td>
                        <td class="tg-drd7">
                            Total
                        </td>
                        <td class="tg-drd7">
                            Local <br />Debit
                        </td>
                        <td class="tg-drd7">
                            Master <br /> Debit
                        </td>
                        <td class="tg-drd7">
                            Credit <br /> Card
                        </td>
                        <td class="tg-drd7">
                            Current
                            <br />
                            Account
                        </td>
                        <td class="tg-drd7">
                            Term
                            <br />
                            Deposit
                        </td>
                        <td class="tg-drd7">
                            Others
                        </td>
                        <td class="tg-drd7">
                            Total
                        </td>                        
                    </tr>
                    <tbody id="tbListDailyUpdate">
                    </tbody>
                </table>
                <p style="padding: 0; font-size: 12px; font-weight: normal; font-style: italic;">
                * Applications are New Applications submitted within day <br />
                * Approved total on day includes approved applications within and not within day               
            </p>
                <table class="tg">
                    <tr><th style="color: #fff; background-color: #578ebe; font-weight: bold; font-size: 15px;" colspan="17">MONTH-TO-DATE UPDATE</th></tr>
                    <tr>
                        <th class="tg-drd7" rowspan="2">
                            Indicator
                        </th>
                        <th class="tg-drd7" colspan="8">
                            Loan Products
                        </th>
                        <th class="tg-drd7" colspan="3">
                            Cards
                        </th>
                        <th class="tg-drd7" rowspan="2">
                            Total Loan & <br />Credit Card
                        </th>
                        <th class="tg-drd7" colspan="4">
                            Deposit Products
                        </th>                        
                    </tr>
                    <tr>
                        <td class="tg-drd7">
                            Securities
                        </td>
                        <td class="tg-drd7">
                            Household <br /> Business
                        </td>
                        <td class="tg-drd7">
                            Unsecured
                        </td>
                        <td class="tg-drd7">
                            Auto
                        </td>
                        <td class="tg-drd7">
                            Consumption
                        </td>
                        <td class="tg-drd7">
                            Home
                        </td>
                        <td class="tg-drd7">
                            Passbook
                        </td>
                        <td class="tg-drd7">
                            Total
                        </td>
                        <td class="tg-drd7">
                            Local <br />Debit
                        </td>
                        <td class="tg-drd7">
                            Master <br /> Debit
                        </td>
                        <td class="tg-drd7">
                            Credit <br /> Card
                        </td>
                        <td class="tg-drd7">
                            Current
                            <br />
                            Account
                        </td>
                        <td class="tg-drd7">
                            Term
                            <br />
                            Deposit
                        </td>
                        <td class="tg-drd7">
                            Others
                        </td>
                        <td class="tg-drd7">
                            Total
                        </td>                        
                    </tr>
                    <tbody id="tbListMonthToDate">
                    </tbody>
                </table>
                <p style="padding: 0; font-size: 12px; font-weight: normal; font-style: italic;">
                    * Applications are New Applications submitted within month
                    <br />
                    * Approved total in month includes approved applications within and not within month
                </p>
            </div>            
        </div>

        <div class="box">
            <p class="title" style="text-align: center">
                Customers/ Staff (Monthly Update)</p>
            <div style="padding: 0 10px; overflow: auto;">
                <div style="float: left; padding: 5px 0;" class="filter">
                    <select style="float: left; margin-right: 10px; width: 100px;" id="ddlMonth">                                              
                    </select>    
                    <select style="float: left; margin-right: 10px;" id="ddlChannel">
                        <option value="Total Retail">Total Retail</option>
                        <option value="BRANCH">Branch</option> 
                        <option value="Alternative Channel">AC</option>                                                                       
                        <option value="Others">Others</option>                        
                    </select>                    
                    <div class="clear">
                    </div>
                </div>
                <table class="tg">
                    <tr>
                        <th class="tg-drd7" rowspan="2">
                            Indicator
                        </th>
                        <th class="tg-drd7" rowspan="2">
                            Total
                        </th>
                        <th class="tg-drd7" colspan="6">
                            Loan Products
                        </th>
                        <th class="tg-drd7" colspan="3">
                            Deposit Products
                        </th>
                        <th class="tg-drd7" colspan="2">
                            Cards
                        </th>
                        <th class="tg-drd7" rowspan="2">
                            E-banking<br /> (SMS or I2B)
                        </th>
                    </tr>
                    <tr>
                        <td class="tg-drd7">
                            Auto
                        </td>
                        <td class="tg-drd7">
                            Home 
                        </td>
                        <td class="tg-drd7">
                            Home Equity
                        </td>
                        <td class="tg-drd7">
                            Passbook
                        </td>
                        <td class="tg-drd7">
                            Sercurities
                        </td>
                        <td class="tg-drd7">
                            Unsecured
                        </td>
                        
                        <td class="tg-drd7">
                            Current
                            <br />
                            Account
                        </td>
                        <td class="tg-drd7">
                            Term
                            <br />
                            Deposit
                        </td>
                        <td class="tg-drd7">
                            Others <br />Saving
                        </td>                        
                        <td class="tg-drd7">
                            Master <br /> Credit Card
                        </td>
                        <td class="tg-drd7">
                            Master <br /> Debit Card
                        </td>
                    </tr>
                    <tbody id="tbListStaff">
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</asp:Content>
