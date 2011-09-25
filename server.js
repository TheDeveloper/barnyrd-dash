var express    = require('express')
  , cfg        = require('./conf/config').www
  , handler    = require('./handler')
  , app        = express.createServer()
  ;

app.configure( function(){
  app.use(express.bodyParser());
  app.use(app.router);
  app.use(express.cookieParser());
  app.use(express.session({ secret: cfg.secret }));
  app.use(express.static(__dirname + '/public'));
});

app.get('/', function(req, res){
  res.sendfile('public/splash.html');
});
app.get('/lobby', function(req, res){
  res.sendfile('public/lobby.html');
});

app.get('/account_info', function(req, res){
  var jsonRes = {};
  if(req.session && req.session.authenticated){
    jsonRes.accountCreated = true;
  }
  res.send(JSON.stringify(jsonRes));
});

app.listen(cfg.port, function(err) {
  if (err) { throw err; }
  console.log( '{"www": "ok", "host": "%s", "port": "%d", "env": "%s"}', 
    cfg.host, cfg.port, app.settings.env);
});

process.on('uncaughtException', function(err) {
  console.log(JSON.stringify(err));
});
