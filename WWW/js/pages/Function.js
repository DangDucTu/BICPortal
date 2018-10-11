//-----------------------------------------------------------
// Author:      hoan.trinh
// Create Date: 08/11/2011
// Description: 
//-----------------------------------------------------------
Pages_SystemFunction = {
    htmlTag: {
        tbFunctionList: '#tbFunctionList',
        Stt: '.Stt',
        liAddFunction: '#liAddFunction'
    },
    vars: {
        divList: ''
    },

    documentReady: function () {
        this.bindData();
        this.processFormButton();
    },

    processFormButton: function () {
        $(Pages_SystemFunction.htmlTag.liAddFunction).click(function () {
            Pages_SystemFunction.liAddFunction_click();
        });
    },

    bindFunction: function (data, parentId, level) {
        var strHtml = "";
        var strLevel = "";
        var Url = "";
        var icon = "";
        var iCount = 0;
        for (var i = 0; i < data.Items.length; i++) {
            iCount++;
            var _name = "";
            strLevel = "";
            if (level == 0) {
                _name = '<b style="font-family: verdana;">' + strLevel + '<a style="font-size:13px; color:#000" href="/pages/FunctionInfo.aspx?Id=' + data.Items[i].FunctionId + '">' + data.Items[i].Name + "</a></b>";
            }
            if (level == 1) {
                strLevel = "----> ";
                _name = '<b style="color:#A25922;font-family: verdana;">' + strLevel + '<a style="color:#A25922" href="/pages/FunctionInfo.aspx?Id=' + data.Items[i].FunctionId + '">' + data.Items[i].Name + "</a></b>";
            }
            if (level == 2) {
                strLevel = "&nbsp;&nbsp;&nbsp;&nbsp;----> ";
                _name = '<font style="color:#6E6E6E;font-family: verdana;">' + strLevel + '<a style="color:#6E6E6E" href="/pages/FunctionInfo.aspx?Id=' + data.Items[i].FunctionId + '">' + data.Items[i].Name + '</a></font>';
            }
            if (data.Items[i].ParentId == parentId) {
                if (data.Items[i].Url != null) Url = data.Items[i].Url;
                else Url = "";

                var _id = data.Items[i].FunctionId;
                var sShowMenu = "No";
                if (data.Items[i].ShowInMenu) sShowMenu = "Yes";
                strHtml += '<tr class="' + COMMON.getRowStyle(iCount) + '">'
                    + '<td class="order Stt">' + data.Items[i].Order + '</td>'
                    + '<td style="text-align: left;" class="title">' + _name + '</td>'
                    + '<td style="text-align: left; class="title">' + Url + '</td>'
                    + '<td class="title">' + sShowMenu + '</td>'
                    + '<td class="status">' + COMMON.convertStatus(data.Items[i].Status) + '</td>'
                    + '<td class="function last">'
                    + '<a class="aContextFunction" href="javascript:void(0)">Function</a>'
                    + '<div class="divContextFunction">'
                    + '<ul>';

                if (level + 1 < 3)
                    strHtml += '<li><a href="javascript:void(0)" onclick="Pages_SystemFunction.functionOnItem(6,' + _id + ')">Add Function</a></li>';
                //strHtml += '<li><a href="javascript:void(0)" onclick="Pages_SystemFunction.functionOnItem(1,' + _id + ')">Xem thông tin</a></li>';

                strHtml += '<li><a href="javascript:void(0)" onclick="Pages_SystemFunction.functionOnItem(2,' + _id + ')">Edit</a></li>';
                if (eval(data.Items[i].Status) == 1)
                    strHtml += '<li><a href="javascript:void(0)" onclick="Pages_SystemFunction.functionOnItem(3,' + _id + ')">Lock</a></li>';
                else
                    strHtml += '<li><a href="javascript:void(0)" onclick="Pages_SystemFunction.functionOnItem(4,' + _id + ')">Activate</a></li>';

                strHtml += '<li class="separator"><a href="javascript:void(0)" onclick="Pages_SystemFunction.functionOnItem(5,' + _id + ')">Delete</a></li>';

                strHtml += '</ul>'
                    + '</div>'
                        + '</td>'
                            + '</tr>' + Pages_SystemFunction.bindFunction(data, data.Items[i].FunctionId, level + 1);
            }
        }
        return strHtml;
    },

    bindData: function () {
        Loading.showProcess();
        $.ajax({
            type: 'GET',
            data: { t: 'GetListFunction' },
            url: '/handler/FunctionHandler.ashx',
            contentType: "application/json;charset=utf-8",
            dataType: 'json',
            cache: false,
            success: function (data) {
                var strHtml = Pages_SystemFunction.bindFunction(data, -1, 0);
                $(Pages_SystemFunction.htmlTag.tbFunctionList).html(strHtml);
                Pages_SystemFunction.bindOrder();
                Loading.closeProcess();
            }
        });
    },

    functionOnItem: function (f, m_FunctionId) {
        switch (f) {
            case 1:
                $(window.location).attr('href', '/admin/pages/FunctionInfo.aspx?Id=' + m_FunctionId);
                break;
            case 2:
                Popup_SystemFunctionUpdate.showPopup(m_FunctionId, 1, 0);
                break;
            case 3:
                Pages_SystemFunction.changeStatusFunction(m_FunctionId, 0);
                break;
            case 4:
                Pages_SystemFunction.changeStatusFunction(m_FunctionId, 1);
                break;
            case 5:
                Pages_SystemFunction.deleteFunction(m_FunctionId);
                break;
            case 6:
                Popup_SystemFunctionUpdate.showPopup(0, 1, m_FunctionId);
                break;
        }
    },
    bindOrder: function () {
        $(Pages_SystemFunction.htmlTag.Stt, Pages_SystemFunction.htmlTag.tbFunctionList).each(function (i) {
            $(this).html(i + 1);
        });
    },
    liAddFunction_click: function () {
        Popup_SystemFunctionUpdate.showPopup(0, 1, 0);
    },
    changeStatusFunction: function (functionId, status) {
        Loading.showProcess();
        var _data = { functionId: functionId, status: status };
        $.ajax({
            type: "POST",
            url: "/webServices/FunctionWS.asmx/ChangeFunctionStatus",
            data: JSON.encode(_data),
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                switch (data.d) {
                    case 0:
                        jAlert('Chưa đăng nhập!');
                        return;
                    case -1:
                        jAlert('Có lỗi xảy ra!');
                        return;
                    default:
                }
                if (data.d > 0) {
                    Pages_SystemFunction.bindData();
                }
            }
        });
    },
    deleteFunction: function (functionId) {
        jConfirm("Bạn có chắc chắn muốn xóa chức năng đã chọn không?", null, function (r) {
            if (r) {
                Loading.showProcess();
                var _data = { functionId: functionId };
                $.ajax({
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: JSON.encode(_data),
                    url: "/webServices/FunctionWS.asmx/DeleteFunction",
                    cache: false,
                    success: function (data) {
                        Loading.closeProcess();
                        switch (data.d) {
                            case 0:
                                jAlert('Chưa đăng nhập!');
                                return;
                            case -1:
                                jAlert('Có lỗi xảy ra!');
                                return;
                            case -2:
                                jAlert("Không thể xóa chức năng trên vì chức năng đó chứa đựng chức năng con");
                                return;
                            default:
                        }

                        if (data.d > 0) {
                            Pages_SystemFunction.bindData();
                        }
                    }
                });
            }
        });
    }
}