c = document.getElementById("canvas");
ctx = c.getContext("2d");

const WIDTH = 25;
let joined = false;

var mouseX, mouseY;
var mouseDown = false;

c.addEventListener('mousemove', function(event) {
    mouseX = event.clientX - c.getBoundingClientRect().left;
    mouseY = event.clientY - c.getBoundingClientRect().top;
});

document.addEventListener('mousedown', function(event) {
    mouseDown = true;
});

document.addEventListener('mouseup', function(event) {
    mouseDown = false;
});

function resize() {
    c.width = Math.min(window.innerWidth, window.innerHeight)*0.6;
    c.height = Math.min(window.innerWidth, window.innerHeight)*0.6;
}

c.addEventListener

function draw() {
    // Check if we're clicking any new squares and fill them in
}

function render() {
    grid = document.getElementById("grid").checked;

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