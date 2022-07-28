const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world, backgroundImg;
var canvas, angle, tower, ground, cannon;
var cannonBall;
var bolas = [];
var barco;
var barcos = [];
var brokenBoatAnimation = [];
var brokenBoatJSON, brokenBoatIMG;
var waterSplashAnimation = [];
var waterSplashJSON, waterSplashIMG;
var boatAnimation = [];
var boatJson, boatImage

function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  
  towerImage = loadImage("./assets/tower.png");
  
  brokenBoatJSON = loadJSON("assets/boat/broken_Boat.json");
  brokenBoatIMG = loadImage("assets/boat/broken_Boat.png");

  waterSplashJSON = loadJSON("assets/water_Splash/water_Splash.json");
  waterSplashIMG = loadImage("assets/water_Splash/water_Splash.png");

  boatJson = loadJSON("assets/boat/boat.json")
  boatImage = loadImage("assets/boat/boat.png")
}

function setup() {
  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  angleMode(DEGREES)
  angle = 20

  ground = Bodies.rectangle(0, height - 1, width * 2, 1, { isStatic: true });
  World.add(world, ground);

  tower = Bodies.rectangle(160, 350, 160, 310, { isStatic: true });
  World.add(world, tower);

  cannon = new Cannon(180, 110, 130, 100, angle);

  
}

function draw() {
  background(189);
  image(backgroundImg, 0, 0, width, height);

  Engine.update(engine);

  rect(ground.position.x, ground.position.y, width * 2, 1);
  push();
  imageMode(CENTER);
  image(towerImage, tower.position.x, tower.position.y, 160, 310);
  pop();
  
  for(var i = 0; i < bolas.length; i++) {
    displayB(bolas[i], i);
    detect(i)
  }

  cannon.display();

  displayN();
  
  var brokenBoatFrames = brokenBoatJSON.frames;
  for (var i = 0; i < brokenBoatFrames.length; i++) {
    var pos = brokenBoatFrames[i].position;
    var img = brokenBoatIMG.get(pos.x, pos.y, pos.w, pos.h);
    brokenBoatAnimation.push(img);
  }

  var waterSplashFrames = waterSplashJSON.frames;
  for (var i = 0; i < waterSplashFrames.length; i++) {
    var pos = waterSplashFrames[i].position;
    var img = waterSplashIMG.get(pos.x, pos.y, pos.w, pos.h);
    waterSplashAnimation.push(img);
  }

  var boatFrames = boatJson.frames;;
  for (var i = 0; i < boatFrames.length; i++) {
    var pos = boatFrames[i].position;
    var img = boatImage.get(pos.x, pos.y, pos.w, pos.h);
    boatAnimation.push(img);
  }

}

function keyReleased(){
  if(keyCode === 32){
    bolas[bolas.length -1].shoot();
  }
}

function keyPressed(){
  if(keyCode === 32){
    cannonBall = new CannonBall(cannon.x, cannon.y);
    cannonBall.pontos = []
    Matter.Body.setAngle(cannonBall.body, cannon.angle)
    bolas.push(cannonBall);
  }

}

function displayB(bola, index){
  if(bola){
    cannonBall.display();
    cannonBall.animate();
    if(bola.body.position.x >= width || bola.body.position.y >= height-50){
      bola.remove(index)
    }
  }
}

function displayN(){
  if(barcos.length  > 0){

    if(barcos[barcos.length -1] === undefined || barcos[barcos.length -1].body.position.x < width -300){
      var position = [-90, -85, -80, -75]
      var randomPos = random(position)
      barco = new Boat(width - 50, height - 60, 170, 170, randomPos)
      barcos.push(barco);
    }

    for(var i = 0; i < barcos.length; i++){
      if(barcos[i]){
        Matter.Body.setVelocity(barcos[i].body,{x: -1.3, y: 0})
        barcos[i].display();
        barcos[i].animate();
      }else{
        barcos[i]
      }
    }

  } else{
    barco = new Boat(width - 50, height - 60, 170, 170, -85)
    barcos.push(barco);
  }
}

  function detect(index){
    for(var i = 0; i < barcos.length; i++){

      if(bolas[index]!== undefined && barcos[i]!== undefined){
        var BB = Matter.SAT.collides(bolas[index].body, barcos[i].body)

        if(BB.collided){
          barcos[i].remove(i)
          World.remove(world, bolas[index].body)
          delete bolas[index] 
        }
      }

    }
    

  }