Pages_Search_Global = function (m_htmlTagSearch, m_ParamsName, m_handler, m_t, m_divList, m_template, m_divPaging, m_objSearchName, m_pageSize20_null, m_cbxAll_null, m_btnSearch_null, m_btnChangeSize_null, m_spTotalRecord_null, m_callBackFuntion_null) {
    this.htmlTagSearch = m_htmlTagSearch;
    this.ParamsName = m_ParamsName;
    this.ParamsVal = new Array();
    this.handler = m_handler;
    this.t = m_t;
    this.cbxAll = typeof (m_cbxAll_null) == 'undefined' ? ".checkall" : m_cbxAll_null;
    this.template = m_template;
    this.divPaging = m_divPaging;
    this.divList = m_divList;
    this.objSearchName = m_objSearchName;
    this.pageSize = typeof (m_pageSize20_null) == 'undefined' ? 20 : m_pageSize20_null;
    this.m_objPaging = new VtcPaging(this.divPaging, this.objSearchName + ".bindData", "pagingCss", this.pageSize, CONSTANT.PAGE_DISPLAY);
    this.btnSearch = typeof (m_btnSearch_null) == 'undefined' ? "#btnSearch" : m_btnSearch_null;
    this.btnChangeSize = typeof (m_btnChangeSize_null) == 'undefined' ? "#selPagesize" : m_btnChangeSize_null;
    this.spTotalRecord = typeof (m_spTotalRecord_null) == 'undefined' ? "#spTotalRecord" : m_spTotalRecord_null;
    this.callBackFuntion = typeof (m_callBackFuntion_null) == 'undefined' ? null : m_callBackFuntion_null;
    var objCurrent = this;
    this.documentReady = function () {
        this.getOptionSearch();
        this.bindData(this.m_objPaging.currentPage, this.m_objPaging.pageSize);
    };
    this.getOptionSearch = function () {
        for (var i = 0; i < this.htmlTagSearch.length; i++) {
            if (this.htmlTagSearch[i].indexOf('var_') == 0) {
                if (this.htmlTagSearch[i].length > 4)
                    this.ParamsVal[i] = this.htmlTagSearch[i].substring(4);
                else
                    this.ParamsVal[i] = '';

            } else
                this.ParamsVal[i] = $(this.htmlTagSearch[i]).val();
        }
    }
    this.bindData = function (_cur, _ps) {
        Loading.show();
        var m_data = new Object();
        for (var i = 0; i < this.htmlTagSearch.length; i++) {
            m_data[this.ParamsName[i]] = this.ParamsVal[i];
        }
        m_data["t"] = this.t;
        m_data["currentPage"] = _cur;
        m_data["pageSize"] = _ps;
        $.ajax({
            type: "GET",
            url: this.handler,
            data: m_data,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                var totalPage = 1;
                totalPage = Math.floor((data.TotalRecord - 1) / _ps) + 1;
                if (totalPage <= 0)
                    totalPage = 1;
                if (_cur > totalPage) {
                    objCurrent.bindData(_cur - 1, _ps);
                    return;
                }
                objCurrent.processData(data, _cur);
                Loading.close();
            }
        });
    };

    this.processData = function (_data, _cur) {
        $(this.cbxAll).attr("checked", false);
        $(this.spTotalRecord).html('(' + _data.TotalRecord + ')');
        $(this.divList).setTemplateURL(this.template);
        $(this.divList).processTemplate(_data);
        try {
            this.m_objPaging.bindPaging(_cur, _data.TotalRecord);
        } catch (e) {

        }
        if (_data.TotalRecord <= this.m_objPaging.pageSize) {
            $("#" + this.divPaging).attr('style', 'display:none');
        }
        else {
            $("#" + this.divPaging).attr('style', 'display:block');
        };
        if (this.callBackFuntion != null) {
            this.callBackFuntion();
        }
    };
    $(this.btnSearch).live('click', function () {
        objCurrent.getOptionSearch();
        objCurrent.bindData(1, objCurrent.m_objPaging.pageSize);
    });

    $(this.btnChangeSize).live('change', function () {
        $(this).val();
        objCurrent.getOptionSearch();
        objCurrent.bindData(1, $(this).val());
    });
}