

var showNotice = function(msg){
	$('.notice').remove()
	var el = $('<div class="notice">'+ msg + '</div>')
	el.click(function(){ $(this).remove() })
	$('.gameArea').append(el);
}


var PlayView = function(sprites){
	var canvas	= document.getElementById('race');
	var ctx			= canvas.getContext('2d');
	var imgSprite = document.getElementById('imgSprite');
	var laneHeight = canvas.height /  sprites.length;
	var spriteHeight = 30;
	var spriteWidth = 30;
	var margin = (laneHeight - spriteHeight) / 2
	
	this.render = function(frameNum){
		ctx.clearRect(0,0, canvas.width, canvas.height)
		for (var i=0; i < sprites.length; i++) {
			ctx.save()
			ctx.translate(
				sprites[i].position.x + (spriteWidth/2),
				((laneHeight * sprites[i].lane) + (laneHeight/2) + sprites[i].position.y) 
			);
			ctx.rotate(Math.sin(frameNum) * 0.3)
			ctx.drawImage(
				imgSprite, 
				-spriteWidth/2,
				-spriteHeight/2,
				spriteHeight,
				spriteWidth
			);
			ctx.restore();
		};
	}
}

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

$().ready(function(){
	var raceScreen = new RaceScreen();
	var lobbyScreen = new LobbyScreen(function(){
		$('.gameArea').html( raceScreen.template )
		new Game()
		return false;
	})
	$('.gameArea').html( lobbyScreen.template )
});

var LobbyScreen = function(startCallback){
	this.template = $('.lobbyScreen').clone();
	this.template.find('.startBtn').click( startCallback );
}

var RaceScreen = function(){
	this.template = $('.raceScreen').clone();
}