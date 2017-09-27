var express = require('express');
var router = express.Router();

var wechat = require('wechat');
var config = require('../config');

router.get('/', function(req, res, next) {
    // console.log(req.query)
    // console.log(req.query.echostr)
    res.send(req.query.echostr)

    handleWeChat(req, res);
});

router.post('/', function(req, res, next) {
    handleWeChat(req, res, next);
});

function handleWeChat(req, res, next) {
    console.log("start wechat")
    res.send("success")
    // console.log(req)
    wechat("wechat", function (req, res, next) {
        console.log("chat");
        // 微信输入信息都在req.weixin上 
        var message = req.weixin;
        console.log(message)
        res.reply('hehe');
        // if (message.FromUserName === 'diaosi') {
        //   // 回复屌丝(普通回复) 
        //   res.reply('hehe');
        // } else if (message.FromUserName === 'text') {
        //   //你也可以这样回复text类型的信息 
        //   res.reply({
        //     content: 'text object',
        //     type: 'text'
        //   });
        // }
    });
}

module.exports = router;