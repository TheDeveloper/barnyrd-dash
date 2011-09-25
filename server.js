var express    = require('express')
  , cfg        = require('./conf/config')
  , www        = cfg.www
  , handler    = require('./handler')
  , betable    = require('./lib/oauth2/betable')
  , app        = express.createServer()
  , couch      = require('./lib/couch')
  ;

app.configure( function(){
  app.use(express.bodyParser());
  app.use(app.router);
  app.use(express.cookieParser());
  app.use(express.session({ secret: www.secret }));
  app.use(express.static(__dirname + '/public'));
});
betable(app,cfg);

cfg.betable.callback = function (e,req,res,betable_user,access_token) {
  function render_user(user){
    res.send(user);
  }
  
  function render_err(e) {
    res.send(e);
  }
  if(e) { res.send(e.message, 500); }
  couch.user.first_by_betable_email(betable_user.user.email, function(e,b,h){
    if(e) { 
      if (e.message === 'no_db_file') {
        return couch.user.create({betable: betable_user}, 0, function(e,couch_user) { 
          if(e) { return render_err(e); }
          render_user(couch_user); 
        });
      }
      else {
        return render_err(e);
      }
    }
    //req.session.authenticated       = true;
    //req.session._barnyrd_oath_token = access_token;
    render_user(b);
  });
};

app.get('/', function(req, res){
  res.sendfile('public/splash.html');
});
app.get('/lobby', function(req, res){
  res.sendfile('public/lobby.html');
});
app.get('/pen', function(req, res){
  res.sendfile('public/pen.html');
});
app.get('/race', function(req, res){
  res.sendfile('public/race.html');
});

app.get('/account_info', function(req, res){
  var jsonRes = {};
  if(req.session && req.session.authenticated){
    jsonRes.accountCreated = true;
  }
  res.send(JSON.stringify(jsonRes));
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
  };
  res.send(pusher.auth(req.param('socket_id'), req.param('channel_name'), channelData));
});

// Server

app.listen(www.port, function(err) {
  if (err) { throw err; }
  console.log( '{"www": "ok", "host": "%s", "port": "%d", "env": "%s"}', 
    www.host, www.port, app.settings.env);
});

process.on('uncaughtException', function(err) {
  console.log(JSON.stringify(err));
});
