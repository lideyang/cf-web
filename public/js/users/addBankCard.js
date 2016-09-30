/**
 * Created by lidy on 2016/7/25.
 */
define(function (require, exports, module) {
    var $ = require('jquery');
    module.exports = {
        init: function () {
            require('amazeUI');
            require('jquery.validate');
            var $form = $('#addBankCardForm');
            //验证表单
            $form.validate({
                debug: true,
                // 验证规则
                rules: {
                    bankId: {
                        required: true,
                        byteRangeLength: [16, 22]
                    },
                    bankName: {
                        required: true,
                        byteRangeLength: [2, 10]
                    }
                },
                // 设置错误信息
                messages: {
                    bankId: {
                        required: '请输银行卡号',
                        byteRangeLength: '银行卡号不正确'
                    },
                    bankName: {
                        required: '请输银行开户名',
                        byteRangeLength: '银行开户名不正确'
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
                    form.submit();
                }
            });
        }
    }
});