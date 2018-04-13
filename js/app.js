// Enemies our player must avoid
var startPosition = [0, 100, 200, 300, 400];
var playerY = 400;
// Start in Random position every time game starts.
var playerX = startPosition[Math.floor(Math.random()*startPosition.length)];
var allEnemies = [];


var Enemy = function () {
	// Variables applied to each of our instances go here,
	// we've provided one for you to get started

	// The image/sprite for our enemies, this uses
	// a helper we've provided to easily load images
	this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
	// You should multiply any movement by the dt parameter
	// which will ensure the game runs at the same speed for
	// all computers.
};

Enemy.prototype.render = function () {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function () {
	this.sprite = 'images/char-boy.png';
};

Player.prototype.render = function () {
	ctx.drawImage(Resources.get(this.sprite), playerX, playerY);
};

Player.prototype.update = function () {

};

Player.prototype.handleInput = function (key) {
	switch (key) {
	case 'up':
		if (playerY > -15) playerY -= 83;
		break;
	case 'down':
		if (playerY < 400) playerY += 83;
		break;
	case 'right':
		if (playerX < 400) playerX += 100;
		break;
	case 'left':
		if (playerX > 0) playerX -= 100;
		break;
	}
};


var player = new Player;
var enemy = new Enemy;



// This listens for key presses and sends the keys to your
document.addEventListener('keyup', function (e) {
	var allowedKeys = {
		37: 'left',
		38: 'up',
		39: 'right',
		40: 'down'
	};

	player.handleInput(allowedKeys[e.keyCode]);
});