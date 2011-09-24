$().ready(function(){
	var raceScreen = new RaceScreen();
	var lobbyScreen = new LobbyScreen(function(){
		$('.gameArea').html( raceScreen.template )
		new Game()
		return false;
	})
	$('.gameArea').html( lobbyScreen.template )
});