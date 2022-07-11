class CannonBall {
  constructor(x, y) {
    var options = {
      isStatic: true
    };
    this.r = 30;
    this.body = Bodies.circle(x, y, this.r, options);
    this.image = loadImage("./assets/cannonball.png");
    this.pontos = []
    World.add(world, this.body);
  }


  display() 
  {
    var pos = this.body.position;
    push();
    imageMode(CENTER);
    image(this.image, pos.x, pos.y, this.r, this.r);
    pop();

    if(this.body.velocity.x > 0 && pos.x > 10){
      var xy = [pos.x, pos.y]
      this.pontos.push(xy)
    }

    for(var i = 0; i < this.pontos.length; i++){
      image(this.image, this.pontos[i] [0], this.pontos[i] [1], 5, 5)
    }
  }

  shoot(){
    Matter.Body.setStatic(this.body, false);
    
    var newAngle = cannon.angle -28
    newAngle = newAngle*(3.14/180);
    
    var velocity = p5.Vector.fromAngle(newAngle)
    velocity.mult(0.5)
    Matter.Body.setVelocity(this.body,{x: velocity.x * (180/3.14), y: velocity.y * (180/3.14)})
  }
}