page_SaleProductivity = new function () {
    Number.prototype.format = function (n, x, s, c) {
        var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
        num = this.toFixed(Math.max(0, ~ ~n));

        return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
    };

    this.documentReady = function (lang) {
        page_SaleProductivity.variable.lang = lang;
        this.bindProductivityCurrent();
        this.bindProductivityPrevious();
    };

    this.variable = new function () {
        this.lang = '';
    };

    this.bindProductivityCurrent = function () {
        $.ajax({
            type: "GET",
            url: "/handler/Dashboard.ashx",
            data: { t: "ProductivityRetailMonthlyActualTableCurrent" },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                $("#tbListProductivityCurrent").setTemplateURL("/templates/pages/dashboard/sales_productivity/productivity_current.htm");
                $("#tbListProductivityCurrent").processTemplate(data);
            }
        });
    };

    this.bindProductivityPrevious = function () {
        $.ajax({
            type: "GET",
            url: "/handler/Dashboard.ashx",
            data: { t: "ProductivityRetailMonthlyActualTablePrevious" },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                $("#tbListProductivityPrevious").setTemplateURL("/templates/pages/dashboard/sales_productivity/productivity_previous.htm");
                $("#tbListProductivityPrevious").processTemplate(data);
            }
        });
    };

    this.addClassProductivity = function (t) {
        if (t.indexOf('-') != -1) {
            return 'sales-productivity' + t.split('-')[1];
        }
        else return '';
    };

    this.getValueProductivity = function (v) {
        if (v == 0) return '-';
        if (v.indexOf('-') != -1) {
            if (isNaN(v.split('-')[0]))
                return DASHBOARD.getProductByLang(v.split('-')[0], page_SaleProductivity.variable.lang);
            else
                return (parseFloat(v.split('-')[0])).format(0, 3, '.', ',');
        }
        else {
            if (isNaN(v))
                return DASHBOARD.getProductByLang(v, page_SaleProductivity.variable.lang);
            else
                return (parseFloat(v)).format(0, 3, '.', ',');
        };
    };
};