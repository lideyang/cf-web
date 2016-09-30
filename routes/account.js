/**
 * Created by lidy on 2016/7/12.
 */
var express = require('express');
var router = express.Router();
var http = require('http');
var pageType = 'account';
/* GET users listing. */
router.get('/index', function (req, res, next) {
    res.render('account/index', {title: '众筹-我的信息', pageType: pageType});
});
//router.post('/login', function (req, res, next) {
//    // var userName=req.body.userName;
//    // var userPwd=req.body.userPwd;
//    // var reqData = {
//    //     method: 'kmc.member.login',
//    //     v: '1.0.0',
//    //     loginId:userName,
//    //     pwd:userPwd
//    // };
//    // reqData = require('querystring').stringify(reqData);
//    // var options = {
//    //     host: "172.16.133.166",
//    //     port: 8083,
//    //     path: '172.16.133.166:8083/gw/router',
//    //     method: 'POST',
//    //     headers: {
//    //         'Content-Type': 'application/x-www-form-urlencoded',
//    //         'Content-Length': reqData.length
//    //     }
//    // };
//    // var post_req = http.request(options, function (response) {
//    //     var responseText = [];
//    //     var size = 0;
//    //     response.on('data', function (data) {
//    //         responseText.push(data);
//    //         size += data.length;
//    //         //res.json(responseText);
//    //     });
//    //     response.on('end', function () {
//    //         // Buffer 是node.js 自带的库，直接使用
//    //         responseText = Buffer.concat(responseText, size);
//    //         //callback(responseText);
//    //         res.set('Content-Type', 'application/json;charset=UTF-8');
//    //         res.send(200,responseText);
//    //     });
//    // });
//    //
//    // // post the data
//    // post_req.write(reqData);
//    // post_req.end();
//    res.render('account/settingPwd', { title: '众筹-设置密码',pageType:pageType });
//});
//登录
router.get('/login', function (req, res, next) {
    res.render('account/login', {title: '众筹-登录', pageType: pageType});
});
//手机登录
router.get('/mobileLogin', function (req, res, next) {
    res.render('account/mobileLogin', {title: '众筹-手机登录', pageType: pageType});
});
//收货地址
router.get('/address', function (req, res, next) {
    res.render('account/address', {title: '众筹-收货地址', pageType: pageType});
});
//收货地址编辑添加
router.get('/addressEdit', function (req, res, next) {
    res.render('account/addressEdit', {title: '众筹-添加收货地址', pageType: pageType});
});
router.post('/mobileLogin', function (req, res, next) {
    var result = {};
    if (req.body.loginId != '13000000000' && req.body.code != '111111') {
        result = {
            "code": "500",
            "message": "验证码不正确",
            "data": {
                "gto": "/index"
            }
        };
    } else {
        result = {
            "code": "200",
            "message": "xxx",
            "data": {
                "gto": "/index"
            }
        };
    }
    res.json(result);
});
router.post('/bindMobile', function (req, res, next) {
    var result = {};
    if (req.body.loginId != '13000000000' && req.body.code != '111111') {
        result = {
            "code": "500",
            "message": "验证码不正确",
            "data": {
                "gto": "/index"
            }
        };
    } else {
        result = {
            "code": "200",
            "message": "xxx",
            "data": {
                "gto": "/account/settingPwd"
            }
        };
    }
    res.json(result);
});
router.post('/login', function (req, res, next) {
    var result = {};
    if (req.body.loginId != '13000000000' && req.body.password != '111111') {
        result = {
            "code": "500",
            "message": "验证码不正确",
            "data": {
                "gto": "/index"
            }
        };
    } else {
        result = {
            "code": "200",
            "message": "xxx",
            "data": {
                "gto": "/index"
            }
        };
    }
    res.json(result);
});
router.post('/all', function (req, res, next) {
    var callback = req.body.callback;
    var result = {
        "code": "200",
        "message": "xxx",
        "data": {
            "gto": callback
        }
    };
    res.json(result);
});
router.post('/settingPwd', function (req, res, next) {
    var result = {
        "code": "200",
        "message": "xxx",
        "data": {
            "gto": "/users/detail"
        }
    };
    res.json(result);
});
//发送验证码
router.post('/phone', function (req, res, next) {
    var result = {};
    if (req.body.checkCode == '000000') {
        result = {
            "code": "500",
            "message": "验证码不正确",
            "data": {
                "gto": "/index"
            }
        };
    } else {
        result = {
            "code": "200",
            "message": "xxx",
            "data": {
                "gto": "/index"
            }
        };
    }
    res.json(result);
});
//设置登录密码
router.get('/settingPwd', function (req, res, next) {
    res.render('account/settingPwd', {title: '众筹-设置密码', pageType: pageType});
});
//忘记登录密码
router.get('/forgetPwd', function (req, res, next) {
    res.render('account/forgetPwd', {title: '众筹-忘记密码', pageType: pageType});
});
router.get('/api', function (req, res, next) {
    var result = {
        "code": "200",
        "message": "xxx",
        "data": [
            {
                name: '家具',
                img:'images/game1.png'
            }, {
                name: '数码',
                img: 'images/game1.png'
            }, {
                name: '服饰',
                img: 'images/game1.png'
            }, {
                name: '旅游',
                img: 'images/game1.png'
            }, {
                name: '食品',
                img: 'images/game1.png'
            }, {
                name: '箱包',
                img: 'images/game1.png'
            }
        ]
    };
    res.json(result);
});
module.exports = router;