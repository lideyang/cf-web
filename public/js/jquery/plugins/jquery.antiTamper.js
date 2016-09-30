define(function(require, exports, module) {
    var $ = require('jquery');
    (function ($) {
        var $ajaxFn = $.ajax;
        $.ajax = function (op) {
            if (null == op || !op.url) {
                return;
            }
            var formTokenId = op.formTokenId, sFn = op.success, eFn = op.error, data = op.data, url = op.url;
            var formToken = $("input[name='formToken']").val();
            if (data && typeof data === 'string') {
                var index = data.indexOf("formToken");
                if (index >= 0) {
                    var index = data.indexOf('formToken');
                    var str = data.substring(index + 10, data.length);
                    var indexFirst = str.indexOf('&');
                    var oldToken = str.substring(0, indexFirst);
                    console.log(oldToken);
                    var reg = new RegExp(oldToken, "g");
                    var data = data.replace(reg, formToken);
                } else {
                    data += '&formToken=' + formToken;
                }
            } else if (data instanceof Array) {
                var flag = false;
                for (var item in data) {
                    var parm = data[item];
                    if (parm.name == 'formToken') {
                        parm.value = formToken;
                        flag = true;
                        break;
                    }
                }
                if (!flag) {
                    data.push({
                        name: 'formToken',
                        value: formToken
                    });
                }
            } else {
                var antiTamperDatas = {};
                data = $.extend(true, data || {}, antiTamperDatas, {
                    'formToken': formToken
                });
            }
            op.data = data;
            op.complete = function (status, statusText) {
                if (status.status == 401) {
                    window.location.reload();
                }
                var data = status.responseJSON;
                if (data && data.code) {
                    var token = status.getResponseHeader('formToken');
                    if (token) {
                        $("input[name='formToken']").val(token);
                    }
                }
                if (data && data.data && data.data.key) {
                    $("input[name='key']").val(data.data.key);
                }
            };
            $ajaxFn(op);
        };

    })(jQuery);
});