define(function(require,exports,module){var $=require("jquery");require("amazeUI"),require("jquery/plugins/jquery.history");var t=new History("history");module.exports={getHistory:function(){module.exports.reload()},addHistory:function(){$("#addSearchBtn").on("click",function(){var i=$("#searchTxt");""!=i.val()&&(t.add(i.val(),Math.random(),""),$("#searchForm").submit())})},delHistory:function(){$("#historyList").on("click",".am-icon-times-circle",function(){t.delItem($(this).parent().children("span").text()),module.exports.reload()}),$("#clearHistoryBtn").on("click",function(){t.clearHistory(),$("#searchHistory").hide(),module.exports.reload()})},showHistory:function(){$("#searchTxt").on("focus",function(){$("#historyList").children().length&&$("#searchHistory").show()})},reload:function(){var i=t.getList(),r="";for(var o in i)r+='<li class="am-g"><span>'+i[o].title+'</span><i class="am-icon-times-circle am-fr text-miss"></i></li>';$("#historyList").html(r)}}});