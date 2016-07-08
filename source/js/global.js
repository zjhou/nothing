/*
 * Created by ZjHOU on 2016/07/08.
 * Licence : Do what the fuck you want to.
 */

$(function () {
    var $1st_section = $("section:first")
        , $pannel = $("#pannel")
        , $content = $(".container-fluid")
        , isNight = false
        , $more = $("#more");

    /* functions
     -------------------------------------------------------*/
    function locate() {
        var ref_x = $1st_section.offset().left
            , ref_xr = $1st_section.offset().left + $1st_section.width()
            , ref_y = $1st_section.offset().top
            , more_w = $more.width()
            , wd_ht = $(window).height()
            , margin_bt = 25
            , margin_rt = 5;

        $more.css({
            "left": ref_xr /*- more_w */ + margin_rt + 'px',
            // "left": ref_x - more_w - margin_rt + 'px',
            // "top": ref_y + 'px'
            "top": wd_ht - margin_bt + 'px'
        });
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

    $.fn.scrollEnd = function (callback, timeout) {
        $(this).scroll(function () {
            var $this = $(this);
            if ($this.data('scrollTimeout')) {
                clearTimeout($this.data('scrollTimeout'));
            }
            $this.data('scrollTimeout', setTimeout(callback, timeout));
        });
    };
    
    function goodnight(is_night) {
        if(is_night){
            $(window).off("scroll");
            $content.addClass("blur");
            
            $more.animate({
                "top": "200px",
                "width" : "9px",
                "height" : "9px",
                "opacity": "1",
            }, 500);
            
            $more.css({
                "background": "url(/blog/static/cross.png) center 0",
            })
        }else{
            $content.removeClass("blur");
            $(window).on("scroll", onScroll)
            $(window).scrollEnd(endScroll, 100);
            locate();
            
            $more.css({
                "width" : "5px",
                "height" : "5px",
                "background": "url(/blog/static/cross.png) center -11px",
            })
        }
    }
    
    function onScroll () {
        // $more.fadeTo(.2, .9)
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
    locate();


    /* handle event 
     -------------------------------------------------------*/
    $(window).resize(locate);
    $(window).on("scroll", onScroll)
    $(window).scrollEnd(endScroll, 100);

    $more.click(function () {
        $pannel.fadeToggle();
        isNight  =  isNight ? false : true;
        goodnight(isNight)
    })
})