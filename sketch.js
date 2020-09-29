var bg,bga,invisibleground;
var monkey , monkey_running,monkey_lose;
var banana ,bananaimage, obstacle, obstacleimage
var foodgroup, obstaclegroup;
var survivaltime;
survivaltime = 0;
var score;
score = 0;
var gamestate = "play";
var restart,restarta;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  
  bga = loadImage("Screenshot 2020-09-24 181538.png");
  
  bananaimage = loadImage("banana.png");
  obstacleimage = loadImage("obstacle.png");
  
  starta = loadImage("start-2.png");
  
  monkey_lose = loadImage("sad.jpg");
  
  restarta = loadImage("restart.png");
 
}



function setup() {
  
createCanvas(600,300);
  
bg = createSprite(width/2,height-190,600,300);
 bg.addImage(bga);
  bg.scale = 1;
  bg.velocityX = -6;
    
  
  monkey = createSprite(width-420,height-20,50,50);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.15;
  
  invisibleground = createSprite(width/2,height-20,width,5);
  invisibleground.visible = false;
  
  obstaclegroup = createGroup();
  foodgroup = createGroup();
  
  restart = createSprite(300,80,50,50);
  restart.addImage(restarta);
  restart.scale = 0.2;
  restart.visible = false;
}


function draw() {
  
background("red");
  if(gamestate == "play"){
    

    if(bg.x<200){
  bg.x = 300;
    }
    
    monkey.collide(invisibleground);
  
  food();
  stone();
  
  if(keyDown("space")&&monkey.y >= 100){
     monkey.velocityY = -12;
 }
  
  monkey.velocityY = monkey.velocityY + 0.7;
    
    if(monkey.isTouching(foodgroup)){
     foodgroup.destroyEach(); 
     score = score + 1;  
  }
    if(monkey.isTouching(obstaclegroup)){
       gamestate = "end";
       }
    
     survivaltime = survivaltime+1;
 }
  else if(gamestate == "end"){
          
    bg.velocityX = 0;
    monkey.velocityY = 0;
    obstaclegroup.setVelocityXEach(0);
    obstaclegroup.setLifetimeEach(-1);
    
    foodgroup.setVelocityXEach(0);
    foodgroup.setLifetimeEach(-1);
          
    monkey.addAnimation("running",monkey_lose);
    monkey.scale = 0.3;
    
    restart.visible = true;
    
    if(mousePressedOver(restart)){
     reset();
      gamestate = "play";
    
    }
    
          }
    
  
  drawSprites();
  
  

  
  fill("red");
  text("Survival Time :" + survivaltime,width-150,height-250);
  
  text("Bananas :" + score,width/10,height-250);
}

function stone(){

if(frameCount%300==0){

obstacle = createSprite(550,200,50,50);
obstacle.addImage(obstacleimage);
 obstacle.y = Math.round(random(210,300));
  obstacle.scale = 0.2;
 obstacle.velocityX = -6; 
  obstacle.setCollider("rectangle",0,0,150,150);

obstacle.setlifetime = 100;
 
  obstaclegroup.add(obstacle);
}

}

function food(){

if(frameCount%80==0){

banana = createSprite(550,200,50,50);
banana.addImage(bananaimage);
banana.velocityX = -6;
banana.y = Math.round(random(120,200));
banana.scale = 0.1;

banana.setlifetime = 100;
foodgroup.add(banana);
}
}

function reset(){
 monkey.addAnimation("running",monkey_running);
      monkey.scale = 0.15;
      obstaclegroup.destroyEach();
      foodgroup.destroyEach();
      score = 0;
      survivaltime = 0;
      restart.visible = false;
      bg.velocityX = -6;
}


