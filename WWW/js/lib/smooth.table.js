/* sets the class of the tr containing the checked checkbox to selected */
function set_tr_class(element, selected) {
    if (selected) {
        element.attr("class", "selected " + element.attr("class"))
    } else {
        var css = element.attr("class");
        var position = css.indexOf('selected');

        element.attr("class", css.substring(position + 9));
    }
}

$(document).ready(function () {
    /* checks all the checkboxes within a table */
    try {


        $("table input[class=checkall]").live("click", function (event) {
            var checked = $(this).attr("checked");

            $("table input[type=checkbox]").each(function () {
                this.checked = checked;

                if (checked) {
                    set_tr_class($(this).parent().parent(), true);
                } else {
                    set_tr_class($(this).parent().parent(), false);
                }
            });
        });
    } catch (e) {

    }

    /* sets the class of the table tr when a checkbox within the table is checked */
    $("table input[type=checkbox]").live("click", function (event) {
        if ($(this).attr("checked")) {
            set_tr_class($(this).parent().parent(), true);
        } else {
            set_tr_class($(this).parent().parent(), false);
        }
    });
});

$(".aContextFunction").live('click', function () {
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
$(window).bind("resize", function () {
    $(".divContextFunction").hide();
});

$(document).click(function (event) {
    if ($('.divContextFunction').is(':visible') && !$(event.target).closest(".aContextFunction").size()) {
        $('.divContextFunction').hide();
    }
});