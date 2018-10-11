Popup_UpdateAdmin = {

    htmlTag: {
        divPopupContainerWrapper: '#divPopupUpdateAdminWrapper',
        divPopupContainer: '#divPopupUpdateAdmin',
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
        m_adminId: -1,
        m_typeLoad: 0
    },

    showPopup: function (adminId) {
        Popup_UpdateAdmin.vars.m_adminId = adminId;
        if ($(this.htmlTag.divPopupContainerWrapper).length == 0) {
            $("body").append("<div id='" + this.htmlTag.divPopupContainerWrapper.substring(1) + "'></div>");
            $(this.htmlTag.divPopupContainerWrapper).setTemplateURL("/Templates/popup/UpdateAdmin.htm");
            $(this.htmlTag.divPopupContainerWrapper).processTemplate(null);
            COMMON.setTemplatePopup(this.htmlTag.divPopupContainer);
            this.processFormButton();
            Popup_UpdateAdmin.bindData();
        };
    },

    processFormButton: function () {
        $(this.htmlTag.popupclosebutton, this.htmlTag.divPopupContainerWrapper).live('click', function () {
            Popup_UpdateAdmin.close();
        });
        $(this.htmlTag.popup_cancel, this.htmlTag.divPopupContainerWrapper).live('click', function () {
            Popup_UpdateAdmin.close();
        });
        
        FValidate.validateAll();
    },

    bindData: function () {
        Loading.showProcess();
        if (Popup_UpdateAdmin.vars.m_adminId > 0) {
            $(".titlepopup").html("Sửa tài khoản");
            $.ajax({
                type: "GET",
                url: "/handler/AdminHandler.ashx",
                data: { adminId: Popup_UpdateAdmin.vars.m_adminId, t: 'GetAdminInfo' },
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                cache: false,
                success: function (data) {
                    $(Popup_UpdateAdmin.htmlTag.txtUserName, Popup_UpdateAdmin.htmlTag.divPopupContainer).val(data.UserName);
                    $(Popup_UpdateAdmin.htmlTag.txtFullName, Popup_UpdateAdmin.htmlTag.divPopupContainer).val(data.FullName);
                    $(Popup_UpdateAdmin.htmlTag.txtPhone, Popup_UpdateAdmin.htmlTag.divPopupContainer).val(data.Phone);
                    $(Popup_UpdateAdmin.htmlTag.txtEmail, Popup_UpdateAdmin.htmlTag.divPopupContainer).val(data.Email);
                    $(Popup_UpdateAdmin.htmlTag.txtDescription, Popup_UpdateAdmin.htmlTag.divPopupContainer).val(data.Description);
                    if (eval(data.Sex) == 1) {
                        $(Popup_UpdateAdmin.htmlTag.rdMale, Popup_UpdateAdmin.htmlTag.divPopupContainer).attr('checked', 'checked');
                    }
                    else
                        $(Popup_UpdateAdmin.htmlTag.rdFemale, Popup_UpdateAdmin.htmlTag.divPopupContainer).attr('checked', 'checked');

                    if (eval(data.Status) == 1) {
                        $(Popup_UpdateAdmin.htmlTag.rdActive, Popup_UpdateAdmin.htmlTag.divPopupContainer).attr('checked', 'checked');
                    }
                    else
                        $(Popup_UpdateAdmin.htmlTag.rdDeactive, Popup_UpdateAdmin.htmlTag.divPopupContainer).attr('checked', 'checked');
                    $(Popup_UpdateAdmin.htmlTag.lbCreateDate, Popup_UpdateAdmin.htmlTag.divPopupContainer).html(COMMON.jSonDateToString(data.CreateDate, 1));
                    Loading.closeProcess();
                    $(Popup_UpdateAdmin.htmlTag.txtUserName, Popup_UpdateAdmin.htmlTag.divPopupContainer).attr('disabled', 'disabled');
                    $(Popup_UpdateAdmin.htmlTag.txtFullName, Popup_UpdateAdmin.htmlTag.divPopupContainer).focus();
                }
            });
        }
        else {
            Loading.closeProcess();
            $(Popup_UpdateAdmin.htmlTag.divCreateDate, Popup_UpdateAdmin.htmlTag.divPopupContainer).remove();
            $(Popup_UpdateAdmin.htmlTag.txtUserName, Popup_UpdateAdmin.htmlTag.divPopupContainer).focus();
        }
    },

    defaultSelect: function () {
        $("#id" + Popup_UpdateAdmin.vars.m_adminId + " select option[value='']").attr('selected', 'selected');
    },

    close: function () {
        if ($(Popup_UpdateAdmin.htmlTag.divPopupContainerWrapper).length != 0) {
            $(Popup_UpdateAdmin.htmlTag.divPopupContainerWrapper).remove();
            Popup_UpdateAdmin.defaultSelect();
        }
    },

    UpdateAdmin: function () {
        if (!FValidate.isValidateAll()) return;
        var _userName = $.trim($(Popup_UpdateAdmin.htmlTag.txtUserName, Popup_UpdateAdmin.htmlTag.divPopupContainer).val());
        var _password = $.trim($(Popup_UpdateAdmin.htmlTag.txtPassword, Popup_UpdateAdmin.htmlTag.divPopupContainer).val());
        var _passwordReply = $.trim($("#txtPasswordReply", Popup_UpdateAdmin.htmlTag.divPopupContainer).val());
        var _fullName = $.trim($(Popup_UpdateAdmin.htmlTag.txtFullName, Popup_UpdateAdmin.htmlTag.divPopupContainer).val());
        var _phone = $.trim($(Popup_UpdateAdmin.htmlTag.txtPhone, Popup_UpdateAdmin.htmlTag.divPopupContainer).val());
        var _email = $.trim($(Popup_UpdateAdmin.htmlTag.txtEmail, Popup_UpdateAdmin.htmlTag.divPopupContainer).val());
        var _description = $.trim($(Popup_UpdateAdmin.htmlTag.txtDescription, Popup_UpdateAdmin.htmlTag.divPopupContainer).val());
        var _status = 0;
        if ($(Popup_UpdateAdmin.htmlTag.rdActive, Popup_UpdateAdmin.htmlTag.divPopupContainer).is(":checked"))
            _status = 1;
        var _sex = 0;
        if ($(Popup_UpdateAdmin.htmlTag.rdMale, Popup_UpdateAdmin.htmlTag.divPopupContainer).is(":checked"))
            _sex = 1;
        if (Popup_UpdateAdmin.vars.m_adminId > 0) {
            //cập nhật
            Loading.showProcess();
            var _data = { adminId: Popup_UpdateAdmin.vars.m_adminId, fullName: _fullName, email: _email, phone: _phone, sex: _sex, description: _description, status: _status };
            $.ajax({
                type: "POST",
                contentType: "application/json;charset:utf-8",
                url: "/webServices/AdminWS.asmx/UpdateAdmin",
                data: JSON.encode(_data),
                dataType: "json",
                cache: false,
                success: function (data) {
                    Loading.closeProcess();
                    if (COMMON.actionSuccess(data.d)) {
                        if (Popup_UpdateAdmin.vars.m_typeLoad == 0) {
                            Pages_SystemAdmin.bindData();
                        }
                        else {
                            if (Popup_UpdateAdmin.vars.m_typeLoad == 1) {
                                Pages_SystemAdminInfo.m_adminId = Popup_UpdateAdmin.vars.m_adminId;
                                Pages_SystemAdminInfo.bindAdminInfo();
                            }
                            else {
                                Pages_SystemMyProfile.vars.adminId = Popup_UpdateAdmin.vars.m_adminId;
                                Pages_SystemMyProfile.bindAdminInfo();
                            }
                        }
                        Popup_UpdateAdmin.close();
                    }
                }
            });
        }
        else {
            if (_password != _passwordReply) {
                jAlert('Mật khẩu không khớp nhau', 'Thông báo');
                return;
            }
            //Thêm mới
            Loading.showProcess();
            var _data = {
                userName: _userName,
                password: _password,
                fullName: _fullName,
                email: _email,
                phone: _phone,
                sex: _sex,
                description: _description,
                status: _status,
                roleId: 1,
                typeAdmin: 1
            }
            $.ajax({
                type: "POST",
                contentType: "application/json;charset:utf-8",
                url: "/webServices/AdminWS.asmx/InsertAdmin",
                data: JSON.encode(_data),
                dataType: "json",
                cache: false,
                success: function (data) {
                    Loading.closeProcess();
                    if (COMMON.actionSuccess(data.d)) {
                        if (data.d == -2) {
                            jAlert("Tên đăng nhập này đã được sử dụng", null, function () {
                                $(Popup_UpdateAdmin.htmlTag.txtUserName, Popup_UpdateAdmin.htmlTag.divPopupContainer).focus();
                            });
                        }
                        else {
                            Pages_SystemAdmin.bindData();
                            Popup_UpdateAdmin.close();
                        }
                    }
                }
            });
        }
    }
};
