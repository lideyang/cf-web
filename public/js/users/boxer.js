/**
 * Created by lidy on 2016/7/21.
 */
define(function(require, exports, module) {
    var $ = require('jquery');
    module.exports = {
        init: function () {
            require('amazeUI');
            $("#checkAllBtn").on("click", function () {
                $("input[type='checkbox']").uCheck('check');
                $("#settlementBtn").removeClass("am-disabled");
            });
            $("input[type='checkbox']").on('change', function () {
                if ($("input[type='checkbox']").is(':checked')) {
                    $("#settlementBtn").removeClass("am-disabled");
                } else {
                    $("#settlementBtn").addClass("am-disabled");
                }
                console.log($("input[name='address']").is(":checked"));
            });
            //提交
            $("#settlementBtn").on("click", function () {
                
            });
        }
    }
});