// Variables
// Board for snake
var blockSize= 25;
var rows= 20;
var cols= 20;
var board;
var context;

var backgroundImage = new Image();
backgroundImage.src = "resources/backgroundGrass.jpg";

// Snake body
var snakeX= blockSize * 5;
var snakeY= blockSize * 5;

var velocityX= 0;
var velocityY= 0;

var snakeBody= [];

// Food
var foodX;
var foodY;

// Points
var points = 0;
var level = 1;

// Game over rules
var gameOver = false; 
var gameLoopInterval = null;

window.onload = function() {
  document.getElementById("replayButton").addEventListener("click", replayGame); //replay button
  
  board = document.getElementById("board");
  board.height = rows * blockSize;
  board.width = cols * blockSize;
  context = board.getContext("2d"); 

  placeFood();
  document.addEventListener("keyup", changeDirection);
  gameLoopInterval = setInterval(update, 1000/10); 
}

var foodImages = [
  "resources/foodPeach.png", 
  "resources/foodBanana.png", 
  "resources/foodApple.png", 
  "resources/foodCherries.png"
];

var snakeHeadImage = new Image();
snakeHeadImage.src = "resources/snakeHead.png";

// Array for image snake tail
var snakeTailImages = [new Image(), new Image()];
// Load image for snake tail
for (let i = 0; i < snakeTailImages.length; i++) {
  snakeTailImages[i].src = "resources/snakeTail.png";
}

// Functions
function update() {
  var context = board.getContext("2d");
  snakeX += velocityX * blockSize;
  snakeY += velocityY * blockSize; 
    
  if (snakeX < 0 || snakeX >= cols * blockSize || snakeY < 0 || snakeY >= rows * blockSize) {
      gameOver= true;
    }

  for (let i = 0; i < snakeBody.length; i++) {
    if (snakeX === snakeBody[i][0] && snakeY === snakeBody[i][1]) {
      gameOver = true;
      break;
    }
  }

    if (gameOver) {
      clearInterval(gameLoopInterval);
      context.fillStyle = "black";
      context.font = "30px Arial";
      context.textAlign = "center";
      context.fillText("Game Over!", board.width / 2, board.height);
      return;
    }

    if (snakeX === foodX && snakeY === foodY) {
      snakeBody.push([foodX, foodY]);
      placeFood();
      keepPoints();
    }

    // Moving snake body segments
    var previousSegmentX = snakeX;
    var previousSegmentY = snakeY;

    for (let i = 0; i < snakeBody.length; i++) {
      var tempX = snakeBody[i][0];
      var tempY = snakeBody[i][1];
      snakeBody[i][0] = previousSegmentX;
      snakeBody[i][1] = previousSegmentY;
      previousSegmentX = tempX;
      previousSegmentY = tempY;
    }
    
  drawBackground();
  drawPlayerAndFood();
}

function drawBackground() {
  var context = board.getContext("2d");
  context.clearRect(0, 0, board.width, board.height);

  context.drawImage(backgroundImage, 0, 0, board.width, board.height);
  
  // Draw borders
  context.strokeStyle = "black";
  context.lineWidth = 2;
  context.strokeRect(0, 0, board.width, board.height);
}

activeFoodImage = foodImages[Math.floor(Math.random() * foodImages.length)];

function drawPlayerAndFood() {
  var context = board.getContext("2d");
  console.log("drawing player and food ..")
  context.clearRect(0, 0, board.width, board.height);

  context.drawImage(backgroundImage, 0, 0, board.width, board.height);

  context.drawImage(snakeHeadImage, snakeX, snakeY, blockSize, blockSize);

  for (let i = 0; i < snakeBody.length; i++) {
    context.drawImage(snakeTailImages[i % (snakeTailImages.length)],snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
  
  }

  var foodImage = new Image();
  foodImage.src = activeFoodImage;
  
  context.drawImage(foodImage, foodX, foodY, blockSize, blockSize);

  if (!activeFoodImage) {
    activeFoodImage = foodImages[Math.floor(Math.random() * foodImages.length)];
  }
}

function placeFood() {
  foodX= Math.floor(Math.random() * cols) * blockSize;
  foodY= Math.floor(Math.random() * rows) * blockSize;
}

function changeDirection(e) {
  // Function for moving snake
    if (e.code == "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    }
    else if (e.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }
    else if (e.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }
    else if (e.code == "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }  
}

function updateLevel() {
  if (points >= 10 && points < 20){
    level = 2;
  }
  else if (points >= 20 && points < 30) {
    level = 3;
  }
  else if (points >= 30 && points < 40) {
    level = 4;
  }
  else if (points >= 40 && points < 50) {
    level = 5;
  }
  else if (points >= 50 && points < 60) {
    level = 6;
  }
  else if (points >= 60) {
    level = "max level !!!!!!!!";
  }
  document.getElementById("level").textContent = "Level " + level;
}

function replayGame() {
  // Function for resetting game
  gameOver = false;
  context.clearRect(0, 0, board.width, board.height);
  points = 0;
  level = 1;
  document.getElementById("points").textContent = points;
  document.getElementById("level").textContent = "Level: " + level;
  snakeX = blockSize * 5;
  snakeY = blockSize * 5;
  velocityX = 0;
  velocityY = 0;
  snakeBody = [];
  placeFood();
  clearInterval(gameLoopInterval);

  gameLoopInterval = setInterval(update, 1000/10)
}

function keepPoints() {
  points += 1;
  document.getElementById("points").textContent = points;
  
  var pointsPerLevel = 10; 
  var progress = (points % pointsPerLevel) * (100 / pointsPerLevel);
  document.getElementById("levelBar").style.width = progress + "%";
  
  updateLevel();
  localStorage.setItem("points", points);
}