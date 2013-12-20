
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var engine = require('ejs-locals');
var platform = require('platform');

// modules
var teams = require('./routes/team');
var events = require('./routes/event');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());

// user agent detection
app.use(function(req, res, next) {
    //set user agent info to locals
    var ua = req.headers['user-agent'];
    res.locals.browserInfo = platform.parse(ua);
    if(!res.locals.browserInfo.product) {
        res.locals.browserInfo.product = "";
    }
    // set host to locals
    res.locals.host=req.host;
    next();
});
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// routes
app.get('/', routes.index);
app.get('/teams', teams.index);
app.get('/teams/add/:name', teams.add);
app.get('/teams/remove/:id', teams.remove);
app.get('/events', events.index);
app.get('/events/add/:name', events.add);
app.get('/events/edit/:id', events.edit);
app.get('/events/remove/:id', events.remove);

// start server
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
