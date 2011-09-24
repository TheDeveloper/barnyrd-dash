var express    = require('express')
  , cfg        = require('./conf/config')
  , handler    = require('./handler')
  , app        = express.createServer()
  ;

app.get('/', handler.helloWorld);

app.listen(cfg.www.port, function(err) {
  if (err) { throw err; }
  console.log( '{"www": "ok", "host": "%s", "port": "%d", "env": "%s"}', 
    cfg.www.host, cfg.www.port, app.settings.env);
});

process.on('uncaughtException', function(err) {
  console.log(JSON.stringify(err));
});