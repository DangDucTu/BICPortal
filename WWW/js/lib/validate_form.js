function textbox(box, boxval) {
    $(box).val(boxval);
    $(box).focus(function () {
        if ($(this).val() == boxval) {
            $(this).val('');
            $(this).css('color', '#4B4B4B');
            $(this).css('font-style', 'normal');
        }
    })
    $(box).blur(function () {
        if ($(this).val() == '') {
            $(this).css('color', '#A99A9A');
            $(this).css('font-style', 'italic');
            $(this).val(boxval);
        }

    })
}

function checkLength(box, value) {
    if ($(box).val().length > value) {
        return true;
    } else { return false; }
}

function checkMail(mailForm) {
    var mailFilter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return mailFilter.test($(mailForm).val());
};


// Lien He========================
function checkLienhe(mshopId) {
    $('#contact-form .error').removeClass('error');
    errorMessage = '<span style="margin-left:-13px; font-weight:bold;">Rất tiếc ! Thông điệp của bạn không thể gửi vì các lỗi sau:</span>';
    var name = true;
    var mail = true;
    var content = true;
    var phone = true;


    if (!checkLength('#lhname', 0)) {
        $('#lhname').addClass('error');
        errorMessage += '<li>Bạn chưa nhập <b>Họ tên</b>.</li>';
        name = false;
    } else if (!checkLength('#lhname', 4)) {
        $('#lhname').addClass('error');
        errorMessage += '<li>Dữ liệu bạn nhập <b>Họ tên</b> quá ngắn.</li>';
        name = false;
    }

    if (!checkLength('#lhemail', 0)) {
        $('#lhemail').addClass('error');
        errorMessage += "<li>Bạn chưa nhập địa chỉ <b>Email</b>.</li>";
        mail = false;
    } else if (!checkMail('#lhemail')) {
        $('#lhemail').addClass('error');
        errorMessage += "<li>Địa chỉ <b>Email</b> bạn nhập không hợp lệ.</li>";
        mail = false;
    };

    if (!checkLength('#lhphone', 0)) {
        $('#lhphone').addClass('error');
        errorMessage += "<li>Bạn chưa nhập <b>Số điện thoại</b>.</li>";
        phone = false;
    }
    else if (isNaN($('#lhphone').val()) || $('#lhphone').val().length < 7) {
        $('#lhphone').addClass('error');
        errorMessage += "<li><b>Số điện thoại </b> không hợp lệ.</li>";
        phone = false;
    };

    if (!checkLength('#cusContent', 0)) {
        $('#cusContent').addClass('error');
        errorMessage += "<li>Bạn chưa nhập <b>Nội dung</b> Liên hệ.</li>";
        content = false;
    } else if (!checkLength('#cusContent', 20)) {
        $('#cusContent').addClass('error');
        errorMessage += "<li>Mục <b>Nội dung</b> bạn nhập quá ngắn.</li>";
        content = false;
    }


    var ketqua = name && mail && content && phone;
    if (!ketqua) {
        $('#lhe-baoloi ul').html(errorMessage);
        if ($('#lhe-baoloi').css('display') == 'none') {
            $('#lhe-baoloi').slideDown();
        } else {
            i = $('#lhe-baoloi li').length;
            $('#lhe-baoloi').stop().animate({ height: i * 18 + 18 });
        }
        return false;
    }
    else {

        $('#contact-form .error').removeClass('error');
        $('#lhe-loading').slideDown();
        $('#lhe-baoloi').slideUp();

        var ten = $('#lhname').val();
        var dcmai = $('#lhemail').val();
        var dienthoai = $('#lhphone').val();
        var diachi = $('#address').val();
        var yckhac = $('#cusContent').val();
        var tieude = $('#txttitle').val();
        var _data = {
            fullName: ten,
            email: dcmai,
            phone: dienthoai,
            title: tieude,
            content: yckhac,
            address: diachi,
            shopId: mshopId
        };
        $.ajax({
            type: "POST",
            url: "/WebServices/WSBase.asmx/ContactInsert",
            data: JSON.encode(_data),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                if (data.d > 0) {
                    $('#lhe-baoloi ul').html('<strong>Cảm ơn quý khách đã liên hệ với chúng tôi. Chúng tôi sẻ liên lạc lại với quý khách trong thời gian sớm nhất.</strong>');
                    $('#lhe-baoloi').css("height", "18px");
                    $('#lhe-baoloi').slideDown();

                    $('#lhname').val('');
                    $('#lhemail').val('');
                    $('#lhphone').val('');
                    $('#lhaddress').val('');
                    $('#address').val('');
                    $('#cusContent').val('');
                    $('#lhe-loading').slideUp();
                }
            }
        });
        return false;
    }
}
