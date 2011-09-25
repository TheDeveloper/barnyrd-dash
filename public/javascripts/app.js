$().ready(function(){
	var raceScreen = new RaceScreen();
	$('.gameArea').html( raceScreen.template )
	var contestants = []
	var playerLength = 7;
	for (var i=0; i < playerLength; i++) {
		contestants.push( new Sprite(i) )
	};
	var lobbyScreen = new LobbyScreen(contestants, function(){
		lobbyScreen.template.remove();
		new Game(contestants)
		return false;
	})
	$('.gameArea').append( lobbyScreen.template )
});