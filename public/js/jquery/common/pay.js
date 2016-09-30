/**
 * Created by lidy on 2016/6/8.
 */
define(function (require, exports, module) {
    var $ = require('jquery');
    var tools = require('tools');
    require('jquery.validate');
    require('jquery.loadingBtn');
    require('jquery.antiTamper');
    var index;
    var qpayHtml = $("#qpayLayer").html();
    var reQpayHtml = $("#reQpayLayer").html();
    $("#qpayLayer").empty();
    $("#reQpayLayer").empty();
    //首次添加
    var $firstBankList = $("#firstBankList");
    var bankImgHtml = '';
    var bankCodeStr = '';
    var bankNameStr = '';
    var reBankAction = '';
    //设为第一张默认
    var $qPayfirstCard = $("#bankList").find(".rechargeBank").first();
    //保存form值
    var bindBankCardParm = '';
    //验证码类型
    var codeType = 'pwd';
    var options = {
        title: '充值',
        addBankUrl: basePath + '/person/account/agreement.json',
        rechargeUrl: basePath + '/recharge/recharge.json',
        rechargeResultUrl: basePath + '/recharge/',
        dataType:'POST'
    }
    var self=module.exports;
    //银行卡选中事件
    function checkCheckBoxBtn() {
        var checkboxOff = $(".checkboxOff");
        checkboxOff.click(function () {
            $self = $(this);
            if (!$self.hasClass("chkDisabled")) {
                var $input = $(this).find("input");
                if ($self.hasClass('checkboxOn')) {
                    $self.removeClass('checkboxOn');
                    $input.attr('checked', false).prop('checked', false);
                }
                else {
                    $self.addClass('checkboxOn');
                    $input.attr('checked', true).prop('checked', true);
                }
                console.log($input.attr('checked'));
            }
        });
    }
    //密码控件
    function seedAddInfo() {
        var pwdResult = $("#qpaypassInput").val();
        if (needPasswordCtrl && pgeditor != null)
            $.ajax({
                url: basePath+"/getMcryptKey.json",
                type: "GET",
                async: false,
                cache: false,
                success: function (data) {
                    if (codeType == 'pwd') {
                        pgeditor.pwdSetSk(data.data);
                        pwdResult = pgeditor.pwdResult();
                        $("#qpaypassInput").val(pwdResult);//将密码密文赋值给表单
                        if (pwdResult != '') {
                            $("#realPayPwd").val(pwdResult);
                        }
                    } else {
                    }
                }
            });
    }
    module.exports = {
        config:function(opt){
            options = $.extend({}, options, opt);
        },
        init:function(){
            //金额保留两位小数
            tools.moneyFixInput();
            //第一张银行卡是否默认做选中处理
            if (typeof($qPayfirstCard.attr('data-bankcode')) != 'undefined') {
                $qPayfirstCard.addClass("rechargeBankOn").find(".radioOff").addClass("radioOn");
            } else {
                $qPayfirstCard.removeClass("rechargeBankOn").find(".radioOff").removeClass("radioOn");
                $("#bankList").find(".radioOff").each(function () {
                    if (typeof($(this).attr('data-bankcode')) != 'undefined') {
                        $(this).addClass("radioOn").parent().addClass("rechargeBankOn");
                        return false;
                    }
                })
            }
            //判断是否有默认银行卡没有选中一张
            $(function(){
                var $bankOn  =$("#bankList").find(".rechargeBankOn");
                if(!$bankOn.length){
                    var $bank=$("#bankList").find('.rechargeBank[name="netBank"]');
                    if($bank.length){
                        $bank.first().click();
                    }else{
                        $('#repayBtn').click();
                    }
                }else{
                    $bankOn.click();
                }
            })
            //第一次绑卡选择银行卡
            $firstBankList.on("click", '.chooseBank', function () {
                if (!$(this).hasClass("rechargeBankOff")) {
                    $firstBankList.find(".radioOff").removeClass("radioOn");
                    $firstBankList.find(".rechargeBank").removeClass("rechargeBankOn");
                    bankImgHtml = $(this).addClass("rechargeBankOn").children(".radioOff").addClass("radioOn").next()[0].outerHTML;
                    bankCodeStr = $(this).children(".radioOn").attr("data-bankcode");
                    bankNameStr = $(this).children(".radioOn").attr("data-bankname");
                    if(bankCodeStr==undefined||parseInt(bankCodeStr)<=0){
                        $("#payWay").val('ACCOUNT');
                    }else{
                        $("#payWay").val('QPAY');
                    }
                    $("#firstBankCode").val(bankCodeStr);
                }
            });
            //第一次绑卡下一步
            $("#firstBankBtn").on("click", function (e) {
                // 是否已实名
                if (isCert != "REAL") {
                    layer.msg('您还未实名认证,请先完成实名认证过程!', {icon: 5, time: 2000}, function () {
                        window.location.href = basePath+"/realInfo/realInfoStep0.htm";
                    })
                    e.preventDefault();
                    return false;
                }
                // 校验表单
                if (checknetBankSubmit() != true) {
                    return false;
                }
                if ($("#firstBankCode").val() != '') {
                    var index = layer.open({
                        type: 1, //page层
                        area: ['545px', '480px'],
                        closeBtn: 1,
                        title: '快捷支付',
                        shade: 0.6, //遮罩透明度
                        moveType: 1, //拖拽风格，0是默认，1是传统拖动
                        shift: 1, //0-6的动画形式，-1不开启
                        content: qpayHtml,
                        success: function () {
                            //隐藏密码控件
                            if(needPasswordCtrl){
                                if(pgeditor!=null) {
                                    pgeditor.pwdTan('myInput fl loginInput loginNormalInput');
                                }
                            }
                            $li = $("#qpayLayerBoxer").find("li");
                            $li.eq(0).css("display", 'none');
                            $li.eq(1).css("display", 'block');
                            $("#bankImg").html(bankImgHtml);
                            $("#qbankCode").val(bankCodeStr);
                            $("#qpayBankCode").val(bankCodeStr);
                            $("#qpayBankName").val(bankNameStr);
                            $("#amtDouble").val($("#amtB").val());
                            checkCheckBoxBtn();
                            module.exports.addBank.validateForm();
                        },
                        cancel:function(){
                            if(needPasswordCtrl) {
                                if(pgeditor!=null){
                                    pgeditor.pwdClose("30px", "172px", "1px solid #cdcccb");
                                }
                            }
                            //清除key
                            $("input[name='key']").val('');
                        }
                    });
                } else {
                    layer.msg("请选择银行卡", {icon: 5})
                }
                return false;
            });
            //选择支付方式
            $("#tradeForm").on("click", '.typeList', function () {
                $("#tradeForm").find(".typeList").each(function () {
                    $(this).removeClass('checkboxOn').parent().next().slideUp();
                });
                $(this).addClass('checkboxOn').parent().next().slideDown();
            });
            $("[name='netBank']").find(".rechargeBank").on("click", function () {
                $("[name='bankTips']").hide();
            });
            //清除key
            $("#qpaySubmit,#addBankBtn").on("click", function () {
                $("input[name='key']").val('');
            })
        },
        addBank: {
            init:function(){
                require('jquery.CountDown');
                //添加快捷支付
                $("#addBankBtn").on("click", function () {
                    // 校验表单
                    if (checknetBankSubmit() != true) {
                        return false;
                    }
                    var index = layer.open({
                        type: 1, //page层
                        area: ['745px', '480px'],
                        closeBtn: 1,
                        title: '快捷支付',
                        shade: 0.6, //遮罩透明度
                        moveType: 1, //拖拽风格，0是默认，1是传统拖动
                        shift: 1, //0-6的动画形式，-1不开启
                        content: qpayHtml,
                        success: function () {
                            //隐藏密码控件
                            if (needPasswordCtrl && pgeditor != null) {
                                pgeditor.pwdTan('myInput fl loginInput loginNormalInput');
                            }
                            $("#qpayLayerBoxer").find("li").eq(0).css("display", 'block');
                            var $qpayBankList = $("#qpayBankList");
                            var bankImgHtml = '';
                            var bankCodeStr = '';
                            var bankNameStr = '';
                            checkCheckBoxBtn();
                            $qpayBankList.on("click", '.chooseBank', function () {
                                if (!$(this).hasClass("rechargeBankOff")) {
                                    $qpayBankList.find(".radioOff").removeClass("radioOn");
                                    $qpayBankList.find(".rechargeBank").removeClass("rechargeBankOn");
                                    bankImgHtml = $(this).addClass("rechargeBankOn").children(".radioOff").addClass("radioOn").next()[0].outerHTML;
                                    bankCodeStr = $(this).children(".radioOn").attr("data-bankcode");
                                    bankNameStr = $(this).children(".radioOn").attr("data-bankname");
                                    $("#qbankId").val(bankCodeStr);
                                }
                            })
                            $("#layerNextBtn").on("click", function () {
                                if ($("#qbankId").val() != '') {
                                    var leyerLeft = ($(window).width() - 545) / 2;
                                    $("#bankImg").html(bankImgHtml);
                                    $("#qbankCode").val($("#qbankId").val());
                                    $("#qpayBankCode").val($("#qbankId").val());
                                    $("#amtDouble").val($("#amtB").val());
                                    $("#qpayBankName").val(bankNameStr);
                                    $(this).parentsUntil('li').parent().fadeOut().next().fadeIn();
                                    layer.style(index, {
                                        width: '545px',
                                        left: leyerLeft
                                    })
                                    //验证银行卡信息
                                    module.exports.addBank.validateForm();
                                } else {
                                    layer.msg("请选择银行卡", {icon: 5})
                                }
                            })
                        },
                        cancel: function () {
                            if (needPasswordCtrl && pgeditor != null) {
                                pgeditor.pwdClose("30px", "172px", "1px solid #cdcccb");
                            }
                            //清除key
                            $("input[name='key']").val('');
                        }
                    });
                });
            },
            validateForm: function () { //验证银行卡信息
                /*银行卡验证*/
                $("#addBankCardForm").validate({
                    // 验证规则
                    rules: {
                        checkNum: {
                            required: true,
                            byteRangeLength: [4, 8]
                        },
                        mobile: {
                            required: true,
                            isMobile: true
                        },
                        bankCardNo: {
                            required: true,
                            byteRangeLength: [12, 22]
                            /*remote: {
                             url: basePath + '/person/account/validateCard.json',
                             data: {
                             cardNo: function () {
                             return $("#bankCardNo").val();
                             }
                             }
                             }*/
                        },
                        payPwd: {
                            required: true
                        },
                        agreeCheck: {
                            required: true
                        }
                    },
                    // 设置错误信息
                    messages: {
                        checkNum: {
                            required: '请输入短信验证码',
                            byteRangeLength: '验证码不正确',
                            remote: '手机验证码错误'
                        },
                        mobile: {
                            required: '请输入手机号码',
                            isMobile: '请输入正确的手机号码'
                        },
                        bankCardNo: {
                            required: '请输入12-22位的银行卡号',
                            byteRangeLength: '请输入正确的银行卡号'
                        },
                        payPwd: {
                            required: '请输入支付密码'
                        },
                        agreeCheck: {
                            required: '请同意协议'
                        }
                    },
                    ignore: "#PWD",
                    // 错误信息显示
                    errorPlacement: function (error, element) {
                        $element = $(element);
                        if ($element.attr("id") == 'agreeCheck') {
                            $(element).addClass('myInputBlur')
                                .parent().parent().find(".alertText").addClass('alertTextFocus')
                                .html('<em></em>').append(error).css("display", "inline");
                        }
                        else {
                            $(element).addClass('myInputBlur')
                                .parent().find(".alertText").addClass('alertTextFocus')
                                .html('<em></em>').append(error).css("display", "inline");
                        }
                    },
                    // 成功信息显示
                    success: function (error, element) {
                        $element = $(element);
                        if ($element.attr("id") == 'agreeCheck') {
                            $(element).removeClass('alertTextFocus myInputBlur')
                                .parent().parent().find(".alertText").removeClass("alertTextFocus").hide().empty();
                        }
                        else {
                            $element.removeClass('alertTextFocus myInputBlur')
                                .parent().find(".alertText").removeClass("alertTextFocus").hide().empty();
                        }
                    },
                    showErrors: function () {
                        this.defaultShowErrors();
                    },
                    debug: true,
                    submitHandler: function (form) {
                        // 充值金额赋值
                        $("#amtDouble").val($("#amtB").val());
                        //防重提交
                        $("#agreeBtnSubmit").loadingBtn({
                            action: 'start'
                        });
                        $(form).find(".fake-form").remove();
                        //保存form验证码需要
                        bindBankCardParm = $("#addBankCardForm").serialize();
                        // 提交表单
                        $.ajax({
                            url: options.addBankUrl,
                            // url:basePath+'/static/mocks/bindBankCardPwd.json',
                            type: options.dataType,
                            data: bindBankCardParm,
                            dataType: 'json',
                            async: true,
                            success: function (data, textStatus, jqXHR) {
                                console.log(data.code);
                                if (data.code == "200") {
                                    //提交充值信息
                                    //var parm='bankActId='+data.data+'&passAmt='+$("#amtB").val()+'&payWay=QPAY';
                                    $("#payWay").val('QPAY');
                                    $("#bankActId").val(data.data);
                                    $("#passAmt").val($("#amtB").val());
                                    $("#realPayPwd").val($("#payPwd").val());
                                    module.exports.tradeAJAX();
                                } else if (data.code == "order-pay-check-code-confirm") {
                                    $("#agreeBtnSubmit").loadingBtn({
                                        action: 'reset',
                                        defaultText: '同意开通并付款'
                                    });
                                } else {
                                    layer.msg(data.message, {icon: 5, time: 2000}, function () {
                                        // window.location.reload();
                                    })
                                    $("#agreeBtnSubmit").loadingBtn({
                                        action: 'reset',
                                        defaultText: '同意开通并付款'
                                    });
                                }
                                return false;
                            },
                            error: function () {

                            }
                        })
                        // 防止页面刷新
                        return false;
                    }
                });
                //发送验证码
                //url:basePath + '/phonecode.json'
                $('#sendSms').on("click", function () {
                    $("#checkNum").rules("remove");
                    $("#payPwd").rules("remove");
                    var parm = $("#addBankCardForm").serializeArray();
                    if ($("#addBankCardForm").valid()) {
                        $("#amtDouble").val($("#amtB").val());
                        $("#sendSms").CountDown({
                            data: parm,
                            start: true,
                            isMsg: true,
                            type: options.dataType,
                            isSeed: true,
                            isClick: false,
                            time: 6,
                            isCallBack: 'message',
                            isUpdateDate: '#addBankCardForm',
                            isMobile: '#mobile',
                            isClear: '#checkNum',
                            url: options.addBankUrl
                        });
                    }
                })
                $("#agreeBtnSubmit").on("click", function () {
                    $("#checkNum").rules("add", {
                        required: true,
                        byteRangeLength: [4, 8]
                    });
                    $("#payPwd").rules("add", {
                        required: true
                    });
                })
            }
        },
        quickPaySubmit:function(){
            //快捷
            $("#qpaySubmit").on("click", function () {
                var $onBankCard = $("#qpayBanks").find(".radioOn");
                $("#bankCode").val();
                var payWay = $onBankCard.attr("payWay");
                var bankId = $onBankCard.attr("data-bankid");
                var bankCode = $onBankCard.attr("data-bankcode");
                $("#payWay").val(payWay);
                $("#bankId").val(bankId);
                $("#bankCode").val(bankCode);
                //$("#qpayBankName").val(qpayBankName);
                $("#tradeForm").attr("target", "");

                // 校验表单
                if (checknetBankSubmit() != true) {
                    return false;
                }

                // 校验银行
                $("[name='bankTips']").css("display", "none");
                // if ("" == $("#bankCode").val() || payWay != "QPAY") {
                //     /* alert("请选择需要支付的银行"); */
                //     $("#qpayBankTips").css("display", "block");
                //     return false;
                // }

                if (needPasswordCtrl) {
                    $.ajax({
                        url: basePath + "/getMcryptKey.json?loginId="+loginId,
                        type: "GET",
                        async: false,
                        cache: false,
                        success: function (data) {
                            pgeditor.pwdSetSk(data.data);
                        }
                    });
                    var pwdResult = pgeditor.pwdResult();
                    $("#paypassInput").val(pwdResult);//将密码密文赋值给表单
                }
                // 校验支付密码
                var pwdFlag = tools.AjaxCheckPwd("/validatePayPwd.json", $("#paypassInput").val(), $("#paypassInput"))
                if (!pwdFlag) {
                    return false;
                }
                //验证通过支付密码
                $("#realPayPwd").val($("#paypassInput").val());
                $("#amtTips,#bankCode").hide();
                $(this).loadingBtn({
                    action: 'start'
                });
                //交易信息
                module.exports.tradeAJAX();
            });
        },
        netBankSubmit:function(){
            //网银
            $("#netBankBtnSubmit").bind("click", function () {
                $("#bankCode").val($("[name='netBank']").find("span[class='radioOff radioOn']").attr("data-bankid"));
                var payWay = $("[name='netBank']").find("span[class='radioOff radioOn']").attr("payWay");
                $("#payWay,#gateWayType").val(payWay);
                $("#tradeForm").attr("target", "_blank");
                // 校验表单
                if (checknetBankSubmit() != true) {
                    return false;
                }
                // 校验银行
                $("[name='bankTips']").css("display", "none");
                if ("" == $("#bankCode").val()) {
                    /* alert("请选择需要支付的银行"); */
                    $("#netBankTips").css("display", "block");
                    return false;
                }

                $("#amtTips,#bankCode").hide();
                index = layer.open({
                    type: 1, //page层
                    area: ['500px', '260px'],
                    closeBtn: false,
                    title: options.title,
                    shade: 0.6, //遮罩透明度
                    moveType: 1, //拖拽风格，0是默认，1是传统拖动
                    shift: 1, //0-6的动画形式，-1不开启
                    content: $("#popLayer").html()
                });
                $("#tradeForm").submit();
            });
            $("#amtA").on("blur",function(){
                var amt = parseFloat($("#amtA").val());
                var rex = /^[1-9]\d*$|^[1-9]\d*\.\d*$|0\.\d*[1-9]\d*$/;
                if (rex.test(amt)) {
                    $("#amtTips").hide();
                }
            })
        },
        tradeAJAX: function () { //交易请求
            $.ajax({
                url: options.rechargeUrl,
                //url:basePath+'/static/mocks/quickPayForm.json',
                data: $('#tradeForm').serialize(),
                type: options.dataType,
                success: function (data, textStatus, jqXHR) {
                    if (data.code == '200') {
                        window.location.href = options.rechargeResultUrl + data.data + "/success.htm";
                    } else if (data.code == 'bank-card-agreement-confirm' || data.code == 'order-pay-check-code-confirm') {
                        layer.closeAll();
                        $("#reCheckNum").val('');
                        //确认支付和绑定银行卡的按钮都要重置
                        $("#qpaySubmit").loadingBtn({
                            action: 'reset'
                        });
                        $("#agreeBtnSubmit").loadingBtn({
                            action: 'reset',
                            defaultText: '同意开通并付款'
                        });
                        //更新token
                        var token = jqXHR.getResponseHeader('formToken');
                        $("input[name='formToken']").val(token);
                        //form值和更新密码
                        //bindBankCardParm=dataObj;
                        var index = layer.open({
                            type: 1, //page层
                            area: ['545px', '220px'],
                            closeBtn: 1,
                            title: '快捷支付',
                            shade: 0.6, //遮罩透明度
                            moveType: 1, //拖拽风格，0是默认，1是传统拖动
                            shift: 1, //0-6的动画形式，-1不开启
                            content: reQpayHtml,
                            success: function () {
                                module.exports.reValidateForm();
                                //隐藏密码控件
                                if (needPasswordCtrl) {
                                    pgeditor.pwdTan('myInput fl loginInput loginNormalInput');
                                }
                            },
                            cancel: function () {
                                //更新action
                                reBankAction = options.rechargeUrl;
                                if (needPasswordCtrl) {
                                    pgeditor.pwdClose("30px", "172px", "1px solid #cdcccb");
                                }
                                //清除key
                                $("input[name='key']").val('');
                            }
                        });
                    } else if (data.data == null && data.code == '500') {
                        layer.msg(data.message, {icon: 5}, function () {
                            window.location.reload();
                        })
                    } else if (data.data != null && data.data != '') {
                        window.location.href = options.rechargeResultUrl + data.data + "/success.htm";
                    } else {
                        if (data.message) {
                            layer.msg(data.message, {icon: 5});
                        } else {
                            layer.msg('无法完成付款. 此订单订已经交易成功，请重新核实交易状态再付款', {icon: 5});
                        }
                        status--;
                    }
                    $("#qpaySubmit").loadingBtn({
                        action: 'reset',
                        defaultText: '下一步'
                    });
                }
            })
        },
        reValidateForm: function () { //重新发送
            /*银行卡验证*/
            $("#reBankCardForm").validate({
                // 验证规则
                rules: {
                    reCheckNum: {
                        required: true,
                        byteRangeLength: [4, 8]
                    }
                },
                // 设置错误信息
                messages: {
                    reCheckNum: {
                        required: '请输入短信验证码',
                        byteRangeLength: '验证码不正确',
                        remote: '手机验证码错误'
                    }
                },
                ignore: "#PWD",
                // 错误信息显示
                errorPlacement: function (error, element) {
                    $element = $(element);
                    console.log($element.attr("id"));
                    if ($element.attr("id") == 'agreeCheck') {
                        $(element).addClass('myInputBlur')
                            .parent().parent().find(".alertText").addClass('alertTextFocus')
                            .html('<em></em>').append(error).css("display", "inline");
                    }
                    else {
                        $(element).addClass('myInputBlur')
                            .parent().find(".alertText").addClass('alertTextFocus')
                            .html('<em></em>').append(error).css("display", "inline");
                    }
                },
                // 成功信息显示
                success: function (error, element) {
                    $element = $(element);
                    if ($element.attr("id") == 'agreeCheck') {
                        $(element).removeClass('alertTextFocus myInputBlur')
                            .parent().parent().find(".alertText").removeClass("alertTextFocus").hide().empty();
                    }
                    else {
                        $element.removeClass('alertTextFocus myInputBlur')
                            .parent().find(".alertText").removeClass("alertTextFocus").hide().empty();
                    }
                },
                showErrors: function () {
                    this.defaultShowErrors();
                },
                debug: true,
                submitHandler: function (form) {
                    // 充值金额赋值
                    $("#amtDouble").val($("#amtB").val());
                    //密码控件
                    seedAddInfo();
                    var parm = $("#tradeForm").serialize() + '&' + $("#reBankCardForm").serialize();
                    //防重提交
                    $("#reBtnSubmit").loadingBtn({
                        action: 'start'
                    });
                    // 提交表单
                    $.ajax({
                        url: options.rechargeUrl,
                        type: options.dataType,
                        data: parm,
                        dataType: 'json',
                        async: true,
                        cache: false,
                        success: function (data, textStatus, jqXHR) {
                            console.log(data.code);
                            $("#reCheckNum").val('');
                            if (data.code == "200") {
                                window.location.href = options.rechargeResultUrl + data.data + "/success.htm";
                            } else if (data.code == 'bank-card-agreement-confirm' || data.code == 'order-pay-check-code-confirm') {
                                $("#reBtnSubmit").loadingBtn({
                                    action: 'reset',
                                    defaultText: '确认付款'
                                });
                                if (data.message) {
                                    layer.msg(data.message, {icon: 5});
                                }
                            }else {
                                layer.msg(data.message, {icon: 5, time: 2000}, function () {
                                    // window.location.reload();
                                })
                                $("#reBtnSubmit").loadingBtn({
                                    action: 'reset',
                                    defaultText: '确认付款'
                                });
                            }
                            //更新token
                            var token = jqXHR.getResponseHeader('formToken');
                            $("input[name='formToken']").val(token);
                        },
                        error: function () {

                        }
                    })
                    // 防止页面刷新
                    return false;
                }
            });
            //发送验证码
            $("#amtDouble").val($("#amtB").val());
            $("#reSendSms").CountDown({
                data: $("#tradeForm").serialize(),
                start: true,
                isMsg: true,
                type: options.dataType,
                isSeed: false,
                isClick: true,
                time: 60,
                isCallBack: 'message',
                isClear: '#reCheckNum',
                isUpdateDate: '#tradeForm',
                isMobile: false,
                beforeClick: function () {
                    seedAddInfo();
                },
                isUpdateDate: '#tradeForm',
                tokenId: 'input[name="formToken"]',
                successDataCode: 'bank-card-agreement-confirm',
                url: options.rechargeUrl
            });
        },
        noSupportReeditCard:function(){
            //默认不支持信用卡
            $("#bankList").on("click", '.rechargeBank', function () {
                $radio = $(this).find('.radioOff');
                if ($radio.attr("data-bankcode")) {

                } else {
                    layer.msg('不支持信用卡'+options.title, {icon: 2});
                    $radio.removeClass("radioOn");
                    $(this).removeClass("rechargeBankOn");
                    return false;
                }
            })
        }
    }
});