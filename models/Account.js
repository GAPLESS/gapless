// node_modules
// -------------
var crypto = require('crypto'),
  nodemailer = require('nodemailer'),
  mongoose = require('mongoose');

// file modules
// -------------
var config = require('../config/mail');

// define Account's schema
var AccountSchema = new mongoose.Schema({

  email: { type: String, unique: true },

  password: { type: String },

  name: {
    first: { type: String },
    last: { type: String }
  },

  birthday: {
    year: { type: Number },
    month: { type: Number, min: 1, max: 12, required: false },
    day: { type: Number, min: 1, max: 31, required: false }
  },

  photoUrl: { type: String },

  biography: { type: String }

});

var User = mongoose.model('User', AccountSchema);

// relate to localhost db
mongoose.connect('mongodb://localhost/gapless');

// expose Account instance
var account = module.exports = new Account;

function Account () {}

Account.prototype.register = function (email, password, firstName, lastName) {
  
  var shaSum = crypto.createHash('sha256'),
    user = null;
  
  shaSum.update(password);
  user = new User({
    email: email, 
    name: {
      first: firstName,
      last: lastName
    },
    password: shaSum.digest('hex')
  });
  user.save(function (err) {
    if (err) {
      return console.log(err);
    };
    return console.log('User was created');
  });
};

Account.prototype.login = function (email, password, callback) {
  var shaSum = crypto.createHash('sha256');

  shaSum.update(password);
  User.findOne({email: email, password: shaSum.digest('hex')}, function (err, user) {
    callback(user !== null);
  });
};

// forgot password
Account.prototype.fp = function (email, rpUrl, callback) {
  User.findOne({email: email}, function (err, user) {
    if (err) {
      callback(false);
      return;
    }

    var smtpTransport = nodemailer.createTransport('SMTP', config);
    rpUrl += '?userId=' + user._id;
    smtpTransport.sendMail({
      from: '735806789@qq.com',
      to: user.email,
      subject: 'Gapless Password Request',
      html: 'Click here to reset your password: <a href="' + rpUrl
        + '" title="' + rpUrl + '">' + rpUrl + '</a>'
    }, function (err) {
      if (err) {
        callback(false);
      } else {
        callback(true);
      }
    });
  });
};

// reset password
Account.prototype.rp = function (userId, newpassword) {
  var shaSum = crypto.createHash('sha256');
  
  shaSum.update(newpassword);
  User.update({_id: userId}, {$set: {password: shaSum.digest('hex')}}, {upsert: false}, function () {
    console.log('Change password done for user ' + userId);
  });
};
