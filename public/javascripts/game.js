var Game = function(sprites, chosen){
	var gameInterval;
	var self = this
	var frameNum;
	var playView = new PlayView(sprites, chosen);
	
	var finish = function(id){
		if (id == chosen)
			showWin(25)
		else
			showLose()
		stop()
	}
	
	var stop = function(){
		clearInterval(gameInterval)
	}
	
	var start = function(){
		frameNum = 0
		gameInterval = setInterval(function(){
			frameNum++
			
			for (var i=0; i < sprites.length; i++) {
				sprites[i].onEnterFrame(frameNum);
				if (sprites[i].position.x > 650){
					finish(i);
				}
			};
			
			playView.render(frameNum);
		}, 50)
	}
	
	var countDown = function(counter){
		if (counter == 0){
			$('.notice').remove()
			start()
		} else {
			showCounter(counter)
			counter--
			setTimeout(function(){
				countDown(counter)
			}, 1000)
		}
	}
	
	countDown(4)
}

var generateSpritePaths = function(playerLength){
	var paths = [];
	var sprites = [];
	for (var i=0; i < playerLength; i++) {
		paths.push([0]);
		sprites.push({ maxSpeed: 3 + (Math.random() * 2) })
	}
	var maxSize = 0;
	var j = 0;
	while(maxSize <= 100){
		for (var i=0; i < playerLength; i++) {
			if (paths[i][j] != undefined){
				var pos = paths[i][j] + (Math.random() * sprites[i].maxSpeed)
				// console.log(pos)
				paths[i].push(pos)
			}
			if (pos && pos >= 100) {
				maxSize = 100
				var winnerIndex = i;
				// break;
			}
		};
		j++;
	}
	var winner = paths.splice(winnerIndex,1)
	// paths.unshift(winner);
	console.log(winner)
	console.log(paths)
	return paths;
}
// generateSpritePaths(7)

var showCounter = function(num){
	$('.notice').remove()
	var el = $('<div class="notice">'+ '<div class="counter'+num+' counter"></div>' + '</div>')
	el.click(function(){ $(this).remove() })
	$('.gameArea').append(el);
}

var showWin = function(money){
	$('.notice').remove()
	var el = $('<div class="notice">'+ '<img src="images/signwin_01_380x240.png" />' + '</div>')
	$('.gameArea').append(el);
	el.click(function(){ window.location = '/pen' })
}

var showLose = function(){
	$('.notice').remove()
	var el = $('<div class="notice">'+ '<img src="images/lose.png" />' + '</div>')
	$('.gameArea').append(el);
	el.click(function(){ window.location = '/pen' })
}

var showNotice = function(msg){
	$('.notice').remove()
	var el = $('<div class="notice">'+ msg + '</div>')
	el.click(function(){ $(this).remove() })
	$('.gameArea').append(el);
}