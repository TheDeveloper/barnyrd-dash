function initPen(){
  var myInfo = null;
  var members = [];
  var input = {};
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

    myInfo.elm = $('#player-'+myInfo.id);
    setInterval(render, 130);
  })

  penChan.bind('pusher:member_added', function(member) {
    addMember(member.id, member.info);
  })

  penChan.bind('pusher:member_removed', function(member) {
    removeMember(member.id);
  })

  Pusher.log = function(message) {
    if (window.console && window.console.log) window.console.log(message);
  };

  function addMember(id, info) {
    members[id] = info;
    pen.append('<div class="player" style="left:'+id*4+'px" id="player-'+id+'"><div class="chat" style="" id="chat-'+id+'"></div><div class="sprite '+info.animal+'"></div></div>')
  }

  function removeMember (id, info) {
    $('#player-'+id).remove();
  }

  // Chat typing

  function rcvdKey(data) {
    // console.log("MID:"+data.user_id);
    // console.log("RCVD:"+data.key);
    var elm = $('#chat-'+data.user_id);
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
    var data = {user_id: myInfo.user_id, key:key};
    penChan.trigger('client-key', data);
    rcvdKey(data);
  }

  penChan.bind('client-key', function(data) {
    rcvdKey(data);
  });

  penChan.bind('client-pos', function(data) {
    $('#player-'+data.user_id).css({
      left: data.left,
      top: data.top
    });
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

  // Character moving

  var directions = {
    37: 'left',
    39: 'right',
    38: 'up',
    40: 'down'
  };

  $('body').live('keydown', function(evt) {
    if (directions[evt.keyCode]) {
      if (directions[evt.keyCode] == 'left')
        input.left = true
      if (directions[evt.keyCode] == 'right')
        input.right = true
      if (directions[evt.keyCode] == 'up')
        input.up = true
      if (directions[evt.keyCode] == 'down')
        input.down = true
      evt.preventDefault();
      return false;
    }
  });
  
  $('body').live('keyup', function(evt) {
    if (directions[evt.keyCode]) {
      if (directions[evt.keyCode] == 'left')
        input.left = false
      if (directions[evt.keyCode] == 'right')
        input.right = false
      if (directions[evt.keyCode] == 'up')
        input.up = false
      if (directions[evt.keyCode] == 'down')
        input.down = false
      evt.preventDefault();
      return false;
    }
  });

  function render() {
    myInfo.elm = $('#player-'+myInfo.user_id);
    var speed = 3;
    var pos = myInfo.elm.position();
    var moved = false;
    if (input.left){
      pos.left = pos.left - speed
      moved = true
    }if (input.right){
      pos.left = pos.left + speed
      moved = true
    }if (input.up){
      pos.top = pos.top - speed
      moved = true
    }if (input.down){
      pos.top = pos.top + speed
      moved = true
    }
    if (moved == true) {
      penChan.trigger('client-pos', {
        user_id: myInfo.user_id,
        left: pos.left,
        top: pos.top
      });
      myInfo.elm.css({
        left: pos.left,
        top: pos.top
      });
    }
  }
}

$(document).ready(initPen);
