﻿/// <reference path="../lib/common.js" />
/// <reference path="MemberReport.js" />


page_ViewReport = new function () {
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
        this.objPaging = new VtcPaging("divPaging", "page_ViewReport.bindData", "pagingCss", 20, CONSTANT.PAGE_DISPLAY);
        this.reportId = -1;
        this.fileName = '';
    };

    this.convertDate = function (expDate) {
        return (expDate.getMonth() + 1) + '/' + expDate.getDate() + '/' + expDate.getFullYear();
    };

    this.documentReady = function () {
        var _currentDate = new Date();
        _currentDate.setDate(_currentDate.getDate());

        $("#txtToDate").val(page_ViewReport.convertDate(_currentDate));
        $("#txtToDate").datepicker({
            changeMonth: true,
            changeYear: true
        });

        _currentDate.setDate(_currentDate.getDate());

        $("#txtFromDate").val(page_ViewReport.convertDate(_currentDate));
        $("#txtFromDate").datepicker({
            changeMonth: true,
            changeYear: true
        });

        $("#ui-datepicker-div").hide();

        this.getDepartment();
        this.loadData();
    };

    $(this.htmlTag.btnSearch).live('click', function () {
        page_ViewReport.loadData();
    });

    this.loadData = function () {
        this.bindData(1, this.variable.objPaging.pageSize);
    };

    this.bindData = function (_cur, _ps) {
        Loading.show();
        reportName = $("#txtCodeName").val();
        
        accountName = '';
        status = -1;
        departmentId = $("#ddlDepartment").val();
        isComplete = $("#ddlStatus").val();
        frequency = $("#ddlFrequency").val();
        fromDate = $("#txtFromDate").val() == "" ? "1/1/2010" : $("#txtFromDate").val();
        toDate = $("#txtToDate").val() == "" ? "1/1/2030" : $("#txtToDate").val();
        $.ajax({
            type: "GET",
            url: "/handler/Report.ashx",
            data: { reportName: reportName, frequency: frequency, departmentId: departmentId, accountName: accountName, fromDate: fromDate,
                toDate: toDate, isComplete: isComplete, status: status, page: _cur, pageSize: _ps, t: "GetListReport"
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                page_ViewReport.processData(data, _cur);
                Loading.close();
            },
            error: function () {
                jAlert("An error occurred while performing", function () {
                    Loading.close();
                });
            }
        });
    }

    this.processData = function (data, _cur) {
        $(this.htmlTag.divList).setTemplateURL("/templates/pages/ViewReport.htm?v=2");
        $(this.htmlTag.divList).processTemplate(data);
        page_ViewReport.variable.objPaging.bindPaging(_cur, data.TotalRecord);
        $("#spTotalRecord").html(data.TotalRecord);

        if (data.TotalRecord <= page_ViewReport.variable.objPaging.pageSize) {
            $("#divPaging").attr('style', 'display:none');
        }
        else {
            $("#divPaging").attr('style', 'display:block');
        }


        $('.spanTooltip[title]').qtip({ style: { name: 'green', tip: true, border: { radius: 5}} });
    };

    this.getListMemberByDepartment = function () {
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
                    html += '<option value="' + data[i].AdminId + '">' + data[i].FullName + '</option>';
                }
                $("#ddlAccountName").append(html);
            }
        });
    };

    this.getListReportType = function () {
        name = '';
        status = 1;
        $.ajax({
            type: "GET",
            url: "/handler/Report.ashx",
            data: { name: name, status: status, page: 0, pageSize: 0, t: "GetListReportType" },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                var html = '';
                for (i = 0; i < data.Items.length; i++) {
                    html += '<option value="' + data.Items[i].ReportTypeId + '">' + data.Items[i].Name + '</option>';
                }
                $("#ddlTypeReport").append(html);
            }
        });
    };

    this.getListReportTypeUpdate = function () {
        Loading.show();
        name = '';
        status = 1;
        $.ajax({
            type: "GET",
            url: "/handler/Report.ashx",
            data: { name: name, status: status, page: 0, pageSize: 0, t: "GetListReportType" },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                var html = '';
                for (i = 0; i < data.Items.length; i++) {
                    html += '<option value="' + data.Items[i].ReportTypeId + '">' + data.Items[i].Name + '</option>';
                }
                $("#ddlTypeReportUpdate").append(html);
                Loading.close();
            }
        });
    };

    //Popup
    this.showPopup = function (reportId) {
        page_ViewReport.variable.reportId = reportId;
        if ($(page_ViewReport.htmlTag.divPopupContainerWrapper).length == 0) {
            $("body").append("<div id='" + this.htmlTag.divPopupContainerWrapper.substring(1) + "'></div>");
            $(this.htmlTag.divPopupContainerWrapper).setTemplateURL("/Templates/popup/ReportUpdate.htm");
            $(this.htmlTag.divPopupContainerWrapper).processTemplate(null);
            COMMON.setTemplatePopup(this.htmlTag.divPopupContainer);
            this.processFormButton();

            //this.getListReportTypeUpdate();
            this.getListMemberByDepartment();

            $("#txtDateExpire").datepicker({
                changeMonth: true,
                changeYear: true
            });

            var html = '';
            for (i = 0; i < 24; i++) {
                var hour = '';

                if (i <= 9) hour = '0' + i.toString();
                else hour = i;
                html += '<option value="' + hour + '">' + hour + '</option>';
            }
            $("#ddlHour").append(html);

            page_ViewReport.getInfoReport();
        }
    };

    this.showPopupChangeStatus = function (reportId) {
        page_ViewReport.variable.reportId = reportId;
        if ($(page_ViewReport.htmlTag.divPopupContainerWrapper).length == 0) {
            $("body").append("<div id='" + this.htmlTag.divPopupContainerWrapper.substring(1) + "'></div>");
            $(this.htmlTag.divPopupContainerWrapper).setTemplateURL("/Templates/popup/report/ReportChangeStatus.htm");
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
                        if (eval(data.Status) == 1) {
                            $(page_ViewReport.htmlTag.divPopupContainerWrapper + " #rdError").attr('checked', 'checked');
                        }
                        else if (eval(data.Status) == 0)
                            $(page_ViewReport.htmlTag.divPopupContainerWrapper + " #rdNoError").attr('checked', 'checked');
                        else if (eval(data.Status) == 2)
                            $(page_ViewReport.htmlTag.divPopupContainerWrapper + " #rdLock").attr('checked', 'checked');
                    }
                }
            });
        }
    };

    $(this.htmlTag.btnAddnew).live('click', function () {
        page_ViewReport.showPopup(-1);
    });

    this.download = function (fileName) {
        window.location.href = "/handler/Report.ashx?t=Download&fileName=" + fileName;
    };

    this.processFormButton = function () {
        $(this.htmlTag.popupCloseButton).click(function () {
            page_ViewReport.close();
            page_ViewReport.closeUpload();
        });

        $(this.htmlTag.popup_cancel).click(function () {
            page_ViewReport.close();
            page_ViewReport.closeUpload();
        });
    };

    // hàm đóng popup
    this.close = function () {
        if ($(page_ViewReport.htmlTag.divPopupContainerWrapper).length != 0) {
            $(page_ViewReport.htmlTag.divPopupContainerWrapper).remove();
        }
    };

    this.closeUpload = function () {
        if ($(page_ViewReport.htmlTag.divPopupUploadContainerWrapper).length != 0) {
            $(page_ViewReport.htmlTag.divPopupUploadContainerWrapper).remove();
        }
    };

    this.functionOnItem = function (f, reportId) {
        switch (f) {
            case 2:
                page_ViewReport.showPopup(reportId);
                break;
            case 3:
                jConfirm("Are you sure delete?", null, function (r) {
                    if (r) {
                        page_ViewReport.deleteReport(reportId);
                    }
                });
                break;
            case 4:
                page_ViewReport.showPopupChangeStatus(reportId);
                break;
        }
    };

    this.getInfoReport = function () {
        $.ajax({
            type: "GET",
            url: "/handler/Report.ashx",
            data: { reportId: this.variable.reportId, t: "GetInfoReport" },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                if (data != null) {
                    $("#ddlTypeReportUpdate").val(data.ReportTypeId);
                    $("#txtNameUpdate").val(data.Name);
                    $("#ddlFileType").val($.trim(data.FileType));
                    $("#txtDescription").val(data.Description);
                    $("#ddlHour").val(COMMON.jSonDateToString(data.DateExpire, 7));
                    $("#txtDateExpire").val(COMMON.jSonDateToString(data.DateExpire, 1));
                    $("#ddlAccountName").val(data.AdminId);

                    if (eval(data.Status) == 1) {
                        $(page_ViewReport.htmlTag.divPopupContainer + " #rdActive").attr('checked', 'checked');
                    }
                    else
                        $(page_ViewReport.htmlTag.divPopupContainer + " #rdDeactive").attr('checked', 'checked');
                }
            }
        });
    };

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
                    page_ViewReport.close();
                    page_ViewReport.loadData();
                }
                Loading.closeProcess();
            }
        });
    };

    $(this.htmlTag.popup_save).live('click', function () {
        if (!FValidate.isValidateAll()) return;
        _reportTypeId = $("#ddlTypeReportUpdate").val();
        _name = $.trim($("#txtNameUpdate").val());
        _status = 0;
        if ($("#rdActive").is(":checked"))
            _status = 1;

        _fileType = $.trim($("#ddlFileType").val());
        _dateExpire = $("#txtDateExpire").val();
        _hour = $("#ddlHour").val();
        _description = $("#txtDescription").val();

        _adminId = $("#ddlAccountName").val();

        if (page_ViewReport.variable.reportId == -1) {
            //Thêm mới
            var _data = { adminId: _adminId, reportTypeId: _reportTypeId, name: _name, fileType: _fileType, dateExpire: _dateExpire, hour: _hour, status: _status, description: _description };
            page_ViewReport.addReport(_data);
        }
        else {
            var _data = { adminId: _adminId, reportId: page_ViewReport.variable.reportId, reportTypeId: _reportTypeId, name: _name, fileType: _fileType, dateExpire: _dateExpire, hour: _hour, status: _status, description: _description };
            page_ViewReport.updateReport(_data);
        }

    });

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
                    page_ViewReport.close();
                    page_ViewReport.loadData();
                }
                Loading.closeProcess();
            }
        });
    };

    this.updateReport = function (_data) {
        Loading.showProcess();
        $.ajax({
            type: "POST",
            contentType: "application/json;charset:utf-8",
            url: "/webServices/ReportWS.asmx/UpdateReport",
            data: JSON.encode(_data),
            dataType: "json",
            cache: false,
            success: function (data) {
                if (data.d > 0) {
                    page_ViewReport.close();
                    page_ViewReport.loadData();
                }
                Loading.closeProcess();
            }
        });
    };

    $("#popup_save_change_status").live('click', function () {
        Loading.showProcess();

        _status = 0;
        if ($("#rdError").is(":checked"))
            _status = 1;
        //        else if ($("#rdLock").is(":checked"))
        //            _status = 2;
        _des = $("#txtDescription").val();

        $.ajax({
            type: "POST",
            contentType: "application/json;charset:utf-8",
            url: "/webServices/ReportWS.asmx/UpdateStatusReport",
            data: JSON.encode({ reportId: page_ViewReport.variable.reportId, status: _status, description: _des }),
            dataType: "json",
            cache: false,
            success: function (data) {
                if (data.d > 0) {
                    page_ViewReport.close();
                    page_ViewReport.bindData();
                }
                Loading.closeProcess();
            }
        });
    });


    this.updateFileNameReport = function () {
        Loading.showProcess();
        $.ajax({
            type: "POST",
            contentType: "application/json;charset:utf-8",
            url: "/webServices/ReportWS.asmx/UploadReport",
            data: JSON.encode({ reportId: this.variable.reportId, fileName: this.variable.fileName, description: '' }),
            dataType: "json",
            cache: false,
            success: function (data) {
                if (data.d > 0) {
                    page_ViewReport.close();
                    page_ViewReport.loadData();
                }
                Loading.closeProcess();
            }
        });
    };

    this.uploadFile = function () {
        $('#btnUpload').live('click', function () {
            if ($('#txtFileUpload').val() == '') {
                jAlert('Please choose file upload.');
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
                this.url = '/handler/Report.ashx?t=upload&fileName=' + $("#report" + page_ViewReport.variable.reportId).html();
            },
            success: function (serverData) {
                Loading.close();
                if (serverData == '-1') {
                    jAlert("File format is not allow.");
                    return;
                }
                else {
                    var strResponse = serverData.split('|');
                    if (strResponse[0] == '1') {
                        page_ViewReport.variable.fileName = strResponse[1];
                        $("#hfOldFileUpload").val(strResponse[1]);
                        page_ViewReport.clearForm();

                        page_ViewReport.updateFileNameReport();
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

    this.download = function (fileName, dataDate) {
        window.location.href = "/handler/Report.ashx?t=Download&fileName=" + fileName + "&dataDate=" + COMMON.jSonDateToString(dataDate, 9);
    };

    this.exportExcel = function () {
        reportName = $("#txtReportName").val();
        accountName = $("#txtAccountName").val();
        status = -1;
        departmentId = $("#ddlDepartment").val();
        isComplete = $("#ddlStatus").val();
        frequency = $("#ddlFrequency").val();
        fromDate = $("#txtFromDate").val() == "" ? "1/1/2010" : $("#txtFromDate").val();
        toDate = $("#txtToDate").val() == "" ? "1/1/2030" : $("#txtToDate").val();


        window.location.href = "/handler/Export.ashx?reportName=" + reportName + "&frequency=" + frequency + "&accountName=" + accountName + "&fromDate=" + fromDate + "&toDate=" + toDate + "&status=-1&isComplete=" + isComplete + "&departmentId=" + departmentId + "&t=ExportExcelWorkTracker";
    };
};