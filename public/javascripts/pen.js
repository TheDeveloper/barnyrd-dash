function initPen(){
  var pen = $('#pen');
  var pusher = new Pusher('a553813b71932b8355e4');
  var penChan = pusher.subscribe('presence-pen');
  Pusher.log = function(message) {
  if (window.console && window.console.log) window.console.log(message);
};
}

$(document).ready(initPen);
