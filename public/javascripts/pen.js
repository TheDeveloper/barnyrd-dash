function initPen(){
  var myInfo = null;
  var members = [];
  var pen = $('#pen');
  var pusher = new Pusher('a553813b71932b8355e4');


  var penChan = pusher.subscribe('presence-pen');

  penChan.bind('pusher:damien_send_subscribe', function(channel_data) {
    console.log(channel_data)
    myInfo = JSON.parse(channel_data);
  })

  penChan.bind('pusher:subscription_succeeded', function(members) {
    // update_member_count(members.count);
    members.each(function(member) {
      addMember(member.id, member.info);
    });
  })

  Pusher.log = function(message) {
    if (window.console && window.console.log) window.console.log(message);
  };

  function addMember(id, info) {
    members[id] = info;
    pen.append('<div class="player" style="left:'+id*4+'px" id="player-'+id+'"></div>')
    pen.append('<div class="chat" style="left:'+id*4+'px" id="chat-'+id+'"></div>')
  }

  function rcvdKey(data) {
    // console.log("MID:"+data.mid);
    // console.log("RCVD:"+data.key);
    var elm = $('#chat-'+data.mid);
    if (data.key == 'BACKSPACE') {
      var myStr = elm.html();
      myStr.substring(0,myStr.length-1);

    // console.log("RCVD:"+data.key);
      elm.html(myStr.substring(0,myStr.length-1));
    } else {
      elm.append(data.key);
    }
  }

  function sendKey (key) {
    var data = {mid: myInfo.user_id, key:key};
    penChan.trigger('client-key', data);
    rcvdKey(data);
  }

  penChan.bind('client-key', function(data) {
    rcvdKey(data);
  });

  $('body').keypress(function (evt) { 
    // this.value = this.value.replace(/[^0-9\.]/g,'');
    sendKey(String.fromCharCode(evt.which));
    console.log(String.fromCharCode(evt.which));
  });
  $('body').keydown(function (evt) {
    if (evt.keyCode == 8) {
      sendKey('BACKSPACE');
      console.log('BACKSPACE');
      return false;
    }
  });
}

$(document).ready(initPen);
