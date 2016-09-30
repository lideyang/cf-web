/**
 * Created by lidy on 2016/8/15.
 */
define(function (require, exports, module) {
    var $ = require('jquery');
    module.exports = {
        init: function () {
            $("#wrapper").css('top',80+$("#topList").height()+'px');
            var tools=require('tools');
            var app = tools.eventsList(null, {
                api: '/api/tradeList',
                params: {
                    start: 0,
                    type: 'trade',
                    count: 10,
                }
            });
            app.init();
            document.addEventListener('touchmove', function(e) {
                e.preventDefault();
            }, false);
        }
    }
});