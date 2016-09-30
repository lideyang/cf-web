define(function (require, exports, module) {
    var $ = require('jquery');
    module.exports = {
        init: function () {
            require('amazeUI');
            $("#otherPayList").on('click', '.am-list-item-desced', function () {
                var $this=$(this);
                var $input=$(this).find('input');
                if(!$input.is(':disabled')){
                    $input.prop('checked', true);
                }
            })
        }
    }
});