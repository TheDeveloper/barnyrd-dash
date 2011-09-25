var Sprite = function(lane){
	var self = this;
	this.maxSpeed = 3 + (Math.random() * 2)
	this.lane = lane;
	this.position = {
		x: 0,
		y: 0
	}
	this.spriteIndex = Math.floor(Math.random() * 5);
	this.name = generateStupidName()
	
	this.onEnterFrame = function(frameNum){
		this.position.x += Math.random() * self.maxSpeed;
		this.position.y = Math.sin(frameNum + self.lane) * 3
	}
	
}