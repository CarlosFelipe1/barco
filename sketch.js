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

function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");
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
    displayB(bolas[i]);
  }

  cannon.display();

  displayN();
  
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

function displayB(bola){
  if(bola){
    bola.display();
  }
}

function displayN(){
  if(barcos.lenght  > 0){

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
      }else{
        barcos[i]
      }
    }

  } else{
    barco = new Boat(width - 50, height - 60, 170, 170, -85)
    barcos.push(barco);
  }
}