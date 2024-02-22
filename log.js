logEl = document.getElementById("messages");
colors = ["pink","cyan","magenta","yellow","lime","lightgray","IndianRed","hotpink","LightSkyBlue","MediumPurple","Wheat","Orange"]
letters = "2VvcSujfiPOK-C7_D8rs5nomtxTXYUz0HgEyBaRIkpL6dJWeNwQ31MAZlh9bG4Fq";

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