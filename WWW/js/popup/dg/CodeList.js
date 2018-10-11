/// <reference path="../lib/common.js" />

page_CodeList = new function () {
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
        this.btnImportExcel = '#liImportExcel';
    };

    this.variable = new function () {
        this.objPaging = new VtcPaging("divPaging", "page_CodeList.bindData", "pagingCss", 20, CONSTANT.PAGE_DISPLAY);
        this.codeId = -1;
        this.accountName = '';
        this.fileName = '';

        this.auto = '';
    };
    function getUrlParameter(sParam) {
        var sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? null : sParameterName[1];
            }
        }
    };
    this.documentReady = function (accountName) {
        this.variable.accountName = accountName;
        if (accountName == "") {
            this.getPIC();
        }
        var field = getUrlParameter('field');
        var type = getUrlParameter('type');
        this.getListField("#divSearch #ddlFieldSearch", field, type);

        $("#txtFromDateSearch").datepicker({
            changeMonth: true,
            changeYear: true
        });

        $("#txtToDateSearch").datepicker({
            changeMonth: true,
            changeYear: true
        });
        this.bindData(this.variable.objPaging.currentPage, this.variable.objPaging.pageSize);
    };

    this.bindData = function (_cur, _ps) {
        Loading.show();

        type = $("#divSearch #ddlTypeSearch").val();
        field = $("#divSearch #ddlFieldSearch").val();
        requester = $("#divSearch #txtRequestorSearch").val();
        segment = $("#divSearch #txtSegmentSearch").val();
        fromDate = $("#divSearch #txtFromDateSearch").val();
        toDate = $("#divSearch #txtToDateSearch").val();
        account = page_CodeList.variable.accountName == '' ? $("#divSearch #ddlPIC").val() : page_CodeList.variable.accountName;
        status = $("#divSearch #ddlStatusSearch").val(); -1;

        $.ajax({
            type: "GET",
            url: "/handler/CodeList.ashx",
            data: { type: type, field: field, requester: requester, status: status, segment: segment, account: account, fromDate: fromDate, toDate: toDate, page: _cur, pageSize: _ps, t: "GetListCode" },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                $(page_CodeList.htmlTag.divList).setTemplateURL("/templates/pages/dg/CodeList.htm");
                $(page_CodeList.htmlTag.divList).processTemplate(data);

                $('.spanTooltip[title]').qtip({ style: { name: 'green', tip: true, border: { radius: 5 } } });

                page_CodeList.variable.objPaging.bindPaging(_cur, data.TotalRecord);
                $("#spTotalRecord").html(data.TotalRecord);

                if (data.TotalRecord <= page_CodeList.variable.objPaging.pageSize) {
                    $("#divPaging").attr('style', 'display:none');
                }
                else {
                    $("#divPaging").attr('style', 'display:block');
                }
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

    this.getListType = function (fieldId, idHtml, typeId) {
        $.ajax({
            type: "GET",
            url: "/handler/CodeList.ashx",
            data: { fieldId: fieldId, t: "GetListType" },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                var html = '';
                for (i = 0; i < data.length; i++) {
                    html += '<option value="' + data[i].TYPE_ID + '">' + data[i].TYPE_NAME + '</option>';
                }
                //$("#divPopupUpdateReportList #ddlAccount").append(html);
                $(idHtml).append(html);
                if (typeId != null) {
                    $(idHtml).val(typeId);
                    page_CodeList.bindData(1, page_CodeList.variable.objPaging.pageSize);
                }
            }
        });
    };

    this.getListField = function (idHtml, fieldId, typeId) {
        $.ajax({
            type: "GET",
            url: "/handler/CodeList.ashx",
            data: { t: "GetListField" },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                var html = '';
                for (i = 0; i < data.length; i++) {
                    html += '<option value="' + data[i].FIELD_ID + '">' + data[i].FIELD_NAME + '</option>';
                }
                //$("#divPopupUpdateReportList #ddlAccount").append(html);
                $(idHtml).append(html);
                if (fieldId != null) {
                    $(idHtml).val(fieldId);
                    if (typeId == null) {
                        page_CodeList.getListType(fieldId, "#divSearch #ddlTypeSearch");
                        page_CodeList.bindData(1, page_CodeList.variable.objPaging.pageSize);
                    } else {
                        page_CodeList.getListType(fieldId, "#divSearch #ddlTypeSearch", typeId);
                    }
                }
            }
        });
    };

    this.showPopup = function (codeId) {
        page_CodeList.variable.codeId = codeId;
        if ($(page_CodeList.htmlTag.divPopupContainerWrapper).length == 0) {
            $("body").append("<div id='" + this.htmlTag.divPopupContainerWrapper.substring(1) + "'></div>");
            $(this.htmlTag.divPopupContainerWrapper).setTemplateURL("/Templates/popup/dg/CodeListUpdate.htm");
            $(this.htmlTag.divPopupContainerWrapper).processTemplate(null);
            COMMON.setTemplatePopup(this.htmlTag.divPopupContainer);
            this.processFormButton();

            page_CodeList.getListField("#divPopupUpdateReportList #ddlField");
            page_CodeList.getListType(0, "#divPopupUpdateReportList #ddlType");

            if (codeId > 0) {
                page_CodeList.fillCodeListInfo(codeId);
            }

            $("#txtEffectiveDate").datepicker({
                changeMonth: true,
                changeYear: true
            });
        }
    };


    this.fillCodeListInfo = function (codeId) {
        account = page_CodeList.variable.accountName == '' ? $("#divSearch #ddlPIC").val() : page_CodeList.variable.accountName;
        $.ajax({
            type: "GET",
            url: "/handler/CodeList.ashx",
            data: { codeId: codeId, t: "GetInfoCode" },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data_repsponse) {
                if (data_repsponse != null) {
                    data = data_repsponse;
                    $("#divPopupUpdateReportList #txtCode").val(data.CODE);
                    $("#divPopupUpdateReportList #txtCode").prop("disabled", true);
                    $("#divPopupUpdateReportList #txtName").val(data.NAME);
                    $("#divPopupUpdateReportList #txtSegment").val(data.SEGMENT);
                    $("#divPopupUpdateReportList #txtEffectiveDate").val(data.EFFECTIVE_DATE == null ? '' : FormatDate(data.EFFECTIVE_DATE));
                    $("#divPopupUpdateReportList #txtRequester").val(data.REQUESTER);
                    $("#divPopupUpdateReportList #ddlStatus").val(data.STATUS_ID);
                    $("#divPopupUpdateReportList #ddlField").val(data.FIELD);
                    page_CodeList.getListType(data.FIELD, "#divPopupUpdateReportList #ddlType");
                    $("#divPopupUpdateReportList #ddlType").val(data.TYPE);
                }
            }
        });
    }

    function FormatDate(strDate) {
        orderdate = new Date(parseInt(strDate.replace("/Date(", "").replace(")/", ""), 10))
        month = orderdate.getMonth() + 1 < 10 ? '0' + (orderdate.getMonth() + 1).toString() : orderdate.getMonth();
        return month + '/' + orderdate.getDate() + '/' + orderdate.getFullYear();
    }

    $(this.htmlTag.btnAddnew).live('click', function () {
        page_CodeList.showPopup(-1);
        $("#popup_save").attr("value", "Insert");
    });

    $(this.htmlTag.btnImportExcel).live('click', function () {
        page_CodeList.showPopupUpload();
    });

    this.processFormButton = function () {
        $(this.htmlTag.popupCloseButton).click(function () {
            page_CodeList.close();
            page_CodeList.closeUpload();
        });

        $(this.htmlTag.popup_cancel).click(function () {
            page_CodeList.close();
            page_CodeList.closeUpload();
        });
    };

    this.close = function () {
        if ($(page_CodeList.htmlTag.divPopupContainerWrapper).length != 0) {
            $(page_CodeList.htmlTag.divPopupContainerWrapper).remove();
        }
    };

    this.closeUpload = function () {
        if ($(page_CodeList.htmlTag.divPopupUploadContainerWrapper).length != 0) {
            $(page_CodeList.htmlTag.divPopupUploadContainerWrapper).remove();
        }
    };
    this.functionOnItem = function (f, codeId) {
        switch (f) {
            case 2:
                page_CodeList.showPopup(codeId);
                break;
        }
    };

    $(this.htmlTag.popup_save).live('click', function () {
        if (!FValidate.isValidateAll()) return;

        code = $.trim($("#divPopupUpdateReportList #txtCode").val());
        name = $.trim($("#divPopupUpdateReportList #txtCode").val());

        if (page_CodeList.variable.accountName == '')
            account = $("#divPopupUpdateReportList #ddlAccount").val();
        else account = page_CodeList.variable.accountName;

        segment = $.trim($("#divPopupUpdateReportList #txtSegment").val());

        effectiveDate = $.trim($("#divPopupUpdateReportList #txtEffectiveDate").val());
        requester = $.trim($("#divPopupUpdateReportList #txtRequester").val());

        status = $("#divPopupUpdateReportList #ddlStatus").val();
        field = $("#divPopupUpdateReportList #ddlField").val() == null ? 0 : $("#divPopupUpdateReportList #ddlField").val();
        type = $("#divPopupUpdateReportList #ddlType").val() == null ? 0 : $("#divPopupUpdateReportList #ddlType").val();

        if (page_CodeList.variable.codeId == -1) {
            //Thêm mới
            var _data = {
                code: code, name: name, segment: segment, account: account, effectiveDate: effectiveDate, requester: requester, status: status, field: field, type: type
            };
            page_CodeList.addCodeList(_data);
        }
        else {
            var _data = {
                codeId: page_CodeList.variable.codeId, code: code, name: name, segment: segment, account: account, effectiveDate: effectiveDate, requester: requester, status: status, field: field, type: type
            };
            page_CodeList.updateCodeList(_data);
        }

    });

    this.addCodeList = function (_data) {
        Loading.showProcess();
        $.ajax({
            type: "POST",
            contentType: "application/json;charset:utf-8",
            url: "/webServices/CodeListWS.asmx/InsertCodeList",
            data: JSON.encode(_data),
            dataType: "json",
            cache: false,
            success: function (data) {
                if (data.d >= 0) {
                    page_CodeList.bindData(1, page_CodeList.variable.objPaging.pageSize);
                    page_CodeList.close();
                }
                else if (data.d == -1)
                    jAlert("Code is already exists");
                Loading.closeProcess();
            },
            error: function (data) {
                jAlert("An error occurred while performing", function () {
                    Loading.close();
                });
            }
        });
    };

    this.updateCodeList = function (_data) {
        Loading.showProcess();
        $.ajax({
            type: "POST",
            contentType: "application/json;charset:utf-8",
            url: "/webServices/CodeListWS.asmx/UpdateCode",
            data: JSON.encode(_data),
            dataType: "json",
            cache: false,
            success: function (data) {
                if (data.d >= 0) {
                    page_CodeList.close();
                    page_CodeList.bindData(1, page_CodeList.variable.objPaging.pageSize);
                }
                else if (data.d == -1)
                    jAlert("Code is already exists");
                Loading.closeProcess();
            },
            error: function () {
                jAlert("An error occurred while performing", function () {
                    Loading.close();
                });
            }
        });
    };

    $("#ddlField").live('change', function () {
        var fieldID = $(this).val();
        $("#divPopupUpdateReportList #ddlType").find('option').remove().end();
        page_CodeList.getListType(fieldID, "#divPopupUpdateReportList #ddlType");
    });

    $("#divSearch #ddlFieldSearch").live('change', function () {
        var fieldID = $(this).val();
        $("#divSearch #ddlTypeSearch").find('option').remove().end().append('<option value="-1" selected="selected">[-- All --]</option>');
        page_CodeList.getListType(fieldID, "#divSearch #ddlTypeSearch");
        page_CodeList.bindData(1, page_CodeList.variable.objPaging.pageSize);
    });

    $("#divSearch #ddlStatusSearch, #divSearch #ddlTypeSearch,#divSearch #txtFromDateSearch,#divSearch #txtToDateSearch").live('change', function () {
        page_CodeList.bindData(1, page_CodeList.variable.objPaging.pageSize);
    });

    $("#divSearch #txtSegmentSearch,#divSearch #txtRequestorSearch").live('keyup', function () {
        page_CodeList.bindData(1, page_CodeList.variable.objPaging.pageSize);
    });
    ////import excel


    this.showPopupUpload = function () {
        if ($(page_CodeList.htmlTag.divPopupUploadContainerWrapper).length == 0) {
            $("body").append("<div id='" + this.htmlTag.divPopupUploadContainerWrapper.substring(1) + "'></div>");
            $(this.htmlTag.divPopupUploadContainerWrapper).setTemplateURL("/Templates/popup/dg/CodeListImportExcel.htm?v=1");
            $(this.htmlTag.divPopupUploadContainerWrapper).processTemplate(null);
            COMMON.setTemplatePopup(this.htmlTag.divPopupUploadContainer);
            this.processFormButton();


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
                if (page_CodeList.variable.accountName == '')
                    account = $("#divPopupUpdateReportList #ddlAccount").val();
                else account = page_CodeList.variable.accountName;
                Loading.show();
                this.url = '/handler/CodeList.ashx?t=upload&account=' + account;
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
                        page_CodeList.variable.fileName = strResponse[1];
                        $("#hfOldFileUpload").val(strResponse[1]);
                        page_CodeList.clearForm();

                        page_CodeList.bindData(1, page_CodeList.variable.objPaging.pageSize);
                        //page_CodeList.updateFileNameReport(strResponse[2]);
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

};