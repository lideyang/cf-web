/**
 * Created by lidy on 2016/7/12.
 */
var express = require('express');
var router = express.Router();
var pageType='sort';
/* GET users listing. */
router.get('/index', function (req, res, next) {
    var sortList = [
        {
            name: '家具',
            img:''
        }, {
            name: '数码',
            img: ''
        }, {
            name: '服饰',
            img: ''
        }, {
            name: '旅游',
            img: ''
        }, {
            name: '食品',
            img: ''
        }, {
            name: '箱包',
            img: ''
        },
    ];
    res.render('sort/index', { title: '众筹-分类', pageType: pageType, sortList: sortList });
});
//list
router.post('/list', function (req, res, next) {
    result = {
        "code": "200",
        "message": "xxx",
        "data":[
            {
                id:1,
                name: '家具',
                img:'/assets/dist/images/game1.png'
            }, {
                id:1,
                name: '数码',
                img: '/assets/dist/images/game2.png'
            }, {
                id:1,
                name: '服饰',
                img: '/assets/dist/images/game1.png'
            }, {
                id:1,
                name: '旅游',
                img: '/assets/dist/images/game2.png'
            }, {
                id:1,
                name: '食品',
                img: '/assets/dist/images/game1.png'
            }, {
                id:1,
                name: '箱包',
                img: '/assets/dist/images/game2.png'
            },
        ]
    };
    res.json(result);
});
module.exports = router;