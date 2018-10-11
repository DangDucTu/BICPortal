//-----------------------------------------------------------
// Author:      mauthanh.tran
// Create Date: 14/11/2011
// Description: Hiển thị popup chọn tài khoản cho nhóm chức năng
//-----------------------------------------------------------


Popup_SystemFunctionUpdate = {
    htmlTag: {
        divPopupContainerWrapper: '#divPopupUpdateFunctionWrapper',
        divPopupContainer: '#divPopupUpdateFunction',
        popupCloseButton: '.popupclosebutton',
        popup_cancel: '#popup_cancel',
        popup_save: '#popup_save'
    },

    vars: {
        m_objectId: 0,
        m_typeLoad: 0,
        m_parentId: 0
    },

    showPopup: function (objectId, typeLoad, parentId) {
        this.vars.m_objectId = objectId;
        this.vars.m_typeLoad = typeLoad;
        this.vars.m_parentId = parentId;
        if ($(this.htmlTag.divPopupContainerWrapper).length == 0) {
            $("body").append("<div id='" + this.htmlTag.divPopupContainerWrapper.substring(1) + "'></div>");
            $(this.htmlTag.divPopupContainerWrapper).setTemplateURL("/Templates/popup/FunctionUpdate.htm");
            $(this.htmlTag.divPopupContainerWrapper).processTemplate(null);
            COMMON.setTemplatePopup(this.htmlTag.divPopupContainer);
            this.processFormButton();
            // Gọi các function cần thiết            
            this.getFunction();
        };
    },

    processFormButton: function () {
        $(this.htmlTag.popupCloseButton).click(function () {
            Popup_SystemFunctionUpdate.close();
        });

        $(this.htmlTag.popup_cancel).click(function () {
            Popup_SystemFunctionUpdate.close();
        });

        $(this.htmlTag.popup_save, this.htmlTag.divPopupContainer).click(function () {

            var _parentId = $.trim($("#slFunction").val());
            if (_parentId == 0) _parentId = -1;

            var _name = $.trim($(Popup_SystemFunctionUpdate.htmlTag.divPopupContainer + " #txtName").val());
            var _Url = $.trim($(Popup_SystemFunctionUpdate.htmlTag.divPopupContainer + " #txtUrl").val());
            var _status = 0;
            var _order = $.trim($(Popup_SystemFunctionUpdate.htmlTag.divPopupContainer + " #txtOrder").val());
            var _showInMenu = true;
            if ($(Popup_SystemFunctionUpdate.htmlTag.divPopupContainer + " #rdActive").is(":checked"))
                _status = 1;
            if ($(Popup_SystemFunctionUpdate.htmlTag.divPopupContainer + " #rdNotShowInMenu").is(":checked"))
                _showInMenu = false;
            var _functionId = eval($.trim($(Popup_SystemFunctionUpdate.htmlTag.divPopupContainer + " #hfFunctionId").val()));
            if (Popup_SystemFunctionUpdate.vars.m_objectId >= 0) {
                if (_parentId == Popup_SystemFunctionUpdate.vars.m_objectId) {
                    jAlert("Không thể chọn chính chức năng trên làm chức năng cha", null, function () {
                        $(Popup_SystemFunctionUpdate.htmlTag.divPopupContainer + "#slFunction").focus();
                    });
                    return;
                }
            }
            if (_name == "") {
                jAlert("Chưa nhập tên chức năng", null, function () {
                    $(Popup_SystemFunctionUpdate.htmlTag.divPopupContainer + " #txtName").focus();
                });
                return;
            }
            if (_order == "") {
                jAlert("Chưa nhập thứ tự", null, function () {
                    $(Popup_SystemFunctionUpdate.htmlTag.divPopupContainer + " #txtOrder").focus();
                });
                return;
            }
            try {
                var test = eval(_order);
                if (test > 100) {
                    jAlert("Số thứ tự không được nhập quá 100", null, function () {
                        $(Popup_SystemFunctionUpdate.htmlTag.divPopupContainer + " #txtOrder").focus();
                    });
                    return;
                }
            }
            catch (e) {
                jAlert("Thứ tự phải là kiểu số", null, function () {
                    $(Popup_SystemFunctionUpdate.htmlTag.divPopupContainer + " #txtOrder").focus();
                });
                return;

            }

            if (Popup_SystemFunctionUpdate.vars.m_objectId == 0) {
                //Thêm mới
                var _data = { parentId: _parentId, name: _name, url: _Url, icon: null, order: _order, status: _status, showInMenu: _showInMenu };
                Popup_SystemFunctionUpdate.addFunction(_data);
            }
            else {
                var _data = { functionId: Popup_SystemFunctionUpdate.vars.m_objectId, name: _name, url: _Url, icon: null, parentId: _parentId, order: _order, status: _status, showInMenu: _showInMenu };
                Popup_SystemFunctionUpdate.updateFunction(_data);
            }

        });
    },

    bindData: function () {
        if (this.vars.m_objectId > 0) {
            $(".titlepopup").html("Sửa chức năng");
            Loading.showProcess();
            $.ajax({
                type: "GET",
                url: "/handler/FunctionHandler.ashx",
                data: { t: 'GetFunctionInfo', FunctionId: this.vars.m_objectId },
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                cache: false,
                success: function (data) {
                    $("#slFunction option[value='" + data.ParentId + "']").attr('selected', 'selected');
                    $(Popup_SystemFunctionUpdate.htmlTag.divPopupContainer + " #txtName").val(data.Name);
                    $(Popup_SystemFunctionUpdate.htmlTag.divPopupContainer + " #txtUrl").val(data.Url);
                    if (eval(data.Status) == 1) {
                        $(Popup_SystemFunctionUpdate.htmlTag.divPopupContainer + " #rdActive").attr('checked', 'checked');
                    }
                    else
                        $(Popup_SystemFunctionUpdate.htmlTag.divPopupContainer + " #rdDeactive").attr('checked', 'checked');
                    if (eval(data.ShowInMenu) == true) {
                        $(Popup_SystemFunctionUpdate.htmlTag.divPopupContainer + " #rdShowInMenu").attr('checked', 'checked');
                    }
                    else
                        $(Popup_SystemFunctionUpdate.htmlTag.divPopupContainer + " #rdNotShowInMenu").attr('checked', 'checked');
                    $(Popup_SystemFunctionUpdate.htmlTag.divPopupContainer + " #txtOrder").val(data.Order);
                    $(Popup_SystemFunctionUpdate.htmlTag.divPopupContainer + " #divCreateDate #lbCreateDate").html(COMMON.jSonDateToString(data.CreateDate, 1));
                    Loading.closeProcess();
                    $(Popup_SystemFunctionUpdate.htmlTag.divPopupContainer + "#slFunction").focus();
                }
            });
        }
        else {
            $(Popup_SystemFunctionUpdate.htmlTag.divPopupContainer + "#slFunction").focus();            
            $(Popup_SystemFunctionUpdate.htmlTag.divPopupContainer + "#slFunction option[value='" + Popup_SystemFunctionUpdate.vars.m_parentId + "']").attr('selected', 'selected');
        }
    },

    // hàm đóng popup
    close: function () {
        if ($(Popup_SystemFunctionUpdate.htmlTag.divPopupContainerWrapper).length != 0) {
            $(Popup_SystemFunctionUpdate.htmlTag.divPopupContainerWrapper).remove();
        }
    },

    bindFunction: function (data, parentId, level) {
        var strHtml = "";
        var strLevel = "";
        if (level == 1) strLevel = "--->";
        for (var i = 0; i < data.length; i++) {
            if (data[i].ParentId == parentId && level < 2) {
                strHtml += '<option value="' + data[i].FunctionId + '">' + strLevel + data[i].Name + '</option>' + Popup_SystemFunctionUpdate.bindFunction(data, data[i].FunctionId, level + 1);
            }
        }
        return strHtml;
    },

    getFunction: function () {
        Loading.showProcess();
        $.ajax({
            type: "GET",
            url: "/handler/FunctionHandler.ashx",
            data: { t: 'GetListFunction' },
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                var strHtml = "";
                strHtml += Popup_SystemFunctionUpdate.bindFunction(data.Items, -1, 0);                
                $("#slFunction").append(strHtml);

                Loading.closeProcess();
                if (Popup_SystemFunctionUpdate.vars.m_objectId > 0) {
                    Popup_SystemFunctionUpdate.bindData();
                    $(Popup_SystemFunctionUpdate.htmlTag.divPopupContainer + " #divCreateDate").css('display', 'block');
                }
                if (Popup_SystemFunctionUpdate.vars.m_parentId > 0)
                    $("#slFunction option[value='" + Popup_SystemFunctionUpdate.vars.m_parentId + "']").attr('selected', 'selected');
                $(Popup_SystemFunctionUpdate.htmlTag.divPopupContainer + "#slFunction").focus();
            }
        });
    },

    addFunction: function (_data) {
        Loading.showProcess();
        $.ajax({
            type: "POST",
            contentType: "application/json;charset:utf-8",
            url: "/webServices/FunctionWS.asmx/InsertFunction",
            data: JSON.encode(_data),
            dataType: "json",
            cache: false,
            success: function (data) {
                if (COMMON.actionSuccess(data.d)) {
                    Popup_SystemFunctionUpdate.close();
                    Pages_SystemFunction.bindData();
                }
                Loading.closeProcess();
            }
        });
    },

    updateFunction: function (_data) {
        Loading.showProcess();
        $.ajax({
            type: "POST",
            contentType: "application/json;charset:utf-8",
            url: "/webServices/FunctionWS.asmx/UpdateFunction",
            data: JSON.encode(_data),
            dataType: "json",
            cache: false,
            success: function (data) {
                if (COMMON.actionSuccess(data.d)) {
                    if (eval(data.d) == -2) {
                        jAlert("Bạn không thể chọn chức năng cha trên vì quá 3 cấp chức năng", null);
                    }
                    else {
                        Popup_SystemFunctionUpdate.close();
                        if (Popup_SystemFunctionUpdate.vars.m_typeLoad == 1)
                            Pages_SystemFunction.bindData();
                        else
                            Pages_SystemFunctionInfo.bindFunctionInfo();
                    }
                }
                Loading.closeProcess();
            }
        });
    }
};
