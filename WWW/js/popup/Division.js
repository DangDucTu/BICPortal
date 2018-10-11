/// <reference path="../lib/common.js" />

pages_Division = new function () {
    this.htmlTag = new function () {
        this.divList = '#tbListDepartment';
        this.divPopupContainerWrapper = '#divPopupUpdateDepartmentWrapper';
        this.divPopupContainer = '#divPopupUpdateDepartment';
        this.popupCloseButton = '.popupclosebutton';
        this.popup_cancel = '#popup_cancel';
        this.popup_save = '#popup_save';

        this.btnAddnew = '#liAddDepartment';
        this.ddlStatus = '#ddlStatus';
        this.btnSearch = '#btnSearch';
    };

    this.variable = new function () {
        this.divisionId = -1;
        this.divisionMemberId = -1;
    };

    this.documentReady = function () {
        this.loadData();
    };

    $(this.htmlTag.btnSearch).live('click', function () {
        pages_Division.loadData();
    });

    this.loadData = function () {
        this.bindData();
    };

    this.bindData = function () {
        Loading.show();
        status = $(this.htmlTag.ddlStatus).val();
        $.ajax({
            type: "GET",
            url: "/handler/Division.ashx",
            data: { status: status, t: "GetListDivision" },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                pages_Division.processData(data);
                Loading.close();
            }
        });
    };

    this.processData = function (data) {
        $(this.htmlTag.divList).setTemplateURL("/templates/pages/Division.htm");
        $(this.htmlTag.divList).processTemplate(data);
    };

    //Popup
    this.showPopup = function (divisionId) {
        pages_Division.variable.divisionId = divisionId;
        if ($(pages_Division.htmlTag.divPopupContainerWrapper).length == 0) {
            $("body").append("<div id='" + this.htmlTag.divPopupContainerWrapper.substring(1) + "'></div>");
            $(this.htmlTag.divPopupContainerWrapper).setTemplateURL("/Templates/popup/DivisionUpdate.htm");
            $(this.htmlTag.divPopupContainerWrapper).processTemplate(null);
            COMMON.setTemplatePopup(this.htmlTag.divPopupContainer);
            this.processFormButton();

        }
    };

    $(this.htmlTag.btnAddnew).live('click', function () {
        pages_Division.showPopup(-1);
    });

    this.processFormButton = function () {
        $(this.htmlTag.popupCloseButton).click(function () {
            pages_Division.close();
        });

        $(this.htmlTag.popup_cancel).click(function () {
            pages_Division.close();
        });
    };

    // hàm đóng popup
    this.close = function () {
        if ($(pages_Division.htmlTag.divPopupContainerWrapper).length != 0) {
            $(pages_Division.htmlTag.divPopupContainerWrapper).remove();
        }
    };

    this.functionOnItem = function (f, divisionId) {
        switch (f) {
            case 1:
                pages_Division.showPopup(divisionId);
                pages_Division.getInfoDeparment(divisionId);
                break;
            case 2:
                jConfirm("Are you sure delete?", null, function (r) {
                    if (r) {
                        pages_Division.deleteDeparment(divisionId);
                    }
                });
                break;
            case 3:
                this.variable.divisionMemberId = divisionId;
                nameDepartment = $("#department" + divisionId).html();
                $("#spNameDepartment").html(" - " + nameDepartment);
                this.getListMemberByDepartment();
                break;
        }
    };

    this.getListMemberByDepartment = function () {
        $.ajax({
            type: "GET",
            url: "/handler/Division.ashx",
            data: { divisionId: this.variable.divisionMemberId, t: "GetListAdminByDivision" },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                $("#tbListAccount").setTemplateURL("/templates/pages/MemberDivision.htm");
                $("#tbListAccount").processTemplate(data);

                $("#divListAccount").show();
            }
        });
    };

    this.getListMemberNotInDeparment = function () {
        $.ajax({
            type: "GET",
            url: "/handler/Division.ashx",
            data: { t: "GetListAdminNotInDivision" },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                var strHtml = '';
                var m_data = data;
                if (m_data.length > 0) {
                    for (var i = 0; i < m_data.length; i++) {
                        strHtml += ' <tr>'
                 + '    <td class="selected">'
                 + '        <input type="checkbox" class="cbRecord" id="CAS' + m_data[i].AdminId + '">'
                 + '    </td>'
                 + '    <td class="title column100l" style="text-align:left;">'
                 + m_data[i].Name
                 + '    </td>'
                 + '    <td class="last left" style="text-align:left;">'
                 + m_data[i].FullName
                 + '    </td>'
                 + ' </tr>';
                    }
                }
                else {
                    strHtml += ' <tr>'
                + '    <td colspan="6" class="last" style="text-align:left;">'
                + '        Not Found Account Name!'
                + '    </td>'
                + ' </tr>';
                }
                $("#tbListMember").html(strHtml);
            }
        });
    };

    $("#liAddMember").live('click', function () {
        if (pages_Division.variable.divisionMemberId == -1) {
            jAlert("Please choose a Department");
            return;
        }
        pages_Division.showPopupMember();
    });

    this.showPopupMember = function () {
        if ($("#divChooseMemberWrapper").length == 0) {
            $("body").append("<div id='divChooseMemberWrapper'></div>");
            $("#divChooseMemberWrapper").setTemplateURL("/Templates/popup/ChooseMemberDivision.htm");
            $("#divChooseMemberWrapper").processTemplate(null);
            COMMON.setTemplatePopup("#divPopupChooseMember");
            this.processFormButtonMember();
            this.getListMemberNotInDeparment();
        };
    };

    this.closeMember = function () {
        if ($("#divChooseMemberWrapper").length != 0) {
            $("#divChooseMemberWrapper").remove();
        }
    };

    $(".popupclosebutton").live('click', function () {
        pages_Division.closeMember();
    });

    $("#popup_cancel_member").live('click', function () {
        pages_Division.closeMember();
    });

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

            }
            else {
                var listAdmin = "";
                $("#tbListMember input:checkbox").each(function () {
                    if ($(this).is(':checked')) {
                        listAdmin += $(this).attr('id').substring(3) + ",";
                    }
                });
                listAdmin = listAdmin.substring(0, listAdmin.length - 1);
                var _data = { adminIds: listAdmin, divisionId: pages_Division.variable.divisionMemberId };
                Loading.showProcess();
                $.ajax({
                    type: "POST",
                    contentType: "application/json",
                    dataType: "json",
                    data: JSON.encode(_data),
                    cache: false,
                    url: "/webServices/DivisionWS.asmx/UpdateAdminDivsion",
                    success: function (data) {
                        if (data.d > 0)
                            pages_Division.getListMemberByDepartment();
                        Loading.closeProcess();
                    }
                });
                pages_Division.closeMember();
            }
        });
    };

    this.removeMember = function (adminId) {
        $.ajax({
            type: "POST",
            contentType: "application/json",
            dataType: "json",
            data: JSON.encode({ adminId: adminId }),
            cache: false,
            url: "/webServices/DivisionWS.asmx/RemoveMemberDivision",
            success: function (data) {
                if (data.d > 0)
                    pages_Division.getListMemberByDepartment();
            }
        });
    };

    this.getInfoDeparment = function (divisionId) {
        $.ajax({
            type: "GET",
            url: "/handler/Division.ashx",
            data: { divisionId: divisionId, t: "GetInfoDivision" },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                if (data != null) {
                    $("#txtNameUpdate").val(data.Division_name);
                    $("#txtDivisionCode").val(data.Division_code);

                    if (eval(data.Status) == 1) {
                        $(pages_Division.htmlTag.divPopupContainer + " #rdActive").attr('checked', 'checked');
                    }
                    else
                        $(pages_Division.htmlTag.divPopupContainer + " #rdDeactive").attr('checked', 'checked');
                }
            }
        });
    };

    this.deleteDeparment = function (divisionId) {
        $.ajax({
            type: "POST",
            contentType: "application/json;charset:utf-8",
            url: "/webServices/DepartmentWS.asmx/DeleteDepartment",
            data: JSON.encode({ divisionId: divisionId }),
            dataType: "json",
            cache: false,
            success: function (data) {
                if (data.d > 0) {
                    pages_Division.close();
                    pages_Division.loadData();
                }
                Loading.closeProcess();
            }
        });
    };

    $(this.htmlTag.popup_save).live('click', function () {
        if (!FValidate.isValidateAll()) return;
        _name = $.trim($("#txtNameUpdate").val());
        _status = 0;
        if ($("#rdActive").is(":checked"))
            _status = 1;

        if (pages_Division.variable.divisionId == -1) {
            //Thêm mới
            var _data = { name: _name, divisionCode: $("#txtDivisionCode").val(), status: _status };
            pages_Division.addFunction(_data);
        }
        else {
            var _data = { divisionId: pages_Division.variable.divisionId, name: _name, divisionCode: $("#txtDivisionCode").val(), status: _status };
            pages_Division.updateFunction(_data);
        }

    });

    this.addFunction = function (_data) {
        Loading.showProcess();
        $.ajax({
            type: "POST",
            contentType: "application/json;charset:utf-8",
            url: "/webServices/DivisionWS.asmx/InsertDivision",
            data: JSON.encode(_data),
            dataType: "json",
            cache: false,
            success: function (data) {
                if (data.d > 0) {
                    pages_Division.close();
                    pages_Division.loadData();
                }
                Loading.closeProcess();
            }
        });
    };

    this.updateFunction = function (_data) {
        Loading.showProcess();
        $.ajax({
            type: "POST",
            contentType: "application/json;charset:utf-8",
            url: "/webServices/DivisionWS.asmx/UpdateDivision",
            data: JSON.encode(_data),
            dataType: "json",
            cache: false,
            success: function (data) {
                if (data.d > 0) {
                    pages_Division.close();
                    pages_Division.loadData();
                }
                Loading.closeProcess();
            }
        });
    };

};