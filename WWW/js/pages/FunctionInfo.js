Pages_SystemFunctionInfo = new function () {
    this.m_tbList = "#tbListRole";
    this.m_functionId = -1;
    this.documentReady = function (functionid) {
        this.m_functionId = functionid;
        this.bindRoleList();
        this.bindFunctionInfo();
    };
    this.bindFunctionInfo = function () {
        Loading.showProcess();
        $.ajax({
            type: "GET",
            contentType: "application/json",
            dataType: "json",
            data: { t: "GetFunctionInfo", functionid: Pages_SystemFunctionInfo.m_functionId },
            url: "/handler/FunctionHandler.ashx",
            cache: false,
            success: function (data) {
                if (eval(data.result) == -1)
                    $(window.location).attr('href', '/pages/Function.aspx');
                if (data.ParentName != "-------")
                    $("#lbParentName").html('<a href="/admin/pages/FunctionInfo.aspx?Id=' + data.ParentId + '" title="Xem thông tin chức năng">' + data.ParentName + '</a>');
                else
                    $("#lbParentName").html(data.ParentName);
                $("#lbName").html(data.Name);
                $("#lbUrl").html(data.Url);
                if (eval(data.Status) == 1)
                    $("#lbStatus").html('Hoạt động');
                else
                    $("#lbStatus").html('Đã khóa');

                if (data.ShowInMenu)
                    $("#lbShowInMenu").html("Có hiển thị");
                else {
                    $("#lbShowInMenu").html("Không hiển thị");
                }
                $("#lbOrder").html(data.Order);
                $("#lbCreateDate").html(COMMON.jSonDateToString(data.CreateDate, 1));
                Loading.closeProcess();
            }
        });
    };
    this.bindRoleList = function () {
        Loading.showProcess();
        $.ajax({
            type: "GET",
            contentType: "application/json",
            dataType: "json",
            data: { t: 'GetListRoleByFunctionId', functionId: Pages_SystemFunctionInfo.m_functionId },
            cache: false,
            url: "/handler/RoleHandler.ashx",
            success: function (data) {
                $(Pages_SystemFunctionInfo.m_tbList).setTemplateURL("/Templates/pages/RoleOfFunction.htm");
                $(Pages_SystemFunctionInfo.m_tbList).processTemplate(data);
                Loading.closeProcess();
            }
        });
    };

    $(".tablefunction input").live('click', function () {
        if ($(this).attr('checked') == 'checked') {
            $('#lb' + $(this).attr('id')).css('display', 'inline');
        }
        else {
            $('#lb' + $(this).attr('id')).css('display', 'none');
        }
    });

    $(".delRole").live('click', function () {
        var object = $(this);
        jConfirm("Bạn có chắc chắn muốn xóa chức năng trên ra khỏi nhóm hiện tại không?", null, function (r) {
            if (r) {
                var _roleId = object.attr('id').substring(2);
                var _data = { roleId: _roleId, functionId: Pages_SystemFunctionInfo.m_functionId };
                Loading.showProcess();
                $.ajax({
                    type: "POST",
                    contentType: "application/json",
                    dataType: "json",
                    data: JSON.encode(_data),
                    cache: false,
                    url: "/webServices/RoleFunctionWS.asmx/DeleteRoleOfFunction",
                    success: function (data) {
                        Loading.closeProcess();
                        switch (data.d) {
                            case 0:
                                jAlert('Chưa đăng nhập!');
                                return;
                            case -2:
                                jAlert("Không thể xóa được vì nhóm chức năng trên chứa các chức năng con của chức năng hiện tại");
                                return;
                            default:
                        }
                        if (data.d > 0) {
                            Pages_SystemFunctionInfo.bindRoleList();
                        }
                    }
                });
            }
        });
    });
    $("#ACA").live('click', function () {
        var ischecked = false;
        $(Pages_SystemFunctionInfo.m_tbList + " input:checkbox").each(function () {
            if ($(this).is(':checked')) {
                ischecked = true;
                return false;
            }
        });
        if (!ischecked) {
            jAlert("Không có nhóm chức năng nào được chọn", "Thông báo");
        }
        else {
            jConfirm("Bạn có chắc chắn muốn xóa các nhóm chức năng được chọn không?", null, function (r) {
                if (r) {
                    var listRole = "";
                    $(Pages_SystemFunctionInfo.m_tbList + " input:checkbox").each(function () {
                        if ($(this).is(':checked')) {
                            listRole += $(this).attr('id').substring(3) + ",";
                        }
                    });
                    listRole = listRole.substring(0, listRole.length - 1);
                    var _data = { functionId: Pages_SystemFunctionInfo.m_functionId, listRoleId: listRole };
                    Loading.showProcess();
                    $.ajax({
                        type: "POST",
                        contentType: "application/json",
                        dataType: "json",
                        data: JSON.encode(_data),
                        cache: false,
                        url: "/webServices/RoleFunctionWS.asmx/DeleteListRoleOfFunction",
                        success: function (data) {
                            Loading.closeProcess();
                            switch (data.d) {
                                case "0":
                                    jAlert('Chưa đăng nhập!');
                                    return;
                                case "-1":
                                    jAlert('Có lỗi xảy ra!');
                                    return;
                                default:
                            }
                            if (data.d != "") {
                                jAlert("Không thể xóa được vì nhóm chức năng " + data.d + " vì chứa các chức năng con của chức năng hiện tại", null);
                            } else {
                                Pages_SystemFunctionInfo.bindRoleList();
                                Loading.closeProcess();
                            }
                        }
                    });
                }
            });
        }
    });
    $("#aUpdateFunction").live('click', function () {
        Popup_SystemFunctionUpdate.showPopup(Pages_SystemFunctionInfo.m_functionId, 2, 0);
    });
    $("#aAddRole").live('click', function () {
        Popup_SystemFunctionChooseRole.showPopup(Pages_SystemFunctionInfo.m_functionId);
    });
    $("#CA").live('click', function () {
        $("#tbListRole input:checkbox").attr('checked', $(this).is(':checked'));
        $("#tbListRole input:checkbox").each(function () {
            if ($(this).is(':checked')) {
                $(this).parent().parent().addClass('selected ');
            } else {
                $(this).parent().parent().removeClass('selected ');
            }
        });
    });
    $("#tbListRole input:checkbox").live('click', function () {
        if ($(this).is(':checked')) {
            $(this).parent().parent().addClass('selected ');
        } else {
            $(this).parent().parent().removeClass('selected ');
        }
    });
}