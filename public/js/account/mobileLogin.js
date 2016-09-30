/**
 * Created by lidy on 2016/7/13.
 */
define(function(require, exports, module) {
    var $ = require('jquery');
    module.exports = {
        init: function () {
            setTimeout(function(){
                $('#loadingTxt').hide();
                $('#loginContainer').fadeIn();
            },3000);
        },
        validator:function(){
            require('jquery.validate');
            //验证表单
            var $form = $('#mobileLoginForm');
            $form.validate({
                debug:true,
                // 验证规则
                rules: {
                    loginId: {
                        required: true,
                        isMobile: true
                    },
                    checkCode: {
                        required: true,
                        byteRangeLength: [6, 6],
                    }
                },
                // 设置错误信息
                messages: {
                    loginId: {
                        required: "请输入手机号码",
                        isMobile: "请输入正确的手机号码"
                    },
                    checkCode: {
                        required: '请输入验证码',
                        byteRangeLength: '请输入正确的验证码',
                    }
                },
                ignore: "#PWD",
                // 错误信息显示
                errorPlacement: function (error, element) {

                },
                invalidHandler: function (form, validator) {
                    $.each(validator.errorList, function (key, value) {
                        var $this = $(value.element);
                        var $parent=$this.parent();
                        var offset = $this.offset();
                        
                        $parent.append('<div class="vld-tooltip">'+value.message+'</div>');
                        // $tooltip.text(value.message).show().css({
                        //     left: offset.left + 10,
                        //     top: offset.top + $this.outerHeight() + 10
                        // });
                        return false;
                    });
                },
                // 成功信息显示
                success: function (error, element) {
                    $(element).parent().find('.vld-tooltip').remove();
                },
                submitHandler: function (form) {
                    $.ajax({
                        url :basePath+'/user/login',
                        mockUrl:'/account/mobileLogin',
                        type : "POST",
                        data:$(form).serialize(),
                        success : function(data) {
                            if(data.code=="200"){
                                location.href=data.data.gto;
                            }else{
                                layer.msg(data.message,{icon:2})
                            }
                        },
                        error:function(a,b,c){
                            //alert("xx");
                        }
                    });
                }
            });
        },
        countDown: function () {
            require('jquery.CountDown');
            $("#checkCodeBtn").CountDown({
                isMsg: true,
                url: basePath + '/checkcode/send',
                isMobile: '#loginId',
                isCallBack:'message',
                data: {
                    captchaType: 'LOGIN',
                    mobile: $("loginId").val()
                }
            });
        }
    }
});