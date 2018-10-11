/// <reference path="../lib/common.js" />

page_CodeManagement = new function () {
    this.htmlTag = new function () {
        this.divList = '#tbListReportList';
        this.divPopupContainerWrapper = '#divPopupUpdateReportListWrapper';
        this.divPopupContainer = '#divPopupUpdateReportList';
        this.divPopupRequestFormContainer = '#divPopupUploadRequestForm';

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
        account = page_CodeManagement.variable.accountName == '' ? $("#divSearch #ddlPIC").val() : page_CodeManagement.variable.accountName;

        status = $("#ddlStatus").val();
        $.ajax({
            type: "GET",
            url: "/handler/CodeManagement.ashx",
            data: { reportName: reportName, frequency: frequency, account: account, status: status, t: "GetOverviewCodeManagement" },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                $(page_CodeManagement.htmlTag.divList).setTemplateURL("/templates/pages/dg/CodeManagement.htm");
                $(page_CodeManagement.htmlTag.divList).processTemplate(data);

                $('.spanTooltip[title]').qtip({ style: { name: 'green', tip: true, border: { radius: 5 } } });

                Loading.close();

            }
        });
    };

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

    this.close = function () {
        if ($(page_CodeManagement.htmlTag.divPopupContainerWrapper).length != 0) {
            $(page_CodeManagement.htmlTag.divPopupContainerWrapper).remove();
        }
    };
};