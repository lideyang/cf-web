/**
 * Created by lidy on 2016/7/12.
 */
define(function (require, exports, module) {
    var $ = require('jquery');
    module.exports = {
        inputValueClear: function (obj) {
            $(obj).on('keyup', function () {
                var $self = $(this);
                var $icon = $self.parent().find('.am-icon-times-circle');
                $icon.on('click', function () {
                    $self.val('');
                    $(this).removeClass('text-info').addClass('text-miss');
                })
                if ($self.val() != '') {
                    $icon.removeClass('text-miss').addClass('text-info');
                } else {
                    $icon.removeClass('text-info').addClass('text-miss');
                }
            })
        },
        timer: function (obj) {
            $(obj).each(function () {
                var $this = $(this);
                //var endDate = new Date($this.text());
                var dateArr = $this.text().split(':');
                var ts = 60 * 60 * 24 * parseInt(dateArr[0]) + 60 * 60 * parseInt(dateArr[1]) + 60 * parseInt(dateArr[2]) + parseInt(dateArr[3]);

                function checkTime(i) {
                    if (i < 10) {
                        i = "0" + i;
                    }
                    return i;
                }

                var Tid = setInterval(function () {
                    // var ts = endDate - (new Date());//计算剩余的毫秒数
                    ts--;
                    if (ts > 0) {
                        var dd = parseInt(ts / 60 / 60 / 24, 10);//计算剩余的天数
                        var hh = parseInt(ts / 60 / 60 % 24, 10);//计算剩余的小时数
                        var mm = parseInt(ts / 60 % 60, 10);//计算剩余的分钟数
                        var ss = parseInt(ts % 60, 10);//计算剩余的秒数
                        dd = checkTime(dd);
                        hh = checkTime(hh);
                        mm = checkTime(mm);
                        ss = checkTime(ss);
                        $this.text(dd + ":" + hh + ":" + mm + ":" + ss);
                        $this.css('visibility', 'visible');
                    } else {
                        clearInterval(Tid);
                    }
                }, 1000);

            });

        },
        rangeInput: function (money, min, max) {
            var $input = $("#comfirmAmount");
            $input.on("keyup", function () {
                var num = parseInt($(this).val());
                if (num < min) {
                    $(this).val(min);
                } else if (num > max) {
                    $(this).val(max);
                }
                $("#amountMoneyTxt").text(parseInt(($(this).val()) * parseFloat(money)).toFixed(2));
            })
            $("#rangeBoxer").on("click", 'a.min', function () {
                var num = parseInt($input.val());
                if (num > 0 && num > parseInt(min)) {
                    $input.val(num - 1);
                    $("#amountMoneyTxt").text(((num - 1) * parseFloat(money)).toFixed(2));
                }
            })
            $("#rangeBoxer").on("click", 'a.max', function () {
                var num = parseInt($input.val());
                if (num < parseInt(max)) {
                    $input.val(num + 1);
                    $("#amountMoneyTxt").text(((num + 1) * parseFloat(money)).toFixed(2));
                }
            })
        },
        fixMoney: function (money, n, realObj) { //s:传入的float数字 ，n:希望返回小数点几位
            var reg = /^[0-9]+(\.[0-9]{1,2})?$/;
            var a = $(money).val();
            var s = a.replace(/,/g, "");
            try {
                if ('' == a || a == null || !reg.test(s) || 0 == a) {
                    s = 0;
                    if (typeof (realObj) != 'undefined') {
                        $(realObj).val('0');
                        $(money).val('0');
                    }
                    return;
                }
                n = n > 0 && n <= 20 ? n : 2;
                s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
                var l = s.split(".")[0].split("").reverse(),
                    r = s.split(".")[1];
                t = "";
                for (i = 0; i < l.length; i++) {
                    t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
                }
                var val = t.split("").reverse().join("") + "." + r;
            } catch (e) {
                val = 0;
                s = 0;
            }
            if (typeof (realObj) != 'undefined' && realObj != null && val != '0.00') {
                // var name = obj.attr("name");
                $(realObj).val(s.replace(/,/g, ""));
                $(money).val(val);
            }
            return val;
        },
        moneyFixInput: function (obj, moneyObj) {
            var obj = obj || '#moneyTxt';
            $(obj).on({
                blur: function () {
                    var moneyObj = moneyObj || '#realMoney';
                    module.exports.fixMoney(obj, 2, moneyObj);
                    //var validator = $("#creditPayForm").validate();
                    if (moneyObj) {
                        var $form = $(this).parents('form').first();
                        if (!$form.validate().element(moneyObj)) {
                            //$("#amtB").val('');
                        }
                    }
                }
            })
        },
        eventsList: function (element, options) {
            require('amazeUI');
            var Handlebars = require('handlebars.min');
            var $main = $('#wrapper');
            var $list = $main.find('#events-list');
            var $pullDown = $main.find('#pull-down');
            var $pullDownLabel = $main.find('#pull-down-label');
            var $pullUp = $main.find('#pull-up');
            var topOffset = -$pullDown.outerHeight();

            this.compiler = Handlebars.compile($('#tpi-list-item').html());
            this.prev = this.next = this.start = options.params.start;
            this.total = null;

            this.getURL = function (params) {
                var queries = ['callback=?'];
                for (var key in  params) {
                    if (key !== 'start') {
                        queries.push(key + '=' + params[key]);
                    }
                }
                queries.push('start=');
                return options.api + '?' + queries.join('&');
            };

            this.renderList = function (start, type) {
                var _this = this;
                var $el = $pullDown;

                if (type === 'load') {
                    $el = $pullUp;
                }
                $.ajax({
                    url: this.URL + start,
                    success: function (data) {
                        console.log(data);
                        _this.total = data.total;
                        var html = _this.compiler(data.data);
                        if (type === 'refresh') {
                            $list.children('li').first().before(html);
                        } else if (type === 'load') {
                            $list.append(html);
                        } else {
                            $list.html(html);
                        }
                        // refresh iScroll
                        setTimeout(function () {
                            _this.iScroll.refresh();
                        }, 100);
                    },
                    error: function () {
                        console.log('Error...')
                    },
                    complete: function () {
                        _this.resetLoading($el);
                        if (type !== 'load') {
                            _this.iScroll.scrollTo(0, topOffset, 800, $.AMUI.iScroll.utils.circular);
                        }
                    }
                });
            };

            this.setLoading = function ($el) {
                $el.addClass('loading');
            };

            this.resetLoading = function ($el) {
                $el.removeClass('loading');
            };

            this.init = function () {
                var myScroll = this.iScroll = new $.AMUI.iScroll('#wrapper', {
                    probeType: 3,
                    mouseWheel: true
                });
                // myScroll.scrollTo(0, topOffset);
                var _this = this;
                var pullFormTop = false;
                var pullStart;

                this.URL = this.getURL(options.params);
                this.renderList(options.params.start);

                myScroll.on('scrollStart', function () {
                    if (this.y >= topOffset) {
                        pullFormTop = true;
                    }

                    pullStart = this.y;
                    // console.log(this);
                });

                myScroll.on('scrollEnd', function () {
                    if (pullFormTop && this.directionY === -1) {
                        _this.handlePullDown();
                    }
                    pullFormTop = false;

                    // pull up to load more
                    if (pullStart === this.y && (this.directionY === 1)) {
                        _this.handlePullUp();
                    }
                });
            };

            this.handlePullDown = function () {
                console.log('handle pull down');
                var _this = this;
                if (this.prev > 0) {
                    this.setLoading($pullDown);
                    this.prev -= options.params.count;
                    this.renderList(this.prev, 'refresh');
                } else {
                    console.log('别刷了，没有了');
                    _this.iScroll.scrollTo(0, -45, 800, $.AMUI.iScroll.utils.circular);
                }
            };

            this.handlePullUp = function () {
                console.log('handle pull up');
                if (this.next < this.total) {
                    this.setLoading($pullUp);
                    this.next += options.params.count;
                    this.renderList(this.next, 'load');
                } else {
                    console.log(this.next);
                    // this.iScroll.scrollTo(0, topOffset);
                    console.log('已到最后');
                }
            }

            return this;
        },
        handelSelectFile: function (ev, url) {
            var file = ev.target.files[0];
            this.type = file.type
            // 如果没有文件类型，则通过后缀名判断（解决微信及360浏览器无法获取图片类型问题）
            if (!this.type) {
                this.type = this.mime[file.name.match(/\.([^\.]+)$/i)[1]];
            }

            if (!/image.(png|jpg|jpeg|bmp)/.test(this.type)) {
                alert('选择的文件类型不是图片');
                return;
            }

            if (file.size > 1*1024*1024) {
                alert('选择文件大于1M，请重新选择');
                return;
            }

            this.fileName = file.name;
            this.fileSize = file.size;
            this.fileType = this.type;
            this.fileDate = file.lastModifiedDate;

            var reader = new FileReader();
            var _this = this;

            function tmpLoad() {
                // 头不带图片格式，需填写格式
                var re = /^data:base64,/;
                var ret = this.result + '';

                if (re.test(ret)) ret = ret.replace(re, 'data:' + _this.mime[_this.fileType] + ';base64,');
                var form_data = new FormData();
                form_data.append("file", file);
                $.ajax({
                    url: url,
                    data: form_data,
                    type: 'post',
                    processData: false,  // 告诉jQuery不要去处理发送的数据
                    contentType: false,
                    success: function (data) {
                        if (data.code == '200') {
                            $("#uploadPic").attr('src', data.data);
                        } else {
                            layer.msg(data.message, {icon: 5})
                        }
                    }
                })
            }

            reader.onload = tmpLoad;

            reader.readAsDataURL(file);

            return false;
        }
    }
});