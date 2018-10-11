page_SmeIncentive = new function () {
    Number.prototype.format = function (n, x, s, c) {
        var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
        num = this.toFixed(Math.max(0, ~ ~n));

        if (num == 0) return "-";

        return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ',')).replace('.00', '');
    };

    this.documentReady = function () {
        this.binOverview();
        this.bindIncentiveByMonth();

        this.bindIncentiveTopSaleman("Point Incentive");
        this.bindIncentiveTopSaleman("Increasing Point Incentive");
    };

    $("#ctl00_ContentPlaceHolder1_ddlMonth").live('change', function () {
        page_SmeIncentive.binOverview();
        page_SmeIncentive.bindIncentiveTopSaleman("Point Incentive");
        page_SmeIncentive.bindIncentiveTopSaleman("Increasing Point Incentive");
    });

    this.binOverview = function () {
        year = $("#ddlYear").val();
        month = $("#ctl00_ContentPlaceHolder1_ddlMonth").val();

        $.ajax({
            type: "GET",
            url: "/handler/Dashboard.ashx",
            data: { year: year, month: month, t: 'SmeIncentiveOverview' },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                if (data != null) {
                    var incentive = '';
                    var salesman = '';
                    var eligibleSalesman = '';

                    $("#overview1").html(data.YTMIncentive.format(2, 3, ',', '.'));
                    if (data.Incentive > 0)
                        incentive = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAED0lEQVRIia2R60+TBxSHz+ctS5q4OCc4kSEIhbaUVlFaW1pQLoIoE53OZJlGxSsDNWiEiIooKkVFoUEF5NqWt31dxfskTgQMapWhZsu2bH/Jsw9lThcW7eYvOR/P8/xyjkgkaZE2cQvSIm0R7b0r3OJfzIVQOzM7ot6zpEXaMlUn3gmVugcuDg2dQNure0+SFmmzqw48z/1UDtZQ6F/LzsFKDj08gcFn+p+SSXjfc4UtNyvID6whRy1hqfoF625upnq0Dr0vDXFLQFyieXewSzTSIoN21UHfC4XNt8rJDZSwJFCMM7ASp78IZ2A5a25s5MBoLXqfEXFL6N0kLtGIW0J21UHXhJf110rJUUvICqzE4S/CrhRiUwqw+Zdh9xeQf3UNlSM16L1GpOltkkl4puqke8L3BjzTX4RNKcCq5GNRcrEouVj9udgC+SwbWM2+0RoMvUbEJSE5OJXkNXjHeB/rBjaRp64mO1CM4xU8j4z+HEw+BwaPFaN3MaZ+OwsUB1nB5ewZqSK1Kw05/k/JJNyhZtH5o4f1A6Usu/IlOeoqDL024i6n8cnFBDStMWhaY5h2MZbpbXP5tCOB6M5EZndrie1NYZ43jXV3N5BwMQk5/LrELSHnlSyUl0FcY81Uj9Txze0dfH17Gx82R/NBcxQfuWehuRDDx5c+Z0Z7PFGvwDo2399F6VAZWx98y/bhcnaMVJDYmoxUS+gvAVPN0bEGotu0b8I74onuTCSmJ5m4PgPzfEa2DZcjtYIcFqRGkGpBDgiyX/j3h7uFukcuPmvXoWn9Gz6rK4k5PSnEe1JJ6jehCyyg7OGeMDiiNAvHHjcy57KBaZdimdEebj6nJ4V4bypaxYxeTccUtLD70b5w64hyVjj++DRxXUamt88lqjORmMnmWsWMQV2IOWhl0bVM9oWq3nKOqdIo1D85Q3yPiZmXE5jdrSWuz0BSvwm9mo45aCXjeib2W9lUPTuI7I1UcFI4GTpLYu98ojsTie3VMc9nRBdYgCloYdG1MHzJ3TwOTRxBKiIVHBNOPW1C60lndncycz0GtIoZ45VFpA/YsN3KIvtuLvk/FHL0ZR2yK1JBrdDw9Bwp3oWT7dPQBdIxX7ViueHAeSeHvHsFrHhQTP3P9ci2SAU1QsOzc+h9GcT16UnqN5H6qn02SwfzKRwqYtVoCQ2/nEK2RCqoElzPzmPotxDvSSXZP5+07yxkXM/EcWcpefcKWDlczNqxtZz+rRHZGKlgv9A4fp5UxUqCN/xcc9CK9YaT7O9zKbi/nFWjJax//BVNv59BNkQq2Cs0jjdTNlxJ6VAZO0d3UzFWSeWTA1SP13DkRS3Hf6qn8VcX5/9o+g+CckHKBNkpyHZBtkr4zpskfI4NU8wU+RPF5q1O9W+XiQAAAABJRU5ErkJggg=="/>&nbsp;' + data.Incentive.format(2, 3, ',', '.');
                    else incentive = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAACyklEQVRIia3UyU8aYRjHcf6EOTIL4gLIIiYVEVNcSCyS3tQILhAbOlIgbml68dB6Fv0juCuCt95q7ZIeGsUNBEGWItBqbdJLD738egDGEUcj2Dd5jvP5PnnfZEQigbMpFoM/IbEYIZK8c4ScW8+mWAwsLt9r/r72IVhvID3tQZp1I826kWHdyDx/gWxlnC5knS7kV1YRpKjaAqFy4MjhQMThQMRuR9Rux/HkZGkmJhArz9lqPQGSBBaXOTgqAMfHxxEfG0N+ZQUb9Qa4rScmOLwCn4yN4cRmQ8Hne0CAv3UVnChPwefDBk3XF7iB22wcnrRakbRaUVxerj0QLAeuXUkVnBweRsJiQXFp6QGBMh4fGUHUZEKkowNHKhUOpVIcNTUh2tyMnMuFQM0Biiq9gcWCfa0WuzSNPYkEBw0NOGxsRKSMx2QynLnd9Qd2KEoQP25pQUwmw4lcjoLHgwDD3B7g/0+CJIkgRaES2KVp7DEM9oVwhQLJ1lYUvV4EGAbrAlMJhHd6BwT/M+EKLpUK4qcqFf68enPju6/9ZqzRdFgkEolEfoIgQiQZ/mx4jOwzFrHObsQf6ZHQGUpXw3tQPp5SqZBWq/GjfwDnpie4MD/F77mX+NJrwhrDhP0EQXDX5CcIIkhR4Xc6HWLDw9iVSq+2b2y8wuVybvO0Wo1sWxty7e3I63T4ybL41NNzE6+ObHV2Iulw4FCtxgHvauJyORIKBU6Vymt4wWjE5czM3Tg/EqCo8JZej9TUFKJtbdevRqlESqVCRqPBN622Nrw68r6rC9npaSR6egS3Lw4O4tfCQgXfuhdeFQltGwzIuVxI9fVxD5vRaJA3m3E5P1/CJRL/veHqE6Ao/7bBgLzHg9zQENJqNYqjo7iYm3s4zo986O5G0evFd5bF+ewsPhqN/wfnIjTtf6vRIOt0YkuvxxpN/z+cH1lnmJrxfwHV7O+xEnXIAAAAAElFTkSuQmCC"/>&nbsp;' + data.Incentive * (-1);

                    $("#overview2").html(incentive);

                    if (data.Salesman > 0)
                        salesman = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAED0lEQVRIia2R60+TBxSHz+ctS5q4OCc4kSEIhbaUVlFaW1pQLoIoE53OZJlGxSsDNWiEiIooKkVFoUEF5NqWt31dxfskTgQMapWhZsu2bH/Jsw9lThcW7eYvOR/P8/xyjkgkaZE2cQvSIm0R7b0r3OJfzIVQOzM7ot6zpEXaMlUn3gmVugcuDg2dQNure0+SFmmzqw48z/1UDtZQ6F/LzsFKDj08gcFn+p+SSXjfc4UtNyvID6whRy1hqfoF625upnq0Dr0vDXFLQFyieXewSzTSIoN21UHfC4XNt8rJDZSwJFCMM7ASp78IZ2A5a25s5MBoLXqfEXFL6N0kLtGIW0J21UHXhJf110rJUUvICqzE4S/CrhRiUwqw+Zdh9xeQf3UNlSM16L1GpOltkkl4puqke8L3BjzTX4RNKcCq5GNRcrEouVj9udgC+SwbWM2+0RoMvUbEJSE5OJXkNXjHeB/rBjaRp64mO1CM4xU8j4z+HEw+BwaPFaN3MaZ+OwsUB1nB5ewZqSK1Kw05/k/JJNyhZtH5o4f1A6Usu/IlOeoqDL024i6n8cnFBDStMWhaY5h2MZbpbXP5tCOB6M5EZndrie1NYZ43jXV3N5BwMQk5/LrELSHnlSyUl0FcY81Uj9Txze0dfH17Gx82R/NBcxQfuWehuRDDx5c+Z0Z7PFGvwDo2399F6VAZWx98y/bhcnaMVJDYmoxUS+gvAVPN0bEGotu0b8I74onuTCSmJ5m4PgPzfEa2DZcjtYIcFqRGkGpBDgiyX/j3h7uFukcuPmvXoWn9Gz6rK4k5PSnEe1JJ6jehCyyg7OGeMDiiNAvHHjcy57KBaZdimdEebj6nJ4V4bypaxYxeTccUtLD70b5w64hyVjj++DRxXUamt88lqjORmMnmWsWMQV2IOWhl0bVM9oWq3nKOqdIo1D85Q3yPiZmXE5jdrSWuz0BSvwm9mo45aCXjeib2W9lUPTuI7I1UcFI4GTpLYu98ojsTie3VMc9nRBdYgCloYdG1MHzJ3TwOTRxBKiIVHBNOPW1C60lndncycz0GtIoZ45VFpA/YsN3KIvtuLvk/FHL0ZR2yK1JBrdDw9Bwp3oWT7dPQBdIxX7ViueHAeSeHvHsFrHhQTP3P9ci2SAU1QsOzc+h9GcT16UnqN5H6qn02SwfzKRwqYtVoCQ2/nEK2RCqoElzPzmPotxDvSSXZP5+07yxkXM/EcWcpefcKWDlczNqxtZz+rRHZGKlgv9A4fp5UxUqCN/xcc9CK9YaT7O9zKbi/nFWjJax//BVNv59BNkQq2Cs0jjdTNlxJ6VAZO0d3UzFWSeWTA1SP13DkRS3Hf6qn8VcX5/9o+g+CckHKBNkpyHZBtkr4zpskfI4NU8wU+RPF5q1O9W+XiQAAAABJRU5ErkJggg=="/>&nbsp;' + data.Salesman.format(2, 3, ',', '.');
                    else salesman = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAACyklEQVRIia3UyU8aYRjHcf6EOTIL4gLIIiYVEVNcSCyS3tQILhAbOlIgbml68dB6Fv0juCuCt95q7ZIeGsUNBEGWItBqbdJLD738egDGEUcj2Dd5jvP5PnnfZEQigbMpFoM/IbEYIZK8c4ScW8+mWAwsLt9r/r72IVhvID3tQZp1I826kWHdyDx/gWxlnC5knS7kV1YRpKjaAqFy4MjhQMThQMRuR9Rux/HkZGkmJhArz9lqPQGSBBaXOTgqAMfHxxEfG0N+ZQUb9Qa4rScmOLwCn4yN4cRmQ8Hne0CAv3UVnChPwefDBk3XF7iB22wcnrRakbRaUVxerj0QLAeuXUkVnBweRsJiQXFp6QGBMh4fGUHUZEKkowNHKhUOpVIcNTUh2tyMnMuFQM0Biiq9gcWCfa0WuzSNPYkEBw0NOGxsRKSMx2QynLnd9Qd2KEoQP25pQUwmw4lcjoLHgwDD3B7g/0+CJIkgRaES2KVp7DEM9oVwhQLJ1lYUvV4EGAbrAlMJhHd6BwT/M+EKLpUK4qcqFf68enPju6/9ZqzRdFgkEolEfoIgQiQZ/mx4jOwzFrHObsQf6ZHQGUpXw3tQPp5SqZBWq/GjfwDnpie4MD/F77mX+NJrwhrDhP0EQXDX5CcIIkhR4Xc6HWLDw9iVSq+2b2y8wuVybvO0Wo1sWxty7e3I63T4ybL41NNzE6+ObHV2Iulw4FCtxgHvauJyORIKBU6Vymt4wWjE5czM3Tg/EqCo8JZej9TUFKJtbdevRqlESqVCRqPBN622Nrw68r6rC9npaSR6egS3Lw4O4tfCQgXfuhdeFQltGwzIuVxI9fVxD5vRaJA3m3E5P1/CJRL/veHqE6Ao/7bBgLzHg9zQENJqNYqjo7iYm3s4zo986O5G0evFd5bF+ewsPhqN/wfnIjTtf6vRIOt0YkuvxxpN/z+cH1lnmJrxfwHV7O+xEnXIAAAAAElFTkSuQmCC"/>&nbsp;' + data.Salesman * (-1);

                    $("#overview3").html(salesman);

                    if (data.EligibleSalesman > 0)
                        eligibleSalesman = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAED0lEQVRIia2R60+TBxSHz+ctS5q4OCc4kSEIhbaUVlFaW1pQLoIoE53OZJlGxSsDNWiEiIooKkVFoUEF5NqWt31dxfskTgQMapWhZsu2bH/Jsw9lThcW7eYvOR/P8/xyjkgkaZE2cQvSIm0R7b0r3OJfzIVQOzM7ot6zpEXaMlUn3gmVugcuDg2dQNure0+SFmmzqw48z/1UDtZQ6F/LzsFKDj08gcFn+p+SSXjfc4UtNyvID6whRy1hqfoF625upnq0Dr0vDXFLQFyieXewSzTSIoN21UHfC4XNt8rJDZSwJFCMM7ASp78IZ2A5a25s5MBoLXqfEXFL6N0kLtGIW0J21UHXhJf110rJUUvICqzE4S/CrhRiUwqw+Zdh9xeQf3UNlSM16L1GpOltkkl4puqke8L3BjzTX4RNKcCq5GNRcrEouVj9udgC+SwbWM2+0RoMvUbEJSE5OJXkNXjHeB/rBjaRp64mO1CM4xU8j4z+HEw+BwaPFaN3MaZ+OwsUB1nB5ewZqSK1Kw05/k/JJNyhZtH5o4f1A6Usu/IlOeoqDL024i6n8cnFBDStMWhaY5h2MZbpbXP5tCOB6M5EZndrie1NYZ43jXV3N5BwMQk5/LrELSHnlSyUl0FcY81Uj9Txze0dfH17Gx82R/NBcxQfuWehuRDDx5c+Z0Z7PFGvwDo2399F6VAZWx98y/bhcnaMVJDYmoxUS+gvAVPN0bEGotu0b8I74onuTCSmJ5m4PgPzfEa2DZcjtYIcFqRGkGpBDgiyX/j3h7uFukcuPmvXoWn9Gz6rK4k5PSnEe1JJ6jehCyyg7OGeMDiiNAvHHjcy57KBaZdimdEebj6nJ4V4bypaxYxeTccUtLD70b5w64hyVjj++DRxXUamt88lqjORmMnmWsWMQV2IOWhl0bVM9oWq3nKOqdIo1D85Q3yPiZmXE5jdrSWuz0BSvwm9mo45aCXjeib2W9lUPTuI7I1UcFI4GTpLYu98ojsTie3VMc9nRBdYgCloYdG1MHzJ3TwOTRxBKiIVHBNOPW1C60lndncycz0GtIoZ45VFpA/YsN3KIvtuLvk/FHL0ZR2yK1JBrdDw9Bwp3oWT7dPQBdIxX7ViueHAeSeHvHsFrHhQTP3P9ci2SAU1QsOzc+h9GcT16UnqN5H6qn02SwfzKRwqYtVoCQ2/nEK2RCqoElzPzmPotxDvSSXZP5+07yxkXM/EcWcpefcKWDlczNqxtZz+rRHZGKlgv9A4fp5UxUqCN/xcc9CK9YaT7O9zKbi/nFWjJax//BVNv59BNkQq2Cs0jjdTNlxJ6VAZO0d3UzFWSeWTA1SP13DkRS3Hf6qn8VcX5/9o+g+CckHKBNkpyHZBtkr4zpskfI4NU8wU+RPF5q1O9W+XiQAAAABJRU5ErkJggg=="/>&nbsp;' + data.EligibleSalesman.format(2, 3, ',', '.');
                    else eligibleSalesman = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAACyklEQVRIia3UyU8aYRjHcf6EOTIL4gLIIiYVEVNcSCyS3tQILhAbOlIgbml68dB6Fv0juCuCt95q7ZIeGsUNBEGWItBqbdJLD738egDGEUcj2Dd5jvP5PnnfZEQigbMpFoM/IbEYIZK8c4ScW8+mWAwsLt9r/r72IVhvID3tQZp1I826kWHdyDx/gWxlnC5knS7kV1YRpKjaAqFy4MjhQMThQMRuR9Rux/HkZGkmJhArz9lqPQGSBBaXOTgqAMfHxxEfG0N+ZQUb9Qa4rScmOLwCn4yN4cRmQ8Hne0CAv3UVnChPwefDBk3XF7iB22wcnrRakbRaUVxerj0QLAeuXUkVnBweRsJiQXFp6QGBMh4fGUHUZEKkowNHKhUOpVIcNTUh2tyMnMuFQM0Biiq9gcWCfa0WuzSNPYkEBw0NOGxsRKSMx2QynLnd9Qd2KEoQP25pQUwmw4lcjoLHgwDD3B7g/0+CJIkgRaES2KVp7DEM9oVwhQLJ1lYUvV4EGAbrAlMJhHd6BwT/M+EKLpUK4qcqFf68enPju6/9ZqzRdFgkEolEfoIgQiQZ/mx4jOwzFrHObsQf6ZHQGUpXw3tQPp5SqZBWq/GjfwDnpie4MD/F77mX+NJrwhrDhP0EQXDX5CcIIkhR4Xc6HWLDw9iVSq+2b2y8wuVybvO0Wo1sWxty7e3I63T4ybL41NNzE6+ObHV2Iulw4FCtxgHvauJyORIKBU6Vymt4wWjE5czM3Tg/EqCo8JZej9TUFKJtbdevRqlESqVCRqPBN622Nrw68r6rC9npaSR6egS3Lw4O4tfCQgXfuhdeFQltGwzIuVxI9fVxD5vRaJA3m3E5P1/CJRL/veHqE6Ao/7bBgLzHg9zQENJqNYqjo7iYm3s4zo986O5G0evFd5bF+ewsPhqN/wfnIjTtf6vRIOt0YkuvxxpN/z+cH1lnmJrxfwHV7O+xEnXIAAAAAElFTkSuQmCC"/>&nbsp;' + data.EligibleSalesman * (-1);

                    $("#overview4").html(eligibleSalesman);
                }
            }
        });
    };

    this.bindIncentiveByMonth = function () {
        year = $("#ddlYear").val();
        $.ajax({
            type: "GET",
            url: "/handler/Dashboard.ashx",
            data: { year: year, t: "SmeIncentiveByMonth" },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                $("#tbIncentiveByMonth").setTemplateURL("/templates/pages/dashboard/sme-incentive/by-month.htm");
                $("#tbIncentiveByMonth").processTemplate(data);

                $(".percent").append('%');
            }
        });
    };

    this.bindIncentiveTopSaleman = function (by) {
        year = $("#ddlYear").val();
        month = $("#ctl00_ContentPlaceHolder1_ddlMonth").val();
        var wrapper = "#tbTopByPoint";
        $.ajax({
            type: "GET",
            url: "/handler/Dashboard.ashx",
            data: { year: year, month: month, by: by, t: "SmeIncentiveTopSaleman" },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                if (by == "Increasing Point Incentive")
                    wrapper = "#tbTopByIncreasingPoint";

                $(wrapper).setTemplateURL("/templates/pages/dashboard/sme-incentive/top-saleman.htm");
                $(wrapper).processTemplate(data);
            }
        });
    };

    this.getClass = function (index, value) {
        if (index==3 && value > 0) return 'percent';
    };
};