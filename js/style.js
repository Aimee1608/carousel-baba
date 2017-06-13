//init.js

//var mpenshui = document.getElementById('mpenshui');
//var mshiguan = document.getElementById('mshiguan');
//var mjiguanqiang = document.getElementById('mjiguanqiang');
//var mfenglangsheng = document.getElementById('mfenglangsheng');
//var mmiaobiao = document.getElementById('mmiaobiao');
//var myunsankai = document.getElementById('myunsankai');
//var mdeyu = document.getElementById('mdeyu');
//var mxishui = document.getElementById('mxishui');
//var mfang = document.getElementById('mfang');
//var mriyu = document.getElementById('mriyu');

var musicArray = ['mpenshui','mshiguan','mjiguanqiang','mfenglangsheng','mmiaobiao','myunsankai','mdeyu','mxishui','mfang','mriyu'];
function initMusic(musicIDArray){
    if(musicIDArray.length>0){
        for(var i=0;i<musicIDArray.length;i++){
            var player =document.getElementById(musicIDArray[i]);
            player.load();
        }
    }
}
function ImgLoadingByFile(imgArray,loadPageID,loadTxtID,readyID,musicID,showpageID){
    if(sessionStorage.getItem("pageloaded")){
        $('#'+loadTxtID).html('100%');
        $('#'+loadTxtID).hide();
        $('#'+readyID).show();
        $('#'+loadPageID).unbind('click').bind('click',function(){
            var timer = setTimeout(function(){
                $('#'+loadPageID).fadeOut(800);
                $('#'+showpageID).show();
                Carousel.init();
                //initMusic(musicArray);
                var player = document.getElementById(musicID);
                player.load();
                player.play();
                clearTimeout(timer);
            },500);
        });
    }else{
        var imgLoad = 0;
        if(imgArray.length>0){
            var imgTotal = imgArray.length;
            var percent = 0;
            var img = [];
            for(var i = 0;i<imgArray.length;i++){
                img[i] = new Image();
                img[i].src=imgArray[i];
                img[i].onload = function(){
                    imgLoad++;
                    percent = parseInt(imgLoad/imgTotal*100);
                    $('#'+loadTxtID).html(percent+'%');
                    if(percent>=100){
                      $('#'+loadTxtID).hide();
                        $('#'+readyID).show();
                        $('#'+loadPageID).unbind('click').bind('click',function(){
                            var timer = setTimeout(function(){
                                //initMusic(musicArray);
                                var player = document.getElementById(musicID);
                                player.play();
                                if(player.paused){
                                    player.play();
                                }
                                $('#'+loadPageID).fadeOut(800);
                                $('#'+showpageID).show();
                                Carousel.init();
                                clearTimeout(timer);
                            },500);
                        });
                        sessionStorage.setItem("pageloaded", "true");

                    }
                }
            }
        }
    }
}
(function(win){
    var remCalc = {};
    var docEl = win.document.documentElement,
        tid,
        hasRem = true;
    hasZoom = true;
    designWidth = 750;
    function refresh(){
        var width = docEl.getBoundingClientRect().width;
        if(hasRem){
            var rem = width/10;
            docEl.style.fontSize = rem + "px";
            remCalc.rem = rem;
            var actualSize = parseFloat(window.getComputedStyle(document.documentElement)["font-size"]);
            if(actualSize!== rem && actualSize>0 && Math.abs(actualSize-rem)>1){
                var remScaled = rem*rem/actualSize;
                docEl.style.fontSize = remScaled + "px";
            }
        }
        if(hasZoom){
            var style = document.getElementById('y_style');
            if(!style){
                style = document.createElement('style');
                style.id = 'y_style';
            }
            style.innerHTML = '._z{zoom:'+ width/designWidth + '}';
            document.getElementsByTagName('head')[0].appendChild(style);
        }
    }
    function dbcRefresh(){
        clearTimeout(tid);
        tid = setTimeout(refresh,100);
    }
    win.addEventListener("resize",function(){
        dbcRefresh()
    },false);
    win.addEventListener("pageshow",function(e){
        if(e.persisted){
            dbcRefresh()
        }
    },false);
    refresh();
    if(hasRem){
        remCalc.refresh = refresh;
        remCalc.rem2px = function(d){
            var val = parseFloat(d)/this.rem;
            if(typeof d==="string" && d.match(/px$/)){
                val+="rem";
            }
            return val
        };
        win.remCalc = remCalc;
    }
})(window);
//横屏
function landscape(){
    //var w = window.innerWidth;
    //var h = window.innerHeight;
    var w = window.Utils.windowW();
    var h = window.Utils.windowH();
    $("body").css({"width":w,"height":h});
    $('#page-landscape').css({"width":w,"height":h});
    //$('#page-portrait').css({"width":w,"height":h});
    $('#page-landscape').show();
    $('#page-portrait').hide();
}
var firstInit = true;

//竖屏
function portrait02(){
    var w = window.Utils.windowW();
    var h = window.Utils.windowH();
    $("body").css({"width":w,"height":h});
    $('#page-portrait').css({"width":w,"height":h});
    //$('.load-page').css({"width":w,"height":h});
    $('#page-landscape').hide();
    $('#page-portrait').show();
    //初始化加载
    if(firstInit){
        var imgFile = [
            './img/music-close.png',
            './img/music-open.png',
            './img/1.jpg',
            './img/2.jpg',
            './img/3.jpg',
            './img/4.jpg',
            './img/5.jpg',
            './img/6.jpg',
            './img/7.jpg',
            './img/8.jpg',
            './img/9.jpg',
            './img/10.jpg'

        ];
        ImgLoadingByFile(imgFile,'loadingPage','img-loading-txt','readyGo','musicStar','pageContainer');
        firstInit = false;

    }
    //音乐
    $(".open").click(function(){
        musicStar.pause();
        $(this).css("display","none");
        $(".clock").css("display","block");
    });
    $(".clock").click(function(){
        musicStar.play();
        $(this).css("display","none");
        $(".open").css("display","block");
    });

}
(function() {
    "use strict";

    function Utils() {
    }

    Utils.isWeiXin = function(){
        return navigator.userAgent.match(/MicroMessenger\/([\d\.]+)/);
    };
    Utils.isQQ = function(){
        return navigator.userAgent.ua.match(/QQ\/([\d\.]+)/);
    };
    Utils.isQZone = function(){
        return navigator.userAgent.ua.indexOf("Qzone/") !== -1;
    };

    Utils.isIos = function() {
        return !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    };
    Utils.isIPhone = function() {
        return navigator.userAgent.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1;
    };
    Utils.isIpad = function() {
        return navigator.userAgent.indexOf('iPad') > -1;
    };
    Utils.isAndroid = function() {
        var u = navigator.userAgent;
        return navigator.userAgent.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
    };
    Utils.isMobile = function() {
        // var u = navigator.userAgent;
        return navigator.userAgent.match(/(iPhone|iPod|Android|ios|SymbianOS)/i) != null;
    };

    // ## 屏幕方向
    Utils.isPortrait = function() {
        if (!Utils.isMobile()) {
            //alert(111);
            return true;

        }
        // 安卓版 微信里面 只用判断 width 和 height
        if (Utils.isAndroid() && Utils.isWeiXin()) {
            if (Utils.windowW() < Utils.windowH()) {
                //alert(22);
                return true;

            } else {
                //alert(331);
                return false;

            }
        }
        var orientation = window['orientation'];
        if (orientation||orientation==0) {
            if (orientation == 90 || orientation == -90) {
                //alert(4442);
                return false;

            }else{
                //alert(555111);
                return true;

            }
        } else {
            if (Utils.windowW() < Utils.windowH()) {
                //alert(666111);
                return true;

            } else {
                //alert(777111);
                return false;

            }
        }
    };
    // ## jquery 获取 window 的宽度
    Utils.windowW = function() {
        // var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
        return $(window).width();
    };
    // ## jquery 获取 window 的高度
    Utils.windowH = function() {
        return $(window).height();
    };
    window.Utils = Utils;
}());
$(function(){
    onResize();
    if (!!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
        window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", onResize, false);
    }else{
        window.addEventListener( "resize", onResize, false);
    }
});

function  onResize() {

    if(Utils.isPortrait()){
        if(!!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)){

            var timer = setTimeout(function(){
                portrait02();

                clearTimeout(timer);
            },100);
        }else{
            portrait02();
        }
    } else {
        if(!!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)){
            var timer = setTimeout(function(){
                landscape();
                clearTimeout(timer);
            },100);
        }else{
            landscape();
        }
    }
}



