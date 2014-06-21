// nodejs modules
// -------------
var pth = require('path');

// node_modules
// -------------
var express = require('express');
var app = express();
var logger = require('morgan');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

// file modules
// -------------

// view engine setup
// -------------
app.set('views', pth.join(__dirname, 'views'));
app.set('view engine', 'jade');

// global settting
// -------------
app.use(favicon(pth.join(__dirname, 'favicon.ico')));
app.use(express.static(pth.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session({secret: 'gapless', session: new session.MemoryStore()}));

// routes 
// -------------
// index page with '/' route
var index = require('./routes/index');
app.use('/', index);


// expose app
// -------------
module.exports = app;
