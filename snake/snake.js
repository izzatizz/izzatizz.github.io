// Define canvas and context
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

// Define game variables
var boardWidth = canvas.width;
var boardHeight = canvas.height;
var blockSize = 10;
var score = 0;
var intervalId;
var snake = [{
	x: boardWidth/2,
	y: boardHeight/2
}];
var food = {
	x: 0,
	y: 0
};
var direction = '';
var gameOver = false;

// Draw a block
function drawBlock(x, y) {
	ctx.fillRect(x*blockSize, y*blockSize, blockSize, blockSize);
}

// Draw the snake
function drawSnake() {
	ctx.fillStyle = 'green';
	snake.forEach(function(block) {
		drawBlock(block.x, block.y);
	});
}

// Draw the food
function drawFood() {
	ctx.fillStyle = 'red';
	drawBlock(food.x, food.y);
}

// Move the snake
function moveSnake() {
	var head = {
		x: snake[0].x,
		y: snake[0].y
	};

	switch(direction) {
		case 'up':
			head.y -= 1;
			break;
		case 'down':
			head.y += 1;
			break;
		case 'left':
			head.x -= 1;
			break;
		case 'right':
			head.x += 1;
			break;
	}

	snake.unshift(head);
	snake.pop();
}

// Check for collisions with walls or self
function checkCollisions() {
	var head = snake[0];

	if (head.x < 0 || head.x >= boardWidth/blockSize || head.y < 0 || head.y >= boardHeight/blockSize) {
		gameOver = true;
	}

	for (var i = 1; i < snake.length; i++) {
		if (head.x === snake[i].x && head.y === snake[i].y) {
			gameOver = true;
		}
	}
}

// Check for collision with food
function checkFoodCollision() {
	var head = snake[0];

	if (head.x === food.x && head.y === food.y) {
		score += 1;
		document.getElementById('score').innerHTML = 'Score: ' + score;
		generateFood();
		var tail = {
			x: snake[snake.length-1].x,
			y: snake[snake.length-1].y
		};
		snake.push(tail);
	}
}

// Generate new food location
function generateFood() {
	food.x = Math.floor(Math.random()*(boardWidth/blockSize));
	food.y = Math.floor(Math.random()*(boardHeight/blockSize));
}

// Handle key press events
document.addEventListener('keydown', function(event) {
	switch(event.keyCode) {
		case 38:
			if (direction !== 'down') {
				direction = 'up';
			}
			break;
		case 40:
			if (direction !== 'up') {
				direction = 'down';
			}
			break;
		case 37:
			if (direction !== 'right') {
				direction = 'left';
			}
			break;
		case 39:
			if (direction !== 'left') {
				direction = 'right';
			}
			break;
	}
});

// Initialize game
generateFood();
intervalId = setInterval(function() {
	ctx.clearRect(0, 0, boardWidth, boardHeight);
	drawSnake();
	drawFood();
	moveSnake();
	checkCollisions();
	checkFoodCollision();

	if (gameOver) {
		clearInterval(intervalId);
		document.getElementById('gameover').innerHTML = 'Game Over';
		document.getElementById('retry').style.display = 'block';
	}

}, 100);

// Handle retry button click event
document.getElementById('retry').addEventListener('click', function() {
	location.reload();
});

