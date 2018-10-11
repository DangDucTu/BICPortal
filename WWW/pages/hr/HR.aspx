<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPageAdmin.master" AutoEventWireup="true" CodeFile="HR.aspx.cs" Inherits="pages_HR_HR" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
    <script src="/js/popup/hr/hr.js?v=3" type="text/javascript"></script>

    <script type="text/javascript">
        $(function () {
            page_Hr.documentReady();
        });
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="divSearch" class="container_data">
        <div class="header_container">
            <span class="container_text">Search</span>
            <div class="clear">
            </div>
        </div>
        <div class="content">
            <div class="form">
                <div class="row">
                    <ul>                            
                        <li class="text">Sale Code:</li>
                        <li>
                            <input type="text" id="txtSaleCode" />
                        </li> 
                        <li class="text">Sale Name:</li>
                        <li>
                            <input type="text" id="txtSaleName" />
                        </li>  
                        <li class="text">Team:</li>
                        <li>
                            <select id="ddlTeam">
                                <option value="">[-- All --]</option>
                            </select>
                        </li>                                         
                    </ul>

                    <div class="clear">
                    </div>
                </div>
            </div>
            <div align="left" class="form_btn">
                <input type="button" id="btnSearch" class="button" value="Search" /></div>
            <div class="clear">
            </div>
        </div>
    </div>
    <div class="container_data" id="divListWrapper">
        <div class="header_container">
            <span class="container_text">Sales (<span id="spTotalRecord"></span>)
            </span>
            <div class="adminBox_Control">
                <ul>
                    <li id="liAddSale" class="action icon_add">Add new</li>
                    <li id="liExportSale" onclick="javascript:page_Hr.exportExcel();" class="action icon_add">Export</li>
                </ul>
            </div>
            <div class="clear">
            </div>
        </div>
        <div class="content" id="divListReport">
            <table border="0" cellpadding="0" cellspacing="0" class="table" width="100%">
                <thead>
                    <tr>
                        <th style="width: 20px">
                           STT
                        </th>
                        <th>
                           SALE <br />CODE
                        </th>                        
                        <th>
                           HR STAFF
                        </th>
                        <th>
                           SALE NAME
                        </th>
                        <th>
                            DAO
                        </th> 
                        <th>
                            BRANCH <br /> CODE
                        </th>                       
                        <th>
                            TEAM
                        </th>
                        <th>
                            CHANNEL
                        </th>
                        <th>
                            POSITION
                        </th>
                        <th>
                            SUB <br />POSITION
                        </th>
                        <th>
                            GENDER
                        </th>
                        <th>
                            MOBILE
                        </th>
                        <th>
                           DOB
                        </th>
                        <%--<th>
                            EMAIL
                        </th>--%>
                        <th>
                            NATIONAL ID
                        </th>
                        <th>
                            START DATE 
                        </th>
                        <th>
                            PAYROLL
                        </th>
                        <th style="width: 100px">
                            FUNCTION
                        </th>
                    </tr>
                </thead>
                <tbody id="tbListSale">
                </tbody>
            </table>
            <div class="clear">
            </div>
            <div class="form_btn" id="divPaging" style="display: none">
                <div class="clear">
                </div>
            </div>
        </div>
    </div>
</asp:Content>

