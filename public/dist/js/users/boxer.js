define(function(require,exports,module){var $=require("jquery");module.exports={init:function(){require("amazeUI"),$("#checkAllBtn").on("click",function(){$("input[type='checkbox']").uCheck("check"),$("#settlementBtn").removeClass("am-disabled")}),$("input[type='checkbox']").on("change",function(){$("input[type='checkbox']").is(":checked")?$("#settlementBtn").removeClass("am-disabled"):$("#settlementBtn").addClass("am-disabled"),console.log($("input[name='address']").is(":checked"))}),$("#settlementBtn").on("click",function(){})}}});