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
    }
    draw(){
        c.fillStyle = "white";
        c.fillRect(this.x, this.y, this.width, this.height);
    }
}


// walls.push(new Wall(canvas.width* (1/8), canvas.height * (1/10), canvas.width * (6/8), 2));
// walls.push(new Wall(canvas.width* (1/8), canvas.height * (5/10) , canvas.width * (6/8), 2));

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
    keyboardInputs()
    requestAnimationFrame(update);
}
update();

function refrech(){
    c.fillStyle = "black"
    c.fillRect(0, 0, canvas.width, canvas.height);
}

document.addEventListener('keydown', function(event) {
    console.log(event.keyCode);
    keys[event.keyCode] = true;
});
document.addEventListener('keyup', function(event){
    keys[event.keyCode] = false;
});
function keyboardInputs(){
    //w
    if(keys[87]){
        players[0].y -= 1
    }
    //s
    if(keys[83]){
        players[0].y += 1
    }

    if(keys[38]){
        players[1].y -= 1
    }
    if(keys[40]){
        players[1].y += 1
    }
}