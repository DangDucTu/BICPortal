//-----------------------------------------------------------
// Author:      hoan.trinh
// Create Date: 2010-07-14
// Description: Popup Loading
//-----------------------------------------------------------

Loading = {
    m_idLoading: "__divLoading",
    m_idLoadingProcess: 'divLoadingProcess',
    show: function () {
        if ($("#" + this.m_idLoadingProcess).length == 0) {
            $("body").append('<div id="' + this.m_idLoadingProcess + '"></div>');
            var html = '<div style="position: fixed; z-index: 99998; top: 0px; left: 0px; width: 100%; height: 1970px; background: #000; filter: alpha(opacity=40); opacity: 0.4;"></div>'
            + '<div style="background:#FFF; padding:10px; float:right; position:fixed; z-index:99999; top:0; right:0; font-weight:bold"><img src="/images/loading.gif" style="width:16px; margin-right:5px; float:left" />Đang xử lý...</div>';
            $("#" + this.m_idLoadingProcess).html(html);
        }
        else {
            $("#" + this.m_idLoadingProcess).show();
        }
    },
    close : function() {
        if ($("#" + this.m_idLoadingProcess).length != 0) {
            $("#" + this.m_idLoadingProcess).hide();
        }
    },

    showProcess: function () {
        if ($("#" + this.m_idLoadingProcess).length == 0) {
            $("body").append('<div id="' + this.m_idLoadingProcess + '"></div>');
            var html = '<div style="position: fixed; z-index: 99998; top: 0px; left: 0px; width: 100%; height: 1970px; background: #000; filter: alpha(opacity=40); opacity: 0.4;"></div>'
            + '<div style="background:#FFF; padding:10px; float:right; position:fixed; z-index:99999; top:0; right:0; font-weight:bold"><img src="/images/loading.gif" style="width:16px; margin-right:5px; float:left" />Đang xử lý...</div>';
            $("#" + this.m_idLoadingProcess).html(html);
        }
        else {
            $("#" + this.m_idLoadingProcess).show();
        }
    },
    closeProcess: function () {
        if ($("#" + this.m_idLoadingProcess).length != 0) {
            $("#" + this.m_idLoadingProcess).hide();
        }
    },

     showLoadingBar : function (m_selparentId, m_left, m_top) {
        if ($("#" + this.m_idLoading, m_selparentId).length == 0) {
            $(m_selparentId).append('<img class="hotsymboltp" id=' + this.m_idLoading + ' style="position:absolute;"  alt="Loading..." src="/images/loading_bar.gif" />');

            var offset = $(m_selparentId).offset();
            var top = offset.top + ($(m_selparentId).outerHeight() / 3) - m_top;
            var left = offset.left + ($(m_selparentId).outerWidth() / 2) - m_left;
            if (top < 0) top = 0;
            if (left < 0) left = 0;
            // IE6 fix
            if ($.browser.msie && parseInt($.browser.version) <= 6) top = top + $(window).scrollTop();
            $("#" + this.m_idLoading).css({
                top: top + 'px',
                left: left + 'px'
            });
        }
    },
    closeLoadingBar : function (m_selparentId) {
        if ($("#" + this.m_idLoading, m_selparentId).length != 0) {
            $("#" + this.m_idLoading, m_selparentId).remove();
        }
    }
}