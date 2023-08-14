var juca, jucaImg;
var atacante, atacanteImg;
var cone, coneImg;
var campo, campoinvisivel;
var score=0;
var gameOver, restart;

var PLAY = 1;
var END = 0;
var WIN = 2;
var gameState = PLAY;


function preload() {
  jucaImg = loadImage("assets/juca.jpg");
  atacanteImg = loadImage("assets/atacante.jpg");
  coneImg = loadImage("assets/cone.jpg");
  campoImg = loadImage("assets/campo.jpg");
  vitóriaImg = loadImage("assets/vitória.jpg");

}
function setup() {
  createCanvas(800,400);
  createSprite(400, 200, 50, 50);

  campo = createSprite(400,100,400,20);
  campo.addImage("campo",campoImage);
  campo.campo=0.3
  campo.x = width /2;

  juca = createSprite(50,200,20,50);
  juca.scale = 0.15;
  juca.setCollider("circle",0,0,300)
    
  invisibleGround = createSprite(400,350,1600,10);
  invisibleGround.visible = false;

  gameOver = createSprite(400,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(550,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.1;

  gameOver.visible = false;
  restart.visible = false;
  
  
  atacantesGroup = new Group();
  conesGroup = new Group();
  
  score = 0;
}

function draw() {
  background(255);
  
  juca.x=camera.position.x-270;
   
  if (gameState===PLAY){

    campo.velocityX=-3

    if(campo.x<100)
    {
       campo.x=400
    }
   console.log(juca.y)
    if(keyDown("space")&& juca.y>270) {
      jumpSound.play();
      juca.velocityY = -16;
    }
  
    juca.velocityY = kangaroo.velocityY + 0.8
    spawnAtacantes();
    spawnCones();

    juca.collide(invisibleGround);
    //escreva uma condição para que o estado do jogo mude para end (fim).
    if(conesGroup.isTouching(juca)){
      collidedSound.play();
      gameState = END;
    }
    //escreva uma condição para a pontuação aumentar
    if(atacantesGroup.isTouching(kangaroo)){
      score = score + 1;
      atacantesGroup.destroyEach();
    }
  }
  else if (gameState === END) {
    gameOver.x=camera.position.x;
    restart.x=camera.position.x;
    gameOver.visible = true;
    restart.visible = true;
    juca.velocityY = 0;
    campo.velocityX = 0;
    conesGroup.setVelocityXEach(0);
    atacantesGroupGroup.setVelocityXEach(0);

    
    
    conesGroup.setLifetimeEach(-1);
    atacantesGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
        reset();
    }
  }

  else if (gameState === WIN) {
    campo.velocityX = 0;
    juca.velocityY = 0;
    conesesGroup.setVelocityXEach(0);
    atacantesGroup.setVelocityXEach(0);

    

    conesGroup.setLifetimeEach(-1);
    atacantesGroup.setLifetimeEach(-1);
  }
  
  
  drawSprites();

  textSize(20);
  stroke(3);
  fill("black")
  text("Pontuação: "+ score, camera.position.x,50);
  
  if(score >= 5){
    juca.visible = false;
    textSize(30);
    stroke(3);
    fill("black");
    text("Parabéns!! Você completou o treino!! ", 70,200);
    gameState = WIN;
  }
}

function spawnAtacantes() {
 
  if (frameCount % 150 === 0) {

    var atacante = createSprite(camera.position.x+500,330,40,10);

    atacante.velocityX = -(6 + 3*score/100)
    atacante.scale = 0.6;

    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: atacante.addImage(atacante1);
              break;
      case 2: atacante.addImage(atacante2);
              break;
      case 3: atacante.addImage(atacante3);
              break;
      default: break;
    }
       
    atacante.scale = 0.05;
    atacante.lifetime = 400;
    
    atacante.setCollider("atacante",0,0,atacante.width/2,atacante.height/2)
    atacantesGroup.add(atacante);
    
  }
  
}

function spawnCones() {
  if(frameCount % 120 === 0) {

    var cone = createSprite(camera.position.x+400,330,40,40);
    cone.setCollider("rectangle",0,0,200,200)
    cone.addImage(cone1);
    cone.velocityX = -(6 + 3*score/100)
    cone.scale = 0.15;      

    cone.lifetime = 400;
    conesGroup.add(cone);
    
  }
}
function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  juca.visible = true;
  //mude a animação canguru
  juca.changeAnimation("running", kangaroo_running);
  //destrua os arbustos e o grupo de obstáculos
  conesesGroup.destroyEach();
  atacentesGroup.destroyEach();
  score = 0;
}