$.validator.setDefaults({onkeyup:!1}),function(t){"function"==typeof define&&define.amd?define(["jquery","jquery.validate"],t):t(jQuery)}(function($){$.extend($.validator.messages,{required:"此项必须填写",remote:"请修正此栏位",url:"请输入有效的网址",date:"请输入有效的日期",dateISO:"请输入有效的日期 (YYYY-MM-DD)",number:"请输入正确的数字",digits:"只可输入数字",creditcard:"请输入有效的信用卡号码",equalTo:"你的输入不相同",extension:"请输入有效的后缀",maxlength:$.validator.format("最多 {0} 个字"),minlength:$.validator.format("最少 {0} 个字"),rangelength:$.validator.format("请输入长度为 {0} 至 {1} 之間的字串"),range:$.validator.format("请输入 {0} 至 {1} 之间的数值"),max:$.validator.format("请输入不大于 {0} 的数值"),min:$.validator.format("请输入不小于 {0} 的数值")})}),jQuery.validator.addMethod("isMobile",function(t,a){var e=t.length,r=/^(((13[0-9]{1})|(15[0-9]{1})|(147)|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;return this.optional(a)||11==e&&r.test(t)},"请正确填写您的手机号码"),jQuery.validator.addMethod("isTel",function(t,a){var e=/^0\d{2,3}-\d{7,8}$/;return this.optional(a)||e.test(t)},"请正确填写您的电话号码"),jQuery.validator.addMethod("stringCheck",function(t,a){return this.optional(a)||/^[\u0391-\uFFE5\w]+$/.test(t)},"只能包括中文字、英文字母、数字和下划线"),jQuery.validator.addMethod("byteRangeLength",function(t,a,e){for(var r=t.length,o=0;o<t.length;o++)t.charCodeAt(o)>128&&r++;return this.optional(a)||r>=e[0]&&r<=e[1]},"请确保输入的值在3-15个字节之间(一个中文字算2个字节)"),jQuery.validator.addMethod("selectNone",function(t,a){return"请选择"==t},"必须选择一项"),jQuery.validator.addMethod("companyName",function(t,a){var e=/^[\u4E00-\u9FA5\(\)\（\）]+$/;return this.optional(a)||e.test(t)},"输入非法符号"),jQuery.validator.addMethod("postCode",function(t,a){var e=/^[1-9][0-9]{5}$/;return this.optional(a)||e.test(t)},"输入非法符号"),jQuery.validator.addMethod("isName",function(t,a){var e=!1,r=/^(((13[0-9]{1})|(15[0-9]{1})|(147)|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/,o=/^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,d=/\d/,n=/[a-zA-Z]/,i=/\_/,u=!1,s=0;return d.test(t)&&s++,n.test(t)&&s++,i.test(t)&&s++,s>1&&(u=!0),(r.test(t)||o.test(t))&&(e=!0),this.optional(a)||e},"6-30位字母和数字、下划线的组合且首字符是字母"),jQuery.validator.addMethod("isPwd",function(t,a){var e=/^\w{6,20}$/,r=/[0-9]/,o=/[a-zA-Z]/,d=(new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]"),!1),n=0;return r.test(t)&&n++,o.test(t)&&n++,n>1&&e.test(t)&&(d=!0),this.optional(a)||d},"必须是6-20个英文字母、数字的组合，不能是纯数字"),jQuery.validator.addMethod("isUrl",function(t,a){var e=/^((https?|ftp|news):\/\/)?([a-z]([a-z0-9\-]*[\.。])+([a-z]{2}|aero|arpa|biz|com|coop|edu|gov|info|int|jobs|mil|museum|name|nato|net|org|pro|travel)|(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))(\/[a-z0-9_\-\.~]+)*(\/([a-z0-9_\-\.]*)(\?[a-z0-9+_\-\.%=&]*)?)?(#[a-z][a-z0-9_]*)?$/;return this.optional(a)||e.test(t)},"url验证"),jQuery.validator.addMethod("noNumber",function(t,a){var e=/^([\u4e00-\u9fa5]|[a-zA-Z])*$/;return this.optional(a)||e.test(t)},"请不要输入数字"),jQuery.validator.addMethod("isNumber",function(t,a){var e=/^[1-9]\d*$|^[1-9]\d*\.\d*$|0\.\d*[1-9]\d*$/;return this.optional(a)||e.test(t)},"全数字验证"),jQuery.validator.addMethod("isNumberAndZero",function(t,a){var e=/^[0-9]\d*$|^[1-9]\d*\.\d*$|0\.\d*[1-9]\d*$|0\.[0]{1,2}$/;return this.optional(a)||e.test(t)},"全数字验证"),jQuery.validator.addMethod("isPositiveNumber",function(t,a){var e=/^[0-9][0-9_]*$/;return this.optional(a)||e.test(t)},"正整数验证"),jQuery.validator.addMethod("isCE",function(t,a){var e=/^[\u0391-\uFFE5A-Za-z]+$/;return this.optional(a)||e.test(t)},"只能输入中文或者英文"),jQuery.validator.addMethod("isEmail",function(t,a){var e=/^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,r=/^.{6,30}$/;return this.optional(a)||e.test(t)&&r.test(t)},"请正确填写您的电子邮箱"),jQuery.validator.addMethod("cnCharset",function(t,a){return this.optional(a)||/^[\u4e00-\u9fa5]+$/.test(t)}),jQuery.validator.addMethod("numFixed",function(t,a){return this.optional(a)||/^\d{0,8}\.{0,1}(\d{1,2})$/.test(t)}),jQuery.validator.addMethod("oneDecimal",function(t,a){return this.optional(a)||/^0+\.{0,1}(\d{1,2})$/.test(t)}),jQuery.validator.addMethod("compareMoney",function(t,a,e){return""==$(e).val()&&""==t||parseFloat($(e).val())<=parseFloat(t)}),jQuery.validator.addMethod("noEqual",function(t,a,e){return $(e).val()!==t}),jQuery.validator.addMethod("rechargeAmtLimit",function(t,a,e){return parseFloat(e)>=parseFloat(t)}),jQuery.validator.addMethod("cashAmt",function(t,a,e){return parseFloat(e)>=parseFloat(t)}),jQuery.validator.addMethod("isID",function(t,a){var e={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外 "};if(!t||!/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(t))return!1;if(!e[t.substr(0,2)])return!1;if(18==t.length){for(var r,o=[7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2],d=[1,0,"X",9,8,7,6,5,4,3,2],n=0,i=0;i<t.length-1;i++)n+=parseInt(t.substr(i,1),10)*o[i];return r=n%11,d[r]==t.substr(17,1).toUpperCase()}return!0},"请正确填写您的身份证号码");var status=1;