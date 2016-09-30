/**
 * Created by lidy on 2016/7/12.
 */
define(function (require, exports, module) {
    var $ = require('jquery');
    module.exports = {
        init: function () {
            require('amazeUI');
            $(".sort-second").tabs({noSwipe: 1});
            $("#sortList").on("click", '.sort-second .am-tabs-bd li.list', function () {
                var $this=$(this);
                var id = $this.attr('data-sortid');
                var title = $this.text();
                var url = basePath + $this.attr('data-url');
                $this.parent().find('li').removeClass('active');
                $this.addClass('active');
                $.ajax({
                    url: basePath + '/sort/index',
                    mockUrl: '/sort/list',
                    url: url,
                    type: "POST",
                    data: {
                        id: id
                    },
                    success: function (data) {
                        if (data.code == "200") {
                            var str = '<h1>' + title + '</h1>';
                            str += '<ul class="am-list">';
                            if(data.data)
                            {
                            	data.data.forEach(function (item, index) {
                            		str += "<li><a href='" + basePath + "/goods/detail?productId=" + item.id + "'><div class='am-g am-g-collapse'>";
                            		str += "<div class='am-u-sm-2'><img src='" + item.img + "'/></div>";
                            		str += "<div class='am-u-sm-10'>" + item.name + "</div></div></a></li>";
                            	})
                            }
                            str += '</ul>';
                            $("#sortGoodsList").children().html(str);
                            $("#sortGoodsList").offCanvas('open');
                        }
                    },
                    error: function (a, b, c) {
                        //alert("xx");
                    }
                });
            })
        }
    }
});