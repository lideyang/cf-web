define(function (require, exports, module) {
    var $ = require('jquery');
    
    module.exports = {
        init: function () {
    
        },
        progress: function (rate, money, min, max) {
            require('amazeUI');
            //显示投标进度
            var num = parseFloat(rate);
            var progress = $.AMUI.progress;
            progress.configure({
                parent: '#progressContainer',
                template: '<div class="nprogress-bar" role="nprogress-bar"><div class="nprogress-peg"></div></div>',
                minimum:0
            });
            progress.set(num);
        },
        orderComfirm: function () {
            require('amazeUI');
            //设置投标限制
            $("#orderCommitBtn").on("click", function () {
                $('#orderModal').modal({
                    closeViaDimmer: false
                });
            });
            //确认投标数量
            $("#comfirmBtn").on("click", function () {
                $("#amountMoneyTxt2").text(parseFloat($("#amountMoneyTxt").text()).toFixed(2));
                $('#orderModal').modal('close');
                $("#otherPayNumTxt").val($("#comfirmAmount").val());
                $('#tradePwdModal').modal({
                    closeViaDimmer: false
                });
            })
            //返回选择投标
            $("#backModalBtn").on("click", function () {
                $('#tradePwdModal').modal('close');
                $('#orderModal').modal({
                    closeViaDimmer: false
                });
            })
        }
    }
});
