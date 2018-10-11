Pages_SystemRole = new function () {
    this.m_divList = "#divRoleList";
    this.documentReady = function () {
        Pages_SystemRole.bindData();
    };
    this.bindData = function () {
        Loading.showProcess();
        $.ajax({
            type: "GET",
            url: "/handler/RoleHandler.ashx",
            data: { t: 'GetListRole' },
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                $(Pages_SystemRole.m_divList).setTemplateURL('/Templates/pages/Role.htm');
                $(Pages_SystemRole.m_divList).processTemplate(data);
                Loading.closeProcess();
                Pages_SystemRole.bindOrder();
            }
        });
    };

    this.functionOnItem = function (f, _roleId) {
        switch (f) {
            case 1:
                window.location = '/pages/RoleInfo.aspx?Id=' + _roleId;
                break;
            case 2:
                Popup_SystemRoleUpdate.showPopup(_roleId, 1);
                break;
            case 3:
                jConfirm("Bạn có chắc chắn muốn xóa nhóm chức năng trên không?", null, function (r) {
                    if (r)
                        Pages_SystemRole.setRoleStatus(_roleId, 2);
                });
                break;
            case 4:
                Pages_SystemRole.setRoleStatus(_roleId, 0);
                break;
            case 5:
                Pages_SystemRole.setRoleStatus(_roleId, 1);
                break;
        }
    },

    this.setRoleStatus = function (roleId, status) {
        Loading.showProcess();
        var _data = { roleId: roleId, status: status };
        $.ajax({
            type: "POST",
            url: "/webServices/RoleWS.asmx/ChangeStatus",
            data: JSON.encode(_data),
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                if (COMMON.actionSuccess(data.d)) {
                    Pages_SystemRole.bindData();
                }
            }
        });
    };
    this.bindOrder = function() {
        $("#tbRoleList #Stt").each(function(i) {
            $(this).html(i + 1);
        });
    };
    $("#liAddRole").live('click', function () {
        Popup_SystemRoleUpdate.showPopup(0, 1);
    });
}