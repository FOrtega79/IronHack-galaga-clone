//Init Canvas
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const NumberOfEnemies = 15
const arrayOfEnemies = []
const arrayOfBullets = []


//Load images
const loadedImages = {}
const imageLinks = [
    {link:"/images/galaga-bkg.png", name: 'background'},
    {link:"./images/player-one.png", name: 'player1'},
    {link:"/images/blue-fly.png", name: 'bluefly'},
    {link:"/images/green-fly.png", name:'greenfly'}, 
    {link: "/images/bullet.png", name:'bullet'},
    {link: "/images/explosion-player1.png", name: 'player1dead'} 
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
        this.x=400; 
        this.y=800; 
        this.whidth=45;
        this.height=48;
        this.speedX=0;
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
        this.x= Math.random()*697; 
        this.y= Math.random()*100;
        this.whidth=45;
        this.height=48;
        this.speedX= Math.random()* 4 -2;
        this.speedY=1;
    }
    update(){
        this.x += this.speedX
        this.y += this.speedY
        Inbounds()
        
        
    }

    draw(){
        ctx.drawImage(loadedImages.bluefly, this.x, this.y, this.whidth, this.height)
    }

    collide(){
        if (this.x > player1.x + player1.whidth ||
            this.x + this.whidth < player1.x ||
            this.y > player1.y + player1.height ||
            this.y + this.height < player1.y){
             
            }else{
            ctx.drawImage(loadedImages.player1dead, player1.x, player1.y)
             
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
}

    update(){
        this.y += this.speedY 
        // bullet.x = player1.x + player1.whidth / 2 - bullet.whidth / 2
        // bullet.y = player1.y - bullet.height
    }

    draw(){
        ctx.drawImage(loadedImages.bullet, this.x, this.y, this.whidth, this.height)
    }

    collide(){
        if (this.x > blueEnemy.x + blueEnemy.whidth ||
            this.x + this.whidth < blueEnemy.x ||
            this.y > blueEnemy.y + blueEnemy.height ||
            this.y + this.height < blueEnemy.y){
             
            }else{
            ctx.drawImage(loadedImages.player1dead, player1.x, player1.y)
             
            }
    }
    
}

const drawBullets = () => {
arrayOfBullets.forEach((bullet) =>{
    bullet.draw()
    bullet.update()
    bullet.collide()
})
}



const player1 = new Player1()

const blueEnemy = new Enemy()

const bkg  = new Background()

const greenEnemy = new Enemy()



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

const collide = () =>{
   
}


const createBlueEnemies = () => {
    for (let i = 0; i < NumberOfEnemies; i++){
        arrayOfEnemies.push(new Enemy())
    }
    
}   
createBlueEnemies()
console.log(arrayOfEnemies)



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
      if(event.key === " "){
        console.log("spacebar pressed")  
        arrayOfBullets.push(new Bullet(player1.x + 18, player1.y - 15))
          
      }
  })


function startGame(){
clearCanvas()
drawBackground()
player1.draw()
player1.update()
arrayOfEnemies.forEach(enemy =>{
    enemy.update()
    enemy.draw()
    enemy.collide()
})
drawBullets()
drawEnemy2()
moveEnemy2()
moveBackground()

requestAnimationFrame(startGame)
}