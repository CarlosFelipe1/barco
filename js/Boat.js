class Boat{
    constructor(x, y, l, a, pos){
        this.body = Bodies.rectangle(x, y, l, a);
        this.animation = boatAnimation
        this.speed = 0.05
        this.broken = false
        this.pos = pos;
        this.l = l;
        this.a = a;
        World.add(world, this.body);
    }

    display(){
        var posi = this.body.position
        var angle = this.body.angle
        var index = floor(this.speed % this.animation.length)
        push();
        translate(posi.x, posi.y);
        rotate(angle);
        imageMode(CENTER);
        image(this.animation[index], 0, this.pos, this.l, this.a);
        pop();
    }

    remove(index){
        this.animation = brokenBoatAnimation
        this.speed = 0.05
        this.broken = true
        this.l = 300
        this.a = 300
        
        setTimeout(() => {
            World.remove(world, barcos[index].body);
            delete barcos[index]
        }, 2000);
    }

    animate(){
        this.speed += 0.05;
    }

}