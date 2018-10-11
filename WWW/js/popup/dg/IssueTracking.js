/// <reference path="../lib/common.js" />

page_IssueTracking = new function () {
    this.htmlTag = new function () {
        this.divList = '#tbListReportList';
        this.divPopupContainerWrapper = '#divPopupUpdateReportListWrapper';
        this.divPopupContainer = '#divPopupUpdateReportList';
        this.divPopupRequestFormContainer = '#divPopupUploadRequestForm';
        this.popupCloseButton = '.popupclosebutton';
        this.popup_cancel = '#popup_cancel';
        this.popup_save = '#popup_save';

        this.btnAddnew = '#liAddReportList';
    };

    this.variable = new function () {
        this.objPaging = new VtcPaging("divPaging", "page_IssueTracking.bindData", "pagingCss", 20, CONSTANT.PAGE_DISPLAY);
        this.issueId = -1;
        this.accountName = '';
        this.fileName = '';
        this.isDgd = '';
        this.auto = '';
        this.account = [];
    };

    this.documentReady = function (accountName) {
        this.variable.accountName = accountName;
        if (accountName == "") {
            this.getPIC();
        }
        this.getListAllDivision("#divSearch #ddlSearchDivision");
        this.getListMemberByDepartment("#divSearch #ddlSearchPicBICC");
        this.checkAccountPermission(accountName);
        $("#txtFromDate").datepicker({
            changeMonth: true,
            changeYear: true
        });
        $("#txtToDate").datepicker({
            changeMonth: true,
            changeYear: true
        });

        this.bindData(this.variable.objPaging.currentPage, this.variable.objPaging.pageSize);
    };
    this.checkAccountPermission = function (account) {
        $.ajax({
            type: "GET",
            url: "/handler/IssueTracking.ashx",
            data: { account: account, t: "CheckAccountPermission" },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                page_IssueTracking.variable.isDgd = data.DIVISION_ID == 22;
                page_IssueTracking.variable.account = data;
                if (page_IssueTracking.variable.isDgd == false) {
                    //$(".liConfirmIssue").hide();
                    $(".liDeleteIssue").hide();
                }
            }
        });
    }
    $("#divSearch #btnSearchReportList").live('click', function () {
        page_IssueTracking.bindData(1, page_IssueTracking.variable.objPaging.pageSize);
    });
    this.bindData = function (_cur, _ps) {
        Loading.show();

        division = $("#divSearch #ddlSearchDivision").val();
        picBu = $("#divSearch #txtSearchPicBu").val();
        picBicc = $("#divSearch #ddlSearchPicBICC").val();
        issueId = $("#divSearch #txtSearchIssueCode").val();
        fromDate = $("#divSearch #txtFromDate").val();
        toDate = $("#divSearch #txtToDate").val();
        account = page_IssueTracking.variable.accountName == '' ? $("#divSearch #ddlPIC").val() : page_IssueTracking.variable.accountName;

        status = $("#divSearch #ddlSearchStatus").val();
        $.ajax({
            type: "GET",
            url: "/handler/IssueTracking.ashx",
            data: { division: division, status: status, picBicc: picBicc, picBu: picBu, fromDate: fromDate, toDate: toDate, issueCode: issueId, account: account, page: _cur, pageSize: _ps, t: "GetListIssueTracking" },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                $(page_IssueTracking.htmlTag.divList).setTemplateURL("/templates/pages/dg/IssueTrackingList.htm");
                data.account = page_IssueTracking.variable.account;
                $(page_IssueTracking.htmlTag.divList).processTemplate(data);

                $('.spanTooltip[title]').qtip({ style: { name: 'green', tip: true, border: { radius: 5 } } });

                page_IssueTracking.variable.objPaging.bindPaging(_cur, data.TotalRecord);
                $("#spTotalRecord").html(data.TotalRecord);

                if (data.TotalRecord <= page_IssueTracking.variable.objPaging.pageSize) {
                    $("#divPaging").attr('style', 'display:none');
                }
                else {
                    $("#divPaging").attr('style', 'display:block');
                }
                Loading.close();

            }
        });
    };

    $("#divSearch #txtReportName1").live('keydown', function () {
        page_IssueTracking.bindData();
    });

    this.getPIC = function (s) {
        $.ajax({
            type: "GET",
            url: "/handler/Department.ashx",
            data: { t: "GetListAdminByDepartment" },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                var html = '';
                for (i = 0; i < data.length; i++) {
                    html += '<option value="' + data[i].Name + '">' + data[i].FullName + '</option>';
                }
                $("#ddlPIC").append(html);

            }
        });
    };

    this.getListMemberByDepartment = function (idHtml) {
        $.ajax({
            type: "GET",
            url: "/handler/IssueTracking.ashx",
            data: { t: "GetListPICBiccByAccount" },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                var html = '';
                for (i = 0; i < data.length; i++) {
                    html += '<option value="' + data[i].Name + '">' + data[i].FullName + '</option>';
                }
                $(idHtml).append(html);
            }
        });
    };

    this.getListAllDivision = function (idHtml) {
        $.ajax({
            type: "GET",
            url: "/handler/IssueTracking.ashx",
            data: { t: "GetListAllDivision" },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                var html = '';
                for (i = 0; i < data.length; i++) {
                    html += '<option value="' + data[i].Division_Id + '">' + data[i].Division_Name + '</option>';
                }
                //$("#divPopupUpdateReportList #ddlAccount").append(html);
                $(idHtml).append(html);
            }
        });
    };

    this.getListDivisionByAccount = function (account, idHtml) {
        $.ajax({
            type: "GET",
            url: "/handler/IssueTracking.ashx",
            data: { account: account, t: "GetListDivisionByAccount" },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                var html = '';
                for (i = 0; i < data.length; i++) {
                    html += '<option value="' + data[i].Division_Id + '">' + data[i].Division_Name + '</option>';
                }
                //$("#divPopupUpdateReportList #ddlAccount").append(html);
                $(idHtml).append(html);
            }
        });
    };

    this.getListPICBiccByAccount = function (account) {
        $.ajax({
            type: "GET",
            url: "/handler/IssueTracking.ashx",
            data: { account: account, t: "GetListPICBiccByAccount" },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                var html = '';
                for (i = 0; i < data.length; i++) {
                    html += '<option value="' + data[i].name + '">' + data[i].FullName + '</option>';
                }
                $("#divPicBICC #ddlPicBICC").append(html);

            }
        });
    };
    this.showPopup = function (issueId) {
        page_IssueTracking.variable.issueId = issueId;
        if ($(page_IssueTracking.htmlTag.divPopupContainerWrapper).length == 0) {
            $("body").append("<div id='" + this.htmlTag.divPopupContainerWrapper.substring(1) + "'></div>");
            $(this.htmlTag.divPopupContainerWrapper).setTemplateURL("/Templates/popup/dg/IssueTrackingUpdate.htm");
            $(this.htmlTag.divPopupContainerWrapper).processTemplate(null);
            COMMON.setTemplatePopup(this.htmlTag.divPopupContainer);
            this.processFormButton();

            account = page_IssueTracking.variable.accountName == '' ? $("#divSearch #ddlPIC").val() : page_IssueTracking.variable.accountName;
            page_IssueTracking.getListMemberByDepartment("#divPopupUpdateReportList #ddlAccountBackup");
            page_IssueTracking.getListDivisionByAccount(account, "#divClientDivision #ddlClientDivision");
            page_IssueTracking.getListPICBiccByAccount(account);

            if (issueId > 0) {
                page_IssueTracking.fillViewTrackingInfo(issueId);
            } else {
                if (page_IssueTracking.variable.isDgd) {
                } else {
                    $("#divPopupUpdateReportList #divCreateDate").hide();
                    $("#divPopupUpdateReportList #divPicBICC").hide();
                    $("#divPopupUpdateReportList #divCurrentAssign").hide();
                    $("#divPopupUpdateReportList #divDeadline").hide();
                }
            }
            var _currentDate = new Date();
            _currentDate.setDate(_currentDate.getDate());

            $("#txtCreateDate").val(page_IssueTracking.convertDate(_currentDate));
            $("#txtCreateDate").datepicker({
                changeMonth: true,
                changeYear: true
            });
            $("#txtFirstFeedbackDate").datepicker({
                changeMonth: true,
                changeYear: true
            });

            $("#txtDeadline").datepicker({
                changeMonth: true,
                changeYear: true
            });
            $("#txtFinishDate").datepicker({
                changeMonth: true,
                changeYear: true
            });
            if (page_IssueTracking.variable.accountName != '')
                $("#ddlAccount").html(page_IssueTracking.variable.accountName);
        }
    };
    this.convertDate = function (expDate) {
        return (expDate.getMonth() + 1) + '/' + expDate.getDate() + '/' + expDate.getFullYear();
    };
    this.fillViewTrackingInfo = function (issueId) {
        account = page_IssueTracking.variable.accountName == '' ? $("#divSearch #ddlPIC").val() : page_IssueTracking.variable.accountName;
        $.ajax({
            type: "GET",
            url: "/handler/IssueTracking.ashx",
            data: { account: account, issueId: issueId, t: "GetInfoIssueTracking" },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data_repsponse) {
                if (data_repsponse != null) {
                    data = data_repsponse[0];
                    $("#divPopupUpdateReportList #ddlClientDivision").val(data.DIVISION);
                    if (data.O_DIVISION_NAME != null && data.Division_Name != data.O_DIVISION_NAME) {
                        $('#divPopupUpdateReportList #ddlClientDivision').addClass('have_change');
                        $('#divPopupUpdateReportList #ddlClientDivision').prop('title', data.O_DIVISION_NAME);
                    } else {
                        $('#divPopupUpdateReportList #ddlClientDivision').removeClass('spanTooltip');
                    }
                    if (page_IssueTracking.variable.isDgd == false) {
                    }
                    $("#divPopupUpdateReportList #ddlPicBICC").val(data.PIC_BIC);
                    if (data.O_PIC_BIC != null && data.PIC_BIC != data.O_PIC_BIC) {
                        $('#divPopupUpdateReportList #ddlPicBICC').addClass('have_change');
                        $('#divPopupUpdateReportList #ddlPicBICC').prop('title', data.O_PIC_BIC);
                    } else {
                        $('#divPopupUpdateReportList #ddlPicBICC').removeClass('spanTooltip');
                    }
                    $("#divPopupUpdateReportList #ddlStatus").val(data.STATUS_ID);
                    if (data.O_STATUS != null && data.STATUS != data.O_STATUS) {
                        $('#divPopupUpdateReportList #ddlStatus').addClass('have_change');
                        $('#divPopupUpdateReportList #ddlStatus').prop('title', data.O_STATUS);
                    } else {
                        $('#divPopupUpdateReportList #ddlStatus').removeClass('spanTooltip');
                    }
                    $('#divPopupUpdateReportList #divCreateDate').show()
                    if (page_IssueTracking.variable.isDgd) {
                    } else {
                        $("#divPopupUpdateReportList #txtCreateDate").prop("disabled", true);
                        $("#divPopupUpdateReportList #txtDeadline").prop("disabled", true);
                        $("#divPopupUpdateReportList #txtFirstFeedbackDate").prop("disabled", true);
                        $("#divPopupUpdateReportList #ddlPicBICC").prop("disabled", true);
                    }
                    $("#divPopupUpdateReportList #txtCreateDate").val(data.CREATION_DATE == null ? '' : FormatDate(data.CREATION_DATE));
                    if (data.O_CREATION_DATE != null && data.CREATION_DATE != data.O_CREATION_DATE) {
                        $('#divPopupUpdateReportList #txtCreateDate').addClass('have_change');
                        $('#divPopupUpdateReportList #txtCreateDate').prop('title', FormatDate(data.O_CREATION_DATE));
                    } else {
                        $('#divPopupUpdateReportList #txtCreateDate').removeClass('spanTooltip');
                    }
                    $("#divPopupUpdateReportList #txtFirstFeedbackDate").val(data.FIRST_DATE_FB == null ? '' : FormatDate(data.FIRST_DATE_FB));
                    if (data.O_FIRST_DATE_FB != null && data.FIRST_DATE_FB != data.O_FIRST_DATE_FB) {
                        $('#divPopupUpdateReportList #txtFirstFeedbackDate').addClass('have_change');
                        $('#divPopupUpdateReportList #txtFirstFeedbackDate').prop('title', FormatDate(data.O_FIRST_DATE_FB));
                    } else {
                        $('#divPopupUpdateReportList #txtFirstFeedbackDate').removeClass('spanTooltip');
                    }
                    $("#divPopupUpdateReportList #txtSummary").val(data.SUMMARY);
                    if (data.O_SUMMARY != null && data.SUMMARY != data.O_SUMMARY) {
                        $('#divPopupUpdateReportList #txtSummary').addClass('have_change');
                        $('#divPopupUpdateReportList #txtSummary').prop('title', data.O_SUMMARY);
                    } else {
                        $('#divPopupUpdateReportList #txtSummary').removeClass('spanTooltip');
                    }
                    $("#divPopupUpdateReportList #txtDescription").val(data.DESCRIPTION);
                    if (data.O_DESCRIPTION != null && data.DESCRIPTION != data.O_DESCRIPTION) {
                        $('#divPopupUpdateReportList #txtDescription').addClass('have_change');
                        $('#divPopupUpdateReportList #txtDescription').prop('title', data.O_DESCRIPTION);
                    } else {
                        $('#divPopupUpdateReportList #txtDescription').removeClass('spanTooltip');
                    }
                    $("#divPopupUpdateReportList #divIssueCode").show();
                    $("#divPopupUpdateReportList #txtIssueCode").val(data.division_code + '_' + data.ISSUE_CODE);
                    $("#divPopupUpdateReportList #txtPicBu").val(data.PIC_BU);
                    if (data.O_PIC_BU != null && data.PIC_BU != data.O_PIC_BU) {
                        $('#divPopupUpdateReportList #txtPicBu').addClass('have_change');
                        $('#divPopupUpdateReportList #txtPicBu').prop('title', data.O_PIC_BU);
                    } else {
                        $('#divPopupUpdateReportList #txtPicBu').removeClass('spanTooltip');
                    }
                    $("#divPopupUpdateReportList #txtCurrAssig").val(data.CURRENT_ASSIGNEE);
                    if (data.O_CURRENT_ASSIGNEE != null && data.CURRENT_ASSIGNEE != data.O_CURRENT_ASSIGNEE) {
                        $('#divPopupUpdateReportList #txtCurrAssig').addClass('have_change');
                        $('#divPopupUpdateReportList #txtCurrAssig').prop('title', data.O_CURRENT_ASSIGNEE);
                    } else {
                        $('#divPopupUpdateReportList #txtCurrAssig').removeClass('spanTooltip');
                    }
                    $("#divPopupUpdateReportList #txtDeadline").val(data.EST_DEADLINE == null ? '' : FormatDate(data.EST_DEADLINE));
                    if (data.O_EST_DEADLINE != null && data.EST_DEADLINE != data.O_EST_DEADLINE) {
                        $('#divPopupUpdateReportList #txtDeadline').addClass('have_change');
                        $('#divPopupUpdateReportList #txtDeadline').prop('title', FormatDate(data.O_EST_DEADLINE));
                    } else {
                        $('#divPopupUpdateReportList #txtDeadline').removeClass('spanTooltip');
                    }
                    $("#divPopupUpdateReportList #txtFinishDate").val(data.FINISHING_DATE == null ? '' : FormatDate(data.FINISHING_DATE));
                    if (data.O_FINISHING_DATE != null && data.FINISHING_DATE != data.O_FINISHING_DATE) {
                        $('#divPopupUpdateReportList #txtFinishDate').addClass('have_change');
                        $('#divPopupUpdateReportList #txtFinishDate').prop('title', FormatDate(data.O_FINISHING_DATE));
                    } else {
                        $('#divPopupUpdateReportList #txtFinishDate').removeClass('spanTooltip');
                    }
                    $("#divPopupUpdateReportList #txtAgreeSolution").val(data.AGREED_SOLUTION);
                    if (data.O_AGREED_SOLUTION != null && data.AGREED_SOLUTION != data.O_AGREED_SOLUTION) {
                        $('#divPopupUpdateReportList #txtAgreeSolution').addClass('have_change');
                        $('#divPopupUpdateReportList #txtAgreeSolution').prop('title', data.O_AGREED_SOLUTION);
                    } else {
                        $('#divPopupUpdateReportList #txtAgreeSolution').removeClass('spanTooltip');
                    }
                    $("#divPopupUpdateReportList #txtNote").val(data.NOTE);
                    if (data.O_NOTE != null && data.NOTE != data.O_NOTE) {
                        $('#divPopupUpdateReportList #txtNote').addClass('have_change');
                        $('#divPopupUpdateReportList #txtNote').prop('title', data.O_NOTE);
                    } else {
                        $('#divPopupUpdateReportList #txtNote').removeClass('spanTooltip');
                    }

                    $('.spanTooltip[title]').qtip({ style: { name: 'green', tip: true, border: { radius: 5 } } });
                }
            }
        });
    }

    this.showPopupViewTrackingInfo = function (issueId) {
        page_IssueTracking.variable.issueId = issueId;
        if ($(page_IssueTracking.htmlTag.divPopupContainerWrapper).length == 0) {
            $("body").append("<div id='" + this.htmlTag.divPopupContainerWrapper.substring(1) + "'></div>");
            $(this.htmlTag.divPopupContainerWrapper).setTemplateURL("/Templates/popup/dg/IssueTrackingInfo.htm");
            $(this.htmlTag.divPopupContainerWrapper).processTemplate(null);
            COMMON.setTemplatePopup(this.htmlTag.divPopupContainer);
            this.processFormButton();

            if (page_IssueTracking.variable.accountName != '')
                $("#ddlAccount").html(page_IssueTracking.variable.accountName);
            if (issueId > 0) {
                page_IssueTracking.getInfoIssueTracking(issueId);
            }
        }
    };


    this.getInfoIssueTracking = function (issueId) {
        account = page_IssueTracking.variable.accountName == '' ? $("#divSearch #ddlPIC").val() : page_IssueTracking.variable.accountName;
        $.ajax({
            type: "GET",
            url: "/handler/IssueTracking.ashx",
            data: { account: account, issueId: issueId, t: "GetInfoIssueTracking" },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data_repsponse) {
                if (data_repsponse != null) {
                    data = data_repsponse[0];
                    $("#divPopupIssueTrackingInfo #liDivision").text(data.Division_Name);
                    if (data.O_DIVISION_NAME != null && data.Division_Name != data.O_DIVISION_NAME) {
                        $('#divPopupIssueTrackingInfo #liDivision').addClass('have_change');
                        $('#divPopupIssueTrackingInfo #liDivision').prop('title', data.O_DIVISION_NAME);
                    } else {
                        $('#divPopupIssueTrackingInfo #liDivision').removeClass('spanTooltip');
                    }
                    $("#divPopupIssueTrackingInfo #liPicBicc").text(data.PIC_BIC);
                    if (data.O_PIC_BIC != null && data.PIC_BIC != data.O_PIC_BIC) {
                        $('#divPopupIssueTrackingInfo #liPicBicc').addClass('have_change');
                        $('#divPopupIssueTrackingInfo #liPicBicc').prop('title', data.O_PIC_BIC);
                    } else {
                        $('#divPopupIssueTrackingInfo #liPicBicc').removeClass('spanTooltip');
                    }
                    $("#divPopupIssueTrackingInfo #liStatus").text(data.STATUS);
                    if (data.O_STATUS != null && data.STATUS != data.O_STATUS) {
                        $('#divPopupIssueTrackingInfo #liStatus').addClass('have_change');
                        $('#divPopupIssueTrackingInfo #liStatus').prop('title', data.O_STATUS);
                    } else {
                        $('#divPopupIssueTrackingInfo #liStatus').removeClass('spanTooltip');
                    }
                    $("#divPopupIssueTrackingInfo #liCreationDate").text(data.CREATION_DATE == null ? '' : FormatDate(data.CREATION_DATE));
                    if (data.O_CREATION_DATE != null && data.CREATION_DATE != data.O_CREATION_DATE) {
                        $('#divPopupIssueTrackingInfo #liCreationDate').addClass('have_change');
                        $('#divPopupIssueTrackingInfo #liCreationDate').prop('title', FormatDate(data.O_CREATION_DATE));
                    } else {
                        $('#divPopupIssueTrackingInfo #liCreationDate').removeClass('spanTooltip');
                    }
                    $("#divPopupIssueTrackingInfo #liFirstFeedDate").text(data.FIRST_DATE_FB == null ? '' : FormatDate(data.FIRST_DATE_FB));
                    if (data.O_FIRST_DATE_FB != null && data.FIRST_DATE_FB != data.O_FIRST_DATE_FB) {
                        $('#divPopupIssueTrackingInfo #liFirstFeedDate').addClass('have_change');
                        $('#divPopupIssueTrackingInfo #liFirstFeedDate').prop('title', FormatDate(data.O_FIRST_DATE_FB));
                    } else {
                        $('#divPopupIssueTrackingInfo #liFirstFeedDate').removeClass('spanTooltip');
                    }
                    $("#divPopupIssueTrackingInfo #liSummary").text(data.SUMMARY);
                    if (data.O_SUMMARY != null && data.SUMMARY != data.O_SUMMARY) {
                        $('#divPopupIssueTrackingInfo #liSummary').addClass('have_change');
                        $('#divPopupIssueTrackingInfo #liSummary').prop('title', data.O_SUMMARY);
                    } else {
                        $('#divPopupIssueTrackingInfo #liSummary').removeClass('spanTooltip');
                    }
                    $("#divPopupIssueTrackingInfo #liDescription").text(data.DESCRIPTION);
                    if (data.O_DESCRIPTION != null && data.DESCRIPTION != data.O_DESCRIPTION) {
                        $('#divPopupIssueTrackingInfo #liDescription').addClass('have_change');
                        $('#divPopupIssueTrackingInfo #liDescription').prop('title', data.O_DESCRIPTION);
                    } else {
                        $('#divPopupIssueTrackingInfo #liDescription').removeClass('spanTooltip');
                    }
                    $("#divPopupIssueTrackingInfo #liIssueCode").text(data.division_code + '_' + data.ISSUE_CODE);
                    $("#divPopupIssueTrackingInfo #liPicBu").text(data.PIC_BU);
                    if (data.O_PIC_BU != null && data.PIC_BU != data.O_PIC_BU) {
                        $('#divPopupIssueTrackingInfo #liPicBu').addClass('have_change');
                        $('#divPopupIssueTrackingInfo #liPicBu').prop('title', data.O_PIC_BU);
                    } else {
                        $('#divPopupIssueTrackingInfo #liPicBu').removeClass('spanTooltip');
                    }
                    $("#divPopupIssueTrackingInfo #liCurrentAssig").text(data.CURRENT_ASSIGNEE);
                    if (data.O_CURRENT_ASSIGNEE != null && data.CURRENT_ASSIGNEE != data.O_CURRENT_ASSIGNEE) {
                        $('#divPopupIssueTrackingInfo #liCurrentAssig').addClass('have_change');
                        $('#divPopupIssueTrackingInfo #liCurrentAssig').prop('title', data.O_CURRENT_ASSIGNEE);
                    } else {
                        $('#divPopupIssueTrackingInfo #liCurrentAssig').removeClass('spanTooltip');
                    }
                    $("#divPopupIssueTrackingInfo #liDeadline").text(data.EST_DEADLINE == null ? '' : FormatDate(data.EST_DEADLINE));
                    if (data.O_EST_DEADLINE != null && data.EST_DEADLINE != data.O_EST_DEADLINE) {
                        $('#divPopupIssueTrackingInfo #liDeadline').addClass('have_change');
                        $('#divPopupIssueTrackingInfo #liDeadline').prop('title', FormatDate(data.O_EST_DEADLINE));
                    } else {
                        $('#divPopupIssueTrackingInfo #liDeadline').removeClass('spanTooltip');
                    }
                    $("#divPopupIssueTrackingInfo #liActualFinishDate").text(data.FINISHING_DATE == null ? '' : FormatDate(data.FINISHING_DATE));
                    if (data.O_FINISHING_DATE != null && data.FINISHING_DATE != data.O_FINISHING_DATE) {
                        $('#divPopupIssueTrackingInfo #liActualFinishDate').addClass('have_change');
                        $('#divPopupIssueTrackingInfo #liActualFinishDate').prop('title', FormatDate(data.O_FINISHING_DATE));
                    } else {
                        $('#divPopupIssueTrackingInfo #liActualFinishDate').removeClass('spanTooltip');
                    }
                    $("#divPopupIssueTrackingInfo #liAgreeSol").text(data.AGREED_SOLUTION);
                    if (data.O_AGREED_SOLUTION != null && data.AGREED_SOLUTION != data.O_AGREED_SOLUTION) {
                        $('#divPopupIssueTrackingInfo #liAgreeSol').addClass('have_change');
                        $('#divPopupIssueTrackingInfo #liAgreeSol').prop('title', data.O_AGREED_SOLUTION);
                    } else {
                        $('#divPopupIssueTrackingInfo #liAgreeSol').removeClass('spanTooltip');
                    }
                    $("#divPopupIssueTrackingInfo #liNote").text(data.NOTE);
                    if (data.O_NOTE != null && data.NOTE != data.O_NOTE) {
                        $('#divPopupIssueTrackingInfo #liNote').addClass('have_change');
                        $('#divPopupIssueTrackingInfo #liNote').prop('title', data.O_NOTE);
                    } else {
                        $('#divPopupIssueTrackingInfo #liNote').removeClass('spanTooltip');
                    }

                    $('.spanTooltip[title]').qtip({ style: { name: 'green', tip: true, border: { radius: 5 } } });
                }
            }
        });

    };

    function FormatDate(strDate) {
        orderdate = new Date(parseInt(strDate.replace("/Date(", "").replace(")/", ""), 10))
        month = orderdate.getMonth() + 1 < 10 ? '0' + (orderdate.getMonth() + 1).toString() : orderdate.getMonth();
        return month + '/' + orderdate.getDate() + '/' + orderdate.getFullYear();
    }
    $(this.htmlTag.btnAddnew).live('click', function () {
        page_IssueTracking.showPopup(-1);
        $("#popup_save").attr("value", "Insert");
    });

    this.processFormButton = function () {
        $(this.htmlTag.popupCloseButton).click(function () {
            page_IssueTracking.close();
        });

        $(this.htmlTag.popup_cancel).click(function () {
            page_IssueTracking.close();
        });
    };

    this.close = function () {
        if ($(page_IssueTracking.htmlTag.divPopupContainerWrapper).length != 0) {
            $(page_IssueTracking.htmlTag.divPopupContainerWrapper).remove();
        }
    };

    this.functionOnItem = function (f, issueId) {
        switch (f) {
            case 2:
                page_IssueTracking.showPopup(issueId);
                break;
            case 1:
                page_IssueTracking.showPopupViewTrackingInfo(issueId);
                break;
            case 3:
                page_IssueTracking.deleteIssueTracking(issueId);
                break;
            case 5:
                page_IssueTracking.updateStatus(issueId, 2);
                break;
        }
    };

    this.deleteIssueTracking = function (issueId) {
        textConfirm = "Are you sure delete this tracking?";
        account = page_IssueTracking.variable.accountName == '' ? $("#divSearch #ddlPIC").val() : page_IssueTracking.variable.accountName;
        jConfirm(textConfirm, null, function (r) {
            if (r) {
                Loading.showProcess();
                $.ajax({
                    type: "POST",
                    contentType: "application/json;charset:utf-8",
                    url: "/webServices/IssueTrackingWS.asmx/DeleteIssueTracking",
                    data: JSON.encode({ issueId: issueId, account: account }),
                    dataType: "json",
                    cache: false,
                    success: function (data) {
                        if (data.d >= 0) {
                            page_IssueTracking.close();
                            page_IssueTracking.bindData(1, page_IssueTracking.variable.objPaging.pageSize);
                        }
                        else if (data.d == -1) {
                            jAlert("Issue tracking is already exists.");
                        }
                        Loading.closeProcess();
                    }
                });
            }
        });

    }
    this.updateStatus = function (issueId, status) {
        textConfirm = "";
        if (status == 2)
            textConfirm = "Are you sure confirm this report?";
        //else if (status == 1) textConfirm = "Are you sure unlock this report";
        account = page_IssueTracking.variable.accountName == '' ? $("#divSearch #ddlPIC").val() : page_IssueTracking.variable.accountName;
        jConfirm(textConfirm, null, function (r) {
            if (r) {
                Loading.showProcess();
                $.ajax({
                    type: "POST",
                    contentType: "application/json;charset:utf-8",
                    url: "/webServices/IssueTrackingWS.asmx/ConfirmIssueTracking",
                    data: JSON.encode({ issueCode: issueId, account: account }),
                    dataType: "json",
                    cache: false,
                    success: function (data) {
                        if (data.d >= 0) {
                            page_IssueTracking.close();
                            page_IssueTracking.bindData(1, page_IssueTracking.variable.objPaging.pageSize);
                        }
                        else if (data.d == -1) {
                            jAlert("Report code is already exists.");
                        }
                        Loading.closeProcess();
                    }
                });
            }
        });
    };

    $(this.htmlTag.popup_save).live('click', function () {
        if (!FValidate.isValidateAll()) return;

        divisionId = $.trim($("#divPopupUpdateReportList #ddlClientDivision").val());
        picBICC = $.trim($("#divPopupUpdateReportList #ddlPicBICC").val());
        status = $.trim($("#divPopupUpdateReportList #ddlStatus").val());
        issueCreateDate = $.trim($("#divPopupUpdateReportList #txtCreateDate").val());
        firstFeedbackDate = $.trim($("#divPopupUpdateReportList #txtFirstFeedbackDate").val());
        summary = $.trim($("#divPopupUpdateReportList #txtSummary").val());
        description = $.trim($("#divPopupUpdateReportList #txtDescription").val());
        picBU = $.trim($("#divPopupUpdateReportList #txtPicBu").val());
        currAssignee = $.trim($("#divPopupUpdateReportList #txtCurrAssig").val());
        deadline = $.trim($("#divPopupUpdateReportList #txtDeadline").val());
        finishDate = $.trim($("#divPopupUpdateReportList #txtFinishDate").val());
        agreeSolution = $.trim($("#divPopupUpdateReportList #txtAgreeSolution").val());
        note = $.trim($("#divPopupUpdateReportList #txtNote").val());



        requestId = $.trim($("#divPopupUpdateReportList #txtRequestId").val());
        if (page_IssueTracking.variable.accountName == '')
            account = $("#divPopupUpdateReportList #ddlAccount").val();
        else account = page_IssueTracking.variable.accountName;

        toolOfReport = $("#divPopupUpdateReportList #ddlToolOfAuto").val();

        accountBackup = $("#divPopupUpdateReportList #ddlAccountBackup").val();

        isAuto = $("#divPopupUpdateReportList #ddlIsAuto").val();

        if (page_IssueTracking.variable.issueId == -1) {
            //Thêm mới
            var _data = {
                divisionId: divisionId, picBICC: picBICC, status: status, issueCreateDate: issueCreateDate, firstFeedbackDate: firstFeedbackDate, summary: summary, description: description, picBU: picBU, currAssignee: currAssignee, deadline: deadline, finishDate: finishDate, agreeSolution: agreeSolution, note: note, account: account
            };
            page_IssueTracking.addIssueTracking(_data);
        }
        else {
            var _data = {
                issueCode: page_IssueTracking.variable.issueId, divisionId: divisionId, picBICC: picBICC, status: status, issueCreateDate: issueCreateDate, firstFeedbackDate: firstFeedbackDate, summary: summary, description: description, picBU: picBU, currAssignee: currAssignee, deadline: deadline, finishDate: finishDate, agreeSolution: agreeSolution, note: note, account: account
            };
            page_IssueTracking.updateIssueTracking(_data);
        }

    });

    this.addIssueTracking = function (_data) {
        Loading.showProcess();
        $.ajax({
            type: "POST",
            contentType: "application/json;charset:utf-8",
            url: "/webServices/IssueTrackingWS.asmx/InsertIssueTracking",
            data: JSON.encode(_data),
            dataType: "json",
            cache: false,
            success: function (data) {
                if (data.d > 0) {
                    page_IssueTracking.bindData(1, page_IssueTracking.variable.objPaging.pageSize);
                    page_IssueTracking.close();
                }
                else if (data.d == -1)
                    jAlert("Report name is already exists");
                Loading.closeProcess();
            },
            error: function (data) {
                jAlert("An error occurred while performing", function () {
                    Loading.close();
                });
            }
        });
    };

    this.updateIssueTracking = function (_data) {
        Loading.showProcess();
        $.ajax({
            type: "POST",
            contentType: "application/json;charset:utf-8",
            url: "/webServices/IssueTrackingWS.asmx/UpdateIssueTracking",
            data: JSON.encode(_data),
            dataType: "json",
            cache: false,
            success: function (data) {
                if (data.d == 0) {
                    page_IssueTracking.bindData(1, page_IssueTracking.variable.objPaging.pageSize);
                    page_IssueTracking.close();
                }
                else if (data.d == -1)
                    jAlert("Report code is already exists");
                Loading.closeProcess();
            },
            error: function () {
                jAlert("An error occurred while performing", function () {
                    Loading.close();
                });
            }
        });
    };

    $("#txtToDate").live('change', function () {
        var toDate = $(this).datepicker("getDate");
        var fromDate = $("#txtFromDate").datepicker("getDate");
        if (toDate < fromDate) {
            jAlert("To Date must larger or equal From Date", null, function () {
                $("#txtToDate").val("");
                $("#txtToDate").focus();
            });
        }
    });

    this.exportExcel = function () {
        frequency = $("#divSearch #ddlFrequency").val();

        account = page_IssueTracking.variable.accountName == '' ? $("#divSearch #ddlPIC").val() : page_IssueTracking.variable.accountName;
        status = $("#ddlStatus").val();

        window.location.href = "/handler/Export.ashx?frequency=" + frequency + "&account=" + account + "&status=" + status + "&t=ExportExcelReportList";
    };

    this.getListMember = function () {
        $.ajax({
            type: "GET",
            url: "/handler/Report.ashx",
            data: { issueCode: page_IssueTracking.variable.issueId, accountName: $("#txtAccountName").val(), t: "GetReportListClient" },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                var strHtml = '';
                if (data.length > 0) {
                    for (var i = 0; i < data.length; i++) {
                        strHtml += ' <tr>'
                 + '    <td class="selected">'
                 + '        <input type="checkbox" class="cbRecord" id="CAS' + data[i].AdminId + '">'
                 + '    </td>'
                 + '    <td class="title column100l" style="text-align:left;">'
                 + data[i].Name
                 + '    </td>'
                 + '    <td class="last left" style="text-align:left;">'
                 + data[i].FullName
                 + '    </td>'
                 + ' </tr>';
                    }
                }
                else {
                    strHtml += ' <tr>'
                + '    <td colspan="3" class="last" style="text-align:left;">'
                + '        Not found account'
                + '    </td>'
                + ' </tr>';
                }
                $("#tbListMember").html('');
                $("#tbListMember").html(strHtml);
            }
        });
    };

    this.processFormButtonMember = function () {
        $("#CAS1").live('click', function () {
            if ($(this).is(':checked')) {
                $(this).parent().parent().addClass('selected ');
            } else {
                $(this).parent().parent().removeClass('selected ');
            }
        });

        $("#popup_save_member").live('click', function () {
            var ischecked = false;
            $("#tbListMember input:checkbox").each(function () {
                if ($(this).is(':checked')) {
                    ischecked = true;
                    return false;
                }
            });
            if (!ischecked) {
                //                jAlert("Please choose account name.", null);
            }
            else {
                var listAdmin = "";
                $("#tbListMember input:checkbox").each(function () {
                    if ($(this).is(':checked')) {
                        listAdmin += $(this).attr('id').substring(3) + ",";
                    }
                });
                listAdmin = listAdmin.substring(0, listAdmin.length - 1);
                var _data = { adminIds: listAdmin, issueCode: page_IssueTracking.variable.issueId };
                Loading.showProcess();
                $.ajax({
                    type: "POST",
                    contentType: "application/json",
                    dataType: "json",
                    data: JSON.encode(_data),
                    cache: false,
                    url: "/webServices/ReportWS.asmx/UpdateReportListClient",
                    success: function (data) {
                        page_IssueTracking.getListReportListClient();
                        Loading.closeProcess();
                    }
                });
                page_IssueTracking.closeMember();
            }
        });
    };

    this.closeMember = function () {
        if ($("#divChooseMemberWrapper").length != 0) {
            $("#divChooseMemberWrapper").remove();
        }
    };

    $(".popupclosebutton, #popup_cancel_member").live('click', function () {
        page_IssueTracking.closeMember();
    });

    $("#liAddClient").live('click', function () {
        if (page_IssueTracking.variable.issueId == -1) {
            jAlert("Please insert report list before add client");
            return;
        }

        if ($("#divChooseMemberWrapper").length == 0) {
            $("body").append("<div id='divChooseMemberWrapper'></div>");
            $("#divChooseMemberWrapper").setTemplateURL("/Templates/popup/report/ChooseClient.htm");
            $("#divChooseMemberWrapper").processTemplate(null);
            COMMON.setTemplatePopup("#divPopupChooseMember");
            page_IssueTracking.processFormButtonMember();
            page_IssueTracking.getListMember();
        };
    });

    $("#txtAccountName").live('keyup', function () {
        page_IssueTracking.getListMember();
    });

    $("#divSearch #ddlFrequency,#divSearch #ddlStatus,#divSearch #ddlPIC").live('change', function () {
        page_IssueTracking.bindData();
    });

    this.showPopupAddRequestForm = function (issueId) {
        page_IssueTracking.variable.issueId = issueId;
        if ($(page_IssueTracking.htmlTag.divPopupContainerWrapper).length == 0) {
            $("body").append("<div id='" + this.htmlTag.divPopupContainerWrapper.substring(1) + "'></div>");
            $(this.htmlTag.divPopupContainerWrapper).setTemplateURL("/Templates/popup/report/RequestFormUpdate.htm?v=1");
            $(this.htmlTag.divPopupContainerWrapper).processTemplate(null);
            COMMON.setTemplatePopup(this.htmlTag.divPopupRequestFormContainer);
            this.processFormButton();

            $(".name-report").html($("#ReportName" + issueId + " a").html());

            this.uploadFileRequestForm();
        }
    };

    this.uploadFileRequestForm = function () {
        $('#btnUpload').live('click', function () {
            if ($('#txtFileUpload').val() == '') {
                jAlert('Please choose file upload.');
                return;
            }
            $("#frmUploadRequestForm").submit();
        });
        $("#frmUploadRequestForm").ajaxForm({
            url: '',
            type: 'post',
            dataType: 'text',
            beforeSubmit: function () {
                Loading.show();
                this.url = '/handler/Report.ashx?t=uploadRequestForm&fileName=' + $("#ReportName" + page_IssueTracking.variable.issueId + " a").html();
            },
            success: function (serverData) {
                Loading.close();
                if (serverData == '-1') {
                    jAlert("Wrong format allow.", "Alert");
                    return;
                }
                else {
                    var strResponse = serverData.split('|');
                    if (strResponse[0] == '1') {
                        page_IssueTracking.variable.fileName = strResponse[1];
                        $("#hfOldFileUpload").val(strResponse[1]);
                        page_IssueTracking.clearForm();

                        page_IssueTracking.updateRequestForm(strResponse[2]);
                    }
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                jAlert(textStatus);
                Loading.close();
            },
            clearForm: true,
            resetForm: true
        });
    };

    this.clearForm = function () {
        $("#txtFileUpload").val('');
        $(this.htmlTag.divPopupContainerWrapper).remove();
    };

    this.updateRequestForm = function () {
        Loading.showProcess();
        $.ajax({
            type: "POST",
            contentType: "application/json;charset:utf-8",
            url: "/webServices/ReportWS.asmx/UpdateRequestForm",
            data: JSON.encode({ issueCode: this.variable.issueId, requestForm: this.variable.fileName }),
            dataType: "json",
            cache: false,
            success: function (data) {
                if (data.d > 0) {
                    page_IssueTracking.close();
                    page_IssueTracking.bindData();
                }
                Loading.closeProcess();
            }
        });
    };

    this.download = function (fileName) {
        window.location.href = "/handler/Report.ashx?t=Download&fileName=" + fileName;
    };

    this.showPopupDeadline = function (frequency) {
        if ($("#divChooseDeadlineWrapper").length == 0) {
            $("body").append("<div id='divChooseDeadlineWrapper'></div>");
            $("#divChooseDeadlineWrapper").setTemplateURL("/Templates/popup/report/ChooseDeadline.htm?v=1");
            $("#divChooseDeadlineWrapper").processTemplate(null);
            COMMON.setTemplatePopup("#divPopupChooseDeadline");
            page_IssueTracking.processFormButtonDeadline();
            page_IssueTracking.getListDeadline(frequency);
        };
    };

    this.getListDeadline = function (frequency) {
        $.ajax({
            type: "GET",
            url: "/handler/Report.ashx",
            data: { frequency: frequency, t: "GetDeadline" },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                var strHtml = '';
                if (data.length > 0) {
                    for (var i = 0; i < data.length; i++) {
                        strHtml += ' <tr>'
                 + '    <td class="selected" style="width:50px;">'
                 + '        <input type="checkbox" class="cbRecord" id="CAS' + data[i].parameter + '">'
                 + '    </td>'
                 + '    <td class="title column100l" style="text-align:left;">'
                 + data[i].parameter
                 + '    </td>'
                 + ' </tr>';
                    }
                }
                $("#tbListDeadline").html('');
                $("#tbListDeadline").html(strHtml);
            }
        });
    };

    this.closeDeadline = function () {
        if ($("#divChooseDeadlineWrapper").length != 0) {
            $("#divChooseDeadlineWrapper").remove();
        }
    };

    $(".popupclosebutton, #popup_cancel_deadline").live('click', function () {
        page_IssueTracking.closeDeadline();
    });

    this.processFormButtonDeadline = function () {
        $("#popup_save_deadline").live('click', function () {
            var ischecked = false;
            $("#tbListDeadline input:checkbox").each(function () {
                if ($(this).is(':checked')) {
                    ischecked = true;
                    return false;
                }
            });
            if (!ischecked) {
                //                jAlert("Please choose account name.", null);
            }
            else {
                var listDeadline = "";
                $("#tbListDeadline input:checkbox").each(function () {
                    if ($(this).is(':checked')) {
                        listDeadline += $(this).attr('id').substring(3) + ", ";
                    }
                });

                if (listDeadline != "")
                    listDeadline = listDeadline.substring(0, listDeadline.length - 2);

                $("#txtDeadline").val("");
                $("#txtDeadline").val(listDeadline);

                page_IssueTracking.closeDeadline();
            }

        });
    };
};