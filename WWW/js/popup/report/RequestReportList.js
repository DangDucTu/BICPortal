/// <reference path="../lib/common.js" />

page_ReportList = new function () {
    this.htmlTag = new function () {
        this.divList = '#tbListReportList';
        this.divPopupUploadContainerWrapper = '#divPopupUploadContainerWrapper';
        this.divPopupContainerWrapper = '#divPopupUpdateReportListWrapper';
        this.divPopupContainer = '#divPopupUpdateReportList';
        this.divPopupRequestFormContainer = '#divPopupUploadRequestForm';
        this.popupCloseButton = '.popupclosebutton';
        this.popup_cancel = '#popup_cancel';
        this.popup_save = '#popup_save';

        this.btnAddnew = '#liAddReportList';
    };

    this.variable = new function () {
        this.objPaging = new VtcPaging("divPaging", "page_ReportList.bindData", "pagingCss", 20, CONSTANT.PAGE_DISPLAY);
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
        var _currentDate = new Date();
        _currentDate.setDate(_currentDate.getDate());

        //$("#txtToDate").val(page_ReportList.convertDate(_currentDate));
        $("#txtToDate").datepicker({
            changeMonth: true,
            changeYear: true
        });

        _currentDate.setDate(_currentDate.getDate());

        //$("#txtFromDate").val(page_ReportList.convertDate(_currentDate));
        $("#txtFromDate").datepicker({
            changeMonth: true,
            changeYear: true
        });

        $("#ui-datepicker-div").hide();

        this.getDepartment();
        this.bindData(this.variable.objPaging.currentPage, this.variable.objPaging.pageSize);
        //this.loadData();
    };

    this.convertDate = function (expDate) {
        return (expDate.getMonth() + 1) + '/' + expDate.getDate() + '/' + expDate.getFullYear();
    }
    this.bindData = function (_cur, _ps) {
        Loading.show();

        requestName = $("#divSearch #txtReportName1").val();
        receiveFrom = $("#divSearch #txtFromDate").val();
        receiveTo = $("#divSearch #txtToDate").val();
        account = page_ReportList.variable.accountName == '' ? $("#divSearch #ddlPIC").val() : page_ReportList.variable.accountName;
        pic = $("#divSearch #ddlPIC").val();
        department = $("#divSearch #ddlDepartment").val();


        status = $("#ddlStatus").val();
        $.ajax({
            type: "GET",
            url: "/handler/RequestReport.ashx",
            data: { requestName: requestName, receiveFrom: receiveFrom, receiveTo: receiveTo, department: department, account: account, pic: pic, status: status, page: _cur, pageSize: _ps, t: "GetListRequestReportList" },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                $(page_ReportList.htmlTag.divList).setTemplateURL("/templates/pages/report/RequestReportList.htm");
                $(page_ReportList.htmlTag.divList).processTemplate(data);

                $('.spanTooltip[title]').qtip({ style: { name: 'green', tip: true, border: { radius: 5 } } });

                page_ReportList.variable.objPaging.bindPaging(_cur, data.TotalRecord);
                $("#spTotalRecord").html(data.TotalRecord);

                if (data.TotalRecord <= page_ReportList.variable.objPaging.pageSize) {
                    $("#divPaging").attr('style', 'display:none');
                }
                else {
                    $("#divPaging").attr('style', 'display:block');
                }
                Loading.close();

            }
        });
    };

    $("#divSearch #txtReportName1").live('change', function () {
        page_ReportList.bindData(1, page_ReportList.variable.objPaging.pageSize);
    });

    this.getPIC = function (departmentId) {
        $("#ddlPIC").empty();
        $("#ddlPIC").append('<option value="">[-- All --]</option');
        $.ajax({
            type: "GET",
            url: "/handler/Department.ashx",
            data: { departmentId: departmentId, t: "GetListAdminByDepartment" },
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

    $("#ddlDepartment").live('change', function () {
        page_ReportList.getPIC($(this).val());
        page_ReportList.bindData(1, page_ReportList.variable.objPaging.pageSize);
    });

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
                $("#divPopupUpdateReportList #ddlAccount").append(html);
                $("#divPopupUpdateReportList #ddlAccountBackup").append(html);

                if (reportListId > 0) {
                    page_ReportList.getInfoReportList(reportListId);
                } else {
                    $("#txtDeadline").attr("placeholder", "Example: 08/15/2014");
                    $("#txtDeadline").datepicker({
                        changeMonth: true,
                        changeYear: true
                    });
                }
            }
        });
    };

    this.showPopup = function (reportListId) {
        page_ReportList.variable.reportListId = reportListId;
        if ($(page_ReportList.htmlTag.divPopupContainerWrapper).length == 0) {
            $("body").append("<div id='" + this.htmlTag.divPopupContainerWrapper.substring(1) + "'></div>");
            $(this.htmlTag.divPopupContainerWrapper).setTemplateURL("/Templates/popup/report/RequestReportUpdate.htm");
            $(this.htmlTag.divPopupContainerWrapper).processTemplate(null);
            COMMON.setTemplatePopup(this.htmlTag.divPopupContainer);
            this.processFormButton();

            page_ReportList.getListMemberByDepartment(reportListId);

            if (page_ReportList.variable.accountName != '')
                $("#divPIC").hide();

            $("#divTracerReceived").hide();
            $("#divTracerSolved").hide();
        }
    };

    function logicBetweenFreAndDeadline(frequency) {

        $("#txtDeadline").datepicker("destroy");

        //if (frequency == 1 || frequency == 5) {
        //    $("#txtDeadline").removeAttr("fempty");
        //    $("#divDeadline").hide();
        //}
        //else {
        $("#divDeadline").show();
        $("#txtDeadline").attr("fempty", "*");

        if (frequency == 4 || frequency == 1 || frequency == 5 || frequency == 7) {
            $("#txtDeadline").datepicker({
                changeMonth: true,
                changeYear: true
            });
        }
        //}
        $("#txtDeadline").val('');

        if (frequency == 4 || frequency == 1 || frequency == 5 || frequency == 7)
            $("#txtDeadline").attr("placeholder", "Example: 08/15/2014");
        else if (frequency == 2 || frequency == 6)
            $("#txtDeadline").attr("placeholder", "Example: Monday, Tuesday, Wednesday");
        else $("#txtDeadline").attr("placeholder", "Example: 01, 02, 05, 12, 30");
    }

    $("#divPopupUpdateReportList #ddlFrequency").live('change', function () {
        var frequency = $(this).val();
        logicBetweenFreAndDeadline(frequency);
    });

    $("#txtDeadline").live("focus", function () {
        if ($("#divPopupUpdateReportList #ddlReportType").val() == 1) {
            frequency = $("#divPopupUpdateReportList #ddlFrequency").val()
            if (frequency == 2 || frequency == 6)
                page_ReportList.showPopupDeadline("weekly");
            else if (frequency == 3)
                page_ReportList.showPopupDeadline("monthly");
        }
    });

    $("#ddlReportType").live("change", function () {
        if ($("#divPopupUpdateReportList #ddlReportType").val() == 1) {
            $("#divFrequency").show();
            $("#divDeadline").show();
            logicBetweenFreAndDeadline($("#divPopupUpdateReportList #ddlFrequency").val());
        }
        else if ($("#divPopupUpdateReportList #ddlReportType").val() == 0) {
            $("#divFrequency").hide();
            $("#txtDeadline").datepicker({
                changeMonth: true,
                changeYear: true
            });
            $("#divDeadline").show();
        }
    });
    $("#divPopupUpdateReportList #ddlStatus").live("change", function () {
        var statusChange = $(this).val();
        if (statusChange == 1 || statusChange == 2) {
            $("#divPopupUpdateReportList #divReasonCancel").show();
            $("#divPopupUpdateReportList #divDiscussMan").show();
            $("#divPopupUpdateReportList #divInformClient").show();
        } else {
            $("#divPopupUpdateReportList #divReasonCancel").hide();
            $("#divPopupUpdateReportList #divDiscussMan").hide();
            $("#divPopupUpdateReportList #divInformClient").hide();
        }
    });

    this.showPopupView = function (reportListId) {
        page_ReportList.variable.reportListId = reportListId;
        if ($(page_ReportList.htmlTag.divPopupContainerWrapper).length == 0) {
            $("body").append("<div id='" + this.htmlTag.divPopupContainerWrapper.substring(1) + "'></div>");
            $(this.htmlTag.divPopupContainerWrapper).setTemplateURL("/Templates/popup/report/RequestReportUpdate.htm");
            $(this.htmlTag.divPopupContainerWrapper).processTemplate(null);
            COMMON.setTemplatePopup(this.htmlTag.divPopupContainer);
            this.processFormButton();
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
                    $("#divPopupUpdateReportList #ddlAccount").append(html);
                    $("#divPopupUpdateReportList #ddlAccountBackup").append(html);

                    if (reportListId > 0) {
                        $.ajax({
                            type: "GET",
                            url: "/handler/RequestReport.ashx",
                            data: { reportListId: reportListId, t: "GetInfoRequestReport" },
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            cache: false,
                            success: function (data_repsponse) {
                                if (data_repsponse != null) {
                                    data = data_repsponse[0];
                                    $("#divPopupUpdateReportList #txtRequestTitle").val(data.Request_Name);
                                    $("#divPopupUpdateReportList #txtEmailClient").val(data.Client_Email);
                                    $("#divPopupUpdateReportList #ddlClientDivision").val(data.Client_Division);
                                    $("#divPopupUpdateReportList #txtReceived").val(data.Received_Date);
                                    $("#divPopupUpdateReportList #ddlReportType").val(data.Report_Type);
                                    if ($("#divPopupUpdateReportList #ddlReportType").val() == 1) {
                                        $("#divPopupUpdateReportList #ddlFrequency").val(data.Frequency);
                                        $("#divFrequency").show();
                                        logicBetweenFreAndDeadline(data.Frequency);
                                        $("#divPopupUpdateReportList #txtDeadline").val(data.Delivered_Date);
                                        $("#divDeadline").show();
                                    }
                                    else if ($("#divPopupUpdateReportList #ddlReportType").val() == 0) {
                                        $("#divFrequency").hide();
                                        $("#divPopupUpdateReportList #txtDeadline").val(data.Delivered_Date);
                                        $("#txtDeadline").datepicker({
                                            changeMonth: true,
                                            changeYear: true
                                        });
                                        $("#divDeadline").show();
                                    }
                                    if (data.Request_Type == 0) {
                                        $("#divTracerReceived").hide();
                                        $("#divTracerSolved").hide();
                                    } else {
                                        $("#divTracerReceived").show();
                                        $("#divTracerSolved").show();
                                        $("#divPopupUpdateReportList #txtNoTracerReceived").val(data.No_tracer_received);
                                        $("#divPopupUpdateReportList #txtNoTracerSolved").val(data.No_tracer_solved);
                                    }
                                    $("#divPopupUpdateReportList #ddlAccount").val(data.Account);
                                    $("#divPopupUpdateReportList #ddlStatus").val(data.Status);
                                    $("#divPopupUpdateReportList #ddlSending").val(data.Sending_Type);
                                    $("#divPopupUpdateReportList #ddlIsAuto").val($.trim(data.Request_Type));
                                    $("#divPopupUpdateReportList #txtDescription").val($.trim(data.Decription));
                                    $("#divPopupUpdateReportList #txtRequestTitle").prop("readonly", true);
                                    $("#divPopupUpdateReportList #txtEmailClient").prop("readonly", true);
                                    $("#divPopupUpdateReportList #ddlClientDivision").prop("disabled", true);
                                    $("#divPopupUpdateReportList #txtDeadline").prop("disabled", true);
                                    $("#divPopupUpdateReportList #txtReceived").prop("disabled", true);
                                    $("#divPopupUpdateReportList #ddlAccount").prop("disabled", true);
                                    $("#divPopupUpdateReportList #ddlStatus").prop("disabled", true);
                                    $("#divPopupUpdateReportList #ddlSending").prop("disabled", true);
                                    $("#divPopupUpdateReportList #ddlIsAuto").prop("disabled", true);
                                    $("#divPopupUpdateReportList #txtDescription").prop("readonly", true);
                                    $("#divPopupUpdateReportList #txtReasonCancel").prop("readonly", true);
                                    $("#divPopupUpdateReportList #ddlDiscussMan").prop("disabled", true);
                                    $("#divPopupUpdateReportList #ddlInformClient").prop("disabled", true);
                                    $("#divPopupUpdateReportList #txtNoTracerReceived").prop("readonly", true);
                                    $("#divPopupUpdateReportList #txtNoTracerSolved").prop("readonly", true);
                                    $("#divPopupUpdateReportList #ddlFrequency").prop("disabled", true);
                                    $("#divPopupUpdateReportList #ddlReportType").prop("disabled", true);
                                    if (data.Status == 1 || data.Status == 2) {
                                        $("#divPopupUpdateReportList #divReasonCancel").show();
                                        $("#divPopupUpdateReportList #divDiscussMan").show();
                                        $("#divPopupUpdateReportList #divInformClient").show();
                                        requestReasonCan = $("#divPopupUpdateReportList #txtReasonCancel").val(data.Reason_cancel_reject);
                                        requestDiscussMan = $("#divPopupUpdateReportList #ddlDiscussMan").val(data.Discuss_Man);
                                        requestInformClient = $("#divPopupUpdateReportList #ddlInformClient").val(data.Inform_Email);
                                    } else {
                                        $("#divPopupUpdateReportList #divReasonCancel").hide();
                                        $("#divPopupUpdateReportList #divDiscussMan").hide();
                                        $("#divPopupUpdateReportList #divInformClient").hide();
                                    }
                                }
                            }
                        });

                    }
                }
            });

        }
    };

    this.showPopupCreateReport = function (reportListId) {

        $("#txtDeadline").datepicker({
            changeMonth: true,
            changeYear: true
        });
        $("#txtReceived").datepicker({
            changeMonth: true,
            changeYear: true
        });
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
                            window.location.href = page_ReportList.variable.accountName == '' ? "/my-work-tracker" : '/my-work-tracker';
                        }
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
                page_ReportList.showPopupView(reportTypeId);
                break;
            case 4:
                page_ReportList.showPopupUpload(reportTypeId, 1);
                break;
            case 5:
                page_ReportList.updateStatus(reportTypeId, 2);
                break;
        }
    };

    this.showPopupUpload = function (reportId, isAuto) {
        page_ReportList.variable.reportListId = reportId;
        page_ReportList.variable.isAuto = isAuto;
        if ($(page_ReportList.htmlTag.divPopupUploadContainerWrapper).length == 0) {
            $("body").append("<div id='" + this.htmlTag.divPopupUploadContainerWrapper.substring(1) + "'></div>");
            $(this.htmlTag.divPopupUploadContainerWrapper).setTemplateURL("/Templates/popup/report/RequestReportUploadMail.htm?v=1");
            $(this.htmlTag.divPopupUploadContainerWrapper).processTemplate(null);
            COMMON.setTemplatePopup(this.htmlTag.divPopupUploadContainer);
            this.processFormButton();

            $(".name-report").html($("#report" + reportId + "").html());

            //$.ajax({
            //    type: "GET",
            //    url: "/handler/Report.ashx",
            //    data: { reportId: this.variable.reportId, t: "GetInfoReport" },
            //    contentType: "application/json; charset=utf-8",
            //    dataType: "json",
            //    cache: false,
            //    success: function (data) {
            //        if (data != null) {
            //            $("#hfOldFileUpload").val(data.FileName);
            //            $("#txtTimeKeyData").val(COMMON.jSonDateToString(data.TimeKeyData, 1));
            //        }
            //        else {
            //            var _currentDate = new Date();
            //            _currentDate.setDate(_currentDate.getDate());

            //            $("#txtTimeKeyData").val(page_ReportList.convertDate(_currentDate));
            //        }
            //    }
            //});


            $("#txtTimeKeyData").datepicker({
                changeMonth: true,
                changeYear: true
            });

            this.uploadFile();
        }
    };

    this.uploadFile = function () {
        $('#btnUpload').live('click', function () {
            if (!FValidate.isValidateAll()) return;
            if ($('#txtFileUpload').val() == '') {
                jAlert('Please choose file.');
                return;
            }
            $("#frmUploadFile").submit();
        });
        $("#frmUploadFile").ajaxForm({
            url: '',
            type: 'post',
            dataType: 'text',
            beforeSubmit: function () {
                Loading.show();
                this.url = '/handler/RequestReport.ashx?t=upload&fileName=' + $("#report" + page_ReportList.variable.reportListId + "").html();
            },
            success: function (serverData) {
                Loading.close();
                if (serverData == '-1') {
                    jAlert("Format is not allow.", "Alert");
                    return;
                }
                else {
                    var strResponse = serverData.split('|');
                    if (strResponse[0] == '1') {
                        page_ReportList.variable.fileName = strResponse[1];
                        $("#hfOldFileUpload").val(strResponse[1]);
                        page_ReportList.clearForm();

                        page_ReportList.updateFileNameReport(strResponse[2]);
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

    this.updateFileNameReport = function (timeKeyData) {
        Loading.showProcess();
        $.ajax({
            type: "POST",
            contentType: "application/json;charset:utf-8",
            url: "/webServices/ReportWS.asmx/UploadReport",
            data: JSON.encode({ reportId: this.variable.reportListId, fileName: this.variable.fileName, timeKeyData: timeKeyData }),
            dataType: "json",
            cache: false,
            success: function (data) {
                if (data.d > 0) {
                    page_MemberReport.close();
                    page_MemberReport.loadData();
                }
                else if (data.d == -2)
                    jAlert('Please choose file.');
                Loading.closeProcess();
            }
        });
    };

    this.clearForm = function () {
        $("#txtFileUpload").val('');
        $("#divPopupUploadContainerWrapper").remove();
    };

    this.processFormButton = function () {
        $(this.htmlTag.popupCloseButton).click(function () {
            page_ReportList.close();
            page_ReportList.closeUpload();
        });

        $(this.htmlTag.popup_cancel).click(function () {
            page_ReportList.close();
            page_ReportList.closeUpload();
        });
    };

    // hàm đóng popup
    this.close = function () {
        if ($(page_ReportList.htmlTag.divPopupContainerWrapper).length != 0) {
            $(page_ReportList.htmlTag.divPopupContainerWrapper).remove();
        }
    };

    this.closeUpload = function () {
        if ($(page_ReportList.htmlTag.divPopupUploadContainerWrapper).length != 0) {
            $(page_ReportList.htmlTag.divPopupUploadContainerWrapper).remove();
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
                            page_ReportList.bindData(1, page_ReportList.variable.objPaging.pageSize);
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

    this.getInfoReportList = function (reportListId) {
        $.ajax({
            type: "GET",
            url: "/handler/RequestReport.ashx",
            data: { reportListId: reportListId, t: "GetInfoRequestReport" },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data_repsponse) {
                if (data_repsponse != null) {
                    data = data_repsponse[0];
                    $("#divPopupUpdateReportList #txtRequestTitle").val(data.Request_Name);
                    $("#divPopupUpdateReportList #txtEmailClient").val(data.Client_Email);
                    $("#divPopupUpdateReportList #ddlClientDivision").val(data.Client_Division);
                    $("#divPopupUpdateReportList #txtReceived").val(data.Received_Date);
                    $("#divPopupUpdateReportList #ddlReportType").val(data.Report_Type);
                    if ($("#divPopupUpdateReportList #ddlReportType").val() == 1) {
                        $("#divPopupUpdateReportList #ddlFrequency").val(data.Frequency);
                        $("#divFrequency").show();
                        logicBetweenFreAndDeadline(data.Frequency);
                        $("#divPopupUpdateReportList #txtDeadline").val(data.Delivered_Date);
                        $("#divDeadline").show();
                    }
                    else if ($("#divPopupUpdateReportList #ddlReportType").val() == 0) {
                        $("#divFrequency").hide();
                        $("#divPopupUpdateReportList #txtDeadline").val(data.Delivered_Date);
                        $("#txtDeadline").datepicker({
                            changeMonth: true,
                            changeYear: true
                        });
                        $("#divDeadline").show();
                    }
                    if (data.Request_Type == 0) {
                        $("#divTracerReceived").hide();
                        $("#divTracerSolved").hide();
                    } else {
                        $("#divTracerReceived").show();
                        $("#divTracerSolved").show();
                        $("#divPopupUpdateReportList #txtNoTracerReceived").val(data.No_tracer_received);
                        $("#divPopupUpdateReportList #txtNoTracerSolved").val(data.No_tracer_solved);
                    }
                    $("#divPopupUpdateReportList #ddlAccount").val(data.Account);
                    $("#divPopupUpdateReportList #ddlStatus").val(data.Status);
                    $("#divPopupUpdateReportList #ddlSending").val(data.Sending_Type);
                    $("#divPopupUpdateReportList #ddlIsAuto").val($.trim(data.Request_Type));
                    $("#divPopupUpdateReportList #txtDescription").val($.trim(data.Decription));
                    if (data.Status == 1 || data.Status == 2 || data.Status == 7) {
                        $("#divPopupUpdateReportList #txtEmailClient").prop("readonly", true);
                        $("#divPopupUpdateReportList #ddlClientDivision").prop("disabled", true);
                        $("#divPopupUpdateReportList #txtDeadline").prop("disabled", true);
                        $("#divPopupUpdateReportList #txtReceived").prop("disabled", true);
                        $("#divPopupUpdateReportList #ddlAccount").prop("disabled", true);
                        $("#divPopupUpdateReportList #ddlStatus").prop("disabled", true);
                        $("#divPopupUpdateReportList #ddlSending").prop("disabled", true);
                        $("#divPopupUpdateReportList #ddlIsAuto").prop("disabled", true);
                        $("#divPopupUpdateReportList #txtDescription").prop("readonly", true);
                        $("#divPopupUpdateReportList #txtReasonCancel").prop("readonly", true);
                        $("#divPopupUpdateReportList #ddlDiscussMan").prop("disabled", true);
                        $("#divPopupUpdateReportList #ddlInformClient").prop("disabled", true);
                        $("#divPopupUpdateReportList #txtNoTracerReceived").prop("readonly", true);
                        $("#divPopupUpdateReportList #txtNoTracerSolved").prop("readonly", true);
                        $("#divPopupUpdateReportList #ddlFrequency").prop("disabled", true);
                        $("#divPopupUpdateReportList #ddlReportType").prop("disabled", true);
                    }
                    if (data.Status == 1 || data.Status == 2) {
                        $("#divPopupUpdateReportList #txtRequestTitle").prop("readonly", true);
                        requestReasonCan = $("#divPopupUpdateReportList #txtReasonCancel").val(data.Reason_cancel_reject);
                        requestDiscussMan = $("#divPopupUpdateReportList #ddlDiscussMan").val(data.Discuss_Man);
                        requestInformClient = $("#divPopupUpdateReportList #ddlInformClient").val(data.Inform_Email);
                    }
                }
            }
        });

    };

    $(this.htmlTag.popup_save).live('click', function () {
        if (!FValidate.isValidateAll()) return;

        requestName = $.trim($("#divPopupUpdateReportList #txtRequestTitle").val());
        emailClient = $.trim($("#divPopupUpdateReportList #txtEmailClient").val());
        client = $.trim($("#divPopupUpdateReportList #ddlClientDivision").val());
        requestType = $.trim($("#divPopupUpdateReportList #ddlIsAuto").val());
        frequency = $.trim($("#divPopupUpdateReportList #ddlFrequency").val());
        noTracerReceived = $.trim($("#divPopupUpdateReportList #txtNoTracerReceived").val()) == "" ? 0 : $.trim($("#divPopupUpdateReportList #txtNoTracerReceived").val());
        noTracerSolved = $.trim($("#divPopupUpdateReportList #txtNoTracerSolved").val()) == "" ? 0 : $.trim($("#divPopupUpdateReportList #txtNoTracerSolved").val());

        deadline = $.trim($("#txtDeadline").val());
        receive = $.trim($("#txtReceived").val());

        if (page_ReportList.variable.accountName == '')
            account = $("#divPopupUpdateReportList #ddlAccount").val();
        else account = page_ReportList.variable.accountName;

        requestStatus = $("#divPopupUpdateReportList #ddlStatus").val();

        requestSendType = $("#divPopupUpdateReportList #ddlSending").val();
        reportType = $("#divPopupUpdateReportList #ddlReportType").val();
        requestDescription = $("#divPopupUpdateReportList #txtDescription").val();
        requestReasonCan = $("#divPopupUpdateReportList #txtReasonCancel").val();
        requestDiscussMan = $("#divPopupUpdateReportList #ddlDiscussMan").val();
        requestInformClient = $("#divPopupUpdateReportList #ddlInformClient").val();

        requestType = $("#divPopupUpdateReportList #ddlIsAuto").val();

        if (page_ReportList.variable.reportListId == -1) {
            //Thêm mới
            var _data = {
                requestName: requestName, client: client, emailClient: emailClient, deadline: deadline, requestType: requestType, receive: receive, account: account, requestStatus: requestStatus, requestSendType: requestSendType, reportType: reportType, requestDescription: requestDescription, frequency: frequency, noTracerReceived: noTracerReceived, noTracerSolved: noTracerSolved, requestReasonCan: requestReasonCan, requestDiscussMan: requestDiscussMan, requestInformClient: requestInformClient
            };
            page_ReportList.addReportList(_data);
        }
        else {
            var _data = {
                reportListId: page_ReportList.variable.reportListId, requestName: requestName, client: client, emailClient: emailClient, deadline: deadline, requestType: requestType, receive: receive, account: account, requestStatus: requestStatus, requestSendType: requestSendType, reportType: reportType, requestDescription: requestDescription, frequency: frequency, noTracerReceived: noTracerReceived, noTracerSolved: noTracerSolved, requestReasonCan: requestReasonCan, requestDiscussMan: requestDiscussMan, requestInformClient: requestInformClient
            };
            //alert(page_ReportList.variable.reportListId);
            page_ReportList.updateReportList(_data);
        }

    });

    this.addReportList = function (_data) {
        Loading.showProcess();
        $.ajax({
            type: "POST",
            contentType: "application/json;charset:utf-8",
            url: "/webServices/RequestReportWS.asmx/InsertReportList",
            data: JSON.encode(_data),
            dataType: "json",
            cache: false,
            success: function (data) {
                if (data.d > 0) {
                    page_ReportList.bindData(1, page_ReportList.variable.objPaging.pageSize);
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
            url: "/webServices/RequestReportWS.asmx/UpdateReportList",
            data: JSON.encode(_data),
            dataType: "json",
            cache: false,
            success: function (data) {
                if (data.d > 0) {
                    page_ReportList.close();
                    page_ReportList.bindData(1, page_ReportList.variable.objPaging.pageSize);
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
        page_ReportList.bindData(1, page_ReportList.variable.objPaging.pageSize);
    });

    $("#ddlIsAuto").live('change', function () {
        if ($.trim($("#divPopupUpdateReportList #ddlIsAuto").val()) == 0) {
            $("#divFrequency").show();
            $("#divTracerReceived").hide();
            $("#divTracerSolved").hide();
        } else {
            $("#divFrequency").hide();
            $("#divTracerReceived").show();
            $("#divTracerSolved").show();
        }

    });

    $("#txtFromDate").live('change', function () {
        var fromDate = $(this).datepicker("getDate");
        var toDate = $("#txtToDate").datepicker("getDate");
        if (toDate < fromDate) {
            jAlert("To Date must larger or equal From Date", null, function () {
                $("#txtToDate").val("");
                $("#txtToDate").focus();
            });
        }
        page_ReportList.bindData(1, page_ReportList.variable.objPaging.pageSize);
    });


    $("#txtReceived").live("focus", function () {
        $("#txtReceived").datepicker({
            changeMonth: true,
            changeYear: true
        });
    });

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

    $("#divSearch #ddlStatus,#divSearch #ddlPIC").live('change', function () {
        page_ReportList.bindData(1, page_ReportList.variable.objPaging.pageSize);
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

    this.getDepartment = function () {
        $.ajax({
            type: "GET",
            url: "/handler/Department.ashx",
            data: { status: 1, t: "GetListDepartment" },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                var html = '';
                for (i = 0; i < data.length; i++) {
                    html += '<option value="' + data[i].DepartmentId + '">' + data[i].Name + '</option>';
                }
                $("#ddlDepartment").append(html);
            }
        });
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
                    page_ReportList.bindData(1, page_ReportList.variable.objPaging.pageSize);
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