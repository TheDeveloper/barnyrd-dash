var express       = require('express')
  , everyauth     = require('everyauth')
  , app           = express.createServer()
  , cfg           = require('../../conf/config.js').betable
  ;

everyauth
  .betable
  .appId(cfg.consumer_key)
  .appSecret(cfg.consumer_secret)
  .findOrCreateUser( function (session, accessToken, accessTokenExtra, githubUserMetadata) {
    throw new Error("ewe");
  })
  .redirectPath('/');

app.configure(function(){
  app.use(express.cookieParser());
  app.use(express.session({ secret: "SFDFSDFEWT#$%$RFFGRTYEFSDSFGDGSDCXVGFHDFAFDGSADSFSDRQEAD#@$%^$&%*^IHGFD:wq!" }));
  app.use(everyauth.middleware());
  everyauth.helpExpress(app);
});

app.get('/', function(request, response){
  response.send('<a href="auth/betable">Login</a>');
});

app.listen(8088);

process.on('uncaughtException', function(err) {
  console.log(JSON.stringify(err));
});

console.log('fffuuu');