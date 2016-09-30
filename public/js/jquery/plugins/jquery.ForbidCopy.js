/**
 * Created by lidy on 2015/9/28.
 */
(function ($) {

    function FC(opts, ob) {

    }

    $.fn.ForbidCopy = function (options) {
        for (var i = 0, j = this.length; i < j; i++) {
            if ($.data(this[i], 'ForbidCopy')) return;
            var ForbidCopy = new FC(options, this[i]);
            $.data(this[i], 'ForbidCopy', ScrollFloat);
        }
        return this;
    }
})(jQuery);