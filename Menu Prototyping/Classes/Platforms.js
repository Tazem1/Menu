class Platform{
    constructor(x,y,w,h) {
      var options = {
          isStatic: true,
          restitution:0
      }
      this.body = Bodies.rectangle(x,y,w,h,options);
      this.w = w; 
      this.h = h;
      World.add(world, this.body);
    }
    display(){
      var pos =this.body.position;
      rectMode(CENTER);
      fill("white");
    rect(pos.x, pos.y, this.w+1,this.h+1);
    }
  };
