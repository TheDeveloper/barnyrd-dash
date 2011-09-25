var LobbyScreen = function(contestants, startCallback){
	this.template = $('.lobbyScreen').clone();
	this.template.find('.startBtn').click( startCallback );
	
	var contestantList = this.template.find('.contestants')
	for (var i=0; i < contestants.length; i++) {
		var em = $('<li><div class="card animal'+contestants[i].spriteIndex+'"></div><strong>' + contestants[i].name + '</strong></li>')
		em.click(function(){
			$(this).addClass('selected')
		})
		contestantList.append(em)
	};
}

var RaceScreen = function(){
	this.template = $('.raceScreen').clone();
}