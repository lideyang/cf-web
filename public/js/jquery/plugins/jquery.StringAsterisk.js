/**
 * Created by lidy on 2016/6/2.
 */
//手机银行前后四位星号
(function ($) {
    $.fn.StringAsterisk = function (options) {
        for (var i = 0, j = this.length; i < j; i++) {
            if ($.data(this[i], 'StringAsterisk')) return;
            var StringAsterisk = new SA(options, this[i]);
            $.data(this[i], 'StringAsterisk', StringAsterisk);
        }
        return this;
    }
    function SA(opts, ob) {
        var defaults = {
            attr: false
        }
        var opt = $.extend(true, defaults, opts);
        //字符串长度
        var val = opt.attr ? $(ob).attr(opt.attr) : $(ob).text();
        var lg = val.length;
        if (lg < 9) {
            return $(ob).text(val);
        }
        //取出开始结束
        var start = val.substring(0, 4);
        var end = val.substring(lg - 4, lg);
        var num = lg - 8;
        var str = start;
        for (var i = 0; i < num; i++) {
            str += "*";
        }
        str += end;
        return $(ob).text(str);
    }
})(jQuery);