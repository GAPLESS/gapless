var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'GAPLESS-首页' });
});

// check whether user is logined or not.
router.get('/u/auth', function (req, res) {
  if (req.session.loggedIn) {
    res.send({status: 200, msg: '你已经登录成功了'});
  } else {
    res.send({status: 401, msg: '登录失败，可能你没有权限'});
  }
});

module.exports = router;
