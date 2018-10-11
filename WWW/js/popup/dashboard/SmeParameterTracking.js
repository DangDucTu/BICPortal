page_SmeTracking = new function () {

    Number.prototype.format = function (n, x, s, c) {
        var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
        num = this.toFixed(Math.max(0, ~ ~n));

        return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
    };

    this.documentReady = function () {
        page_SmeTracking.getDate();
    };

    this.getDate = function () {
        $.ajax({
            type: "GET",
            url: "/handler/Dashboard.ashx",
            data: { t: "TrackingWeeklySMEParameterGetDate" },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                var html = '';
                for (var i = data.length - 1; i >= 0; i--) {
                    html += '<option value="' + COMMON.jSonDateToString(data[i].Date, 1) + '">' + COMMON.jSonDateToString(data[i].Date, 1) + '</option>';
                }
                $("#ddlDate").append(html);

                page_SmeTracking.getSmeCenter("");
            }
        });
    };

    this.getSmeCenter = function (region) {
        $.ajax({
            type: "GET",
            url: "/handler/Dashboard.ashx",
            data: { region: region, t: "TrackingWeeklySMEParameterGetBranch" },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                var html = '';
                for (var i = data.length - 1; i >= 0; i--) {
                    html += '<option value="' + data[i].Branch + '">' + data[i].Branch + '</option>';
                }
                $("#ddlSmeCenter").empty();
                $("#ddlSmeCenter").append('<option value="">[-- All Center --]</option>');
                $("#ddlSmeCenter").append(html);

                page_SmeTracking.getSmeParameterTracking();
            }
        });
    };

    this.getSmeParameterTracking = function () {
        var date = $("#ddlDate").val();
        var region = $("#ddlRegion").val();
        var branch = $("#ddlSmeCenter").val();
        if (branch != "") region = "";

        $.ajax({
            type: "GET",
            url: "/handler/Dashboard.ashx",
            data: { date: date, region: region, branch: branch, t: "TrackingWeeklySMEParameter" },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                $("#tbListWeeklyUpdate").setTemplateURL("/templates/pages/dashboard/sme_parameter_tracking/weekly_update.htm");
                $("#tbListWeeklyUpdate").processTemplate(data);
            }
        });
    };

    $("#ddlDate, #ddlRegion, #ddlSmeCenter").live("change", function () {
        page_SmeTracking.getSmeParameterTracking();
    });

    $("#ddlRegion").live("change", function () {
        var region = $(this).val();
        page_SmeTracking.getSmeCenter(region);
    });
};