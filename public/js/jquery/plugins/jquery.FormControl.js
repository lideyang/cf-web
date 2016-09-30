/**
 * Created by lidy on 2016/6/2.
 */
define(function(require, exports, module) {
    var $ = require('jquery');
    (function ($) {
        function FC(opts, obj) {
            if (!TCA_FLAG) {
                return;
            }

            var defaults = {
                attr: 'sign',
                url: basePath + "/certsList.json"
            }
            var $self = this;
            var opt = $self.defs = $.extend(true, defaults, opts);
            var str = '';
            $(obj).find("input").each(function () {
                $self = $(this);
                if (typeof($self.attr(opt.attr)) != 'undefined') {
                    str += ($self.attr("name") + "=" + $self.val());
                }
            })

            var P7 = null;
            var certs = CertStore.listAllCerts();
            $.ajax({
                url: opt.url,
                type: "GET",
                async: false,
                cache: false,
                success: function (data) {
                    var src = data.data;
                    var cert;
                    for (var key in src) {
                        if (src[key] !== undefined) {
                            var count = certs.size();
                            for (var i = 0; i < count; i++) {
                                if (certs.get(i).serialNumber() == src[key].snId) {
                                    cert = certs.get(i);
                                    break;
                                }
                            }
                        }
                    }
                    if (cert) {
                        P7 = cert.signMessage(str);
                    }
                }
            });
            $(obj).append('<input type="hidden" name="sign" value="' + P7 + '" />');
        }

        FC.prototype = {
            init: function () {

            }
        }
        $.fn.FormControl = function (options) {
            for (var i = 0, j = this.length; i < j; i++) {
                if ($.data(this[i], 'FormControl')) return;
                var FormControl = new FC(options, this[i]);
                $.data(this[i], 'FormControl', FormControl);
            }
            return this;
        }
    })(jQuery);
});