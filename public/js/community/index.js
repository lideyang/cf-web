/**
 * Created by lidy on 2016/7/12.
 */
define(function(require, exports, module) {
    var $ = require('jquery');
    require('amazeUI');
    module.exports = {
        init: function () {
            $('#communityTabs').tabs({noSwipe: 0});
        }
    }
});