// Allow us to have a hot-swappable pusher config so we can test individually
var pusher_conf
  , defaults = 
    { app_id : '44'
    , key    : '0458be1972bc459c659f'
    , secret : 'e009ed4001f474071a67'
    }
  , http_conf =
    { host: 'localhost'
    , port: 8080
    }
  ;

var mongo = 
  { endpoint : 'dbh15.mongolab.com:27157/barnyrd-dash'
  , username : 'barnyrd-dash'
  , password : 'barnyrd-m00'
  };

try { pusher_conf = require('./pusher'); }
catch(e) { pusher_conf = defaults; }

module.exports = 
  { pusher : pusher_conf
  , www    : http_conf
  , mongo    : mongo
  };
