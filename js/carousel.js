/**
 * Created by jiangqian on 2017/6/5.
 */
    var Carousel = {
        data:{
            count:0,//数量
            totalWidth:0,//总宽度
            itemWidth:0,//单个宽度
            margin:50,//外边距
            posterWidth:0,//总共的宽度
            speed:15,//移动速度
            timer:null,//移动定时器
            itemArray:null,//子元素数组
            itemLeft:[],//子元素的左定位
            flag:true,
            catched:false,//是否抓到
            result:null//结果
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
            Carousel.move();
            Carousel.control();

        },
        move:function(){//移动
            Carousel.data.timer = setInterval(function() {
                var n=0.6;
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

                    //$(Carousel.data.itemArray[i]).css('left',-n+Carousel.data.itemLeft[i]);
                    //Carousel.data.itemLeft[i] = -n+Carousel.data.itemLeft[i];
                }
                //console.log(Carousel.data.itemLeft,Carousel.data.itemWidth,Carousel.data.posterWidth);
                //console.log(parseFloat($('.poster-list li').css("width")),Carousel.data.itemWidth);
            },Carousel.data.speed);

        },
        stop:function(){//抓取
            clearInterval(Carousel.data.timer);
            Carousel.data.timer = null;
            $('.zhua').addClass('zhuadown');
            $('.zhua').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                $('.zhua').addClass('zhuaup');
            });
            var zleft = parseFloat($('.zhua').css('left'));
            var zwidth = parseFloat($('.zhua').css('width'));
            console.log(zleft);
            for(var i=0;i<Carousel.data.itemLeft.length;i++){
                var left = Carousel.data.itemLeft[i];
                //console.log(left,i);
                if(left<=zleft && zleft<=(left+Carousel.data.itemWidth)){
                    //console.log(i);
                    $(Carousel.data.itemArray[i]).addClass('img-active');
                    Carousel.data.catched = true;
                    Carousel.data.result = i;
                }
            }
            if(Carousel.data.catched){
                $('#answer-box img').attr('src','img/'+(Carousel.data.result+1)+'.jpg');
                $('#answer-box').addClass('answer-box-show');
            }else{
                $('.again-box').show();
                $('.zhua').removeClass('zhuadown').removeClass('zhuaup');
            }
        },
        start:function(){//开始
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
