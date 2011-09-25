module.exports = function (app,cfg) {
  var express          = require('express')
    , qs               = require('querystring')
    , request          = require('request')
    , www              = cfg.www
    , betable          = cfg.betable
    , couch            = cfg.couch
    , betable_endpoint = 'http://developers.betable.com'
    ;

  app.get('/auth/betable', function(req,res) {
    var params = qs.stringify(
          { client_id     : betable.key
          , redirect_url  : www.url + "/auth/betable/callback"
          , response_type : "code"
          });
    res.redirect(betable_endpoint + "/oauth/authorize?" + params);
  });
  
  app.get('/auth/betable/callback', function(req,res) {
    var params = qs.stringify(
          { grant_type     : "authorization_code"
          , client_id      : betable.key
          , client_secret  : betable.secret
          , redirect_url   : www.url + '/auth/betable/callback'
          , code           : req.query.code
          });
    try {
      request.get(betable_endpoint + "/oauth/token.js?" + params,
        function(e,h,b) {
            if(e) { throw e; }
            var access_token = JSON.parse(b).access_token;
            request.get(betable_endpoint + "/api/v10/user?oauth_token=" + access_token, 
              function(e,h,b_u){
                if (e) {throw e; }
                try {
                  b_u = JSON.parse(b_u)
                } catch(exc) { }
                betable.callback(null,req,res,b_u,access_token);
            });
          });
    } catch(exc) {
      betable.callback(exc,res,res);
    }
  });
};