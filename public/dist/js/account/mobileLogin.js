define(function(require,exports,module){var $=require("jquery");module.exports={init:function(){setTimeout(function(){$("#loadingTxt").hide(),$("#loginContainer").fadeIn()},3e3)},validator:function(){require("jquery.validate");var e=$("#mobileLoginForm");e.validate({debug:!0,rules:{loginId:{required:!0,isMobile:!0},checkCode:{required:!0,byteRangeLength:[6,6]}},messages:{loginId:{required:"请输入手机号码",isMobile:"请输入正确的手机号码"},checkCode:{required:"请输入验证码",byteRangeLength:"请输入正确的验证码"}},ignore:"#PWD",errorPlacement:function(e,n){},invalidHandler:function(e,n){$.each(n.errorList,function(e,n){var i=$(n.element),o=i.parent();i.offset();return o.append('<div class="vld-tooltip">'+n.message+"</div>"),!1})},success:function(e,n){$(n).parent().find(".vld-tooltip").remove()},submitHandler:function(e){$.ajax({url:basePath+"/user/login",mockUrl:"/account/mobileLogin",type:"POST",data:$(e).serialize(),success:function(e){"200"==e.code?location.href=e.data.gto:layer.msg(e.message,{icon:2})},error:function(e,n,i){}})}})},countDown:function(){require("jquery.CountDown"),$("#checkCodeBtn").CountDown({isMsg:!0,url:basePath+"/checkcode/send",isMobile:"#loginId",isCallBack:"message",data:{captchaType:"LOGIN",mobile:$("loginId").val()}})}}});