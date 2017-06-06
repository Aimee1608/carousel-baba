/**
 * Created by jiangqian on 2017/6/5.
 */
$(function(){
    var Carousel = {
        data:{
            count:$('.poster-list li').length,//��������
            totalWidth:parseFloat($('.poster-list').css("width")),//���޵��ܿ��
            itemWidth:parseFloat($('.poster-list li').css("width")),//���޵Ŀ��
            margin:50,//���޵ľ���
            posterWidth:parseFloat($('.poster-list li').css("width"))+50,//����margin�����޵Ŀ�
            speed:5,//�����ƶ����ٶ�
            timer:null,//��ʱ��
            itemArray:$('.poster-list li'),//��������
            itemLeft:[],//����ˮƽ�Ķ�λ
            flag:true,
            catched:false//�Ƿ���ץ��
        },
        init:function(){//��ʼ��ҳ��
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
        move:function(){//�ƶ�
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
        stop:function(){//��ͣ�ƶ�ץ����
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
        start:function(){//��ʼ�ƶ�
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