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
		showNotice('<p>we have a winner!</p>')
		var btn = $('<a href="#">Play again</a>').click(function(){
			new Game()
		});
		$('.notice').append(btn)
		self.stop()
	}
	
	this.stop = function(){
		clearInterval(gameInterval)
	}
	
	this.start = function(){
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
	
	self.start();
}

var showNotice = function(msg){
	$('.notice').remove()
	var el = $('<div class="notice">'+ msg + '</div>')
	el.click(function(){ $(this).remove() })
	$('.gameArea').append(el);
}