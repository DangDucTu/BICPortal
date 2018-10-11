page_TATCeo = new function () {

    Number.prototype.format = function (n, x, s, c) {
        var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
        num = this.toFixed(Math.max(0, ~ ~n));

        return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
    };

    this.documentReady = function () {
        for (type = 1; type <= 6; type++) {
            this.getApplicationByProduct(type, "");
            this.getApplication(type, "");

            this.getApplicationByProduct(type, "Ers");
            this.getApplication(type, "Ers");
        }
        this.getSla();
    };

    this.getApplication = function (type, t) {
        $.ajax({
            type: "GET",
            url: "/handler/Dashboard.ashx",
            data: { type: type, t: "TATApplication" + t },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                if (type == 5 || type == 6) {
                    $("#tbApplication" + t + type).setTemplateURL("/templates/pages/dashboard/tat_ceo/application_rate.htm");
                    $("#tbApplication" + t + type).processTemplate(data);
                }
                else {
                    $("#tbApplication" + t + type).setTemplateURL("/templates/pages/dashboard/tat_ceo/application.htm");
                    $("#tbApplication" + t + type).processTemplate(data);
                }
            }

        });
    };

    this.getApplicationByProduct = function (type, t) {
        $.ajax({
            type: "GET",
            url: "/handler/Dashboard.ashx",
            data: { type: type, t: "TATApplicationByProduct" + t },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                if (type == 5 || type == 6) {
                    $("#tbApplicationByProduct" + t + type).setTemplateURL("/templates/pages/dashboard/tat_ceo/application_rate.htm");
                    $("#tbApplicationByProduct" + t + type).processTemplate(data);
                }
                else {
                    $("#tbApplicationByProduct" + t + type).setTemplateURL("/templates/pages/dashboard/tat_ceo/application.htm");
                    $("#tbApplicationByProduct" + t + type).processTemplate(data);
                }
            }

        });
    };

    this.getSla = function () {
        $.ajax({
            type: "GET",
            url: "/handler/Dashboard.ashx",
            data: { t: "TATSla" },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                $("#tbListSla").setTemplateURL("/templates/pages/dashboard/tat_ceo/sla.htm");
                $("#tbListSla").processTemplate(data);
            }

        });
    };

    $(".tat-tab li").live('click', function () {
        $(".tat-tab li").removeClass("active");
        $(this).addClass("active");

        var tab = $(this).html();
        switch (tab) {
            case "Application - Including Resubmission":
            case "Hồ sơ - Bao gồm trình lại":
                $(".app-resubmit").slideUp('slow');
                $(".tat-turn").slideUp('slow');
                $(".sla").slideUp('slow');
                $(".application").slideDown('slow');
                break;
            case "Application - Excluding Resubmission":
            case "Hồ sơ - Không bao gồm trình lại":
                $(".application").slideUp('slow');
                $(".tat-turn").slideUp('slow');
                $(".sla").slideUp('slow');
                $(".app-resubmit").slideDown('slow');
                break;
            case "TTD":
            case "Thời gian giải ngân":
                $(".app-resubmit").slideUp('slow');
                $(".application").slideUp('slow');
                $(".sla").slideUp('slow');
                $(".tat-turn").slideDown('slow');
                break;
            case "SLA":
                $(".app-resubmit").slideUp('slow');
                $(".application").slideUp('slow');
                $(".tat-turn").slideUp('slow');
                $(".sla").slideDown('slow');
                break;
        }
    });

    $(".box-child p.title").live('click', function () {
        $("#" + $(this).parent().attr("id") + " .box-child-content").toggle('slow');
    });
};