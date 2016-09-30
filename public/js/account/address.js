define(function (require, exports, module) {
    var $ = require('jquery');
    module.exports = {
        init: function () {
            $("#addressContainer").on('click', '.del', function (event) {
            	var addrId = $(event.target).data('addr-id');
                layer.confirm('您确认要删除这个收货地址吗？', {
                    icon: 3
                }, function () {
                    $.ajax({
                        url: basePath + '/addr/delete',
                        mockUrl: '/account/login',
                        type: "POST",
                        data: {
                        	addrId:addrId
                        },
                        success: function (data) {
                            if (data.code == "200") {
                                layer.msg(data.message, { icon: 5 });
                                location.reload();
                            } else {
                                layer.msg(data.message, { icon: 2 })
                            }
                        },
                        error: function (a, b, c) {
                            //alert("xx");
                        }
                    });
                }, function () {
                    layer.closeAll();
                });
            });
            //设置收货地址
            $("#addressContainer").on("click", '.set-add', function (event) {
            	var target = $(event.target);
                $.ajax({
                    url: basePath + '/addr/setDefault',
                    mockUrl: '/account/login',
                    type: "POST",
                    data: {
                        addrId: target.val()
                    },
                    success: function (data) {
                        if (data.code == "200") {
                            location.href = data.data.gto;
                        } else {
                            layer.msg(data.message, { icon: 2 })
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