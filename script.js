const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

let keys = [];
let walls = [];
let players = [];
let balls = [];
class Wall {
    constructor(x, y, xLength, yLength){
        this.x = x;
        this.y = y;
        this.xLength = xLength;
        this.yLength = yLength;
    }
    draw(){
        c.fillStyle = "white";
        c.fillRect(this.x, this.y, this.xLength, this.yLength);
    }
}
class Player {
    constructor(x, y, width, height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.upwardsSpeed = 1;
        this.downwardsSpeed = 1;
        this.colliding = false;
    }
    draw(){
        c.fillStyle = "white";
        c.fillRect(this.x, this.y, this.width, this.height);
    }
}
class Ball {
    constructor(x, y, width, height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.xSpeed = 1;
        this.ySpeed = 1 ;

        this.xDir = 1.5;
        this.yDir = 1.5;
    }
    draw(){
        c.fillStyle = "white";
        c.fillRect(this.x, this.y, this.width, this.height);
    }
    move(){
        this.x += this.xSpeed * this.xDir;
        this.y += this.ySpeed * this.yDir;
    }
}


// walls.push(new Wall(canvas.width* (1/8), canvas.height * (1/10), canvas.width * (6/8), 2));
// walls.push(new Wall(canvas.width* (1/8), canvas.height * (5/10) , canvas.width * (6/8), 2));
balls.push(new Ball(400, 300, 10, 10));

walls.push(new Wall(100, 100, 600, 2));
walls.push(new Wall(100, 500, 600, 2));
walls.push(new Wall(100, 100, 2, 400));
walls.push(new Wall(700, 100, 2, 402));

players.push(new Player(150, 300, 7, 30));
players.push(new Player(650, 300, 7, 30));

function update(){
    refrech();
    walls.forEach(wall => {
        wall.draw();
    });
    players.forEach(player => {
        player.draw();
    });
    balls.forEach(ball => {
        ball.draw();
        ball.move();
    });
    if(balls[0] != undefined){
        checkCollisions(balls[0], players, "playerBallCollision");
        checkCollisions(balls[0], walls, "ballWallCollision");
    }
    

    checkCollisions(players[0], walls, "playerWallCollision");
    checkCollisions(players[1], walls, "playerWallCollision");

    keyboardInputs()
    requestAnimationFrame(update);
}
update();

function refrech(){
    c.fillStyle = "rgba(0, 0, 0, 0.3)"
    c.fillRect(0, 0, canvas.width, canvas.height);
}

document.addEventListener('keydown', function(event) {
    // console.log(event.keyCode);
    keys[event.keyCode] = true;
});
document.addEventListener('keyup', function(event){
    keys[event.keyCode] = false;
});
function keyboardInputs(){
    //w
    if(keys[87]){

        players[0].y -= players[0].upwardsSpeed;
    }
    //s
    if(keys[83]){
        players[0].y += players[0].downwardsSpeed;
    }

    if(keys[38]){
        players[1].y -= players[1].upwardsSpeed;
    }
    if(keys[40]){
        players[1].y += players[1].downwardsSpeed;
    }
}
function destroyBall(){
    balls.splice(0, 1);
    setTimeout(spawnNewBall, 3000);
}
function spawnNewBall(){
    balls.push(new Ball(400, 300, 10, 10));
}
function checkCollisions(ob, arr, type){
    switch (type) {
        case "ballWallCollision":
            for (let i = 0; i < arr.length; i++) {
                //x collision
                if(ob.x + ob.width >= arr[i].x && ob.x <= arr[i].x){
                    destroyBall();
                }else if(ob.y + ob.height >= arr[i].y && ob.y <= arr[i].y){ //y collision
                    ob.yDir *= -1;
                }
                
                
            } 
            break;
        case "playerBallCollision":
            for (let i = 0; i < arr.length; i++) {        
                //x collision
                if(ob.x + ob.width >= arr[i].x && ob.x <= arr[i].x + arr[i].width && ob.y + ob.height >= arr[i].y && ob.y <= arr[i].y + arr[i].height){
                    ob.xDir *= -1;
                }
            } 
            break;
        case "playerWallCollision":
                for (let i = 0; i < walls.length; i++) {
                    if(ob.x <= arr[i].x + arr[i].xLength && ob.x + ob.width >= arr[i].x){
                        //wall collision
                        if(ob.y <= arr[i].y + arr[i].yLength && ob.y + ob.height >= arr[i].y ){
                            colliding = true;
                            if(arr[i] === arr[0]){
                                ob.y = arr[i].y + arr[i].yLength +1;
                                ob.upwardsSpeed = 0;
                            }
                            if(arr[i] === arr[1]){
                                ob.y = arr[i].y - ob.height;
                                ob.downwardsSpeed = 0;
                            }
                        }else{
                            ob.downwardsSpeed = 1;
                            ob.upwardsSpeed = 1;
                        }
                    }
                }
            break;
    }
      
}
