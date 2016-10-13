/*
 * Created by ZjHOU on 2016/09/27.
 * Licence : Do what the fuck you want to.
 */

$(function () {
    var A = JSON.parse($("#arch-data").attr('data-arch'));

    function mysort(a, b) {
        return parseInt(b) - parseInt(a);
    }

    function getYear() {
        var yearArr = [];
        for (var y in A) {
            yearArr.push(y.replace(/_/, ''));
        }
        return yearArr.sort(mysort);
    }

    function getMonthByYear(year) {
        var monthArr = [];
        for (var m in A["_" + year]) {
            monthArr.push(m.replace(/_/, ''));
        }
        return monthArr.sort(mysort);
    }

    function getDayByYearAndMonth(year, month) {
        var dayArr = [];
        for (var d in A["_" + year]["_" + month]) {
            dayArr.push(d.replace(/_/, ''));
        }

        return dayArr.sort(mysort);
    }

    function getPostByDate(year, month, day) {
        return A["_" + year]["_" + month]["_" + day];
    }

    function numTpl(numArr) {
        if (!numArr) return;
        var html = '';
        for (var i = 0; i < numArr.length; i++) {
            html += '<span class="num">' + numArr[i] + '</span><br>'
        }
        return html;
    }

    function postTpl(postArr) {
        if (!postArr) return;
        var html = '';
        for (var i = 0; i < postArr.length; i++) {
            html += '<a class="post" target="_blank" href="'
                + postArr[i].path + '">' + postArr[i].title + '</a><br>'
        }
        return html;
    }


    function emptyColByLevel(level) {
        $(".col").filter(function (index) {
            return index > level;
        }).children().fadeOut();
    }


    /* 初始化年份 */
    var $yearCol = $("#year-col");
    $yearCol.html(numTpl(getYear()));

    /* 全局变量 */
    var $yearNum = $yearCol.find("span"),
        $monthCol = $("#month-col"),
        $dayCol = $("#day-col"),
        $article = $("#post-col");

    /* 级联事件 */
    $yearNum.off("click").on("click", function () {
        $yearNum.removeClass("active");
        $(this).addClass("active");

        emptyColByLevel($(this).parent().attr('data-level'));
        $monthCol.html(numTpl(getMonthByYear($(this).text())));

        onMonthClick($(this).text());
    });

    function onMonthClick(year) {
        $monthNum = $monthCol.find("span");

        $monthNum.off("click").on("click", function () {
            $monthNum.removeClass("active");
            $(this).addClass("active");

            emptyColByLevel($(this).parent().attr('data-level'));

            // console.log(getDayByYearAndMonth(year, $(this).text()));

            $dayCol.html(numTpl(getDayByYearAndMonth(year, $(this).text())));

            onDayClick(year, $(this).text());
        });
    }

    function onDayClick(year, month) {
        $dayNum = $dayCol.find("span");

        $dayNum.off("click").on("click", function () {
            $dayNum.removeClass("active");
            $(this).addClass("active");

            $article.html(postTpl(getPostByDate(year, month, $(this).text())))
        });

    }


    // 测试
    // console.log(getYear());
    // console.log(getMonthByYear(16));
    // console.log(getDayByYearAndMonth('16', '09'));
    // console.log(getPostByDate('16', '09', '03'));
});