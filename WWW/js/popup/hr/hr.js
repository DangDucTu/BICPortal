page_Hr = new function () {

    this.htmlTag = new function () {
        this.divPopupContainerWrapper = '#divPopupUpdateHrWrapper';
        this.divPopupContainer = '#divPopupUpdateHr';

        this.btnAddnew = '#liAddSale';
        this.popupCloseButton = '.popupclosebutton';
        this.popup_save = '#popup_save';
        this.popup_cancel = '#popup_cancel';
    };

    this.variable = new function () {
        this.objPaging = new VtcPaging("divPaging", "page_Hr.bindSale", "pagingCss", 20, CONSTANT.PAGE_DISPLAY);
        this.saleCode = '';
        this.teamOld = true;

        this.channel = '';
        this.position = '';
        this.subPosition = '';
        this.team = '';
    };

    this.documentReady = function () {
        page_Hr.bindSale(this.variable.objPaging.currentPage, this.variable.objPaging.pageSize);
        page_Hr.bindTeam("");
    };

    this.bindSale = function (_cur, _ps) {
        Loading.show();

        saleCode = $.trim($("#txtSaleCode").val());
        saleName = $.trim($("#txtSaleName").val());
        team = $("#ddlTeam").val();

        $.ajax({
            type: "GET",
            url: "/handler/HR.ashx",
            data: { saleCode: saleCode, saleName: saleName, team: team, page: _cur, pageSize: _ps, t: "GetListHR" },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                page_Hr.processData(data, _cur);
                Loading.close();
            }
        });
    };

    this.processData = function (data, _cur) {
        $("#tbListSale").setTemplateURL("/templates/pages/hr/hr.htm");
        $("#tbListSale").processTemplate(data);

        page_Hr.variable.objPaging.bindPaging(_cur, data.TotalRecord);
        $("#spTotalRecord").html(data.TotalRecord);

        if (data.TotalRecord <= page_Hr.variable.objPaging.pageSize) {
            $("#divPaging").attr('style', 'display:none');
        }
        else {
            $("#divPaging").attr('style', 'display:block');
        }
    };

    this.bindTeam = function (type, id) {
        $.ajax({
            type: "GET",
            url: "/handler/HR.ashx",
            data: { t: "GetListTeam" },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                var html = '';
                for (var i = 0; i < data.length; i++) {
                    html += '<option value="' + data[i].TEAM + '">' + data[i].TEAM + '</option>';
                }
                $("#ddlTeam" + type).append(html);

                if (type == 1) {
                    $("#ddlTeam1").val($("#team" + id).html());
                }
            }
        });
    };

    this.bindChannel = function () {
        $.ajax({
            type: "GET",
            url: "/handler/HR.ashx",
            data: { t: "GetListChannel" },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                var html = '';
                for (var i = 0; i < data.length; i++) {
                    html += '<option value="' + data[i].CHANNEL + '">' + data[i].CHANNEL + '</option>';
                }
                $("#ddlChannel").append(html);

                if (page_Hr.variable.saleCode == '')
                    page_Hr.bindPosition(data[0].CHANNEL);
                else {
                    page_Hr.getInfoHr();
                }
            }
        });
    };

    this.bindPosition = function (channel) {
        $.ajax({
            type: "GET",
            url: "/handler/HR.ashx",
            data: { channel: channel, t: "GetListPosition" },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                var html = '';
                for (var i = 0; i < data.length; i++) {
                    html += '<option value="' + data[i].POSITION + '">' + data[i].POSITION + '</option>';
                }
                $("#ddlPosition").empty();
                $("#ddlPosition").append(html);

                if (page_Hr.variable.saleCode == '')
                    page_Hr.bindSubPosition(channel, data[0].POSITION);
                else {
                    $("#ddlPosition").val(page_Hr.variable.position);
                    page_Hr.bindSubPosition(page_Hr.variable.channel, page_Hr.variable.position);
                }
            }
        });
    };

    this.bindSubPosition = function (channel, position) {
        $.ajax({
            type: "GET",
            url: "/handler/HR.ashx",
            data: { channel: channel, position: position, t: "GetListSubPosition" },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                var html = '';
                for (var i = 0; i < data.length; i++) {
                    html += '<option value="' + data[i].SUB_POSITION + '">' + data[i].SUB_POSITION + '</option>';
                }
                $("#ddlSubPosition").empty();
                $("#ddlSubPosition").append(html);

                if (page_Hr.variable.saleCode != '') {
                    $("#ddlSubPosition").val(page_Hr.variable.subPosition);
                }

            }
        });
    };

    $("#ddlChannel").live('change', function () {
        $("#ddlPosition").empty();
        page_Hr.bindPosition($(this).val());
    });

    $("#ddlPosition").live('change', function () {
        $("#ddlSubPosition").empty();
        page_Hr.bindSubPosition($("#ddlChannel").val(), $(this).val());
    });

    $("#btnSearch").live('click', function () {
        page_Hr.bindSale(1, page_Hr.variable.objPaging.pageSize);
    });

    $("#ddlTeam").live('change', function () {
        page_Hr.bindSale(1, page_Hr.variable.objPaging.pageSize);
    });

    this.showPopup = function (saleCode, id) {
        page_Hr.variable.saleCode = saleCode;
        if ($(page_Hr.htmlTag.divPopupContainerWrapper).length == 0) {
            $("body").append("<div id='" + this.htmlTag.divPopupContainerWrapper.substring(1) + "'></div>");
            $(this.htmlTag.divPopupContainerWrapper).setTemplateURL("/Templates/popup/hr/HrUpdate.htm");
            $(this.htmlTag.divPopupContainerWrapper).processTemplate(null);
            COMMON.setTemplatePopup(this.htmlTag.divPopupContainer);

            page_Hr.bindTeam('1', id);
            page_Hr.bindChannel();

            $("#txtStartDate").datepicker({
                changeMonth: true,
                changeYear: true,
                yearRange: '2014:2020'
            });

            $("#txtDob").datepicker({
                changeMonth: true,
                changeYear: true,
                yearRange: '1950:2014'
            });

            this.processFormButton();
        }
    };

    this.showPopupSaleOff = function (saleCode) {
        page_Hr.variable.saleCode = saleCode;
        if ($(page_Hr.htmlTag.divPopupContainerWrapper).length == 0) {
            $("body").append("<div id='" + this.htmlTag.divPopupContainerWrapper.substring(1) + "'></div>");
            $(this.htmlTag.divPopupContainerWrapper).setTemplateURL("/Templates/popup/hr/HrSaleOff.htm");
            $(this.htmlTag.divPopupContainerWrapper).processTemplate(null);
            COMMON.setTemplatePopup($("#divPopupSaleOff"));

            page_Hr.bindTeam('1');
            page_Hr.bindChannel();

            $("#txtDateOff").datepicker({
                changeMonth: true,
                changeYear: true
            });

            this.processFormButton();
        }
    };

    this.processFormButton = function () {
        $(this.htmlTag.popup_cancel).click(function () {
            if ($(page_Hr.htmlTag.divPopupContainerWrapper).length != 0) {
                $(page_Hr.htmlTag.divPopupContainerWrapper).remove();
            }
        });

        $(this.htmlTag.popupCloseButton).click(function () {
            if ($(page_Hr.htmlTag.divPopupContainerWrapper).length != 0) {
                $(page_Hr.htmlTag.divPopupContainerWrapper).remove();
            }
        });
    };

    $(this.htmlTag.btnAddnew).live('click', function () {
        page_Hr.showPopup('');
        $("#popup_save").attr("value", "Insert");
    });

    this.getInfoHr = function () {
        $.ajax({
            type: "GET",
            url: "/handler/Hr.ashx",
            data: { saleCode: this.variable.saleCode, t: "GetInfoHr" },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                if (data != null) {
                    $("#divPopupUpdateHr #txtDaoCode").val(data.DAO);
                    $("#divPopupUpdateHr #txtSaleName").val(data.SALE_NAME_TV);
                    $("#divPopupUpdateHr #ddlGender").val(data.GENDER);
                    $("#divPopupUpdateHr #ddlBranchCode").val(data.BRANCH_CODE);
                    $("#divPopupUpdateHr #txtHrStaff").val(data.HR_STAFF);

                    page_Hr.variable.channel = data.CHANNEL;
                    page_Hr.variable.team = data.TEAM;


                    $("#divPopupUpdateHr #ddlTeam1").val(data.TEAM);

                    page_Hr.variable.position = data.POSITION;

                    page_Hr.variable.subPosition = data.SUB_POSITION;

                    $("#divPopupUpdateHr #txtStartDate").val(COMMON.jSonDateToString(data.DATE_SALES_START, 1));
                    $("#divPopupUpdateHr #txtNationalId").val(data.NATIONAL_ID);
                    $("#divPopupUpdateHr #txtMobile").val(data.PHONE);
                    $("#divPopupUpdateHr #txtDob").val(COMMON.jSonDateToString(data.DOB_SALES, 1));

                    $("#divPopupUpdateHr #txtEmail").val(data.EMAIL);
                    $("#divPopupUpdateHr #txtPayroll").val(data.PAYROLL_ACCT);

                    $("#divPopupUpdateHr #txtAddress").val(data.ADDRESS);
                    $("#divPopupUpdateHr #txtNote").val(data.NOTE);

                    $("#ddlChannel").val(data.CHANNEL);
                    page_Hr.bindPosition(data.CHANNEL);

                    $("#ddlChannel").attr("disabled", "disabled");
                    $("#ddlPosition").attr("disabled", "disabled");
                    $("#ddlSubPosition").attr("disabled", "disabled");
                }
            }
        });
    };

    this.functionOnItem = function (f, saleCode, id) {
        switch (f) {
            case 1:
                page_Hr.showPopup(saleCode, id);
                break;
            case 2:
                page_Hr.showPopupSaleOff(saleCode);
                $("#txtDaoCode").val($.trim($("#sc" + id).html()));
                $("#txtSaleName1").val($.trim($("#sn" + id).html()));
                break;
        }
    };

    $("#aTeam").live('click', function () {
        var text = $(this).text();
        switch (text) {
            case "Add New Team":
                page_Hr.variable.teamOld = false;
                $("#ddlTeam1").hide();
                $("#txtTeam").show();
                $("#txtTeam").attr("fempty", "*");
                $("#txtTeam").focus();
                $(this).html('Add Old Team');
                break;

            case "Add Old Team":
                page_Hr.variable.teamOld = true;
                $("#ddlTeam1").show();
                $("#txtTeam").removeAttr("fempty");
                $("#txtTeam").hide();
                $(this).html('Add New Team')
                break;
        }
    });

    $(this.htmlTag.popup_save).live('click', function () {
        if (!FValidate.isValidateAll()) return;

        dao = $.trim($("#divPopupUpdateHr #txtDaoCode").val());
        hrStaff = $.trim($("#divPopupUpdateHr #txtHrStaff").val());
        saleName = $.trim($("#divPopupUpdateHr #txtSaleName").val());
        gender = $.trim($("#divPopupUpdateHr #ddlGender").val());
        branchCode = $.trim($("#divPopupUpdateHr #ddlBranchCode").val());
        channel = $.trim($("#divPopupUpdateHr #ddlChannel").val());
        team = page_Hr.variable.teamOld == true ? $.trim($("#divPopupUpdateHr #ddlTeam1").val()) : $("#txtTeam").val();
        position = $.trim($("#divPopupUpdateHr #ddlPosition").val());
        subPosition = $.trim($("#divPopupUpdateHr #ddlSubPosition").val());
        dateStart = $.trim($("#divPopupUpdateHr #txtStartDate").val());
        nationalId = $.trim($("#divPopupUpdateHr #txtNationalId").val());
        phone = $.trim($("#divPopupUpdateHr #txtMobile").val());
        dob = $.trim($("#divPopupUpdateHr #txtDob").val());
        email = $.trim($("#divPopupUpdateHr #txtEmail").val());
        payroll = $.trim($("#divPopupUpdateHr #txtPayroll").val());
        address = $.trim($("#divPopupUpdateHr #txtAddress").val());
        note = $.trim($("#divPopupUpdateHr #txtNote").val());

        if (page_Hr.variable.saleCode == '') {
            //Thêm mới
            var _data = { dao: dao, hrStaff: hrStaff, saleName: saleName, gender: gender, branchCode: branchCode, channel: channel, team: team, position: position,
                subPosition: subPosition, dateStart: dateStart, nationalId: nationalId, phone: phone, dob: dob, email: email,
                payroll: payroll, address: address, note: note
            };
            page_Hr.addHr(_data);
        }
        else {
            var _data = { saleCode: page_Hr.variable.saleCode, dao: dao, hrStaff: hrStaff, saleName: saleName, gender: gender, branchCode: branchCode, channel: channel, team: team, position: position,
                subPosition: subPosition, dateStart: dateStart, nationalId: nationalId, phone: phone, dob: dob, email: email,
                payroll: payroll, address: address, note: note
            };
            page_Hr.updateHr(_data);
        }

    });

    // hàm đóng popup
    this.close = function () {
        if ($(page_Hr.htmlTag.divPopupContainerWrapper).length != 0) {
            $(page_Hr.htmlTag.divPopupContainerWrapper).remove();
        }
    };

    this.addHr = function (_data) {
        Loading.showProcess();
        $.ajax({
            type: "POST",
            contentType: "application/json;charset:utf-8",
            url: "/webServices/HrWS.asmx/InsertHr",
            data: JSON.encode(_data),
            dataType: "json",
            cache: false,
            success: function (data) {
                if (data.d > 0) {
                    page_Hr.close();
                    page_Hr.bindSale(page_Hr.variable.objPaging.currentPage, page_Hr.variable.objPaging.pageSize);
                    jAlert("Thêm mới thành công.");
                }
                else if (data.d == -1)
                    jAlert("Mã DAO đã tồn tại trên hệ thống.");
                else if (data.d == -2)
                    jAlert("Mã nhân viên (HR Staff) đã tồn tại trên hệ thống.");
                else if (data.d == -3)
                    jAlert("Số CMTND đã tồn tại trên hệ thống.");
                else if (data.d == -4)
                    jAlert("Bạn chỉ được thêm mới trước 17h hàng ngày.");
                else if (data.d == -5)
                    jAlert("Chức năng này đang tạm thời tạm dừng để bảo trì trong ít phút.");
                else if (data.d == -6)
                    jAlert("Email đã tồn tại trên hệ thống.");
                else if (data.d == 6)
                    jAlert("Ngày bắt đầu làm việc phải nhỏ hơn ngày hiện tại.");

                Loading.closeProcess();
            },
            error: function () {
                jAlert("Có lỗi xảy ra trong quá trình thực hiện.", function () {
                    Loading.close();
                });
            }
        });
    };

    this.updateHr = function (_data) {
        Loading.showProcess();

        $.ajax({
            type: "POST",
            contentType: "application/json;charset:utf-8",
            url: "/webServices/HrWS.asmx/UpdateHr",
            data: JSON.encode(_data),
            dataType: "json",
            cache: false,
            success: function (data) {
                if (data.d > 0) {
                    page_Hr.bindSale(page_Hr.variable.objPaging.currentPage, page_Hr.variable.objPaging.pageSize);
                    page_Hr.close();
                    jAlert("Cập nhật thành công.");
                }
                else if (data.d == -1)
                    jAlert("Mã DAO đã tồn tại trên hệ thống.");
                else if (data.d == -2)
                    jAlert("Mã nhân viên (HR Staff) đã tồn tại trên hệ thống.");
                else if (data.d == -3)
                    jAlert("CMTND đã tồn tại trên hệ thống.");
                else if (data.d == -4)
                    jAlert("Bạn chỉ được cập nhật trước 17h hàng ngày.");
                else if (data.d == -5)
                    jAlert("Chức năng này đang tạm thời tạm dừng để bảo trì trong ít phút.");

                Loading.closeProcess();
            },
            error: function () {
                jAlert("Có lỗi xảy ra trong quá trình thực hiện.", function () {
                    Loading.close();
                });
            }
        });
    };

    this.saleOff = function () {
        Loading.showProcess();
        var _data = { saleCode: page_Hr.variable.saleCode, dateOff: $("#txtDateOff").val() };
        $.ajax({
            type: "POST",
            contentType: "application/json;charset:utf-8",
            url: "/webServices/HrWS.asmx/SaleOffHr",
            data: JSON.encode(_data),
            dataType: "json",
            cache: false,
            success: function (data) {
                if (data.d > 0) {
                    page_Hr.close();
                    page_Hr.bindSale(page_Hr.variable.objPaging.currentPage, page_Hr.variable.objPaging.pageSize);
                }
                else if (data.d == -1)
                    jAlert('Ngày nghỉ việc không được chậm quá 31 ngày so với ngày hiện tại.');
                else if (data.d == -2)
                    jAlert('Ngày nghỉ việc không được lớn hơn ngày hiện tại.');

                Loading.close();
            },
            error: function () {
                jAlert("An error occurred while performing", function () {
                    Loading.close();
                });
            }
        });
    };

    $("#popup_save_saleoff").live('click', function () {
        page_Hr.saleOff();
    });

    this.exportExcel = function () {
        if ($(page_Hr.htmlTag.divPopupContainerWrapper).length == 0) {
            $("body").append("<div id='" + this.htmlTag.divPopupContainerWrapper.substring(1) + "'></div>");
            $(this.htmlTag.divPopupContainerWrapper).setTemplateURL("/Templates/popup/hr/ExportExcel.htm");
            $(this.htmlTag.divPopupContainerWrapper).processTemplate(null);
            COMMON.setTemplatePopup("#divPopupExportExcel");
            this.processFormButton();

            var _currentDate = new Date();
            _currentDate.setDate(_currentDate.getDate());

            $("#txtDateExport").val(page_Hr.convertDate(_currentDate));
            $("#txtDateExport").datepicker({
                changeMonth: true,
                changeYear: true
            });
        }
        //window.location.href = "/handler/Export.ashx?t=ExportExcelHr";
    };

    this.convertDate = function (expDate) {
        return (expDate.getMonth() + 1) + '/' + expDate.getDate() + '/' + expDate.getFullYear();
    };

    $("#ddlTypeExport").live('change', function () {
        type = $(this).val();

        if (type == 1) {
            $("#divDate").show();
            $("#divMonth").hide();
        }
        else if (type == 2) {
            $("#divMonth").show();
            $("#divDate").hide();
        }
        else {
            $("#divMonth").hide();
            $("#divDate").hide();
        }
    });

    $("#popup_export_excel").live('click', function () {
        type = $("#ddlTypeExport").val();

        if (type == 1)
            window.location.href = "/handler/Export.ashx?t=ExportExcelHr2&date=" + $("#txtDateExport").val();
        else if (type == 2)
            window.location.href = "/handler/Export.ashx?t=ExportExcelHr3&month=" + $("#ddlMonthExport").val();
        else if (type == 3)
            window.location.href = "/handler/Export.ashx?t=ExportExcelHr";
    });
};