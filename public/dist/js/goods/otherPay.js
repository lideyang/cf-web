define(function(require,exports,module){var $=require("jquery");module.exports={init:function(){require("amazeUI"),$("#otherPayList").on("click",".am-list-item-desced",function(){var i=($(this),$(this).find("input"));i.is(":disabled")||i.prop("checked",!0)})}}});