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

app.listen(cfg.www.port, function(err) {
  if (err) { throw err; }
  console.log( '{"www": "ok", "host": "%s", "port": "%d", "env": "%s"}', 
    cfg.www.host, cfg.www.port, app.settings.env);
});

process.on('uncaughtException', function(err) {
  console.log(JSON.stringify(err));
});
