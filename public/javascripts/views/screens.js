var LobbyScreen = function(contestants){
	var self = this;
	this.template = $('.lobbyScreen').clone();
	var currentID
	
	this.template.find('.startBtn').click( function(){
		if (currentID){
			self.template.remove();
			// contestants[currentID].maxSpeed;
			new Game(contestants, currentID)
		}
		return false;
	} );
	this.template.find('.startBtn').addClass('disabled')
	
	var contestantList = this.template.find('.contestants')
	for (var i=0; i < contestants.length; i++) {
		var em = $('<li><div class="card animal'+contestants[i].spriteIndex+'"></div><strong>' + contestants[i].name + '</strong></li>')
		em.data('id', i)
		em.click(function(){
			self.template.find('.selected').removeClass('selected')
			currentID =  $(this).data('id');
			$(this).addClass('selected')
			self.template.find('.startBtn').removeClass('disabled')
			return false;
		})
		contestantList.append(em)
	};
}

var RaceScreen = function(){
	this.template = $('.raceScreen').clone();
}