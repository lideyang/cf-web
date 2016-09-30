/**
 * Created by lidy on 2015/10/1.
 */
define(function(require, exports, module) {
    var jQuery = require('jquery');
    (function ($) {
        function IN(opts, ob) {
            var defaults = {
            }
            $(ob).keyup(function(){
                $(this).val($(this).val().replace(/([0-9]+\.[0-9]{3})[0-9]*/g,''));
            }).bind("paste",function(){
                $(this).val($(this).val().replace(/([0-9]+\.[0-9]{3})[0-9]*/g,''));
            }).css("ime-mode", "disabled");
        }
        IN.prototype = {
            init: function () {

            }
        }
        $.fn.InputNum = function (options) {
            for (var i = 0, j = this.length; i < j; i++) {
                if ($.data(this[i], 'InputNum')) return;
                var InputNum = new IN(options, this[i]);
                $.data(this[i], 'InputNum', InputNum);
            }
            return this;
        }
    })(jQuery);
});