function errorNoticeIn(){
  /*var overlay = $('#overlay');
  overlay.css({'z-index' : 100}).fadeIn();
  var errorDialog = $('<div/>', {
      'class' : 'error-dialog lightbox'
    , css: {
      'z-index' : 101
    }
  });
  var errorHeader = $('<h1/>', {
    
  })
    .text('Oh blast.')
    .appendTo(errorDialog);
  ;
  var errorDesc = $('<p/>',{
    
  })
  .text("The farmer has run over your animal with a combine harvester. A replacement has been ordered, but for now, we're afraid you're gonna have to refresh this page.")
  .appendTo(errorDialog)
  ;
  errorDialog.appendTo($('body'));
  errorDialog.fadeIn();*/

  alert("The farmer has run over your animal with a combine harvester. A replacement has been ordered, but for now, we're afraid you're gonna have to refresh this page.");
  window.location.reload();
}

function ajaxFail(){
  errorNoticeIn();
}
