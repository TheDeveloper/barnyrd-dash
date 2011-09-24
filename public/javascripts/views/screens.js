var LobbyScreen = function(startCallback){
	this.template = $('.lobbyScreen').clone();
	this.template.find('.startBtn').click( startCallback );
}

var RaceScreen = function(){
	this.template = $('.raceScreen').clone();
}