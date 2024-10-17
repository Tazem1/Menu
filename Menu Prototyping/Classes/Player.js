const SAT = Matter.SAT

document.addEventListener("keydown", (e) => {keys[e.key] = true;});

document.addEventListener("keyup", (e) => {keys[e.key] = false;});

class Player{
    constructor(idle, mRF, mLF, jLImg, jRImg){
        this.whiteChange = idle;
        this.whiteIdle = idle;
        this.moveRightFrames = mRF;
        this.moveLeftFrames = mLF;
        this.jumpLeftImage = jLImg;
        this.jumpRightImage = jRImg;

        var options = { density: 10, restitution: 0, friction: 5 };
        this.body = Bodies.rectangle(400, 700, 70, 70, options);
        World.add(world, this.body);
    }
    frame(){
        this.frameDuration = 100
        this.lastFrameTime = 0
        this.currentFrame = 0

        if (millis() - this.lastFrameTime > this.frameDuration) {
            this.currentFrame = (this.currentFrame + 1) % 4
            this.lastFrameTime = millis() 
          }
            
          return this.currentFrame
           }

    colliding(body){
        return(
            Matter.SAT.collides(this.body,body.body).collided
            //Matter.SAT.colldies(this.body,this.platforms.forEach(element => {element.body}))
        )
    }

    updateMovement(body,left,right,jump){
    
        if (this.colliding(body)) {
          let currentVelocityX = this.body.velocity.x;
          if (keys[jump]) {
            let horizontalDirection = 0;
            this.whiteChange = this.jumpRightImage;
    
            if (keys[left]) {
              horizontalDirection = -1;
              this.whiteChange = this.jumpLeftImage;
            } else if (keys[right]) {
              horizontalDirection = 1;
              this.whiteChange = this.jumpRightImage;
            }
    
            Matter.Body.setVelocity(this.body, { x: currentVelocityX + horizontalDirection, y: -15 });
          }
      
          if (!keys[jump]) {
            if (keys[left]) {
              Matter.Body.setVelocity(this.body, { x: -5, y: 0 });
              this.whiteChange = this.moveLeftFrames[this.frame()];
            } else if (keys[right]) {
              Matter.Body.setVelocity(this.body, { x: 5, y: 0 });
              this.whiteChange = this.moveRightFrames[this.frame()];
            } else {
              Matter.Body.setVelocity(this.body, { x: 0, y: 0 });
              this.whiteChange = this.whiteIdle;
            }
  
        }
    }
}
    

    display(){
        push()
        imageMode(CENTER);
        image(this.whiteChange, this.body.position.x, this.body.position.y - 9);
        pop(); 
    }

    getPlayerPos(){
      return(this.body.position.x)
    }
    respawn(x,y){
      Matter.Body.setPosition(this.body,{x:x,y:y})
      Matter.Body.setVelocity(this.body,{x:0,y:0})
    }
}