const Engine = Matter.Engine,
World = Matter.World,
Bodies = Matter.Bodies,
Events = Matter.Events,
Collision = Matter.Collision,
Detector = Matter.Detector,
Query = Matter.Query;

 var plat1, plat2, plat3
  keys = {}

  var whiteMF = []
  var whiteMB = []
  var whiteJB = []

  let currentFrame = 0
  let frameDuration = 100
  let lastFrameTime = 0

  let lastJFrameTime = 0
  let jumpFrame = 0

  paused = false

MenuState = 0
var buttonPlay,buttonSetting,buttonHTP
const n = 1.5
var checkHide = false

var playChange
var play

settingsInput = []
buttons = []
CharChange = []

Master = []
sFX = []

starFrames = []

var left,right,jump
var leftInput,rightInput,jumpInput

one = 0
levelState = 0

function preload(){
  menuSelection = loadSound('Game Files/Sounds/Sound Effects/audio (2).mp3')
  menuHover = loadSound('Game Files/Sounds/Sound Effects/menu-selection-102220.mp3')

  null_ = loadImage('Game Files/Background/nothing.png')

  backButtonImg = loadImage('Game Files/Backz Buttons/Back R.png')
  backHoverImg = loadImage('Game Files/Backz Buttons/Back H.png')

  //main menu
  playIMG = loadImage('Game Files/Play Buttons/play h.png')
  playHoverIMG = loadImage('Game Files/Play Buttons/play.png')
  settingsImg = loadImage('Game Files/Settings Buttons/Setting R.png')
  settingsHoverImg = loadImage('Game Files/Settings Buttons/Settings H.png')
  guideButtonImg = loadImage('Game Files/Guide Buttons/Guide R.png')
  guideHoverButtonImg = loadImage('Game Files/Guide Buttons/Guide H.png')

  //play menu
  CharSIMG = loadImage('Game Files/Character Buttons/Avatar Button R.png.png')
  CharSHIMG = loadImage('Game Files/Character Buttons/Avatar Button H.png.png')

  arrowL = loadImage('Game Files/Arrow Buttons/Arrow L.png')
  arrowR = loadImage('Game Files/Arrow Buttons/Arrow R.png')
  arrowLH = loadImage('Game Files/Arrow Buttons/Arrow LH.png')
  arrowRH = loadImage('Game Files/Arrow Buttons/Arrow RH.png')

  playerW = loadImage('Game Files/Character Selection/White man.png')
  playerT = loadImage('Game Files/Character Selection/Tanned man.png')
  playerB = loadImage('Game Files/Character Selection/Brown man.png')
  playerD = loadImage('Game Files/Character Selection/Dark skin man.png')
  
  DoneR = loadImage('Game Files/Done Button/Done-R.png (1).png')
  DoneH = loadImage('Game Files/Done Button/Done-H.png.png')

  oneImg = loadImage('Game Files/Level 1/Level1 R.png')
  oneHImg = loadImage('Game Files/Level 1/Level 1 H.png')

  twoImg = loadImage('Game Files/Level 2/Level 2 R.png')
  twoHImg = loadImage('Game Files/Level 2/Level 2 H.png')
  twoLImg = loadImage('Game Files/Level 2/Level 2 L.png')

  threeImg = loadImage('Game Files/Level 3/Level 3 R.png')
  threeHImg = loadImage('Game Files/Level 3/Level 3 H.png')
  threeLImg = loadImage('Game Files/Level 3/Level 3 L.png')

  fourImg = loadImage('Game Files/Level 4/Level 4 R.png')
  fourHImg = loadImage('Game Files/Level 4/Level 4 H.png')
  fourLImg = loadImage('Game Files/Level 4/Level 4 L.png')

  bossImg = loadImage('Game Files/Level Boss/Boss R.png')
  bossHImg = loadImage('Game Files/Level Boss/Boss H.png')
  bossLImg = loadImage('Game Files/Level Boss/Boss L.png')

  //settings things
  switchOn = loadImage('Game Files/Settings Switches/On SettingS.png')
  switchH  = loadImage('Game Files/Settings Switches/SettingS H.png')
  switchOff = loadImage('Game Files/Settings Switches/Off SettingS.png')

  volumePlus = loadImage('Game Files/Volume Buttons/Volume Buttons Pos R.png')
  volumePlusH = loadImage('Game Files/Volume Buttons/Volume Buttons Pos H.png')

  volumeNeg = loadImage('Game Files/Volume Buttons/Volume Buttons Neg R.png')
  volumeNegH = loadImage('Game Files/Volume Buttons/Volume Buttons Neg H.png')

  //backgrounds
  clear = loadImage('Game Files/Background/clear bg.png')
  title = loadImage('Game Files/Background/title 4.png')

  whiteIdle = loadImage('Game Files/Sprites/White Moving/white f1.png')
    for (let i = 1; i <= 4; i++) {whiteMF.push(loadImage(`Game Files/Sprites/White Moving/white f${i}.png`))}
    for (let i = 1; i <= 4; i++) {whiteMB.push(loadImage(`Game Files/Sprites/White Moving B/white b${i}.png`))}

    heartImg = loadImage('Game Files/Sprites/Other Sprites/heart.png')

    for(let i = 1; i <= 2; i++) {starFrames.push(`Game Files/Sprites/Other Sprites/star f${i}.png`)}

    pauseR = loadImage('Game Files/Sprites/Pause/pause R.png')
    pauseH = loadImage('Game Files/Sprites/Pause/pause H.png')
    playR = loadImage('Game Files/Sprites/Pause/Play R.png')
    playH = loadImage('Game Files/Sprites/Pause/Play H.png')
    
    jumpLImg = loadImage(`Game Files/Sprites/White Jumping/jump L.png`)
    jumpRImg = loadImage(`Game Files/Sprites/White Jumping/jump R.png`)
  
      //level backgrounds
    Level1bg = loadImage('Game Files/background/Level 1 - Jungle.png')
    Level2bg = loadImage('Game Files/background/Level 2 - Cave.png')
    Level3bg = loadImage('Game Files/background/Level 3 - Snowy Mountains.png')
    Level4bg = loadImage('Game Files/background/Level 4 - Temple.png')
    LevelBossbg = loadImage('Game Files/background/Level 5 - The Dragons Lair.png')

}

function setup(){
  canvas = createCanvas(screen.width*n,screen.height*n);

  engine = Engine.create()
  world = engine.world
  world.gravity.y = 1;
  move = 0

  ground = new Platform(width/2,height,width+100,20)
  barrier = new Platform(-10,height/2,20,height)
  killB = new Spikes(width/2,height-40,30,30)

  Matter.Runner.run(engine)
 
  bPlay()
  bSetting()
  bHTP()
  bBack()
  volumeButtons()
  AvatarSelection()
  pauseGame()

  mainMusic = createjs.Sound.registerSound("Game Files/Sounds/Sounds Tracks/Menu Main Music.mp3", "sound")
  levelOneST = createjs.Sound.registerSound("Game Files/Sounds/Sounds Tracks/Level 1 Music - Forest.mp3", "one")
  

  function startGameAudio(){
    createjs.Sound.play("sound", {loop: -1})
  }

  window.addEventListener('click', startGameAudio, { once: true })

  Master.push(mainMusic)

  oneC = oneImg
  twoC = twoLImg
  threeC = threeLImg
  fourC = fourLImg
  bossC = bossLImg

  //gameSetup()

  //game = new Game()
  //game.loadImages()
  //game.setupFunction()
  //game

  levelOne = new LevelButtons(false,oneImg,oneC,oneImg,oneHImg)
  levelOne.createbutton(1060,-300,300)

  levelTwo = new LevelButtons(twoLImg,twoImg,twoC,twoHImg)
  levelTwo.createbutton(1060,100,300)

  levelThree = new LevelButtons(threeLImg,threeImg,threeC,threeHImg)
  levelThree.createbutton(1060,500,300)

  levelFour = new LevelButtons(fourLImg,fourImg,fourC,fourHImg)
  levelFour.createbutton(1060,900,300)

  levelBoss = new LevelButtons(bossLImg,bossImg,bossC,bossHImg)
  levelBoss.createbutton(1860,300,300)

  player1 = new Player(whiteIdle,whiteMF,whiteMB,jumpLImg,jumpRImg)

  levels = [levelOne,levelTwo,levelThree,levelFour,levelBoss]

  function level1(){
    MenuState = 4
    levelState = 1

    for(i of levels){
      i.hid()

      select = false

    buttonAva.hide()
    avatarChange = null_

    paused = false

    paused = false
    plB.hide()
    pB.show()

    paCge = pauseR
    plCge = null_

    player1.respawn(70,70)
    //mainMusic.stop()
    //levelOneST.play()


    }
  }

  clicks = 0

  for(i of levels){
    i.hid()
  }

  CharChange.push(null_)
  CharChange.push(playerW)
  CharChange.push(playerT)
  CharChange.push(playerB)
  CharChange.push(playerD)

  CharIteration = 0
  Character = 1

  sFX.push(menuHover)
  sFX.push(menuSelection)


  for(i of volumes){
    i.hide()
  }

  for(i of switches){
    i.hide()
  }

  lives = 3

  left = "a"
  right = "d"
  jump = " "

  Mvolume = 100
  SFXvolume = 100

  posMC = null_
  posSC = null_
  negMC = null_
  negSC = null_
  doneC = null_

  titleC = title

  muteSC = null_
  muteMC = null_

  bgChange = clear

  

  avatarChange = null_
  lChange = null_
  rChange = null_

  leftInput = createInput(left)
  rightInput = createInput(right)
  jumpInput = createInput(jump)

  settingsInput.push(rightInput)
  settingsInput.push(leftInput)
  settingsInput.push(jumpInput)

  rightInput.position(2400,375)
  leftInput.position(2400,220)
  jumpInput.position(2400,530)

  for(input of settingsInput){
    input.style('font-size','75px')
    input.style('text-align','center')
    input.style('outline','none')
    input.style('text-font','VT323')
    input.size(100,100)
  }

  leftInput.hide()
  rightInput.hide()
  jumpInput.hide()

  buttonDone.hide()

  buttonRightA.hide()
  buttonLeftA.hide()

  

  playChange = playIMG
  settingsChange = settingsImg
  htpChange = guideButtonImg
  backChange = null_

  select = false

  buttonAva.hide()

  buttons.push(buttonPlay)
  buttons.push(buttonHTP)
  buttons.push(buttonSetting)
  buttons.push(buttonBack)


  buttonPlay.mouseClicked(()=>{
    if(window.devicePixelRatio*100 === 100){
    MenuState = 1
    checkHide = true
    menuSelection.play()
    backChange = backButtonImg
    
    for(i of levels){
      i.showImg()
      i.show()
    }

    avatarChange = CharSIMG
    select = false
  }
  });
  buttonHTP.mouseClicked(()=>{
    if(window.devicePixelRatio*100 === 100){
    MenuState = 3
    checkHide = true
    menuSelection.play()
    backChange = backButtonImg
  }
  });
  buttonSetting.mouseClicked(()=>{
    if(window.devicePixelRatio*100 === 100){
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
  }
  });
  buttonBack.mouseClicked(()=>{
    if(window.devicePixelRatio*100 === 100){
    if(MenuState != 4){
    MenuState = 0
    checkHide = false
    menuSelection.play()

    paused = false

    
    
    playChange = playIMG
    settingsChange = settingsImg
    htpChange = guideButtonImg
    avatarChange = null_

    paCge = null_
    plCge = null_

    leftInput.hide()
    rightInput.hide()
    jumpInput.hide()

    buttonRightA.hide()
    buttonLeftA.hide()

    posMC = null_
    posSC = null_
    negMC = null_
    negSC = null_
    doneC = null_

    muteSC = null_
    muteMC = null_

    select = false

    buttonAva.hide()

    for(i of levels){
      i.hid()
    }
  
    for(i of volumes){
      i.hide()
    }

    for(i of switches){
      i.hide()
    }
  }
  else if(clicks === 1&&lives != 0){
    MenuState = 1
    levelState = 0
    checkHide = true
    menuSelection.play()
    backChange = backButtonImg

    clicks = 0
    
    for(i of levels){
      i.showImg()
      i.show()
    }

    avatarChange = CharSIMG
    select = false
  }
  else if(MenuState === 4&&lives != 0){
    clicks += 1
  }
  else if(lives === 0){
    lives = 3

    MenuState = 1
    levelState = 0
    checkHide = true
    menuSelection.play()
    backChange = backButtonImg

    buttonBack.position(-20,-340)

    avatarChange = CharSIMG
    select = false

    clicks = 0
    
    for(i of levels){
      i.showImg()
      i.show()
    }
  }
}
  })

  buttonAva.mouseClicked(()=>{
    if(window.devicePixelRatio*100 === 100){
    select = true
    menuSelection.play()
    doneC = DoneR
    CharIteration = Character

    lChange = arrowL
    rChange = arrowR
    }
  })

  buttonDone.mouseClicked(()=>{
    select = false
    buttonDone.hide()
    menuSelection.play()

    backChange = backButtonImg
    avatarChange = CharSIMG

    for(i of levels){
      i.showImg()
      i.show()
    }

    Character = CharIteration
    CharIteration = 0
  })

  buttonLeftA.mouseClicked(()=>{
    if(CharIteration != 1){
    CharIteration = CharIteration-1
    }
  })

  buttonRightA.mouseClicked(()=>{
    if(CharIteration != 4){
    CharIteration = CharIteration+1
    }
  })
  pB.mouseClicked(()=>{
    paused = true

    buttonBack.show()
    backChange = backButtonImg

    paCge = null_
    plCge = playR

    pB.hide()
    plB.show()
  })
  plB.mouseClicked(()=>{
    if(lives != 0){
    paused = false
    plB.hide()
    pB.show()

    clicks = 0

    paCge = pauseR
    plCge = null_}
  })
  levelOne.mousePressed(level1)
}
 


function draw(){
  if(window.devicePixelRatio*100 === 100){
  background(bgChange)
  //console.log(player1.getPlayerPos())

  // Makes the buttons hide when the menu changes
  if (checkHide) {
    buttonPlay.hide()
    buttonSetting.hide();
    buttonHTP.hide();
    buttonBack.show();

    bgChange = clear

    playChange = null_
    settingsChange = null_
    htpChange = null_
    titleC = null_
  } 
  else {
    buttonBack.hide()
    buttonPlay.show();
    buttonSetting.show();
    buttonHTP.show();


    backChange = null_
    titleC = title
  }


  settingInput() //In settings makes keybind change
  Hover()  
  // Makes the buttons hover
  levelOne.hover(menuHover,oneHImg) 
  levelTwo.hover(menuHover,twoHImg)

  
  

  //play = image(playChange,buttonPlay.x,buttonPlay.y)
  play = image(playChange,(width - playIMG.width) / 2, 550)
  settings = image(settingsChange,buttonSetting.x,buttonSetting.y+235)
  guide = image(htpChange,buttonHTP.x, buttonHTP.y+205)
  avatar = image(avatarChange,buttonAva.x,buttonAva.y+195)

  PosM = image(posMC,volumePosM.x,volumePosM.y+320)
  NegM = image(negMC, volumeNegM.x,volumeNegM.y+320)

  PosS = image(posSC,volumePosS.x,volumePosS.y+320)
  NegS = image(negSC,volumeNegS.x,volumeNegS.y+320)

  muteMas = image(muteMC,muteM.x,muteM.y+305)
  muteSFX = image(muteSC,muteS.x,muteS.y+300)

  arrowleft = image(lChange,buttonLeftA.x-100,buttonLeftA.y+215)
  arrowright = image(rChange,buttonRightA.x-100,buttonRightA.y+215)

  push()
  imageMode(CENTER)
  titleImg = image(titleC,width/2,350)
  char = image(CharChange[CharIteration],width/2,height/2-75)
  pop()

  done = image(doneC,buttonDone.x,buttonDone.y+205)


  for(i of levels){
    i.imageR()
  }

  if(MenuState == 1){ // levels menu
    if(!select&&levelState === 0){
    buttonAva.show()
    buttonBack.show()

    buttonRightA.hide()
    buttonLeftA.hide()

    doneC = null_

    lChange = null_
    rChange = null_

  }
    else if(select){
    bgChange = "black"

    buttonDone.show()
    buttonAva.hide()
    buttonBack.hide()

    buttonRightA.show()
    buttonLeftA.show()
    
    for(i of levels){
      i.hid()
    }

    backChange = null_
    avatarChange = null_
    
    }

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
    textFont('VT323')
    textSize(120)
    fill("white")
    strokeWeight(100)

    text("Master Volume",500,500)
    text("SFX Volume",500,1000)
    text("Keybinds",1850,500)

    textSize(95)
    text("Move left: ",1865,650)
    text("Move right: ",1865,800)
    text("Jump: ",1865,950)

    text("Mute: ",515,845)
    text("Mute: ",515,1345)
    pop()

    push()
    textAlign(CENTER)
    textFont('VT323')
    textSize(95)
    fill("white")
    strokeWeight(100)

    text(Mvolume,880,670)
    text(SFXvolume,880,1160)
    pop()
    
  }
  else if(MenuState === 3){// how to play
    push()
    textFont('VT323')
    textSize(90)
    fill("white")
    strokeWeight(5)
    
    text(left.toUpperCase()+" : Move left", 1160,680)
    text(right.toUpperCase()+" : Move Right", 1160,760)
    if(jump === " "){
      text("SPACE: Jump", 1160, 840)
    }
    else{
     text(jump.toUpperCase()+" : Jump", 1160, 840) 
    }
    
    text("These keybinds can be changed in settings (the wrench)",420,920)
    text("Progress through the levels with only three hearts",580,1000)
    text("and defeat the boss to win!",1000,1080)
    pop()
  }
  else if(MenuState === 4){
    select = false
    
    buttonAva.hide()
    avatarChange = null_

    for(i of levels){
      i.hid()
    }

  }
  if(levelState === 1){
    bgChange = Level1bg

    translate(
      (-player1.getPlayerPos() + width * 0.3) / 0.9,
      -100
    )

    ground.display()
    player1.display()
    killB.display()

    killB.damage(player1,(()=>{
      player1.respawn(70,70)
      lives -= 1
    }))


    if(!paused){
      rectMode(CENTER);
    
      Engine.update(engine);
      
      buttonBack.hide()
    backChange = null_
    
      player1.updateMovement(
        ground,
        leftInput.value(),
        rightInput.value(),
        jumpInput.value())
  
    push()
    resetMatrix()
    imageMode(CENTER)
    image(paCge,100,100)
  
  pop()
  }
  else{
    whiteChange = whiteIdle
    
    push()
    resetMatrix()
    rectMode(CENTER)
    fill(0, 0, 0, 200);
    rect(width/2,height/2, width*1.5, height*1.5);
    pop()

  push()
    if(lives != 0 ){
    resetMatrix()
    textSize(150)
    textAlign(CENTER)
    textFont("VT323")
    text("Paused", width/2,height/2-300)}
    
    if(clicks === 1){
      fill("red")
      text("ARE YOU SURE YOU WANT TO QUIT?",width/2,height/2+600)
    }
   
  
    imageMode(CENTER)
    image(plCge,width/2,height/2)
    pop()

    }
  }
  else if(levelState === 2){

  }
  else if(levelState === 3){

  }
  else if(levelState === 4){

  }
  else if(levelState === 5){

  }

}
else{
  //bgChange = "red"

  textFont('VT323')
  textSize(140)
  fill("red")
  strokeWeight(5)
  text("Back to 100% zoom pls else the game will not work.",width/2-1360,height/2-10)
  MenuState = 0
  checkHide = false
  
  playChange = playIMG
  settingsChange = settingsImg
  htpChange = guideButtonImg
  avatarChange = null_

  leftInput.hide()
  rightInput.hide()
  jumpInput.hide()

  buttonRightA.hide()
  buttonLeftA.hide()

  posMC = null_
  posSC = null_
  negMC = null_
  negSC = null_
  doneC = null_

  muteSC = null_
  muteMC = null_

  select = false

  buttonAva.hide()

  for(i of levels){
    i.hid()
  }

  for(i of volumes){
    i.hide()
  }

  for(i of switches){
    i.hide()
  }
}
push()
resetMatrix()
back = image(backChange,buttonBack.x,buttonBack.y+205)

if(MenuState === 1&&!select||MenuState === 4&&!select){
  for(let i = 0;i <= lives;i++){image(heartImg,width-80-i * 250, -50)}}

  if(lives === 0){

    textSize(350)
    textAlign(CENTER)
    textFont("VT323")

    buttonBack.show()
    backChange = backButtonImg

    paCge = null_

    pB.hide()

    paused = true
    text("YOU DIED!",width/2,height/2-200)
    buttonBack.position(width/2-300,height/2-300)

  }
pop()
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

  volumePosM.position(500,220)
  volumeNegM.position(1100,220)
  volumePosS.position(500,710)
  volumeNegS.position(1100,710)

  muteM.position(780,430)
  muteS.position(780,930)

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
  
  // uncomment when the other music is in
  volumePosM.mouseClicked(()=>{
    if(Mvolume != 100){
      Mvolume = Mvolume+10
    }
    if(m === 1){
    for(masters of Master){
    masters.volume = Mvolume/100
    }}
  })

  volumeNegM.mouseClicked(()=>{
    if(Mvolume != 0){
      Mvolume = Mvolume-10
    }
    if(m === 1){
    for(masters of Master){
    masters.volume = Mvolume/100
    }}
  })

  volumePosS.mouseClicked(()=>{
    if(SFXvolume != 100){
      SFXvolume = SFXvolume+10
    }
    if(s === 1){
    for(sfx of sFX){
    sfx.setVolume(SFXvolume/100)
    }}
  })

  volumeNegS.mouseClicked(()=>{
    if(SFXvolume != 0){
      SFXvolume = SFXvolume-10
    }
    if(s === 1){
    for(sfx of sFX){
    sfx.setVolume(SFXvolume/100)
    }}
  })

    muteM.mouseClicked(()=>{
      if(m === 0){
        m = 1
        muteMC = switchOn
         for(masters of Master){
    masters.volume = 0
    }
      }
      else if(m === 1){
        m = 0
        muteMC = switchOff
      for(masters of Master){
      masters.volume = Mvolume/100
      } 
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
  buttonPlay.position((width - playIMG.width) / 2, 315);
  buttonPlay.size(playIMG.width,300)
  buttonPlay.style('background-color','transparent')
  buttonPlay.style('border-color','transparent')
}
function bSetting(){
  buttonSetting = createButton(' ')
  buttonSetting.position(580, 800)
  buttonSetting.size(settingsImg.width,300)
  buttonSetting.style('background-color','transparent')
  buttonSetting.style('border-color','transparent')
}

function bHTP(){
  buttonHTP =  createButton(' ')
  buttonHTP.position(1750, 800)
  buttonHTP.size(guideButtonImg.width,300)
  buttonHTP.style('background-color','transparent')
  buttonHTP.style('border-color','transparent')
}

function bBack(){
  buttonBack = createButton(' ')
  buttonBack.position(-20,-340)
  buttonBack.size(backButtonImg.width,300)
  buttonBack.style('background-color','transparent')
  buttonBack.style('border-color','transparent')
}

function AvatarSelection(){
  buttonAva = createButton(' ')
  buttonAva.position(-30,340)
  buttonAva.size(CharSIMG.width,300)
  buttonAva.style('background-color','transparent')
  buttonAva.style('border-color','transparent')

  buttonDone = createButton(' ')
  buttonDone.position(width/2-DoneR.width/2,height-DoneR.height-50)
  buttonDone.size(DoneR.width,300)
  buttonDone.style('background-color','transparent')
  buttonDone.style('border-color','transparent')

  buttonRightA = createButton(' ')
  buttonRightA.position(2160,200)
  buttonRightA.size(arrowR.width-200,arrowR.width-200)
  buttonRightA.style('background-color','transparent')
  buttonRightA.style('border-color','transparent')

  buttonLeftA = createButton(' ')
  buttonLeftA.position(350,200)
  buttonLeftA.size(arrowL.width-200,arrowL.width-200)
  buttonLeftA.style('background-color','transparent')
  buttonLeftA.style('border-color','transparent')

}

function pauseGame(){
  pB = createButton(' ')
  pB.position(10,-345)
  pB.size(200,200)
  pB.style('background-color','transparent')
  pB.style('border-color','transparent')
  pB.class('center')

  plB = createButton(' ')
  plB.position(width/2-100,height/2-450)
  plB.size(200,200)
  plB.style('background-color','transparent')
  plB.style('border-color','transparent')
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

  buttonAva.mouseOver(()=>{
    avatarChange = CharSHIMG
    menuHover.play()
  })

  buttonAva.mouseOut(()=>{
    avatarChange = CharSIMG
  })

  buttonDone.mouseOver(()=>{
    doneC = DoneH
    menuHover.play()
  })

  buttonDone.mouseOut(()=>{
    doneC = DoneR
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

  buttonLeftA.mouseOver(()=>{
    lChange = arrowLH
  })

  buttonLeftA.mouseOut(()=>{
    lChange = arrowL
  })

  buttonRightA.mouseOver(()=>{
    rChange = arrowRH
  })

  buttonRightA.mouseOut(()=>{
    rChange = arrowR
  })

  pB.mouseOver(()=>{
    paCge = pauseH
  })
  pB.mouseOut(()=>{
    paCge = pauseR
  })

  plB.mouseOver(()=>{
    plCge = playH
  })
  plB.mouseOut(()=>{
    plCge = playR
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
