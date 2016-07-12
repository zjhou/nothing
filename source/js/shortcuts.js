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
    function updatePostIdx() {
        var scrollDist = $(window).scrollTop() + pos_y_arry[0];
        for ( var i = 0; i < postsNum  - 1; i++ ){
            if( scrollDist >= pos_y_arry[i] && scrollDist < pos_y_arry[i+1] ){
                postIdx = i + 1;
            }else if( i == $posts.length - 2 && scrollDist >= pos_y_arry[i + 1]){
                postIdx = i + 2;
            }
        }
    }

    //n = postIdx
    function scroll2nthPost(n) {
        if (n < 1 || n >= $posts.length) {
            return;
        } else if (n === 0) {
            return 0;
        } else {
            $(window).scrollTop(pos_y_arry[n - 1] - pos_y_arry[0]);
        }
    }


    /* init
     -------------------------------------------------------*/
     updatePostIdx();

    /* handle event
     -------------------------------------------------------*/
    $("body").on("keypress", function (e) {
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
            // press 'k'
            case 107:
                if (postIdx > 1)
                    postIdx--;
                break;
        }

        scroll2nthPost(postIdx)
    })

    $(window).on("scroll", updatePostIdx)
})


