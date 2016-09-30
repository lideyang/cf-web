/**
 * Created by lidy on 2016/7/27.
 */
define(function (require, exports, module) {
    var $ = require('jquery');
    require('amazeUI');
    require('jquery/plugins/jquery.history');
    var his = new History('history');
    module.exports = {
        getHistory: function () {
            module.exports.reload();
        },
        addHistory: function () {
            $("#addSearchBtn").on('click', function () {
                var $searchTxt = $("#searchTxt");
                if ($searchTxt.val() != '') {
                    his.add($searchTxt.val(), Math.random(), '');
                    $("#searchForm").submit();
                }
            })
        },
        delHistory: function () {
            $("#historyList").on('click', '.am-icon-times-circle', function () {
                his.delItem($(this).parent().children('span').text());
                module.exports.reload();
            })
            $("#clearHistoryBtn").on('click',function(){
                his.clearHistory();
                $("#searchHistory").hide();
                module.exports.reload();
            })
        },
        showHistory:function(){
            $("#searchTxt").on('focus',function(){
                if($("#historyList").children().length){
                    $("#searchHistory").show();
                }
            })
        },
        reload: function () {
            var data = his.getList();
            var html = '';
            for (var item in data) {
                html += '<li class="am-g"><span>' + data[item].title + '</span><i class="am-icon-times-circle am-fr text-miss"></i></li>'
            }
            $("#historyList").html(html);
        }
    }
});