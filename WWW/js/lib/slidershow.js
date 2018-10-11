/*
* @version 1.0
*/
var ginSpeed = 500;
var ginItemEach = 1;
var ginCurrent = 1;
var ginItemWidth = 976;
var ginItemHeight = 370;
var ginDelay = 4500;
var ginPause = false;
var ginToggle = true;
var ginDotClicked = false;
var ginAuto;
var ginSum;
var ginTransition = "fade"; // slide fade
var ginEasing = "easeOutQuint";
var ginItemClass = ".rotateCopy";
var ginNextClass = ".btn_next";
var ginPrevClass = ".btn_prev";
var ginDotClass = ".thumbs";
var ginCoverClass = ".rotateBanner";

function ginslider() {

    // Count total item	
    ginSum = $(ginItemClass).length;

    //	Preload
    $('.rotateBanner img').each(function (i) {
        var getSrcImg = $('.rotateBanner img:eq(' + i + ')').attr('src');
        var Img = new Image();

        Img.onerror = function () {
            //fn.error('This image cannot download!');
            return false;
        }
        var src = getSrcImg;
        Img.onload = function () {
            //$('.loading').hide();
            //$('.rotateBanner img:eq('+i+')').fadeIn();

            Img.onload = function () { };
        }
        Img.src = src;
    });


    // Init dot navigation	
    ginslider_dot();

    // Show first item
    //$(ginItemClass+':eq(0)').stop(true, true).fadeIn(ginSpeed);	

    // Init items's position
    switch (ginTransition) {
        case "slide":
            for (var i = 0; i < ginSum; i++) {
                $(ginItemClass + ':eq(' + i + ')').attr('rel', (i * (Number(ginItemWidth)))).css("left", (i * (Number(ginItemWidth))));
            }
            break;
        case "fade":
            for (var i = 0; i < ginSum; i++) {
                $(ginItemClass).attr('rel', (i * (Number(ginItemWidth)))).css("left", 0).hide();
                $(ginItemClass + ':first').show();
            }
            break;
    }

    // Bind prev/next button
    $(ginNextClass).live("click", ginNext);
    $(ginPrevClass).live("click", ginPrev);

    // Set dimension of div cover
    //$(ginCoverClass).width(Number(ginItemEach * (ginItemWidth)));

    if ((ginSum > 1) && (ginPause == false) && (ginToggle == true))
        ginAuto = setTimeout("ginsliderPlay()", ginDelay);
}

function ginsliderPlay() {
    ginNext();
    clearTimeout(ginAuto);
    ginAuto = setTimeout("ginsliderPlay()", ginDelay);
}

function ginAutoNext() {
    ginsliderPlay();
}

function ginNext() {
    onSlide = true;

    if (ginDotClicked == false) {
        if (ginCurrent < (ginSum / ginItemEach)) {

            //reset pagination			
            $(ginDotClass + ' a.active').removeClass('active').addClass('inactive right');
            $(ginDotClass + ' a:eq(' + ginCurrent + ')').addClass('active left');


            //$('.btn_prev a').show();

            switch (ginTransition) {
                case "slide":
                    $('.port_view_all').stop(true, true).animate({ left: '-=' + (Number(ginItemWidth)) * ginItemEach + 'px' }, ginSpeed, ginEasing, function () {
                        onSlide = false;
                    });
                    break;
                case "fade":
                    $(ginItemClass).stop(true, true).fadeOut(ginSpeed);
                    $(ginItemClass + ':eq(' + ginCurrent + ')').stop(true, true).fadeIn(ginSpeed);
                    break;
            }

            ginCurrent++;

        }
        else {

            switch (ginTransition) {
                case "slide":
                    $('.port_view_all').stop(true, true).animate({ left: '+=' + (Number(ginItemWidth * (ginSum - 1))) + 'px' }, ginSpeed, ginEasing);
                    ginCurrent = 1;
                    break;
                case "fade":
                    ginCurrent = 0;
                    $(ginItemClass).stop(true, true).fadeOut(ginSpeed);
                    $(ginItemClass + ':eq(' + ginCurrent + ')').stop(true, true).fadeIn(ginSpeed);
                    ginCurrent = 1;
                    break;
            }

            //reset pagination			
            $(ginDotClass + ' a.active').removeClass('active').addClass('inactive right');
            $(ginDotClass + ' a:eq(0)').addClass('active left');

        }
    }
    else {
        alert(' not use for now ');
        //clearTimeout(ginAuto);
        var getTargetItem = ginCurrent;
        var getTargetItemW = getTargetItem * ginItemWidth;
        var getCurrentItem = (ginCurrent - 1) * ginItemWidth;
        var gotoItem = getTargetItemW - getCurrentItem;
        var gotoAmount = Math.abs(gotoItem);


        if (gotoItem > 0) {
            $(ginItemClass).stop(true, true).animate({ left: '-=' + gotoAmount + 'px' }, ginSpeed, ginEasing,
				function () {
				    ginCurrent = getTargetItem + 1;
				    $('.disableLayer').hide();
				}
			);
        }
        else {
            $(ginItemClass).stop(true, true).animate({ left: '+=' + gotoAmount + 'px' }, ginSpeed, ginEasing,
				function () {
				    ginCurrent = getTargetItem + 1;
				    $('.disableLayer').hide();
				}
			);
        }

        ginDotClicked = false;
    }

    clearTimeout(ginAuto);
    if ((ginPause == false) && (ginToggle == true)) ginAuto = setTimeout("ginsliderPlay()", ginDelay);
    return false;
}

function ginPrev() {
    clearTimeout(ginAuto);
    onSlide = true;

    if (ginCurrent > 1) {

        //$('.btn_next a').show();

        switch (ginTransition) {
            case "slide":
                $('.port_view_all').stop(true, true).animate({ left: '+=' + (Number(ginItemWidth)) * ginItemEach + 'px' }, ginSpeed, ginEasing, function () {
                    onSlide = false;
                });

                ginCurrent--;
                break;
            case "fade":
                ginCurrent--;
                $(ginItemClass).stop(true, true).fadeOut(ginSpeed);
                $(ginItemClass + ':eq(' + (ginCurrent - 1) + ')').stop(true, true).fadeIn(ginSpeed);
                break;
        }


        //if (ginCurrent==1) $('.btn_prev a').hide();		

        //reset pagination
        var t_ginCurrent = ginCurrent - 1;
        $(ginDotClass + ' a.active').removeClass('active').addClass('inactive left');
        $(ginDotClass + ' a:eq(' + t_ginCurrent + ')').addClass('active right');
    }
    else {

        switch (ginTransition) {
            case "slide":
                $('.port_view_all').stop(true, true).animate({ left: '-=' + (Number(ginItemWidth * (ginSum - 1))) + 'px' }, ginSpeed, ginEasing);
                ginCurrent = ginSum;
                break;
            case "fade":
                ginCurrent = ginSum - 1;
                $(ginItemClass).stop(true, true).fadeOut(ginSpeed);
                $(ginItemClass + ':eq(' + ginCurrent + ')').stop(true, true).fadeIn(ginSpeed);
                ginCurrent = ginSum;
                break;
        }

        //reset pagination
        var t_numItems = ginSum - 1;
        $(ginDotClass + ' a.active').removeClass('active').addClass('inactive left');
        $(ginDotClass + ' a:eq(' + t_ginCurrent + ')').addClass('active right');

    }

    clearTimeout(ginAuto);
    if ((ginPause == false) && (ginToggle == true)) ginAuto = setTimeout("ginsliderPlay()", ginDelay);
    return false;
}

function ginslider_dot() {	/* generate pagination */
    if (ginSum > 1) {
        for (var tempPaging = 0; tempPaging < ginSum; tempPaging++) {
            $(ginDotClass).find('a').eq(tempPaging).attr('rel', tempPaging);
        }

        $(ginDotClass + ' a:first').addClass('active');
        $(ginDotClass + ' a').click(function () {

            $(ginDotClass + ' a').removeClass('active');
            $(this).addClass('active');
            $('.disableLayer').show();
            //clearTimeout(ginAuto);

            switch (ginTransition) {
                case "slide":
                    var getTargetItem = Number($(this).attr('alt'));
                    var getTargetItemW = getTargetItem * ginItemWidth;
                    var getCurrentItem = $(ginItemClass + ':eq(' + Number(ginCurrent - 1) + ')').attr('rel');
                    var gotoItem = getTargetItemW - getCurrentItem;
                    var gotoAmount = Math.abs(gotoItem);

                    if (gotoItem > 0) {
                        $('.port_view_all').stop(true, true).animate({ left: '-=' + gotoAmount + 'px' }, ginSpeed, ginEasing,
							function () {
							    ginCurrent = getTargetItem + 1;
							    $('.disableLayer').hide();
							}
						);
                    }
                    else {
                        $('.port_view_all').stop(true, true).animate({ left: '+=' + gotoAmount + 'px' }, ginSpeed, ginEasing,
							function () {
							    ginCurrent = getTargetItem + 1;
							    $('.disableLayer').hide();
							}
						);
                    }
                    clearTimeout(ginAuto);
                    if ((ginPause == false) && (ginToggle == true)) ginAuto = setTimeout("ginAutoNext()", ginDelay);
                    break;

                case "fade":
                    clearTimeout(ginAuto);
                    ginCurrent = Number($(this).attr('rel'));
                    if ((ginPause == false) && (ginToggle == true)) ginAuto = setTimeout("ginAutoNext()", 0);
                    $('.disableLayer').hide();
                    break;
            }

            return false;

        });
    }
};




function initGintab() {
    $('.tab_lbl a').each(function (i) {
        $(this).attr('rel', i);
    });

    $('.tab_lbl a').click(function () {
        $('.tab_lbl a.active').removeClass('active');
        $(this).addClass('active');

        var getTarget = $(this).attr('rel');
        $('.tab_info').hide();
        $('.tab_info:eq(' + getTarget + ')').show();

        return false;
    });
}