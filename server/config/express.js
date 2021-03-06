/**
 * Express configuration
 */

'use strict';

var express = require('express');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var compression = require('compression');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var errorHandler = require('errorhandler');
var path = require('path');
var config = require('./environment');
var passport = require('passport');
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);
var mongoose = require('mongoose');


module.exports = function(app) {
  var env = app.get('env');

  app.set('views', config.root + '/server/views');
  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');
  app.use(compression());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(cookieParser());
  app.use(passport.initialize());


  /*app.route('*').all(function(req, res, next){
    var ref$, form;
    if ((ref$ = req.method.toLowerCase()) === 'post' || ref$ === 'put' || ref$ === 'patch' || ref$ === 'delete') {
      form = new formidable.IncomingForm();
      form.hash = 'md5';
      form.multiples = false;
      form.parse(req, function(err, fields, files){
        if (err != null) {
          console.error('formidable:parse ' + err);
          console.log(fields)
          return res.status(500).send('upload error.');
        } else {
          req.fields = fields;
          req.files = files;
          return console.log('parsed.');
        }
      });
      form.on('end', function(){
        return next();
      });
      form.on('aborted', function(){
        console.log('Se aborto la conexion')
        return next();
      });

    } else {
      return next();
    }
  });*/

  // Persist sessions with mongoStore
  // We need to enable sessions for passport twitter because its an oauth 1.0 strategy
  app.use(session({
    secret: config.secrets.session,
    resave: true,
    saveUninitialized: true,
    store: new mongoStore({
      mongooseConnection: mongoose.connection,
      db: 'valid-mail'
    })
  }));
  
  if ('production' === env) {
    app.use(favicon(path.join(config.root, 'public', 'favicon.ico')));
    app.use(express.static(path.join(config.root, 'public')));
    app.set('appPath', path.join(config.root, 'public'));
    app.use(morgan('dev'));
  }

  if ('development' === env || 'test' === env) {
    //app.use(require('connect-livereload')());
    app.use(express.static(path.join(config.root, '.tmp')));
    app.use(express.static(path.join(config.root, 'client')));
    app.set('appPath', path.join(config.root, 'client'));
    app.use(morgan('dev'));
    app.use(errorHandler()); // Error handler - has to be last
  }
};