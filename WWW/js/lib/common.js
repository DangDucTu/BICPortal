/*
Author: hoan.trinh
Create Date: 2010-03-29
Description: các scrip thông dụng thường sử dụng
*/

COMMON = {
    // Hàm convert chuỗi json Datetime sang Date
    jSonToDate: function (value, v45) {

        if ((typeof (v45) == "undefined") || (!v45)) {
            if ((typeof (value) == 'undefined') || (value == null)) {
                return value;
            }
            value = value.replace('/Date(', '');
            value = value.replace(')/', '');
            var expDate = new Date(parseInt(value));
            return expDate;
        } else {
            try {
                value = value.split('T');
                var m_date = value[0].split('-');
                var m_time = value[1].split(':');

                var _year = m_date[0];
                var _month = m_date[1] - 1;
                var _day = m_date[2];

                var _hours = m_time[0];
                var _minutes = m_time[1];
                var _seconds = m_time[2];
                var expDate = new Date(_year, _month, _day, _hours, _minutes, _seconds, 0);
                return expDate;
            } catch (e) {
                return new Date();
            }
        }
    },

    // Hàm Datetime sang chuối ngày tháng
    // expDate: Ngày tháng
    // option:
    //      0: dd/MM/yyyy hh:mm:ss
    //      1: dd/MM/yyyy
    //      2: hh:mm:ss dd/MM/yyyy
    //      3: hh dd/MM/yyyy
    //      4: hh:mm (AM/PM) - dd/MM/yyyy
    //      5: dd/MM/yyy hh:mm
    //      6: dd/MM/yyy hh:mm (PM/AM)
    //      7: hh
    dateToString: function (expDate, option) {
        var _day = expDate.getDate();
        var _month = expDate.getMonth() + 1;
        var _year = expDate.getFullYear();
        var _hour = expDate.getHours();
        var _minute = expDate.getMinutes();
        var _second = expDate.getSeconds();
        var _ap = "AM";
        if (_hour > 11) _ap = "PM";
        if (_day < 10) _day = "0" + _day;
        if (_month < 10) _month = "0" + _month;
        if (_hour < 10) _hour = "0" + _hour;
        if (_minute < 10) _minute = "0" + _minute;
        if (_second < 10) _second = "0" + _second;
        switch (option) {
            case 0:
                return _month + '/' + _day + '/' + _year + ' ' + _hour + ':' + _minute + ':' + _second;
            case 1:
                return _month + '/' + _day + '/' + _year;
            case 2:
                return _hour + ':' + _minute + ':' + _second + ' ' + _month + '/' + _day + '/' + _year;
            case 3:
                return _hour + 'h - ' + _month + '/' + _day + '/' + _year;
            case 4:
                return _hour + ':' + _minute + ' ' + _ap + ' - ' + _month + '/' + _day + '/' + _year;
                //Thang them vao             
            case 5:
                return _hour + ':' + _minute + ':' + _second;
            case 7:
                return _hour;
            case 8:
                return _day + '/' + _month + '/' + _year;
            case 9:
                return _year.toString() + _month.toString() + _day.toString();
            default:
                return expDate.toString();
        }
    },

    // Hàm convert chuỗi json Datetime sang chuối ngày tháng
    // value: chuỗi jSon datetime
    jSonDateToString: function (value, option) {
        if ((typeof (value) == 'undefined') || (value == null)) {
            return value;
        }
        if ((typeof (option) == 'undefined') || (option == null)) {
            option = 0;
        }
        if (value.indexOf('T') > 0) {
            var expDate = COMMON.jSonToDate(value, true);
        }
        else {
            var expDate = COMMON.jSonToDate(value, false);
        }
        return COMMON.dateToString(expDate, option);
    },

    // Hàm lấy xâu con của 1 xâu + phần mở rộng
    // VD: COMMON.subString('hoan.trinh',4,'...') --> return: 'hoan...'
    subString: function (value, length, extend) {
        if ((typeof (value) == 'undefined') || (value == null)) {
            return '';
        }
        if (value.length <= length) {
            return value;
        }
        return value.substr(0, length) + extend;

    },
    subStringMeans: function (value, length, extend) {
        //alert("độ dài:"+value.length +" - cắt:"+length+" - thành:"+extend);
        if ((typeof (value) == 'undefined') || (value == null)) {
            return '';
        }
        if (value.length <= length) {
            return value;
        }
        var _tValue = value.substr(0, length);
        if (value[length] == '')
            _tValue = value.substr(0, length + 1);
        else
            _tValue = _tValue.substr(0, _tValue.lastIndexOf(" "));
        return _tValue + extend;

    },

    // Hàm lấy url từ chuỗi Unicode
    // mục đích: phục vụ cho SEO
    getUrlText: function (plainText) {
        var _URL_CHARS_UNICODE = "AÁÀẠẢÃÂẤẦẬẨẪĂẮẰẶẲẴBCDĐEÉÈẸẺẼÊẾỀỆỂỄFGHIÍÌỊỈĨJKLMNOÓÒỌỎÕÔỐỒỘỔỖƠỚỜỢỞỠPQRSTUÚÙỤỦŨƯỨỪỰỬỮVWXYÝỲỴỶỸZaáàạảãâấầậẩẫăắằặẳẵbcdđeéèẹẻẽêếềệểễfghiíìịỉĩjklmnoóòọỏõôốồộổỗơớờợởỡpqrstuúùụủũưứừựửữvwxyýỳỵỷỹz0123456789_";
        var _URL_CHARS_ANSI = "AAAAAAAAAAAAAAAAAABCDDEEEEEEEEEEEEFGHIIIIIIJKLMNOOOOOOOOOOOOOOOOOOPQRSTUUUUUUUUUUUUVWXYYYYYYZaaaaaaaaaaaaaaaaaabcddeeeeeeeeeeeefghiiiiiijklmnoooooooooooooooooopqrstuuuuuuuuuuuuvwxyyyyyyz0123456789_";
        var _URL_CHARS_BASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_";

        var _strTemp = "";
        var _iLength = plainText.length;

        var _iIndex = 0;

        // Loại bỏ các ký tự có dấu
        for (var i = 0; i < _iLength; i++) {
            iIndex = _URL_CHARS_UNICODE.indexOf(plainText.charAt(i));
            if (iIndex == -1)
                _strTemp += plainText.charAt(i);
            else
                _strTemp += _URL_CHARS_ANSI.charAt(iIndex);
        }
        var _strReturn = "";

        // Loại bỏ các ký tự lạ
        for (var i = 0; i < _iLength; i++) {
            if (_URL_CHARS_BASE.indexOf(_strTemp.charAt(i)) == -1) {
                _strReturn += '-';
            }
            else {
                _strReturn += _strTemp.charAt(i);
            }
        }

        while (_strReturn.indexOf("--") != -1) {
            _strReturn = _strReturn.replace('--', '-');
        }

        if ((_strReturn.length > 0) && (_strReturn.charAt(0) == '-')) {
            _strReturn = _strReturn.substr(1);
        }

        if ((_strReturn.length > 0) && (_strReturn.charAt(_strReturn.length - 1) == '-')) {
            _strReturn = _strReturn.substr(0, _strReturn.length - 1);
        }
        if (_strReturn.length > 60) {
            _iIndex = _strReturn.indexOf('-', 59);
            if (_iIndex != -1) {
                _strReturn = _strReturn.substring(0, _iIndex);
            }
        }
        return _strReturn.toLowerCase();
    },

    // Hàm load file css
    loadcssfile: function (filename) {
        var fileref = document.createElement("link");
        fileref.setAttribute("rel", "stylesheet");
        fileref.setAttribute("type", "text/css");
        fileref.setAttribute("href", filename);
        if (typeof fileref != "undefined")
            document.getElementsByTagName("head")[0].appendChild(fileref);
    },
    // Hàm load file js
    loadScriptFile: function (filename) {
        var fileref = document.createElement('script');
        fileref.setAttribute("type", "text/javascript");
        fileref.setAttribute("src", filename);
        if (typeof fileref != "undefined")
            document.getElementsByTagName("head")[0].appendChild(fileref);
    },

    // Chỉ cho nhập vào các kí tự từ 0 => 9, backspace, del,tab, dấu chấm
    validateDigitQuantity: function (evt) {
        var keyCode = evt.keyCode ? evt.keyCode : evt.which;
        var arrCode = new Array(48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 8, 46, 36, 9, 32);
        if ($.browser.msie) {
            for (var i = 0; i < arrCode.length; i++) {
                if (arrCode[i] == keyCode) {
                    return true;
                    break;
                }
            }
            return false;
        }
        else {
            if (arrCode.indexOf(keyCode) > -1) return true;
            return false;
        }

    },

    // Hàm lấy xâu định dạng theo kiểu tiền tệ: 1234123 --> 1,234,123
    formatMoney: function (argValue) {
        var _comma = (1 / 2 + '').charAt(1);
        var _digit = '.';
        if (_comma == '.') {
            _digit = ',';
        }

        var _sSign = "";
        if (argValue < 0) {
            _sSign = "-";
            argValue = -argValue;
        }

        var _sTemp = "" + argValue;
        var _index = _sTemp.indexOf(_comma);
        var _digitExt = "";
        if (_index != -1) {
            _digitExt = _sTemp.substring(_index + 1);
            _sTemp = _sTemp.substring(0, _index);
        }

        var _sReturn = "";
        while (_sTemp.length > 3) {
            _sReturn = _digit + _sTemp.substring(_sTemp.length - 3) + _sReturn;
            _sTemp = _sTemp.substring(0, _sTemp.length - 3);
        }
        _sReturn = _sSign + _sTemp + _sReturn;
        if (_digitExt.length > 0) {
            _sReturn += _comma + _digitExt;
        }
        return _sReturn;
    },

    formatCurrent: function (num) {
        if (num == null) return "&nbsp;";
        if (num < 1000) return parseFloat(num);

        num = num.toString().replace(/\$|\,/g, '');
        if (isNaN(num))
            num = "0";
        var sign = (num == (num = Math.abs(num)));
        num = Math.floor(num * 100 + 0.50000000001);
        var cents = num % 100;
        num = Math.floor(num / 100).toString();
        if (cents < 10)
            cents = "0" + cents;
        for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
            num = num.substring(0, num.length - (4 * i + 3)) + '.' +
                num.substring(num.length - (4 * i + 3));
        var currency = (((sign) ? '' : '-') + num);
        return currency;
    },

    roundNumber: function (num, length) {
        var newnumber = Math.round(num * Math.pow(10, length)) / Math.pow(10, length);
        return parseFloat(newnumber);
    },

    caculatorTime: function (totalSeconds) {
        if (totalSeconds <= 0)
            return "00 : 00 : 00";
        var hour = parseInt(totalSeconds / 3600);
        var minute = parseInt((totalSeconds - hour * 3600) / 60);
        var second = totalSeconds - hour * 3600 - minute * 60;
        var sHour = '', sMinute = '', sSecond = '';

        if (hour < 10)
            sHour = "0" + hour.toString();
        else sHour = hour.toString();
        if (minute < 10)
            sMinute = "0" + minute.toString();
        else sMinute = minute.toString();
        if (second < 10)
            sSecond = "0" + second.toString();
        else sSecond = second.toString();
        return sHour + " : " + sMinute + " : " + sSecond;
    },

    removeHTMLTags: function (htmlString) {
        if (htmlString) {
            var mydiv = document.createElement("div");
            mydiv.innerHTML = htmlString;

            if (document.all) // IE Stuff
            {
                return mydiv.innerText;
            }
            else // Mozilla does not work with innerText
            {
                return mydiv.textContent;
            }
        }
        return '';
    },

    //Loại bỏ các thẻ HTML
    stripHTML: function (oldString) {
        var newString = "";
        var inTag = false;
        for (var i = 0; i < oldString.length; i++) {
            if (oldString.charAt(i) == '<') inTag = true;
            if (oldString.charAt(i) == '>') {
                if (oldString.charAt(i + 1) == "<") {
                    //dont do anything
                }
                else {
                    inTag = false;
                    i++;
                }
            }
            if (!inTag) newString += oldString.charAt(i);
        }
        return newString;
    },

    //Loại bỏ các ký tự đặc biệt
    replaceSpecialCharsToHtml: function (text) {
        if (text == null) {
            text = "";
        }
        text = text.replace(/\n|\n$/g, "<br/>").replace(/\t|\t$/g, "&nbsp;&nbsp;");
        return text;
    },

    replaceHtmlToSpecialChars: function (text) {
        if (text == null) {
            text = "";
        }
        text = text.replace('/<br\s*\/*>|<br\s*\/*>$/g', "\n").replace(/&nbsp;|&nbsp;$/g, "");
        return text;
    },

    //Display/ Hidden a Tag
    showTag: function (id) {
        $("#" + id).css("display", "");
    },

    hiddenTag: function (id) {
        $("#" + id).css("display", "none");
    },

    isShowTag: function (id) {
        var display = trim($("#" + id).css("display"));
        return (display == "block" || display == "");
    },

    chechWhiteSpace: function (_str) {
        for (var _s = 0; _s < _str.length; _s++) {
            if (_str.charAt(_s) == ' ')
                return false;
        }
        return true;
    },

    specCharacter: function (_Obj, _ListError) {
        var _character = _Obj;
        for (var _index = 0; _index < _character.length; _index++) {
            for (var _s = 0; _s < _ListError.length; _s++) {
                if (_character.charAt(_index) == _ListError.charAt(_s)) {
                    return false;
                }
            }
        }
        return true;
    },

    specCharacterFirst: function (_Obj, _ListError) {
        var _character = _Obj.substring(0, 1);
        for (var _s = 0; _s < _ListError.length; _s++) {
            if (_ListError.charAt(_s) == _character) {
                return false;
            }
        }
        return true;
    },

    specCharacterEnd: function (_Obj, _ListError) {
        var _character = _Obj.substring(_Obj.length - 1, _Obj.length);
        for (var _s = 0; _s < _ListError.length; _s++) {
            if (_ListError.charAt(_s) == _character) {
                return false;
            }
        }
        return true;
    },

    isHiddenTag: function (id) {
        var display = trim($("#" + id).css("display"));
        return (display == "none");
    },

    errorAjax: function (request, error) {
        if (request.status == 0) {
            alert('You are offline!!\n Please Check Your Network.');
        } else if (request.status == 404) {
            alert('Requested URL not found.');
        } else if (request.status == 500) {
            alert('Internel Server Error.');
        } else if (error == 'parsererror') {
            $(window.location).attr('href', '/pages/Login.aspx');
        } else if (error == 'timeout') {
            alert('Request Time out.');
        } else {
            alert('Unknow Error.\n' + request.responseText);
        }
    },

    actionSuccess: function (data) {
        if (eval(data) == 0) { // Trường hợp hết SESSION LOGIN
            $(window.location).attr('href', '/Pages/System/Login.aspx');
            return true;
        }
        else {
            if (eval(data) == -1) {
                jAlert('Có lỗi xảy ra!', null);
                return false;
            }
            else
                return true;
        }
    },

    convertDate: function (expDate) {
        var m_day = expDate.getDate();
        var m_month = expDate.getMonth() + 1;

        if (m_day < 10) m_day = '0' + m_day;
        if (m_month < 10) m_month = '0' + m_month;

        return m_day + '/' + m_month + '/' + expDate.getFullYear();
    },

    convertFormatDate: function (date) {
        // Convert date from dd/mm/yyyy to mm/dd/yyyy;
        var year = date.substring(date.lastIndexOf('/') + 1);
        date = date.substring(0, date.lastIndexOf('/'));
        var month = date.substring(date.lastIndexOf('/') + 1);
        date = date.substring(0, date.lastIndexOf('/'));
        var day = date.substring(date.lastIndexOf('/'));
        var datetime = month + "/" + day + "/" + year;
        return datetime;
    },

    validateDate: function (date) {
        var reDate = /(?:0[1-9]|[12][0-9]|3[01])\/(?:0[1-9]|1[0-2])\/(?:19|20\d{2})/;
        return reDate.test(date);
    },

    setTemplatePopup: function (divPopup) {
        try {
            var top = (($(window).height() / 2) - ($(divPopup).outerHeight() / 2));
            var left = (($(window).width() / 2) - ($(divPopup).outerWidth() / 2));
            if (top < 0) top = 0;
            if (left < 0) left = 0;
            // IE6 fix
            if ($.browser.msie && parseInt($.browser.version) <= 6) top = top + $(window).scrollTop();

            $(divPopup).css({
                top: top + 'px',
                left: left + 'px'
            });
            $(divPopup).draggable({ handle: $(divPopup + " .barpopup"),
                start: function (event, ui) { }
            });
            $(divPopup + " .barpopup").css({ cursor: 'move' });
            $(".popupclosebutton").hover(function () {
                $(this).addClass('closebutton_hover');
            },
            function () {
                $(this).removeClass('closebutton_hover');
            });

        } catch (e) { /* requires jQuery UI draggables */ }

    },
    setTemplateAction: function () {
        $(".aContextFunction").click(function () {
            var m_div = $(".divContextFunction", $(this).parent());
            $(m_div).css("left", $(this).offset().left + "px");
            $(m_div).css("top", $(this).offset().top + 30 + "px");
            var cur = $(m_div).is(':visible');
            $('.divContextFunction:visible').hide();
            if (cur)
                $(m_div).hide();
            else
                $(m_div).show();
        });
        $(document).click(function (event) {
            if ($('.divContextFunction').is(':visible') && !$(event.target).closest(".aContextFunction").size()) {
                $('.divContextFunction').hide();
            }
        });
    },
    convertStatus: function (status) {
        if (status == 0)
            return "Đã khóa";
        if (status == 1)
            return "Hoạt động";
        if (status == 2)
            return "Đã xóa";
        return '';
    },

    getRowStyle: function (iIndex) {
        if (iIndex % 2 == 0) {
            return "even";
        }
        return "odd";
    },
    getStyleByStatus: function (status) {
        if (status == 'On Time')
            return 'text-green';
        else if (status == 'Delay')
            return 'text-yellow';
        else if (status == 'Pending')
            return 'text-red';
    },

    // So sánh 2 ngày tháng có định dạng dd/MM/yyyy
    DateCompare: function (date1Str, date2Str) {
        var dtCh = "/";
        var pos1 = date1Str.indexOf(dtCh);
        var pos2 = date1Str.indexOf(dtCh, pos1 + 1);
        var strDay = date1Str.substring(0, pos1);
        var strMonth = date1Str.substring(pos1 + 1, pos2);
        var strYear = date1Str.substring(pos2 + 1);
        var date1 = new Date(strYear, strMonth, strDay);
        pos1 = date2Str.indexOf(dtCh);
        pos2 = date2Str.indexOf(dtCh, pos1 + 1);
        strDay = date2Str.substring(0, pos1);
        strMonth = date2Str.substring(pos1 + 1, pos2);
        strYear = date2Str.substring(pos2 + 1);
        var date2 = new Date(strYear, strMonth, strDay);
        if (date1 > date2) {
            return false;
        }
        else {
            return true;
        }
    }
};

// Hủy bỏ việc submit khi enter
$('input').live('keypress', function (event) {
    return event.keyCode != 13;
});

// thêm hàm indexOf cho IE
if (!Array.indexOf) {
    Array.prototype.indexOf = function (obj, start) {
        start = (start == null) ? 0 : start;
        for (var i = start; i < this.length; i++)
            if (this[i] == obj) {
                return i;
            }
        return -1;
    };
};