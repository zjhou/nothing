/*
 * Created by ZjHOU on 2016/10/11.
 * Licence : Do what the fuck you want to.
 */

/* 数据请求
 *------------------------------------------------*/
var API = {
    loadCmt: "http://localhost:3000/findCmtByPathName/",
    newCmt: "http://localhost:3000/comments/",
    hasCmtToday: "http://localhost:3000/existCmtToday/"
};

var pathname = window.location.pathname.replace(/\//g, '');

function ajaxReq(url, type, callback, data) {
    $.ajax({
        url: url,
        dataType: 'json',
        cache: true,
        data: {params: JSON.stringify(data)},
        type: type,
        success: function (data) {
            callback(data);
        }
    });
}

function loadCmt(pathname, callback) {
    ajaxReq(API.loadCmt + pathname, 'get', callback);
}

function addCmt(cmtData) {
    ajaxReq(API.newCmt, 'post', function () {
        loadCmt(pathname, function (data) {
            $("#histCmt").empty().append(cmtsTpl(data.message))
        });

        $("#newCmt").empty();

        rstCmtBox();
        msg('');

    }, cmtData)
}

function hasCmtToday(pathname, callback) {
    ajaxReq(API.hasCmtToday + pathname, 'get', function (data) {
        callback(data);
    }) ;
}


/* 前端视图
 *------------------------------------------------*/
function cmtFrmTpl() {
    return '<section id="comments"><hr>' +
           '<div id="newCmt"></div><br>' +
           '<div id="msgBox"></div><br>' +
           '<div id="histCmt"></div><hr>' +
           '</section>'
}

function newCmtTpl() {
    return '<textarea placeholder="留言（少于500字）" id="cont"></textarea>' +
        '<input placeholder="姓名" id="name"/><br>' +
        '<input placeholder="网站" id="site"/><br>' +
        '<input placeholder="邮箱" id="email"/><br>' +
        '<button id="newCmtOk">确认</button>';
}


function cmtsTpl(cmts) {
    var html = '', rep = '';

    for(var i = 0; i < cmts.length; i++){
        rep = cmts[i].rep ? repTpl(cmts[i].rep, cmts[i].author.name) : '';
        html += '<div class="comment" data-id="' + cmts[i]._id + '" data-path="' + cmts[i].url + '">' +
            '<div><span>' +
            '<a class="author" href="' + cmts[i].author.site + '">' + cmts[i].author.name + '</a>' +
            '(<small>' + cmts[i].date + '</small>):</span></div>' +
            '<div>' + cmts[i].content + '</div>' + rep + '</div>'
    }
    return html;

    function repTpl(repCont, who) {
        return  '<div class="rep"><span>回复 ' + who + ':</span><div class="repCont">' + repCont + '</div></div>';
    }
}

function cmtValidate(cmt) {
    var url_reg = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,56}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
        email_reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        tag_reg = /<(.|\n)*?>/g;

    cmt.author.name = cmt.author.name.replace(tag_reg, '') || 'Anonymous';
    cmt.url = cmt.url.replace(tag_reg, '');

    if(!cmt.author.site.match(url_reg)){cmt.author.site= ""}
    if(!cmt.author.email.match(email_reg)){cmt.author.email = ""}

    if(cmt.author.name.length > 50){return false}
    if(cmt.url.length > 100){return false}
    if(cmt.content.length > 500 || cmt.content.length == 0){return false}

    return true;
}

function rstCmtBox() {
    $('#name').val("");
    $('#cont').val("");
    $('#site').val("");
    $('#email').val("");
}

function msg(msg) {
    $("#msgBox").html(msg);
}

function init() {

    $('section:first').after(cmtFrmTpl());

    loadCmt(pathname, function (data) {
        //todo 实现单条加载，模板局部更新
        $("#histCmt").empty().append(cmtsTpl(data.message))
    });

    hasCmtToday(pathname, function (result) {
        if(!result.hasCmt){
            $("#newCmt").empty().append(newCmtTpl());
            $("#newCmtOk").click(function () {
                var postData = {};

                postData.author = {};
                postData.author.name = $("#name").val();
                postData.author.email = $("#email").val();
                postData.author.site = $("#site").val();
                postData.content = $("#cont").val();
                postData.url = pathname;

                if(cmtValidate(postData)){
                    addCmt(postData);
                }else{
                    rstCmtBox();
                    msg("请填写正确的信息。帮助：<a href=''>关于评论</a>")
                }
            })
        }
     });
}

init();

