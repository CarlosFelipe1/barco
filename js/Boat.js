class Boat{
    constructor(x, y, l, a, pos){
        this.body = Bodies.rectangle(x, y, l, a);
        this.image = loadImage("./assets/boat.png");
        this.pos = pos;
        this.l = l;
        this.a = a;
        World.add(world, this.body);
    }

    display(){
        var posi = this.body.position
        var angle = this.body.angle
        push();
        translate(posi.x, posi.y);
        rotate(angle);
        imageMode(CENTER);
        image(this.image, 0, this.pos, this.l, this.a);
        pop();
    }
}