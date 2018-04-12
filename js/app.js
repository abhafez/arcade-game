var x = 400;
var y = 400;
var playerX = 200;
var playerY = 200;
var gameWon = false;
var allEnemies = [];

class Enemy {
	constructor() {
		// Variables applied to each of our instances go here,
		// we've provided one for you to get started
		// The image/sprite for our enemies, this uses
		// a helper we've provided to easily load images
		this.sprite = 'images/enemy-bug.png';
		this.x = x;
		this.y = y;
	}
	// Update the enemy's position, required method for game
	// Parameter: dt, a time delta between ticks
	update(dt) {
		// You should multiply any movement by the dt parameter
		// which will ensure the game runs at the same speed for
		// all computers.
	}
	// Draw the enemy on the screen, required method for game
	render() {
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	}
}


class Player {
	constructor() {
		this.sprite = 'images/char-boy.png';
		this.playerX = playerX;
		this.playerY = playerY;
	}

	update() {}

	render() {
		ctx.drawImage(Resources.get(this.sprite), this.playerX, this.playerY);
	}

	handleInput(key) {
		switch (key) {
		case 'up':
			// doSomething
			break;
		case 'down':
			// doSomething
			break;
		case 'right':
			// doSomething
			break;
		case 'left':
			// doSomething
			break;
		}
	}
}

var eme = new Enemy();
var player = new Player();

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