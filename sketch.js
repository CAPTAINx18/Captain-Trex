//creating variab//creating variables
var trex, trex_run, edges, ground, ground_image, Invisibleground, cloud, cloud_Image, random_number, obstacles, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6, random_obstacle, count,  PLAY, END, clouds_group, obstacles_group, gamestate, reImage, gameover, trexdead, gameovertext, gameoverimage, score, checkpointsound, diesound, jumpsound;


//to load animations and images
function preload(){
  trex_run = loadAnimation("trex1.png","trex3.png","trex4.png");
  
  ground_image = loadImage("ground2.png");
  cloud_Image = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  trexdead = loadAnimation("trex_collided.png");
  
  reImage = loadImage("restart.png");
  gameoverimage = loadImage("gameOver.png");
  
  checkpointsound = loadSound("checkPoint.mp3");
  jumpsound = loadSound("jump.mp3");
  diesound = loadSound("die.mp3");
  
}


//to create sprites
function setup(){
  createCanvas(windowWidth, windowHeight);
  
  trex = createSprite(40, height - 100, 20, 50);
  //adding animation to trex
  trex.addAnimation("run",trex_run);
  trex.addAnimation("dead", trexdead);
  trex.scale=0.5;
  
  
  //creting edge sprites
  edges = createEdgeSprites();
  
  
  ground = createSprite(width/2, height - 110, width, 5);
  ground.addImage("ground",ground_image);
  
  //creating the invisible ground
  Invisibleground = createSprite(width/2, height - 90, width, 25);
  Invisibleground.visible=false;
  
//game over image
  gameover = createSprite(width/2, height/2.5, 5, 5);
  gameover.addImage(reImage);
  gameover.scale = 0.6;
    
  gameovertext = createSprite(width/2, height/2, 10, 10);
  gameovertext.addImage(gameoverimage);
  gameovertext.scale = 0.5;
   
  //scoreing part
  count = 0;
  score = 0;
  
  PLAY = 1;
  END = 0;
  gamestate = PLAY;
  
  trex.setCollider("circle",0,0,50);
  //trex.debug = true;
  
  
  gameover.visible = false;
  gameovertext.visible = false;
  
  //classification of groups
  clouds_group = new Group();
  obstacles_group = new Group();
}


function draw(){
  background("white");
  
  text( count, width - 110, 25);
  text("HI " + score, width - 160, 25);
  
  
 if(gamestate === PLAY){
   trex.changeAnimation("run", trex_run);
   ground.velocityX = -10;
    
   if((keyDown("space") || touches.lenghth > 0) && trex.y > height - 200){
     
   
   
   //if((touches.length>0 || keyDown("SPACE")) && trex.y >= height - 100){
     trex.velocityY = -13;
     jumpsound.play();
     touches = [];
   }
  /*if((keyDown("space") || touches.length > 0) && trex.y >= height - 50){
    trex.velocityY = -13;
    jumpsound.play();
    touches = [];
  }*/
    
    
//gravity of trex
  trex.velocityY = trex.velocityY + 1.5;                        
    
    
  count = count + Math.round(getFrameRate()/60);
   //console.log(frameCount);
   //console.log(Math.round(frameCount/100));
    
    
  // for the infinite ground
    if(ground.x < 0){
      ground.x = ground.width/2;
        
  }
    
    
  spawn_clouds();
  Spawn_obstacles();
   
        if(count > 0 && count %100 === 0){
      checkpointsound.play();
    }
    
    if(obstacles_group.isTouching(trex)){
      diesound.play();
      gamestate = END;
      
    }
   
  }
  
   else if(gamestate === END){
     
     if(count > score){
       score = count;
       
     }
     
     trex.changeAnimation("dead", trexdead);
     
    ground.velocityX = 0;
    
    trex.velocityY = 0;
     
     trex.addAnimation("collide", trexdead);
     
      gameovertext.visible = true;
      gameover.visible = true;
    
      
    clouds_group.setVelocityXEach(0);
    obstacles_group.setVelocityXEach(0);
    
     
    
      
    //if(keyDown("r")){
     if(mousePressedOver(gameover) || touches.length > 0){
      gamestate = PLAY;
      gameovertext.visible = false;
      gameover.visible = false;
      
      obstacles_group.destroyEach();
      clouds_group.destroyEach();
     // obstacles.visible = false;
      //clouds_group.setVelocityXEach(-2);
      
      count = 0;
       touches = [];
    } 
  }
  
    
//collide commands
  trex.collide(Invisibleground);
  trex.collide(edges[2]);
  
  
  drawSprites();
  
}

//spawing the clouds
function spawn_clouds(){
  
  if(frameCount %150 === 0){
    cloud = createSprite(width + 20, height - 200, 60, 50);
    cloud.velocityX = -3;
    cloud.scale = 1;
    cloud.addImage("cloud",cloud_Image);
    cloud.y = Math.round(random(40,100));
    //console.log(cloud.depth);
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1; 
    
    cloud.lifetime = 320;
    
    //telling cloud that this your group
    clouds_group.add(cloud);
    
  }
}


function Spawn_obstacles(){
  
  if(frameCount %100 === 0){
    obstacles = createSprite(width - 50, height - 125, 60, 50);
    
    console.log(width);
    
    obstacles.velocityX = -10;
    
    if(count > 0 && count %100 === 0){
      obstacles.velocityX = obstacles.velocityX - (count/100);
      //checkpointsound.play();
    }
    
    
    

    
    //obstacles.setCollider("point", 0, 0);
    //obstacles.setCollider("rectangle", 0, 0, 100, 125);
    obstacles.debug = false;
    
 
    random_obstacle = Math.round(random(1,6));
    
    switch(random_obstacle){
      case 1: obstacles.addImage(obstacle1);
              break;
      case 2: obstacles.addImage(obstacle2);
              break;
      case 3: obstacles.addImage(obstacle3);
              break;
      case 4: obstacles.addImage(obstacle4);
              break;
      case 5: obstacles.addImage(obstacle5);
              break;
      case 6: obstacles.addImage(obstacle6);
              break;
    }
    
    obstacles.scale = 0.5;
    obstacles.lifetime = 200;
    
    //telling obstacles that is your group
    obstacles_group.add(obstacles);
    
    
   
  }
}





