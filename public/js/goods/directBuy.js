/**
 * Created by lidy on 2016/8/8.
 */
define(function(require, exports, module) {
    var $ = require('jquery');
    //require('amazeUI');
    module.exports = {
        init: function () {
            $("#tempLinkBtn").on('click',function(){
                var $this=$(this);
                var href=$this.attr('href');
                $this.attr('href',href+'&num='+$('#comfirmAmount').val())
            })
        }
    }
});