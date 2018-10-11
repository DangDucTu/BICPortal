pages_IncentiveDashboard = new function () {

    Number.prototype.format = function (n, x, s, c) {
        var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
        num = this.toFixed(Math.max(0, ~ ~n));

        if (num == 0) return "&nbsp;";

        return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
    };

    this.documentReady = function (month) {
        pages_IncentiveDashboard.bindIncentiveCurrentMonth(month);
    };

    this.bindIncentiveCurrentMonth = function (month) {
        $.ajax({
            type: "GET",
            url: "/handler/Dashboard.ashx",
            data: { month: month, t: "IncentiveCurrentMonth" },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                $("#tbListIncentiveCurrentMonth").setTemplateURL("/templates/pages/dashboard/incentive_analysis/current_month.htm");
                $("#tbListIncentiveCurrentMonth").processTemplate(data);
            }
        });
    };
}