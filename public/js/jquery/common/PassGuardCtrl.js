/**
 * Created by lidy on 2016/6/7.
 */
define(function (require, exports, module) {
    var $ = require('jquery');
    require('passwordCtrl');
    module.exports = {
        config: function (opt) {
            var DEFAULTS = {
                pgePath: "./static/ocx/",//控件下载目录，可以指定绝对路径，如"http://www.baidu.com/download/"
                pgeId: "_ocx_password",//控件ID
                pgeEdittype: 0,//控件显示类型,0(星号),1(明文)
                pgeEreg1: "[\\s\\S]*",//输入过程中字符类型限制，如"[0-9]*"表示只能输入数字
                pgeEreg2: "[\\s\\S]{6,12}",	//输入完毕后字符类型判断条件，与pgeditor.pwdValid()方法对应
                pgeMaxlength: 20,//允许最大输入长度
                pgeTabindex: 2,//tab键顺序
                pgeOnfocus: '',
                pgeOnblur: '',
                pgeClass: "myInput ocx_style",//控件css样式
                pgeInstallClass: "ocx_install",//针对安装或升级的css样式
                tabCallback: "membercheckCode"//火狐tab键回调函数,设置要跳转到的对象ID
            }
            var options = $.extend({}, DEFAULTS, opt)
            var pgeditor = new $.pge(options);
            $("#"+options.pgeId+'_str').html(pgeditor.load());
            pgeditor.pgInitialize();
            return pgeditor;
        }
    }
});