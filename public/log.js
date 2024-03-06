let logEl = document.getElementById("messages");
let colors = ["pink","cyan","magenta","yellow","lime","lightgray","IndianRed","hotpink","LightSkyBlue","MediumPurple","Wheat","Orange"]
let letters = "2VvcSujfiPOK-C7_D8rs5nomtxTXYUz0HgEyBaRIkpL6dJWeNwQ31MAZlh9bG4Fq";

function StoN(string) {
    let total = 0;
    for (let i = 0; i < string.length; i++) {
        total += (letters.indexOf(string[i]) / letters.length);
    }
    return Math.abs(total%1);
}

function log(message,user) {
    logEl.innerHTML +=
    "<li><span style='color:"+colors[Math.floor(StoN(user)*colors.length)]+"''>" +
    user + "</span> " + message + "</li>";
    // Broadcast out
}

// Websocket mock data
setInterval(() => {
    let mockNames = ["PabloPicasso","Epic_Dragon77","asdkajdlkajn","-DrawingKing-"];
    let name = mockNames[Math.floor(Math.random()*mockNames.length)];
    let mockMessages = ["joined","made their first edit","made 100 edits! Congrats!","made 1000 edits! Holy Guacamole!","used the Eyedropper (hold the [i] key)"];
    let msg = mockMessages[Math.floor(Math.random()*mockMessages.length)];
    log(msg,name);
  }, 5000);