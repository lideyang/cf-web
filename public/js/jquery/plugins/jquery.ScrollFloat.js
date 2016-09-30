/**
 * Created by lidy on 2015/9/26.
 * top 起始高度
 * floatTop 浮动后高度
 * 自定义滚动 top
 * changeText 改变的文字
 */
define(function(require, exports, module) {
    var $jQuery = require('jquery');
    (function ($) {
        function SF(opts, ob) {
            var defaults = {
                top: 30,
                floatTop: 40,
                scroolTop: false,
                changeText: ['+展开', '-收起']
            }
            var $self = this;
            var opt = $self.defs = $.extend(true, defaults, opts);
            $self.Btn = $(ob);
            //$self.Btn.on("click", function () {
            //    $self = $(this);
            //    if ($self.text() == "+展开") {
            //        $self.text('-收起');
            //        $("#myCardBox").css("max-height", '2695px');
            //    }
            //    else {
            //        $self.text("+展开");
            //        $("#myCardBox").css("max-height", '695px');
            //    }
            //});
            $self.offsetTop = opt.scroolTop ? opt.scroolTop : $self.Btn.offset().top;
            console.log($self.offsetTop);
            $(window).bind("scroll", function () {
                //console.log($(this).scrollTop() + ':' + $self.offset().top);
                if ($(this).scrollTop() > $self.offsetTop) {
                    $self.Btn.css({
                        top: opt.floatTop + $(this).scrollTop() - $self.offsetTop
                    })
                }
                else {
                    $self.Btn.css({
                        position: 'absolute',
                        top: opt.top
                    })
                }
            });
        }

        SF.prototype = {
            init: function () {

            }
        }

        $.fn.ScrollFloat = function (options) {
            for (var i = 0, j = this.length; i < j; i++) {
                if ($.data(this[i], 'ScrollFloat')) return;
                var ScrollFloat = new SF(options, this[i]);
                $.data(this[i], 'ScrollFloat', ScrollFloat);
            }
            return this;
        }
    })(jQuery);
});