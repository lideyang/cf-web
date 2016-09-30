define(function (require, exports, module) {
    var $ = require('jquery');
    module.exports = {
        shake: function () { //抖动
            $.fn.shake = function (intShakes /*Amount of shakes*/, intDistance /*Shake distance*/, intDuration /*Time duration*/) {
                this.each(function () {
                    var jqNode = $(this);
                    jqNode.css({position: 'relative'});
                    for (var x = 1; x <= intShakes; x++) {
                        jqNode.animate({left: (intDistance * -1)}, (((intDuration / intShakes) / 4)))
                            .animate({left: intDistance}, ((intDuration / intShakes) / 2))
                            .animate({left: 0}, (((intDuration / intShakes) / 4)));
                    }
                });
                return this;
            }
        },
        fixMoney: function (a, n, obj) { //s:传入的float数字 ，n:希望返回小数点几位
            var reg = /^[0-9]+(\.[0-9]{1,2})?$/;
            var s = a.replace(/,/g, "");
            try {
                if ('' == a || a == null || !reg.test(s) || 0 == a) {
                    s = 0;
                    if (typeof (obj) != 'undefined') {
                        obj.val('0');
                        var name = obj.attr("name");
                        $("#" + name).val(s);
                    }
                    return;
                }
                n = n > 0 && n <= 20 ? n : 2;
                s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
                var l = s.split(".")[0].split("").reverse(),
                    r = s.split(".")[1];
                t = "";
                for (i = 0; i < l.length; i++) {
                    t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
                }
                var val = t.split("").reverse().join("") + "." + r;
            } catch (e) {
                val = 0;
                s = 0;
            }
            if (typeof (obj) != 'undefined' && obj != null && val != '0.00') {
                var name = obj.attr("name");
                $("#" + name).val(s.replace(/,/g, ""));
                obj.val(val);
            }
            return val;
        },
        moneyFixInput:function(obj,moneyObj){
            var obj=obj||'#amtA';
            $(obj).on({
                blur: function () {
                    module.exports.fixMoney($(obj).val(), 2, $(obj));
                    //var validator = $("#creditPayForm").validate();
                    if(moneyObj){
                        var $form=$(this).parents('form').first();
                        var moneyObj=moneyObj||'#amtB';
                        if(!$form.validate().element(moneyObj)){
                            //$("#amtB").val('');
                        }
                    }
                }
            })
        },
        dateInputLimit:function(){
            module.exports.formatDate();
            var WdatePicker = require('My97DatePicker');
            var today=new Date().Format('yyyy-MM-dd');
            $("#endDate").val(today);
            $("#beginDate").on("focus",function(){
                WdatePicker({isShowClear:false,readOnly:true,maxDate:'#F{$dp.$D(\'endDate\')}'})
            });
            $("#endDate").on("focus",function(){
                WdatePicker({isShowClear:false,readOnly:true,minDate:'#F{$dp.$D(\'beginDate\')}',maxDate:'%y-%M-%d'})
            });
        },
        formatDate:function(){
            Date.prototype.Format = function(fmt){
                var o = {
                    "M+" : this.getMonth()+1,                 //月份
                    "d+" : this.getDate(),                    //日
                    "h+" : this.getHours(),                   //小时
                    "m+" : this.getMinutes(),                 //分
                    "s+" : this.getSeconds(),                 //秒
                    "q+" : Math.floor((this.getMonth()+3)/3), //季度
                    "S"  : this.getMilliseconds()             //毫秒
                };
                if(/(y+)/.test(fmt))
                    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
                for(var k in o)
                    if(new RegExp("("+ k +")").test(fmt))
                        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
                return fmt;
            }
        },
        checkMail: function (mail) {//验证邮箱
            if (mail != "") {
                var filter = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
                var mail = /^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@([a-zA-Z0-9]+[-.])+[a-zA-Z0-9]{2,5}$/;
                if (!mail.test(mail) && !filter.test(mail)) {
                    return false;
                } else {
                    return true;
                }
            }
        },
        checkMobile: function (mobile) { //验证手机号
            if (mobile != "") {
                var reg = /^1[3|4|5|7|8][0-9]\d{4,8}$/;
                if (!reg.test(mobile)) {
                    return false;
                } else {
                    return true;
                }
            }
            return false;
        },
        AjaxCheckPwd:function(url, password, obj){//ajax验证支付密码
            var status = false;
            $.ajax({
                cache: false,
                type: "POST",// 请求类型
                url: basePath + url,
                async: false,
                data: {pwd: password},
                dataType: 'json',
                success: function (data) {
                    if (data.code == '200') {
                        status = true;
                        $('.fake-pwd').remove();
                    }
                    else {
                        obj.parent().find('.alertText').html('<em></em>').append('<label class="error">' + data.message + '</label>').css("display", "inline");
                        obj.focus();
                    }
                },
                error: function () {
                    layer.msg("请稍后再试。", {icon: 5});
                }
            });
            return status;
        },
        AjaxCheckMobile:function (url, obj) { //ajax验证手机号码
            var status = false;
            $.ajax({
                cache: true,
                type: "GET",// 请求类型
                url: basePath + url,
                async: false,
                data: {mobile: obj.val()},
                dataType: 'json',
                success: function (data) {
                    if (data.code == '200') {
                        status = true;
                    }
                    else {
                        obj.parent().find('.alertText').html('<em></em>').append('<label class="error">' + data.message + '</label>').css("display", "inline");
                        obj.focus();
                    }
                },
                error: function () {
                    layer.msg("请稍后再试。", {icon: 5});
                }
            });
            return status;
        },
        hiddenPH:function(){ //隐藏文本框标记
            $(".placeholder").hide();
        },
        showPH:function(){
            var pwdResult = pgeditor.pwdResult();
            if (pwdResult == '') {
                $(".placeholder").show();
            }
        },
        hideValidateAlert:function(obj){
            var $form=$(this).parents('form').first();
            if(!$form.validate().element(obj)){
                //$("#amtB").val('');
            }
        }
    }
   
})