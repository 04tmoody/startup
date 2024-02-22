c = document.getElementById("canvas");
ctx = c.getContext("2d");

const WIDTH = 25;
let joined = localStorage.getItem("joined");
if (joined) joined = (joined === "true");
if (!joined) joined = false;

let mouseX = -1;
let mouseY = -1;
var mouseDown = false;

let edits = localStorage.getItem("edits");
if (edits) edits = parseInt(edits);
if (!edits) edits = 0;

let user = localStorage.getItem("username");

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

let board;
let boardText = localStorage.getItem("board");
if (boardText) board = JSON.parse(boardText);
if (!boardText) board = loadBoard(WIDTH);

function loadBoard(size) {
    let b = [];
    for (let y=0; y<size; y++) {
        let row = [];
        for (let x=0; x<size; x++) {
            row.push("#ffffff");
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
    if (!mouseDown || x<0 || x>=WIDTH || y<0 || y>=WIDTH) return
    const brush = document.getElementById("color").value;
    const color = board[y][x];
    if (brush!=color) {
        if (edits==0) {
            log("made their first edit",user);
        } else if (edits==99) {
            log("made 100 edits! Congrats!",user);
        } else if (edits==999) {
            log("made 1000 edits! Holy Guacamole!",user);
        }
        edits += 1;
        localStorage.setItem("edits",edits);
        board[y][x] = brush;
        localStorage.setItem("board",JSON.stringify(board));
    }
}

function render() {
    const grid = document.getElementById("grid").checked;

    ctx.fillStyle = "white";
    ctx.fillRect(0,0,c.width,c.height);

    const sizex = c.width/WIDTH;
    const sizey = c.height/WIDTH;
    for (let x=0; x<WIDTH; x++) {
        for (let y=0; y<WIDTH; y++) {
            ctx.fillStyle = board[y][x];
            ctx.fillRect(x*sizex,y*sizey,sizex+1,sizey+1);
            if (grid) ctx.strokeRect(x*sizex,y*sizey,sizex,sizey);
        }
    }
}

function main() {
    if (!joined && user) {
        log("joined",user);
        localStorage.setItem("joined",true);
        joined = true;
    }
    if (user) {
        draw();
    }
    resize();
    render();
    requestAnimationFrame(main);
}

requestAnimationFrame(main);