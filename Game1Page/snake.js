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

var snakeBody = [];

// Food
var foodX;
var foodY;
var activeFoodImage;

// Points
var points = 0;
var level = 1;

// Game over rules
var gameOver = false; 
var gameLoopInterval = null;

var foodImages = [
  "resources/foodPeach.png", 
  "resources/foodBanana.png", 
  "resources/foodApple.png", 
  "resources/foodCherries.png"
];

var snakeHeadImage = new Image();
snakeHeadImage.src = "resources/Snake_Hoofd_rect848-9.png";

var snakeTailImages = [new Image(), new Image()];
// Load image for snake tail
for (let i = 0; i < snakeTailImages.length; i++) {
  snakeTailImages[i].src = "resources/Snake_Blokje_rect848.png";
}

var backgroundMusic = document.getElementById("backgroundMusic");

// Start game
window.onload = function() {
  board = document.getElementById("board");
  board.height = rows * blockSize;
  board.width = cols * blockSize;
  context = board.getContext("2d"); 

  var replayButton;

  placeFood();
  document.addEventListener("keyup", changeDirection);
  gameLoopInterval = setInterval(update, 1000/10);
  preloadImages();

  replayButton = document.getElementById("replayButton");
  replayButton.addEventListener("click", replayGame); 

  backgroundMusic.play();
}

//Functions
function update() {
  var context = board.getContext("2d");

  var newSnakeX = snakeX + velocityX * blockSize;
  var newSnakeY = snakeY + velocityY * blockSize;

  if (newSnakeX < 0 || newSnakeX >= cols * blockSize || newSnakeY < 0 || newSnakeY >= rows * blockSize) {
    gameOver = true;
  }

  // Update snake body segments
  snakeBody.unshift([snakeX, snakeY]); // Add the new snake head position to the front
  if (snakeBody.length > points + 1) {
    snakeBody.pop(); // Remove the last segment if the snake hasn't eaten food
  }

  // Check for collisions with the snake's body
  for (let i = 1; i < snakeBody.length; i++) {
    if (newSnakeX === snakeBody[i][0] && newSnakeY === snakeBody[i][1]) {
      gameOver = true;
      break;
    }
  }

  if (gameOver) {
    clearInterval(gameLoopInterval);
    context.fillStyle = "black";
    context.font = "30px Arial";
    context.textAlign = "center";
    context.fillText("Game Over!", board.width / 2, board.height / 2);
    showReplayButton();
    return;
  }

  if (snakeX === foodX && snakeY === foodY) {
    snakeBody.push([snakeX, snakeY]);
    placeFood();
    keepPoints();
  } else {
    snakeX = newSnakeX;
    snakeY = newSnakeY;
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
  context.clearRect(0, 0, board.width, board.height);

  context.drawImage(backgroundImage, 0, 0, board.width, board.height);

  for (let i = 0; i < snakeBody.length - 1; i++) {
    var tailAngle = getAngle(snakeBody[i][0] - snakeBody[i + 1][0], snakeBody[i][1] - snakeBody[i + 1][1]);
    drawRotatedImage(snakeTailImages[i % snakeTailImages.length], snakeBody[i][0], snakeBody[i][1], blockSize, blockSize, tailAngle);
  }

  var angle = getAngle(velocityX, velocityY);
  drawRotatedImage(snakeHeadImage, snakeX, snakeY, blockSize, blockSize, angle);

  if (!activeFoodImage) {
    activeFoodImage = foodImages[Math.floor(Math.random() * foodImages.length)];
  }

  // New image object for food
  var foodImage = new Image();
  foodImage.src = activeFoodImage;

  // Draw food as image
  context.drawImage(foodImage, foodX, foodY, blockSize, blockSize);

/*
  var foodImage = new Image();
  foodImage.src = activeFoodImage;
  foodImage.onload = function() {
    context.drawImage(foodImage, foodX, foodY, blockSize, blockSize);
  }; */
}

function placeFood() {
  foodX= Math.floor(Math.random() * cols) * blockSize;
  foodY= Math.floor(Math.random() * rows) * blockSize;
  activeFoodImage = foodImages[Math.floor(Math.random() * foodImages.length)];

    var foodSound = document.getElementById("foodSound");
  foodSound.play();
}

function changeDirection(e) {
  // Function for moving snake
    if (e.code == "KeyW" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    }
    else if (e.code == "KeyS" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }
    else if (e.code == "KeyA" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }
    else if (e.code == "KeyD" && velocityX != -1) {
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
  hideReplayButton();

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

function preloadImages() {
  var images = [backgroundImage, snakeHeadImage];

  for (let i = 0; i < snakeTailImages.length; i++) {
    images.push(snakeTailImages[i]);
  }

  for (let i = 0; i < foodImages.length; i++) {
    var img = new Image();
    img.src = foodImages[i];
    images.push(img);
  }

  var loadedImages = 0;
  for (let i = 0; i < images.length; i++) {
    images[i].onload = function() {
      loadedImages++;

      if (loadedImages === foodImages.length) {
        // Start the game after all images are loaded
        update();
      }
    };
  }
}

function showReplayButton() {
  replayButton.style.visibility = "visible";
}

function hideReplayButton() {
  replayButton.style.visibility = "hidden"
}

function getAngle(dx, dy) {
  var angle = Math.atan2(dy, dx);
  angle += Math.PI / 2;
  return angle;
}

function drawRotatedImage(image, x, y, width, height, angle) {
  var context = board.getContext("2d");
  context.save();
  context.translate(x + width / 2, y + height / 2);
  context.rotate(angle);
  context.drawImage(image, -width / 2, -height / 2, width, height);
  context.restore();
}