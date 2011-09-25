var express       = require('express')
  , qs            = require('querystring')
  , app           = express.createServer()
  , cfg           = require('../../conf/config.js').betable
  ;


app.configure(function(){
  app.use(express.cookieParser());
  app.use(express.session({ secret: "SFDFSDFEWT#$%$RFFGRTYEFSDSFGDGSDCXVGFHDFAFDGSADSFSDRQEAD#@$%^$&%*^IHGFD:wq!" }));
});

app.get('/', function(request, response){
  response.send('<a href="auth/betable">Login</a>');
});

app.get('/auth/betable', function(req,res) {
  var params = qs.stringify(
        { client_id     : cfg.consumer_key
        , redirect_url  : "http://" + cfg.host + ":8088/auth/betable/callback"
        , response_type : "code"
        });
  res.redirect("http://sandbox.betable.com/oauth/authorize?" + params);
});

app.get('/auth/betable/callback', function(req,res) {
  var params = qs.stringify(
        { grant_type     : "authorization_code"
        , client_id      : cfg.consumer_key
        , client_secret  : cfg.consumer_secret
        , redirect_url   : "http://" + cfg.host + ":8088/auth/betable/store_user"
        , code           : req.query.code
        });
  res.redirect("http://sandbox.betable.com/oauth/token.js?" + params);
});

app.get('/auth/betable/store_user', function(req,res){
  res.send("OK");
});

app.listen(8088);

process.on('uncaughtException', function(err) {
  console.log(JSON.stringify(err));
});

console.log('fffuuu');