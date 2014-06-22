// node_modules
// -------------
var express = require('express');
var router = express.Router();

// file modules
// -------------
var Account = require('../models/Account');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'GAPLESS-首页' });
});

// check whether user is logined or not.
router.get('/auth', function (req, res) {
  if (req.session && req.session.loggedIn) {
    res.send({status: 200, msg: '你已经登录成功过了'});
  } else {
    res.send({status: 401, msg: '登录失败，可能你没有权限'});
  }
});

// login 
router.post('/login', function (req, res) {
  var email = req.param('email'),
    password = req.param('password');

  Account.login(email, password, function (success) {
    if (!success) {
      res.send({status: '401', msg: '你未注册'});
      return;
    }

    req.session.loggedIn = true;
    res.send({status: 200, msg: '登录成功'});
  });
  
});

// register
router.post('/register', function (req, res) {
  var email = req.param('email'),
    password = req.param('password'),
    firstName = req.param('firstName'),
    lastName = req.param('lastName');
  Account.register(email, password, firstName, lastName);
  res.send({status: 200, msg: '注册成功'});
});

// forgot password
router.post('/fp', function (req, res) {
  var hostname = req.headers.host;
  var email = req.param('email');

  // reset password url
  var rpUrl = 'http://' + hostname + '/rp';
  Account.fp(email, rpUrl, function (success) {
    if (success) {
      res.send({status: 200, msg: '重置密码成功'});
    }
  });
});

// reset password page
router.get('/rp', function (req, res) {
  var userId = req.param('userId', '');
  res.render('rp', {userId: userId});
});

// reset password submit
router.post('/rp', function (req, res) {
  var userId = req.param('userId', '');
  var password = req.param('password', '');
  if ( null != userId && null != password ) {
    Account.rp(userId, password);
  }
  res.render('rpSuccess');
});


// expose router
// -------------
module.exports = router;
