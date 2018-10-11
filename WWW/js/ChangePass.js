/// <reference path="../../js/framework/jquery-1.4.1-vsdoc.js" />
/// <reference path="../../js/framework/jquery-1.7.2.min.js" />
/// <reference path="../../js/framework/jquery.jtemplates.js" />
/// <reference path="Pages_Search_Global.js" />

pages_Admin = {
    htmlTag: {
        
        divPopupContainerWrapper: '#divPopupSampleWrapper', //Id này sẽ tự sinh --> chứa Popup
        divPopupContainer: '#divPopup_Sample',              //Id của template Popup
        popupCloseButton: '.popupclosebutton',
        popup_cancel: '#popup_cancel',
        popup_save: '#popup_save',
        txtNameLogin: '#txtNameLogin',
        txtFullName: '#txtFullName',
        txtDescription: '#txtDescription',
        txtPhone: '#txtPhone',
        txtEmail: '#txtEmail',
        txtDescription: '#txtDescription',
        txtPassWord: '#txtPassWord'

    },
    variable: {
        objId: -1,
        mType: 1
    },
   
    clearForm: function () {
        $(pages_Admin.htmlTag.txtName, pages_Admin.htmlTag.divPopupContainer).val('');
        $(pages_Admin.htmlTag.txtSummary, pages_Admin.htmlTag.divPopupContainer).val('');
        $(pages_Admin.htmlTag.txtPercent, pages_Admin.htmlTag.divPopupContainer).val('');
        $(pages_Admin.htmlTag.txtStartDate, pages_Admin.htmlTag.divPopupContainer).val('');
        $(pages_Admin.htmlTag.txtEndDate, pages_Admin.htmlTag.divPopupContainer).val('');

        $(this.htmlTag.rdActive, this.htmlTag.divEdit).attr('checked', 'checked');
    },

    changePass: function () {
        if (!FValidate.isValidateAll()) return;
        var m_passOld = $("#txtPassWordOld", pages_Admin.htmlTag.divPopupContainer).val();
        var m_passNew = $("#txtPassWord", pages_Admin.htmlTag.divPopupContainer).val();        

        var _data = {
            adminId: pages_Admin.variable.objId,
            passOld: m_passOld,
            passNew: m_passNew,
            type: pages_Admin.variable.mType
        };
        Loading.show();
        $.ajax({
            type: "POST",
            contentType: "application/json;charset:utf-8",
            url: "/webServices/AdminWS.asmx/AdminChangePass",
            data: JSON.encode(_data),
            dataType: "json",
            cache: false,
            success: function (data) {
                Loading.close();
                if (data.d > 0) {
                    pages_Admin.bindData(1);
                    jAlert('Change password success!');
                    pages_Admin.close();
                    return;
                }
                if (data.d == -1) {
                    jAlert('Old password incorrect', null, function () {
                        $("#txtPassWordOld", pages_Admin.htmlTag.divPopupContainer).focus();
                    });
                    return;
                }
                if (data.d == -1000) {
                    jAlert('You are not login');
                    return;
                }

                if (data.d == -100) {
                    jAlert('An error occurred in processing');
                    return;
                }
            },
            error: function (parameters) {
                Loading.close();
                jAlert('An error occurred in processing');
            }
        });
    },

    save: function () {
        var m_name = $(pages_Admin.htmlTag.txtNameLogin, pages_Admin.htmlTag.divPopupContainer).val();
        var m_fullName = $(pages_Admin.htmlTag.txtFullName, pages_Admin.htmlTag.divPopupContainer).val();
        var m_phone = $(pages_Admin.htmlTag.txtPhone, pages_Admin.htmlTag.divPopupContainer).val();
        var m_email = $(pages_Admin.htmlTag.txtEmail, pages_Admin.htmlTag.divPopupContainer).val();
        var m_des = $(pages_Admin.htmlTag.txtDescription, pages_Admin.htmlTag.divPopupContainer).val();

        if (m_name == '' || m_name.length == 0 || typeof (m_name) == 'undefined') {
            jAlert('Chưa nhập tên đăng nhập', 'Thông báo', function () {
                $(pages_Admin.htmlTag.txtNameLogin, pages_Admin.htmlTag.divPopupContainer).focus();
            });
            return;
        }

        if (pages_Admin.variable.objId == -1) {
            var m_password = $(pages_Admin.htmlTag.txtPassWord, pages_Admin.htmlTag.divPopupContainer).val();
            if (m_password == '' || m_password.length == 0 || typeof (m_password) == 'undefined') {
                jAlert('Chưa nhập mật khẩu', 'Thông báo', function () {
                    $(pages_Admin.htmlTag.txtPassWord, pages_Admin.htmlTag.divPopupContainer).focus();
                });
                return;
            }
        }
        else {
            var m_password = -1;
        }

        var mStatus = -1;
        if ($(pages_Admin.htmlTag.rdActive, this.htmlTag.divPopupContainer).attr('checked'))
            mStatus = 1;
        if ($(pages_Admin.htmlTag.rdDeactive, this.htmlTag.divPopupContainer).attr('checked'))
            mStatus = 0;

        var _data = {
            adminId: pages_Admin.variable.objId,
            userName: m_name,
            password: m_password,
            status: mStatus,
            fullName: m_fullName,
            email: m_email,
            phone: m_phone,
            des: m_des
        };
        Loading.show();
        $.ajax({
            type: "POST",
            contentType: "application/json;charset:utf-8",
            url: "/webServices/AdminWS.asmx/AdminEdit",
            data: JSON.encode(_data),
            dataType: "json",
            cache: false,
            success: function (data) {
                Loading.close();
                if (data.d > 0) {
                    pages_Admin.bindData(1);
                    pages_Admin.close();
                    return;
                }
                if (data.d == -2) {
                    jAlert('Đã tồn tại tài khoản này trên hệ thống', 'Thông báo...', function () {
                        $(pages_Admin.htmlTag.txtName, pages_Admin.htmlTag.divPopupContainer).focus();
                    });
                    return;
                }
                if (data.d == -1000) {
                    jAlert('Bạn chưa đăng nhập', 'Thông báo...');
                    return;
                }

                if (data.d == -100) {
                    jAlert('Đã xảy ra lỗi trong quá trình xử lý', 'Thông báo...');
                    return;
                }
            },
            error: function (parameters) {
                Loading.close();
                jAlert('Đã xảy ra lỗi trong quá trình xử lý', 'Thông báo...');
            }
        });
    },

    changeStatus: function (m_id, status) {
        //        var lst_ids = "";
        //        if (m_id == -1)
        //            lst_ids = this.getIds();
        //        else {
        //            lst_ids = m_id;
        //        }
        //        if (lst_ids == "") {
        //            jAlert("Bạn chưa chọn bản ghi nào!", "Thông báo...");
        //            return false;
        //        }
        var _data = {
            id: m_id,
            status: status
        };
        Loading.show();
        $.ajax({
            type: "POST",
            url: "/webServices/AdminWS.asmx/AdminUpdateStatus",
            data: JSON.encode(_data),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                Loading.close();
                if (data.d > 0) {
                    pages_Admin.bindData(pages_Admin.pagging.currentPage);
                }
            }
        });
    },

    deleteAction: function (m_id) {
        jConfirm('Chắc chắn xóa người quản trị này không?', 'Thông báo...', function (parameters) {
            if (parameters) {
                var _data = { id: m_id };
                Loading.show();
                $.ajax({
                    type: "POST",
                    contentType: "application/json;charset:utf-8",
                    url: "/webServices/AdminWS.asmx/AdminDelete",
                    data: JSON.encode(_data),
                    dataType: "json",
                    cache: false,
                    success: function (data) {
                        Loading.close();
                        if (data.d > 0) {
                            pages_Admin.bindData(1);
                            return;
                        }
                        if (data.d == -1000) {
                            jAlert('Bạn chưa đăng nhập', 'Thông báo...');
                            return;
                        }

                        if (data.d == -100) {
                            jAlert('Đã xảy ra lỗi trong quá trình xử lý', 'Thông báo...');
                            return;
                        }
                    },
                    error: function (parameters) {
                        Loading.close();
                        jAlert('Đã xảy ra lỗi trong quá trình xử lý', 'Thông báo...');
                    }
                });
            }
        });
    },

    showPopupChangePass: function (id) {
        if ($(pages_Admin.htmlTag.divPopupContainerWrapper).length == 0) {
            pages_Admin.variable.mType = id;
            $("body").append("<div id='" + pages_Admin.htmlTag.divPopupContainerWrapper.substring(1) + "'></div>");
            $(pages_Admin.htmlTag.divPopupContainerWrapper).setTemplateURL("/templates/popup/popupChangePass.htm?t=1");
            $(pages_Admin.htmlTag.divPopupContainerWrapper).processTemplate(null);
            $("#txtPassWordOld", pages_Admin.htmlTag.divPopupContainer).focus();

            COMMON.setTemplatePopup(pages_Admin.htmlTag.divPopupContainer);
            pages_Admin.processFormButtonPopUp();
        };
    },

    showPopupUpdate: function (id) {
        if (id > 0) {
            this.variable.objId = id;
        }
        else {
            this.variable.objId = -1;
            $("#divPassword", pages_Admin.htmlTag.divPopupContainer).show();
            $(pages_Admin.htmlTag.txtNameLogin, pages_Admin.htmlTag.divPopupContainer).attr('disabled', '');
            $(pages_Admin.htmlTag.txtNameLogin, pages_Admin.htmlTag.divPopupContainer).focus();
        }
        $.ajax({
            type: "GET",
            url: "/handler/AdminHandler.ashx",            
            data: { t: "AdminGetInfo", id: id },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                if (typeof (data) == "undefined")
                    data = null;
                if ($(pages_Admin.htmlTag.divPopupContainerWrapper).length == 0) {
                    $("body").append("<div id='" + pages_Admin.htmlTag.divPopupContainerWrapper.substring(1) + "'></div>");
                    $(pages_Admin.htmlTag.divPopupContainerWrapper).setTemplateURL("/templates/popup/popupAdmin.htm?t=1");
                    $(pages_Admin.htmlTag.divPopupContainerWrapper).processTemplate(null);
                    if (pages_Admin.variable.objId == -1) {
                        $("#divPassword", pages_Admin.htmlTag.divPopupContainer).show();
                    }
                    else {
                        $("#divPassword", pages_Admin.htmlTag.divPopupContainer).hide();
                    }
                    COMMON.setTemplatePopup(pages_Admin.htmlTag.divPopupContainer);
                    pages_Admin.bindInfoPopup(data);
                    pages_Admin.processFormButtonPopUp();
                };

            }
        });
    },

    close: function () {
        if ($(this.htmlTag.divPopupContainerWrapper).length != 0) {
            $(this.htmlTag.divPopupContainerWrapper).remove();
        }
    },

    bindInfoPopup: function (info) {
        if (info != null) {
            $("#spTitlepopImageCollection").html("Edit Info Account");
            $(pages_Admin.htmlTag.txtFullName, pages_Admin.htmlTag.divPopupContainer).focus();
            $(pages_Admin.htmlTag.txtNameLogin, pages_Admin.htmlTag.divPopupContainer).attr('disabled', 'disabled');
            $(pages_Admin.htmlTag.txtNameLogin, pages_Admin.htmlTag.divPopupContainer).val(info.Name);
            $(pages_Admin.htmlTag.txtFullName, pages_Admin.htmlTag.divPopupContainer).val(info.FullName);                                    

            if (eval(info.Status) == 1) {
                $(pages_Admin.htmlTag.rdActive, pages_Admin.htmlTag.divPopupContainer).attr('checked', 'checked');
            }
            else {
                $(pages_Admin.htmlTag.rdDeactive, pages_Admin.htmlTag.divPopupContainer).attr('checked', 'checked');
            }
        }
        else {
            this.variable.objId = -1;
            $(pages_Admin.htmlTag.txtNameLogin, pages_Admin.htmlTag.divPopupContainer).removeAttr('disabled');
            $(pages_Admin.htmlTag.txtNameLogin, pages_Admin.htmlTag.divPopupContainer).focus();
            $("#spTitlepopImageCollection").html("Add New Account");
        }
    },

    processCheckAll: function () {
        $(this.htmlTag.checkAll).change(function () {
            $(pages_Admin.htmlTag.checkItem).attr('checked', $(this).is(':checked'));
            $(pages_Admin.htmlTag.checkItem).each(function () {
                if ($(this).is(':checked')) {
                    $(this).parent().parent().addClass('selected ');

                } else {
                    $(this).parent().parent().removeClass('selected ');
                }
            });
        });
    },

    processCheckItem: function () {
        $(pages_Admin.htmlTag.checkItem).change(function () {
            if ($(this).is(':checked')) {
                $(this).parent().parent().addClass('selected ');

            } else {
                $(this).parent().parent().removeClass('selected ');
            }
        });
    },

    setActionEdit: function (isEdit) {
        if (isEdit) {
            $(this.htmlTag.divInfo).setTemplateURL("/templates/shopAdvInfo.htm?t=1");
            $(this.htmlTag.divInfo).processTemplate(null);
            $(this.htmlTag.divSearch).hide();
            $(this.htmlTag.divList).hide();
            $(this.htmlTag.divEdit).show();
        }
        else {
            $(this.htmlTag.divEdit).hide();
            $(this.htmlTag.divSearch).show();
            $(this.htmlTag.divList).show();
        }
    },

    getIds: function () {
        var ids = "";
        $("input[type='checkbox']:checked", this.htmlTag.tbList).each(function () {
            ids += "," + $(this).attr("id");
        });
        if (ids.length > 0)
            ids = ids.substring(1);
        return ids;
    },

    functionOnItem: function (f, objId) {
        pages_Admin.variable.objId = objId;
        switch (f) {
            case 1: // chỉnh sửa                
                pages_Admin.showPopupUpdate(objId);
                break;
            case 2: // Khóa
                pages_Admin.changeStatus(objId, 0);
                break;
            case 3: // Kích hoạt
                pages_Admin.changeStatus(objId, 1);
                break;
            case 4: // Xóa
                pages_Admin.deleteAction(objId);
                break;
            case 5: //Đổi mật khẩu            
                pages_Admin.showPopupChangePass(objId);
                $("#txtPassWordOld", pages_Admin.htmlTag.divPopupContainer).focus();
                break;
        }
    },

    processFormButton: function () {

        $(this.htmlTag.selPagesize).change(function () {
            pages_Admin.bindData(1);
        });


        $(this.htmlTag.btnCancel, this.htmlTag.divEdit).click(function () {
            pages_Admin.setActionEdit(false);
        });

        $(this.htmlTag.btnSave, this.htmlTag.divEdit).live('click', function () {
            pages_Admin.save();
        });


        $(pages_Admin.htmlTag.btnAdd).click(function () {
            pages_Admin.variable.objId = -1;
            pages_Admin.showPopupUpdate(-1);
            pages_Admin.clearForm();
        });

        $(pages_Admin.htmlTag.btnDelete).click(function () {
            pages_Admin.deleteMulti();
        });

        this.setActionEdit(false);
    },

    processFormButtonPopUp: function () {
        var ownerThis = this;
        $(this.htmlTag.popupCloseButton).click(function (parameters) {
            ownerThis.close();
        });
        $(this.htmlTag.popup_cancel, this.htmlTag.divPopupContainerWrapper).click(function () {
            ownerThis.close();
        });
    }
}