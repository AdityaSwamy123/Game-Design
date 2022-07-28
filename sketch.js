var space, spaceImg
var player, spaceshipImg
var obstacle1,obstacle1Img,obstacle1Group,obstacle2,obstacle2Img,obstacle2Group
var laser, laserImg
var score = 0;

function preload(){
spaceImg = loadImage("Images/spaceimage.webp")
spaceshipImg = loadImage("Images/clipart2186575.png")
obstacle1Img = loadImage("Images/asteroid.jpeg")
obstacle2Img = loadImage("Images/enemy.png")
laserImg = loadImage("Images/missile.png")


}

function setup() {
  createCanvas(windowWidth, windowHeight);  
  space = createSprite(windowWidth/2, windowHeight/2,windowWidth*2,windowHeight*4)
  space.addImage(spaceImg)
  space.scale = 2
  player = createSprite(windowWidth/2, windowHeight-150,0,0)
  player.addImage(spaceshipImg)
  player.scale = 0.6
 
obstacle1Group = new Group();
obstacle2Group = new Group();
laserGroup = new Group();
}





function draw() {
  background(255,255,255);  
  space.velocityY = 5
  if(space.y>windowHeight){
    space.y = 0
  }
  if(keyDown("right_arrow")){
    player.x = player.x+10
  }
  if(keyDown("left_arrow")){
    player.x = player.x-10
  }
  if(keyDown("up_arrow")){
    player.y = player.y-10
  
  }
  if(keyWentDown("space")){
    laser = createSprite(player.x,player.y-50,20,20)
    laser.addImage(laserImg)
    laser.debug=true
    laser.scale = 0.4
    laser.velocityY=-5
    laserGroup.add(laser)

    
  }
  if(obstacle1Group.isTouching(laserGroup)){
    for(var i=0;i<obstacle1Group.length;i++){      
      
      if(obstacle1Group[i].isTouching(laserGroup)){
           obstacle1Group[i].destroy()
           laserGroup.destroyEach()
           //explosionSound.play();
    
           score = score+1
           } 
     
     }
    
  }
  

  if(obstacle1Group.isTouching(player)){
    player.destroyEach()
    obstacle1Group[i].destroyEach()
   gameState = "lost"
  }
  text("Score = " + score,windowWidth-200,windowHeight/2-220)
  if(space.x-player.x>1000){
    player.x = windowWidth/2
    player.y= 100
  }
  if(player.x-space.x>1000){
    player.x = windowWidth/2
    player.y= 100
  }
  if(space.y-player.y>600){
    player.x = windowWidth/2
    player.y= 100
  }


spawnObstacle1();
  drawSprites();
  
}

function spawnObstacle1() {
  if (frameCount % 300 === 0) {
    var asteroid = createSprite(200,-50,50,50);
       asteroid.x = Math.round(random(20,windowWidth-20));
       asteroid.addImage(obstacle1Img);
       asteroid.debug = true
       asteroid.velocityY = 2;
       asteroid.lifetime = 1500;
       obstacle1Group.add(asteroid); 
    
  
  }
}
