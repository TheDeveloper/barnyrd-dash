var LobbyScreen = function(contestants){
	var self = this;
	this.template = $('.lobbyScreen').clone();
	
	this.template.find('.startBtn').click( function(){
		self.template.remove();
		new Game(contestants, 0)
		return false;
	} );
	
	var contestantList = this.template.find('.contestants')
	for (var i=0; i < contestants.length; i++) {
		var em = $('<li><div class="card animal'+contestants[i].spriteIndex+'"></div><strong>' + contestants[i].name + '</strong></li>')
		em.data('id', i)
		em.click(function(){
			var id =  $(this).data('id');
			contestants[id].maxSpeed = 6;
			new Game(contestants, id);
			self.template.remove();
			return false;
		})
		contestantList.append(em)
	};
}

var RaceScreen = function(){
	this.template = $('.raceScreen').clone();
}