var betable       = require('./lib/index')
  , express       = require('express')
  , app           = express.createServer()
  , cfg           = require('../../conf/config.js').betable
  ;

cfg.error_cb = function (request,response,error) {
  response.send(error, 500);
};

app.configure(function(){
  betable(app,cfg);
});


app.get('/', function(request, response){
  response.send('<a href="auth/betable">Login</a>');
});

app.listen(8088);

process.on('uncaughtException', function(err) {
  console.log(JSON.stringify(err));
});

console.log('fffuuu');