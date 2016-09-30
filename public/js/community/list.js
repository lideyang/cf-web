/**
 * Created by lidy on 2016/8/1.
 */
define(function(require, exports, module) {
    var $ = require('jquery');
    module.exports = {
        init: function () {
            require('amazeUI');
            $('#accordion').on('opened.collapse.amui', function(e) {
                $(e.target).find('.split').height($(e.target).height()+20);
                $(e.target).prev().find('.arrow').addClass('am-icon-angle-up').removeClass('am-icon-angle-down')
            })
            $('#accordion').on('close.collapse.amui', function(e) {
                $(e.target).prev().find('.arrow').addClass('am-icon-angle-down').removeClass('am-icon-angle-up')
            })
            var $panel=$('#accordion').find('.am-panel-collapse').first();
            $panel.find('.split').height($panel.height()+20);
        }
    }
});