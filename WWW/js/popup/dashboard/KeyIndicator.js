pages_KeyIndicator = new function () {
    this.htmlTag = new function () {
        this.divPopupContainerWrapper = '#divPopupUpdateIndicatorWrapper';
        this.divPopupContainer = '#divPopupUpdateIndicator';

        this.btnAddnew = '#liAddIndicator';
        this.popupCloseButton = '.popupclosebutton';
        this.popup_save = '#popup_save';
        this.popup_cancel = '#popup_cancel';
    };

    this.variable = new function () {
        this.id = 0;
        this.account = '';
    };

    Number.prototype.format = function (n, x, s, c) {
        var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
        num = this.toFixed(Math.max(0, ~ ~n));

        if (num == 0) return "&nbsp;";

        return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ',')).replace(',00', '');
    };

    this.documentReady = function (account) {
        pages_KeyIndicator.variable.account = account;
        pages_KeyIndicator.bindKeyIncator();
    };

    this.bindKeyIncator = function () {
        pic = $("#ddlPic").val();
        year = $("#ddlYear").val();
        $.ajax({
            type: "GET",
            url: "/handler/Dashboard.ashx",
            data: { pic: pic, year: year, t: "KeyIndicator" },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                $("#tbListKeyIndicator").setTemplateURL("/templates/pages/dashboard/key_indicator/key_indicator.htm");
                $("#tbListKeyIndicator").processTemplate(data);
            }
        });
    };

    this.getValue = function (value, unit) {
        if (value == null) return '&nbsp;';
        if (unit == '%')
            return value.format(2, 3, '.', ',') + '%';
        else if (value < 1000)
            return value.format(2, 3, '.', ',');
        else return COMMON.formatCurrent(value);
    };

    this.showPopup = function (id) {
        pages_KeyIndicator.variable.id = id;
        if ($(pages_KeyIndicator.htmlTag.divPopupContainerWrapper).length == 0) {
            $("body").append("<div id='" + this.htmlTag.divPopupContainerWrapper.substring(1) + "'></div>");
            $(this.htmlTag.divPopupContainerWrapper).setTemplateURL("/Templates/popup/dashboard/KeyIndicator.htm");
            $(this.htmlTag.divPopupContainerWrapper).processTemplate(null);
            COMMON.setTemplatePopup(this.htmlTag.divPopupContainer);

            this.processFormButton();

            if (id > 0)
                pages_KeyIndicator.getInfoIndicator();
        }
    };

    $(this.htmlTag.btnAddnew).live('click', function () {
        pages_KeyIndicator.showPopup(0);
        $("#popup_save").attr("value", "Insert");
    });

    // hàm đóng popup
    this.close = function () {
        if ($(pages_KeyIndicator.htmlTag.divPopupContainerWrapper).length != 0) {
            $(pages_KeyIndicator.htmlTag.divPopupContainerWrapper).remove();
        }
    };

    this.processFormButton = function () {
        $(this.htmlTag.popup_cancel).click(function () {
            if ($(pages_KeyIndicator.htmlTag.divPopupContainerWrapper).length != 0) {
                $(pages_KeyIndicator.htmlTag.divPopupContainerWrapper).remove();
            }
        });

        $(this.htmlTag.popupCloseButton).click(function () {
            if ($(pages_KeyIndicator.htmlTag.divPopupContainerWrapper).length != 0) {
                $(pages_KeyIndicator.htmlTag.divPopupContainerWrapper).remove();
            }
        });
    };

    this.getInfoIndicator = function () {
        $.ajax({
            type: "GET",
            url: "/handler/Dashboard.ashx",
            data: { id: pages_KeyIndicator.variable.id, t: "KeyIndicatorGetInfo" },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                if (data != null) {
                    $("#txtIndicator").val(data.Indicator);
                    $("#ddlUnit").val(data.Unit);
                    $("#txtT1").val(data.T1);
                    $("#txtT2").val(data.T2);
                    $("#txtT3").val(data.T3);
                    $("#txtT4").val(data.T4);
                    $("#txtT5").val(data.T5);
                    $("#txtT6").val(data.T6);
                    $("#txtT7").val(data.T7);
                    $("#txtT8").val(data.T8);
                    $("#txtT9").val(data.T9);
                    $("#txtT10").val(data.T10);
                    $("#txtT11").val(data.T11);
                    $("#txtT12").val(data.T12);
                }
            }
        });
    };


    $(this.htmlTag.popup_save).live('click', function () {
        if (!FValidate.isValidateAll()) return;

        indicator = $.trim($("#divPopupUpdateIndicator #txtIndicator").val());
        unit = $.trim($("#divPopupUpdateIndicator #ddlUnit").val());
        t1 = $.trim($("#divPopupUpdateIndicator #txtT1").val());
        t2 = $.trim($("#divPopupUpdateIndicator #txtT2").val());
        t3 = $.trim($("#divPopupUpdateIndicator #txtT3").val());
        t4 = $.trim($("#divPopupUpdateIndicator #txtT4").val());
        t5 = $.trim($("#divPopupUpdateIndicator #txtT5").val());
        t6 = $.trim($("#divPopupUpdateIndicator #txtT6").val());
        t7 = $.trim($("#divPopupUpdateIndicator #txtT7").val());
        t8 = $.trim($("#divPopupUpdateIndicator #txtT8").val());
        t9 = $.trim($("#divPopupUpdateIndicator #txtT9").val());
        t10 = $.trim($("#divPopupUpdateIndicator #txtT10").val());
        t11 = $.trim($("#divPopupUpdateIndicator #txtT11").val());
        t12 = $.trim($("#divPopupUpdateIndicator #txtT12").val());

        t1 = t1 == "" ? null : t1;
        t2 = t2 == "" ? null : t2;
        t3 = t3 == "" ? null : t3;
        t4 = t4 == "" ? null : t4;
        t5 = t5 == "" ? null : t5;
        t6 = t6 == "" ? null : t6;
        t7 = t7 == "" ? null : t7;
        t8 = t8 == "" ? null : t8;
        t9 = t9 == "" ? null : t9;
        t10 = t10 == "" ? null : t10;
        t11 = t11 == "" ? null : t11;
        t12 = t12 == "" ? null : t12;

        if (pages_KeyIndicator.variable.id == 0) {
            //Thêm mới
            var _data = { indicator: indicator, unit: unit, t1: t1, t2: t2, t3: t3, t4: t4, t5: t5, t6: t6, t7: t7, t8: t8, t9: t9, t10: t10,
                t11: t11, t12: t12
            };
            pages_KeyIndicator.addIndicator(_data);
        }
        else {
            var _data = { id: pages_KeyIndicator.variable.id, indicator: indicator, unit: unit, t1: t1, t2: t2, t3: t3, t4: t4, t5: t5, t6: t6, t7: t7, t8: t8, t9: t9, t10: t10,
                t11: t11, t12: t12
            };
            pages_KeyIndicator.updateIndicator(_data);
        }

    });

    this.updateIndicator = function (_data) {
        Loading.showProcess();

        $.ajax({
            type: "POST",
            contentType: "application/json;charset:utf-8",
            url: "/webServices/ReportWS.asmx/UpdateKeyIndicator",
            data: JSON.encode(_data),
            dataType: "json",
            cache: false,
            success: function (data) {
                if (data.d > 0) {
                    pages_KeyIndicator.bindKeyIncator();
                    pages_KeyIndicator.close();
                    jAlert("Update success.");
                }
                Loading.closeProcess();
            },
            error: function () {
                jAlert("An error occurred while performing.", function () {
                    Loading.close();
                });
            }
        });
    };

    $("#ddlPic").live('change', function () {
        pages_KeyIndicator.bindKeyIncator();
    });

    this.getIndicatorName = function (pic, indicator, id) {
        if (pages_KeyIndicator.variable.account == pic)
            return '<a href="javascript:;" class="text-red" onclick="pages_KeyIndicator.showPopup(' + id + ')" title="Click to edit">' + indicator + '</a>';
        else return indicator;
    };

    $("#ddlYear").live('change', function () {
        pages_KeyIndicator.bindKeyIncator();
    });
};