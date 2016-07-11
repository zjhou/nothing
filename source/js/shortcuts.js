$(function () {
    var topArray = $("section[id]").map(function () {
        return $(this).offset().top;
    })
        , postsNow = 0;


    function back2top() {
        $("html, body").scrollTop(0);
        console.log("2top");
    }

    function gotoPost(postIdx) {
        $(window).scrollTop(topArray[postIdx] - topArray[0]);
    }


    // back2top();
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }

    $("body").on("keypress", function (e) {
        if (e.keyCode === 116) {
            back2top();
        }
        switch (e.keyCode) {
            // press 't'
            case 116:
                postsNow = 0;
                back2top();
                break;
            // press 'j'
            case 106:
                if (postsNow < 5)
                    postsNow++;
                break;
            // press 'k'
            case 107:
                if (postsNow > 0)
                    postsNow--;
                break;
        }
        gotoPost(postsNow);
        console.log("postNow: %s, top: %s, origin: %s", postsNow, $(window).scrollTop(), topArray[0]);
    })
})


