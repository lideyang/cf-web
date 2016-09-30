/**
 * Created by lidy on 2016/6/2.
 */
define(function(require, exports, module) {
    var $ = require('jquery');
    (function ($) {
        function toolTip(ob, opts) {
            var defaults = {
                delay: 100,
                left: -20,
                content: ''
            }
            var $self = this;
            var opt = $self.defs = $.extend(true, defaults, opts);
            $self.Btn = $(ob);
            setTimeout(function () {
                $self.Btn.on({
                    click: function () {
                        $("*").stop();
                        $("#HintMsg").remove();
                        var HintHtml = "<ul id=\"HintMsg\"><li class=\"HintTop\"></li><li class=\"HintInfo\">" + opt.content + "</li><li class=\"HintFooter\"></li></ul>";
                        var offset = $(this).offset();
                        $("body").append(HintHtml);
                        // $("#HintMsg").fadeTo(0, 0.9);
                        $("#HintMsg").on("mouseleave",function(){
                            $(this).fadeOut();
                        })
                        var HintHeight = $("#HintMsg").height();
                        var objHeight = $self.Btn.height();
                        $("#HintMsg").css({
                            "top": offset.top + objHeight + 7 + "px",
                            "left": offset.left + opt.left + "px"
                        }).fadeIn(500);
                    },
                    blur: function () {
                        $("#HintMsg").remove();
                    },
                    keyup: function () {
                        $("#HintMsg").remove();
                    },
                    mouseleave: function () {
                        setTimeout(function () {
                            if(!$("#HintMsg:hover").length){
                                $("#HintMsg").fadeOut();
                            }
                        }, 300)
                    }
                });
            }, opt.delay);
        }

        //var toolTip = function (element, options) {
        //    this.init('tooltip', element, options)
        //}
        toolTip.DEFAULTS = {
            animation: true,
            placement: 'top',
            selector: false,
            template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
            trigger: 'hover focus',
            title: '',
            delay: 0,
            html: false,
            container: false,
            viewport: {
                selector: 'body',
                padding: 0
            }
        }
        toolTip.prototype = {
            click: function () {

            },
            hover: function () {

            }
        }
        $.fn.toolTip = function (option) {
            return this.each(function () {
                var $this = $(this)
                var data = $this.data('lidy.toolTip');
                var options = typeof option == 'object' && option;
                if (!data && /destroy|hide/.test(option)) return;
                if (!data) $this.data('lidy.toolTip', (data = new toolTip(this, options)));
                if (typeof option == 'string') data[option]();
            })
        }
    })(jQuery);
})