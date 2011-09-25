// Allow us to have a hot-swappable pusher config so we can test individually
var pusher  =
    { app_id : '44'
    , key    : '0458be1972bc459c659f'
    , secret : 'e009ed4001f474071a67'
    }
  , www     =
    { host   : 'localhost'
    , port   : 8080
    , secret : 'f095ad69066a9e8bc312acebf84cc4e7004c6e7695389558b2177c664e1' +
               '8b4ed490fda8665d5fca9d364597977399a1069bf88612b921f1308b45a'
    }
  , betable =
    { key       : "eWwnS6UtuxDmsz1g2k5TRgSNLzia2owK9bIFMJwW"
    , secret    : "WLUvmXc6jwAG51ZPK4FAU1gaMI0JDphtFBFWSRNE"
    , namespace : 'auth' 
    , https     : false
    }
  , mongo   = 
    { endpoint : 'dbh15.mongolab.com:27157/barnyrd-dash'
    , username : 'barnyrd-dash'
    , password : 'barnyrd-m00'
    }
  , couch   = 
    { url   : "http://barnyrd.iriscouch.com"
    , db : "users_db"
    }
  ;

try { config = require('./pusher'); } 
catch(e) { 
  config = 
    { pusher  : pusher
    , www     : www
    , mongo   : mongo
    , betable : betable
    , couch   : couch
    };
}

config.www.url = "http:" + (config.www.ssl ? 's' : '') + 
  "//" + config.www.host + (config.www.port ? ':' + config.www.port : '');
module.exports = config;