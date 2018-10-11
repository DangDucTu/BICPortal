/*
Author: hoan.trinh
Create Date:2010-03-24
Description:
Đây là file Script dùng cho việc phân trang
Contructor Parameter:
- argIdContainer: ID của control chứa đoạn phân trang cần bind
- argAction: Method Load dữ liệu về có dạng: methodName(trang hiện tại, số lượng bản ghi trên trang)
- argCssClass: class css của các thẻ UL & LI cấu thành nên đoạn phân trang
- argPageSize: Kích thước dữ liệu trên trang
- argPageDisplay: số lượng trang cần hiển thị
- argVisibleFirstPage: Cho phép hiển thị Link trang đầu tiên       (default: true)
- argVisiblePreviousPage: Cho phép hiển thị Link trang trước đó    (default: true)
- argVisibleNextPage: Cho phép hiển thị Link trang tiếp theo       (default: true)
- argVisibleLastPage: Cho phép hiển thị Link trang cuối cùng       (default: true)
*/
function VtcPaging(argIdContainer, argAction, argCssClass, argPageSize, argPageDisplay,
    argVisibleFirstPage, argVisiblePreviousPage, argVisibleNextPage, argVisibleLastPage) {
    this.idContainer = argIdContainer; // ID của control chứa paging
    this.action = argAction; // Action khi click để trỏ đến trang khác
    this.cssClass = argCssClass;
    this.currentPage = 1;
    this.totalRecord = 0;
    this.pageSize = argPageSize;
    this.pageDisplay = argPageDisplay;
    this.visibleFirstPage = typeof (argVisibleFirstPage) == 'undefined' ? true : argVisibleFirstPage;
    this.visiblePreviousPage = typeof (argVisiblePreviousPage) == 'undefined' ? true : argVisiblePreviousPage;
    this.visibleNextPage = typeof (argVisibleNextPage) == 'undefined' ? true : argVisibleNextPage;
    this.visibleLastPage = typeof (argVisibleLastPage) == 'undefined' ? true : argVisibleLastPage;
    // phương thức bind dữ liệu
    // Phải có tối thiểu 2 tham số:
    //      - currentPage: trang hiện tại
    //      - totalRecord: tổng số bản ghi
    this.bindPaging = function () {
        if (arguments.length < 2) return;
        this.currentPage = parseInt(arguments[0]);
        this.totalRecord = parseInt(arguments[1]);

        // Tính tổng số trang
        var totalPage = 1;
        if ((this.pageSize > 0) && (this.totalRecord >= 0)) {
            totalPage = Math.floor((this.totalRecord - 1) / this.pageSize) + 1;
        }

        var d = this.currentPage - Math.floor(this.pageDisplay / 2); // Đầu
        d = d < 1 ? 1 : d;
        var c = d + this.pageDisplay - 1;           // Cuối
        c = c > totalPage ? totalPage : c;
        if (c - d != this.pageDisplay - 1) {
            d = c - this.pageDisplay + 1;
            d = d < 1 ? 1 : d;
        }

        var strHtml = "<ul class='" + this.cssClass + "'>";
        if (this.currentPage > 1) {
            if (this.visibleFirstPage) {
                strHtml += "<li class='page_first' onclick='" + this.action + "(1, " + this.pageSize + ");'><span>&nbsp;</span></li>";
            }
            if (this.visiblePreviousPage) {
                strHtml += "<li class='page_back' onclick='" + this.action + "(" + (this.currentPage - 1) + ", " + this.pageSize + ");'><span>&nbsp;</span></li>";
            }
        }
        for (var i = d; i <= c; i++) {
            if (i == this.currentPage) {
                strHtml += "<li class='page-current'><span>" + i + "</span></li>";
            }
            else {
                strHtml += "<li class='page' onclick='" + this.action + "(" + i + ", " + this.pageSize + ");'><span>" + i + "</span></li>";
            }
        }
        if (this.currentPage < totalPage) {
            if (this.visibleNextPage) {
                strHtml += "<li class='page_next' onclick='" + this.action + "(" + (this.currentPage + 1) + ", " + this.pageSize + ");'><span>&nbsp;</span></li>";
            }
            if (this.visibleLastPage) {
                strHtml += "<li class='page_last' onclick='" + this.action + "(" + totalPage + ", " + this.pageSize + ");'><span>&nbsp;</span></li>";
            }
        }
        strHtml += "</ul>";
        strHtml += "<div class='clear'></div>";
        var obj = document.getElementById("" + this.idContainer);
        obj.innerHTML = strHtml;
    };
}


function VtcPaging1(argIdContainer, argAction, argCssClass, argPageSize, argPageDisplay,
    argVisibleFirstPage, argVisiblePreviousPage, argVisibleNextPage, argVisibleLastPage) {
    this.idContainer = argIdContainer; // ID của control chứa paging
    this.action = argAction; // Action khi click để trỏ đến trang khác
    this.cssClass = argCssClass;
    this.currentPage = 1;
    this.totalRecord = 0;
    this.pageSize = argPageSize;
    this.pageDisplay = argPageDisplay;
    this.visibleFirstPage = typeof (argVisibleFirstPage) == 'undefined' ? true : argVisibleFirstPage;
    this.visiblePreviousPage = typeof (argVisiblePreviousPage) == 'undefined' ? true : argVisiblePreviousPage;
    this.visibleNextPage = typeof (argVisibleNextPage) == 'undefined' ? true : argVisibleNextPage;
    this.visibleLastPage = typeof (argVisibleLastPage) == 'undefined' ? true : argVisibleLastPage;
    // phương thức bind dữ liệu
    // Phải có tối thiểu 2 tham số:
    //      - currentPage: trang hiện tại
    //      - totalRecord: tổng số bản ghi
    this.bindPaging = function () {
        if (arguments.length < 2) return;
        this.currentPage = parseInt(arguments[0]);
        this.totalRecord = parseInt(arguments[1]);

        // Tính tổng số trang
        var totalPage = 1;
        if ((this.pageSize > 0) && (this.totalRecord >= 0)) {
            totalPage = Math.floor((this.totalRecord - 1) / this.pageSize) + 1;
        }

        var d = this.currentPage - Math.floor(this.pageDisplay / 2); // Đầu
        d = d < 1 ? 1 : d;
        var c = d + this.pageDisplay - 1;           // Cuối
        c = c > totalPage ? totalPage : c;
        if (c - d != this.pageDisplay - 1) {
            d = c - this.pageDisplay + 1;
            d = d < 1 ? 1 : d;
        }

        var strHtml = "<ul class='" + this.cssClass + "'>";
        if (this.currentPage > 1) {
            if (this.visiblePreviousPage) {
                strHtml += "<li class='page_last' onclick='" + this.action + "(" + (this.currentPage - 1) + ", " + this.pageSize + ");'><a href='javascript:;' >Trước</a></li>";
            }
        }
        for (var i = d; i <= c; i++) {
            if (i == this.currentPage) {
                strHtml += "<li class='page-current'><a href='javascript:;'>" + i + "</a></li>";
            }
            else {
                strHtml += "<li class='page' onclick='" + this.action + "(" + i + ", " + this.pageSize + ");'><a href='javascript:;'>" + i + "</a></li>";
            }
        }
        if (this.currentPage < totalPage) {
            if (this.visibleNextPage) {
                strHtml += "<li class='page_next' onclick='" + this.action + "(" + (this.currentPage + 1) + ", " + this.pageSize + ");'><a href='javascript:;'>Sau</a></li>";
            }
        }
        strHtml += "</ul>";
        strHtml += "<div class='clear'></div>";
        var obj = document.getElementById("" + this.idContainer);
        obj.innerHTML = strHtml;
    };
}


function VtcPaging2(argIdContainer, argAction, argCssClass, argPageSize, argPageDisplay,
    argVisibleFirstPage, argVisiblePreviousPage, argVisibleNextPage, argVisibleLastPage) {
    this.idContainer = argIdContainer; // ID của control chứa paging
    this.action = argAction; // Action khi click để trỏ đến trang khác
    this.cssClass = argCssClass;
    this.currentPage = 1;
    this.totalRecord = 0;
    this.pageSize = argPageSize;
    this.pageDisplay = argPageDisplay;
    this.visibleFirstPage = typeof (argVisibleFirstPage) == 'undefined' ? true : argVisibleFirstPage;
    this.visiblePreviousPage = typeof (argVisiblePreviousPage) == 'undefined' ? true : argVisiblePreviousPage;
    this.visibleNextPage = typeof (argVisibleNextPage) == 'undefined' ? true : argVisibleNextPage;
    this.visibleLastPage = typeof (argVisibleLastPage) == 'undefined' ? true : argVisibleLastPage;
    // phương thức bind dữ liệu
    // Phải có tối thiểu 2 tham số:
    //      - currentPage: trang hiện tại
    //      - totalRecord: tổng số bản ghi
    this.bindPaging = function () {
        if (arguments.length < 2) return;
        this.currentPage = parseInt(arguments[0]);
        this.totalRecord = parseInt(arguments[1]);

        // Tính tổng số trang
        var totalPage = 1;
        if ((this.pageSize > 0) && (this.totalRecord >= 0)) {
            totalPage = Math.floor((this.totalRecord - 1) / this.pageSize) + 1;
        }

        var d = this.currentPage - Math.floor(this.pageDisplay / 2); // Đầu
        d = d < 1 ? 1 : d;
        var c = d + this.pageDisplay - 1;           // Cuối
        c = c > totalPage ? totalPage : c;
        if (c - d != this.pageDisplay - 1) {
            d = c - this.pageDisplay + 1;
            d = d < 1 ? 1 : d;
        }

        var strHtml = "<ul class='" + this.cssClass + "'>";
        strHtml += "<li style=\"padding-right:2px\">Trang " + this.currentPage + " trên " + totalPage + "</li>";
        if (this.currentPage > 1) {
            if (this.visiblePreviousPage) {
                strHtml += "<li class='page_last' onclick='" + this.action + "(" + (this.currentPage - 1) + ", " + this.pageSize + ");'><a href='javascript:;' style='font-size:10px' >Trước</a></li>";
            }
        }
        for (var i = d; i <= c; i++) {
            if (i == this.currentPage) {
                strHtml += "<li class='page-current'><a href='javascript:;' style='font-size:10px'>" + i + "</a></li>";
            }
            else {
                strHtml += "<li class='page' onclick='" + this.action + "(" + i + ", " + this.pageSize + ");'><a href='javascript:;' style='font-size:10px'>" + i + "</a></li>";
            }
        }
        if (this.currentPage < totalPage) {
            if (this.visibleNextPage) {
                strHtml += "<li class='page_next' onclick='" + this.action + "(" + (this.currentPage + 1) + ", " + this.pageSize + ");'><a href='javascript:;' style='font-size:10px'>Sau</a></li>";
            }
        }
        strHtml += "</ul>";
        strHtml += "<div class='clear'></div>";
        var obj = document.getElementById("" + this.idContainer);
        obj.innerHTML = strHtml;
    };
}