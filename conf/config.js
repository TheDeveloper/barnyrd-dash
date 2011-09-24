// Allow us to have a hot-swappable pusher config so we can test individually
var defaultPusherConf = {
  app_id = '44',
  key = '0458be1972bc459c659f',
  secret = 'e009ed4001f474071a67'
}

try{
  var pusherConf = require('pusher');
}
catch(e){
  pusherConf = defaultPusherConf;
}

var config = {
  /** Pusher config **/
  pusher : pusherConf
}
