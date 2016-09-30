var express = require('express');
var router = express.Router();
var pageType='users';

/* GET users listing. */
router.get('/index', function(req, res, next) {
  res.render('users/index', { title: '众筹-我的信息',pageType:pageType });
});
//暂存箱
router.get('/temporaryBoxer', function(req, res, next) {
  res.render('users/temporaryBoxer', { title: '众筹-暂存箱',pageType:pageType });
});
//确认订单
router.get('/confirmOrder', function (req, res, next) {
    res.render('users/confirmOrder', { title: '众筹-确认订单', pageType: pageType });
});
//帐号详情
router.get('/detail', function (req, res, next) {
    res.render('users/detail', { title: '众筹-账号详情', pageType: pageType });
});
//绑定手机号
router.get('/bindMobile', function (req, res, next) {
    res.render('users/bindMobile', { title: '众筹-绑定手机', pageType: pageType });
});
//余额
router.get('/balance', function (req, res, next) {
    res.render('users/balance', { title: '众筹-账户余额', pageType: pageType });
});
//交易记录
router.get('/tradeRecord', function (req, res, next) {
    res.render('users/tradeRecord', { title: '众筹-交易记录', pageType: pageType });
});
//我的投标
router.get('/myBid', function (req, res, next) {
    var date=new Date();
    date.setDate(date.getDate()+1);
    res.render('users/myBid', { title: '众筹-我的投标', pageType: pageType,yesDate:date });
});
//我的收藏
router.get('/myCollection', function (req, res, next) {
    var date=new Date();
    date.setDate(date.getDate()+1);
    res.render('users/myCollection', { title: '众筹-我的收藏', pageType: pageType,yesDate:date });
});
//我的订单
router.get('/myOrder', function (req, res, next) {
    res.render('users/myOrder', { title: '众筹-我的订单', pageType: pageType });
});
//订单详情
router.get('/orderDetail', function (req, res, next) {
    res.render('users/orderDetail', { title: '众筹-订单详情', pageType: pageType });
});
//设置
router.get('/setting', function (req, res, next) {
    res.render('users/setting', { title: '众筹-设置', pageType: pageType });
});
//充值
router.get('/recharge', function (req, res, next) {
    res.render('users/recharge', { title: '众筹-充值', pageType: pageType });
});
router.get('/rechargeSuccess', function (req, res, next) {
    res.render('users/rechargeSuccess', { title: '众筹-充值成功', pageType: pageType });
});
//提现
router.get('/withdraw', function (req, res, next) {
    res.render('users/withdraw', { title: '众筹-提现', pageType: pageType });
});
router.get('/withdrawSuccess', function (req, res, next) {
    res.render('users/withdrawSuccess', { title: '众筹-提现成功', pageType: pageType });
});
//添加银行卡
router.get('/addBankCard', function (req, res, next) {
    res.render('users/addBankCard', { title: '众筹-添加银行卡', pageType: pageType });
});
//上传头像
router.get('/headerUpload', function (req, res, next) {
    res.render('users/headerUpload', { title: '众筹-上传头像', pageType: pageType });
});
//榜单
router.get('/list', function (req, res, next) {
    res.render('list/index', { title: '众筹-榜单', pageType: pageType });
});
module.exports = router;