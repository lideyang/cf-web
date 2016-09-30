/**
 * Created by lidy on 2016/7/4.
 */
define(function(require, exports, module) {
    var $ = require('jquery');
    require('amazeUI');
    module.exports = {
        init: function () {
            var $dropDownList=$("#navList").find('.dropdown');
            var winWidth=$(document).width();

            
            $("#navList").on('click','.dropdown',function(e){
                $dropDownList.removeClass('am-active');
                var $content=$(this).addClass('am-active').children('.dropdown-content');
                // $(this).children('.am-dropdown-content').css({
                //     width:winWidth
                // })
                $("#secondNav").show().html($content.html());

                //$content.hide();
            })
            /* 推荐轮播 */
            // $('#recommendBanner').flexslider({
            //     directionNav: false,
            //     controlNav:false
            // });
        }
    }
});