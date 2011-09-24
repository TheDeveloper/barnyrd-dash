var RaceScreen = function(game){
	this.template = $('.lobbyScreen').clone();
	
	this.find('.startBtn').click(function(){
		game.start()
	})
}