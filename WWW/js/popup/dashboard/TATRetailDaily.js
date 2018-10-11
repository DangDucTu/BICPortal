page_TAT = new function () {
    Number.prototype.format = function (n, x, s, c) {
        var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
        num = this.toFixed(Math.max(0, ~ ~n));

        return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
    };

    this.convertDate = function (expDate) {
        return (expDate.getMonth() + 1) + '/' + expDate.getDate() + '/' + expDate.getFullYear();
    };

    this.documentReady = function () {
        var _currentDate = new Date();
        _currentDate.setDate(_currentDate.getDate() - 1);

        $("#ctl00_ContentPlaceHolder1_txtDate").datepicker({
            changeMonth: true,
            changeYear: true
        });

        $("#ui-datepicker-div").hide();

        this.bindDataSnapshot(1);
        this.bindDataSnapshot(2);
        this.bindDataSnapshot(3);
        this.bindNumberOfApplication();
        this.bindNetGrossApprovedApplication();
        this.bindActualTarget();
    };

    this.bindNumberOfApplication = function () {
        var date = $("#ctl00_ContentPlaceHolder1_txtDate").val();
        var channel = $("#ctl00_ContentPlaceHolder1_ddlRetail").val();
        var region = $("#ctl00_ContentPlaceHolder1_ddlRegion").val();
        $.ajax({
            type: "GET",
            url: "/handler/Dashboard.ashx",
            data: { date: date, channel: channel, region: region, t: "TATDailyRetailAppsStatusTable" },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                $("#tbNumberOfApplication").setTemplateURL("/templates/pages/dashboard/tat_retail_daily/number_of_application.htm");
                $("#tbNumberOfApplication").processTemplate(data);
            }
        });
    };

    this.bindNetGrossApprovedApplication = function () {
        var date = $("#ctl00_ContentPlaceHolder1_txtDate").val();
        var channel = $("#ctl00_ContentPlaceHolder1_ddlRetail").val();
        var region = $("#ctl00_ContentPlaceHolder1_ddlRegion").val();
        $.ajax({
            type: "GET",
            url: "/handler/Dashboard.ashx",
            data: { date: date, channel: channel, region: region, t: "TATDailyRetailNetGrossApprovedAppsTable" },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                $("#tbNetGross").setTemplateURL("/templates/pages/dashboard/tat_retail_daily/net_gross_approved_application.htm");
                $("#tbNetGross").processTemplate(data);
            }
        });
    };

    this.bindActualTarget = function () {
        var date = $("#ctl00_ContentPlaceHolder1_txtDate").val();
        $.ajax({
            type: "GET",
            url: "/handler/Dashboard.ashx",
            data: { date: date, t: "TATDailyRetailTATTarget" },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                $("#tbActualTarget").setTemplateURL("/templates/pages/dashboard/tat_retail_daily/actual_target.htm");
                $("#tbActualTarget").processTemplate(data);
            }
        });
    };

    this.bindDataSnapshot = function (item) {
        var date = $("#ctl00_ContentPlaceHolder1_txtDate").val();
        $.ajax({
            type: "GET",
            url: "/handler/Dashboard.ashx",
            data: { date: date, item: item, t: "TATDailyRetailSnapshot" },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                $("#tb" + item).setTemplateURL("/templates/pages/dashboard/tat_retail_daily/snapshot.htm");
                $("#tb" + item).processTemplate(data);
            }
        });
    };
};