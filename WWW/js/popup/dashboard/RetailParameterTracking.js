page_RetailParameterTracking = new function () {
    Number.prototype.format = function (n, x, s, c) {
        var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
        num = this.toFixed(Math.max(0, ~ ~n));

        return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
    };

    this.convertDate = function (expDate) {
        return (expDate.getMonth() + 1) + '/' + expDate.getDate() + '/' + expDate.getFullYear();
    };

    this.documentReady = function (lastDate) {
        var _currentDate = new Date();
        _currentDate.setDate(_currentDate.getDate()-1);

        $("#txtDate").val(lastDate);
        $("#txtDate").datepicker({
            changeMonth: true,
            changeYear: true
        });


        $("#ui-datepicker-div").hide();

        this.bindTrackingDailyRetailParameterFTD();
        this.bindTrackingDailyRetailParameterMTD();

        this.getMonth();
    };

    this.bindTrackingDailyRetailParameterFTD = function () {
        var date = $("#txtDate").val();
        var channel = $("#ddlRetail").val();
        var region = $("#ddlRegion").val() == null ? "" : $("#ddlRegion").val();
        $.ajax({
            type: "GET",
            url: "/handler/Dashboard.ashx",
            data: { date: date, channel: channel, region: region, t: "TrackingDailyRetailParameterFTD" },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                $("#tbListDailyUpdate").setTemplateURL("/templates/pages/dashboard/retail_parameter_tracking/daily_update.htm");
                $("#tbListDailyUpdate").processTemplate(data);
            }
        });
    };

    this.bindTrackingDailyRetailParameterMTD = function () {
        var date = $("#txtDate").val();
        var channel = $("#ddlRetail").val();
        var region = $("#ddlRegion").val() == null ? "" : $("#ddlRegion").val();
        $.ajax({
            type: "GET",
            url: "/handler/Dashboard.ashx",
            data: { date: date, channel: channel, region: region, t: "TrackingDailyRetailParameterMTD" },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                $("#tbListMonthToDate").setTemplateURL("/templates/pages/dashboard/retail_parameter_tracking/monthtodate_update.htm");
                $("#tbListMonthToDate").processTemplate(data);
            }
        });
    };

    this.bindRegion = function (retail) {
        $("#ddlRegion").empty();
        $("#ddlRegion").show();
        if (retail == 'AC') {
            $("#ddlRegion").append('<option value="">[-- All Channel --]</option');
            $("#ddlRegion").append('<option value="Asset Partnership">Asset Partnership</option');
            $("#ddlRegion").append('<option value="Consumer Lending">Consumer Lending</option');
            $("#ddlRegion").append('<option value="Worksite banking">Worksite banking</option');
            $("#ddlRegion").append('<option value="Old AC before 2014">Old AC before 2014</option');
            $("#ddlRegion").append('<option value="Unallocated">Unallocated</option');
        }
        else if (retail == 'BRANCH') {
            $("#ddlRegion").append('<option value="">[-- All Regions --]</option');
            for (i = 1; i <= 10; i++) {
                if (i < 10)
                    $("#ddlRegion").append('<option value="Region 0' + i + '">Region 0' + i + '</option');
                else $("#ddlRegion").append('<option value="Region ' + i + '">Region ' + i + '</option');
            }
            $("#ddlRegion").append('<option value="Undefined">Undefined</option');
        }
        else {
            $("#ddlRegion").hide();
        }
    };

    $("#txtDate").live('change', function () {
        page_RetailParameterTracking.bindTrackingDailyRetailParameterFTD();
        page_RetailParameterTracking.bindTrackingDailyRetailParameterMTD();
    });

    $("#ddlRetail").live('change', function () {
        page_RetailParameterTracking.bindRegion($(this).val());
        page_RetailParameterTracking.bindTrackingDailyRetailParameterFTD();
        page_RetailParameterTracking.bindTrackingDailyRetailParameterMTD();
    });

    $("#ddlRegion").live('change', function () {
        page_RetailParameterTracking.bindTrackingDailyRetailParameterFTD();
        page_RetailParameterTracking.bindTrackingDailyRetailParameterMTD();
    });

    this.getMonth = function () {
        $.ajax({
            type: "GET",
            url: "/handler/Dashboard.ashx",
            data: { t: "TrackingGetMonth" },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                var html = '';
                for (var i = data.length-1; i >= 0; i--) {
                    html += '<option value="' + data[i].MONTH + '">' + data[i].MONTH + '</option>';
                }
                $("#ddlMonth").append(html);

                page_RetailParameterTracking.bindTrackingMonthlyRetailCustomer();
            }
        });
    };

    this.bindTrackingMonthlyRetailCustomer = function () {
        var month = $("#ddlMonth").val();
        var channel = $("#ddlChannel").val();
        $.ajax({
            type: "GET",
            url: "/handler/Dashboard.ashx",
            data: { month: month, channel: channel, t: "TrackingMonthlyRetailCustomers" },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                $("#tbListStaff").setTemplateURL("/templates/pages/dashboard/retail_parameter_tracking/monthly_customer.htm");
                $("#tbListStaff").processTemplate(data);
            }
        });
    };

    $("#ddlMonth").live('change', function () {
        page_RetailParameterTracking.bindTrackingMonthlyRetailCustomer();
    });
    $("#ddlChannel").live('change', function () {
        page_RetailParameterTracking.bindTrackingMonthlyRetailCustomer();
    });
};