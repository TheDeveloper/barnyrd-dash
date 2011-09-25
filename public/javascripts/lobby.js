function initLobby(){
  var overlay = $('#overlay');
  var lobbyBox = $('#lobby-box');
  var name = generateStupidName();
  $('.player-name').val(name);
  $('.card').click(function(){
    $('.card').removeClass('selected');
    $(this).addClass('selected');
  });
  $.getJSON('/accountInfo', function(res){
    var lightbox = $('#get-started-lightbox');
    lightbox.css(
      {
        left: lobbyBox.width() / 2 - (lightbox.width() / 2)
      , top: '10px'
      }
    );
    if(!res.accountCreated){
      overlay
      .css(
        {
          left: lobbyBox.offset().left,
          top: lobbyBox.offset().top
        }
      )
      .fadeIn();
      lightbox.fadeIn();
    }
  });
}

$(document).ready(initLobby);
