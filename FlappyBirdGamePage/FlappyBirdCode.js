var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;

var pipex = windowWidth/3*2;
var pipex2 = windowWidth/4*5;
var pipey_1 = -(windowHeight/8*3);
var pipey_2 = -(windowHeight/8*3);
var pipey2_1 = windowHeight/2;
var pipey2_2 = windowHeight/2;

var birdx = windowWidth/4;
var birdy = windowHeight/2;
var fallingspeed = 2;

var points = 0;
var pointsx = windowWidth/12*11;

var cloudx = windowWidth/3;
var cloudx2 = windowWidth;

var sunx = windowWidth/12*11;
var speed = -0.1 * windowWidth/600;
var pipeSpeed = 1 * windowWidth/600;

function setup() {
  resizeElements();
  createCanvas(windowWidth,windowHeight);
}

function windowResized() {
  resizeElements();
  resizeCanvas(windowWidth, windowHeight);
}

function resizeElements() {
  windowWidth = window.innerWidth;
  windowHeight = window.innerHeight;
  var canvasRatio = windowWidth / 600; // Calculate the ratio based on the original canvas width
  
  // Resize the elements relative to the canvas ratio
  pipex = 400 * canvasRatio;
  pipex2 = 750 * canvasRatio;
  pipey_1 = -150 * canvasRatio;
  pipey_2 = -150 * canvasRatio;
  pipey2_1 = 200 * canvasRatio;
  pipey2_2 = 200 * canvasRatio;

  birdx = 150 * canvasRatio;
  birdy = 200 * canvasRatio;
  fallingspeed = 2;

  pointsx = 550 * canvasRatio;

  cloudx = 200 * canvasRatio;
  cloudx2 = 600 * canvasRatio;

  sunx = 550 * canvasRatio;
  speed = -0.1 * canvasRatio;
  pipeSpeed = 1 * canvasRatio;
}

function draw () {
 //Background
  //Earth
    noStroke();
    if (sunx < windowWidth/2) {
      r_Sky = map (sunx,windowWidth/2,0,58,64);
      g_Sky = map (sunx,windowWidth/2,0,153,79);
      b_Sky = map (sunx,windowWidth/2,0,68,36);
      fill(r_Sky,g_Sky,b_Sky);
    }else{
      fill(58,153,68);
    }
    rect(0,windowHeight/4*3,windowWidth,windowHeight/4);
  
  //Sky
    noStroke();
    if (sunx < 300) {
      r_Sky = map (sunx,windowWidth/2,0,135,20);
      g_Sky = map (sunx,windowWidth/2,0,206,24);
      b_Sky = map (sunx,windowWidth/2,0,235,82);
      fill(r_Sky,g_Sky,b_Sky);
    }else{
      fill(135,206,235);
    }
    rect(0,0,windowWidth,windowHeight/4*3);
  
  //Sun
    stroke(0);
  if (speed == 1) {
    fill(253,232,172);    //Moon
  }else{
  fill(249,215,28);      //Sun
  }
    ellipse(sunx,windowHeight/8,windowHeight/16*3,windowHeight/16*3);
  
    sunx = sunx + speed;
  
  if (sunx <= -37.5) {
    speed = 0.1;
  }else if (sunx >= 637.5) {
    speed = -0.1;
  }
    
  //Clouds
    noStroke();
    if (sunx < 300) {
      r_Sky = map (sunx,windowWidth/2,0,255,70);
      g_Sky = map (sunx,windowWidth/2,0,255,91);
      b_Sky = map (sunx,windowWidth/2,0,255,112);
      fill(r_Sky,g_Sky,b_Sky);
    }else{
      fill(255,255,255,200);
    }
  
    ellipse(cloudx,60,180,90); 
    ellipse(cloudx + 80,40,50,50);
    ellipse(cloudx - 70,30,50,50);
    ellipse(cloudx - 30,25,60,40);
    ellipse(cloudx + 40,100,70,50);

    ellipse(cloudx2,110,180,90);
    ellipse(cloudx2 + 80,90,50,50);
    ellipse(cloudx2 - 70,80,50,50);
    ellipse(cloudx2 - 30,75,60,40);
    ellipse(cloudx2 + 40,150,70,50);

  cloudx = cloudx - 0.5;
  if (cloudx < -75) {
    cloudx = windowWidth;
  }
  
  cloudx2 = cloudx2 - 0.25;
  if (cloudx2 < -75) {
    cloudx2 = windowWidth;
  }



//Bird
  //Body
  stroke(0);
  fill(252,214,71);
  ellipse(windowWidth/12*3,birdy,windowWidth/12,windowHeight/80*9);
 
  //Eye
  stroke(0,100);
  fill(0,0,255);
  ellipse(windowWidth/600*165,birdy-windowHeight/40,windowHeight/50,windowHeight/50);
  noStroke();
  fill(255,255,255);
  ellipse(windowWidth/600*167,birdy-windowHeight/400*9,windowWidth/200,windowWidth/200);
 
  //Beak
  stroke(0);
  fill(255,0,0);
  triangle(windowWidth/600*173,birdy-windowHeight/40,windowWidth/600*185,birdy,windowWidth/600*173,birdy+windowHeight/40);
  strokeWeight(2);
  line(windowWidth/600*175,birdy-windowHeight/400 ,windowWidth/600*183,birdy);
 
  //Wing
  strokeWeight(1);
  stroke(0);
  fill(0,255,0);
  triangle(windowWidth/5,birdy+windowHeight/80*3,windowWidth/600*165,birdy,windowWidth/4,birdy+windowHeight/20);
  
  birdy = birdy + fallingspeed;



  
//Pipes
  //Pipe up
  stroke(0);
  fill(255,189,27);
  rect(pipex,pipey_1,windowWidth/8,windowHeight/10*6);
  rect(pipex2,pipey_2,windowWidth/8,windowHeight/10*6);
  
//Pipe down
  stroke(0);
  fill(255,189,27);
  rect(pipex,pipey2_1,windowWidth/8,windowHeight/10*6);
  rect(pipex2,pipey2_2,windowWidth/8,windowHeight/10*6);
  
  pipex = pipex - pipeSpeed;
  pipex2 = pipex2 - pipeSpeed;
  
  if (pipex <= -(windowWidth/8)) {
    pipex = windowWidth;
  }else if (pipex2 <= -(windowWidth/8)) {
    pipex2 = windowWidth;
  }
  
  if (pipex == windowWidth) {
    pipey_1 = random(-(windowHeight/400*190),0);
  }else if(pipex2 == windowWidth) {
    pipey_2 = random(-(windowHeight/400*190),0);
  }
    pipey2_1 = pipey_1 + windowHeight/40*39;
    pipey2_2 = pipey_2 + windowHeight/40*39;

  
  
//Points
  fill(241,255,28);
  textSize(windowHeight/8);
  var marginBird = 2;
  if (pipex + windowWidth/600*75 <= birdx + marginBird && pipex + windowWidth/600*75 >= birdx - marginBird || pipex2 + windowWidth/600*75 >= birdx - marginBird && pipex2 + windowWidth/600*75 <= birdx + marginBird) {
    points = points + 1;
    text(points,pointsx,windowHeight/8);
  }else{
  text(points,pointsx,windowHeight/8);
  }
  if (points == 50) {
    noLoop();
    background(random(155,255),random(100,255),random(0,155));
    fill(0,random(0,255),random(0,255));
    text("CONGRATS",windowWidth/600*165,windowHeight/4000*90);
    textSize(windowHeight/40*3);
    fill(0,random(0,255),random(0,255));
    text("YOU REACHED MAXIMUM POINTS",windowWidth/600*55,windowHeight/2);
    fill(0);
    textSize(windowHeight/40);
    text("PRESS SPACE TO PLAY AGAIN",windowWidth/600*230,windowHeight/400*220);
    text("MADE BY: JEROEN GERAATS",windowWidth/600*450,windowHeight/400*390);
  }else if (points >= 100000000) {
    pointsx = windowWidth/600*325;
  }else if (points >= 10000000) {
    pointsx = windowWidth/600*353;
  }else if (points >= 1000000) {
    pointsx = windowWidth/600*381;
  }else if (points >= 100000) {
    pointsx = windowWidth/600*409;
  }else if (points >= 10000) {
    pointsx = windowWidth/600*438;
  }else if (points >= 1000) {
    pointsx = windowWidth/600*466;
  }else if (points >= 100) {
    pointsx = windowWidth/600*494;
  }else if (points >= 10) {
    pointsx = windowWidth/600*522;
  }
  
  
//Gameover
  //Ground
  if (birdy > windowHeight){
      noLoop();
      fill(0,0,0);
      textSize(windowHeight/20);
      text("PRESS SPACE TO START",windowWidth/600*190,windowHeight/2);
      textSize(windowHeight/50);
      text("LEFT MOUSE CLICK TO FLY",windowWidth/12*5,windowHeight/40*21);
  
  //Left Pipe Up
  }else if(birdy <= (pipey_1 + windowHeight/400*222.5) && ((birdx >= pipex-(windowWidth/600*25) && birdx <= (pipex + windowWidth/600*75)) || (birdx >= pipex && birdx <= (pipex + windowWidth/600*75)))) {
    noLoop();
    fill(0,0,0);
    textSize(windowHeight/20);
    text("PRESS SPACE TO START",windowWidth/600*190,windowHeight/2);
    textSize(windowHeight/50);
    text("LEFT MOUSE CLICK TO FLY",windowWidth/12*5,windowHeight/40*21);

  //Left Pipe Down
  }else if(birdy >= (pipey2_1 - windowHeight/400*22.5) && ((birdx >= pipex-(windowWidth/600*25) && birdx <= (pipex + windowWidth/600*75)) || (birdx >= pipex && birdx <= (pipex + windowWidth/600*75)))) {
    noLoop();
    fill(0,0,0);
    textSize(windowHeight/20);
    text("PRESS SPACE TO START",windowWidth/600*190,windowHeight/2);
    textSize(windowHeight/50);
    text("LEFT MOUSE CLICK TO FLY",windowWidth/12*5,windowHeight/40*21);

  //Right Pipe Up
  }else if(birdy <= (pipey_2 + windowHeight/400*222.5) && ((birdx >= pipex2-(windowWidth/600*25) && birdx <= (pipex2 + windowWidth/600*75)) || (birdx >= pipex2 && birdx <= (pipex2 + windowWidth/600*75)))) {
    noLoop();
    fill(0,0,0);
    textSize(windowHeight/20);
    text("PRESS SPACE TO START",windowWidth/600*190,windowHeight/2);
    textSize(windowHeight/50);
    text("LEFT MOUSE CLICK TO FLY",windowWidth/12*5,windowHeight/40*21);

  //Right Pipe Down
  }else if(birdy >= (pipey2_2 - windowHeight/400*22.5) && ((birdx >= pipex2-(windowWidth/600*25) && birdx <= (pipex2 + windowWidth/600*75)) || (birdx >= pipex2 && birdx <= (pipex2 + windowWidth/600*75)))) {
    noLoop();
    fill(0,0,0);
    textSize(windowHeight/20);
    text("PRESS SPACE TO START",windowWidth/600*190,windowHeight/2);
    textSize(windowHeight/50);
    text("LEFT MOUSE CLICK TO FLY",windowWidth/12*5,windowHeight/40*21);
  }
  
//Background
  //Outline border
  stroke(0);
  noFill();
  rect(0,0,windowWidth,windowHeight);
}
  
function mousePressed() {
  birdy = birdy - 50;
}

function keyPressed() {
  if(keyCode === 32){
    birdy = windowHeight/2;
    pipex = windowWidth/3*2;
    pipex2 = windowWidth/4*5;
    cloudx = windowWidth/2;
    cloudx2 = windowWidth;
    points = 0;
    pointsx = windowWidth/12*11;
    sunx = windowWidth/12*11;
    loop(); 
  }
}