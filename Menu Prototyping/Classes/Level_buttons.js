class LevelButtons {
    constructor(lockimg, imgc, img, himg) {
        this.image = imgc;
        this.img = img;
        this.himg = himg;
        this.button = createButton(' ')
        this.null_ = loadImage('nothing.png');

        if (lockimg === false) {
            this.lock = null;
        } else {
            this.lock = lockimg;
        }
    }

    hid() {
        if (this.button) {
            this.button.hide();
        }
        this.image = this.null_;
    }

    show() {
        if (this.button) {
            this.button.show();
        }
        
    }

    showImg(){
        this.image = this.img;
    }

    createbutton(x, y, h) {
        this.button.position(x, y);
        this.button.size(600, h);
        this.button.style('background-color', 'transparent');
        this.button.style('border-color', 'transparent');
    }

    hover(sound,himg) {
        if (this.lock === null){
        this.button.mouseOver(() => {
            this.image = himg;

            try {
                if (sound && typeof sound.play === 'function') {
                    sound.play();
                } else {
                    throw new ReferenceError("No sound provided or sound.play is not a function");
                }
            } 
            catch (noSound) {} 
            finally {}
        });

        this.button.mouseOut(() => {
            this.image = this.img;
        });
    }
    else {
        this.button.mouseOver(()=>{
         this.image = this.lock   
        })
        this.button.mouseOut(()=>{
        this.image = this.lock
        })
        
    }
    }

    mousePressed(callback) {
        this.button.mouseClicked(() => {
            if (typeof callback === 'function') {
                callback()
                console.log("yes")
            }
            else{
                console.log("no") 
            }
        });
    }
    imageR(){
    push()
    image(this.image, this.button.x, this.button.y+200);
    pop()
    }
}