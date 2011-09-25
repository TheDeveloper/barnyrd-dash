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
	var trackSprites = []
	for (var i=0; i < sprites.length; i++) {
		trackSprites.push(document.getElementById('trackSprite' + Math.ceil(Math.random() * 2)))
	};
	ctx.clearRect(0,0, canvas.width, canvas.height);
	
	this.drawTracks = function(){
		// draw tracks
		// for (var i=0; i < trackSprites.length; i++) {
		// 	ctx.drawImage(
		// 		trackSprites[i], 
		// 		10,
		// 		laneHeight * i + 20
		// 	);
		// };
	}
	
	this.render = function(frameNum){
		ctx.clearRect(0,0, canvas.width, canvas.height)
		self.drawTracks();
		
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