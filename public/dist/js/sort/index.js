define(function(require,exports,module){var $=require("jquery");module.exports={init:function(){require("amazeUI"),$(".sort-second").tabs({noSwipe:1}),$("#sortList").on("click",".sort-second .am-tabs-bd li.list",function(){var a=$(this),s=a.attr("data-sortid"),t=a.text(),i=basePath+a.attr("data-url");a.parent().find("li").removeClass("active"),a.addClass("active"),$.ajax({url:basePath+"/sort/index",mockUrl:"/sort/list",url:i,type:"POST",data:{id:s},success:function(a){if("200"==a.code){var s="<h1>"+t+"</h1>";s+='<ul class="am-list">',a.data&&a.data.forEach(function(a,t){s+="<li><a href='"+basePath+"/goods/detail?productId="+a.id+"'><div class='am-g am-g-collapse'>",s+="<div class='am-u-sm-2'><img src='"+a.img+"'/></div>",s+="<div class='am-u-sm-10'>"+a.name+"</div></div></a></li>"}),s+="</ul>",$("#sortGoodsList").children().html(s),$("#sortGoodsList").offCanvas("open")}},error:function(a,s,t){}})})}}});