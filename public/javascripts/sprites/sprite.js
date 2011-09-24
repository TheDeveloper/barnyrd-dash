var Sprite = function(lane){
	var self = this;
	this.lane = lane;
	this.position = {
		x: 0,
		y: 0
	}
	
	this.onEnterFrame = function(frameNum){
		this.position.x += Math.random() * 5;
		this.position.y = Math.sin(frameNum + self.lane) * 3
	}
	
}