page_ReportView = new function () {
    this.m_tbList = "#tbAccountList";
    this.m_roleId = -1;
    this.documentReady = function (roleId) {
        this.m_roleId = roleId;
        //page_ReportView.bindRoleInfo();
        this.bindData();
    };


    this.bindData = function () {
        Loading.show();
        $.ajax({
            type: "GET",
            url: "/handler/BIReport.ashx",
            data: { id: page_ReportView.m_roleId, t: "GetBiReportInfo" },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                if (data != null) {
                    $('#biReportInfo').attr('src', data.URLReport);
                }
                Loading.close();

            }
        });
    };

}