FValidate = {
    ftype: {
        fempty: "fempty",
        femail: "femail",
        fnumber: "fnumber",
        fuint: "fuint",
        fint: "fint"
    },
    showError: function (control, _ftype) {
        if ($(control).length == 0) return;
        var fmessage = '';
        switch (_ftype) {
            case FValidate.ftype.fempty:
                fmessage = $(control).attr(FValidate.ftype.fempty);
                if (fmessage == '') fmessage = "Thông tin không được rỗng";
                break;
            case FValidate.ftype.femail:
                fmessage = $(control).attr(FValidate.ftype.femail);
                if (fmessage == '') fmessage = "Email không đúng định dạng!";
                break;
            case FValidate.ftype.fuint:
                fmessage = $(control).attr(FValidate.ftype.fuint);
                if (fmessage == '') fmessage = "Thông tin là một số nguyên dương!";
                break;
            case FValidate.ftype.fint:
                fmessage = $(control).attr(FValidate.ftype.fint);
                if (fmessage == '') fmessage = "Thông tin là một số nguyên!";
                break;
            case FValidate.ftype.fnumber:
                fmessage = $(control).attr(FValidate.ftype.fnumber);
                if (fmessage == '') fmessage = "Thông tin là một số!";
                break;
            default:
        }

        var inpId = $(control)[0].id;
        if (!$(control).hasClass('error'))
            $(control).addClass('error');
        if ($("span[ffor='" + inpId + "']", $(control).parent()).length > 0) {
            $("span[ffor='" + inpId + "']", $(control).parent()).remove();
        }
        if ($("span[ffor='" + inpId + "']", $(control).parent()).length == 0) {
            $(control).after('<span class="message-error" ffor="' + inpId + '">' + fmessage + '</span>');
        }
    },
    hideError: function (control) {
        if ($(control).length == 0) return;
        var inpId = $(control)[0].id;
        if ($(control).hasClass('error'))
            $(control).removeClass('error');
        if ($("span[ffor='" + inpId + "']", $(control).parent()).length > 0) {
            $("span[ffor='" + inpId + "']", $(control).parent()).remove();
        }
    },

    // Kiểm tra giá trị của Control rỗng
    isEmpty: function (control) {
        if ($(control).length == 0) return false;
        var _isValid = true;

        if (FValidate._isEmpty(control)) {
            _isValid = false;
            FValidate.showError(control, FValidate.ftype.fempty);

        } else {
            FValidate.hideError(control);
        }
        return _isValid;
    },

    // Kiểm tra giá trị của Control là Email
    isEmail: function (control) {
        if ($(control).length == 0) return false;
        var _isValid = true;

        if (!FValidate._isEmail(control)) {
            _isValid = false;
            FValidate.showError(control, FValidate.ftype.femail);
        } else {
            FValidate.hideError(control);
        }
        return _isValid;
    },

    // Kiểm tra giá trị của Control là số
    isInt: function (control) {
        if ($(control).length == 0) return false;
        var _isValid = true;

        if (!FValidate._isInt(control)) {
            _isValid = false;
            FValidate.showError(control, FValidate.ftype.fint);
        } else {
            FValidate.hideError(control);
        }
        return _isValid;
    },

    // Kiểm tra giá trị của Control là số
    isUInt: function (control) {
        if ($(control).length == 0) return false;
        var _isValid = true;

        if (!FValidate._isUInt(control)) {
            _isValid = false;
            FValidate.showError(control, FValidate.ftype.fuint);
        } else {
            FValidate.hideError(control);
        }
        return _isValid;
    },

    // Kiểm tra giá trị của Control là số
    isNumber: function (control) {
        if ($(control).length == 0) return false;
        var _isValid = true;

        if (!FValidate._isNumber(control)) {
            _isValid = false;
            FValidate.showError(control, FValidate.ftype.fnumber);
        } else {
            FValidate.hideError(control);
        }
        return _isValid;
    },

    validateAll: function () {
        $("input, textarea").live('blur', function () {
            var _isValid = true;
            if (typeof ($(this).attr(FValidate.ftype.fempty)) != 'undefined')
                _isValid = FValidate.isEmpty(this);
            if (_isValid && typeof ($(this).attr(FValidate.ftype.femail)) != 'undefined') {
                FValidate.hideError(this);
                if (!FValidate._isEmpty(this))
                    _isValid = FValidate.isEmail(this);
            }

            if (_isValid && typeof ($(this).attr(FValidate.ftype.fuint)) != 'undefined') {
                FValidate.hideError(this);
                if (!FValidate._isEmpty(this))
                    _isValid = FValidate.isUInt(this);
            }

            if (_isValid && typeof ($(this).attr(FValidate.ftype.fint)) != 'undefined') {
                FValidate.hideError(this);
                if (!FValidate._isEmpty(this))
                    _isValid = FValidate.isInt(this);
            }

            if (_isValid && typeof ($(this).attr(FValidate.ftype.fnumber)) != 'undefined') {
                FValidate.hideError(this);
                if (!FValidate._isEmpty(this))
                    _isValid = FValidate.isNumber(this);
            }
        });
        $("input, textarea").live('change', function () {
            var _isValid = true;
            if (typeof ($(this).attr(FValidate.ftype.fempty)) != 'undefined')
                _isValid = FValidate.isEmpty(this);
            if (_isValid && typeof ($(this).attr(FValidate.ftype.femail)) != 'undefined') {
                FValidate.hideError(this);
                if (!FValidate._isEmpty(this))
                    _isValid = FValidate.isEmail(this);
            }

            if (_isValid && typeof ($(this).attr(FValidate.ftype.fuint)) != 'undefined') {
                FValidate.hideError(this);
                if (!FValidate._isEmpty(this))
                    _isValid = FValidate.isUInt(this);
            }

            if (_isValid && typeof ($(this).attr(FValidate.ftype.fint)) != 'undefined') {
                FValidate.hideError(this);
                if (!FValidate._isEmpty(this))
                    _isValid = FValidate.isInt(this);
            }

            if (_isValid && typeof ($(this).attr(FValidate.ftype.fnumber)) != 'undefined') {
                FValidate.hideError(this);
                if (!FValidate._isEmpty(this))
                    _isValid = FValidate.isNumber(this);
            }
        });
    },

    isValidateAll: function () {
        var _isValidAll = true;
        $("input, textarea").each(function () {
            var _isValid = true;
            if (typeof ($(this).attr(FValidate.ftype.fempty)) != 'undefined')
                _isValid = FValidate.isEmpty(this);
            if (_isValid && typeof ($(this).attr(FValidate.ftype.femail)) != 'undefined') {
                FValidate.hideError(this);
                if (!FValidate._isEmpty(this))
                    _isValid = FValidate.isEmail(this);
            }

            if (_isValid && typeof ($(this).attr(FValidate.ftype.fuint)) != 'undefined') {
                FValidate.hideError(this);
                if (!FValidate._isEmpty(this))
                    _isValid = FValidate.isUInt(this);
            }

            if (_isValid && typeof ($(this).attr(FValidate.ftype.fint)) != 'undefined') {
                FValidate.hideError(this);
                if (!FValidate._isEmpty(this))
                    _isValid = FValidate.isInt(this);
            }

            if (_isValid && typeof ($(this).attr(FValidate.ftype.fnumber)) != 'undefined') {
                FValidate.hideError(this);
                if (!FValidate._isEmpty(this))
                    _isValid = FValidate.isNumber(this);
            }
            if (_isValid == false) _isValidAll = false;
        });
        return _isValidAll;
    },

    _isEmpty: function (control) {
        if ($(control).length == 0) return false;
        return $.trim($(control).val()) == '';
    },
    _isEmail: function (control) {
        if ($(control).length == 0) return false;
        var inpValue = $(control).val();
        var re = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        if (inpValue.trim() == '') return false;
        var rx = new RegExp(re);
        var matches = rx.exec(inpValue);
        return ((matches != null) && (inpValue == matches[0]));
    },
    _isInt: function (control) {
        if ($(control).length == 0) return false;
        var inpValue = $(control).val();
        try {
            if (isNaN(inpValue)) return false;
            return parseInt(inpValue, 10) == parseFloat(inpValue);
        } catch (e) {
            return false;
        }
        return true;
    },

    _isUInt: function (control) {
        if ($(control).length == 0) return false;
        var inpValue = $(control).val();
        try {
            if (isNaN(inpValue)) return false;
            return (parseInt(inpValue, 10) >= 0) && (parseInt(inpValue, 10) == parseFloat(inpValue));
        } catch (e) {
            return false;
        }
    },

    _isNumber: function (control) {
        if ($(control).length == 0) return false;
        var inpValue = $(control).val();
        try {
            if (isNaN(inpValue)) return false;
        } catch (e) {
            return false;
        }
        return true;
    }
}