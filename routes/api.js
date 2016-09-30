/**
 * Created by lidy on 2016/8/6.
 */
var express = require('express');
var router = express.Router();

router.get('/tradeList', function (req, res, next) {
    var result = {};
    if (req.body.start) {
        result = {
            "count": parseInt(req.query.count),
            "start": parseInt(req.query.start),
            "total": 120,
            "data": [
                {"my": true, "money": "313.33", "content": "充值交易", "status": "充值成功", "time": "16年8月5日"},
                {"money": "413.23", "content": "提现交易", "status": "处理中", "time": "16年8月5日"},
                {"money": "532.63", "content": "投标交易", "status": "投标成功", "time": "16年8月5日"},
                {"money": "954.99", "content": "投标交易", "status": "领奖成功", "time": "16年8月5日"},
                {"money": "313.33", "content": "充值交易", "status": "充值成功", "time": "16年8月5日"},
                {"money": "413.23", "content": "提现交易", "status": "处理中", "time": "16年8月5日"},
                {"money": "532.63", "content": "投标交易", "status": "投标成功", "time": "16年8月5日"},
                {"money": "954.99", "content": "投标交易", "status": "领奖成功", "time": "16年8月5日"},
                {"money": "313.33", "content": "充值交易", "status": "充值成功", "time": "16年8月5日"},
                {"money": "413.23", "content": "提现交易", "status": "处理中", "time": "16年8月5日"}
            ]
        };
    } else {
        result = {
            "count": parseInt(req.query.count),
            "start": parseInt(req.query.start),
            "total": 30,
            "data": [
                {"my": true, "money": "313.33", "content": "充值交易", "status": "充值成功", "time": "16年8月5日"},
                {"money": "413.23", "content": "提现交易", "status": "处理中", "time": "16年8月5日"},
                {"money": "532.63", "content": "投标交易", "status": "投标成功", "time": "16年8月5日"},
                {"money": "954.99", "content": "投标交易", "status": "领奖成功", "time": "16年8月5日"},
                {"money": "313.33", "content": "充值交易", "status": "充值成功", "time": "16年8月5日"},
                {"money": "413.23", "content": "提现交易", "status": "处理中", "time": "16年8月5日"},
                {"money": "532.63", "content": "投标交易", "status": "投标成功", "time": "16年8月5日"},
                {"money": "954.99", "content": "投标交易", "status": "领奖成功", "time": "16年8月5日"},
                {"money": "313.33", "content": "充值交易", "status": "充值成功", "time": "16年8月5日"},
                {"money": "413.23", "content": "提现交易", "status": "处理中", "time": "16年8月5日"}
            ]
        };
    }
    res.json(result);
});
router.post('/upload', function (req, res, next) {
    var fs = require('fs');
    var formidable = require("formidable");
    var form = new formidable.IncomingForm();
    form.uploadDir = "./public/upload/temp/";//改变临时目录
    form.parse(req, function (error, fields, files) {
        for (var key in files) {
            var file = files[key];
            var fName = (new Date()).getTime();
            switch (file.type) {
                case "image/jpeg":
                    fName = fName + ".jpg";
                    break;
                case "image/png":
                    fName = fName + ".png";
                    break;
                default :
                    fName = fName + ".png";
                    break;
            }
            console.log(file.size);
            var uploadDir = "./public/upload/" + fName;
            fs.rename(file.path, uploadDir, function (err) {
                var result = new Object();
                if (err) {
                    result = {
                        "code": "500",
                        "message": "上传失败",
                        "data": ''
                    };
                } else {
                    result = {
                        "code": "200",
                        "message": "上传成功",
                        "data": '/assets/upload/' + fName
                    };
                }
                res.json(result);
            });
        }
    });
});
module.exports = router;