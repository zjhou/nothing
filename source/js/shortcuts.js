/*
 * Created by ZjHOU on 2016/07/12.
 * Licence : Do what the fuck you want to.
 */

$(function () {

    /* global vars
     -------------------------------------------------------*/
    var $posts = $("section[id]")
        , postIdx = 1 // postIdx = { 1, 2, 3, 4, ... $posts.length }
        , postsNum = $posts.length
        , pos_y_arry = $posts.map(function (index) {
        return $(this).offset().top;
    });

    /* util functions
     -------------------------------------------------------*/
    function calcPostIdx() {
        var scrollDist = $(window).scrollTop() + pos_y_arry[0];
        for (var i = 0; i < postsNum - 1; i++) {
            if (scrollDist >= pos_y_arry[i] && scrollDist < pos_y_arry[i + 1]) {
                return i + 1;
            } else if (i == $posts.length - 2 && scrollDist >= pos_y_arry[i + 1]) {
                return i + 2;
            }
        }
    }

    //n = postIdx
    function scroll2nthPost(n) {
        if (n < 1 || n > $posts.length) {
            return;
        } else if (n === 0) {
            return 0;
        } else {
            $(window).scrollTop(pos_y_arry[n - 1] - pos_y_arry[0]);
        }
    }

    function isSmallScreen() {
        return $(window).width() < 992 ? true : false;
    }

    function page(direction) {
        var id, url;
        switch (direction) {
            case 'up' :
                id = 'left-navigator';
                break;
            case 'down' :
                id = 'right-navigator';
                break;
            default:
                return;
        }

        url = $("#" + id).attr("href");
        if (!url) {
            return
        }

        window.location.href = url;
    }


    /* init
     -------------------------------------------------------*/
    if (isSmallScreen()) {
        return
    }
    postIdx = calcPostIdx();

    /* handle event
     -------------------------------------------------------*/
    $("body").on("keypress", function (e) {
        console.log(e.keyCode);
        switch (e.keyCode) {
            // press 't'
            case 116:
                postIdx = 1;
                break;
            // press 'j'
            case 106:
                if (postIdx < $posts.length)
                    postIdx++;
                break;
            /* press 'k'*/
            case 107:
                if (postIdx > 1)
                    postIdx--;
                break;
            // press 'l'
            case 108:
                page('down');
                break;
            // press 'h'
            case 104:
                page('up');
                break;
            // press 'i'
            case 105:
                window.location.href = '/';
                break;
            // press 'a'
            case 97:
                window.location.href = '/archives';
                break;
            // press 'b'
            case 98:
                postIdx = postsNum;
                break;
        }
        scroll2nthPost(postIdx)
    });

    $(window).on("scroll", function () {
        postIdx = calcPostIdx()
    })
});

