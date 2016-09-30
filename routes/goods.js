/**
 * Created by lidy on 2016/7/14.
 */
var express = require('express');
var router = express.Router();
var pageType='goods';
router.get('/detail', function(req, res, next) {
    res.render('goods/detail', { title: '众筹-商品详情',pageType:pageType });
});
router.get('/orderDetail', function (req, res, next) {
    res.render('goods/orderDetail', { title: '众筹-商品筹', pageType: pageType });
});
router.get('/gameDetail', function (req, res, next) {
    res.render('goods/gameDetail', { title: '众筹-游戏筹', pageType: pageType });
});
router.get('/chooseGame', function(req, res, next) {
    res.render('goods/chooseGame', { title: '众筹-选择游戏',pageType:pageType });
});
router.get('/chooseGoods', function (req, res, next) {
    res.render('goods/chooseGoods', { title: '众筹-选择商品', pageType: pageType });
});
router.get('/award', function (req, res, next) {
    res.render('goods/award', { title: '众筹-领奖', pageType: pageType });
});
router.get('/directBuy', function (req, res, next) {
    res.render('goods/directBuy', { title: '众筹-直接购买', pageType: pageType });
});
router.get('/awardSuccess', function (req, res, next) {
    res.render('goods/awardSuccess', { title: '众筹-领奖成功', pageType: pageType });
});
router.get('/directBuySuccess', function (req, res, next) {
    res.render('goods/directBuySuccess', { title: '众筹-购买成功', pageType: pageType });
});
router.get('/otherPay', function (req, res, next) {
    res.render('goods/otherPay', { title: '众筹-支付', pageType: pageType });
});
router.get('/record', function (req, res, next) {
    res.render('goods/record', { title: '众筹-参与记录', pageType: pageType });
});
router.get('/lucky', function (req, res, next) {
    res.render('goods/lucky', { title: '众筹-幸运数字', pageType: pageType });
});
router.get('/luckyDetail', function (req, res, next) {
    res.render('goods/luckyDetail', { title: '众筹-幸运数字详情', pageType: pageType });
});
module.exports = router;