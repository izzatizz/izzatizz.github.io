const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');
const boardWidth = canvas.width;
const boardHeight = canvas.height;

let snake = [{
	x: boardWidth/2,
	y: boardHeight/2
}];
let food = {
	x: 0,
	y: 0
};
let direction = '';
let gameOver = false;
let score = 0;
function drawSnake() {
	for (let i = 0; i < snake.length; i++) {
		ctx.fillStyle = 'green';
		ctx.fillRect(snake[i].x, snake[i].y, 10, 10);
	}
}
function generateFood() {
	food.x = Math.floor(Math.random() * (boardWidth - 10) / 10) * 10;
	food.y = Math.floor(Math.random() * (boardHeight - 10) / 10) * 10;
}
function drawFood() {
	ctx.fillStyle = 'red';
	ctx.fillRect(food.x, food.y, 10, 10);
}
function moveSnake() {
	let head = {
		x: snake[0].x,
		y: snake[0].y
	};

	if (direction === 'up') {
		head.y -= 10;
	} else if (direction === 'down') {
		head.y += 10;
	} else if (direction === 'left') {
		head.x -= 10;
	} else if (direction === 'right') {
		head.x += 10;
	}

	snake.unshift(head);
	snake.pop();
}
function checkCollisions() {
	if (snake[0].x < 0 || snake[0].x >= boardWidth || snake[0].y < 0 || snake[0].y >= boardHeight) {
		gameOver = true;
	}

	for (let i = 1; i < snake.length; i++) {
		if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
			gameOver = true;
		}
	}
}
function checkFood() {
	if (snake[0].x === food.x && snake[0].y === food.y) {
		score++;
		generateFood();
		snake.push({
			x: snake[snake.length - 1].x,
			y: snake[snake.length - 1].y
		});
	}
}
function updateScore() {
	document.getElementById('score').textContent = 'Score: ' + score;
}
function resetGame() {
	snake = [{
		x: boardWidth/2,
		y: boardHeight/2
	}];
	generateFood();
	direction = '';
	gameOver = false;
	score = 0;
}
function gameLoop() {
	if (!gameOver) {
		ctx.clearRect(0, 0, boardWidth, boardHeight);
		moveSnake();
		checkCollisions();
		checkFood();
		updateScore();
		drawSnake();
		drawFood();
		requestAnimationFrame(gameLoop);
	} else {
		alert('Game Over!');
		resetGame();
	}
}
document.addEventListener('keydown', function(event) {
	if (event.code === 'ArrowUp' && direction !== 'down') {
		direction = 'up';
	} else if (event.code === 'ArrowDown' && direction !== 'up') {
		direction = 'down';
	} else if (event.code === 'ArrowLeft' && direction !== 'right') {
		direction = 'left';
	} else if (event.code === 'ArrowRight' && direction !== 'left') {
		direction = 'right';
	}
});

document.getElementById('reset-button').addEventListener('click', function() {
	resetGame();
});
