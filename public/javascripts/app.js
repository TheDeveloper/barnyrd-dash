$().ready(function(){
	var raceScreen = new RaceScreen();
	$('.gameArea').html( raceScreen.template )
	var contestants = []
	var playerLength = 7;
	for (var i=0; i < playerLength; i++) {
		contestants.push( new Sprite(i) )
	};
	var lobbyScreen = new LobbyScreen(contestants)
	$('.gameArea').append( lobbyScreen.template )
});