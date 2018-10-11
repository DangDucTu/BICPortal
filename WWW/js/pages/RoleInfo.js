
Pages_SystemRoleInfo = new function () {
    this.m_tbList = "#tbAccountList";
    this.m_roleId = -1;
    this.documentReady = function (roleId) {
        this.m_roleId = roleId;
        Pages_SystemRoleInfo.bindRoleInfo();
        Pages_SystemRoleInfo.bindAccountList();
        Pages_SystemRoleInfo.bindFunctionList();
    };
    this.bindRoleInfo = function () {
        Loading.showProcess();
        $.ajax({
            type: "GET",
            contentType: "application/json",
            dataType: "json",
            data: { t: "GetInfo", RoleId: Pages_SystemRoleInfo.m_roleId },
            url: "/handler/RoleHandler.ashx",
            cache: false,
            success: function (data) {
                $("#lbName").html(data.Name);
                if (eval(data.Status) == 1)
                    $("#lbStatus").html('Hoạt động');
                else
                    $("#lbStatus").html('Đã khóa');
                $("#lbDescription").html(data.Description);
                $("#lbCreateDate").html(COMMON.jSonDateToString(data.CreateDate, 1));
                Loading.closeProcess();
            }
        });
    };
    this.bindAccountList = function () {
        Loading.showProcess();
        $.ajax({
            type: "GET",
            contentType: "application/json",
            dataType: "json",
            data: { t: 'GetListAccountByRole', roleId: Pages_SystemRoleInfo.m_roleId },
            cache: false,
            url: "/handler/AdminHandler.ashx",
            success: function (data) {
                $(Pages_SystemRoleInfo.m_tbList).setTemplateURL("/Templates/pages/RoleInfoAdmin.htm");
                $(Pages_SystemRoleInfo.m_tbList).processTemplate(data);
                Loading.closeProcess();
            }
        });
    };
    this.bindFunction = function (data, parentId) {
        var strHtml = "";
        var hasLi = false;
        var sStyle = ' style = "padding-left:30px"';
        if (parentId == null) sStyle = "";
        strHtml += '<ul ' + sStyle + '>';
        for (var i = 0; i < data.length; i++) {
            if (data[i].ParentId == parentId) {
                var checked = "";
                hasLi = true;
                if (data[i].RoleId != null) checked = 'checked="checked"';
                strHtml += '<li>';
                strHtml += ' <input type="checkbox" class="cbRecord cbincol" id="cbf' + data[i].FunctionId + '"' + checked + '/>';
                strHtml += '<span style="padding-left:10px;">' + data[i].Name + '</span>';
                strHtml += this.bindFunction(data, data[i].FunctionId);
                strHtml += '</li>';
            }
        }
        strHtml += "</ul>";
        if (!hasLi) return "";
        return strHtml;
    };
    this.bindFunctionList = function () {
        Loading.showProcess();
        var _data = { t: 'GetListFunctionByRoleId', roleId: Pages_SystemRoleInfo.m_roleId };
        $.ajax({
            type: 'GET',
            contentType: 'application/json',
            dataType: 'json',
            data: _data,
            cache: false,
            url: '/handler/FunctionHandler.ashx',
            success: function (data) {
                var strHtml = Pages_SystemRoleInfo.bindFunction(data, -1);
                $("#DivListFunction").html(strHtml);
                Loading.closeProcess();
            }
        });
    };
    this.addRoleForFunction = function (functionId) {
        var _data = { functionId: functionId, roleId: Pages_SystemRoleInfo.m_roleId };
        Loading.showLoadingBar("#DivListFunction", 0, 0);
        $.ajax({
            type: "POST",
            contentType: "application/json",
            dataType: "json",
            data: JSON.encode(_data),
            cache: false,
            url: "/webServices/RoleFunctionWS.asmx/InsertRoleFunctionById",
            success: function (data) {
                if (COMMON.actionSuccess(data.d)) {
                    var parentNode = $("#cbf" + functionId).parent().parent().parent().find("input:first").attr('id');
                    $("#" + parentNode).attr('checked', true);
                }
                Loading.closeLoadingBar("#DivListFunction");
            }
        });
    };
    this.delRoleOfFunction = function (functionId) {
        var _data = { roleId: Pages_SystemRoleInfo.m_roleId, functionId: functionId };
        Loading.showLoadingBar("#DivListFunction", 0, 0);
        $.ajax({
            type: "POST",
            contentType: "application/json",
            dataType: "json",
            data: JSON.encode(_data),
            cache: false,
            url: "/webServices/RoleFunctionWS.asmx/DeleteRoleOfFunction",
            success: function (data) {
                if (COMMON.actionSuccess(data.d)) {
                    if (eval(data.d) == -2) {
                        jAlert("Không thể xóa chức năng trên ra khỏi nhóm chức năng do chức năng đó chứa chức năng con", null, function () {
                            $("#cbf" + functionId).attr('checked', true);
                        });
                    }
                }
                Loading.closeLoadingBar("#DivListFunction");
            }
        });
    };
    $("#DivListFunction .cbRecord").live('click', function () {
        var _functionId = parseInt($(this).attr('id').substring(3));
        if ($(this).is(':checked')) {
            Pages_SystemRoleInfo.addRoleForFunction(_functionId);
            $(this).attr('checked', true);
        }
        else {
            jConfirm("Bạn có chắc chắn muốn xóa chức năng trên ra khỏi nhóm chức năng không?", null, function (r) {
                if (r) {
                    Pages_SystemRoleInfo.delRoleOfFunction(_functionId);
                }
                else {
                    $("#cbf" + _functionId).attr('checked', true);
                }
            });
        }
    });

    $(".delAcc").live('click', function () {
        var object = $(this);
        jConfirm("Bạn có chắc chắn muốn xóa tài khoản trên ra khỏi nhóm hiện tại không?", null, function (r) {
            if (r) {
                var _adminId = object.attr('id').substring(2);
                var _data = { roleId: Pages_SystemRoleInfo.m_roleId, adminId: _adminId };
                Loading.showProcess();
                $.ajax({
                    type: "POST",
                    contentType: "application/json",
                    dataType: "json",
                    data: JSON.encode(_data),
                    cache: false,
                    url: "/webServices/PermissionWS.asmx/DeletePermision",
                    success: function (data) {
                        if (COMMON.actionSuccess(data.d)) {
                            Pages_SystemRoleInfo.bindAccountList();
                        }
                        Loading.closeProcess();
                    }
                });
            }
        });
    });
    $("#ACA").live('click', function () {
        var ischecked = false;
        $("#tbAccountList input:checkbox").each(function () {
            if ($(this).is(':checked')) {
                ischecked = true;
                return false;
            }
        });
        if (!ischecked) {
            jAlert("Không có tài khoản nào được chọn", null);
        }
        else {
            jConfirm("Bạn có chắc chắn muốn xóa các tài khoản được chọn không?", null, function (r) {
                if (r) {
                    var listAdmin = "";
                    $("#tbAccountList input:checkbox").each(function () {
                        if ($(this).is(':checked')) {
                            listAdmin += $(this).attr('id').substring(3) + ",";
                        }
                    });
                    listAdmin = listAdmin.substring(0, listAdmin.length - 1);
                    var _data = { roleId: Pages_SystemRoleInfo.m_roleId, listAdmin: listAdmin };
                    Loading.showProcess();
                    $.ajax({
                        type: "POST",
                        contentType: "application/json",
                        dataType: "json",
                        data: JSON.encode(_data),
                        cache: false,
                        url: "/webServices/PermissionWS.asmx/DeletePermisionByListAdmin",
                        success: function (data) {
                            if (COMMON.actionSuccess(data.d)) {
                                Pages_SystemRoleInfo.bindAccountList();
                            }
                            Loading.closeProcess();
                        }
                    });
                }
            });
        }
    });
    $("#aUpdateRole").live('click', function () {
        Popup_SystemRoleUpdate.showPopup(Pages_SystemRoleInfo.m_roleId, 2);
    });
    $("#aAddAdmin").live('click', function () {
        Popup_SystemChooseAdmin.showPopup(Pages_SystemRoleInfo.m_roleId);
    });

    $("#CA").live('click', function () {
        $("#tbAccountList input:checkbox").attr('checked', $(this).is(':checked'));
        $("#tbAccountList input:checkbox").each(function () {
            if ($(this).is(':checked')) {
                $(this).parent().parent().addClass('selected ');
            } else {
                $(this).parent().parent().removeClass('selected ');
            }
        });
    });
}