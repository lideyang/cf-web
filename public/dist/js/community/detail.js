define(function(require,exports,module){var $=require("jquery");module.exports={init:function(){require("amazeUI"),$("#thumbsBtn").on("click",function(){$("#thumbsNumTxt").text(parseInt($("#thumbsNumTxt").text())+1)})}}});