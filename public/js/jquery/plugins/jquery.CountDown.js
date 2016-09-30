/*
 * Created by lidy on 2015/9/15.
 * time 倒计时时间
 * mobile 发送手机号
 * start 是否直接开始
 * isMobile 验证手机是否合法#id
 */
define(function (require, exports, module) {
    var jQuery = require('jquery');
    (function ($) {
        function CD(opts, obj) {
            var defaults = {
                time: 60,
                mobile: '',
                start: false,
                isMobile: false,
                isSeed: false,
                isMsg: false,
                type: "GET",
                Msg: '验证码已发送，请注意查收',
                url: basePath + '/phonecode.json',
                mockUrl: '/account/phone',
                type:'POST',
                isCallBack: false,
                isClick: true,
                isClear: false,
                isUpdateDate: false,
                beforeClick: false,
                tokenId: false,
                callBack: false,
                beforeSeed: false,
                successDataCode: '200',
                data: {captchaType: 'FIND_PAY_PWD', phone: $('#mobile').val()}
            }
            var $self = this;
            $(obj).prop('disabled', false);
            var opt = $self.defs = $.extend(true, defaults, opts);
            $self.time = 0;
            $self.Tid = 0;
            $self.seedBtn = $(obj);
            $self.btnText = $self.seedBtn.val() ? $self.seedBtn.val() : $self.seedBtn.text();
            if ($self.defs.start) {
                $self.init();
            }
            if ($self.defs.isClick) {
                $self.seedBtn.on("click", function () {
                    if ($self.time > 0) {     //倒计时完成
                        return;
                    }
                    //点击前新增逻辑
                    if (opt.beforeClick && typeof(opt.beforeClick) == 'function') {
                        opt.beforeClick();
                    }
                    //验证手机
                    if (opt.isMobile) {
                        var mobile = $(opt.isMobile).val();
                        if (!$self.checkMobile(mobile)) {
                            layer.msg("手机号码不正确", {icon: 2});
                            return;
                        }
                        else {
                            opt.data.phone = mobile;
                        }
                    }
                    //特定手机号
                    //var seedMobile = opt.mobile == "" ? $(opt.isMobile).val() : opt.mobile;
                    $self.seed();
                    //$('#checkCode').attr("readonly", "readonly");
                });
            }
        };
        CD.prototype = {
            init: function () {
                var $self = this;
                if ($self.defs.isSeed) {
                    this.seed();
                } else {
                    $self.time = $self.defs.time;
                    $self.Tid = setInterval(function () {
                        $self.CountDownDo()
                    }, 1000);
                }
            },
            seed: function () {
                var $self = this;
                //根据最新token提交
                if ($self.defs.tokenId) {
                    var token = $($self.defs.tokenId).val();
                    for (var item in $self.defs.data) {
                        var parm = $self.defs.data[item];
                        if (parm.name == 'formToken') {
                            parm.value = token;
                            break;
                        }
                    }
                }
                if ($self.defs.beforeSeed) {
                    $self.defs.beforeSeed;
                }
                if ($self.defs.isClear) {
                    $($self.defs.isClear).val('');
                }
                if ($self.defs.isUpdateDate) {
                    $self.defs.data = $($self.defs.isUpdateDate).serializeArray();
                }
                $.ajax({
                    type: $self.defs.type,
                    url: $self.defs.url,
                    mockUrl: $self.defs.mockUrl,
                    data: $self.defs.data,
                    dataType: 'JSON',
                    async: false,
                    cache: false,
                    type:$self.defs.type,
                    success: function (data, textStatus, jqXHR) {
                        //更新token
                        if ($self.defs.tokenId) {
                            var token = jqXHR.getResponseHeader('formToken');
                            $($self.defs.tokenId).val(token);
                            for (var item in $self.defs.data) {
                                var parm = $self.defs.data[item];
                                if (parm.name == 'formToken') {
                                    parm.value = token;
                                    break;
                                }
                            }
                        }
                        if (data.code == '200' || data.code == 'order-pay-check-code-confirm' || data.code == 'bank-card-agreement-confirm') {
                            if ($self.defs.isMsg) {
                                $self.seedBtn.parent().find(".alertText").css("display", 'inline').html('<em class="miss"></em><label class="error miss">' + $self.defs.Msg + '</label>').delay(3000).fadeOut();
                            } else {
                                $self.seedBtn.parent().find(".alertText").css("display", 'none').html('');
                            }
                            $self.time = $self.defs.time;
                            $self.CountDownDo();
                            $self.Tid = setInterval(function () {
                                $self.CountDownDo();
                            }, 1000);
                        }
                        else {
                            if ($self.defs.isCallBack) {
                                layer.msg(data[$self.defs.isCallBack], {icon: 5});
                            }
                            else {
                                layer.msg("发送失败,请稍后再试。", {icon: 5});
                            }
                            if ($self.defs.isMsg) {
                                if (data.code != '500') {
                                    $self.seedBtn.parent().find(".alertText").html('<em class="miss"></em><label class="error">' + data.message + '</label>');
                                } else {
                                    $self.seedBtn.parent().find(".alertText").css("display", 'none').html('');
                                }
                            }
                        }
                    },
                    error: function () {
                        layer.msg("验证码发送失败,请稍后再试。", {icon: 5});
                    }
                });
            },
            CountDownDo: function () {
                var $self = this;
                if ($self.time > 1) {
                    $self.time -= 1;
                    $self.seedBtn.val("还剩" + $self.time + "秒").text("还剩" + $self.time + "秒").removeClass("btn-sms").attr("disabled", "disabled").addClass('btnClose');
                } else {
                    $self.time = 0;
                    clearInterval($self.Tid);
                    $self.seedBtn.val($self.btnText).text($self.btnText);
                    $self.seedBtn.addClass("btn-sms").removeAttr("disabled").removeClass('btnClose');
                }
            },
            checkMobile: function (str) {
                var re = /(^1\d{10}$)|(^1\d{2}\*\*\*\*\d{4}$)/
                if (re.test(str)) {
                    return true;
                } else {
                    return false;
                }
            },
            setDefaults: function (opt) {
                this.defs = $.extend(true, this.defs, opt);
            }
        }
        $.fn.CountDown = function (options, modal) {
            this.each(function () {
                var $self = $(this);
                var CountDown = $self.data('CountDown');
                if (typeof options == 'string') {
                    CountDown[options](modal);
                } else {
                    if (!options.isClick) {
                        $self.data('CountDown', (CountDown = new CD(options, $self)));
                        return;
                    }
                    if (!CountDown) $self.data('CountDown', (CountDown = new CD(options, $self)));
                }
            })
            return this;
        }
    })(jQuery);
});