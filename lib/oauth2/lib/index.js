var oauth   = require('oauth').OAuth2
  , verbose     = (process.env.BETABLE_ENV==='testing')
  ;

module.exports = function(app,opts) {
  if(!opts || !opts.consumer_key || !opts.consumer_secret || !opts.host || typeof opts.error_cb !== 'function') { 
    throw new Error("Invalid Options. You need a consumer key, secret, host, and error callback."); 
  }
  opts.namespace = '/' + (opts.namespace || 'auth');
  opts.host_url  = 'http' + (opts.https ? 's' : '') + '://' + opts.host;
  var routes  =
      { namespace : opts.namespace
      , auth      : opts.namespace + '/betable'
      , callback  : opts.namespace + '/betable/callback'
      };
  routes.redirect = opts.host_url + routes.callback;
  if(verbose) {
    console.log('[betable-oauth] started >');
    console.log('[betable-oauth] opts    : ' + JSON.stringify(opts));
    console.log('[betable-oauth] routes  : ' + JSON.stringify(routes));
  }
  function consumer() {
    return new oauth(
        opts.consumer_key
      , opts.consumer_secret
      , "http://developer.betable.com"
      , "/oauth/authorize"
      , "/oauth/token.js"
      );
  }
  
  app.get(routes.auth, function(request, response){
    console.log(JSON.stringify(consumer()))
     consumer().getOAuthAccessToken(
         {token: oauth_token, secret: oauth_token_secret}
       , {redirect_uri: routes.redirect}
     /*  function(error, oauth_token, oauth_token_secret, results){
       if (error) { return opts.error_cb(request,response,error); }
       else {
         request.session.oauth_request_token        = oauth_token;
         request.session.oauth_request_token_secret = oauth_token_secret;
         if(verbose) {
           console.log('[betable-oauth] oauth >');
           console.log('[betable-oauth] opts    : ' + 
             JSON.stringify({token: oauth_token, secret: oauth_token_secret}));
         }
         response.redirect( 
           "http://developer.betable.com/oauth/authorize?client_id=" + 
           request.session.oauth_request_token +
           "&response_type=code&redirect_url=" +
           routes.redirect);
       } }*/
     );
   });
  return;
};