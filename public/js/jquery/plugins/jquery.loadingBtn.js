/**
 * Created by lidy on 2015/10/13.
 */
define(function(require, exports, module) {
    var $ = require('jquery');
    (function ($) {
        function LB(opts, obj) {
            this.options = $.extend({}, LB.DEFAULTS, opts);
            var $self = this;
            $self.loading = '<div class="load-container loading"> <div class="loader">' + this.options.loadingText + '</div></div>';
            $self.Btn = $(obj);
            var val = $self.Btn.is('input') ? 'val' : 'html';
            if (opts.action == 'start') {
                this.start();
            }
            else if (opts.action == 'click') {
                this.click();
            } else if (opts.action == 'reset') {
                this.reSet();
            }
        }

        LB.DEFAULTS = {
            loadingText: '提交中...',
            defaultText: '立即付款',
            time: 0,
            style: 'btnClose',
            action: 'start'
        };
        LB.prototype = {
            click: function () {
                var $self = this;
                $self.btnText = $self.Btn.text();
                $self.Btn.on('click', function () {
                    setTimeout($.proxy(function () {
                        $(this).prop('disabled', true).unbind('click');
                    }, this), 0);
                })
                $self.Btn.addClass($self.options.style).html($self.loading).val($self.loading);
                if ($self.options.time > 0) {
                    setTimeout(function () {
                        $self.Btn.removeClass($self.options.style).html($self.btnText);
                    }, $self.options.time)
                }
                return false;
            },
            start: function () {
                var $self = this;
                setTimeout($.proxy(function () {
                    $(this).attr('disabled', true);
                }, $self.Btn), 0);
                $self.Btn.addClass($self.options.style).html($self.loading).val($self.loading);
            },
            reSet: function () {
                var $self = this;
                setTimeout($.proxy(function () {
                    $(this).removeClass($self.options.style).attr('disabled', false).prop('disabled', false).html($self.options.defaultText);
                }, $self.Btn), 0);
            }
        };
        $.fn.loadingBtn = function (options) {
            for (var i = 0, j = this.length; i < j; i++) {
                if ($.data(this[i], 'loadingBtn') && options == 'click') return;
                //var loadingBtn = new LB(options, this[i]);
                //$.data(this[i], 'loadingBtn', loadingBtn);
                //var method = arguments[0];
                //if (LB[method]) {
                //    method = LB[method];
                //    arguments = Array.prototype.slice.call(arguments, 1);
                //} else {
                //    $.error('Method ' + method + ' does not exist on jQuery.loadingBtn');
                //    return this;
                //}
                //return method.apply(this, arguments);
                var loadingBtn = new LB(options, this[i]);
                $.data(this[i], 'loadingBtn', loadingBtn);
            }
            return this;
        };
        //$.fn.loadingBtn.default = Lb.DEFAULTS;
    }(jQuery));
});