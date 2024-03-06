c = document.getElementById("canvas");
ctx = c.getContext("2d");

const WIDTH = 25;
let joined = localStorage.getItem("joined");
if (joined) joined = (joined === "true");
if (!joined) joined = false;

let eyed = localStorage.getItem("eyed");
if (eyed) eyed = (eyed === "true");
if (!eyed) eyed = false;

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

let eye = false;

document.addEventListener('keydown', function(event) {
    if (event.key === 'i') eye = true;
});

document.addEventListener('keyup', function(event) {
    if (event.key === 'i') eye = false;
});

let board;
async function getBoardData() {
    try {
      const response = await fetch('/api/board');
      const boardText = await response.json();
      localStorage.setItem('board', boardText);
    } catch (error) {
      console.error('Error fetching board data:', error);
  
      let boardText = localStorage.getItem("board");
    }
    if (boardText) board = JSON.parse(boardText);
    if (!boardText) board = loadBoard(WIDTH);
  }
  getBoardData(); // Call the async function to execute the code

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
        if (eye) {
            document.getElementById("color").value = color;
            if (!eyed) {
                log("used the Eyedropper (hold the [i] key)",user);
                eyed = true;
                localStorage.setItem("eyed",true);
            }
            return;
        }
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
        // asyncronously call a post request to api/board with a body of x,y,color
        fetch('api/board', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: x+","+y+","+color
          })
          .catch(error => {
            console.error('Error sending board update:', error);
        });
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
    if (!user) {
        ctx.globalAlpha = 0.8;
        ctx.fillStyle = "black";
        ctx.fillRect(c.width*0.2,c.height*0.3,c.width*0.6,c.height*0.4);
        ctx.fillStyle = "white";
        ctx.font = "bold 30px Arial";
        ctx.textAlign = 'center';
        ctx.fillText("Login to Edit!",c.width*0.5,c.height*0.5);
        ctx.font = "15px Arial";
        ctx.fillText("Username: name",c.width*0.5,c.height*0.6);
        ctx.fillText("Password: name123",c.width*0.5,c.height*0.65);
        ctx.globalAlpha = 1.0;
    }
}

const UPDATE_INTERVAL = 1000;

function main() {
    if (!joined && user) {
        log("joined",user);
        localStorage.setItem("joined",true);
        joined = true;
    }
    // Call the API to get the current board periodically
    if (performance.now() - lastBoardUpdate >= UPDATE_INTERVAL) {
        fetch('api/board')
        .then(response => JSON.parse(response))
        .then(data => {
            board = data;
        })
        .catch(error => {
            console.error('Error fetching board:', error);
        });
        lastBoardUpdate = performance.now();
    }
    if (user) {
        draw();
    }
    resize();
    render();
    requestAnimationFrame(main);
}

requestAnimationFrame(main);