var express    = require('express')
  , cfg        = require('./conf/config')
  , handler    = require('./handler')
  , app        = express.createServer()
  ;

app.configure( function(){
  app.use(express.bodyParser());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

// request.body for 
app.get('/', function(req, res){
  res.sendfile('public/splash.html');
});
app.get('/lobby', function(req, res){
  res.sendfile('public/lobby.html');
});

app.get('/accountInfo', function(req, res){
  var jsonRes = {};
  if(req.session && req.session.authenticated){
    jsonRes.accountCreated = true;
  }
  res.send(JSON.stringify(jsonRes));
});

app.listen(cfg.www.port, function(err) {
  if (err) { throw err; }
  console.log( '{"www": "ok", "host": "%s", "port": "%d", "env": "%s"}', 
    cfg.www.host, cfg.www.port, app.settings.env);
});

process.on('uncaughtException', function(err) {
  console.log(JSON.stringify(err));
});
