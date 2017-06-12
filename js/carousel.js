/**
 * Created by jiangqian on 2017/6/5.
 */
$(function(){
    var Carousel = {
        data:{
            count:$('.poster-list li').length,//数量
            totalWidth:parseFloat($('.poster-list').css("width")),//总宽度
            itemWidth:parseFloat($('.poster-list li').css("width")),//单个宽度
            margin:50,//外边距
            posterWidth:parseFloat($('.poster-list li').css("width"))+50,//总共的宽度
            speed:5,//移动速度
            timer:null,//移动定时器
            itemArray:$('.poster-list li'),//子元素数组
            itemLeft:[],//子元素的左定位
            flag:true,
            catched:false,//是否抓到
            result:null//结果
        },
        init:function(){//初始化
            console.log(Carousel.data);
            for(var i = 0;i<Carousel.data.itemArray.length;i++){
                var item = $('.poster-list li')[i];
                //console.log($('.poster-list li')[i]);
                $(item).css('left',Carousel.data.posterWidth*i);
                //$(item).css('transform','translateX('+Carousel.data.posterWidth*i+'px)');
                Carousel.data.itemLeft.push(Carousel.data.posterWidth*i);
            }
            Carousel.move();
            Carousel.control();

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
            },Carousel.data.speed);

        },
        stop:function(){//抓取
            clearInterval(Carousel.data.timer);
            $('#stop').hide();
            Carousel.data.timer = null;
            $('.zhua').addClass('zhuadown');
            var zleft = parseFloat($('.zhua').css('left'));
            var zwidth = parseFloat($('.zhua').css('width'));
            console.log(zleft);
            for(var i=0;i<Carousel.data.itemLeft.length;i++){
                var left = Carousel.data.itemLeft[i];
                console.log(left,i);
                if(left<=zleft && zleft<=(left+Carousel.data.itemWidth)){
                    console.log(i);
                    $(Carousel.data.itemArray[i]).addClass('active');
                    Carousel.data.catched = true;
                    Carousel.data.result = i;
                }
            }
            if(Carousel.data.catched){
                $('.result').show();
                $('.catched').show();
                $('.nocatched').hide();
                $('#choosed').show();

            }else{
                $('.result').show();
                $('.nocatched').show();
                $('.catched').hide();
                $('#again').show();
            }
        },
        start:function(){//开始
            if(Carousel.data.timer==null){
                $('#answer').hide();
                $('#choosed').hide();
                $('#again').hide();
                $('#stop').show();
                Carousel.move();
                $('.zhua').removeClass('zhuadown');
                $(Carousel.data.itemArray).removeClass('active');
                $('.result').hide();
                $('.catched').hide();
                $('.nocatched').hide();
                Carousel.data.catched = false;
                Carousel.data.result = null;
            }
        },
        control:function(){//控制
            $('#stop').click(Carousel.stop);
            $('#start').click(Carousel.start);
            $('#choosed').click(function(){
                if(Carousel.data.result!=null){
                    console.log(Carousel.data.result);
                    $('#answer img').attr('src','img/'+(Carousel.data.result+1)+'.jpg');
                    $('#answer').show();
                }else{
                    Carousel.move();
                    $('.zhua').removeClass('zhuadown');
                    $('#choosed').hide();
                    $('#stop').show();
                }
            });
            $('#again').click(function(){
                Carousel.start();
            })
        }

    };
    Carousel.init();


});