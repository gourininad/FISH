var sea, seaBackImg;
var shark , sharkImg;
var  jellyFish, jellyFishImg;
var fish, fishImg;
var coin , coinImg;
var PLAY=1;
var END =0;
var gameState = PLAY;
var score=0;
var fishGroup , jellyfishGroup , coinGroup;
var gameOver,gameOverImage ;
//var reset, resetImage;


function preload()
  {
    //loading images
    seaBackImg = loadImage("sea back.jpg");
    sharkImg = loadImage("unnamed.png");
    jellyFishImg = loadImage("jellyfish1.png");  
    fishImg = loadImage("fish1.png");  
    coinImg = loadImage("coin.png");
    gameOverImage = loadImage("gameover.png"); 
    //resetImage = loadImage("restart.png");
  }

function setup() 
 {
   createCanvas(450,400);
   
   //background
   sea = createSprite(400,200); 
   sea.addImage(seaBackImg);
   sea.scale=2.75; 
   sea.x = sea.width/2;

   //shark , main player
   shark = createSprite(110,300);
   shark.addImage(sharkImg); 
   shark.scale=0.4; 
   score = 0; 

   //groups for the obstacle
   fishGroup = createGroup();
   jellyfishGroup = createGroup();
   coinGroup = createGroup();

   //collider for the shark
   shark.setCollider("circle",90,0,70);
   shark.debug = false; 
   fishGroup.debug = true;
  }

function draw() 
{
   background("white"); 

   drawSprites();

   spawnJellyFish();
   spawnFish();
   spawnCoin();

   textSize(20)
   fill("red")
   text("Score: "+ score,200,50);

   sea.velocityX=-(4+3*score/100); 

    if (sea.x<0)
   {
     sea.x =sea.width/2;
   }

    if(keyDown("up"))
    {
      shark.y=shark.y-5;
    }

    if(keyDown("down"))
    {
      shark.y=shark.y+5;
    }

   if(gameState===PLAY) 
   {

    if(fishGroup.isTouching(shark)){
    score = score+2;
    fishGroup.destroyEach();  
  }  



    if(coinGroup.isTouching(shark)){
      score = score+1;
      coinGroup.destroyEach();
    }
   if (jellyfishGroup.isTouching(shark)){
     gameState=END; 
     } 
   }
    if(gameState===END){
      score = 0;
     sea.velocityX=0;

      shark.destroy();

      fishGroup.destroyEach();
      coinGroup.destroyEach();
      jellyfishGroup.destroyEach();

     fishGroup.setVelocityEach(0);
     coinGroup.setVelocityEach(0);
     jellyfishGroup.setVelocityEach(0);

     fishGroup.setLifetimeEach(-1);
     coinGroup.setLifetimeEach(-1);
     jellyfishGroup.setLifetimeEach(-1);

    gameOver = createSprite(225,150) ;
    gameOver.addImage(gameOverImage);  
    gameOver.scale=0.4; 


    }


  }
    function spawnJellyFish(){
      if(frameCount%100===0){
        jellyFish = createSprite(450,300);
        jellyFish.y = Math.round(random(50,350));
        jellyFish.velocityX=-(6+3*score/100);
        jellyFish.addImage(jellyFishImg);
        jellyFish.scale=0.35;
        jellyfishGroup.add(jellyFish);
       shark.depth = jellyFish.depth;
        shark.depth = jellyFish.depth+1;
       }
    }

     function spawnFish(){
       if(frameCount%60===0){
         fish = createSprite(400,300);
         fish.y = Math.round(random(50,350));
         fish.velocityX=-(6+3*score/100);
         fish.addImage(fishImg);
         fish.scale=0.025;
         fishGroup.add(fish);
         shark.depth = fish.depth;
       shark.depth = fish.depth+1;
       }
     }

     function spawnCoin(){
       if(frameCount%60===0){
       coin = createSprite(450,350);
       coin.y = Math.round(random(50,350));  
       coin.velocityX=-(6+3*score/100);
       coin.addImage(coinImg);
       coin.scale=0.1;  
       coinGroup.add(coin);  
       shark.depth = coin.depth;
       shark.depth = coin.depth+1;  

       }
     }
