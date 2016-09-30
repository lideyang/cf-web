define(function (require, exports, module) {
    var $ = require('jquery');
    module.exports = {
        init: function () {
            require('jquery.validate');
            //验证表单
            var $form = $('#directBuyForm');
            $form.validate({
                debug: true,
                // 验证规则
                rules: {
        
                },
                // 设置错误信息
                messages: {
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
                    $.ajax({
                        url: form.action,
                        mockUrl: '/account/all',
                        type: "POST",
                        data: {
                            callback:'/goods/otherPay'
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