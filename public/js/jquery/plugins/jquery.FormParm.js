/**
 * Created by lidy on 2015/11/10.
 */
(function ($) {
    function FP(opts, obj) {
        var defaults = {
            url: ''
        }
        var $self = this;
        var opt = $self.defs = $.extend(true, defaults, opts);
        var data = new Array();
        $(obj).find("input").each(function () {
            $self = $(this);
            data.push([$self.attr("name"), $self.val()]);
        })
        $(obj).on("click", function () {
            var newData = new Object();
            $(obj).find("input").each(function () {
                $self = $(this);
                var name = $self.attr("name");
                var val = $self.val();
                for (var itme in data) {
                    if (data[itme][0] == name && data[itme][1] == val) {
                        newData[name] = val;
                    }
                }
            });
            $.ajax({
                type: 'GET',
                url: opt.url,
                data: newData,
                dataType: 'JSON',
                async: false,
                cache: false,
                success: function (data) {

                },
                error: function () {
                    layer.msg("«Î…‘∫Û‘Ÿ ‘°£", {icon: 5});
                }
            });
            return false;
        })
    }

    FP.prototype = {
        init: function () {

        }
    }

    $.fn.ScrollFloat = function (options) {
        for (var i = 0, j = this.length; i < j; i++) {
            if ($.data(this[i], 'FormParm')) return;
            var FormParm = new FP(options, this[i]);
            $.data(this[i], 'FormParm', FormParm);
        }
        return this;
    }
})(jQuery);