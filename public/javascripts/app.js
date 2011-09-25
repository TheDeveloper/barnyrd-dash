$().ready(function(){
	var raceScreen = new RaceScreen();
	$('.gameArea').html( raceScreen.template )
	var contestants = []
	var playerLength = 7;
	for (var i=0; i < playerLength; i++) {
		contestants.push( new Sprite(i) )
	};
	// get us
	var sprites = {
	    'bull' : 0,
	    'goose' : 1,
	    'sheep' :2,
	    'cow':3,
	    'horse':4
	}
	$.getJSON('/get_my_player', function(res){
	    var cl = contestants.length-1;
	    contestants[cl] = new Sprite(i);
	    contestants[cl].name = res.name;
	    contestants[cl].spriteIndex = sprites[res.animal];
	    var lobbyScreen = new LobbyScreen(contestants);
	    $('.gameArea').append( lobbyScreen.template );
	});
	
});