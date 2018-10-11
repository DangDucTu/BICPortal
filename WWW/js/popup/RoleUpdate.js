//-----------------------------------------------------------
Popup_SystemRoleUpdate = {
    htmlTag: {
        divPopupContainerWrapper: '#divPopupUpdateRoleWrapper',
        divPopupContainer: '#divPopupUpdateRole',
        popupCloseButton: '.popupclosebutton',
        popup_cancel: '#popup_cancel',
        popup_save: '#popup_save'
    },

    vars: {
        m_roleId: 0,
        m_typeBin: 0
    },

    showPopup: function (roleId, typeBin) {
        this.vars.m_roleId = roleId;
        this.vars.m_typeBin = typeBin;
        if ($(this.htmlTag.divPopupContainerWrapper).length == 0) {
            $("body").append("<div id='" + this.htmlTag.divPopupContainerWrapper.substring(1) + "'></div>");
            $(this.htmlTag.divPopupContainerWrapper).setTemplateURL("/Templates/popup/RoleUpdate.htm");
            $(this.htmlTag.divPopupContainerWrapper).processTemplate(null);
            COMMON.setTemplatePopup(this.htmlTag.divPopupContainer);
            this.processFormButton();
            this.binDataRole(this.vars.m_roleId);
        };
    },

    processFormButton: function () {
        FValidate.validateAll();
        $(this.htmlTag.popupCloseButton).click(function () {
            Popup_SystemRoleUpdate.close();
        });
        $(this.htmlTag.popup_cancel).click(function () {
            Popup_SystemRoleUpdate.close();
        });
        $(this.htmlTag.popup_save).click(function () {
            Popup_SystemRoleUpdate.UpdateRole();
        });
    },

    binDataRole: function (roleId) {
        if (roleId > 0) {
            $(".titlepopup").html('Sửa thông tin nhóm chức năng');
            Loading.showProcess();
            $.ajax({
                type: "GET",
                url: "/handler/RoleHandler.ashx",
                data: { t: 'GetInfo', roleId: roleId },
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                cache: false,
                success: function (data) {
                    $(Popup_SystemRoleUpdate.htmlTag.divPopupContainer + " #txtName").val(data.Name);
                    $(Popup_SystemRoleUpdate.htmlTag.divPopupContainer + " #hfRoleId").val(data.RoleId);
                    $(Popup_SystemRoleUpdate.htmlTag.divPopupContainer + " #txtDescription").val(data.Description);
                    if (eval(data.Status) == 1) {
                        $(Popup_SystemRoleUpdate.htmlTag.divPopupContainer + " #rdActive").attr('checked', 'checked');
                    }
                    else
                        $(Popup_SystemRoleUpdate.htmlTag.divPopupContainer + " #rdDeactive").attr('checked', 'checked');
                    $(Popup_SystemRoleUpdate.htmlTag.divPopupContainer + " #txtName").focus();
                    Loading.closeProcess();
                }
            });
        }
        else {
            $(Popup_SystemRoleUpdate.htmlTag.divPopupContainerWrapper + " #txtName").focus();
        }
    },

    defaultSelect: function () {
        $("#Role" + Popup_SystemRoleUpdate.vars.m_roleId + " select option[value='']").attr('selected', 'selected');
    },

    close: function () {
        if ($(Popup_SystemRoleUpdate.htmlTag.divPopupContainerWrapper).length != 0) {
            $(Popup_SystemRoleUpdate.htmlTag.divPopupContainerWrapper).remove();
            Popup_SystemRoleUpdate.defaultSelect();
        }
    },


    UpdateRole: function () {
        if (!FValidate.isValidateAll()) return;
        //Thêm mới Role
        var _name = $.trim($(Popup_SystemRoleUpdate.htmlTag.divPopupContainerWrapper + " #txtName").val());
        var _description = $.trim($(Popup_SystemRoleUpdate.htmlTag.divPopupContainerWrapper + " #txtDescription").val());
        var _status = 0;
        var _roleId = eval($.trim($(Popup_SystemRoleUpdate.htmlTag.divPopupContainerWrapper + " #hfRoleId").val()));

        if ($(Popup_SystemRoleUpdate.htmlTag.divPopupContainerWrapper + " #rdActive").is(":checked"))
            _status = 1;
        if (_roleId > 0) {
            //cập nhật
            Loading.showProcess();
            var _data = { roleId: _roleId, name: _name, description: _description, status: _status };
            $.ajax({
                type: "POST",
                contentType: "application/json;charset:utf-8",
                url: "/webServices/RoleWS.asmx/UpdateRole",
                data: JSON.encode(_data),
                dataType: "json",
                cache: false,
                success: function (data) {
                    if (Popup_SystemRoleUpdate.vars.m_typeBin == 1) {
                        Pages_SystemRole.bindData();
                    }
                    else {
                        Pages_SystemRoleInfo.bindRoleInfo();
                    }
                    Popup_SystemRoleUpdate.close();
                    Loading.closeProcess();
                }
            });
        }
        else {
            //Thêm mới
            Loading.showProcess();
            var _data = { name: _name, description: _description, status: _status };
            $.ajax({
                type: "POST",
                contentType: "application/json;charset:utf-8",
                url: "/webServices/RoleWS.asmx/InsertRole",
                data: JSON.encode(_data),
                dataType: "json",
                cache: false,
                success: function (data) {
                    Pages_SystemRole.bindData();
                    Popup_SystemRoleUpdate.close();
                    Loading.closeProcess();
                }
            });
        }
    }
};
