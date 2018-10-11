/// <reference path="../lib/common.js" />

page_ReportList = new function () {
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
        this.reportListId = -1;
        this.accountName = '';
        this.fileName = '';

        this.auto = '';
    };

    this.documentReady = function (accountName) {
        this.variable.accountName = accountName;
        if (accountName == "") {
            this.getPIC();
        }
        this.bindData();
    };

    this.bindData = function () {
        Loading.show();

        reportName = $("#divSearch #txtReportName1").val();
        frequency = $("#divSearch #ddlFrequency").val();
        account = page_ReportList.variable.accountName == '' ? $("#divSearch #ddlPIC").val() : page_ReportList.variable.accountName;

        status = $("#ddlStatus").val();
        $.ajax({
            type: "GET",
            url: "/handler/Report.ashx",
            data: { reportName: reportName, frequency: frequency, account: account, status: status, t: "GetListReportList" },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                $(page_ReportList.htmlTag.divList).setTemplateURL("/templates/pages/report/ReportList.htm");
                $(page_ReportList.htmlTag.divList).processTemplate(data);

                $('.spanTooltip[title]').qtip({ style: { name: 'green', tip: true, border: { radius: 5 } } });

                Loading.close();

            }
        });
    };

    $("#divSearch #txtReportName1").live('keydown', function () {
        page_ReportList.bindData();
    });



    $("#txtRequestId").live('change', function () {
        var reportListId = $("#txtRequestId").val();
        $.ajax({
            type: "GET",
            url: "/handler/RequestReport.ashx",
            data: { reportListId: reportListId, accountName: page_ReportList.variable.accountName, t: "GetInfoRequestForCreateReport" },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data_repsponse) {
                if (data_repsponse.length > 0) {
                    data = data_repsponse[0];
                    $("#divPopupUpdateReportList #txtReportName").html(data.Request_Name);
                    $("#divPopupUpdateReportList #txtEmailClient").html(data.Client_Email);
                    var frequencyMap;
                    switch (data.Frequency) {
                        case "1":
                            frequencyMap = 'Daily';
                            break;
                        case "2":
                            frequencyMap = 'Weekly';
                            break;
                        case "3":
                            frequencyMap = 'Monthly';
                            break;
                        case "4":
                            frequencyMap = 'Quarterly';
                            break;
                        case "5":
                            frequencyMap = 'Yearly';
                            break;
                        case "6":
                            frequencyMap = 'Fortnightly';
                            break;
                        case "7":
                            frequencyMap = 'Semi-annual';
                            break;
                        default:
                            break;
                    }
                    $("#divPopupUpdateReportList #ddlFrequency").html(frequencyMap);
                    $("#divPopupUpdateReportList #txtDeadline").html(data.Delivered_Date);
                    $("#divPopupUpdateReportList #txtDescription").html($.trim(data.Decription));
                } else {
                    $("#txtRequestId").val("");
                    alert("Request id " + reportListId + " not exist or it isn't your request, please try again!");
                }
            }
        });
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

    this.getListMemberByDepartment = function (reportListId) {
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
                //$("#divPopupUpdateReportList #ddlAccount").append(html);
                $("#divPopupUpdateReportList #ddlAccountBackup").append(html);

                if (reportListId > 0) {
                    page_ReportList.getInfoReportList();
                }
            }
        });
    };

    this.showPopup = function (reportListId) {
        page_ReportList.variable.reportListId = reportListId;
        if ($(page_ReportList.htmlTag.divPopupContainerWrapper).length == 0) {
            $("body").append("<div id='" + this.htmlTag.divPopupContainerWrapper.substring(1) + "'></div>");
            $(this.htmlTag.divPopupContainerWrapper).setTemplateURL("/Templates/popup/report/ReportListUpdate.htm");
            $(this.htmlTag.divPopupContainerWrapper).processTemplate(null);
            COMMON.setTemplatePopup(this.htmlTag.divPopupContainer);
            this.processFormButton();

            page_ReportList.getListMemberByDepartment(reportListId);

            if (page_ReportList.variable.accountName != '')
                $("#ddlAccount").html(page_ReportList.variable.accountName);
        }
    };

    this.showPopupCreateReport = function (reportListId) {
        page_ReportList.variable.reportListId = reportListId;
        if ($(page_ReportList.htmlTag.divPopupContainerWrapper).length == 0) {
            $("body").append("<div id='" + this.htmlTag.divPopupContainerWrapper.substring(1) + "'></div>");
            $(this.htmlTag.divPopupContainerWrapper).setTemplateURL("/Templates/popup/report/ReportCreateManual.htm?v=1");
            $(this.htmlTag.divPopupContainerWrapper).processTemplate(null);
            COMMON.setTemplatePopup("#divPopupCreateReport");
            this.processFormButton();

            $("#txtDeadline").datepicker({
                changeMonth: true,
                changeYear: true
            });
        }
    };

    $("#popup_create").live('click', function () {
        jConfirm("Do you want create report?", null, function (r) {
            if (r) {
                $.ajax({
                    type: "POST",
                    contentType: "application/json",
                    dataType: "json",
                    data: JSON.encode({ reportListId: page_ReportList.variable.reportListId, deadline: $("#txtDeadline").val() }),
                    cache: false,
                    url: "/webServices/ReportWS.asmx/InsertReport",
                    success: function (data) {
                        if (data.d > 0) {
                            //                            $(page_ReportList.htmlTag.popupCloseButton).trigger('click');
                            //                            jConfirm("Create report successful. Do you want go to work tracker?", null, function (r) {
                            //                                if (r)
                            window.location.href = page_ReportList.variable.accountName == '' ? "/my-work-tracker" : '/my-work-tracker';
                            //                            });
                        }
                    },
                    error: function (data) {
                        alert('error');
                    }
                });
            }
        });
    });

    $(this.htmlTag.btnAddnew).live('click', function () {
        page_ReportList.showPopup(-1);
        $("#popup_save").attr("value", "Insert");
        $("#txtReportName").val("BICC_");
    });

    this.processFormButton = function () {
        $(this.htmlTag.popupCloseButton).click(function () {
            page_ReportList.close();
        });

        $(this.htmlTag.popup_cancel).click(function () {
            page_ReportList.close();
        });
    };

    this.close = function () {
        if ($(page_ReportList.htmlTag.divPopupContainerWrapper).length != 0) {
            $(page_ReportList.htmlTag.divPopupContainerWrapper).remove();
        }
    };

    this.functionOnItem = function (f, reportTypeId) {
        switch (f) {
            case 2:
                page_ReportList.showPopup(reportTypeId);
                break;
            case 1:
                page_ReportList.showPopupCreateReport(reportTypeId);
                break;
            case 3:
                page_ReportList.updateStatus(reportTypeId, 1);
                break;
            case 4:
                page_ReportList.updateStatus(reportTypeId, 0);
                break;
            case 5:
                page_ReportList.updateStatus(reportTypeId, 2);
                break;
        }
    };

    this.updateStatus = function (reportListId, status) {
        textConfirm = "";
        if (status == 2)
            textConfirm = "Are you sure close this report?";
        else if (status == 1) textConfirm = "Are you sure unlock this report";
        jConfirm(textConfirm, null, function (r) {
            if (r) {
                Loading.showProcess();
                $.ajax({
                    type: "POST",
                    contentType: "application/json;charset:utf-8",
                    url: "/webServices/ReportWS.asmx/UpdateStatusReportList",
                    data: JSON.encode({ reportListId: reportListId, status: status }),
                    dataType: "json",
                    cache: false,
                    success: function (data) {
                        if (data.d > 0) {
                            page_ReportList.close();
                            page_ReportList.bindData();
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

    this.getInfoReportList = function () {
        $.ajax({
            type: "GET",
            url: "/handler/Report.ashx",
            data: { reportListId: this.variable.reportListId, t: "GetInfoReportList" },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                if (data != null) {
                    $("#divPopupUpdateReportList #txtRequestId").val(data.Request_Id)
                    $("#divPopupUpdateReportList #txtReportName").html(data.ReportName);
                    $("#divPopupUpdateReportList #txtReportCode").val(data.ReportCode);
                    $("#divPopupUpdateReportList #ddlClient").val(data.Client);
                    $("#divPopupUpdateReportList #txtEmailClient").html(data.EmailClient);
                    $("#divPopupUpdateReportList #txtDeadline").html(data.Deadline);
                    var frequencyMap;
                    switch (data.Frequency) {
                        case "1":
                            frequencyMap = 'Daily';
                            break;
                        case "2":
                            frequencyMap = 'Weekly';
                            break;
                        case "3":
                            frequencyMap = 'Monthly';
                            break;
                        case "4":
                            frequencyMap = 'Quarterly';
                            break;
                        case "5":
                            frequencyMap = 'Yearly';
                            break;
                        case "6":
                            frequencyMap = 'Fortnightly';
                            break;
                        case "7":
                            frequencyMap = 'Semi-annual';
                            break;
                        default:
                            break;
                    }
                    $("#divPopupUpdateReportList #ddlFrequency").html(frequencyMap);
                    $("#divPopupUpdateReportList #ddlAccount").html(data.Account);
                    $("#divPopupUpdateReportList #ddlAccountBackup").val(data.AccountBackup);
                    $("#divPopupUpdateReportList #ddlIsAuto").val(data.IsAuto);
                    $("#divPopupUpdateReportList #txtDescription").html($.trim(data.Description));

                    if (data.Frequency != 1 && data.Frequency != 5)
                        $("#divDeadline").show();
                }
            }
        });

        page_ReportList.getListReportListClient();
    };

    $(this.htmlTag.popup_save).live('click', function () {
        if (!FValidate.isValidateAll()) return;


        requestId = $.trim($("#divPopupUpdateReportList #txtRequestId").val());
        //reportName = $.trim($("#divPopupUpdateReportList #txtReportName").val());
        //client = $.trim($("#divPopupUpdateReportList #ddlClient").val());
        //emailClient = $.trim($("#divPopupUpdateReportList #txtEmailClient").val());
        //frequency = $("#divPopupUpdateReportList #ddlFrequency").val();

        //if (frequency == 1)
        //    deadline = "EOD";
        //else if (frequency == 5)
        //    deadline = "REALTIME";
        //else deadline = $.trim($("#txtDeadline").val());

        //description = $.trim($("#divPopupUpdateReportList #txtDescription").val());

        if (page_ReportList.variable.accountName == '')
            account = $("#divPopupUpdateReportList #ddlAccount").val();
        else account = page_ReportList.variable.accountName;

        toolOfReport = $("#divPopupUpdateReportList #ddlToolOfAuto").val();

        accountBackup = $("#divPopupUpdateReportList #ddlAccountBackup").val();

        isAuto = $("#divPopupUpdateReportList #ddlIsAuto").val();

        if (page_ReportList.variable.reportListId == -1) {
            //Thêm mới
            var _data = {
                requestId: requestId, account: account, accountBackup: accountBackup, isAuto: isAuto, toolOfReport: toolOfReport
            };
            page_ReportList.addReportList(_data);
        }
        else {
            var _data = {
                reportListId: page_ReportList.variable.reportListId, requestId: requestId, account: account, accountBackup: accountBackup, isAuto: isAuto, toolOfReport: toolOfReport
            };
            page_ReportList.updateReportList(_data);
        }

    });

    this.addReportList = function (_data) {
        Loading.showProcess();
        $.ajax({
            type: "POST",
            contentType: "application/json;charset:utf-8",
            url: "/webServices/ReportWS.asmx/InsertReportList",
            data: JSON.encode(_data),
            dataType: "json",
            cache: false,
            success: function (data) {
                if (data.d > 0) {
                    //                    jConfirm("Add new report successful, Do you want set account client now?", null, function (r) {
                    //                        if (r) {
                    //                            page_ReportList.variable.reportListId = data.d;
                    //                            $("#liAddClient").trigger('click');
                    //                            $("#pop_save").attr("value", "Update");
                    //                        }
                    //                        else if (!r)
                    //                            page_ReportList.close();
                    //                    });
                    //page_ReportList.close();
                    page_ReportList.bindData();
                    page_ReportList.close();
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

    this.updateReportList = function (_data) {
        Loading.showProcess();
        $.ajax({
            type: "POST",
            contentType: "application/json;charset:utf-8",
            url: "/webServices/ReportWS.asmx/UpdateReportList",
            data: JSON.encode(_data),
            dataType: "json",
            cache: false,
            success: function (data) {
                if (data.d > 0) {
                    page_ReportList.close();
                    page_ReportList.bindData();
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

    $("#divPopupUpdateReportList #ddlFrequency").live('change', function () {
        var frequency = $(this).val();

        $("#txtDeadline").datepicker("destroy");

        if (frequency == 1 || frequency == 5) {
            $("#txtDeadline").removeAttr("fempty");
            $("#divDeadline").hide();
        }
        else {
            $("#divDeadline").show();
            $("#txtDeadline").attr("fempty", "*");

            if (frequency == 4) {
                $("#txtDeadline").datepicker({
                    changeMonth: true,
                    changeYear: true
                });
            }
        }
        $("#txtDeadline").val('');

        if (frequency == 4)
            $("#txtDeadline").attr("placeholder", "Example: 08/15/2014");
        else if (frequency == 2 || frequency == 6)
            $("#txtDeadline").attr("placeholder", "Example: Monday, Tuesday, Wednesday");
        else $("#txtDeadline").attr("placeholder", "Example: 01, 02, 05, 12, 30");
    });

    $("#txtDeadline").live("focus", function () {
        if ($("#divPopupUpdateReportList #ddlFrequency").val() == 2)
            page_ReportList.showPopupDeadline("weekly");
        else if ($("#divPopupUpdateReportList #ddlFrequency").val() == 3)
            page_ReportList.showPopupDeadline("monthly");
    });


    this.exportExcel = function () {
        frequency = $("#divSearch #ddlFrequency").val();

        account = page_ReportList.variable.accountName == '' ? $("#divSearch #ddlPIC").val() : page_ReportList.variable.accountName;
        status = $("#ddlStatus").val();

        window.location.href = "/handler/Export.ashx?frequency=" + frequency + "&account=" + account + "&status=" + status + "&t=ExportExcelReportList";
    };

    this.getListMember = function () {
        $.ajax({
            type: "GET",
            url: "/handler/Report.ashx",
            data: { reportListId: page_ReportList.variable.reportListId, accountName: $("#txtAccountName").val(), t: "GetReportListClient" },
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
                var _data = { adminIds: listAdmin, reportListId: page_ReportList.variable.reportListId };
                Loading.showProcess();
                $.ajax({
                    type: "POST",
                    contentType: "application/json",
                    dataType: "json",
                    data: JSON.encode(_data),
                    cache: false,
                    url: "/webServices/ReportWS.asmx/UpdateReportListClient",
                    success: function (data) {
                        page_ReportList.getListReportListClient();
                        Loading.closeProcess();
                    }
                });
                page_ReportList.closeMember();
            }
        });
    };

    this.closeMember = function () {
        if ($("#divChooseMemberWrapper").length != 0) {
            $("#divChooseMemberWrapper").remove();
        }
    };

    $(".popupclosebutton, #popup_cancel_member").live('click', function () {
        page_ReportList.closeMember();
    });

    $("#liAddClient").live('click', function () {
        if (page_ReportList.variable.reportListId == -1) {
            jAlert("Please insert report list before add client");
            return;
        }

        if ($("#divChooseMemberWrapper").length == 0) {
            $("body").append("<div id='divChooseMemberWrapper'></div>");
            $("#divChooseMemberWrapper").setTemplateURL("/Templates/popup/report/ChooseClient.htm");
            $("#divChooseMemberWrapper").processTemplate(null);
            COMMON.setTemplatePopup("#divPopupChooseMember");
            page_ReportList.processFormButtonMember();
            page_ReportList.getListMember();
        };
    });

    this.getListReportListClient = function () {
        $.ajax({
            type: "GET",
            url: "/handler/Report.ashx",
            data: { reportListId: this.variable.reportListId, t: "GetListReportListClient" },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                $("#tbListClient").setTemplateURL("/templates/pages/report/ReportListClient.htm");
                $("#tbListClient").processTemplate(data);
            }
        });
    };

    this.removeClient = function (id) {
        $.ajax({
            type: "POST",
            contentType: "application/json",
            dataType: "json",
            data: JSON.encode({ id: id }),
            cache: false,
            url: "/webServices/ReportWS.asmx/RemoveReportListClient",
            success: function (data) {
                page_ReportList.getListReportListClient();
            }
        });
    };

    $("#txtAccountName").live('keyup', function () {
        page_ReportList.getListMember();
    });

    $("#divSearch #ddlFrequency,#divSearch #ddlStatus,#divSearch #ddlPIC").live('change', function () {
        page_ReportList.bindData();
    });

    this.showPopupAddRequestForm = function (reportListId) {
        page_ReportList.variable.reportListId = reportListId;
        if ($(page_ReportList.htmlTag.divPopupContainerWrapper).length == 0) {
            $("body").append("<div id='" + this.htmlTag.divPopupContainerWrapper.substring(1) + "'></div>");
            $(this.htmlTag.divPopupContainerWrapper).setTemplateURL("/Templates/popup/report/RequestFormUpdate.htm?v=1");
            $(this.htmlTag.divPopupContainerWrapper).processTemplate(null);
            COMMON.setTemplatePopup(this.htmlTag.divPopupRequestFormContainer);
            this.processFormButton();

            $(".name-report").html($("#ReportName" + reportListId + " a").html());

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
                this.url = '/handler/Report.ashx?t=uploadRequestForm&fileName=' + $("#ReportName" + page_ReportList.variable.reportListId + " a").html();
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
                        page_ReportList.variable.fileName = strResponse[1];
                        $("#hfOldFileUpload").val(strResponse[1]);
                        page_ReportList.clearForm();

                        page_ReportList.updateRequestForm(strResponse[2]);
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
            data: JSON.encode({ reportListId: this.variable.reportListId, requestForm: this.variable.fileName }),
            dataType: "json",
            cache: false,
            success: function (data) {
                if (data.d > 0) {
                    page_ReportList.close();
                    page_ReportList.bindData();
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
            page_ReportList.processFormButtonDeadline();
            page_ReportList.getListDeadline(frequency);
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
        page_ReportList.closeDeadline();
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

                page_ReportList.closeDeadline();
            }

        });
    };
};