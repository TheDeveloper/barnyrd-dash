// Allow us to have a hot-swappable pusher config so we can test individually
var pusher_conf
  , defaults = 
    { app_id : '44'
    , key    : '0458be1972bc459c659f'
    , secret : 'e009ed4001f474071a67'
    }
  , http_conf =
    { host   : 'localhost'
    , port   : 8080
    , secret : 'f095ad69066a9e8bc312acebf84cc4e7004c6e7695389558b2177c664e1' +
               '8b4ed490fda8665d5fca9d364597977399a1069bf88612b921f1308b45a'
    }
  , betable =
    { key       : "e009ed4001f474071a67"
    , secret    : "0458be1972bc459c659f"
    , namespace : 'auth' 
    , host      : 'localhost'
    , https     : false
    }
  ;

var mongo = 
  { host : 'dbh15.mongolab.com'
  , port : 27157
  , username : 'barnyrd-dash'
  , database : 'barnyrd-dash'
  , password : 'barnyrd-m00'
  };

try { pusher_conf = require('./pusher'); }
catch(e) { pusher_conf = defaults; }

module.exports = 
  { pusher  : pusher_conf
  , www     : http_conf
  , mongo   : mongo
  , betable : betable
  };
