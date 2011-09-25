var animals = ['horse', 'sheep', 'bull', 'cow', 'goose'];

function initLobby(){
  var overlay = $('#overlay');
  var lobbyBox = $('#lobby-box');
  $.ajax({
    url: 'account_info',
    dataType: 'json',
    error: ajaxFail,
    success: function(res, t, XHR){
      var lightbox = $('#get-started-lightbox');
      lightbox.css(
        {
          left: lobbyBox.width() / 2 - (lightbox.width() / 2)
        , top: '10px'
        }
      );
      if(!res.accountCreated){
        var createPlayerButton = $('#create-player-button');
        var animalPicker = $('.animal-picker');
        // Populate cards
        for(var i = animals.length; i--;){
          var card = $('<div/>', {
            'class' : 'card '+animals[i]
          });
          card.html('<input type="hidden" value="'+animals[i]+'" />');
          card.appendTo(animalPicker);
        }
        var name = generateStupidName();
        $('.player-name').val(name);

        $('.card').click(function(){
          $('.card').removeClass('selected');
          $(this).addClass('selected');
          createPlayerButton.text('Go '+$(this).find('input').val()+'!');
        });

        // Create player button handler
        createPlayerButton.click(function(){
          // Name must have a value and they should have selected a character
          var selectedAnimal = $('.card.selected');
          if(!selectedAnimal.length){
            alert('You have not selected a character!');
            return false;
          }
          var playerName = $('.player-name').val();
          if(!playerName){
            alert('You have not entered a player name!');
            return false;
          }
          var character = selectedAnimal.find('input').val();

          // Post off the info and create the player
          $.post('/create_player', {name: playerName, character: character}, function(res, t, XHR){
            if(XHR.status != 200){
              console.log('Could not create player');
              alert('Oops... something went wrong. Check your internet connection');
              return false;
            }

            // Drop the player into the pen
          });
        });

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
    }
  });
}

$(document).ready(initLobby);
