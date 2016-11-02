var express = require('express');
var cors = require('cors');
var model = require('./model/models');
var entity = require('./controller/entity');
var fields = require('./controller/fields');
var groups = require('./controller/groups');
var peoples = require('./controller/peoples');
var peoples_groups = require('./controller/peoples_groups');

var rule = require('./controller/rule');
var singleconditions = require('./controller/singleconditions');
var nestedconditions = require('./controller/nestedconditions');
var customersegments = require('./controller/customersegments');


var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

app.use(cors());

// app.use(function(req, res, next){
//   res.header('Access-Control-Allow-Origin', "http://localhost:3000");
//   res.header('Access-Control-Allow-method', 'GET, PUT, POST, DELETE');
//   res.header('Access-Control-Allow-Headers', 'content-Type');
//   next();
// });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/entity', entity);
app.use('/fields', fields);

app.use('/groups', groups);
app.use('/peoples', peoples);
app.use('/peoples_groups', peoples_groups);

app.use('/rule', rule);
app.use('/singleconditions', singleconditions);
app.use('/nestedconditions', nestedconditions);
app.use('/customersegments', customersegments);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
