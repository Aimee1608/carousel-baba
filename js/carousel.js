/**
 * Created by jiangqian on 2017/6/5.
 */
$(function(){
    var Carousel = {
        data:{
            count:$('.poster-list li').length,//娃娃总数
            totalWidth:parseFloat($('.poster-list').css("width")),//娃娃的总宽度
            itemWidth:parseFloat($('.poster-list li').css("width")),//娃娃的宽度
            margin:50,//娃娃的距离
            posterWidth:parseFloat($('.poster-list li').css("width"))+50,//包含margin的娃娃的宽
            speed:5,//娃娃移动的速度
            timer:null,//定时器
            itemArray:$('.poster-list li'),//娃娃数组
            itemLeft:[],//娃娃水平的定位
            flag:true,
            catched:false//是否已抓到
        },
        init:function(){//初始化页面
            console.log(Carousel.data);
            for(var i = 0;i<Carousel.data.itemArray.length;i++){
                var item = $('.poster-list li')[i];
                //console.log($('.poster-list li')[i]);
                $(item).css('left',Carousel.data.posterWidth*i);
                //$(item).css('transform','translateX('+Carousel.data.posterWidth*i+'px)');
                Carousel.data.itemLeft.push(Carousel.data.posterWidth*i);
            }
            Carousel.move();
            $('#stop').click(Carousel.stop);
            $('#start').click(Carousel.start);
        },
        move:function(){//移动
            Carousel.data.timer = setInterval(function() {
                var n=0.5;
                for(var i=0;i<Carousel.data.itemArray.length;i++){
                    if( Carousel.data.itemLeft[i]<=-Carousel.data.posterWidth){
                        $(Carousel.data.itemArray[i]).css('left',-n+Math.max.apply(null, Carousel.data.itemLeft)+Carousel.data.posterWidth);
                        //$(Carousel.data.itemArray[i]).css('transform','translateX('+(-n+Math.max.apply(null, Carousel.data.itemLeft)+Carousel.data.posterWidth)+'px)');
                        Carousel.data.itemLeft[i] =-n+ Math.max.apply(null, Carousel.data.itemLeft)+Carousel.data.posterWidth;
                    }else{
                        $(Carousel.data.itemArray[i]).css('left',-n+Carousel.data.itemLeft[i]);
                        //$(Carousel.data.itemArray[i]).css('transform','translateX('+(-n+Carousel.data.itemLeft[i])+'px)');
                        Carousel.data.itemLeft[i] = -n+Carousel.data.itemLeft[i];
                    }
                    //$(Carousel.data.itemArray[i]).css('left',-n+Carousel.data.itemLeft[i]);
                    //Carousel.data.itemLeft[i] = -n+Carousel.data.itemLeft[i];
                }
                //console.log(Carousel.data.itemLeft);

            },Carousel.data.speed);

        },
        stop:function(){//暂停移动抓娃娃
            clearInterval(Carousel.data.timer);
            Carousel.data.timer = null;
            $('.zhua').addClass('zhuadown');
            var zleft = parseFloat($('.zhua').css('left'));
            var zwidth = parseFloat($('.zhua').css('width'));
            console.log(zleft);
            for(var i=0;i<Carousel.data.itemLeft.length;i++){
                var left = Carousel.data.itemLeft[i];
                console.log(left,i);
                if(left<=zleft&&(zleft)<=(left+Carousel.data.itemWidth)){
                    console.log(i);
                    $(Carousel.data.itemArray[i]).addClass('active');
                    Carousel.data.catched = true;
                }
            }
            if(Carousel.data.catched){
                $('.result').show();
                $('.catched').show();
                $('.nocatched').hide();
            }else{
                $('.result').show();
                $('.nocatched').show();
                $('.catched').hide();
            }
        },
        start:function(){//开始移动
            if(Carousel.data.timer==null){
                Carousel.move();
                $('.zhua').removeClass('zhuadown');
                $(Carousel.data.itemArray).removeClass('active');
                $('.result').hide();
                $('.catched').hide();
                $('.nocatched').hide();
                Carousel.data.catched = false;
            }
        }
    };
    Carousel.init();
});