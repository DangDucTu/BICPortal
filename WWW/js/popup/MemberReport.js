/// <reference path="../lib/common.js" />

page_MemberReport = new function () {
    this.htmlTag = new function () {
        this.divList = '#tbListReport';
        this.divPopupContainerWrapper = '#divPopupUpdateReportWrapper';
        this.divPopupUploadContainerWrapper = '#divPopupUploadContainerWrapper';
        this.divPopupContainer = '#divPopupUpdateReport';
        this.divPopupUploadContainer = '#divPopupUploadReport';
        this.popupCloseButton = '.popupclosebutton';
        this.popup_cancel = '#popup_cancel';
        this.popup_save = '#popup_save';

        this.btnAddnew = '#liAddReport';
        this.txtName = '#txtName';
        this.ddlStatus = '#ddlStatus';
        this.btnSearch = '#btnSearch';
    };

    this.variable = new function () {
        this.objPaging = new VtcPaging("divPaging", "page_MemberReport.bindData", "pagingCss", 20, CONSTANT.PAGE_DISPLAY);
        this.reportId = -1;
        this.fileName = '';
        this.isAuto = 0;
    };

    this.convertDate = function (expDate) {
        return (expDate.getMonth() + 1) + '/' + expDate.getDate() + '/' + expDate.getFullYear();
    }

    this.documentReady = function () {
        var _currentDate = new Date();
        _currentDate.setDate(_currentDate.getDate());

        $("#txtToDate").val(page_MemberReport.convertDate(_currentDate));
        $("#txtToDate").datepicker({
            changeMonth: true,
            changeYear: true
        });

        _currentDate.setDate(_currentDate.getDate());

        $("#txtFromDate").val(page_MemberReport.convertDate(_currentDate));
        $("#txtFromDate").datepicker({
            changeMonth: true,
            changeYear: true
        });

        $("#ui-datepicker-div").hide();

        this.loadData();
    };

    $(this.htmlTag.btnSearch).live('click', function () {
        page_MemberReport.loadData();
    });

    this.loadData = function () {
        this.bindData(1, this.variable.objPaging.pageSize);
    };

    this.bindData = function (_cur, _ps) {
        Loading.show();

        reportName = $("#txtCodeName").val();

        isComplete = $("#ddlStatus").val();
        frequency = $("#ddlFrequency").val();
        fromDate = $("#txtFromDate").val() == "" ? "1/1/2010" : $("#txtFromDate").val();
        toDate = $("#txtToDate").val() == "" ? "1/1/2030" : $("#txtToDate").val();

        status = 0;
        isBackup = $("#ddlBackup").val();
        $.ajax({
            type: "GET",
            url: "/handler/Report.ashx",
            data: { reportName: reportName, frequency: frequency, fromDate: fromDate, toDate: toDate, isComplete: isComplete, status: status, isBackup: isBackup, page: _cur, pageSize: _ps, t: "GetListReportByMember" },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                page_MemberReport.processData(data, _cur);
                Loading.close();
            },
            error: function () {
                jAlert("An error occurred while performing", function () {
                    Loading.close();
                });
            }
        });
    };

    this.processData = function (data, _cur) {
        $(this.htmlTag.divList).setTemplateURL("/templates/pages/MemberReport.htm?v=2");
        $(this.htmlTag.divList).processTemplate(data);
        page_MemberReport.variable.objPaging.bindPaging(_cur, data.TotalRecord);
        $("#spTotalRecord").html(data.TotalRecord);

        if (data.TotalRecord <= page_MemberReport.variable.objPaging.pageSize) {
            $("#divPaging").attr('style', 'display:none');
        }
        else {
            $("#divPaging").attr('style', 'display:block');
        }

        $('.spanTooltip[title]').qtip({ style: { name: 'green', tip: true, border: { radius: 5 } } });
        $('.spanTooltipError[title]').qtip({
            style: { name: 'red', tip: true, border: { radius: 5 } }, position: {
                corner: {
                    target: 'topLeft',
                    tooltip: 'bottomLeft'
                }
            }
        });
    };

    $("#txtTimeKeyData").live('change', function () {
        var dataDate = $(this).datepicker("getDate");
        var curDate = new Date();
        if (dataDate > curDate) {
            jAlert("Data date must smaller than or equal current date", null, function () {
                $("#txtTimeKeyData").val("");
                $("#txtTimeKeyData").focus();
            });
        }
    });

    this.showPopupUpload = function (reportId, isAuto) {
        page_MemberReport.variable.reportId = reportId;
        page_MemberReport.variable.isAuto = isAuto == 'Manual' ? 0 : 1;
        if ($(page_MemberReport.htmlTag.divPopupUploadContainerWrapper).length == 0) {
            $("body").append("<div id='" + this.htmlTag.divPopupUploadContainerWrapper.substring(1) + "'></div>");
            $(this.htmlTag.divPopupUploadContainerWrapper).setTemplateURL("/Templates/popup/ReportUpload.htm?v=1");
            $(this.htmlTag.divPopupUploadContainerWrapper).processTemplate(null);
            COMMON.setTemplatePopup(this.htmlTag.divPopupUploadContainer);
            this.processFormButton();

            $(".name-report").html($("#report" + reportId + " a").html());

            $.ajax({
                type: "GET",
                url: "/handler/Report.ashx",
                data: { reportId: this.variable.reportId, t: "GetInfoReport" },
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                cache: false,
                success: function (data) {
                    if (data != null) {
                        $("#hfOldFileUpload").val(data.FileName);
                        $("#txtTimeKeyData").val(COMMON.jSonDateToString(data.TimeKeyData, 1));
                    }
                    else {
                        var _currentDate = new Date();
                        _currentDate.setDate(_currentDate.getDate());

                        $("#txtTimeKeyData").val(page_MemberReport.convertDate(_currentDate));
                    }
                }
            });


            $("#txtTimeKeyData").datepicker({
                changeMonth: true,
                changeYear: true
            });

            this.uploadFile();
        }
    };

    $(this.htmlTag.btnAddnew).live('click', function () {
        page_MemberReport.showPopup(-1);
    });

    this.download = function (fileName, dataDate) {
        window.location.href = "/handler/Report.ashx?t=Download&fileName=" + fileName;
    };

    this.processFormButton = function () {
        $(this.htmlTag.popupCloseButton).click(function () {
            page_MemberReport.close();
            page_MemberReport.closeUpload();
        });

        $(this.htmlTag.popup_cancel).click(function () {
            page_MemberReport.close();
            page_MemberReport.closeUpload();
        });
    };

    // hàm đóng popup
    this.close = function () {
        if ($(page_MemberReport.htmlTag.divPopupContainerWrapper).length != 0) {
            $(page_MemberReport.htmlTag.divPopupContainerWrapper).remove();
        }
    };

    this.closeUpload = function () {
        if ($(page_MemberReport.htmlTag.divPopupUploadContainerWrapper).length != 0) {
            $(page_MemberReport.htmlTag.divPopupUploadContainerWrapper).remove();
        }
    };

    this.functionOnItem = function (f, reportId) {
        switch (f) {
            case 2:
                page_MemberReport.showPopup(reportId);
                break;
            case 3:
                jConfirm("Are you sure delete this report?", null, function (r) {
                    if (r) {
                        page_MemberReport.deleteReport(reportId);
                    }
                });
                break;
            case 4:
                page_MemberReport.showPopupChangeStatus(reportId);
                break;
        }
    };

    this.addReport = function (_data) {
        Loading.showProcess();
        $.ajax({
            type: "POST",
            contentType: "application/json;charset:utf-8",
            url: "/webServices/ReportWS.asmx/InsertReport",
            data: JSON.encode(_data),
            dataType: "json",
            cache: false,
            success: function (data) {
                if (data.d > 0) {
                    page_MemberReport.close();
                    page_MemberReport.loadData();
                }
                Loading.closeProcess();
            }
        });
    };

    this.updateFileNameReport = function (timeKeyData, reportLink) {
        Loading.showProcess();
        $.ajax({
            type: "POST",
            contentType: "application/json;charset:utf-8",
            url: "/webServices/ReportWS.asmx/UploadReport",
            data: JSON.encode({ reportId: this.variable.reportId, fileName: this.variable.fileName, timeKeyData: timeKeyData, reportLink: reportLink }),
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

    this.uploadFile = function () {
        $('#btnUpload').live('click', function () {
            if (!FValidate.isValidateAll()) return;
            if ($('#txtFileUpload').val() == '' && page_MemberReport.variable.isAuto == 0) {
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
                this.url = '/handler/Report.ashx?t=upload&fileName=' + $("#report" + page_MemberReport.variable.reportId + " a").html() + '&timeKeyData=' + $("#txtTimeKeyData").val() + '&isAuto=' + page_MemberReport.variable.isAuto + '&reportLink=' + $("#txtReportLink").val();
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
                        page_MemberReport.variable.fileName = strResponse[1];
                        $("#hfOldFileUpload").val(strResponse[1]);
                        page_MemberReport.clearForm();

                        page_MemberReport.updateFileNameReport(strResponse[2], strResponse[3]);
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
        $("#divPopupUploadContainerWrapper").remove();
    };

    //    this.zero = function () {

    //        $("#popup_ok").html("Copy");

    //        ZeroClipboard.setMoviePath('http://davidwalsh.name/demo/ZeroClipboard.swf');
    //        var clip = new ZeroClipboard.Client();

    //        clip.destroy();

    //        clip.addEventListener('mousedown', function () {
    //            clip.setText($("#popup_message").html());
    //        });

    //        clip.addEventListener('complete', function (client, text) {
    //            $("#popup_ok").trigger('click');
    //        });

    //        //glue it to the button
    //        clip.glue("popup_ok");
    //    };

    this.copy = function (link) {

        $("body").append("<div id='" + this.htmlTag.divPopupContainerWrapper.substring(1) + "'></div>");
        $(this.htmlTag.divPopupContainerWrapper).setTemplateURL("/Templates/popup/report/PopupCopyLink.htm");
        $(this.htmlTag.divPopupContainerWrapper).processTemplate(null);
        COMMON.setTemplatePopup("#divPopupCopyLink");
        this.processFormButton();

        $("#txtLink").val("http://bicc.vpbank.com.vn/d/?n=" + link);
        $("#txtLink").select();
    };

    $("#txtLink").live('mouseup', function () {
        $(this).select();
    });

    this.showPopupChangeStatus = function (reportId) {
        page_MemberReport.variable.reportId = reportId;
        if ($(page_MemberReport.htmlTag.divPopupContainerWrapper).length == 0) {
            $("body").append("<div id='" + this.htmlTag.divPopupContainerWrapper.substring(1) + "'></div>");
            $(this.htmlTag.divPopupContainerWrapper).setTemplateURL("/Templates/popup/report/ReportChangeStatus.htm?v=2");
            $(this.htmlTag.divPopupContainerWrapper).processTemplate(null);
            COMMON.setTemplatePopup("#divPopupUpdateReporChangeStatus");
            this.processFormButton();

            $.ajax({
                type: "GET",
                url: "/handler/Report.ashx",
                data: { reportId: this.variable.reportId, t: "GetInfoReport" },
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                cache: false,
                success: function (data) {
                    if (data != null) {
                        $("#txtDescription").val(data.Description);
                    }
                }
            });

            $("#txtDescription").focus();
        }
    };

    $("#ddlReason").live('change', function () {
        $("#txtDescription").val('');
        if ($(this).val() == 'OTHER ISSUES')
            $("#txtDescription").focus();
    });

    $("#popup_save_change_status").live('click', function () {
        Loading.showProcess();

        _status = 0;
        _des = $("#ddlReason").val() == "OTHER ISSUES" ? $("#txtDescription").val() : $("#ddlReason").val();

        $.ajax({
            type: "POST",
            contentType: "application/json;charset:utf-8",
            url: "/webServices/ReportWS.asmx/UpdateStatusReport",
            data: JSON.encode({ reportId: page_MemberReport.variable.reportId, status: _status, description: _des }),
            dataType: "json",
            cache: false,
            success: function (data) {
                if (data.d > 0) {
                    page_MemberReport.close();
                    page_MemberReport.bindData();
                }
                Loading.closeProcess();
            }
        });
    });

    $(".spanTooltip").live('click', function () {
        var id = $(this).attr("id").split('_')[1];

        $.ajax({
            type: "POST",
            contentType: "application/json;charset:utf-8",
            url: "/webServices/ReportWS.asmx/UpdateStatusReport",
            data: JSON.encode({ reportId: id, status: 1, description: "" }),
            dataType: "json",
            cache: false,
            success: function (data) {
                if (data.d > 0) {
                    page_MemberReport.close();
                    page_MemberReport.bindData();

                    $(".qtip-active").remove();
                }
            }
        });
    });

    this.deleteReport = function (reportId) {
        $.ajax({
            type: "POST",
            contentType: "application/json;charset:utf-8",
            url: "/webServices/ReportWS.asmx/DeleteReport",
            data: JSON.encode({ reportId: reportId }),
            dataType: "json",
            cache: false,
            success: function (data) {
                if (data.d > 0) {
                    page_MemberReport.close();
                    page_MemberReport.bindData();
                }
            }
        });
    };
};