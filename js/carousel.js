/**
 * Created by jiangqian on 2017/6/5.
 */
var getPixelRatio = function(context) {
    var backingStore = context.backingStorePixelRatio ||
        context.webkitBackingStorePixelRatio ||
        context.mozBackingStorePixelRatio ||
        context.msBackingStorePixelRatio ||
        context.oBackingStorePixelRatio ||
        context.backingStorePixelRatio || 1;
    return (window.devicePixelRatio || 1) / backingStore;
};

    var Carousel = {
        data:{
            count:0,//数量
            totalWidth:0,//总宽度
            countArray:[0,1,2,3,4,5,6,7,8,9],
            itemWidth:0,//单个宽度
            margin:0,//外边距
            posterWidth:0,//总共的宽度
            speed:23,//移动速度
            timer:null,//移动定时器
            itemArray:null,//子元素数组
            itemLeft:[],//子元素的左定位
            flag:true,
            catched:false,//是否抓到
            result:null,//结果
            timeout:false,
            canvas:document.createElement('canvas'),//画布
            ctx:null,//画板
            ratio:1,//手机像素
            w:null,//页面宽
            h:null,//页面高
            head:null,//头像
            imgData:null,
            text:['黄磊','摔跤吧爸爸','王健林','小狄爸爸','甲方爸爸','贝克汉姆','赵本山','勇度','奥特之父','牛魔王']
        },
        init:function(){//初始化
            //console.log(Carousel.data);
            Carousel.data.count = $('.poster-list li').length;
            Carousel.data.totalWidth = parseFloat($('.poster-list').css("width"));
            Carousel.data.itemWidth = parseFloat($('.poster-list li').css("width"));
            Carousel.data.posterWidth = Carousel.data.itemWidth + Carousel.data.margin;
            Carousel.data.itemArray = $('.poster-list li');
            function mess(arr){
                var _floor = Math.floor, _random = Math.random,
                    len = arr.length, i, j, arri,
                    n = _floor(len/2)+1;
                while( n-- ){
                    i = _floor(_random()*len);
                    j = _floor(_random()*len);
                    if( i!==j ){
                        arri = arr[i];
                        arr[i] = arr[j];
                        arr[j] = arri;
                    }
                }
                return arr;
            }
            mess(Carousel.data.countArray);
            for(var i = 0;i< Carousel.data.countArray.length;i++){
                var item = $('.poster-list li')[i];
                $(item).css({'transform':'translateX('+Carousel.data.posterWidth*Carousel.data.countArray[i]+'px)','-webkit-transform':'translateX('+Carousel.data.posterWidth*Carousel.data.countArray[i]+'px)'});
                Carousel.data.itemLeft.push(Carousel.data.posterWidth*Carousel.data.countArray[i]);
            }

            Carousel.data.ctx = Carousel.data.canvas.getContext("2d");
            Carousel.data.ratio = getPixelRatio( Carousel.data.ctx);
            Carousel.data.w = window.innerWidth;
            Carousel.data.h = window.innerHeight;
            Carousel.data.canvas.width =Carousel.data.w*Carousel.data.ratio;
            Carousel.data.canvas.height=Carousel.data.h*Carousel.data.ratio;
            Carousel.data.head = new Image();
            Carousel.data.head.crossOrigin = "*";
            Carousel.data.head.src = headimgurl;
            //Carousel.data.head.src = 'img/head.jpg';
            Carousel.data.head.onload = function(){
                //console.log(Carousel.data.head.width,Carousel.data.head.height);
                Carousel.move();
                Carousel.control();
            };
        },
        draw:function(img02){//生成头像
            Carousel.data.ctx.clearRect(0,0,Carousel.data.canvas.width,Carousel.data.canvas.height);
            Carousel.data.ctx.fillStyle = '#000000';
            Carousel.data.ctx.fillRect(0,0,Carousel.data.canvas.width, Carousel.data.canvas.height);
            //画头像
            Carousel.data.ctx.drawImage(Carousel.data.head,0,0,Carousel.data.head.width,Carousel.data.head.height,138/750*Carousel.data.w*Carousel.data.ratio,645/1206*Carousel.data.h* Carousel.data.ratio,68* Carousel.data.ratio,68* Carousel.data.ratio);
            //画结果图
            Carousel.data.ctx.drawImage(img02,0,0,750,1206,0,0,Carousel.data.canvas.width, Carousel.data.canvas.height);
            //img 数据，可传给后台数据库
            Carousel.data.imgData = Carousel.data.canvas.toDataURL();
            shareText = Carousel.data.text[Carousel.data.result];
            $.ajax({
                type:'post',
                url:'https://h5php.xingyuanauto.com/portframe/public/index.php/active/Wechadfather/UserMessageAdd',
                //data:{openid:openid,nickname:nickname,base64_img:Carousel.data.imgData,'father_name': Carousel.data.text[Carousel.data.result]},
                data:{openid:openid,nickname:nickname,headimgurl:headimgurl,'father_name': Carousel.data.text[Carousel.data.result]},
                dataType:'json',
                success:function(msg){
                    //var msg = JSON.parse(msg);
                    //alert(msg);
                    shareID = openid;
                    fatherID = Carousel.data.result;
                    weixinShare();
                },
                error:function(msg){
                    var msg = JSON.parse(msg);
                    alert('666'+msg.msg);
                }
            });
            return Carousel.data.imgData;
        },
        move:function(){//移动
            //var timeout = Carousel.data.timeout; //启动及关闭按钮
            function time()
            {
                if(Carousel.data.timeout) return;
                Method();
                Carousel.data.timer = setTimeout(time,Carousel.data.speed); //time是指本身,延时递归调用自己,100为间隔调用时间,单位毫秒
            }
            function Method(){
                var n=0.8;//移动步长
                for(var i=0;i<Carousel.data.itemArray.length;i++){
                    if( Carousel.data.itemLeft[i]<=-Carousel.data.posterWidth){
                        $(Carousel.data.itemArray[i]).css({'transform':'translateX('+(-n+Math.max.apply(null, Carousel.data.itemLeft)+Carousel.data.posterWidth)+'px)','-webkit-transform':'translateX('+(-n+Math.max.apply(null, Carousel.data.itemLeft)+Carousel.data.posterWidth)+'px)'});
                        Carousel.data.itemLeft[i] =-n+ Math.max.apply(null, Carousel.data.itemLeft)+Carousel.data.posterWidth;
                    }else{
                        $(Carousel.data.itemArray[i]).css({'transform':'translateX('+(-n+Carousel.data.itemLeft[i])+'px)','-webkit-transform':'translateX('+(-n+Carousel.data.itemLeft[i])+'px)'});
                        Carousel.data.itemLeft[i] = -n+Carousel.data.itemLeft[i];
                    }
                }
            }
            time();
            //Carousel.data.timer = setInterval(function() {
            //    var n=0.8;//移动步长
            //    for(var i=0;i<Carousel.data.itemArray.length;i++){
            //        if( Carousel.data.itemLeft[i]<=-Carousel.data.posterWidth){
            //            $(Carousel.data.itemArray[i]).css({'transform':'translateX('+(-n+Math.max.apply(null, Carousel.data.itemLeft)+Carousel.data.posterWidth)+'px)','-webkit-transform':'translateX('+(-n+Math.max.apply(null, Carousel.data.itemLeft)+Carousel.data.posterWidth)+'px)'});
            //            Carousel.data.itemLeft[i] =-n+ Math.max.apply(null, Carousel.data.itemLeft)+Carousel.data.posterWidth;
            //        }else{
            //            $(Carousel.data.itemArray[i]).css({'transform':'translateX('+(-n+Carousel.data.itemLeft[i])+'px)','-webkit-transform':'translateX('+(-n+Carousel.data.itemLeft[i])+'px)'});
            //            Carousel.data.itemLeft[i] = -n+Carousel.data.itemLeft[i];
            //        }
            //    }
            //},Carousel.data.speed);
        },
        stop:function(){//抓取
            //停止移动
            //clearInterval(Carousel.data.timer);
            //Carousel.data.timer = null;
            //if(!Carousel.data.timeout){
            //    return
            //}
            Carousel.data.timeout = true;
            clearTimeout(Carousel.data.timer);
            Carousel.data.timer = null;
            $(".button").removeClass('buttonmove');
            $('.dai').removeClass('daimove');
            var zleft = parseFloat($('.zhua').css('left'));
            var zwidth = parseFloat($('.zhua').css('width'));

            //判断是否抓到
            for(var i=0;i<Carousel.data.itemLeft.length;i++){
                var left = Carousel.data.itemLeft[i];
                if((left+0.05*zwidth)<=zleft && zleft<=(left+Carousel.data.itemWidth*0.5)){
                    //抓到娃娃动画
                    Carousel.data.catched = true;
                    Carousel.data.result = i;
                }
            }
            if(Carousel.data.catched){
                //抓到后结果页显示动画

                $('.zhua').removeClass('zhuamove').addClass('zhuadown');
                //抓抓取动画
                var timer01 = setTimeout(function(){
                    $('.zhua').removeClass('zhuadown').addClass('zhuashou');
                    //暂停背景音乐
                    musicStar.pause();
                    var timer03 = setTimeout(function(){

                        $('.zhua').removeClass('zhuashou').addClass('zhuaup');//向下抓
                        //爸爸出去
                        $('.people0'+(Carousel.data.result+1)).addClass('img-slideUp');
                        //播放对应爸爸音乐
                        musicArray[Carousel.data.result].play();
                        clearTimeout(timer03);
                        timer03 = null;
                    },800);
                    //console.log($('.people0'+(Carousel.data.result+1)));
                    var timer02  = setTimeout(function(){
                        $('.zhua').removeClass('zhuaup');//向下抓
                        //爸爸被抓到向上走
                        $('.people0'+(Carousel.data.result+1)).addClass('img-slideOutUp');
                        $('.zhua').addClass('zhuaOutUp');
                        clearTimeout(timer02);
                        timer02 = null;
                    },3000);
                    clearTimeout(timer01);
                    timer01 = null;
                },1000);
                //是否为甲方爸爸
                if(Carousel.data.result==4){
                    $('.yellow').show();
                }else{
                    $('.write').show();
                }
                var img = new Image();
                img.src = 'img/result/result0'+(Carousel.data.result+1)+'.png';
                img.onload = function(){
                    //生成的图片显示
                    $('#answer-box .resultImg').attr('src', Carousel.draw(img));
                    $('.long-up').show();
                    //图片飞下来
                    $('#answer-box').addClass('answer-box-show');
                    //保存图片提示动画
                    $('.long-up').addClass('long-up-show');
                    $('.long-up').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                        $('.long-up').removeClass('long-up-show');
                        $('.long-up').hide();
                    });
                };
            }else{
                //没抓到，展示提示框
                $('.zhua').removeClass('zhuamove').addClass('zhuadown');
                //抓抓取动画
                var timershow = setTimeout(function(){
                    $('.zhua').removeClass('zhuadown').addClass('zhuashou');
                    //暂停背景音乐
                    musicStar.pause();
                    var timer03 = setTimeout(function() {
                        $('.zhua').removeClass('zhuashou').addClass('zhuaup');//向下抓
                        clearTimeout(timer03);
                        timer03 = null;
                    },800);
                    clearTimeout(timershow);
                    timershow = null;
                },1000);
                //弹出没抓到弹框
                var timer02 = setTimeout(function(){
                    error.play();
                    $('#again-box').show();
                    clearTimeout(timer02);
                    timer02 = null;
                },3000);
                $('#again-box').click(function(){//关闭弹窗重新开抓
                    $('.zhua').removeClass('zhuadown').removeClass('zhuaup').removeClass('zhuaOutUp');
                    $('.again-box').hide();
                    if(!error.paused){
                        error.pause();
                    }
                    Carousel.start();
                })
            }
        },
        start:function(){//开始，初始化
            if(Carousel.data.timer==null){
                $('.guang').hide();
                $('.zhua').addClass('zhuamove');
                $(".button").addClass('buttonmove');
                $('.dai').addClass('daimove');
                if(Carousel.data.result){
                    musicArray[Carousel.data.result].pause();
                }
                if($('.open').hasClass('show')) {
                    musicStar.play();
                }else{
                    musicStar.pause();
                }
                $('#answer-box').removeClass('answer-box-show');
                $('.again-box').hide();
                $('.zhua').removeClass('zhuadown').removeClass('zhuaOutUp');
                $(Carousel.data.itemArray).removeClass('img-active');
                $('.people0'+(Carousel.data.result+1)).removeClass('img-slideUp').removeClass('img-slideOutUp');
                Carousel.data.catched = false;
                Carousel.data.result = null;
                Carousel.data.timeout = false;
                Carousel.move();
            }
        },
        control:function(){//控制
            $('#stop').click(Carousel.stop);
            $('#start').click(Carousel.start);
        }
    };
