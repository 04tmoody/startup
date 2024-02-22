c = document.getElementById("canvas");
ctx = c.getContext("2d");

const WIDTH = 25;
let joined = false;

let mouseX = -1;
let mouseY = -1;
var mouseDown = false;

c.addEventListener('mousemove', function(event) {
    mouseX = event.clientX - c.getBoundingClientRect().left;
    mouseY = event.clientY - c.getBoundingClientRect().top;
});

c.addEventListener('mousedown', function(event) {
    mouseDown = true;
});

document.addEventListener('mouseup', function(event) {
    mouseDown = false;
});

let board = loadBoard(WIDTH);

function loadBoard(size) {
    let b = [];
    for (let y=0; y<size; y++) {
        let row = [];
        for (let x=0; x<size; x++) {
            row.push("ffffff");
        }
        b.push(row);
    }
    return b;
}

function resize() {
    c.width = Math.min(window.innerWidth, window.innerHeight)*0.6;
    c.height = Math.min(window.innerWidth, window.innerHeight)*0.6;
}

function draw() {
    const sizex = c.width/WIDTH;
    const sizey = c.height/WIDTH;
    let x = Math.floor(mouseX/sizex);
    let y = Math.floor(mouseY/sizey);
    const brush = document.getElementById("color").value;
    const color = board[y][x];
}

function render() {
    const grid = document.getElementById("grid").checked;

    ctx.fillStyle = "white";
    ctx.fillRect(0,0,c.width,c.height);

    const sizex = c.width/WIDTH;
    const sizey = c.height/WIDTH;
    for (let x=0; x<c.width; x+=sizex) {
        for (let y=0; y<c.height; y+=sizey) {
            if (grid) ctx.strokeRect(x,y,sizex,sizey);
        }
    }
}

function main() {
    let user = localStorage.getItem("username");
    if (!joined && user) {
        log(user+" joined!",user);
        joined = true;
    }
    draw();
    resize();
    render();
    requestAnimationFrame(main);
}

requestAnimationFrame(main);