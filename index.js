c = document.getElementById("canvas");
ctx = c.getContext("2d");

const WIDTH = 30;

function render() {
    ctx.fillStyle = "white";
    ctx.fillRect(0,0,c.width,c.height);

    const sizex = c.width/WIDTH;
    const sizey = c.height/WIDTH;
    for (let x=0; x<c.width; x+=sizex) {
        for (let y=0; y<c.height; y+=sizey) {
            ctx.strokeRect(x,y,sizex,sizey);
        }
    }
}

function main() {
    render();
    requestAnimationFrame(main);
}
requestAnimationFrame(main);