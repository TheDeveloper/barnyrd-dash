var sprites = [];
var playerLength = 7;
for (var i=0; i < playerLength; i++) {
	sprites.push( new Sprite(i) )
};
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
	
	this.render = function(){
		ctx.clearRect(0,0, canvas.width, canvas.height)
		for (var i=0; i < sprites.length; i++) {
			// ctx.save()
			// ctx.transform()
			ctx.drawImage(
				imgSprite, 
				sprites[i].position.x,
				(laneHeight * sprites[i].lane) + margin + sprites[i].position.y,
				spriteHeight,
				spriteWidth
			)
		};
	}
}

var Game = function(sprites){
	var playView = new PlayView(sprites);
	var gameInterval;
	var self = this
	var frameNum;
	
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
					showNotice('we have a winner!')
					self.stop()
				}
			};
			
			playView.render();
		}, 50)
	}
}

$().ready(function(){
	var raceScreen = new RaceScreen();
	var lobbyScreen = new LobbyScreen(function(){
		$('.gameArea').html( raceScreen.template )
		var game = new Game(sprites)
		game.start();
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