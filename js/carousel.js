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
            itemWidth:0,//单个宽度
            margin:0,//外边距
            posterWidth:0,//总共的宽度
            speed:15,//移动速度
            timer:null,//移动定时器
            itemArray:null,//子元素数组
            itemLeft:[],//子元素的左定位
            flag:true,
            catched:false,//是否抓到
            result:null,//结果
            canvas:document.createElement('canvas'),//画布
            ctx:null,//画板
            ratio:1,//手机像素
            w:null,//页面宽
            h:null,//页面高
            head:null,//头像
            imgData:null
        },
        init:function(){//初始化
            console.log(Carousel.data);
            Carousel.data.count = $('.poster-list li').length;
            Carousel.data.totalWidth = parseFloat($('.poster-list').css("width"));
            Carousel.data.itemWidth = parseFloat($('.poster-list li').css("width"));
            Carousel.data.posterWidth = Carousel.data.itemWidth + Carousel.data.margin;
            Carousel.data.itemArray = $('.poster-list li');
            for(var i = 0;i<Carousel.data.itemArray.length;i++){
                var item = $('.poster-list li')[i];
                //console.log($('.poster-list li')[i]);
                //$(item).css('left',Carousel.data.posterWidth*i);
                $(item).css('transform','translateX('+Carousel.data.posterWidth*i+'px)');
                Carousel.data.itemLeft.push(Carousel.data.posterWidth*i);
            }

            Carousel.data.ctx = Carousel.data.canvas.getContext("2d");
            Carousel.data.ratio = getPixelRatio( Carousel.data.ctx);
            Carousel.data.w = window.innerWidth;
            Carousel.data.h = window.innerHeight;
            Carousel.data.canvas.width =Carousel.data.w*Carousel.data.ratio;
            Carousel.data.canvas.height=Carousel.data.h*Carousel.data.ratio;
            Carousel.data.head = new Image();
            Carousel.data.head.src= 'img/head.jpg';
            Carousel.data.head.onload = function(){

                console.log(Carousel.data.head.width,Carousel.data.head.height);
                //Carousel.data.head.width = 46* Carousel.data.ratio;
                //Carousel.data.head.height = 46* Carousel.data.ratio;
                //var canvasHead = document.createElement('canvas');
                //var ctxHead = canvasHead.getContext("2d");
                //canvasHead.width = 100* Carousel.data.ratio;
                //canvasHead.height = 100* Carousel.data.ratio;
                //ctxHead.drawImage(Carousel.data.head,0,0,Carousel.data.head.width,Carousel.data.head.height,0,0,canvasHead.width,canvasHead.height);
                //
                //Carousel.data.imgPattern = Carousel.data.ctx.createPattern(canvasHead, "no-repeat");
            };

            Carousel.move();
            Carousel.control();

        },
        draw:function(img){//生成头像
            Carousel.data.ctx.clearRect(0,0,Carousel.data.canvas.width,Carousel.data.canvas.height);

            Carousel.data.ctx.fillStyle = '#000000';
            Carousel.data.ctx.fillRect(0,0,Carousel.data.canvas.width, Carousel.data.canvas.height);
            //画结果图
            Carousel.data.ctx.drawImage(img,0,0,445,376,0,0,Carousel.data.canvas.width, Carousel.data.canvas.height);
            //画头像
            Carousel.data.ctx.drawImage(Carousel.data.head,0,0,Carousel.data.head.width,Carousel.data.head.height,30*Carousel.data.ratio,50* Carousel.data.ratio,100* Carousel.data.ratio,100* Carousel.data.ratio);
            Carousel.data.ctx.beginPath();
            //img 数据，可传给后台数据库
            Carousel.data.imgData = Carousel.data.canvas.toDataURL();
            return Carousel.data.imgData;


        },
        move:function(){//移动
            Carousel.data.timer = setInterval(function() {
                var n=0.6;//移动步长
                for(var i=0;i<Carousel.data.itemArray.length;i++){
                    if( Carousel.data.itemLeft[i]<=-Carousel.data.posterWidth*5){
                        //$(Carousel.data.itemArray[i]).css('left',-n+Math.max.apply(null, Carousel.data.itemLeft)+Carousel.data.posterWidth);
                        $(Carousel.data.itemArray[i]).css('transform','translateX('+(-n+Math.max.apply(null, Carousel.data.itemLeft)+Carousel.data.posterWidth)+'px)');
                        Carousel.data.itemLeft[i] =-n+ Math.max.apply(null, Carousel.data.itemLeft)+Carousel.data.posterWidth;
                    }else{
                        //$(Carousel.data.itemArray[i]).css('left',-n+Carousel.data.itemLeft[i]);
                        $(Carousel.data.itemArray[i]).css('transform','translateX('+(-n+Carousel.data.itemLeft[i])+'px)');
                        Carousel.data.itemLeft[i] = -n+Carousel.data.itemLeft[i];
                    }
                }
                //console.log(Carousel.data.itemLeft,Carousel.data.itemWidth,Carousel.data.posterWidth);
                //console.log(parseFloat($('.poster-list li').css("width")),Carousel.data.itemWidth);
            },Carousel.data.speed);

        },
        stop:function(){//抓取
            //停止移动
            clearInterval(Carousel.data.timer);
            Carousel.data.timer = null;
            //抓抓取动画
            $('.zhua').addClass('zhuadown');
            $('.zhua').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                $('.zhua').addClass('zhuaup');
            });
            var zleft = parseFloat($('.zhua').css('left'));
            var zwidth = parseFloat($('.zhua').css('width'));

            console.log(zleft);
            //判断是否抓到
            for(var i=0;i<Carousel.data.itemLeft.length;i++){
                var left = Carousel.data.itemLeft[i];
                //console.log(left,i);
                if(left*3/2<=zleft && zleft<=(left*0.5+Carousel.data.itemWidth)){
                    //抓到娃娃动画
                    $(Carousel.data.itemArray[i]).addClass('img-active');
                    Carousel.data.catched = true;
                    Carousel.data.result = i;
                }
            }
            if(Carousel.data.catched){
                //抓到后结果页显示动画
                var img = new Image();
                img.src = 'img/'+(Carousel.data.result+1)+'.jpg';
                img.onload = function(){
                    $('#answer-box img').attr('src', Carousel.draw(img));
                };
                $('#answer-box').addClass('answer-box-show');
            }else{
                //没抓到，展示提示框
                $('.again-box').show();
                $('.zhua').removeClass('zhuadown').removeClass('zhuaup');
            }
        },
        start:function(){//开始，初始化
            if(Carousel.data.timer==null){
                $('#answer-box').removeClass('answer-box-show');
                $('.again-box').hide();
                Carousel.move();
                $('.zhua').removeClass('zhuadown').removeClass('zhuaup');
                $(Carousel.data.itemArray).removeClass('img-active');
                Carousel.data.catched = false;
                Carousel.data.result = null;
            }
        },
        control:function(){//控制
            $('#stop').click(Carousel.stop);
            $('#start').click(Carousel.start);
            $('#again').click(function(){
                $('.again-box').hide();
                Carousel.start();
            })
        }

    };
