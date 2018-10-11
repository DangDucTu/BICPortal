Popup_UpdateMyProfile = {

    htmlTag: {
        divPopupContainerWrapper: '#divPopupUpdateMyProfileWrapper',
        divPopupContainer: '#divPopupUpdateMyProfile',
        popupclosebutton: '.popupclosebutton',
        popup_cancel: '#popup_cancel',
        popup_save: '#popup_save',
        txtUserName: '#txtUserName',
        txtPassword: '#txtPassword',
        txtFullName: '#txtFullName',
        txtPhone: '#txtPhone',
        txtEmail: '#txtEmail',
        txtDescription: '#txtDescription',
        rdMale: '#rdMale',
        rdFemale: '#rdFemale',
        rdActive: '#rdActive',
        rdDeactive: '#rdDeactive',
        lbCreateDate: '#lbCreateDate',
        divCreateDate: '#divCreateDate'
    },

    vars: {
        m_adminId: -1
    },

    showPopup: function (adminId) {
        Popup_UpdateMyProfile.vars.m_adminId = adminId;
        if ($(this.htmlTag.divPopupContainerWrapper).length == 0) {
            $("body").append("<div id='" + this.htmlTag.divPopupContainerWrapper.substring(1) + "'></div>");
            $(this.htmlTag.divPopupContainerWrapper).setTemplateURL("/Templates/popup/system/UpdateMyProfile.htm");
            $(this.htmlTag.divPopupContainerWrapper).processTemplate(null);
            COMMON.setTemplatePopup(this.htmlTag.divPopupContainer);
            this.processFormButton();
            Popup_UpdateMyProfile.bindData();
        };
    },

    processFormButton: function () {
        $(this.htmlTag.popupclosebutton, this.htmlTag.divPopupContainerWrapper).live('click', function () {
            Popup_UpdateMyProfile.close();
        });
        $(this.htmlTag.popup_cancel, this.htmlTag.divPopupContainerWrapper).live('click', function () {
            Popup_UpdateMyProfile.close();
        });

        $(this.htmlTag.popup_save, this.htmlTag.divPopupContainerWrapper).live('click', function () {
            Popup_UpdateMyProfile.changeMyProfile();
        });
        FValidate.validateAll();
    },

    bindData: function () {
        Loading.showProcess();
        $(".titlepopup").html("Sửa tài khoản");
        $.ajax({
            type: "GET",
            url: "/handler/AdminHandler.ashx",
            data: { adminId: Popup_UpdateMyProfile.vars.m_adminId, t: 'GetAdminInfo' },
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                $(Popup_UpdateMyProfile.htmlTag.txtUserName, Popup_UpdateMyProfile.htmlTag.divPopupContainer).val(data.UserName);
                $(Popup_UpdateMyProfile.htmlTag.txtFullName, Popup_UpdateMyProfile.htmlTag.divPopupContainer).val(data.FullName);
                $(Popup_UpdateMyProfile.htmlTag.txtPhone, Popup_UpdateMyProfile.htmlTag.divPopupContainer).val(data.Phone);
                $(Popup_UpdateMyProfile.htmlTag.txtEmail, Popup_UpdateMyProfile.htmlTag.divPopupContainer).val(data.Email);
                $(Popup_UpdateMyProfile.htmlTag.txtDescription, Popup_UpdateMyProfile.htmlTag.divPopupContainer).val(data.Description);
                if (eval(data.Sex) == 1) {
                    $(Popup_UpdateMyProfile.htmlTag.rdMale, Popup_UpdateMyProfile.htmlTag.divPopupContainer).attr('checked', 'checked');
                }
                else
                    $(Popup_UpdateMyProfile.htmlTag.rdFemale, Popup_UpdateMyProfile.htmlTag.divPopupContainer).attr('checked', 'checked');

                if (eval(data.Status) == 1) {
                    $(Popup_UpdateMyProfile.htmlTag.rdActive, Popup_UpdateMyProfile.htmlTag.divPopupContainer).attr('checked', 'checked');
                }
                else
                    $(Popup_UpdateMyProfile.htmlTag.rdDeactive, Popup_UpdateMyProfile.htmlTag.divPopupContainer).attr('checked', 'checked');
                $(Popup_UpdateMyProfile.htmlTag.lbCreateDate, Popup_UpdateMyProfile.htmlTag.divPopupContainer).html(COMMON.jSonDateToString(data.CreateDate, 1));
                Loading.closeProcess();
                $(Popup_UpdateMyProfile.htmlTag.txtUserName, Popup_UpdateMyProfile.htmlTag.divPopupContainer).attr('disabled', 'disabled');
                $(Popup_UpdateMyProfile.htmlTag.txtFullName, Popup_UpdateMyProfile.htmlTag.divPopupContainer).focus();
            }
        });
    },

    close: function () {
        if ($(Popup_UpdateMyProfile.htmlTag.divPopupContainerWrapper).length != 0) {
            $(Popup_UpdateMyProfile.htmlTag.divPopupContainerWrapper).remove();
        }
    },

    changeMyProfile: function () {
        if (!FValidate.isValidateAll()) return;
        var _fullName = $.trim($(Popup_UpdateMyProfile.htmlTag.txtFullName, Popup_UpdateMyProfile.htmlTag.divPopupContainer).val());
        var _phone = $.trim($(Popup_UpdateMyProfile.htmlTag.txtPhone, Popup_UpdateMyProfile.htmlTag.divPopupContainer).val());
        var _email = $.trim($(Popup_UpdateMyProfile.htmlTag.txtEmail, Popup_UpdateMyProfile.htmlTag.divPopupContainer).val());
        var _description = $.trim($(Popup_UpdateMyProfile.htmlTag.txtDescription, Popup_UpdateMyProfile.htmlTag.divPopupContainer).val());
        var _status = 0;
        if ($(Popup_UpdateMyProfile.htmlTag.rdActive, Popup_UpdateMyProfile.htmlTag.divPopupContainer).is(":checked"))
            _status = 1;
        var _sex = 0;
        if ($(Popup_UpdateMyProfile.htmlTag.rdMale, Popup_UpdateMyProfile.htmlTag.divPopupContainer).is(":checked"))
            _sex = 1;
        //cập nhật
        Loading.showProcess();
        var _data = {fullName: _fullName, email: _email, phone: _phone, sex: _sex, description: _description, status: _status };
        $.ajax({
            type: "POST",
            contentType: "application/json;charset:utf-8",
            url: "/webServices/AdminWS.asmx/ChangeMyProfile",
            data: JSON.encode(_data),
            dataType: "json",
            cache: false,
            success: function (data) {
                Loading.closeProcess();
                if (COMMON.actionSuccess(data.d)) {
                    Pages_SystemMyProfile.vars.adminId = Popup_UpdateMyProfile.vars.m_adminId;
                    Pages_SystemMyProfile.bindAdminInfo();
                    Popup_UpdateMyProfile.close();
                }
            }
        });
    }
};
