function initPen(){
  var members = [];
  var pen = $('#pen');
  var pusher = new Pusher('a553813b71932b8355e4');
  var penChan = pusher.subscribe('presence-pen');
  Pusher.log = function(message) {
    if (window.console && window.console.log) window.console.log(message);
  };

  function add_member(id, info) {
    members[id] = info;
    pen.append('<div class="player" id="player-"'+id+'"></div>')
  }

  penChan.bind('pusher:subscription_succeeded', function(members) {
    // update_member_count(members.count);
    members.each(function(member) {
      add_member(member.id, member.info);
    });
  })

  penChan.bind('client-key', function(data) {
    console.log("RCVD:"+data.v);
  });

  $('body').keypress(function (evt) { 
    // this.value = this.value.replace(/[^0-9\.]/g,'');
    penChan.trigger('client-key', {v:String.fromCharCode(evt.which)});
    console.log(String.fromCharCode(evt.which));
  });
  $('body').keydown(function (evt) {
    if (evt.keyCode == 8) {
      penChan.trigger('client-key', {v:'BACKSPACE'});
      console.log('BACKSPACE');
      return false;
    }
  });
}

$(document).ready(initPen);
