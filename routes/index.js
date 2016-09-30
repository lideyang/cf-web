var express = require('express');
var router = express.Router();
var pageType='home';
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('account/mobileLogin', { title: '众筹-首页',pageType:pageType });
});
router.get('/index', function(req, res, next) {
  res.render('index', { title: '众筹-首页',pageType:pageType });
});
router.get('/search', function(req, res, next) {
  res.render('search', { title: '众筹-搜索',pageType:pageType });
});
//搜索结果
router.get('/searchResult', function(req, res, next) {
  res.render('searchResult', { title: '众筹-搜索结果',pageType:pageType });
});
module.exports = router;
