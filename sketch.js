var pontos = 0
var trex, trex_running, edges;
var groundImage;
var play = 1;
var end = 0;
var gameState = play
var trex_collide
var gameover
var restart
var jump
var die 
var checkpoint



function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_collide = loadImage("trex_collided.png")
  groundImage = loadImage("ground2.png")
  nuvemImagem = loadImage("cloud.png")
  cacto1 = loadImage("obstacle1.png")
  gameoverImg= loadImage("gameOver.png")
  restartImg= loadImage("restart.png")
  cacto2 = loadImage("obstacle2.png")
  cacto3 = loadImage("obstacle3.png")
  cacto4 = loadImage("obstacle4.png")
  cacto5 = loadImage("obstacle5.png")
  cacto6 = loadImage("obstacle6.png")
  jump = loadSound("jump.mp3")
  die = loadSound("die.mp3")
  checkpoint = loadSound("checkPoint.mp3")
}

function setup() {
  createCanvas(windowWidth,windowHeight);

  //criando o trex
  trex = createSprite(50, height-70, 20, 50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collide",trex_collide)
  edges = createEdgeSprites();

  //adicione dimensão e posição ao trex
  trex.scale = 0.5;
  trex.x = 50

  ground = createSprite(width/2, height-85, width, 125);
  ground.addImage("ground", groundImage)
  ground.x = ground.width / 2;

  var mensagem="isso daqui é um jogo do dinosauro da internet  (quando a internet ta ruim)"
   

  invisibleGround = createSprite(width/2, height-20, width, 125)
  invisibleGround.visible = false

  grupoObstacle = new Group();
  grupoNuvem = new Group();

  trex.setCollider("circle",0,0,40)
  trex.debug=true

  gameover=createSprite(width/2,height/2-50)
  gameover.addImage(gameoverImg)

  restart=createSprite(width/2,height/2)
  restart.addImage(restartImg)

  gameover.scale=0.5 
  restart.scale=0.5

  gameover.visible=false
  restart.visible=false


}


function draw() {
  //definir a cor do plano de fundo 
  background("white");

  if (gameState === play) { 
    ground.velocityX = -2
    text("pontos: " + pontos, 500, 50)
    pontos = pontos + Math.round(getFrameRate() / 60)


    

    if(pontos>0 && pontos%200===0){
      checkpoint.play()
    }
    if (ground.x < 0) {
      ground.x = ground.width / 2

    }
    if ( touches.length>0 || keyDown("space") && trex.y >= 50) {
      trex.velocityY = -10;
      jump.play()
      touches=[]
    }

    trex.velocityY = trex.velocityY + 0.5;
    criarNuvens();
    criarCactos();

    if(grupoObstacle.isTouching(trex)) {
      gameState=end
      die.play()

    }

  }
  else {
    ground.velocityX = 0
    trex.changeAnimation("collide",trex_collide)
    grupoObstacle.setLifetimeEach(-1)
    grupoNuvem.setLifetimeEach(-1)
    grupoObstacle.setVelocityXEach(0)
    grupoNuvem.setVelocityXEach(0)

    gameover.visible=true
    restart.visible=true


  }

  if (touches.length>0 ||  mousePressedOver(restart)){
    reset()
    touches= []
  }  


  //impedir que o trex caia
  trex.collide(invisibleGround)
  drawSprites();

}

function criarNuvens() {
  if (frameCount % 60 === 0) {
    nuvem = createSprite(width, height-300, 40, 10)
    nuvem.velocityX = -3
    nuvem.addImage(nuvemImagem)
    nuvem.y = Math.round(random(10, 60))
    nuvem.lifetime = 401

    grupoNuvem.add(nuvem)



  }

}

function criarCactos() {
  if (frameCount % 60 === 0) {
    cacto = createSprite(width, height-95, 20, 30)
    cacto.velocityX = -6

    numero = Math.round(random(1, 6))

    switch (numero) {
      case 1: cacto.addImage(cacto1)
        break;
      case 2: cacto.addImage(cacto2)
        break;
      case 3: cacto.addImage(cacto3)
        break;
      case 4: cacto.addImage(cacto4)
        break;
      case 5: cacto.addImage(cacto5)
        break;
      case 6: cacto.addImage(cacto6)
        break;


    }
    cacto.scale = 0.5
    cacto.lifetime = 400
    grupoObstacle.add(cacto)

  }
}

function reset(){ 
  gameState=play;
  gameover.visible=false
  restart.visible=false
  grupoObstacle.destroyEach()
  grupoNuvem.destroyEach()
  trex.changeAnimation("running",trex_running)
  pontos=0


}

