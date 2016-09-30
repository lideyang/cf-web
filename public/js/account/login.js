/**
 * Created by lidy on 2016/7/13.
 */
define(function(require, exports, module) {
    var $ = require('jquery');
    module.exports = {
        init: function () {

        },
        validator: function () {
            require('jquery.validate');
            //验证表单
            var $form = $('#loginForm');
            $form.validate({
                debug: true,
                // 验证规则
                rules: {
                    loginId: {
                        required: true,
                        isName: true
                    },
                    loginPwd: {
                        required: true,
                        byteRangeLength: [6, 30],
                    }
                },
                // 设置错误信息
                messages: {
                    loginId: {
                        required: "请输入登录账号",
                        isName: "请输入正确的登录账号"
                    },
                    loginPwd: {
                        required: '请输入密码',
                        byteRangeLength: '请输入正确的密码',
                    }
                },
                ignore: "#PWD",
                // 错误信息显示
                errorPlacement: function (error, element) {

                },
                invalidHandler: function (form, validator) {
                    $.each(validator.errorList, function (key, value) {
                        var $this = $(value.element);
                        var $parent = $this.parent();
                        var offset = $this.offset();

                        $parent.append('<div class="vld-tooltip">' + value.message + '</div>');
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
                    var JSEncrypt = new require('safe/jsencrypt').encrypt();
                    JSEncrypt.setPublicKey(publicKey);
                    $.ajax({
                        url: basePath + '/user/login',
                        mockUrl: '/account/login',
                        type: "POST",
                        data: {
                            loginId:$("#loginId").val(),
                            password: JSEncrypt.encrypt($("#loginPwd").val())
                        },
                        success: function (data) {
                            if (data.code == "200") {
                                location.href = data.data.gto;
                            } else {
                                layer.msg(data.message, { icon: 2 })
                            }
                        },
                        error: function (a, b, c) {
                            //alert("xx");
                        }
                    });
                }
            });
        }
    }
});