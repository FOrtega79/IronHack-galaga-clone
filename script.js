//Init Canvas
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const NumberOfEnemies = Math.random()* 10 +1
let arrayOfEnemies = []
let arrayOfBullets = []
let arrayOfExplosions = []
let animationFrameID = null
let createBlueEnemiesIntervalID;
let SpaceKeyPressed = 0
let gameOver = false


const soundTrack = new Audio("/sounds/8-bit-looping.flac")
soundTrack.volume = 0.05
soundTrack.preload ='auto'
soundTrack.load()

const player1shoot = new Audio("/sounds/FighterShot.mp3")
player1shoot.volume = 0.3
player1shoot.preload = 'auto'
player1shoot.load()

//Load images
const loadedImages = {}
const imageLinks = [
    {link:"/images/galaga-bkg.png", name: 'background'},
    {link: "/images/galaga-bkg2.png", name: 'background2'},
    {link:"./images/player-one.png", name: 'player1'},
    {link:"/images/blue-fly.png", name: 'bluefly'},
    {link:"/images/green-fly.png", name:'greenfly'}, 
    {link: "/images/bullet.png", name:'bullet'},
    {link: "/images/explosion-player1.png", name: 'player1dead'},
    {link: "/images/xplo-sprites.png", name: 'xplosion'}, 
    {link: "/images/game-over-splash.png", name: 'gameover'} 
]
// Loaded Images counter
let counterForLoadedImages = 0

imageLinks.forEach((image)=>{
    const img = new Image()
    img.src = image.link
    img.onload = ()=>{
        counterForLoadedImages++
        loadedImages[image.name] = img
    }
})



// Classes

class Player1 {
    constructor(){
        this.x=350; 
        this.y=800; 
        this.whidth=45;
        this.height=48;
        this.speedX=0;
        this.toDelete=false
    }
    update(){
        player1.x += player1.speedX
        Inbounds()
        
    }

    draw(){
        ctx.drawImage(loadedImages.player1, player1.x, player1.y, player1.whidth, player1.height)
    }
}

class Enemy{
    constructor(){
        this.x= Math.random()*550; 
        this.y= 1
        this.whidth=32.5;
        this.height=34;
        this.speedX= 2    //Math.random()* -1;
        this.speedY= 4     //Math.random()* 1;
        this.angle = 0
        this.angleSpeed = 1
        this.toDelete=false
        //this.curve = Math.random() * 200 + 50
    }
    update(){  
        this.x += Math.random()*5 - 2.5
        this.y += Math.random()*5 - 1
    }

    draw(){
        ctx.drawImage(loadedImages.bluefly, this.x, this.y, this.whidth, this.height)
    }
    checkIfInBoundaries(){
        if(this.y < 0 || this.x < 0 || this.x >= 697) this.toDelete = true
    }

    collide(){
        if (this.x > player1.x + player1.whidth ||
            this.x + this.whidth < player1.x ||
            this.y > player1.y + player1.height ||
            this.y + this.height < player1.y){
             
            }else{
            ctx.drawImage(loadedImages.player1dead, player1.x - 18, player1.y - 5, player1.whidth +36, player1.height + 20)
            endGame() 
            }
    }   
}
class Background{
    constructor(){
        this.x=0; 
        this.y=0; 
        this.whidth=697;
        this.height=898;
        this.speedX=0;
        this.speedY=0.5;
    }
}

class Bullet{
    constructor(x, y){
    this.x=x;
    this.y=y;
    this.whidth=10;
    this.height=16;
    this.speedY=-6;
    this.toDelete=false
}

    update(){
        this.y += this.speedY 
        // bullet.x = player1.x + player1.whidth / 2 - bullet.whidth / 2
        // bullet.y = player1.y - bullet.height
    }

    draw(){
        ctx.drawImage(loadedImages.bullet, this.x, this.y, this.whidth, this.height)
    }
}


const drawBullets = () => {
arrayOfBullets.forEach((bullet) =>{
    bullet.draw()
    bullet.update()
})
}

const player1 = new Player1()
const blueEnemy = new Enemy()
const bkg  = new Background()
const bkg2 = new Background(0, 898)
const greenEnemy = new Enemy()
const bullet = new Bullet()



let score = 0


// Draw with in game values
const drawBackground = ()=>{
    ctx.drawImage(loadedImages.background, bkg.x, bkg.y, bkg.whidth, bkg.height)
      
}

const Inbounds = () =>{
    if (player1.x > 670){
        player1.x = 670
    }
    else if(player1.x < -15){
        player1.x = -15
    }
}

const createBlueEnemies = () => {

    createBlueEnemiesIntervalID = setInterval(() => {
        for (let i = 0; i < NumberOfEnemies; i++)
        {arrayOfEnemies.push(new Enemy())}}, 2000) 
}



   

//createBlueEnemies()
//console.log(createBlueEnemies)

// Enemy2 
const drawEnemy2 = ()=>{
    ctx.drawImage(loadedImages.greenfly, greenEnemy.x, greenEnemy.y, greenEnemy.whidth, greenEnemy.height)
}  
const moveEnemy2 = ()=>{
    greenEnemy.x += Math.floor(Math.random()*(greenEnemy.speedX)-0.2)
    greenEnemy.y += Math.floor(Math.random()*(greenEnemy.speedY)+1)
}
// Background
const moveBackground =()=>{
    if(bkg.x === 898){
        ctx.drawImage(loadedImages.background2, bkg2.x, bkg2.y, bkg2.whidth, bkg2.height)
    }else if(bkg2.x === 898 ){
        ctx.drawImage(loadedImages.background, bkg.x, bkg.y, bkg.whidth, bkg.height)
    }
    bkg.y += bkg.speedY
    bkg2.y += bkg2.speedY
}

// Clear the Canvas
const clearCanvas =() => {
    ctx.clearRect(0, 0, 697, 898)
}

const checkCollision = () => {  
    arrayOfBullets.forEach((bullet) => { 
        arrayOfEnemies.forEach((enemy) => {
            if (bullet.x > enemy.x + enemy.whidth ||
                bullet.x + bullet.whidth < enemy.x ||
                bullet.y > enemy.y + enemy.height ||
                bullet.y + bullet.height < enemy.y){

                     
                }else{
                    enemy.toDelete = true 
                    bullet.toDelete = true
                    score++
                    document.getElementById('score').innerText = score
                    
                    
                }
        })
    })
}



// Execution --

window.onload = () => {
    document.getElementById('start-button').onclick = () => {
      startGame();
    }
}

document.addEventListener("keydown", (event)=>{
    if(event.key === "ArrowRight"){
      player1.speedX = 5
    } else if(event.key === "ArrowLeft"){
      player1.speedX = -5
    } 
  })
  document.addEventListener("keyup", (event)=>{
    if(event.key === "ArrowRight" || event.key === "ArrowLeft"){
      player1.speedX = 0
    }
  })
   document.addEventListener("keydown", (event)=>{
      if(event.key === " " && !gameOver){
        arrayOfBullets.push(new Bullet(player1.x + 18, player1.y - 15))
        player1shoot.play()
      }
    
  })


// Counter for Space bar 
  const pressed = document.addEventListener("keydown", (e) =>{
      if (e.key === " "){
      SpaceKeyPressed++
      //console.log(SpaceKeyPressed)
  }})


 

  const endGame = () =>{
    arrayOfEnemies = []
    arrayOfBullets = []
    arrayOfExplosions = []
    // player1shoot.pause()
    gameOver = true
    //limpiar arrays
    clearInterval(createBlueEnemiesIntervalID)
    setTimeout(() => {
        cancelAnimationFrame(requestAnimationFrameID)
        clearCanvas()
        soundTrack.pause()
        ctx.drawImage(loadedImages.gameover, 0, 0, 697, 898)
    }, 500)
}

const startGame = () => {
createBlueEnemies()
gameLoop()
gameOver = false
}

function gameLoop(){
soundTrack.play()
clearCanvas()

drawBackground()

player1.draw()
player1.update()

arrayOfEnemies.forEach(enemy =>{
enemy.update()
enemy.draw()
enemy.checkIfInBoundaries()
enemy.collide()
})

arrayOfEnemies = arrayOfEnemies.filter((enemy) => {
return !enemy.toDelete    
})

arrayOfBullets = arrayOfBullets.filter((bullet)=>{
return !bullet.toDelete
})

checkCollision()
drawBullets()
drawEnemy2()
moveEnemy2()

moveBackground()
setTimeout(() => {
    document.getElementById('ratio').innerText = ((score / SpaceKeyPressed) * 100).toFixed(1)
}, 4000); 

    requestAnimationFrameID = requestAnimationFrame(gameLoop)
}