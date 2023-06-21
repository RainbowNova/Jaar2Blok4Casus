var pipex = 400;
var pipex2 = 750;
var pipey_1 = -150;
var pipey_2 = -150;
var pipey2_1 = 200;
var pipey2_2 = 200;

var birdx = 150;
var birdy = 200;
var fallingspeed = 2;

var points = 0;
var pointsx = 550;

var cloudx = 200;
var cloudx2 = 600;

var sunx = 550;
var speed = -0.1;

function setup() {
  createCanvas(600,400);
}

function draw () {
 //Background
  //Earth
    noStroke();
    if (sunx < 300) {
      r_Sky = map (sunx,300,0,58,64);
      g_Sky = map (sunx,300,0,153,79);
      b_Sky = map (sunx,300,0,68,36);
      fill(r_Sky,g_Sky,b_Sky);
    }else{
      fill(58,153,68);
    }
    rect(0,300,600,100);
  
  //Sky
    noStroke();
    if (sunx < 300) {
      r_Sky = map (sunx,300,0,135,20);
      g_Sky = map (sunx,300,0,206,24);
      b_Sky = map (sunx,300,0,235,82);
      fill(r_Sky,g_Sky,b_Sky);
    }else{
      fill(135,206,235);
    }
    rect(0,0,600,300);
  
  //Sun
    stroke(0);
  if (speed == 1) {
    fill(253,232,172);    //Moon
  }else{
  fill(249,215,28);      //Sun
  }
    ellipse(sunx,50,75,75);
  
    sunx = sunx + speed;
  
  if (sunx <= -37.5) {
    speed = 0.1;
  }else if (sunx >= 637.5) {
    speed = -0.1;
  }
    
  //Clouds
    noStroke();
    if (sunx < 300) {
      r_Sky = map (sunx,300,0,255,70);
      g_Sky = map (sunx,300,0,255,91);
      b_Sky = map (sunx,300,0,255,112);
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
    cloudx = 600;
  }
  
  cloudx2 = cloudx2 - 0.25;
  if (cloudx2 < -75) {
    cloudx2 = 600;
  }



//Bird
  //Body
  stroke(0);
  fill(252,214,71);
  ellipse(150,birdy,50,45);
 
  //Eye
  stroke(0,100);
  fill(0,0,255);
  ellipse(165,birdy-10,7,7);
  noStroke();
  fill(255,255,255);
  ellipse(167,birdy-9,3,3);
 
  //Beak
  stroke(0);
  fill(255,0,0);
  triangle(173,birdy-10,185,birdy,173,birdy+10);
  strokeWeight(2);
  line(175,birdy-1 ,183,birdy);
 
  //Wing
  strokeWeight(1);
  stroke(0);
  fill(0,255,0);
  triangle(120,birdy+15,165,birdy,150,birdy+20);
  
  birdy = birdy + fallingspeed;



  
//Pipes
  //Pipe up
  stroke(0);
  fill(255,189,27);
  rect(pipex,pipey_1,75,240);
  rect(pipex2,pipey_2,75,240);
  
//Pipe down
  stroke(0);
  fill(255,189,27);
  rect(pipex,pipey2_1,75,240);
  rect(pipex2,pipey2_2,75,240);
  
  pipex = pipex - 1;
  pipex2 = pipex2 - 1;
  
  if (pipex <= -75) {
    pipex = 600;
  }else if (pipex2 <= -75) {
    pipex2 = 600;
  }
  
  if (pipex == 600) {
    pipey_1 = random(-190,0);
  }else if(pipex2 == 600) {
    pipey_2 = random(-190,0);
  }
    pipey2_1 = pipey_1 + 390;
    pipey2_2 = pipey_2 + 390;

  
  
//Points
  fill(241,255,28);
  textSize(50);
  if (pipex + 75 == birdx || pipex2 + 75 == birdx) {
    points = points + 1;
    text(points,pointsx,50);
  }else{
  text(points,pointsx,50);
  }
  if (points == 50) {
    noLoop();
    background(random(155,255),random(100,255),random(0,155));
    fill(0,random(0,255),random(0,255));
    text("CONGRATS",165,90);
    textSize(30);
    fill(0,random(0,255),random(0,255));
    text("YOU REACHED MAXIMUM POINTS",55,200);
    fill(0);
    textSize(10);
    text("PRESS SPACE TO PLAY AGAIN",230,220);
    text("MADE BY: JEROEN GERAATS",450,390);
  }else if (points >= 100000000) {
    pointsx = 325;
  }else if (points >= 10000000) {
    pointsx = 353;
  }else if (points >= 1000000) {
    pointsx = 381;
  }else if (points >= 100000) {
    pointsx = 409;
  }else if (points >= 10000) {
    pointsx = 438;
  }else if (points >= 1000) {
    pointsx = 466;
  }else if (points >= 100) {
    pointsx = 494;
  }else if (points >= 10) {
    pointsx = 522;
  }
  
  
//Gameover
  //Ground
  if (birdy > height){
      noLoop();
      fill(0,0,0);
      textSize(20);
      text("PRESS SPACE TO START",190,200);
      textSize(8);
      text("LEFT MOUSE CLICK TO FLY",250,210);
  
  //Left Pipe Up
  }else if(birdy <= (pipey_1 + 222.5) && ((birdx >= pipex-25 && birdx <= (pipex + 75)) || (birdx >= pipex && birdx <= (pipex + 75)))) {
      noLoop();
      fill(0,0,0);
      textSize(20);
      text("PRESS SPACE TO START",190,200);
      textSize(8);
      text("LEFT MOUSE CLICK TO FLY",250,210);
  
  //Left Pipe Down
  }else if(birdy >= (pipey2_1 - 22.5) && ((birdx >= pipex-25 && birdx <= (pipex + 75)) || (birdx >= pipex && birdx <= (pipex + 75)))) {
      noLoop();
      fill(0,0,0);
      textSize(20);
      text("PRESS SPACE TO START",190,200);
      textSize(8);
      text("LEFT MOUSE CLICK TO FLY",250,210);
  
  //Right Pipe Up
  }else if(birdy <= (pipey_2 + 222.5) && ((birdx >= pipex2-25 && birdx <= (pipex2 + 75)) || (birdx >= pipex2 && birdx <= (pipex2 + 75)))) {
      noLoop();
      fill(0,0,0);
      textSize(20);
      text("PRESS SPACE TO START",190,200);
      textSize(8);
      text("LEFT MOUSE CLICK TO FLY",250,210);      
  
  //Right Pipe Down
  }else if(birdy >= (pipey2_2 - 22.5) && ((birdx >= pipex2-25 && birdx <= (pipex2 + 75)) || (birdx >= pipex2 && birdx <= (pipex2 + 75)))) {
      noLoop();
      fill(0,0,0);
      textSize(20);
      text("PRESS SPACE TO START",190,200);
      textSize(8);
      text("LEFT MOUSE CLICK TO FLY",250,210);
  }
  
//Background
  //Outline border
  stroke(0);
  noFill();
  rect(0,0,600,400);
}
  
function mousePressed() {
  birdy = birdy - 50;
}

function keyPressed() {
  birdy = 200;
  pipex = 400;
  pipex2 = 750;
  cloudx = 200;
  cloudx2 = 600;
  points = 0;
  pointsx = 550;
  sunx = 550;
  loop(); 
}