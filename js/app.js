var allEnemies = [];
var speedFactor;
var playerScore = 0;
var lifes = 3;
var gemCollected = false;
// isHurt variable for player touches an enemy .. it changes in engine.js file. line 99
var isHurt = false;

function randomChoice(arr) {
	return arr[Math.floor(Math.random() * arr.length)];
}

var Gem = function () {
	this.sprite = 'images/' + randomChoice(['Gem-Blue', 'Gem-Orange', 'Gem-Green']) + '.png';
	this.gemX = randomChoice([0, 100, 200, 300, 400]);
	this.gemY = randomChoice([59, 149, 230]);
};

Gem.prototype.get = function () {
	return [this.gemX, this.gemY];
};

Gem.prototype.update = function () {
	if (gemCollected === true) {
		this.gemX = randomChoice([0, 100, 200, 300, 400]);
		this.gemY = randomChoice([59, 149, 230]);
		this.get();
		this.sprite = 'images/' + randomChoice(['Gem-Blue', 'Gem-Orange', 'Gem-Green']) + '.png';
		gemCollected = false;
	}

	if (gem.get()[0] === player.get()[0] &&
		(player.get()[1] - gem.get()[1]) < 15 &&
		(player.get()[1] - gem.get()[1]) > 0) {
		gem = new Gem();
	}
};

Gem.prototype.render = function () {
	ctx.drawImage(Resources.get(this.sprite), this.gemX + 15, this.gemY + 35, 75, 120);
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


Enemy.prototype.get = function () {
	return [this.enemyPosX, this.enemyPosY];
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
	if (isHurt === true) {
		this.playerY = 400;
		this.playerX = randomChoice([0, 100, 200, 300, 400]);
		lifes -= 1;
		isHurt = false;
		checkGameOver();
	}
};

Player.prototype.get = function () {
	return [this.playerX, this.playerY];
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
	checkCollect();
};


var player = new Player;
var gem = new Gem;
var firstEnemy = new Enemy;
var secondEnemy = new Enemy;
var thirdEnemy = new Enemy;

allEnemies.push(firstEnemy);
allEnemies.push(secondEnemy);
allEnemies.push(thirdEnemy);


function checkCollect() {
	if (gem.get()[0] === player.get()[0] &&
		(player.get()[1] - gem.get()[1]) < 15 &&
		(player.get()[1] - gem.get()[1]) > 0) {
		playerScore += 1;
		gemCollected = true;
	}
}

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


/*count down timer 3:00 minutes */
// change next line if you want to change time
document.getElementById('timer').innerHTML = '03' + ':' + '00';

function countDown() {
	var presentTime = document.getElementById('timer').innerHTML;
	var timeArray = presentTime.split(/[:]+/);
	var minutes = timeArray[0];
	var seconds = secondsCheck((timeArray[1] - 1));
	if (seconds == 59) {
		minutes = minutes - 1;
	}
	if (minutes < 0) displayGameOver();

	document.getElementById('timer').innerHTML =
		'0' + minutes + ':' + seconds;
	setTimeout(countDown, 1000);
}

function secondsCheck(sec) {
	if (sec < 10 && sec >= 0) {
		sec = '0' + sec;
	}
	if (sec < 0) {
		sec = '59';
	}
	return sec;
}

function checkGameOver() {
	if (lifes === 0) {
		displayGameOver();
	}
}

function displayGameOver() {
	//dosomething
}