var allEnemies = [];
var gemsCollected = 0;
var isGemCollected = false;
var lives = 3;
var score = 0;
var isHurt = false; // isHurt variable for player touches an enemy .. it changes in engine.js file. line 99
var startCharacter = 'images/char-boy.png';
var countDownTimer;
var isGameOver = false;
document.getElementById('lives').innerHTML = lives;
document.getElementById('gems').innerHTML = gemsCollected;
var event;


// General purpose function.
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
	if (isGemCollected === true) {
		this.gemX = randomChoice([0, 100, 200, 300, 400]);
		this.gemY = randomChoice([59, 149, 230]);
		this.sprite = 'images/' + randomChoice(['Gem-Blue', 'Gem-Orange', 'Gem-Green']) + '.png';
		isGemCollected = false;
	}
	// to generate a new gem if gem position === player position.
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
	this.sprite = 'images/' +
		randomChoice(['enemy-bug-red', 'enemy-bug-blue', 'enemy-bug-green']) +
		'.png';
	this.speed = Math.floor(Math.random() * 100) + 250;
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
	this.sprite = startCharacter;
	this.playerY = 400;
	this.playerX = randomChoice([0, 100, 200, 300, 400]);
};

Player.prototype.render = function () {
	ctx.drawImage(Resources.get(this.sprite), this.playerX, this.playerY);
};

Player.prototype.update = function () {
	// case touch an enemy.
	if (isHurt === true) {
		this.playerY = 400;
		this.playerX = randomChoice([0, 100, 200, 300, 400]);
		lives -= 1;
		document.getElementById('lives').innerHTML = lives;
		isHurt = false;
		checkGameOver();
	}
	// case player raches top.
	if (this.playerY === -15) {
		score += 1;
		document.getElementById('score').innerHTML = score;
		checkWin();
		this.playerY = 400;
		this.playerX = randomChoice([0, 100, 200, 300, 400]);
	}
};

Player.prototype.get = function () {
	return [this.playerX, this.playerY];
};

Player.prototype.updateCharacter = function () {
	this.sprite = startCharacter;
};

Player.prototype.handleInput = function (key) {
	// if () {
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
		// }
		checkCollectGems();
	}
};


var player = new Player;
var firstEnemy = new Enemy;
var secondEnemy = new Enemy;
var thirdEnemy = new Enemy;
var gem = new Gem;

allEnemies.push(firstEnemy);
allEnemies.push(secondEnemy);
allEnemies.push(thirdEnemy);
// document.addEventListener('keyup', keyPress, false);

function checkCollectGems() {
	if (gem.get()[0] === player.get()[0] &&
		(player.get()[1] - gem.get()[1]) < 15 &&
		(player.get()[1] - gem.get()[1]) > 0) {
		gemsCollected += 1;
		document.getElementById('gems').innerHTML = gemsCollected;
		isGemCollected = true;
	}
}

// This listens for key presses and sends the keys to your



/*count down timer 3:00 minutes */
// change next line if you want to change time
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
		minutes + ':' + seconds;
	countDownTimer = setTimeout(countDown, 1000);
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
	// No need to check timer.
	//timer execute displayGameOver() when it's zero
	if (lives === 0) {
		displayGameOver();
		isGameOver = true;
		delete player;
		resetBoard();
	}
}

function displayGameOver() {
	clearTimeout(countDownTimer);
	openModal(loseModal);
}

function displayGameWinner() {
	clearTimeout(countDownTimer);
	openModal(winModal);
	isGameOver = true;
	resetBoard();
}

event = document.addEventListener('keyup', keyPress(), false);

function startGame() {
	isGameOver = false;
	player = new Player;
	closeModal(startingWindow);
	closeModal(loseModal);
	closeModal(winModal);
	// resetBoard();
	countDown();
}

function keyPress() {
	return function (e) {
		var allowedKeys = {
			37: 'left',
			38: 'up',
			39: 'right',
			40: 'down'
		};
		player.handleInput(allowedKeys[e.keyCode]);
	};
}

function checkWin() {
	if (score === 10) displayGameWinner();
}

function resetBoard() {
	// clearTimeout(countDownTimer);
	lives = 3;
	document.getElementById('lives').innerHTML = lives;
	gemsCollected = 0;
	document.getElementById('gems').innerHTML = gemsCollected;
	score = 0;
	document.getElementById('score').innerHTML = score;
	document.getElementById('timer').innerHTML = '03' + ':' + '00';
}