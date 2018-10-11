//-----------------------------------------------------------
// Author:      mauthanh.tran
// Create Date: 14/11/2011
// Description: Popup mẫu
//-----------------------------------------------------------

Popup_SystemFunctionChooseRole = {
    htmlTag: {
        divPopupContainerWrapper: '#divPopupChooseRoleOfFunctionWrapper',
        divPopupContainer: '#divPopupChooseRoleOfFunction',
        popupCloseButton: '.popupclosebutton',
        popup_cancel: '#popup_cancel',
        popup_save: "#popup_save",
        checkAllRole: ".checkallRole",
        role2: "#Role2"
    },

    vars: {
        m_objectId: 0
    },

    showPopup: function (objectId) {
        this.vars.m_objectId = objectId;
        if ($(this.htmlTag.divPopupContainerWrapper).length == 0) {
            $("body").append("<div id='" + this.htmlTag.divPopupContainerWrapper.substring(1) + "'></div>");
            this.bindData();
        };
    },

    processFormButton: function() {
        $(this.htmlTag.popupCloseButton, this.htmlTag.divPopupContainerWrapper).click(function () {
            Popup_SystemFunctionChooseRole.close();
        });

        $(this.htmlTag.popup_cancel, this.htmlTag.divPopupContainerWrapper).click(function () {
            Popup_SystemFunctionChooseRole.close();
        });
    
        $(this.htmlTag.checkAllRole, this.htmlTag.divPopupContainerWrapper).click(function () {
            $(Popup_SystemFunctionChooseRole.htmlTag.divPopupContainer + " #tbdRoleList input:checkbox").attr('checked', $(this).is(':checked'));
            $(Popup_SystemFunctionChooseRole.htmlTag.divPopupContainer + " #tbdRoleList input:checkbox").each(function () {
                if ($(this).is(':checked')) {
                    $(this).parent().parent().addClass('selected ');
                } else {
                    $(this).parent().parent().removeClass('selected ');
                }
            });
        });
    
        $(this.htmlTag.role2, this.htmlTag.divPopupContainerWrapper).click(function () {
            if ($(this).is(':checked')) {
                $(this).parent().parent().addClass('selected ');
            } else {
                $(this).parent().parent().removeClass('selected ');
            }
        });

        $(this.htmlTag.popup_save, this.htmlTag.divPopupContainerWrapper).click(function () {
            var ischecked = false;
            $(Popup_SystemFunctionChooseRole.htmlTag.divPopupContainer + " #tbdRoleList input:checkbox").each(function () {
                if ($(this).is(':checked')) {
                    ischecked = true;
                    return false;
                }
            });
            if (!ischecked)
                jAlert("Không có nhóm chức năng nào được chọn", null);
            else {
                var rolelist = "";
                $(Popup_SystemFunctionChooseRole.htmlTag.divPopupContainer + " #tbdRoleList input:checkbox").each(function () {
                    if ($(this).is(':checked')) {
                        rolelist += $(this).attr('id').substring(4) + ",";
                    }
                });
                rolelist = rolelist.substring(0, rolelist.length - 1);
                var _data = { functionId: Popup_SystemFunctionChooseRole.vars.m_objectId, roleIds: rolelist };
                Loading.showProcess();
                $.ajax({
                    type: "POST",
                    contentType: "application/json",
                    dataType: "json",
                    data: JSON.encode(_data),
                    cache: false,
                    url: "/webServices/RoleFunctionWS.asmx/InsertListRoleFunction",
                    success: function (data) {
                        if (COMMON.actionSuccess(data.d)) {
                            Pages_SystemFunctionInfo.bindRoleList();
                            Popup_SystemFunctionChooseRole.close();
                        }
                        Loading.closeProcess();
                    }
                });
            }
        });
    },

    show: function (data) {
        $(this.htmlTag.divPopupContainerWrapper).setTemplateURL("/Templates/popup/FunctionChooseRole.htm");
        $(this.htmlTag.divPopupContainerWrapper).processTemplate(data);
        COMMON.setTemplatePopup(this.htmlTag.divPopupContainer);
        this.processFormButton();
        if (data.length == 0) {
            $(this.htmlTag.divPopupContainerWrapper + " #tbdRoleList").html('<tr><td colspan="2" class="last left">Không tìm thấy nhóm chức năng nào!</td></tr>');
        }
    },

    bindData: function () {
        if (this.vars.m_objectId > 0) {
            $.ajax({
                type: "GET",
                url: "/handler/RoleHandler.ashx",
                data: { t: 'GetListRoleNotInFunction', functionId: this.vars.m_objectId },
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                cache: false,
                success: function (data) {
                    Popup_SystemFunctionChooseRole.show(data);
                }
            });
        }
    },

    close: function () {
        if ($(this.htmlTag.divPopupContainerWrapper).length != 0) {
            $(this.htmlTag.divPopupContainerWrapper).remove();
        }
    }
};
