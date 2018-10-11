/// <reference path="../lib/common.js" />

pages_Department = new function () {
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
        this.departmentId = -1;
        this.departmentMemberId = -1;
    };

    this.documentReady = function () {
        this.loadData();
    };

    $(this.htmlTag.btnSearch).live('click', function () {
        pages_Department.loadData();
    });

    this.loadData = function () {
        this.bindData();
    };

    this.bindData = function () {
        Loading.show();
        status = $(this.htmlTag.ddlStatus).val();
        $.ajax({
            type: "GET",
            url: "/handler/Department.ashx",
            data: { status: status, t: "GetListDepartment" },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                pages_Department.processData(data);
                Loading.close();
            }
        });
    };

    this.processData = function (data) {
        $(this.htmlTag.divList).setTemplateURL("/templates/pages/Department.htm");
        $(this.htmlTag.divList).processTemplate(data);
    };

    //Popup
    this.showPopup = function (deparmentId) {
        pages_Department.variable.departmentId = deparmentId;
        if ($(pages_Department.htmlTag.divPopupContainerWrapper).length == 0) {
            $("body").append("<div id='" + this.htmlTag.divPopupContainerWrapper.substring(1) + "'></div>");
            $(this.htmlTag.divPopupContainerWrapper).setTemplateURL("/Templates/popup/DepartmentUpdate.htm");
            $(this.htmlTag.divPopupContainerWrapper).processTemplate(null);
            COMMON.setTemplatePopup(this.htmlTag.divPopupContainer);
            this.processFormButton();

            if (deparmentId == -1)
                this.getAdminForDepartment(2);
            else {
                this.getAdminForDepartment(1);
            }
        }
    };

    $(this.htmlTag.btnAddnew).live('click', function () {
        pages_Department.showPopup(-1);
    });

    this.processFormButton = function () {
        $(this.htmlTag.popupCloseButton).click(function () {
            pages_Department.close();
        });

        $(this.htmlTag.popup_cancel).click(function () {
            pages_Department.close();
        });
    };

    // hàm đóng popup
    this.close = function () {
        if ($(pages_Department.htmlTag.divPopupContainerWrapper).length != 0) {
            $(pages_Department.htmlTag.divPopupContainerWrapper).remove();
        }
    };

    this.functionOnItem = function (f, departmentId) {
        switch (f) {
            case 1:
                pages_Department.showPopup(departmentId);
                break;
            case 2:
                jConfirm("Are you sure delete?", null, function (r) {
                    if (r) {
                        pages_Department.deleteDeparment(departmentId);
                    }
                });
                break;
            case 3:
                this.variable.departmentMemberId = departmentId;
                nameDepartment = $("#department" + departmentId).html();
                $("#spNameDepartment").html(" - " + nameDepartment);
                this.getListMemberByDepartment();
                break;
        }
    };

    this.getListMemberByDepartment = function () {
        $.ajax({
            type: "GET",
            url: "/handler/Department.ashx",
            data: { departmentId: this.variable.departmentMemberId, t: "GetListAdminByDepartment" },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                $("#tbListAccount").setTemplateURL("/templates/pages/MemberDepartment.htm");
                $("#tbListAccount").processTemplate(data);

                $("#divListAccount").show();
            }
        });
    };

    this.getListMemberNotInDeparment = function () {
        $.ajax({
            type: "GET",
            url: "/handler/Department.ashx",
            data: { t: "GetListAdminNotInDepartment" },
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
        if (pages_Department.variable.departmentMemberId == -1) {
            jAlert("Please choose a Department");
            return;
        }
        pages_Department.showPopupMember();
    });

    this.showPopupMember = function () {
        if ($("#divChooseMemberWrapper").length == 0) {
            $("body").append("<div id='divChooseMemberWrapper'></div>");
            $("#divChooseMemberWrapper").setTemplateURL("/Templates/popup/ChooseMemberDepartment.htm");
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
        pages_Department.closeMember();
    });

    $("#popup_cancel_member").live('click', function () {
        pages_Department.closeMember();
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
                var _data = { adminIds: listAdmin, departmentId: pages_Department.variable.departmentMemberId };
                Loading.showProcess();
                $.ajax({
                    type: "POST",
                    contentType: "application/json",
                    dataType: "json",
                    data: JSON.encode(_data),
                    cache: false,
                    url: "/webServices/DepartmentWS.asmx/UpdateAdminDepartment",
                    success: function (data) {
                        if (data.d > 0)
                            pages_Department.getListMemberByDepartment();
                        Loading.closeProcess();
                    }
                });
                pages_Department.closeMember();
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
            url: "/webServices/DepartmentWS.asmx/RemoveMemberDepartment",
            success: function (data) {
                if (data.d > 0)
                    pages_Department.getListMemberByDepartment();                    
            }
        });
    };

    this.getInfoDeparment = function (departmentId) {
        $.ajax({
            type: "GET",
            url: "/handler/Department.ashx",
            data: { departmentId: this.variable.departmentId, t: "GetInfoDepartment" },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                if (data != null) {
                    $("#txtNameUpdate").val(data.Name);
                    $("#ddlManagerDepartment").val(data.AdminId);
                    $("#txtDescription").val(data.Description);

                    if (eval(data.Status) == 1) {
                        $(pages_Department.htmlTag.divPopupContainer + " #rdActive").attr('checked', 'checked');
                    }
                    else
                        $(pages_Department.htmlTag.divPopupContainer + " #rdDeactive").attr('checked', 'checked');
                }
            }
        });
    };

    this.deleteDeparment = function (departmentId) {
        $.ajax({
            type: "POST",
            contentType: "application/json;charset:utf-8",
            url: "/webServices/DepartmentWS.asmx/DeleteDepartment",
            data: JSON.encode({ departmentId: departmentId }),
            dataType: "json",
            cache: false,
            success: function (data) {
                if (data.d > 0) {
                    pages_Department.close();
                    pages_Department.loadData();
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

        if (pages_Department.variable.departmentId == -1) {
            //Thêm mới
            var _data = { name: _name, adminId: $("#ddlManagerDepartment").val(), description: $("#txtDescription").val(), status: _status };
            pages_Department.addFunction(_data);
        }
        else {
            var _data = { departmentId: pages_Department.variable.departmentId, name: _name, adminId: $("#ddlManagerDepartment").val(), description: $("#txtDescription").val(), status: _status };
            pages_Department.updateFunction(_data);
        }

    });

    this.addFunction = function (_data) {
        Loading.showProcess();
        $.ajax({
            type: "POST",
            contentType: "application/json;charset:utf-8",
            url: "/webServices/DepartmentWS.asmx/InsertDepartment",
            data: JSON.encode(_data),
            dataType: "json",
            cache: false,
            success: function (data) {
                if (data.d > 0) {
                    pages_Department.close();
                    pages_Department.loadData();
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
            url: "/webServices/DepartmentWS.asmx/UpdateDepartment",
            data: JSON.encode(_data),
            dataType: "json",
            cache: false,
            success: function (data) {
                if (data.d > 0) {
                    pages_Department.close();
                    pages_Department.loadData();
                }
                Loading.closeProcess();
            }
        });
    };

    this.getAdminForDepartment = function (type) {
        $.ajax({
            type: "GET",
            url: "/handler/Department.ashx",
            data: { name: $("#txtAdminName").val(), type: type, t: "GetAdminForDepartment" },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                if (data != null) {
                    var html = '';
                    for (i = 0; i < data.length; i++) {
                        html += '<option value="' + data[i].AdminId + '">' + data[i].Name + '</option>';
                    }
                    $("#ddlManagerDepartment").html(html);

                    pages_Department.getInfoDeparment();
                }
            }
        });
    };

    $("#sel-manager").live('click', function () {
        if (pages_Department.variable.departmentId == -1)
            pages_Department.getAdminForDepartment(2);
        else
            pages_Department.getAdminForDepartment(1);
    });
};