var nature,natureImg;
var bot,botImg;
var bolt,boltImg;
var energy,energyImg;
var red,redImg;
var bom,bomImg;
var bot1,bot1Img;
var gameover,gameoverImg;
var redG,energyG,boltG,bomG;
var point = 0;

var PLAY=1;
var END=0;
var gameState=1;


function preload(){
  natureImg = loadAnimation("assets/nature.png");
  botImg = loadAnimation("assets/bot.gif");
  boltImg = loadAnimation("assets/bolt.gif");
  energyImg = loadAnimation("assets/energy.gif");
  redImg = loadAnimation("assets/red.gif");
  bomImg = loadAnimation("assets/bom.gif");
  bot1Img = loadAnimation("assets/bot1.gif");
  gameoverImg = loadAnimation("assets/gameover.gif");
}

function setup() {
  createCanvas(800,800)
  nature=createSprite(400,200);
  nature.addAnimation("nature",natureImg);
  nature.velocityX = -5;
  nature.x = nature.width /2;
  nature.scale=0.5;

  bot=createSprite(200,20,50,50);
  bot.addAnimation("bot",botImg);
  bot.scale = 0.05;

  bot1=createSprite(200,150,20,20);
  bot1.addAnimation("bot1",bot1Img);
  bot1.scale = 0.5;
  bot1.visible = false;

  redG=new Group();
  energyG=new Group();
  bomG=new Group();
  boltG=new Group();

  gameOver = createSprite(200,100,20,20);
  gameOver.addAnimation("gameover",gameoverImg);
  gameOver.scale = 0.5;
  gameOver.visible = false;

}

function draw() {
  
    if(gameState===PLAY){
      background(0);
      if (nature.x < 0){
      nature.x = nature.width/2;
    }
      bot.y = World.mouseY;

      spawnBolt();
      spwanRed();
      spawnBom();
      spawnEnergy();
      
      edges= createEdgeSprites();
      bot.collide(edges);


      if (boltG.isTouching(bot)) {
        boltG.destroyEach();
        point=point+30;
      }
      else if (energyG.isTouching(bot)) {
        energyG.destroyEach();
        point=point+80; 
              
      }else if(redG.isTouching(bot)) {
        redG.destroyEach();
         piont=pointt-100; 
        
      }else{
          if(bomG.isTouching(bot)) {
              gameState = END;
        }
      }
    }
    else if (gameState === END){
      text("Press Up Arrow to Restart The Game",500,200);
      energyG.setVelocityYEach(0);
      boltG.setVelocityYEach(0);
      redG.setVelocityYEach(0);
      bomG.setVelocityYEach(0);
      gameover.visible = true;
      bot1.visible = true; 
      bot.x = 200;
      bot.y = 200;

      if(keyDown("up")) {
        reset();
      }
     }


  
  drawSprites();
  textSize(20);
  fill(255);
  text("point: "+ point,150,30);
}

function spawnBolt(){
    if (World.frameCount % 200 == 0) {
    var bolt = createSprite(Math.round(random(50, 350),40, 10, 10));
    bolt.addImage(boltImg);
    bolt.scale=0.12;
    bolt.velocityY = 3;
    bolt.lifetime = 150;
    boltG.add(bolt);
    }
  }

  function spawnEnergy() {
    if (World.frameCount % 200 == 0) {
    var energy = createSprite(Math.round(random(50, 350),40, 10, 10));
    energy.addImage(energyImg);
    energy.scale=0.12;
    energy.velocityY = 3;
    energy.lifetime = 150;
    energyG.add(energy);
    }
  }

  function spwanRed() {
    if (World.frameCount % 200 == 0) {
    var red = createSprite(Math.round(random(50, 350),40, 10, 10));
    red.addImage(energyImg);
    red.scale=0.12;
    red.velocityY = 3;
    red.lifetime = 150;
    redG.add(red);
    }
  }

  function spawnBom(){
    if (World.frameCount % 530 == 0) {
    var bom = createSprite(Math.round(random(50, 350),40, 10, 10));
    bom.addImage(bomImg);
    bom.scale=0.1;
    bom.velocityY = 3;
    bom.lifetime = 150;
    bom.depth = boy.depth;
    boy.depth = boy.depth + 1;  
    bomGroup.add(bom);     
    }
  }

  function reset (){
    gameState = PLAY;
    gameOver.visible = false;
    bot1.visible = false;  
    boltG.destroyEach();
    redG.destroyEach();
    energy.destroyEach();
    bomG.destroyEach();
    point = 0;    
  }