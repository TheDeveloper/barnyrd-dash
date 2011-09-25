var PlayView = function(sprites){
	var self = this;
	var canvas	= document.getElementById('race');
	var ctx			= canvas.getContext('2d');
	var imgSprite = document.getElementById('imgSprite');
	var shadowSprite = document.getElementById('shadowSprite');
	var laneHeight = (canvas.height - 10) /  sprites.length;
	var originalHeight = 48;
	var originalWidth = 48;
	var spriteHeight = 40;
	var spriteWidth = 40;
	var margin = (laneHeight - spriteHeight) / 2
	ctx.clearRect(0,0, canvas.width, canvas.height);
	var labels = []
	for (var i=0; i < sprites.length; i++) {
		var el = $('<div class="label" id="l'+i+'">'+sprites[i].name+'</div>')
		$('.labelHolder').append(el)
		labels.push(el)
	}
	
	this.render = function(frameNum){
		ctx.clearRect(0,0, canvas.width, canvas.height)		
		for (var i=0; i < sprites.length; i++) {
			$('#l'+i).css('left', (sprites[i].position.x - 240) + 'px')
			$('#l'+i).css('top', ((laneHeight * sprites[i].lane) + spriteHeight -2) - 20)
			// draw shadow
			ctx.drawImage(
				shadowSprite, 
				sprites[i].position.x - (spriteWidth/2),
				((laneHeight * sprites[i].lane) + spriteHeight -2),
				spriteWidth,
				8
			);
			// draw character
			ctx.save()
			ctx.translate(
				sprites[i].position.x + (spriteWidth/2),
				((laneHeight * sprites[i].lane) + (laneHeight/2) + sprites[i].position.y) 
			);
			ctx.rotate(Math.sin(frameNum + sprites[i].lane ) * 0.2)
			ctx.drawImage(
				imgSprite, 
				0,
				originalHeight * sprites[i].spriteIndex,
				originalWidth,
				originalHeight,
				-spriteWidth,
				-spriteHeight/2,
				spriteWidth,
				spriteHeight
			);
			ctx.restore();
		};
	}
}