/*
 * Created by ZjHOU on 2016/07/08.
 * Licence : Do what the fuck you want to.
 */

$(function () {

    /* global vars
     -------------------------------------------------------*/
    var $1st_section = $("section:last")
        , $head = $("header")
        , $logo = $("#pannel svg")
        , margin = 40
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
        var x = $1st_section.offset().left + $1st_section.width() + 20
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
            "left": x + 'px',
            "top": y + 10 + 'px'
        });

        $pannel.css({
            "padding-top": pd_top + "px",
            "padding-left": pd_left + "px",
            "padding-right": pd_right - 12 + "px"
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

            $logo.css("fill", "#fff");


            //fixme: 火狐浏览器因使用了scroll-linked效果导致动画位置有误，
            //$(window).scrollTop(0)

            $more.animate({
                "top": $head.offset().top - $(window).scrollTop() + 10 + "px",
                "opacity": "1"
            }, 300);

            $more.css({
                "background": "url(/static/cross.png) center 0"
            })
        } else {
            position();
            $content.removeClass("blur");
            $(window).on("scroll", onScroll);
            $(window).scrollEnd(endScroll, 100);

            $logo.css("fill", "#000");
            $more.css({
                "background": "url(/static/cross.png) center -9px"
            })
        }
    }


    function dayNightToggle() {
        $pannel.fadeToggle();
        isNight = !isNight;
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
            "opacity": ".9"
        })
    }


    /* init
     -------------------------------------------------------*/
    position();

    /* handle event 
     -------------------------------------------------------*/
    $(window).resize(position);
    $(window).on("scroll", onScroll);
    $(window).scrollEnd(endScroll, 100);
    $more.click(dayNightToggle)
});
