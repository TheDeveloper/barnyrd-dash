var PlayView = function(sprites){
	var canvas	= document.getElementById('race');
	var ctx			= canvas.getContext('2d');
	var imgSprite = document.getElementById('imgSprite');
	var shadowSprite = document.getElementById('shadowSprite');
	var laneHeight = canvas.height /  sprites.length;
	var spriteHeight = 40;
	var spriteWidth = 40;
	var margin = (laneHeight - spriteHeight) / 2
	
	this.render = function(frameNum){
		ctx.clearRect(0,0, canvas.width, canvas.height)
		for (var i=0; i < sprites.length; i++) {
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
				-spriteWidth,
				-spriteHeight/2,
				spriteWidth,
				spriteHeight
			);
			ctx.restore();
		};
	}
}