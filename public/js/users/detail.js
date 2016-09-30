/**
 * Created by lidy on 2016/7/21.
 */
define(function (require, exports, module) {
    var $ = require('jquery');
    module.exports = {
        init: function () {
            require('amazeUI');
            //设置头像
            $("#headerBtn").on('click', function () {
                // $('#headerModal').modal({
                //     closeViaDimmer: false
                // });
            });
            //设置昵称
            $("#nickNameBtn").on('click', function () {
                $('#nickNameModal').modal({
                    closeViaDimmer: false
                });
            });
        },
        upload: function (url) {
            var tools = require('tools');
            $("#uploadInput").on('change', function (e) {
                tools.handelSelectFile(e, url);
            })
        }
    }
});