MenuState = 0
var buttonPlay,buttonSetting,buttonHTP
const n = 1.5
var checkHide = false
buttons = []
var playChange

function preload(){
  menuSelection = loadSound('menu-click-89198.mp3')
  menuHover = loadSound('menu-selection-102220.mp3')

  playIMG = loadImage('play h.png')
  playHoverIMG = loadImage('play.png')

}

function setup(){
  canvas = createCanvas(screen.width*n,screen.height*n);
  
  playChange = playIMG

  bPlay()
  bSetting()
  bHTP()
  bBack()


  buttons.push(buttonPlay)
  buttons.push(buttonHTP)
  buttons.push(buttonSetting)
  buttons.push(buttonBack)


  buttonPlay.mouseClicked(()=>{
    MenuState = 1
    checkHide = true
    menuSelection.play()
  });
  buttonHTP.mouseClicked(()=>{
    MenuState = 3
    checkHide = true
    menuSelection.play()
  });
  buttonSetting.mouseClicked(()=>{
    MenuState = 2
    checkHide = true
    menuSelection.play()
  });
  buttonBack.mouseClicked(()=>{
    MenuState = 0
    checkHide = false
    menuSelection.play()
  })

  
}
 


function draw(){
  //console.log(checkHide)
  background("lightgray");
  console.log(MenuState)
  if (checkHide) {
    buttonPlay.hide();
    buttonSetting.hide();
    buttonHTP.hide();
    buttonBack.show();  
  } 
  else {
    buttonBack.hide()
    buttonPlay.show();
    buttonSetting.show();
    buttonHTP.show();  
  }

  buttonPlay.mouseOver(()=>{
    console.log("yes")
    playChange = playHoverIMG
  })

  buttonPlay.mouseOut(()=>{
    console.log("no")
    playChange = playIMG
  })
  
  imageMode(CENTER)
  image(playChange,1440,380)

    /*if(playChange){
    
    }
    else{
    image(playIMG,1440,380)
    }*/
  
  
  

  for(i of buttons){
    i.mouseOver(()=>{
      menuHover.play()
      //console.log("yes")
    })
  }
  
  
}

function bPlay(){
  buttonPlay = createButton(' ');
  buttonPlay.position(1140, 200);
  buttonPlay.size(playIMG.width,300)
  buttonPlay.style('background-color','transparent')
  buttonPlay.style('border-color','transparent')

}
function bSetting(){
  buttonSetting = createButton('Settings')
  buttonSetting.position(1140, 720)
  buttonSetting.size(600,300)
  buttonSetting.style("font-size", "140px")
}

function bHTP(){
  buttonHTP =  createButton('How to play')
  buttonHTP.position(1140, 1240)
  buttonHTP.size(600,300)
  buttonHTP.style("font-size", "110px")
}

function bBack(){
  buttonBack = createButton('Back?')
  buttonBack.position(10,10)
  buttonBack.size(200,100)
  buttonBack.style("font-size", "60px")
}




