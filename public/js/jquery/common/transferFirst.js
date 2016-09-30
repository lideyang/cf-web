/**
 * Created by lidy on 2016/6/14.
 */
/**
 * Created by lidy on 2015/9/17.
 */
/*转账到钱包验证*/
define(function (require, exports, module) {
    var $ = require('jquery');
    var tools = require('tools');
    require('jquery.validate');
    require('jquery.CountDown');
    require('jquery.select');
    var options = {
        selectContactUrl:  basePath + '/transfer/getMyContact.json',
        allContactUrl: basePath + '/transfer/getMyContact.json?toLogidId=',
        checkPayeeUserUrl: basePath + '/transfer/checkPayeeUser.json',
    }
    module.exports = {
        config:function(opt){
            options = $.extend({}, options, opt);
        },
        init: function () {
            //tab
            $("#navTabs").on("click", '.tabs', function () {
                var index = $(this).index();
                $(this).addClass('active').siblings().removeClass('active');
                $("#tabsContent").find(".tableTransfer").hide().eq(index).show();
            })
        },
        toAccount:function(){
            //初始化进入界面如果${sendMsgFlag}值为1，则默认选中checkbox，并展示手机号吗。
            if(sendMsgFlag == "" || sendMsgFlag == "undefined"){
                $("#chkNoticeInput").val(0);
            }
            if("1"== sendMsgFlag){//sendMsgFlag值为1时默认选中
                $("#chkNotice").addClass("checkboxOn");
                $(".inpNotice").slideDown();
                $("#phoneNumber").rules('add',{
                    required: true,
                    isMobile: true
                });
            }
            //输入查询select
            $("#payeeUserNo").on("blur.select", function () {
                var validator = $("#transferForm").validate();
                if (!validator.element("#payeeUserNo")) {
                    $("#payeeUserName").val('');
                }
            })
            //select
            $("#payeeUserNo").comboSelect({
                ajax: options.selectContactUrl
            });
            var response = '';
            $("#payeeUserNo").on("blur", function () {
                if (response != '' && response.code == '200' && '' == response.loginId || response.loginId == null) {
                    $("#userNameText").hide();
                }
                else if (response.code == '500') {
                    $("#payeeUserName").val('');
                }
            })
            //查询所有联系人
            $("#contacts").on("click", function () {
                listContact("");
            })
            function listContact(payeeUserId) {
                $.ajax({
                    type: 'GET',
                    url: options.allContactUrl + payeeUserId,
                    dataType: 'JSON',
                    async: false,
                    success: function (data, status) {
                        var lDiv = $("#contactList");
                        lDiv.text("");
                        if (data.code == '200') {
                            var cList = data.data;
                            $("#contactSize").text(cList.length);
                            for (var i = 0; i < cList.length; i++) {
                                //          lDiv.append("<input type=\"radio\" name=\"contacts\" data-UserName=\"" + cList[i].linkMan + "\" data-UserNo=\"" + cList[i].linkLoginId + "\"/>" + cList[i].linkMan + "  |  ****" + cList[i].linkNo.toString().substr(8) + "<br />");
                                lDiv.append("<p class='list'><input type=\"radio\" name=\"contacts\" data-UserName=\"" + cList[i].linkMan + "\" data-UserNo=\"" + cList[i].linkLoginId + "\"/>" + cList[i].linkMan + "  |  ****" + cList[i].linkLoginId.toString().substr(8) + "</p>");
                            }
                            if (cList.length > 0) {
                                $("#contacts").siblings("#popup").fadeIn();
                            } else {
                                $("#contacts").siblings("#popup").fadeOut();
                                //$("#payeeUserName").val("");
                                //  layer.msg("收款人不存在", 1, 2);
                            }

                            $("#contactList").on("click", 'p.list', function () {
                                var $input = $(this).find("input:radio");
                                $("#payeeUserNo").val($input.attr("data-UserNo"));
                                $("#payeeUserName").val($input.attr("data-UserName"));
                                $("#payeeUserNo").html('<option value="' + $input.attr("data-UserNo") + '">' + $input.attr("data-UserNo") + '</option>');
                                //$("#payeeUserNo")._updateInput();
                                $("#payeeUserNo").val($input.attr("data-UserNo"));
                                $("#contactsBox").find('.combo-input').val($input.attr("data-UserNo")).trigger('blur');
                                $("#contacts").siblings("#popup").fadeOut();
                                $('#transferForm').validate().element($('#payeeUserNo'));
                                $("#userNameAlert").hide();
                            });

                        }
                        else {
                            lDiv.text(data.message);
                        }
                    }
                });
            }
            //表单验证
            $("#transferForm").validate({
                // 验证规则
                rules: {
                    payeeUserNo: {
                        required: true,
                        isName: true,
                        remote: {
                            type: "GET",
                            url:options.checkPayeeUserUrl,
                            cache: false,
                            data: {
                                toLogidId: function () {
                                    return $("#payeeUserNo").val();
                                }
                            },
                            complete: function (data) {
                                // if ('' != payeeUserId) {
                                //$.get(?= ' + payeeUserId, function (data, status) {
                                response = data = $.parseJSON(data.responseText);
                                if (data.code == '200') {
                                    var loginId = data.data.loginId;
                                    var name = data.data.name;
                                    if ('' != loginId && loginId != null) {
                                        //对方已注册
                                        $("#payeeUserName").val(name);
                                        //$("#payeeUserNoText").hide();
                                    } else {
                                        $("#payeeUserName").val('');
                                        $("#userNameText").html('<em class="miss"></em><label id="payeeUserName-error" class="error miss" for="payeeUserName">收款人未开通账号，您可继续转账。</label>').show();
                                    }
                                } else if (data.code == '500') {
                                    var state = data.data.status;
                                    if ('' != state && state != null) {
                                        $("#payeeUserNoText").html('<em></em><label id="payeeUserNo-error" class="error" for="payeeUserNo">此账户已' + state + '。</label>').show();
                                    } else {
                                        $("#payeeUserNoText").hide();
                                    }
                                    $("#payeeUserName").val('');
                                    $("#userNameText").hide();
                                }
                            }
                        }
                    },
                    payeeUserName: {
                        //   required: true,
                        //   minlength: 2
                    },
                    amtB: {
                        required: true,
                        isNumber: true,
                        min: 0.01,
                        rechargeAmtLimit: rechargeAmtLimit
                    },
                    phoneNumber: {
                        isMobile: true
                    },
                    remark: {
                        required: true
                    }
                },
                // 设置错误信息
                messages: {
                    payeeUserNo: {
                        required: '请输入收款人账户',
                        isName: '收款人账户不正确',
                        remote: '此账户已冻结'
                    },
                    payeeUserName: {
                        required: '请输入收款人姓名',
                        minlength: '姓名不正确'
                    },
                    amtB: {
                        required: '请输入转账金额',
                        min: '转账金额不正确',
                        rechargeAmtLimit: '转账金额不可大于本次可转账金额',
                        cashAmt: '转账金额不可大于当日可转账余额',
                        isNumber: '转账金额不正确'
                    },
                    phoneNumber: {
                        required: '请输入手机号码',
                        isMobile: '手机号码不正确'
                    },
                    remark: {
                        maxlength: '长度不正确'
                    }
                },
                debug: true,
                ignore: "#PWD,#amtA",
                hiddenInput: 'amtB',
                // 错误信息显示
                errorPlacement: function (error, element) {
                    var $element = $(element);
                    if ($element.attr('id') == 'payeeUserNo') {
                        // var validator = $("#transferForm").validate();
                        // if(!validator.element("#payeeUserNo")){
                        //     $("#payeeUserName").val('');
                        // }
                    }
                    $element.addClass('myInputBlur')
                        .parent().find(".alertText").addClass('alertTextFocus')
                        .html('<em></em>').append(error).css("display", "inline");
                },
                // 成功信息显示
                success: function (error, element) {
                    $(element).removeClass('alertTextFocus myInputBlur')
                        .parent().find(".alertText").removeClass("alertTextFocus").empty();
                },
                submitHandler: function (form) {
                    $(form)[0].submit();
                }
            });
            //金额两位数
            tools.moneyFixInput();
            //发送短信通知
            $("#chkNotice").click(function () {
                if (!$(this).hasClass("checkboxOn")) {
                    $(this).parent().parent().find('.inpNotice').slideDown().children("input").addClass("inpRequired");
                    $("#chkNoticeInput").val("1");
                    $("#phoneNumber").rules('add',{
                        required: true,
                        isMobile: true
                    });

                }
                else {
                    $(this).parent().parent().find('.inpNotice').slideUp().children("input").removeClass("inpRequired");
                    $("#chkNoticeInput").val("0");
                    $("#phoneNumber").rules('remove');

                }
            });
            var windowClose = $("#windowClose");
            var popup = $("#popup");
            var contacts = $("#contacts");
            contacts.click(function () {
                $(this).siblings("#popup").fadeIn();
            });
            windowClose.click(function () {
                $(this).parents("#popup").fadeOut();
            });
            $("#popup :radio").click(function () {
                $(this).parents("#popup").fadeOut();
            });
            $(document).on("click", function (e) {
                if (e.target.id != 'contacts' && e.target.id != 'popup') {
                    $("#popup").fadeOut();
                }
            })
        },
        toBankCard:function(){
            var windowClose = $("#windowClose2");
            var popup = $("#popup2");
            var contacts = $("#contacts2");
            popup.fadeOut();
            contacts.click(function () {
                $(this).siblings("#popup2").fadeIn();
            });
            windowClose.click(function () {
                $(this).parents("#popup2").fadeOut();
            });
            $("#popup2 :radio").click(function () {
                $(this).parents("#popup2").fadeOut();
            });
            $("#chkNotice2").click(function () {
                if ($(this).hasClass("checkboxOn")) {
                    $(".inpNotice2").slideDown();
                    $(".inpNotice2").children("input").addClass("inpRequired");
                }
                else {
                    $(".inpNotice2").slideUp();
                    $(".inpNotice2").children("input").removeClass("inpRequired");
                }
            });
            $("#cardNo").comboSelect({
                ajax: basePath + "/static/mocks/bankCard.json"
            });
            /*转账到银行卡验证*/
            $("#transferForm02").validate({
                // 验证规则
                rules: {
                    bankUserNo: {
                        required: true,
                        isEmail: true
                    },
                    bankName: {
                        minlength: 1
                    },
                    bankTpye: {},
                    bankUserName: {
                        required: true,
                        minlength: 1
                    },
                    bankamtA: {
                        required: true,
                        byteRangeLength: [3, 30]
                    },
                    bankPhoneNumber: {
                        isMobile: true
                    },
                    bankRemark: {
                        maxlength: 15
                    }
                },
                // 设置错误信息
                messages: {
                    bankUserNo: {
                        required: '请输入收款人账户',
                        isEmail: '收款人账户邮箱'
                    },
                    bankName: {
                        minlength: '银行必须选择'
                    },
                    bankTpye: {},
                    bankUserName: {
                        required: '请输入收款人姓名',
                        minlength: '姓名不正确'
                    },
                    bankamtA: {
                        required: '请输入转账金额',
                        byteRangeLength: '金额不正确'
                    },
                    bankPhoneNumber: {
                        isMobile: '手机号不正确'
                    },
                    bankRemark: {
                        maxlength: '长度不正确'
                    }
                },
                ignore: "#PWD",
                // 错误信息显示
                errorPlacement: function (error, element) {
                    var $element = $(element);
                    if ($element.attr('id') == 'payeeUserNo') {
                        $element.addClass('myInputBlur')
                            .parent().parent().find(".alertText").addClass('alertTextFocus')
                            .html('<em></em>').append(error).css("display", "inline");
                    } else {
                        $element.addClass('myInputBlur')
                            .parent().find(".alertText").addClass('alertTextFocus')
                            .html('<em></em>').append(error).css("display", "inline");
                    }
                },
                // 成功信息显示
                success: function (error, element) {
                    var $element = $(element);
                    if ($element.attr('id') == 'payeeUserNo') {
                        $(element).removeClass('alertTextFocus myInputBlur')
                            .parent().parent().find(".alertText").removeClass("alertTextFocus").empty();
                    } else {
                        $(element).removeClass('alertTextFocus myInputBlur')
                            .parent().find(".alertText").removeClass("alertTextFocus").empty();
                    }
                },
                submitHandler: function (form) {
                    $(form)[0].submit();
                }
            });
            //金额两位数
            tools.moneyFixInput('#cardAmtA','cardAmtB');
            $("#cardNotice").on("click", function () {
                if (!$(this).hasClass("checkboxOn")) {
                    $(this).parent().parent().find('.inpNotice').slideDown().children("input").addClass("inpRequired");
                    $("#cardNoticeInput").val("1");
                }
                else {
                    $(this).parent().parent().find('.inpNotice').slideUp().children("input").removeClass("inpRequired");
                    $("#cardNoticeInput").val("0");
                }
            })
            $("#cardContacts").on("click", function () {
                listContact2($("#payeeUserNo").val());
            })
            function listContact2(payeeUserId) {
                $.ajax({
                    type: 'GET',
                    url: basePath + '/static/mocks/select.json?toLogidId=' + payeeUserId,
                    dataType: 'JSON',
                    async: false,
                    success: function (data, status) {
                        var lDiv = $("#cardContactList");
                        lDiv.text("");
                        if (data.code == '200') {
                            var cList = data.data;
                            $("#cardContactSize").text(cList.length);
                            for (var i = 0; i < cList.length; i++) {
                                //          lDiv.append("<input type=\"radio\" name=\"contacts\" data-UserName=\"" + cList[i].linkMan + "\" data-UserNo=\"" + cList[i].linkLoginId + "\"/>" + cList[i].linkMan + "  |  ****" + cList[i].linkNo.toString().substr(8) + "<br />");
                                lDiv.append("<p class='list'><input type=\"radio\" name=\"contacts\" data-UserName=\"" + cList[i].linkMan + "\" data-UserNo=\"" + cList[i].linkLoginId + "\"/>" + cList[i].linkMan + "  |  ****" + cList[i].linkLoginId.toString().substr(8) + "</p>");
                            }
                            if (cList.length > 0) {
                                $("#contacts").siblings("#popup").fadeIn();
                            } else {
                                $("#contacts").siblings("#popup").fadeOut();
                                //$("#payeeUserName").val("");
                                //  layer.msg("收款人不存在", 1, 2);
                            }

                            $("#contactList").on("click", 'p.list', function () {
                                var $input = $(this).find("input:radio");
                                $("#payeeUserNo").val($input.attr("data-UserNo"));
                                $("#payeeUserName").val($input.attr("data-UserName"));
                                $("#contacts").siblings("#popup").fadeOut();
                                $('#transferForm').validate().element($('#payeeUserNo'));
                                $("#userNameAlert").hide();
                            });

                        }
                        else {
                            lDiv.text(data.message);
                        }
                    }
                });
            }
        }
    }
});