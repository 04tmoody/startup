logEl = document.getElementById("messages");
colors = ["magenta","pink","yellow","lime","cyan","lightgray","IndianRed","hotpink","LightSkyBlue","MediumPurple","Wheat","Orange"]
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
    "<li style='color:"+colors[Math.floor(StoN(user)*colors.length)]+"''>" +
    message + "</li>"
}