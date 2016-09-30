/**
 * Created by lidy on 2016/7/21.
 */
define(function (require, exports, module) {
    var $ = require('jquery');
    module.exports = {
        init: function () {
            require('amazeUI');
            //$('#accordion').find(".text-info").collapse({
            //    parent: '#accordion',
            //    target:$(this).parent().parent().next()
            //})
            $("#accordion").on("click", '.text-info', function () {
                $(this).parent().parent().next().collapse('toggle');
            });
        }
    }
});