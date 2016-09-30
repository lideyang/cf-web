/**
 * Created by lidy on 2016/7/12.
 */
define(function(require, exports, module) {
    var $ = require('jquery');
    require('amazeUI');
    module.exports = {
        settingPwd: function () {
            require('jquery.validate');
            //验证表单
            var $form = $('#settingPwdForm');
            $form.validate({
                debug: true,
                // 验证规则
                rules: {
                    reLoginPwd: {
                        required: true,
                        byteRangeLength: [6, 30],
                        equalTo: '#loginPwd'
                    },
                    loginPwd: {
                        required: true,
                        byteRangeLength: [6, 30]
                    }
                },
                // 设置错误信息
                messages: {
                    reLoginPwd: {
                        required: '请输入密码',
                        byteRangeLength: '请输入正确的密码',
                        equalTo: '两次密码不一致'
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
                        url: basePath + '/user/resetPwd',
                        mockUrl: '/account/settingPwd',
                        type: "POST",
                        data: {
                            loginId: $("#loginId").val(),
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
        },
        memberSettingPwd:function(){
            require('jquery.validate');
            //验证表单
            var $form = $('#settingPwdForm');
            $form.validate({
                debug: true,
                // 验证规则
                rules: {
                    reLoginPwd: {
                        required: true,
                        byteRangeLength: [6, 30],
                        equalTo: '#loginPwd'
                    },
                    loginPwd: {
                        required: true,
                        byteRangeLength: [6, 30]
                    }
                },
                // 设置错误信息
                messages: {
                    reLoginPwd: {
                        required: '请输入密码',
                        byteRangeLength: '请输入正确的密码',
                        equalTo: '两次密码不一致'
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
                        url: basePath + '/myaccount/setting',
                        mockUrl: '/account/settingPwd',
                        type: "POST",
                        data: {
                            loginId: $("#loginId").val(),
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
        },
        settingPayPwd:function(){
            require('jquery.validate');
            //验证表单
            var $form = $('#settingPwdForm');
            $form.validate({
                debug: true,
                // 验证规则
                rules: {
                    reLoginPwd: {
                        required: true,
                        byteRangeLength: [6, 30],
                        equalTo: '#loginPwd'
                    },
                    loginPwd: {
                        required: true,
                        byteRangeLength: [6, 30]
                    }
                },
                // 设置错误信息
                messages: {
                    reLoginPwd: {
                        required: '请输入密码',
                        byteRangeLength: '请输入正确的密码',
                        equalTo: '两次密码不一致'
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
                        url: basePath + '/myaccount/paySetting',
                        mockUrl: '/account/settingPwd',
                        type: "POST",
                        data: {
                            loginId: $("#loginId").val(),
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
        },
        resetPwd: function () {
            require('jquery.validate');
            //验证表单
            var $form = $('#settingPwdForm');
            $form.validate({
                debug: true,
                // 验证规则
                rules: {
                    reLoginPwd: {
                        required: true,
                        byteRangeLength: [6, 30],
                        equalTo: '#loginPwd'
                    },
                    loginPwd: {
                        required: true,
                        byteRangeLength: [6, 30]
                    }
                },
                // 设置错误信息
                messages: {
                    reLoginPwd: {
                        required: '请输入密码',
                        byteRangeLength: '请输入正确的密码',
                        equalTo: '两次密码不一致'
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

                    $.ajax({
                        url: basePath + '/user/resetPwd',
                        mockUrl: '/account/login',
                        type: "POST",
                        data: {
                            loginId: $("#loginId").val(),
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
        },
    }
});