slide_more = function (m_child, m_container, m_width, m_height, m_visible) {

    this.container = m_container;
    this.child = m_child;
    this.width = m_width;
    this.height = m_height;
    this.index = 0;
    this.total = $(m_child, m_container).length;
    this.visible = m_visible;
    this.totalPage = 1;
    if ((this.visible > 0) && (this.total >= 0)) {
        this.totalPage = Math.floor((this.total - 1) / this.visible) + 1;
    }

    $(m_container).wrap("<div id=\"slideContaone_" + m_container.substring(1) + "\"></div>");
    $("#slideContaone_" + m_container.substring(1)).css("position", "relative");
    $("#slideContaone_" + m_container.substring(1)).wrap("<div style=\"overflow:hidden; float:left; height:" + this.height + "px; width:" + (this.visible * this.width) + "px;\"></div>");
    $(m_container).css("position", "absolute").css("width", (this.total * this.width) + "px");


    this.back = function () {
        this.index--;
        if (this.index <= 0) {
            this.index = 0; // -= this.visible * this.width;
        }
        $(this.container).animate({ left: -(this.index * this.visible * this.width) + "px" });
    };
    this.next = function () {

        this.index++;

        if (this.index >= this.totalPage - 1) {
            this.index = this.totalPage - 1; // -= this.visible * this.width;
        }
        $(this.container).animate({ left: -(this.index * this.visible * this.width) + "px" });
    };

};