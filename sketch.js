//variables pour créer les sprites
var nebula, spaceship,play;
//variables pour les images
var nebulaImg, vaisseauImg,thrustImg,rockImg,laserImg,explosionImg,playImg;
var angle=90
var grouprock,grouplazer
//dimension zone de jeu
var LARGEUR = 600;
var HAUTEUR = 600;
var statue="start";

// variables états de jeu
var life, score, meuilleurscore;
life = 3;
score = 0;
meuilleurscore = 0;

function preload(){
  //télécharger les images ici
  nebulaImg = loadImage("nebula2.jpg");
  vaisseauImg = loadImage("spaceship.png");
  thrustImg = loadImage("thrust.png");
  rockImg = loadImage("rock.png")
  laserImg = loadImage("laser.png")
  explosionImg = loadAnimation("explosion300.png","explosion301.png","explosion302.png","explosion303.png","explosion304.png","explosion305.png","explosion306.png","explosion307.png","explosion308.png","explosion309.png","explosion310.png","explosion311.png","explosion312.png","explosion313.png","explosion314.png","explosion315.png")
  playImg = loadImage("play.png")
}

function setup(){
  createCanvas(LARGEUR,HAUTEUR)
  
  nebula = createSprite(LARGEUR/2,HAUTEUR/2,LARGEUR,HAUTEUR);
  nebula.addImage(nebulaImg);
  nebula.scale = 1.2;
  
  spaceship = createSprite(200,200,20,20);
  spaceship.addAnimation("spaceship",vaisseauImg);
  spaceship.addAnimation("thrust",thrustImg);
  spaceship.scale = 0.15;
  spaceship.debug = false;
  spaceship.setCollider("rectangle",0,0,450,350);
  play=createSprite(300,400)
  play.addAnimation("play",playImg);
  play.scale = 0.2
  grouprock = createGroup();
  grouplazer = createGroup();
}

function draw(){
  drawSprites();
  if(statue=="fin"){
    spaceship.velocityX=0
    spaceship.velocityY=0
    textSize(30);
    fill("red");
  text("Game Over",LARGEUR/2-50,HAUTEUR/2);
  play.visible=true;
  life=3;
  
  if (score>meuilleurscore){
    meuilleurscore=score;
  }
  score=0;
  }
 if (mousePressedOver(play)) {
play.visible=false;
   spaceship.x=LARGEUR/2
   spaceship.y=HAUTEUR/2
statue="play";
    
}

fill("red");
textSize(30);
text("score: "+score,450,35);
fill("green");
text("life: "+life,10,35);
text("best:"+meuilleurscore,450,550); 
spaceship.changeAnimation("spaceship");
spaceship.scale=0.15;
if (keyDown("right")){
  angle+=10;
}
if (keyDown("left")){
  angle-=10;
}
spaceship.rotation=angle;
if (keyDown("up")){
  spaceship.velocityX+=5*Math.cos(radians(angle));
  spaceship.velocityY+=5*Math.sin(radians(angle));
spaceship.changeAnimation("thrust");
}  
if (statue=="play"){
transporter(spaceship);
rock()
lazerspawner()
spaceship.velocityX=spaceship.velocityX*0.8;
spaceship.velocityY=spaceship.velocityY*0.8;
for(var i = 0; i < grouprock.length; i++){
  transporter(grouprock.get(i));
}
for (var i = 0; i < grouprock.length; i++) {
if (grouprock.get(i).isTouching(spaceship)) {
 var explosion = createSprite(grouprock.get(i).x,grouprock.get(i).y,10,10);
 explosion.setCollider("circle",0,0,10);
explosion.addAnimation("explosion",explosionImg);
  explosion.scale = 1.5
grouprock.get(i).destroy();
explosion.lifetime=10;
life-=1;
score-=5;
 }
}
if (life==0){
  
  statue="fin";
  
}

for(var j = 0; j < grouplazer.length; j++) {
for(var i = 0; i < grouprock.length; i++) {
  if (grouprock.get(i).isTouching(grouplazer.get(j))) {
var explosion = createSprite(grouprock.get(i).x,grouprock.get(i).y,10,10);
explosion.setCollider("circle",0,0,10);
explosion.addAnimation("explosion",explosionImg);
    explosion.scale = 1.5
grouprock.get(i).destroy();
explosion.lifetime=10;
grouplazer.get(j).destroy();
score+=10;
  }
}
}}
}

function transporter(sprite) {
if (sprite.x<0) {
 sprite.x=LARGEUR-10;
 
  }
if (sprite.x>LARGEUR) {
 sprite.x=5;     
    }
if (sprite.y<0) {
  sprite.y=HAUTEUR-10     
        }
if (sprite.y>HAUTEUR){
 sprite.y=5;                 
                }
                                
}

function rock() {
if (World.frameCount%90==0) {
  var asteroidx = 400*Math.random()
  var asteroidy = 400*Math.random()
while (Math.abs(spaceship.x-asteroidx)<100 && Math.abs(spaceship.y-asteroidy)<100) {
 asteroidx = 400*Math.random();
 asteroidy = 400*Math.random();
  }
    
var asteroid = createSprite(asteroidx,asteroidy, 30, 30);
asteroid.addAnimation("rock",rockImg);  
asteroid.scale=0.15;
asteroid.velocityX=10*Math.random()-5;
asteroid.velocityY=10*Math.random()-5;
asteroid.rotationSpeed=3*Math.random();
asteroid.lifetime=400;
asteroid.setCollider("circle",0,0,200);
grouprock.add(asteroid);


  }
    
}
function lazerspawner() {
if (keyWentDown("space")&&grouplazer.length<15) {
var lazer = createSprite(spaceship.x,spaceship.y);
lazer.addAnimation("laser",laserImg);
lazer.scale=0.3;
lazer.x=spaceship.x+45*Math.cos(radians(angle));
lazer.y=spaceship.y+45*Math.sin(radians(angle));
lazer.rotation=angle;
 lazer.velocityX=8*Math.cos(radians(angle));
 lazer.velocityY=8*Math.sin(radians(angle));
 lazer.lifetime=100;
 lazer.setCollider("rectangle",0,0,100,60);
grouplazer.add(lazer);

  }
    
}