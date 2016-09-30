/**
 * Created by lidy on 2016/7/12.
 */
var express = require('express');
var router = express.Router();
var pageType='community';
/* GET users listing. */
router.get('/index', function(req, res, next) {
    res.render('community/index', { title: '众筹-社区',pageType:pageType });
});
router.get('/list', function(req, res, next) {
    res.render('community/list', { title: '众筹-社区',pageType:pageType });
});
router.get('/detail', function(req, res, next) {
    res.render('community/detail', { title: '众筹-帖子详情',pageType:pageType });
});
module.exports = router;