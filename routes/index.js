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

  Account.login(email, password, function (user) {
    if (!user) {
      res.send({status: '401', msg: '你未注册'});
      return;
    }

    req.session.userId = user._id;
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

// 
router.get('/u/:id', function(req, res) {
  var userId = req.params.id == 'me'
                     ? req.session.userId
                     : req.params.id;
  Account.findById(userId, function(user) {
    res.send(user);
  });
});

//
router.get('/u/:id/activity', function (req, res) {
  var userId = req.params.id == 'me'
                     ? req.session.userId
                     : req.params.id;
  Account.findById(userId, function(user) {
    res.send(user.activity);
  });
});

//
router.post('/u/:id/status', function (req, res) {
  var userId = req.params.id == 'me'
                     ? req.session.userId
                     : req.params.id;
  Account.findById(userId, function(user) {
    var Status = {
      name: user.name,
      status: req.param('status', '')
    };
    (user.status || (user.status = [])).push(Status);
    (user.activity || (user.activity = [])).push(Status);
    user.save(function (err) {
      if (err) {
        console.log('Error saving user: ' + err);
      }
      console.log();
    });

    res.send({status: 200, result: user});
  });
});

// get contacts of current user
// -------------
router.get('/u/:id/contacts', function (req, res) {
  var userId = req.params.id === 'me' ? req.session.userId : req.params.id;
  Account.findById(userId, function (user) {
    res.send(user.contacts);
  });
});

// search contacts
// -------------
router.post('/contacts/find', function (req, res) {
  var searchStr = req.param('searchStr', null);

  if ( null == searchStr ) {
    res.send({status: 400});
    return;
  }

  Account.findByString(searchStr, function (err, users) {
    if (err || users.length == 0) {
      res.send({status: 404});
    } else {
      res.send({status: 200, result: users});
    }
  });
});

// /accounts/:id/contact
// -------------
router.post('/accounts/:id/contact', function (req, res) {
  var userId = req.params.id == 'me'
                     ? req.session.userId
                     : req.params.id;
  var contactId = req.param('contactId', null);

  // Missing contactId, don't bother going any further
  if ( null == contactId ) {
    res.send({status: 400});
    return;
  }

  Account.findById(userId, function(user) {
    if ( user ) {
      Account.findById(contactId, function(contact) {
        Account.addContact(user, contact);
        Account.addContact(contact, userId);
        user.save();
      });
    }
  });

  res.send({status: 200});
});

router.delete('/accounts/:id/contact', function (req, res) {
  var userId = req.params.id == 'me'
                     ? req.session.userId
                     : req.params.id;
  var contactId = req.param('contactId', null);
  if ( null == contactId ) {
    res.send(400);
    return;
  }

  Account.findById(userId, function(user) {
    if ( !user ) return;
    Account.findById(contactId, function(contact, err) {
      if ( !contact ) return;
      Account.removeContact(user, contactId);
      Account.removeContact(contact, userId);
    });
  });
  res.send({status: 200});
});

// expose router
// -------------
module.exports = router;
