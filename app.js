var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var partials = require('express-partials');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var routes = require('./routes/index');
var users = require('./routes/users');
var sort = require('./routes/sort');
var community = require('./routes/community');
var account = require('./routes/account');
var goods = require('./routes/goods');
var api = require('./routes/api');
// var account = require('./routes/users/account');
// var adminContent = require('./routes/users/content');
// var tradeQuery = require('./routes/tradeQuery');
var app = express();
var router = express.Router();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(partials());
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb '}));
app.use(bodyParser.urlencoded({ limit: '50mb ',extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/assets', express.static('public'));
// app.use(express.static(path.join(__dirname, 'static')));
// app.use('/static', express.static('static'));
app.use('/', routes);
app.use('/users', users);
app.use('/sort', sort);
app.use('/community', community);
app.use('/account', account);
app.use('/goods', goods);
app.use('/api', api);
//app.use(express.errorHandler({ showStack: true, dumpExceptions: true }));
// catch 404 and forward to error handler
//app.use(function(req, res, next) {
//  var err = new Error('Not Found');
//  err.status = 404;
//  next(err);
//});
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.use(methodOverride());
app.use(function(err, req, res, next) {
  // 业务逻辑
  console.error(err.stack);
  next(err);
});
// app.use('*',function(req, res, next) {
//   // 业务逻辑
//   req.send('3123123');
//   next(err);
// });
app.listen(3000);
module.exports = app;