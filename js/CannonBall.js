class CannonBall {
  constructor(x, y) {
    var options = {
      isStatic: true
    };
    this.r = 30;
    this.body = Bodies.circle(x, y, this.r, options);
    this.image = loadImage("./assets/cannonball.png");
    this.pontos = []
    this.animation = [this.image]
    this.speed = 0.05
    this.cair = false
    World.add(world, this.body);
  }


  display() 
  {
    var pos = this.body.position;
    var index = floor(this.speed % this.animation.length)
    
    push();
    imageMode(CENTER);
    image(this.animation[index], pos.x, pos.y, this.r, this.r);
    pop();



   /* if(this.body.velocity.x > 0 && pos.x > 10){
      var xy = [pos.x, pos.y]
      this.pontos.push(xy)
    }

    for(var i = 0; i < this.pontos.length; i++){
      image(this.image, this.pontos[i] [0], this.pontos[i] [1], 5, 5)
    }*/

  }

  remove(index){
    this.cair = true;
    Matter.Body.setVelocity(this.body, {x: 0, y: 0});
    this.animation = waterSplashAnimation
    this.speed = 0.05
    this.r = 150
    setTimeout(() => {
        World.remove(world, this.body);
        delete bolas[index]
    }, 1000);
  }


  shoot(){
    Matter.Body.setStatic(this.body, false);
    
    var newAngle = cannon.angle -28
    newAngle = newAngle*(3.14/180);
    
    var velocity = p5.Vector.fromAngle(newAngle)
    velocity.mult(0.5)
    Matter.Body.setVelocity(this.body,{x: velocity.x * (180/3.14), y: velocity.y * (180/3.14)})
  }
  
  animate(){
    this.speed += 0.05;
  }
}
