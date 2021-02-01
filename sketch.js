var PLAY = 1;
var END = 0;
var gameState = 1;
var monkey , monkey_running, monkey_standing;
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var ground, invisibleGround;
var score = 0;
var rand;
var info, infoImage;

function preload(){

  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  monkey_standing = loadAnimation("sprite_1.png", "sprite_5.png");
  
  infoImage = loadImage ("lose.JPG")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
}



function setup() {
  createCanvas (500, 500);
  
  monkey = createSprite(100, 375, 20, 20);
  monkey.addAnimation ("monkey", monkey_running);
  monkey.addAnimation ("lose", monkey_standing);
  monkey.setCollider ("circle", 0, 0, 275 )
  monkey.scale = 0.15
  
  ground = createSprite(300, 427, 600, 15);
  
  invisibleGround = createSprite(300, 427, 600, 15);
  invisibleGround.visible = 0;
  
  obstacle = createSprite(505, 400, 20, 20);
  obstacle.addImage (obstacleImage);
  obstacle.scale = 0.15
  obstacle.lifetime = 200;
  obstacle.velocityX = -5;   
  
  info = createSprite(250 , 200, 20, 20);
  info.addImage (infoImage);
  info.scale = 0.5
  info.visible = 0
  
  foodGroup = new Group();
  obstacleGroup = new Group();
}


function draw() {
  background (160)
  monkey.collide (ground);
  
  if (gameState == PLAY){
    
    if (keyDown("space") && monkey.y >= 370) {
        monkey.velocityY = -18;
    }
    
    ground.velocityX = -3
    ground.x = ground.width /2;
    monkey.velocityY = monkey.velocityY + 0.8
  
    score = score + Math.round(getFrameRate()/61);
  
    food();
    
    if (monkey.isTouching(foodGroup)){
      
      banana.destroy();
      score = score + 2
      
    }
    
    obstacles();
    
    if (monkey.isTouching(obstacle)){
      
      gameState = END;
      monkey.changeAnimation ( "lose", monkey_standing)
      info.visible = 1;
      
    }
  }
    
  if (gameState == END){
    
    foodGroup.setLifetimeEach (-1);
    foodGroup.setVelocityXEach (0);
    
    obstacleGroup.setLifetimeEach (-1);
    obstacleGroup.setVelocityXEach (0);
    invisibleGround.visible = 1;
    ground.setVelocityX = (0);
       
  }
  
  drawSprites();
  
  text ("Survival Time: " + score, 215, 25)
  
}

function food(){
  
  if (frameCount % 80 === 0 && frameCount > 0){
    
    var rand = Math.round(random(120, 200))
    
    banana = createSprite(505  , rand, 20, 20);
    banana.setCollider ("circle", 0, -50, 250)
    banana.addImage (bananaImage);
    banana.scale = 0.1
    banana.lifetime = 200;
    banana.velocityX = -7;

    foodGroup.add (banana);
  }
}

function obstacles(){
  
  if (frameCount % 300 == 0 && frameCount > 0){
    var rand = Math.round(random(120, 200))

    obstacle = createSprite(505, 400, 20, 20);
    obstacle.setCollider ("circle", 0, 0, 6);
    obstacle.addImage (obstacleImage);
    obstacle.scale = 0.15
    obstacle.lifetime = 200;
    obstacle.velocityX = -5;

    obstacleGroup.add (obstacle);
  }
}


