class Question {

  constructor() {
    this.buttonPlay = createButton('Play');
    this.buttonSetting = createButton('Settings')
    this.buttonHTP =  createButton('How to play')

  }

  
  display(){

    this.buttonPlay.position(1, 300);
    this.buttonSetting.position(width/2, 300)
    this.buttonHTP.position(width/2, 300)

    this.buttonPlay.mousePressed(()=>{
      MenuState = 1
    });
    this.buttonHTP.mousePressed(()=>{
      MenuState = 2
    });
    this.buttonSetting.mousePressed(()=>{
      MenuState = 3
    });
  }
}


