var allEnemies = [];
var speedFactor;
var playerScore = 0;

function randomChoice(arr) {
	return arr[Math.floor(Math.random() * arr.length)];
}

var Gem = function() {
	this.sprite = 'images/' + randomChoice(['Gem-Blue', 'Gem-Orange', 'Gem-Green']) + '.png';
	this.gemX = randomChoice([0, 100, 200, 300, 400]);
	this.gemY = randomChoice([59, 149, 230]);
};

Gem.prototype.update = function () {

};

Gem.prototype.render = function () {
	ctx.drawImage(Resources.get(this.sprite), this.gemX + 15 , this.gemY + 35 , 75, 120);
};

var Enemy = function () {
	this.sprite = 'images/enemy-bug.png';
	this.speed = Math.floor(Math.random() * 100) + 50;
	this.enemyPosX = randomChoice([-100, -150, -40, -50, -15, -35]);
	this.enemyPosY = randomChoice([59, 149, 230]);
};


Enemy.prototype.update = function (dt) {
	if (this.enemyPosX < 490) {
		this.enemyPosX += this.speed * dt;
	} else {
		this.enemyPosX = randomChoice([-100, -150, -40, -50, -15, -35]);
		this.enemyPosY = randomChoice([59, 149, 230]);
	}
};

Enemy.prototype.render = function () {
	ctx.drawImage(Resources.get(this.sprite), this.enemyPosX, this.enemyPosY);
};

var Player = function () {
	this.sprite = 'images/char-boy.png';
	this.playerY = 400;
	this.playerX = randomChoice([0, 100, 200, 300, 400]);
};

Player.prototype.render = function () {
	ctx.drawImage(Resources.get(this.sprite), this.playerX, this.playerY);
};

Player.prototype.update = function () {

};

Player.prototype.handleInput = function (key) {
	switch (key) {
	case 'up':
		if (this.playerY > -15) this.playerY -= 83;
		break;
	case 'down':
		if (this.playerY < 400) this.playerY += 83;
		break;
	case 'right':
		if (this.playerX < 400) this.playerX += 100;
		break;
	case 'left':
		if (this.playerX > 0) this.playerX -= 100;
		break;
	}
};


var player = new Player;
var gem = new Gem;
var firstEnemy = new Enemy;
var secondEnemy = new Enemy;
var thirdEnemy = new Enemy;

allEnemies.push(firstEnemy);
allEnemies.push(secondEnemy);
allEnemies.push(thirdEnemy);

console.log(allEnemies);


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