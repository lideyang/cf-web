/**
 * Created by lidy on 2016/7/14.
 */
define(function(require, exports, module) {
    var $ = require('jquery');
    require('amazeUI');
    module.exports = {
        init: function () {
            $("#explainTabs").tabs({noSwipe: 1});
            $("#chooseGoodsBtn").on("click", function () {
                $('#chooseGoodsModal').modal({
                    closeViaDimmer: false
                });
            });
        }
    }
});