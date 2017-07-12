/**
 * Created by jiangqian on 2017/6/14.
 */
//修改appid、redirect_uri

var code =GetQueryString('code');
var openid = null;
var headimgurl = null;
var shareID = null;
var shareText = null;
var nickname = null;
var fatherID = null;

if(code!=null&&code!=undefined){//网页授权获取code
       if(sessionStorage['headimgurl']){
           headimgurl = sessionStorage['headimgurl'];
           openid = sessionStorage['openid'];
           nickname = sessionStorage['nickname'];
       }else{
           $.ajax({//获取token值
               type:"post",
               url:"https://h5php.xingyuanauto.com/portframe/public/index.php/active/Wechadfather/UserInfo",
               data:{code:code},
               dataType: "json",
               success:function(msg){
                   //alert(msg.headimgurl+',,,,token');
                   headimgurl = msg.headimgurl.substr(0,msg.headimgurl.length-1)+'132';
                   openid = msg.openid;
                   nickname = msg.nickname;
                   sessionStorage['headimgurl'] = headimgurl;
                   sessionStorage['openid'] = openid;
                   sessionStorage['nickname'] = nickname;
               },
               error:function(msg){
                   alert('错误信息：'+msg.code);
                   //window.location.href = '';
               }
           })
       }


}else{
    window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxe3044990214ab2c9&redirect_uri=https%3a%2f%2fh5.xingyuanauto.com%2f201706%2ffather618%2findex.html&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect ';
}


/**
 * 获取当前URL参数
 * @param [type] name [参数键名称]
 * @return [type] [参数值]
 */
function GetQueryString(name)
{
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}