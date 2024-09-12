MenuState = 0
var buttonPlay,buttonSetting,buttonHTP
const n = 1.5
var checkHide = false

var playChange
var play

settingsInput = []
buttons = []

Master = []
sFX = []

var left,right,jump
var leftInput,rightInput,jumpInput


function preload(){
  menuSelection = loadSound('menu-click-89198.mp3')
  menuHover = loadSound('menu-selection-102220.mp3')

  null_ = loadImage('null.png')

  playIMG = loadImage('play h.png')
  playHoverIMG = loadImage('play.png')

  settingsImg = loadImage('Settings Buttons/Setting R.png')
  settingsHoverImg = loadImage('Settings Buttons/Settings H.png')
  //settings things
  switchOn = loadImage('Settings Switches/On SettingS.png')
  switchH  = loadImage('Settings Switches/SettingS H.png')
  switchOff = loadImage('Settings Switches/Off SettingS.png')

  volumePlus = loadImage('Volume Buttons/Volume Buttons Pos R.png')
  volumePlusH = loadImage('Volume Buttons/Volume Buttons Pos H.png')

  volumeNeg = loadImage('Volume Buttons/Volume Buttons Neg R.png')
  volumeNegH = loadImage('Volume Buttons/Volume Buttons Neg H.png')

  guideButtonImg = loadImage('Guide Buttons/Guide R.png')
  guideHoverButtonImg = loadImage('Guide Buttons/Guide H.png')

  backButtonImg = loadImage('Backz Buttons/Back R.png')
  backHoverImg = loadImage('Backz Buttons/Back H.png')

  mainMenuBackground = loadImage('bg.png')
  clear = loadImage('clear bg.png')

}

function setup(){
  canvas = createCanvas(screen.width*n,screen.height*n);

  bPlay()
  bSetting()
  bHTP()
  bBack()
  volumeButtons()

  sFX.push(menuHover)
  sFX.push(menuSelection)

  for(i of volumes){
    i.hide()
  }

  for(i of switches){
    i.hide()
  }

  left = "a"
  right = "d"
  jump = "w"

  Mvolume = 100
  SFXvolume = 100

  posMC = null_
  posSC = null_
  negMC = null_
  negSC = null_

  muteSC = null_
  muteMC = null_

  leftInput = createInput(left)
  rightInput = createInput(right)
  jumpInput = createInput(jump)

  settingsInput.push(rightInput)
  settingsInput.push(leftInput)
  settingsInput.push(jumpInput)

  rightInput.position(2400,740)
  leftInput.position(2400,590)
  jumpInput.position(2400,890)

  for(input of settingsInput){
    input.style('font-size','75px')
    input.style('text-align','center')
    input.style('outline','none')
    input.size(100,100)
  }

  leftInput.hide()
  rightInput.hide()
  jumpInput.hide()

  

  playChange = playIMG
  settingsChange = settingsImg
  htpChange = guideButtonImg
  backChange = null_

  bgChange = mainMenuBackground

  buttons.push(buttonPlay)
  buttons.push(buttonHTP)
  buttons.push(buttonSetting)
  buttons.push(buttonBack)


  buttonPlay.mouseClicked(()=>{
    MenuState = 1
    checkHide = true
    menuSelection.play()
    backChange = backButtonImg
  });
  buttonHTP.mouseClicked(()=>{
    MenuState = 3
    checkHide = true
    menuSelection.play()
    backChange = backButtonImg
  });
  buttonSetting.mouseClicked(()=>{
    MenuState = 2
    checkHide = true
    menuSelection.play()
    backChange = backButtonImg

    posMC = volumePlus
    posSC = volumePlus
    negMC = volumeNeg
    negSC = volumeNeg

    if(m === 0){
      muteMC = switchOff
    }
    else{
      muteMC = switchOn
    }

    if(s === 0){
      muteSC = switchOff
    }
    else{
      muteSC = switchOn
    }
  });
  buttonBack.mouseClicked(()=>{
    MenuState = 0
    checkHide = false
    menuSelection.play()
    
    playChange = playIMG
    settingsChange = settingsImg
    htpChange = guideButtonImg

    leftInput.hide()
    rightInput.hide()
    jumpInput.hide()

    posMC = null_
    posSC = null_
    negMC = null_
    negSC = null_

    muteSC = null_
    muteMC = null_

    for(i of volumes){
      i.hide()
    }

    for(i of switches){
      i.hide()
    }
    
  })

  
}
 


function draw(){
  background(bgChange);
  //console.log(mouseX,mouseY)
  //console.log(left,right,jump)
  //console.log(m)
  console.log(menuHover.getVolume())

  volume = menuHover.getVolume()
  //console.log(volume)

  // Makes the buttons hide when the menu changes
  if (checkHide) {
    buttonPlay.hide()
    buttonSetting.hide();
    buttonHTP.hide();
    buttonBack.show();  

    playChange = null_
    settingsChange = null_
    htpChange = null_

    bgChange = clear
  } 
  else {
    buttonBack.hide()
    buttonPlay.show();
    buttonSetting.show();
    buttonHTP.show();

    bgChange = mainMenuBackground
    backChange = null_
  }

  settingInput() //In settings makes keybind change
  Hover() // Makes the buttons hover
  


  play = image(playChange,buttonPlay.x,buttonPlay.y-135)
  settings = image(settingsChange,buttonSetting.x,buttonSetting.y-135)
  guide = image(htpChange,buttonHTP.x,buttonHTP.y-155)

  PosM = image(posMC,volumePosM.x,volumePosM.y)
  NegM = image(negMC, volumeNegM.x,volumeNegM.y)

  PosS = image(posSC,volumePosS.x,volumePosS.y)
  NegS = image(negSC,volumeNegS.x,volumeNegS.y)

  muteMas = image(muteMC,muteM.x,muteM.y-65)
  muteSFX = image(muteSC,muteS.x,muteS.y-65)

  back = image(backChange,buttonBack.x,buttonBack.y-135)
  if(MenuState == 1){ // levels menu

  }
  else if(MenuState === 2){ // settings
    leftInput.show()
    rightInput.show()
    jumpInput.show()

    for(i of volumes){
      i.show()
    }

    for(i of switches){
      i.show()
    }

    push()
    textSize(120)
    fill("white")
    strokeWeight(5)

    text("Master volume",500,500)
    text("SFX volume",500,1000)
    text("Keybinds",1850,500)

    textSize(95)
    text("Move left: ",1865,650)
    text("Move right: ",1865,800)
    text("Jump: ",1865,950)

    text("Mute: ",515,845)
    text("Mute: ",515,1345)

    text(Mvolume,800,670)
    text(SFXvolume,800,1160)

    pop()
  }
  else if(MenuState === 3){// how to play
    push()
    textSize(90)
    fill("white")
    strokeWeight(5)
    
    text(left+" : Move left", 1160,680)
    text(right+" : Move Right", 1160,760)
    text(jump+" : Jump", 1160, 840)
    text("These keybinds can be changed in settings (the wrench)",420,920)
    text("Progress through the levels with only three hearts",580,1000)
    text("and defeat the boss to win!",1000,1080)
    pop()
  }

}

function volumeButtons(){
  volumePosM = createButton(' ')
  volumePosS = createButton(' ')
  volumeNegM = createButton(' ')
  volumeNegS = createButton(' ')

  muteM = createButton(' ')
  muteS = createButton(' ')

  s = 0
  m = 0

  volumePosM.position(510,560)
  volumeNegM.position(1100,560)
  volumePosS.position(510,1050)
  volumeNegS.position(1100,1050)

  muteM.position(780,790)
  muteS.position(780,1285)

  volumes = [volumePosM,volumePosS,volumeNegM,volumeNegS]
  switches = [muteM,muteS]

  for(i of volumes){
    i.size(200,200)
    i.style('background-color','transparent')
    i.style('border-color','transparent')
  }

  for(i of switches){
    i.size(250,100)
    i.style('background-color','transparent')
    i.style('border-color','transparent')
  }

  // uncomment when the other music is in
  volumePosM.mouseClicked(()=>{
    if(Mvolume != 100){
      Mvolume = Mvolume+1
    }
    /*for(m of Master){
    m.setVolume(Mvolume/100)
    }*/
  })

  volumeNegM.mouseClicked(()=>{
    if(Mvolume != 0){
      Mvolume = Mvolume-1
    }
    /*for(m of Master){
    m.setVolume(Mvolume/100)
    }*/
  })

  volumePosS.mouseClicked(()=>{
    if(SFXvolume != 100){
      SFXvolume = SFXvolume+1
    }
    for(m of sFX){
    m.setVolume(SFXvolume/100)
    }
  })

  volumeNegS.mouseClicked(()=>{
    if(SFXvolume != 0){
      SFXvolume = SFXvolume-1
    }
    for(m of sFX){
    m.setVolume(SFXvolume/100)
    }
  })

    muteM.mouseClicked(()=>{
      if(m === 0){
        m = 1
        muteMC = switchOn
         /*for(m of sFX){
    m.setVolume(0)
    }*/
      }
      else if(m === 1){
        m = 0
        muteMC = switchOff
         /*for(m of sFX){
      m.setVolume(Mvolume)
      } */
      }
    })

    muteS.mouseClicked(()=>{
      if(s === 0){
        s = 1
        muteSC = switchOn
    for(sfxSounds of sFX){
    sfxSounds.setVolume(0)
    }
      }
      else if(s === 1){
        s = 0
        muteSC = switchOff
      for(sfxSounds of sFX){
      sfxSounds.setVolume(SFXvolume/100)
      }
      }
    })
  }


function bPlay(){
  buttonPlay = createButton(' ');
  buttonPlay.position(1160, 680);
  buttonPlay.size(playIMG.width,300)
  buttonPlay.style('background-color','transparent')
  buttonPlay.style('border-color','transparent')

}
function bSetting(){
  buttonSetting = createButton(' ')
  buttonSetting.position(540, 1100)
  buttonSetting.size(settingsImg.width,300)
  buttonSetting.style('background-color','transparent')
  buttonSetting.style('border-color','transparent')
}

function bHTP(){
  buttonHTP =  createButton(' ')
  buttonHTP.position(1740, 1100)
  buttonHTP.size(guideButtonImg.width,300)
  buttonHTP.style('background-color','transparent')
  buttonHTP.style('border-color','transparent')
}

function bBack(){
  buttonBack = createButton(' ')
  buttonBack.position(10,10)
  buttonBack.size(backButtonImg.width,300)
  buttonBack.style('background-color','transparent')
  buttonBack.style('border-color','transparent')
}

function Hover(){
  buttonHTP.mouseOver(()=>{
    htpChange = guideHoverButtonImg
    menuHover.play()
  })

  buttonHTP.mouseOut(()=>{
    htpChange = guideButtonImg
  })
  
  buttonSetting.mouseOver(()=>{
    settingsChange = settingsHoverImg
    menuHover.play()
  })

  buttonSetting.mouseOut(()=>{
    settingsChange = settingsImg
  })
  
  buttonPlay.mouseOver(()=>{
    playChange = playHoverIMG
    menuHover.play()
  })

  buttonPlay.mouseOut(()=>{
    playChange = playIMG
  })

  buttonBack.mouseOver(()=> {
    if(checkHide){
    backChange = backHoverImg;
    menuHover.play();
    }
  });
  
  buttonBack.mouseOut(()=> {
    if(checkHide){
    backChange = backButtonImg;  
    }
  });
  
  volumePosM.mouseOver(()=>{
    posMC = volumePlusH
  })

  volumePosM.mouseOut(()=>{
    posMC = volumePlus
  })

  volumePosS.mouseOver(()=>{
    posSC = volumePlusH
  })

  volumePosS.mouseOut(()=>{
    posSC = volumePlus
  })

  volumeNegM.mouseOver(()=>{
    negMC = volumeNegH
  })

  volumeNegM.mouseOut(()=>{
    negMC = volumeNeg
  })

  volumeNegS.mouseOver(()=>{
    negSC = volumeNegH
  })

  volumeNegS.mouseOut(()=>{
    negSC = volumeNeg
  })
}


function settingInput(){
  leftInput.input(()=>{
  value = leftInput.value()

  if(value.length > 1 || value.length === 0){
    leftInput.value(value.charAt(0))
  }
  else{
    left = value
  }
  })

  rightInput.input(()=>{
    value = rightInput.value()
    
    if(value.length > 1 || value.length === 0){
      rightInput.value(value.charAt(0))
    }
    else{
      right = value
    }
    })

    jumpInput.input(()=>{
      value = jumpInput.value()
      
      if(value.length > 1 || value.length === 0){
        jumpInput.value(value.charAt(0))
      }
      else{
        jump = value
      }
      })
  }
