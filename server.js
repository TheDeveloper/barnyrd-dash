var express    = require('express')
  , cfg        = require('./conf/config')
  , handler    = require('./handler')
  , app        = express.createServer()
  , mongoose   = require('mongoose')
  , mongo      = require('mongodb');
  ;

app.configure( function(){
  app.use(express.bodyParser());
  app.use(app.router);
  app.use(express.cookieParser());
  app.use(express.session({ secret: cfg.www.secret }));
  app.use(express.static(__dirname + '/public'));
});

app.get('/', function(req, res){
  res.sendfile('public/splash.html');
});
app.get('/lobby', function(req, res){
  res.sendfile('public/lobby.html');
});
app.get('/pen', function(req, res){
  res.sendfile('public/pen.html');
});

app.get('/account_info', function(req, res){
  var jsonRes = {};
  if(req.session && req.session.authenticated){
    
  }
  var server = new mongo.Server(cfg.mongo.host, cfg.mongo.port, {});
    var client = new mongo.Db(cfg.mongo.database, server, {native_parser: true});
    jsonRes.accountCreated = true;
    client.open(function(err, db){
	if(err){
	    console.log(err);
	}
	db.authenticate(cfg.mongo.username, cfg.mongo.password, function(err, success){
	    console.log(err);
	    db.collection('test', function(err, collection){
		console.log(err);
	       collection.insert({'test' : 1}); 
	    });
	});
    });
  res.send(JSON.stringify(jsonRes));
});

app.post('/create_player', function(req, res){
  var playerName = req.param('name');
  var character = req.param('character');
  console.log(playerName);
});

// Pusher auth

var Pusher = require('./node-pusher');
var pusher = new Pusher({
  appId: '8771',
  key: 'a553813b71932b8355e4',
  secret: '029614202093c5ccba8d'
});

app.post('/pusher/auth', function(req, res){
  var channelData = {
    user_id: Math.floor(Math.random()*100), 
    user_info: {name: 'Mr. Pusher', animal: 'horse'}
  }
  res.send(pusher.auth(req.param('socket_id'), req.param('channel_name'), channelData));
});

// Server

app.listen(cfg.www.port, function(err) {
  if (err) { throw err; }
  console.log( '{"www": "ok", "host": "%s", "port": "%d", "env": "%s"}', 
    cfg.www.host, cfg.www.port, app.settings.env);
});

process.on('uncaughtException', function(err) {
  console.log(JSON.stringify(err));
});
