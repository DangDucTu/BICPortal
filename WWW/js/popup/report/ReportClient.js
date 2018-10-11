/// <reference path="../lib/common.js" />
/// <reference path="MemberReport.js" />


page_ClientReport = new function () {
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
        this.objPaging = new VtcPaging("divPaging", "page_ClientReport.bindData", "pagingCss", 20, CONSTANT.PAGE_DISPLAY);
        this.reportId = -1;
        this.fileName = '';
    };

    this.convertDate = function (expDate) {
        return (expDate.getMonth() + 1) + '/' + expDate.getDate() + '/' + expDate.getFullYear();
    };

    this.documentReady = function () {
        var _currentDate = new Date();
        _currentDate.setDate(_currentDate.getDate());

        $("#txtToDate").val(page_ClientReport.convertDate(_currentDate));
        $("#txtToDate").datepicker({
            changeMonth: true,
            changeYear: true
        });

        _currentDate.setDate(_currentDate.getDate());

        $("#txtFromDate").val(page_ClientReport.convertDate(_currentDate));
        $("#txtFromDate").datepicker({
            changeMonth: true,
            changeYear: true
        });

        $("#ui-datepicker-div").hide();

        this.loadData();
    };

    $(this.htmlTag.btnSearch).live('click', function () {
        page_ClientReport.loadData();
    });

    this.loadData = function () {
        this.bindData(1, this.variable.objPaging.pageSize);
    };

    this.bindData = function (_cur, _ps) {
        Loading.show();

        status = -1;
        departmentId = $("#ddlDepartment").val();
        isComplete = $("#ddlStatus").val();
        frequency = $("#ddlFrequency").val();
        fromDate = $("#txtFromDate").val() == "" ? "1/1/2010" : $("#txtFromDate").val();
        toDate = $("#txtToDate").val() == "" ? "1/1/2030" : $("#txtToDate").val();
        $.ajax({
            type: "GET",
            url: "/handler/Report.ashx",
            data: {frequency: frequency, fromDate: fromDate,
                toDate: toDate, isComplete: isComplete, page: _cur, pageSize: _ps, t: "GetListReportForClient"
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                page_ClientReport.processData(data, _cur);
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
        $(this.htmlTag.divList).setTemplateURL("/templates/pages/report/ClientReport.htm?v=1");
        $(this.htmlTag.divList).processTemplate(data);
        page_ClientReport.variable.objPaging.bindPaging(_cur, data.TotalRecord);
        $("#spTotalRecord").html(data.TotalRecord);

        if (data.TotalRecord <= page_ClientReport.variable.objPaging.pageSize) {
            $("#divPaging").attr('style', 'display:none');
        }
        else {
            $("#divPaging").attr('style', 'display:block');
        }


        $('.spanTooltip[title]').qtip({ style: { name: 'green', tip: true, border: { radius: 5}} });
    };

    this.download = function (fileName) {
        window.location.href = "/handler/Report.ashx?t=Download&fileName=" + fileName;
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


        window.location.href = "/handler/Export.ashx?reportId=" + reportId + "&reportName=" + reportName + "&frequency=" + frequency + "&accountName=" + accountName + "&fromDate=" + fromDate + "&toDate=" + toDate + "&status=-1&isComplete=" + isComplete + "&departmentId=" + departmentId + "&t=ExportExcelWorkTracker";
    };
};