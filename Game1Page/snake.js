//board for snake
var blockSize= 25;
var rows= 20;
var cols= 20;
var board;
var context;

//snake body
var snakeX= blockSize * 5;
var snakeY= blockSize * 5;

var velocityX= 0;
var velocityY= 0;

var snakeBody= [];

//food
var foodX;
var foodY;

//points
var points = 0;
var level = 0;

//game over rules
var gameOver = false; 

window.onload = function() {
    document.getElementById("replayButton").addEventListener("click", replayGame); //replay button
    
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d"); 

    placeFood();
    document.addEventListener("keyup", changeDirection);
    //update();
    setInterval(update, 1000/10); //updated every 100ms
}

var foodImages = [
  'resources/foodPeach.png', 
  'resources/foodBanana.png', 
  'resources/foodApple.png', 
  'resources/foodCherries.png'];

// Variable for keeping track of active image
var activeFoodImage;

var snakeHeadImage = new Image();
snakeHeadImage.src = "resources/snakeHead.png";
// Array for img snake tail
var snakeTailImages = [
  new Image(), // Img first segment
  new Image(), // Img scnd segment
  // Voeg hier meer afbeeldingen toe voor extra staartsegmenten indien nodig
];
// Load image for snake tail
for (let i = 0; i < snakeTailImages.length; i++) {
  snakeTailImages[i].src = "resources/snakeTail.png";
}

function update() {
  if (gameOver) {
    return;
  }

  // Background image
  var backgroundImage = new Image();
  backgroundImage.src = "resources/backgroundGrass.jpg";

  // Wait for image to load
  backgroundImage.onload = function () {
    // Draw background
    function drawBackground() {
      context.drawImage(backgroundImage, 0, 0, board.width, board.height);

      // Draw borders
      context.strokeStyle = "black";
      context.lineWidth = 2;
      context.strokeRect(0, 0, board.width, board.height);
    }

    drawBackground();

    drawPlayerAndFood();
  };

  // Draw player and food
  function drawPlayerAndFood() {
    context.fillStyle = "black";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++){
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }  //draws new bodypart for every food eaten

    //"game over" conditions
    if (snakeX < 0 || snakeX > cols*blockSize || snakeY < 0 || snakeY > rows*blockSize) {
        gameOver= true;
    }
    for (let i = 0; i < snakeBody.length; i++){
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
        }
    }

    // Random image for food
    if (!activeFoodImage) {
      activeFoodImage = foodImages[Math.floor(Math.random() * foodImages.length)];
    }

    // Draw new image-object for food
    var foodImage = new Image();
    foodImage.src = activeFoodImage;

    // draw food as image
    context.drawImage(foodImage, foodX, foodY, blockSize, blockSize);

    if (snakeX === foodX && snakeY === foodY) {
      snakeBody.push([foodX, foodY]);
      placeFood();
        keepPoints();

      // Pick random image for food
      activeFoodImage = foodImages[Math.floor(Math.random() * foodImages.length)];
    }

    for (let i = snakeBody.length - 1; i > 0; i--) {
      snakeBody[i] = snakeBody[i - 1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY]; 
    }

    if (gameOver) {
        document.getElementById("gameOverMessage").textContent= "Game Over !"
        return;
    }
  }
}

function placeFood() {
    foodX= Math.floor(Math.random() * cols) * blockSize;
    foodY= Math.floor(Math.random() * rows) * blockSize;
}

function changeDirection(e) {
  // function for moving snake
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

function replayGame() {
    // function for resetting game
    gameOver = false;
    points = 0;
    level = 1;
    document.getElementById("points").textContent = points;
    document.getElementById("level").textContent = "Level" + level;
    snakeX = blockSize * 5;
    snakeY = blockSize * 5;
    velocityX = 0;
    velocityY = 0;
    snakeBody = [];
    placeFood();
    document.getElementById("gameOverMessage").textContent = "";
    clearInterval(interval);

    //start new game loop
    setInterval(update, 1000/10);
}

// for updating level based on points earned
function updateLevel() {
  if (points >= 100) {
    level = 2;
  } 
  else if (points >=200 ) {
    level = 3;
  }
  else if (points >=300 ) {
    level = 4;
  }
  else if (points >=400 ) {
    level = 5;
  }
  else if (points >=500 ) {
    level = 4;
  }
  else if (points >=600 ) {
    level = 5;
  }

  document.getElementById("level").textContent = "Level " + level;
}

function updateProfile() {
  localStorage.setItem("points", points);
  var level = Math.floor(points / 100) + 1;
  document.getElementById("points").textContent = "Points " + points;
  document.getElementById("level").textContent = "Level " + level;
}

function keepPoints() {
  points += 1;
  document.getElementById("points").textContent = points;
  updateLevel;
  localStorage.setItem("points", points);
  updateProfile();
}