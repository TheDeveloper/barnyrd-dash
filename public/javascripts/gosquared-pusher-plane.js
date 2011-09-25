function doPlane(){
  var plane = $('#plane');
  if(!plane.length){
    plane = $('<div/>', 
      {
        id: 'plane'
      , css : {
          left: $(window).width()
      }
    });
    plane.prependTo($('body'));
  }
  plane.css({left: $(window).width()});
  plane.stop().animate({left: -1*$(plane).width()}, 10000, 'linear', function(){setTimeout(doPlane, 5000)});
}
$(document).ready(doPlane);
