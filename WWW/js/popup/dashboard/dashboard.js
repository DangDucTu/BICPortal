DASHBOARD = new function () {
    this.getMonthByLang = function (value, lang) {
        if (lang == 'en') return value;
        switch (value.toUpperCase()) {
            case 'JAN':
            case 'JANUARY':
                return 'T1';
            case 'FEB':
            case 'FEBRUARY':
                return 'T2';
            case 'MAR':
            case 'MARCH':
                return 'T3';
            case 'APR':
            case 'APRIL':
                return 'T4';
            case 'MAY':
                return 'T5';
            case 'JUN':
                return 'T6';
            case 'JUL':
            case 'JULY':
                return 'T7';
            case 'AUG':
            case 'AUGUST':
                return 'T8';
            case 'SEP':
            case 'SEPTEMBER':
                return 'T9';
            case 'OCT':
            case 'OCTOBER':
                return 'T10';
            case 'NOV':
            case 'NOVEMBER':
                return 'T11';
            case 'DEC':
            case 'DECEMBER':
                return 'T12';
        }
    };

    this.getProductByLang = function (product, lang) {
        if (lang == 'en') return product;
        switch (product.toUpperCase()) {
            case 'TOTAL LOAN':
                return 'Tổng dư nợ';
            case 'AUTO LOAN':
                return 'Vay mua ô tô';
            case 'HOME LOAN':
                return 'Vay mua nhà';
            case 'CONSUMPTION LOAN (GROUP)':
                return 'Vay tiêu dùng';
            case 'HOUSEHOLD BUSINESS LOAN':
                return 'Vay kinh doanh hộ gia đình';
            case 'PASSBOOK LOAN':
                return 'Vay tiết kiệm';
            case 'SECURITIES LOAN':
                return 'Vay chứng khoán';
            case 'SECURED LOAN':
                return 'Vay đảm bảo';
            case 'UNSECURED LOAN':
                return 'Vay không đảm bảo';
            case 'TOTAL DEPOSIT(MILLION VND)':
                return 'Tổng tiền gửi (Triệu VNĐ)';
            case 'CURRENT ACCOUNT(#)':
                return 'Tài khoản thanh toán(#)';
            case 'TERM DEPOSIT(MILLION VND)':
                return 'Tiết kiệm có kỳ hạn (Triệu VNĐ)';
            case 'CREDIT CARD(#)':
                return 'Thẻ tín dụng(#)';
            case 'TOTAL LIABILITIES (BALANCE)':
                return 'Tổng nợ phải trả';
                break;
            case 'CURRENT ACCOUNT (# OF ACCTNO)':
                return 'Tài khoản thanh toán';
                break;
            case 'DEPOSITS BALANCE (TD & OTHERS)':
                return 'Huy động';
                break;
            default:
                return 'Huy động';
                break;
        }
    };
};