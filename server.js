var express       = require('express')
  , cfg           = require('./conf/config')
  , www           = cfg.www
  , handler       = require('./handler')
  , betable       = require('./lib/oauth2/betable')
  , app           = express.createServer()
  , couch         = require('./lib/couch')
  , _             = require('underscore')
  , authenticated = require('./lib/middleware/authenticated')
  , character     = require('./lib/middleware/character')
  ;

app.configure( function(){
  app.use(express.methodOverride());
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session({ secret: www.secret }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
  app.dynamicHelpers({
    session: function(req, res){
      return req.session;
    }
  });
});

cfg.betable.callback = function (e,req,res,betable_user,access_token) {
  function render_user(user){
    req.session._barnyrd_authenticated = true;
    req.session._barnyrd_oath_token    = access_token;
    req.session._barnyrd_email         = user.betable.user.email;
    req.session._barnyrd_user          = user;
    res.redirect('/lobby');
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
          delete couch_user.ok;
          render_user(_.extend(couch_user, {betable: betable_user})); 
        });
      }
      else {
        return render_err(e);
      }
    }
    render_user(b);
  });
};

app.get('/', function(req, res) {
  if(req.session._barnyrd_oath_token) {
    return res.redirect('/lobby');
  }
  res.sendfile('public/splash.html');
});
app.get('/lobby', authenticated, function(req, res){
  res.sendfile('public/lobby.html');
});
app.get('/pen',  authenticated, function(req, res){
  res.sendfile('public/pen.html');
});
app.get('/race',  [authenticated, character], function(req, res){
  res.sendfile('public/race.html');
});
app.get('/logout', function(req,res){
  req.session._barnyrd_authenticated =
  req.session._barnyrd_oath_token    = 
  req.session._barnyrd_email         = 
  req.session._barnyrd_user          = 
  req.session._barnyrd_animal        = null;
  res.redirect('/');
});

app.get('/account_info', authenticated, function(req, res){
  res.send(JSON.stringify(req.session._barnyrd_user));
});

app.put('/create_player', function(req, res){
  var playerName = req.param('name')
    , character  = req.param('character')
    , user       = req.session._barnyrd_user
    ;
  user.playerName = playerName;
  user.character  = character;
  couch.user.update(user._id, user, function (e,b,h){
    if(e) { res.send("error"); }
    req.session._barnyrd_user   = b;
    req.session._barnyrd_animal = character;
    res.send(b);
  });
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
  betable(app,cfg);
  console.log( '{"www": "ok", "host": "%s", "port": "%d", "env": "%s"}', 
    www.host, www.port, app.settings.env);
});

process.on('uncaughtException', function(err) {
  console.log(JSON.stringify(err));
});
