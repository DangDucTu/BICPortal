Popup_SystemChooseAdmin = {

    htmlTag: {
        divPopupContainerWrapper: '#divChooseAdminWrapper',
        divPopupContainer: '#divPopupChooseAdmin',
        popupCloseButton: '.popupclosebutton',
        popup_cancel: '#popup_cancel',
        popup_save: '#popup_save',

        txtUserName: '#txtUserName',
        divPaging: '#divPagingListAdmin',
        btnSearchAdmin: '#btnSearchAdmin',
        checkallAdmin: '.checkallAdmin'
    },

    vars: {
        m_roleId: -1,
        m_userName: ""
    },

    showPopup: function (roleId) {
        this.vars.m_roleId = roleId;
        if ($(this.htmlTag.divPopupContainerWrapper).length == 0) {
            $("body").append("<div id='" + this.htmlTag.divPopupContainerWrapper.substring(1) + "'></div>");
            $(this.htmlTag.divPopupContainerWrapper).setTemplateURL("/Templates/popup/ChooseAdmin.htm");
            $(this.htmlTag.divPopupContainerWrapper).processTemplate(null);
            COMMON.setTemplatePopup(this.htmlTag.divPopupContainer);
            this.vars.m_userName = "";
            this.processFormButton();
            this.bindData();
        };
    },

    processFormButton: function () {
        $(this.htmlTag.checkallAdmin, this.htmlTag.divPopupContainerWrapper).click(function () {
            $(Popup_SystemChooseAdmin.htmlTag.divPopupContainer + " #tbdListAdmin input:checkbox").attr('checked', $(this).is(':checked'));
            $(Popup_SystemChooseAdmin.htmlTag.divPopupContainer + " #tbdListAdmin input:checkbox").each(function () {
                if ($(this).is(':checked')) {
                    $(this).parent().parent().addClass('selected ');
                } else {
                    $(this).parent().parent().removeClass('selected ');
                }
            });
        });

        $("#CAS1").click(function () {
            if ($(this).is(':checked')) {
                $(this).parent().parent().addClass('selected ');
            } else {
                $(this).parent().parent().removeClass('selected ');
            }
        });

        $(this.htmlTag.popup_save, this.htmlTag.divPopupContainerWrapper).click(function () {
            var ischecked = false;
            $(Popup_SystemChooseAdmin.htmlTag.divPopupContainer + " #tbdListAdmin input:checkbox").each(function () {
                if ($(this).is(':checked')) {
                    ischecked = true;
                    return false;
                }
            });
            if (!ischecked) {
                jAlert("Không có tài khoản nào được chọn", null);
            }
            else {
                var listAdmin = "";
                $(Popup_SystemChooseAdmin.htmlTag.divPopupContainer + " #tbdListAdmin input:checkbox").each(function () {
                    if ($(this).is(':checked')) {
                        listAdmin += $(this).attr('id').substring(3) + ",";
                    }
                });
                listAdmin = listAdmin.substring(0, listAdmin.length - 1);
                var _data = { roleId: Popup_SystemChooseAdmin.vars.m_roleId, listAdmin: listAdmin };
                Loading.showProcess();
                $.ajax({
                    type: "POST",
                    contentType: "application/json",
                    dataType: "json",
                    data: JSON.encode(_data),
                    cache: false,
                    url: "/webServices/AdminWS.asmx/AddPermisionForListAdmin",
                    success: function (data) {
                        if (COMMON.actionSuccess(data.d)) {
                            Pages_SystemRoleInfo.bindAccountList();
                        }
                        Loading.closeProcess();
                    }
                });
                Popup_SystemChooseAdmin.close();
            }
        });

        $(this.htmlTag.popupCloseButton, this.htmlTag.divPopupContainerWrapper).click(function () {
            Popup_SystemChooseAdmin.close();
        });

        $(this.htmlTag.popup_cancel, this.htmlTag.divPopupContainerWrapper).click(function () {
            Popup_SystemChooseAdmin.close();
        });

        $(this.htmlTag.btnSearchAdmin, this.htmlTag.divPopupContainerWrapper).live('mouseover', function () {
            $(this).addClass("ui-state-hover");
        });

        $(this.htmlTag.btnSearchAdmin, this.htmlTag.divPopupContainerWrapper).live('mouseout', function () {
            $(this).removeClass("ui-state-hover");
        });

        $(this.htmlTag.btnSearchAdmin, this.htmlTag.divPopupContainerWrapper).click(function () {
            Popup_SystemChooseAdmin.vars.m_userName = $(Popup_SystemChooseAdmin.htmlTag.txtUserName, Popup_SystemChooseAdmin.htmlTag.divPopupContainerWrapper).val();
            Popup_SystemChooseAdmin.bindData();
        });
    },

    bindData: function () {
        if (this.vars.m_roleId > 0) {
            Loading.showProcess();
            $.ajax({
                type: "GET",
                url: "/handler/AdminHandler.ashx",
                data: { t: 'GetAdminListNotInRole', roleId: this.vars.m_roleId, userName: COMMON.removeHTMLTags(this.vars.m_userName) },
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                cache: false,
                success: function (data) {
                    Popup_SystemChooseAdmin.proccessData(data);
                    Loading.closeProcess();
                }
            });
        }
    },

    proccessData: function (_data) {
        var strHtml = '';
        var m_data = _data;
        if (m_data.length > 0) {
            for (var i = 0; i < m_data.length; i++) {
                strHtml += ' <tr>'
                 + '    <td class="selected">'
                 + '        <input type="checkbox" class="cbRecord" id="CAS' + m_data[i].AdminId + '">'
                 + '    </td>'
                 + '    <td class="title column100l">'
                 + m_data[i].Name
                 + '    </td>'
                 + '    <td class="last left">'
                 + m_data[i].FullName
                 + '    </td>'
                 + ' </tr>';
            }
        }
        else {
            strHtml += ' <tr>'
                + '    <td colspan="6" class="last" style="text-align:left;">'
                + '        Không tìm thấy tài khoản nào!'
                + '    </td>'
                + ' </tr>';
        }
        $(this.htmlTag.divPopupContainer + " #tbdListAdmin").html(strHtml);

    },

    close: function () {
        if ($(this.htmlTag.divPopupContainerWrapper).length != 0) {
            $(this.htmlTag.divPopupContainerWrapper).remove();
        }
    }
};
