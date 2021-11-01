//Init Canvas
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')



//Load images
const loadedImages = {}
console.log(loadedImages)
const imageLinks = [
    {link:"/images/galaga-bkg.png", name: 'background'},
    {link:"./images/player-one.png", name: 'player1'},
    {link:"/images/blue-fly.png", name: 'bluefly'},
    {link:"/images/green-fly.png", name:'greenfly'}, 
    {link: "/images/bullet.png", name:'bullet'}, 
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
console.log(counterForLoadedImages)


// Classes

class Player1 {
    constructor(){
        this.x=400; 
        this.y=800; 
        this.whidth=45;
        this.height=48;
        this.speedX=0;  //It has not speedY because the player1 only moves on the X axis (right and left)
        
    }
}



class Enemy{
    constructor(){
        this.x= Math.floor(Math.random()*600); 
        this.y= Math.floor(Math.random()*-100);
        this.whidth=45;
        this.height=48;
        this.speedX=1.1;
        this.speedY= Math.floor(Math.random()*5);
        this.appearNewInterval = 100
        this.enemyTimer = 0
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
    constructor(){
    this.x=300;
    this.y=800;
    this.whidth=10;
    this.height=16;
    this.speedX=0;
    this.speedY=-6;
}
}


class GreenEnemy extends Enemy{
    constructor(){
        super()
        this.x = 299
        this.greenenemy = loadedImages.greenfly
    }
}



const player1 = new Player1()

const enemy = new Enemy()

const bkg  = new Background()

const bullet = new Bullet()

const greenEnemy = new GreenEnemy()



// Draw with in game values
const drawBackground = ()=>{
    ctx.drawImage(loadedImages.background, bkg.x, bkg.y, bkg.whidth, bkg.height)
}


// Player1
const drawPlayer1 = ()=>{
    ctx.drawImage(loadedImages.player1, player1.x, player1.y, player1.whidth, player1.height)
}


const Inbounds = () =>{
    if (player1.x > 670){
        player1.x = 670
    }
    else if(player1.x < -15){
        player1.x = -15
    }
}
const movePlayer1 = ()=>{
    player1.x += player1.speedX
    Inbounds()
}

// Bullet
const drawBullet =()=>{
    ctx.drawImage(loadedImages.bullet, bullet.x, bullet.y, bullet.whidth, bullet.height)
}


let shooting = false
let shot = false
const moveBullet =()=>{
    if (shooting && shot == false){
        bullet.x = player1.x + player1.whidth / 2 - bullet.whidth / 2
        bullet.y = player1.y 
        shot = true
     } else if (shooting && shot){
         bullet.y += bullet.speedY
     } else if(bullet.y < 0){
        shot = false
        shooting = false
     } else if(shooting == false && shot == false){
        bullet.x= player1.x + player1.whidth / 2 - bullet.whidth / 2
        bullet.y = player1.y 
     }
    

    //bullet.x = player1.x + player1.whidth / 2 - bullet.whidth / 2
    //bullet.y = player1.y - bullet.height
}


// Enemy1


let arrayOfEnemies1 = []

const createEnemies1 = () => {
    for (let i = 0; i < 5; i++){
        const enemyOne = new Enemy()
        arrayOfEnemies1.push(enemyOne)
    }
    
}   
createEnemies1()
console.log(arrayOfEnemies1)

const drawEnemy1 = ()=>{
    arrayOfEnemies1.forEach((enemyOne) => {
        ctx.drawImage(loadedImages.bluefly, enemy.x, enemy.y, enemy.whidth, enemy.height)
})}

const moveEnemy1 = (arrayOfEnemies1)=>{
    enemy.x += Math.floor(Math.random(enemy.speedX)+0.5)
    enemy.y += Math.floor(Math.random()*(enemy.speedY)+1)
 }



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
    bkg.y += bkg.speedY
    
}

// const loopBkg () => {
//     if 
// }

// Clear the Canvas
const clearCanvas =() => {
    ctx.clearRect(0, 0, 697, 898)
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
      if(event.keyCode === 32){
        console.log("spacebar pressed")  
        shooting = true
        shot = true
          
      }
  })


function startGame(){
clearCanvas()
drawBackground()
drawPlayer1()
drawEnemy1()
drawBullet()
drawEnemy2()
movePlayer1()
moveBullet()
moveEnemy1()
moveEnemy2()
moveBackground()
requestAnimationFrame(startGame)
}