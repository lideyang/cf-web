/**
 * Created by lidy on 2016/8/6.
 */
define(function (require, exports, module) {
    var $ = require('jquery');
    module.exports = {
        init: function () {
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