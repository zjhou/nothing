/*
 * Created by ZjHOU on 2016/07/08.
 * Licence : Do what the fuck you want to.
 */

$(function () {
    /* global vars
     -------------------------------------------------------*/
    var $1st_section = $("section:first")
        , $head = $("header")
        , $pannel = $("#pannel")
        , $content = $(".container-fluid")
        , $more = $("#more")
        , isNight = false;

    $.fn.scrollEnd = function (callback, timeout) {
        $(this).scroll(function () {
            var $this = $(this);
            if ($this.data('scrollTimeout')) {
                clearTimeout($this.data('scrollTimeout'));
            }
            $this.data('scrollTimeout', setTimeout(callback, timeout));
        });
    };

    /* functions
     -------------------------------------------------------*/
    function position() {
        var x = $1st_section.offset().left + $1st_section.width()
            , margin = 20
            , window_wd = $(window).width()
            , y = isNight ? $head.offset().top - $(window).scrollTop()
            : $(window).height() - margin
            , pd_top = $head.offset().top - $(window).scrollTop()
            , pd_left = $head.offset().left
            , pd_right = window_wd - x;

        if (window_wd < 992 && isNight) {
            dayNightToggle()
        }

        $more.css({
            "left": x + margin + 'px',
            "top": y + 'px'
        });
        
        $pannel.css({
            "padding-top":  pd_top + "px",
            "padding-left": pd_left + "px",
            "padding-right": pd_right - 30 + "px",
        })
    }

    function rotate(ele, degree) {
        ele.css({
            '-webkit-transform': 'rotate(' + degree + 'deg)',
            '-moz-transform': 'rotate(' + degree + 'deg)',
            '-ms-transform': 'rotate(' + degree + 'deg)',
            '-o-transform': 'rotate(' + degree + 'deg)',
            'transform': 'rotate(' + degree + 'deg)',
            'zoom': 1
        });
    }


    function goodnight(is_night) {
        if (is_night) {
            $(window).off("scroll");
            $content.addClass("blur");

            $more.animate({
                "top": "200px",
                "width": "9px",
                "height": "9px",
                "opacity": "1",
            }, 500);

            $more.css({
                "background": "url(/blog/static/cross.png) center 0",
            })
        } else {
            position();
            $content.removeClass("blur");
            $(window).on("scroll", onScroll)
            $(window).scrollEnd(endScroll, 100);

            $more.css({
                "width": "5px",
                "height": "5px",
                "background": "url(/blog/static/cross.png) center -11px",
            })
        }
    }

    function dayNightToggle() {
        $pannel.fadeToggle();
        isNight = isNight ? false : true;
        goodnight(isNight)
    }

    function onScroll() {
        var scroll_ht = $(document).scrollTop()
            , ang = scroll_ht % 360;

        rotate($more, ang);

        $more.css({
            "opacity": ".7"
        })
    }

    function endScroll() {
        var scroll_ht = $(document).scrollTop()
            , ang_count = Math.floor(scroll_ht / 45);

        if (ang_count % 2 != 0) {
            ang_count++;
        }

        rotate($more, ang_count * 45);

        $more.css({
            "opacity": ".9",
        })
    }


    /* init
     -------------------------------------------------------*/
    position();

    /* handle event 
     -------------------------------------------------------*/
    $(window).resize(position);
    $(window).on("scroll", onScroll)
    $(window).scrollEnd(endScroll, 100);
    $more.click(dayNightToggle)
})
