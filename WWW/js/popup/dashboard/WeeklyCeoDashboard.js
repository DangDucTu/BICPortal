/// <reference path="dashboard.js" />

pages_WeeklyCeoDashboard = new function () {

    Number.prototype.format = function (n, x, s, c) {
        var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
        num = this.toFixed(Math.max(0, ~ ~n));

        return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
    };

    this.variable = new function () {
        this.lang = '';
    };

    this.documentReady = function (date, lang) {
        pages_WeeklyCeoDashboard.variable.lang = lang;
        for (i = 1; i <= 3; i++) {
            this.bindDataSummary(date, i, lang);
        }

        this.getOtherInfoCeoSpeedometer(date, lang);
        this.getCeoProductivityTable(date, lang);

        this.getCeoPerformance(date, 1, lang);
        this.getCeoPerformance(date, 2, lang);
        this.getCeoPerformance(date, 3, lang);

        this.getCeoProductivityRetail(date);

        for (i = 0; i <= 1; i++) {
            this.getCeoProductivitySme(date, i);
        }
    };

    this.bindDataSummary = function (date, title) {
        $.ajax({
            type: "GET",
            url: "/handler/Dashboard.ashx",
            data: { date: date, title: title, t: "GetCeoSummary" },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                $("#tbSummary" + title).setTemplateURL("/templates/pages/dashboard/weekly_ceo/summary" + title + ".htm");
                $("#tbSummary" + title).processTemplate(data);
            }
        });
    };

    this.getOtherInfoCeoSpeedometer = function (date, lang) {
        $.ajax({
            type: "GET",
            url: "/handler/Dashboard.ashx",
            data: { date: date, t: "GetOtherInfoCeoSpeedometer" },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                if (data != null && data.length > 0) {
                    var cur = lang == 'vi' ? 'Hiện tại ' : 'Current ';
                    $(".vc1").html(cur + COMMON.formatCurrent(data[0].current_value));
                    $(".vc3").html(cur + COMMON.formatCurrent(data[1].current_value));
                    $(".vc2").html(cur + COMMON.formatCurrent(data[2].current_value));
                    $(".vc4").html(cur + COMMON.formatCurrent(data[3].current_value));

                    $(".vt1").html(COMMON.formatCurrent(data[0].max_month));
                    $(".vt3").html(COMMON.formatCurrent(data[1].max_month));
                    $(".vt2").html(COMMON.formatCurrent(data[2].max_month));
                    $(".vt4").html(COMMON.formatCurrent(data[3].max_month));

                    $(".gt1").html(data[0].growth_target.format(0, 3, '.', ',') + '%');
                    $(".gt3").html(data[1].growth_target.format(0, 3, '.', ',') + '%');
                    $(".gt2").html(data[2].growth_target.format(0, 3, '.', ',') + '%');
                    $(".gt4").html(data[3].growth_target.format(0, 3, '.', ',') + '%');
                }
            }
        });
    };

    this.getCeoProductivityTable = function (date, lang) {
        $.ajax({
            type: "GET",
            url: "/handler/Dashboard.ashx",
            data: { date: date, title: 3, t: "GetCeoProductivityTable" },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                if (data != null && data.length > 0) {
                    $(".dt1").html(DASHBOARD.getMonthByLang(data[0].month.split('-')[0], lang) + '-' + data[0].month.split('-')[1]);
                    $(".dt3").html(DASHBOARD.getMonthByLang(data[1].month.split('-')[0], lang) + '-' + data[1].month.split('-')[1]);

                    if (lang == 'en') {
                        $(".dt2").html(data[2].month);
                        $(".dt4").html(data[3].month);
                    }
                    else {
                        $(".dt2").html("Kế hoạch");
                        $(".dt4").html("Kế hoạch");
                    }

                    $(".rt1").html(data[0].retail.format(2, 3, '.', ','));
                    $(".rt4").html(data[1].retail.format(2, 3, '.', ','));
                    $(".rt2").html(data[2].retail.format(2, 3, '.', ','));
                    $(".rt5").html(data[3].retail.format(2, 3, '.', ','));

                    if (data[0].retail > data[2].retail) {
                        $(".rt3").html((data[0].retail - data[2].retail).format(2, 3, '.', ','));
                        $(".rt3").append(' <img src="/images/admin/icon/up.png" />');
                    }
                    else if (data[0].retail <= data[2].retail) {
                        $(".rt3").html((data[2].retail - data[0].retail).format(2, 3, '.', ','));
                        $(".rt3").append(' <img src="/images/admin/icon/down.png" />');
                    }

                    if (data[1].retail > data[3].retail) {
                        $(".rt6").html((data[1].retail - data[3].retail).format(2, 3, '.', ','));
                        $(".rt6").append(' <img src="/images/admin/icon/up.png" />');
                    }
                    else if (data[1].retail <= data[3].retail) {
                        $(".rt6").html((data[3].retail - data[1].retail).format(2, 3, '.', ','));
                        $(".rt6").append(' <img src="/images/admin/icon/down.png" />');
                    }

                    $(".sme1").html(data[0].sme.format(2, 3, '.', ','));
                    $(".sme4").html(data[1].sme.format(2, 3, '.', ','));
                    $(".sme2").html(data[2].sme.format(2, 3, '.', ','));
                    $(".sme5").html(data[3].sme.format(2, 3, '.', ','));

                    if (data[0].sme > data[2].sme) {
                        $(".sme3").html((data[0].sme - data[2].sme).format(2, 3, '.', ','));
                        $(".sme3").append(' <img src="/images/admin/icon/up.png" />');
                    }
                    else if (data[0].sme <= data[2].sme) {
                        $(".sme3").html((data[2].sme - data[0].sme).format(2, 3, '.', ','));
                        $(".sme3").append(' <img src="/images/admin/icon/down.png" />');
                    }

                    if (data[1].sme > data[3].sme) {
                        $(".sme6").html((data[1].sme - data[3].sme).format(2, 3, '.', ','));
                        $(".sme6").append(' <img src="/images/admin/icon/up.png" />');
                    }
                    else if (data[1].sme <= data[3].sme) {
                        $(".sme6").html((data[3].sme - data[1].sme).format(2, 3, '.', ','));
                        $(".sme6").append(' <img src="/images/admin/icon/down.png" />');
                    }

                }
            }
        });
    };

    this.getCeoPerformance = function (date, table, lang) {
        $.ajax({
            type: "GET",
            url: "/handler/Dashboard.ashx",
            data: { date: date, table: table, t: "GetCeoPerformance" },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                $("#tbPerformance" + table).setTemplateURL("/templates/pages/dashboard/weekly_ceo/performance_" + lang + ".htm");
                $("#tbPerformance" + table).processTemplate(data);
            }
        });
    };

    this.getCeoProductivityRetail = function (date) {
        $.ajax({
            type: "GET",
            url: "/handler/Dashboard.ashx",
            data: { date: date, t: "GetCeoProductivityRetail" },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                $("#tbListProductivityRetail").setTemplateURL("/templates/pages/dashboard/weekly_ceo/productivity_retail.htm");
                $("#tbListProductivityRetail").processTemplate(data);
            }
        });
    };

    this.getCeoProductivitySme = function (date, type) {
        $.ajax({
            type: "GET",
            url: "/handler/Dashboard.ashx",
            data: { date: date, loaibigloan: type, t: "GetCeoProductivitySme" },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                $("#tbListProductivitySme" + type).setTemplateURL("/templates/pages/dashboard/weekly_ceo/productivity_sme.htm");
                $("#tbListProductivitySme" + type).processTemplate(data);
            }
        });
    };

    this.getPercent = function (v1, v2) {
        var v = ((v1 / v2 - 1) * 100);
        if (v != null && v > 0)
            return v.format(2, 3, '.', ',') + '%' + ' <img src="/images/admin/icon/up.png">';
        else if (v != null && v <= 0)
            return v.format(2, 3, '.', ',') + '%' + ' <img src="/images/admin/icon/down.png">';
        else return '';
    };

    this.addClassProductivityRetail = function (t) {
        if (t.indexOf('-') != -1) {
            return 'format' + t.split('-')[1];
        }
        else return '';
    };

    this.getValueProductivityRetail = function (v) {
        if (v == 0) return '-';
        if (v.indexOf('-') != -1) {
            if (isNaN(v.split('-')[0]))
                return DASHBOARD.getProductByLang(v.split('-')[0], pages_WeeklyCeoDashboard.variable.lang);
            else
                return (parseFloat(v.split('-')[0])).format(2, 3, '.', ',');
        }
        else {
            if (isNaN(v))
                return DASHBOARD.getProductByLang(v, pages_WeeklyCeoDashboard.variable.lang);
            else
                return (parseFloat(v)).format(2, 3, '.', ',');
        };
    };
};