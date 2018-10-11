page_RetailBom = new function () {
    Number.prototype.format = function (n, x, s, c) {
        var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
        num = this.toFixed(Math.max(0, ~ ~n));

        if (num == 0) return "&nbsp;";

        return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ',')).replace('.00', '');
    };

    this.documentReady = function () {
        for (var i = 1; i <= 5; i++) {
            page_RetailBom.bindRetailBom(i, 'actual');
        }
    };

    this.bindRetailBom = function (channel, t) {
        if (t == 'actual')
            fun = 'GetListRetailBomActual';
        else if (t == 'target')
            fun = 'GetListRetailBomTarget';
        $.ajax({
            type: "GET",
            url: "/handler/Dashboard.ashx",
            data: { channel: channel, t: fun },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                if (t == 'actual') {
                    $("#tbRetailBom" + channel).setTemplateURL("/templates/pages/dashboard/retail-bom/actual.htm");
                    $("#tbRetailBom" + channel).processTemplate(data);
                }
                else if (t == 'target') {
                    $("#tbRetailBom" + channel).setTemplateURL("/templates/pages/dashboard/retail-bom/target.htm");
                    $("#tbRetailBom" + channel).processTemplate(data);
                }

                if (channel == 4) $(".percent").append('%');
            }
        });
    };

    $("#ddlType").live('change', function () {
        for (var i = 1; i <= 5; i++) {
            page_RetailBom.bindRetailBom(i, $(this).val());
        }
        if ($(this).val() == 'target') $('.tb1').hide();
        else $('.tb1').show();
    });

    this.getClassTarget = function (v) {
        if (v >= 90) return 'green';
        else if (v < 80 && v != 0) return 'red';
        else if (v >= 80 && v < 90) return 'yellow';
        else if (v == 0) return 'hide';
    };

    this.getClassActual = function (value, channel, parameter) {
        if (channel == 4 && parameter != 'J' && value > 0) return 'percent';
    };
};