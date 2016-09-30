/**
 * Created by lidy on 2015/11/12.
 */
define(function(require, exports, module) {
    var jQuery = require('jquery');
    (function ($) {
        function SP(opts, obj) {
            var defaults = {
                isFixed: true,//是否悬浮
                top: 0 //悬浮距离
            }
            var $self = this;
            var opt = $self.defs = $.extend(true, defaults, opts);
            this.obj = obj;
            this.objTop = $(obj).offset().top;
            if (opt.isFixed) {
                this.stickUp();
            }
            $(obj).on("click", 'a', function () {
                var $self = $(this);
                $(obj).find('a').removeClass("current");
                $(this).addClass("current");
                var href = $self.attr("href");
                var top = $(href).offset().top;
                $('body, html').animate({
                    scrollTop: top
                }, 800);
                return false;
            })
            var topArr = new Array();
            var $listA = $(obj).find('a');
            $listA.each(function () {
                var href = $(this).attr("href");
                var top = parseInt($(href).offset().top);
                topArr.push(top);
            })
            topArr.sort(function (a, b) {
                return a - b;
            })
            $(window).on("scroll", function () {
                var windowTop = $(this).scrollTop();
                if (opt.isFixed) {
                    $self.stickUp();
                }
                var index = 0;
                for (var item in topArr) {
                    item = parseInt(item);
                    console.log(windowTop+':'+topArr[2])
                    if (item == topArr.length - 1 && windowTop >= topArr[item]) {
                        index = topArr.length - 1;
                        break;
                    }
                    if (windowTop >= topArr[item] && windowTop < topArr[item + 1]) {
                        index = item;
                        break;
                    }
                }
                //console.log(index);
                $listA.removeClass("current");
                $listA.eq(index).addClass('current');
            });
        }

        SP.prototype = {
            stickUp: function () {
                var windowTop = $(document).scrollTop();
                var $obj = $(this.obj);
                //console.log(windowTop);
                if (windowTop > this.objTop) {
                    $obj.css({'position': 'fixed', 'top': '0px'});
                } else {
                    $obj.css('position', 'static');
                }
            }
        }

        $.fn.scrollSpy = function (options) {
            for (var i = 0, j = this.length; i < j; i++) {
                if ($.data(this[i], 'scrollSpy')) return;
                var scrollSpy = new SP(options, this[i]);
                $.data(this[i], 'scrollSpy', scrollSpy);
            }
            return this;
        }
    })(jQuery);
});