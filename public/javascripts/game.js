var Game = function(sprites){
	var gameInterval;
	var self = this
	var frameNum;
	var sprites = [];
	var playerLength = 7;
	for (var i=0; i < playerLength; i++) {
		sprites.push( new Sprite(i) )
	};
	var playView = new PlayView(sprites);
	
	var finish = function(){
		showWin(25)
		var btn = $('<a href="#">Play again</a>').click(function(){
			new Game()
		});
		$('.notice').append(btn)
		stop()
	}
	
	var stop = function(){
		clearInterval(gameInterval)
	}
	
	var start = function(){
		frameNum = 0
		gameInterval = setInterval(function(){
			frameNum++
			
			for (var i=0; i < sprites.length; i++) {
				sprites[i].onEnterFrame(frameNum);
				if (sprites[i].position.x > 700){
					finish();
				}
			};
			
			playView.render(frameNum);
		}, 50)
	}
	
	var countDown = function(counter){
		if (counter == 0){
			$('.notice').remove()
			start()
		} else {
			showCounter(counter)
			counter--
			setTimeout(function(){
				countDown(counter)
			}, 1000)
		}
	}
	
	playView.drawTracks()
	countDown(5)
}

var showCounter = function(num){
	$('.notice').remove()
	var el = $('<div class="notice">'+ '<img src="images/" />' + '</div>')
	el.click(function(){ $(this).remove() })
	$('.gameArea').append(el);
}

var showWin = function(money){
	$('.notice').remove()
	var el = $('<div class="notice">'+ '<img src="images/win.png" />' + '</div>')
	el.click(function(){ $(this).remove() })
	$('.gameArea').append(el);
}

var showNotice = function(msg){
	$('.notice').remove()
	var el = $('<div class="notice">'+ msg + '</div>')
	el.click(function(){ $(this).remove() })
	$('.gameArea').append(el);
}