/**
 * Created by lidy on 2016/7/25.
 */
define(function (require, exports, module) {
    var $ = require('jquery');
    module.exports = {
        init: function () {
            require('amazeUI');
            require('jquery.validate');
            var $form = $('#withdrawForm');
            //select
            $form.on('click', '.am-list-item-desced', function () {
                var $this=$(this);
                var $input=$(this).find('input');
                if(!$input.is(':disabled')){
                    $input.prop('checked', true);
                }
            })
            //验证表单
            $form.validate({
                debug: true,
                // 验证规则
                rules: {
                    realMoney: {
                        required: true,
                        min: 0.01
                    }
                },
                // 设置错误信息
                messages: {
                    realMoney: {
                        required: '请输提现金额',
                        min: '提现金额不能为0'
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