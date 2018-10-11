<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPageAdmin.master" AutoEventWireup="true" CodeFile="SmeParameterTracking.aspx.cs" Inherits="pages_charts_SmeParameterTracking" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
    <script src="/js/popup/dashboard/SmeParameterTracking.js" type="text/javascript"></script>
    <link href="/css/dashboard.css" rel="stylesheet" type="text/css" />

    <script type="text/javascript">
        $(function () {
            page_SmeTracking.documentReady();
        });
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
    <div class="dashboard retail-parameter-tracking">
        <div style="border-bottom: 2px solid #333; position: relative;">
            <p class="title" style="float: left">
                BICC INTERNAL
                <br />
                <span>SME PARAMETER TRACKING</span></p>
            
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
                <select id="ddlDate" style="float: left; margin-left: 10px;"></select>
                
                <select id="ddlRegion" style="float: left; margin-left: 10px;">
                    <option value="">[-- All Regions --]</option>
                    <option value="Region 1">Region 1</option>
                    <option value="Region 2">Region 2</option>
                    <option value="Region 3">Region 3</option>
                    <option value="Region 4">Region 4</option>
                    <option value="Region 5">Region 5</option>
                    <option value="Region 6">Region 6</option>
                    <option value="Region 7">Region 7</option>
                    <option value="Region 8">Region 8</option>
                    <option value="Region 9">Region 9</option>
                    <option value="Region 10">Region 10</option> 
                </select> 
                <select id="ddlSmeCenter" style="float: left; margin-left: 10px;">

                </select>               
                <div class="clear">
                </div>
            </div>
            
            <div style="padding: 0 10px; overflow: auto;">
                <table class="tg">
                    <tr><th style="color: #fff; background-color: #578ebe; font-weight: bold; font-size: 15px;" colspan="17">WEEKLY UPDATE</th></tr>
                    <tr>
                        <th class="tg-drd7" rowspan="2">
                            Indicator
                        </th>
                        <th class="tg-drd7" colspan="4">
                            Loan Products
                        </th>
                        <th class="tg-drd7" colspan="2">
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
                            Short Term
                        </td>
                        <td class="tg-drd7">
                            Medium and <br /> Long Term
                        </td>
                        <td class="tg-drd7">
                            Overdraft
                        </td>                        
                        <td class="tg-drd7">
                            Total
                        </td>
                        <td class="tg-drd7">
                            Credit Card
                        </td>
                        <td class="tg-drd7">
                            Debit Card
                        </td>
                        <td class="tg-drd7">
                            Current Account
                        </td>
                        <td class="tg-drd7">
                            Term Deposit
                        </td>
                        <td class="tg-drd7">
                            Others
                        </td>
                        <td class="tg-drd7">
                            Total
                        </td>                        
                    </tr>
                    <tbody id="tbListWeeklyUpdate">
                    </tbody>
                </table>
                <%--<p style="padding: 0; font-size: 12px; font-weight: normal; font-style: italic;">
                    * Applications are New Applications submitted within day
                    <br />
                    * Approved total on day includes approved applications within and not within day
                </p>--%>
            </div>            
        </div>        
    </div>
</asp:Content>

