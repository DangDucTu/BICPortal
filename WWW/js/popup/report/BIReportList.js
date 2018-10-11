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
            url: "/handler/BIReport.ashx",
            data: { reportName: reportName, frequency: frequency, account: account, status: status, t: "GetBIReportList" },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                $(page_ReportList.htmlTag.divList).setTemplateURL("/templates/pages/report/BIReportList.htm");
                $(page_ReportList.htmlTag.divList).processTemplate(data);

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

    $(this.htmlTag.btnAddnew).live('click', function () {
        page_ReportList.showPopup(-1);
        $("#popup_save").attr("value", "Insert");
        $("#txtReportName").val("BICC_");
    });

    this.showPopup = function (reportListId) {
        page_ReportList.variable.reportListId = reportListId;
        if ($(page_ReportList.htmlTag.divPopupContainerWrapper).length == 0) {
            $("body").append("<div id='" + this.htmlTag.divPopupContainerWrapper.substring(1) + "'></div>");
            $(this.htmlTag.divPopupContainerWrapper).setTemplateURL("/Templates/popup/report/BIReportListUpdate.htm");
            $(this.htmlTag.divPopupContainerWrapper).processTemplate(null);
            COMMON.setTemplatePopup(this.htmlTag.divPopupContainer);
            this.processFormButton();

            page_ReportList.getListMemberByDepartment(reportListId);

            if (page_ReportList.variable.accountName != '')
                $("#divPIC").hide();
        }
    };
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
                    page_ReportList.getInfoReportList();
                }
            }
        });
    };


    this.getInfoReportList = function () {
        $.ajax({
            type: "GET",
            url: "/handler/BIReport.ashx",
            data: { reportListId: this.variable.reportListId, t: "GetInfoBIReportList" },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                if (data != null) {
                    $("#divPopupUpdateReportList #txtReportName").val(data.ReportName);
                    $("#divPopupUpdateReportList #txtReportCode").val(data.ReportCode);
                    $("#divPopupUpdateReportList #ddlClient").val(data.Client);
                    $("#divPopupUpdateReportList #txtEmailClient").val(data.EmailClient);
                    $("#divPopupUpdateReportList #txtDeadline").val(data.Deadline);
                    $("#divPopupUpdateReportList #ddlFrequency").val(data.Frequency);
                    $("#divPopupUpdateReportList #txtDeadline").val(data.Deadline);
                    $("#divPopupUpdateReportList #ddlAccount").val(data.Account);
                    $("#divPopupUpdateReportList #ddlAccountBackup").val(data.AccountBackup);
                    $("#divPopupUpdateReportList #txtUrlReport").val(data.URLReport);
                    $("#divPopupUpdateReportList #ddlIsAuto").val(data.IsAuto);
                    $("#divPopupUpdateReportList #txtDescription").val($.trim(data.Description));

                    if (data.Frequency != 1 && data.Frequency != 5)
                        $("#divDeadline").show();

                    if (data.Frequency == 4) {
                        $("#txtDeadline").datepicker({
                            changeMonth: true,
                            changeYear: true
                        });
                    }
                }
            }
        });

        //page_ReportList.getListReportListClient();
    };

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


    //this.getListReportListClient = function () {
    //    $.ajax({
    //        type: "GET",
    //        url: "/handler/Report.ashx",
    //        data: { reportListId: this.variable.reportListId, t: "GetListReportListClient" },
    //        contentType: "application/json; charset=utf-8",
    //        dataType: "json",
    //        cache: false,
    //        success: function (data) {
    //            $("#tbListClient").setTemplateURL("/templates/pages/report/ReportListClient.htm");
    //            $("#tbListClient").processTemplate(data);
    //        }
    //    });
    //};

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
                    url: "/webServices/BIReportWS.asmx/UpdateStatusBiReportList",
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


    this.showBIReportInfo = function (reportId) {
        window.location = '/pages/report/BIReportView.aspx?Id=' + reportId;
    }

    $(this.htmlTag.popup_save).live('click', function () {
        if (!FValidate.isValidateAll()) return;

        reportName = $.trim($("#divPopupUpdateReportList #txtReportName").val());
        client = $.trim($("#divPopupUpdateReportList #ddlClient").val());
        emailClient = $.trim($("#divPopupUpdateReportList #txtEmailClient").val());
        frequency = $("#divPopupUpdateReportList #ddlFrequency").val();

        if (frequency == 1)
            deadline = "EOD";
        else if (frequency == 5)
            deadline = "REALTIME";
        else deadline = $.trim($("#txtDeadline").val());

        description = $.trim($("#divPopupUpdateReportList #txtDescription").val());

        urlReport = $.trim($("#divPopupUpdateReportList #txtUrlReport").val());

        if (page_ReportList.variable.accountName == '')
            account = $("#divPopupUpdateReportList #ddlAccount").val();
        else account = page_ReportList.variable.accountName;

        accountBackup = $("#divPopupUpdateReportList #ddlAccountBackup").val();

        isAuto = $("#divPopupUpdateReportList #ddlIsAuto").val();

        if (page_ReportList.variable.reportListId == -1) {
            //Thêm mới
            var _data = {
                reportName: reportName, client: client, emailClient: emailClient, deadline: deadline, frequency: frequency, description: description,
                account: account, accountBackup: accountBackup, isAuto: isAuto, urlReport: urlReport
            };
            page_ReportList.addReportList(_data);
        }
        else {
            var _data = {
                reportListId: page_ReportList.variable.reportListId, reportName: reportName, client: client, emailClient: emailClient, deadline: deadline, frequency: frequency, description: description,
                account: account, accountBackup: accountBackup, isAuto: isAuto, urlReport: urlReport
            };
            page_ReportList.updateReportList(_data);
        }

    });

    this.updateReportList = function (_data) {
        Loading.showProcess();
        $.ajax({
            type: "POST",
            contentType: "application/json;charset:utf-8",
            url: "/webServices/BIReportWS.asmx/UpdateBIReportList",
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

    this.addReportList = function (_data) {
        Loading.showProcess();
        $.ajax({
            type: "POST",
            contentType: "application/json;charset:utf-8",
            url: "/webServices/BIReportWS.asmx/InsertBIReport",
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
            error: function () {
                jAlert("An error occurred while performing", function () {
                    Loading.close();
                });
            }
        });
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


    this.closeDeadline = function () {
        if ($("#divChooseDeadlineWrapper").length != 0) {
            $("#divChooseDeadlineWrapper").remove();
        }
    };

    $(".popupclosebutton, #popup_cancel_deadline").live('click', function () {
        page_ReportList.closeDeadline();
    });

}