const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 825;
canvas.height = 650;

//menu buttons

// let okok = document.getElementsByClassName('okok');
// for (let i = 0; i < okok.length; i++) {
//     okok[i].innerHTML = "ghe"
// }

let menuBtns;
    menuBtns = document.document.querySelectorAll('.menuButton');
    console.log(menuBtns.length);

// for(let i = 0; i < menuBtns.length; i++){
//     menuBtns[i].addEventListener('click', function(){
//         reloadPage();
//     })
// }
// menuBtns.forEach(btn => {
//     btn.innerHTML = "hhh";
// });


function reloadPage(){
    location.reload();
}


const playerVsPlayerBtn = document.getElementById("playerVSplayer");

//player game modes:
const classicBtn = document.getElementById("classicMode");

classicBtn.addEventListener('click', function(){startGame()});

//scene blocks
document.getElementById("GameWindow").style.display = "none";
document.getElementById("GameMenu").style.display = "block";

document.getElementById("Oponents").style.display = "Block";
document.getElementById("gameModes").style.display = "none";

//restart


//player vs player
playerVsPlayerBtn.addEventListener('click', function(){
    document.getElementById("Oponents").style.display = "none";
    document.getElementById("gameModes").style.display = "block";
});


function startGame(){
    document.getElementById("GameMenu").style.display = "none";
    document.getElementById("GameWindow").style.display = "block";
    newBall();
}

const player1score = document.getElementById("player1Score");
const player2score = document.getElementById("player2Score");

let player1ScoreText = parseInt(player1score.innerHTML);
let player2ScoreText = parseInt(player2score.innerHTML);

let spawningBall = false;
let ballSpeedMultipliar = 0.75;
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
        this.ySpeed = 1;
        

        this.xDir = 1;
        this.yDir = 1;
    }
    draw(){
        c.fillStyle = "white";
        c.fillRect(this.x, this.y, this.width, this.height);
    }
    move(){
        this.x += this.xSpeed * this.xDir * ballSpeedMultipliar;
        this.y += this.ySpeed * this.yDir * ballSpeedMultipliar;
    }
}
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
    //up
    if(keys[38]){
        players[1].y -= players[1].upwardsSpeed;
    }
    //down
    if(keys[40]){
        players[1].y += players[1].downwardsSpeed;
    }
}

function newBall(){
    spawningBall = true;
    balls.length != 0 && (balls[0].x > canvas.width/2 ? player1ScoreText += 1 : player2ScoreText += 1 ,balls.splice(0, 1));
    player1score.innerHTML = player1ScoreText.toString();
    player2score.innerHTML = player2ScoreText.toString();
    ballSpeedMultipliar = 0;
    balls.push(new Ball(400, 300, 10, 10));
    setTimeout(newRound, 4000);    
}
function newRound(){
    spawningBall = false;
    ballSpeedMultipliar = 0.75;
    let random = randomNum(-1, 1);
    if(random == 0){random = -1}
    balls[0].xDir = random;
    random = randomNum(-1, 1);
    if(random == 0){random = 1}
    balls[0].yDir = random;
}

let randomNum = (min, max) => {return Math.floor(Math.random()*(max-min+1))+min;}

function checkCollisions(ob, arr, type){
    switch (type) {
        case "ballWallCollision":
            for (let i = 0; i < arr.length; i++) {
                //x collision
                if(ob.x + ob.width >= arr[i].x && ob.x <= arr[i].x){
                    if(!spawningBall){console.log("called"), newBall();}
                    
                }else if(ob.y + ob.height >= arr[i].y && ob.y <= arr[i].y){ //y collision
                    ob.yDir *= -1;
                    ballSpeedMultipliar < 1.75 && (ballSpeedMultipliar += 0.01);
                }
            } 
            break;
        case "playerBallCollision":
            for (let i = 0; i < arr.length; i++){ 
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
