/**
 * Created by lidy on 2016/7/15.
 */
define(function(require, exports, module) {
    var $ = require('jquery');
    require('amazeUI');
    module.exports = {
        init: function () {
            $("#explainTabs").tabs({noSwipe: 1});
        }
    }
});