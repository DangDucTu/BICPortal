//-----------------------------------------------------------
// Author:      trung.pham
// Create Date: 16/11/2011
// Description: Hiển thị popup chọn nhóm quyền của Admin
//-----------------------------------------------------------

Popup_SystemAdminChooseRole = {
    htmlTag: {
        divPopupContainerWrapper: '#divPopupChooseRoleWrapper',
        divPopupContainer: '#divPopupChooseRole',
        popupCloseButton: '.popupclosebutton',
        popup_cancel: '#popup_cancel',
        popup_save: '#popup_save',

        checkallRole: ".checkallRole"
    },

    vars: {
        m_adminId: 0
    },

    showPopup: function (adminId) {
        Popup_SystemAdminChooseRole.vars.m_adminId = adminId;
        if ($(this.htmlTag.divPopupContainerWrapper).length == 0) {
            $("body").append("<div id='" + this.htmlTag.divPopupContainerWrapper.substring(1) + "'></div>");
            Popup_SystemAdminChooseRole.bindData();
        };
    },

    processFormButton: function () {
        $(this.htmlTag.popupCloseButton, this.htmlTag.divPopupContainerWrapper).click(function () {
            Popup_SystemAdminChooseRole.close();
        });

        $(this.htmlTag.popup_cancel, this.htmlTag.divPopupContainerWrapper).click(function () {
            Popup_SystemAdminChooseRole.close();
        });

        $(this.htmlTag.checkallRole, this.htmlTag.divPopupContainerWrapper).click(function () {
            if ($(this).is(':checked')) {
                $("#tbdRoleList input:checkbox").each(function () {
                    $(this).attr('checked', true);
                    $(this.parentNode.parentNode).addClass("selected");
                });
            }
            else {
                $("#tbdRoleList input:checkbox").each(function () {
                    $(this).attr('checked', false);
                    $(this.parentNode.parentNode).removeClass("selected");
                });
            }
        });

        $(this.htmlTag.popup_save, this.htmlTag.divPopupContainerWrapper).click(function () {
            var _ischecked = false;
            $("#tbdRoleList input:checkbox").each(function () {
                if ($(this).is(':checked')) {
                    _ischecked = true;
                    return;
                }
            });
            if (!_ischecked) {
                jAlert("Không có nhóm quyền nào được chọn", null);
                return;
            }
            var _roleIds = "";
            $("#tbdRoleList input:checkbox").each(function () {
                if ($(this).is(':checked')) {
                    _roleIds += $(this).attr('id').substring(2) + ",";
                }
            });
            _roleIds = _roleIds.substring(0, _roleIds.length - 1);
            var _data = { adminId: Popup_SystemAdminChooseRole.vars.m_adminId, roleIds: _roleIds };
            Loading.showProcess();
            $.ajax({
                type: "POST",
                contentType: "application/json",
                dataType: "json",
                data: JSON.encode(_data),
                cache: false,
                url: "/webServices/PermissionWS.asmx/InsertPermissionByRoleList",
                success: function (data) {
                    Loading.closeProcess();
                    if (COMMON.actionSuccess(data.d)) {
                        Popup_SystemAdminChooseRole.close();
                        Pages_SystemAdminInfo.documentReady(Popup_SystemAdminChooseRole.vars.m_adminId);
                    }
                }
            });
        });
    },

    bindData: function (_cur, _ps) {
        Loading.showProcess();
        $.ajax({
            type: "GET",
            url: "/handler/RoleHandler.ashx",
            data: { adminId: Popup_SystemAdminChooseRole.vars.m_adminId, currentPage: _cur, pageSize: _ps, t: 'GetRoleListNotInAdmin' },
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                Popup_SystemAdminChooseRole.proccessData(data, _cur);
                Loading.closeProcess();
            }
        });
    },

    proccessData: function (_data, _cur) {
        $(this.htmlTag.divPopupContainerWrapper).setTemplateURL("/Templates/popup/ChooseRole.htm");
        $(this.htmlTag.divPopupContainerWrapper).processTemplate(_data);
        
        if (_data.length == 0)
            $("#tbdRoleList").html('<tr><td colspan="2" class="last left">Không có nhóm chức năng nào!</td></tr>');
        COMMON.setTemplatePopup(this.htmlTag.divPopupContainer);
        this.processFormButton();
    },

    close: function () {
        if ($(this.htmlTag.divPopupContainerWrapper).length != 0) {
            $(this.htmlTag.divPopupContainerWrapper).remove();
        }
    }
};
