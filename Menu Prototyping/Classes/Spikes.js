class Spikes extends Platform{
    constructor(x,y,w,h){
        super(x,y,w,h)
    }
    display(){
        super.display()
        //fill("red")
    }
    damage(body,func){
        if(typeof func === 'function'){
            if(Matter.SAT.collides(body.body,this.body).collided === true){
                func()
            }
        }
    }
}