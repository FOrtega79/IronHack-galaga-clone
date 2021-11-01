const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
CANVAS_WIDTH = canvas.width = 697
CANVAS_HEIGHT = canvas.height = 898
const NumberOfEnemies = 10
const enemiesArray = []

const enemyImage = new Image()
enemyImage.src= '/images/blue-fly.png'



class Enemy{
    constructor(){
        this.x= 300; 
        this.y= 200;
        this.whidth=45;
        this.height=48;
        this.speedX=1.1;
        this.speedY= Math.floor(Math.random()*5);
    }
    update(){            //como se van a mover
        this.x++
        this.y++
    }

    draw(){
        ctx.drawImage(enemyImage, this.x, this.y, this.width, this.height)
    }
}

//const enemyblue = new Enemy()
console.log(enemiesArray)
for (let i = 0; i<NumberOfEnemies; i++){
    enemiesArray.push(new Enemy())
}

window.onload = () => {
    document.getElementById('start-button').onclick = () => {
      startGame();
    }
}

function startGame(){
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    enemiesArray.forEach(enemy =>{
        enemy.update()
        enemy.draw()
    })
    requestAnimationFrame(startGame)
}
startGame()