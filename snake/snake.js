var canvas = document.getElementById('gameboard');
var ctx = canvas.getContext('2d');

var boardWidth = canvas.width;
var boardHeight = canvas.height;

var snake = [
	{x: 10, y: 10},
	{x: 9, y: 10},
	{x: 8, y: 10}
];

var direction = 'right';

function drawSnake() {
	ctx.fillStyle = 'green';
	snake.forEach(function(segment) {
		ctx.fillRect(segment.x * 10, segment.y * 10, 10, 10);
	});
}

function moveSnake() {
	var head = {x: snake[0].x, y: snake[0].y};
	
	if (direction === 'right') {
		head.x++;
	} else if (direction === 'left') {
		head.x--;
	} else if (direction === 'up') {
		head.y--;
	} else if (direction === 'down') {
		head.y++;
	}
	
	snake.unshift(head);
	snake.pop();
}

function gameLoop() {
	ctx.clearRect(0, 0, boardWidth, boardHeight);
	drawSnake();
	moveSnake();
}

setInterval(gameLoop, 100);

document.addEventListener('keydown', function(event) {
	if (event.keyCode === 37 && direction !== 'right') {
		direction = 'left';
	} else if (event.keyCode === 38 && direction !== 'down') {
		direction = 'up';
	} else if (event.keyCode === 39 && direction !== 'left') {
		direction = 'right';
	} else if (event.keyCode === 40 && direction !== 'up') {
		direction = 'down';
	}
});
function checkCollisions() {
	if (snake[0].x < 0 || snake[0].x >= boardWidth/10 ||
		snake[0].y < 0 || snake[0].y >= boardHeight/10) {
		clearInterval(intervalId);
		document.getElementById('gameover').innerHTML = 'Game Over!';
	}
}

var intervalId = setInterval(function() {
	ctx.clearRect(0, 0, boardWidth, boardHeight);
	drawSnake();
	moveSnake();
	checkCollisions();
}, 100);
var food = {x: 0, y: 0};

function generateFood() {
	food.x = Math.floor(Math.random() * boardWidth/10) *10;
    food.y = Math.floor(Math.random() * boardHeight/10) * 10;
    }
    function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, 10, 10);
    }
    
    function checkFoodCollision() {
    if (snake[0].x === food.x && snake[0].y === food.y) {
    snake.push({});
    generateFood();
    }
    }
    
    generateFood();
    
    var intervalId = setInterval(function() {
    ctx.clearRect(0, 0, boardWidth, boardHeight);
    drawSnake();
    drawFood();
    moveSnake();
    checkCollisions();
    checkFoodCollision();
    }, 100);
