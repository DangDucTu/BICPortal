/// <reference path="../lib/common.js" />

page_ReportList = new function () {
    this.htmlTag = new function () {
        this.divList = '#tbListReportList';
    };

    this.variable = new function () {
        this.reportListId = -1;
        this.accountName = '';
        this.fileName = '';
    };

    this.documentReady = function () {
        this.getPIC($("#ddlDepartment").val());
        this.bindData();
    };

    $("#divSearch #btnSearchReportList").live('click', function () {
        page_ReportList.bindData();
    });

    this.bindData = function () {
        //Loading.show();

        reportName = $("#divSearch #txtReportName").val();
        frequency = $("#divSearch #ddlFrequency").val();
        account = $("#divSearch #ddlPIC").val();
        departmentId = $("#ddlDepartment").val();
        $.ajax({
            type: "GET",
            url: "/handler/Report.ashx",
            data: { departmentId: departmentId, reportName: reportName, frequency: frequency, account: account, status: 1, t: "GetListReportListForView" },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                $(page_ReportList.htmlTag.divList).setTemplateURL("/templates/pages/report/ReportListForView.htm");
                $(page_ReportList.htmlTag.divList).processTemplate(data);

                $('.spanTooltip[title]').qtip({ style: { name: 'green', tip: true, border: { radius: 5}} });

                //Loading.close();

            }
        });
    };

//    $("#divSearch #txtReportName").live('keydown', function () {
//        page_ReportList.bindData();
//    });

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
        page_ReportList.bindData();
    });

    $("#ddlPIC,#ddlFrequency").live('change', function () {
        page_ReportList.bindData();
    });

    $("#txtReportName").live('keydown', function () {
        page_ReportList.bindData();
    });

    this.exportExcel = function () {
        frequency = $("#divSearch #ddlFrequency").val();

        account = page_ReportList.variable.accountName == '' ? $("#divSearch #ddlPIC").val() : page_ReportList.variable.accountName;
        status = $("#ddlStatus").val();

        window.location.href = "/handler/Export.ashx?frequency=" + frequency + "&account=" + account + "&status=" + status + "&t=ExportExcelReportList";
    };
};