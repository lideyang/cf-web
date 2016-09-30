/**
 * Created by lidy on 2016/7/27.
 */
define(function (require, exports, module) {
    /**
     * History
     * 用法
     *  var his = new History('key');  // 参数标示cookie的键值
     * his.add("标题", "连接 比如 http://www.baidu.com", "其他内容")；
     * 得到历史数据 返回的是json数据
     * var data = his.getList();  // [{title:"标题", "link": "http://www.baidu.com"}]
     *
     */
    function History(key) {
        this.limit = 10;  // 最多10条记录
        this.key = key || 'y_his';  // 键值
        this.jsonData = null;  // 数据缓存
        this.cacheTime = 2400;  // 24 小时
    }

    History.prototype = {
        constructor: History
        , addCookie: function (name, value, expiresHours, options) {
            options = options || {};
            var cookieString = name + "=" + escape(value);
            //判断是否设置过期时间
            if (undefined != expiresHours && expiresHours > 0) {
                var date = new Date();
                date.setTime(date.getTime() + expiresHours * 3600 * 1000);
                cookieString = cookieString + "; expires=" + date.toUTCString();
            }
            var path = options.path ? '; path=' + options.path : '',
                domain = options.domain ? '; domain=' + options.domain : '',
                secure = options.secure ? '; secure' : '';

            //alert(cookieString + path + domain + secure);
            document.cookie = cookieString + path + domain + secure;
        }
        , getCookie: function (name) {
            var cookies = document.cookie,  //得到本域下的所有cookie  -- "userId=828; userName=lisi"
                arrCookie = cookies.split(";"),
                val = "",
                tmpArr = "";
            for (var i = 0; i < arrCookie.length; i++) {
                tmpArr = arrCookie[i].split("=");
                if (tmpArr[0].replace(/\s+/g, "") == name) {
                    val = unescape(tmpArr[1]);
                    break;
                }
            }
            return val.toString();
        }
        , deleteCookie: function (name) {
            var date = new Date();
            date.setTime(date.getTime() - 10000);
            document.cookie = name + "=''; expires=" + date.toUTCString();
        }

        , initRow: function (title, link, other) {
            return '{"title":"' + title + '", "link":"' + link + '", "other":"' + other + '"}';
        }
        , parse2Json: function (jsonStr) {
            var json = [];
            try {
                json = JSON.parse(jsonStr);
            } catch (e) {
                //alert('parse error');return;
                json = eval(jsonStr);
            }

            return json;
        }

        // 添加记录
        , add: function (title, link, other) {
            var jsonStr = this.getCookie(this.key);
            //alert(jsonStr); return;

            if ("" != jsonStr) {
                this.jsonData = this.parse2Json(jsonStr);

                // 排重
                for (var x = 0; x < this.jsonData.length; x++) {
                    if (link == this.jsonData[x]['link'] || title == this.jsonData[x]['title']) {
                        return false;
                    }
                }
                // 重新赋值 组装 json 字符串
                jsonStr = '[' + this.initRow(title, link, other) + ',';
                for (var i = 0; i < this.limit - 1; i++) {
                    if (undefined != this.jsonData[i]) {
                        jsonStr += this.initRow(this.jsonData[i]['title'], this.jsonData[i]['link'], this.jsonData[i]['other']) + ',';
                    } else {
                        break;
                    }
                }
                jsonStr = jsonStr.substring(0, jsonStr.lastIndexOf(','));
                jsonStr += ']';

            } else {
                jsonStr = '[' + this.initRow(title, link, other) + ']';
            }

            this.jsonData = this.parse2Json(jsonStr);
            this.addCookie(this.key, jsonStr, this.cacheTime);
        }
        // 得到记录
        , getList: function () {
            // 有缓存直接返回
            if (null != this.jsonData) {
                return this.jsonData;  // Array
            }
            // 没有缓存从 cookie 取
            var jsonStr = this.getCookie(this.key);
            if ("" != jsonStr) {
                this.jsonData = this.parse2Json(jsonStr);
            }

            return this.jsonData;
        },
        delItem: function (title) {
            var jsonStr = this.getCookie(this.key);
            if ("" != jsonStr) {
                this.jsonData = this.parse2Json(jsonStr);
                // 排重
                for (var x = 0; x < this.jsonData.length; x++) {
                    if (title == this.jsonData[x]['title']) {
                        delete this.jsonData[x];
                    }
                }
                var json = '[';
                for (var item in this.jsonData) {
                    var list = this.jsonData[item];
                    json += this.initRow(list.title, list.link, list.other) + ',';
                }
                json = json.substring(0, jsonStr.lastIndexOf(','));
                json += ']';
                console.log(json);
                this.clearHistory();
                this.addCookie(this.key, json, this.cacheTime);
            }
        }
        // 清空历史
        , clearHistory: function () {
            this.deleteCookie(this.key);
            this.jsonData = null;
        }
    };
    window.History = History;
});