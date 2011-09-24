var PlayView = function(sprites){
	var canvas	= document.getElementById('race');
	var ctx			= canvas.getContext('2d');
	var imgSprite = document.getElementById('imgSprite');
	var laneHeight = canvas.height /  sprites.length;
	var spriteHeight = 30;
	var spriteWidth = 30;
	var margin = (laneHeight - spriteHeight) / 2
	
	this.render = function(frameNum){
		ctx.clearRect(0,0, canvas.width, canvas.height)
		for (var i=0; i < sprites.length; i++) {
			ctx.save()
			ctx.translate(
				sprites[i].position.x + (spriteWidth/2),
				((laneHeight * sprites[i].lane) + (laneHeight/2) + sprites[i].position.y) 
			);
			ctx.rotate(Math.sin(frameNum) * 0.3)
			ctx.drawImage(
				imgSprite, 
				-spriteWidth/2,
				-spriteHeight/2,
				spriteHeight,
				spriteWidth
			);
			ctx.restore();
		};
	}
}