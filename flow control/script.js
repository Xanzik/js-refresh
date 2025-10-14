const depositUSD = 12000;
const percent = 0.07;
const housePriceUSD = 13500;

const earn = (depositUSD * 0.07) * 24 + depositUSD;

if(earn > housePriceUSD) {
    console.log("Can");
} else {
    console.log("Can't");
}

const botCheck = Number(prompt("7 + or - 15?"));

switch(botCheck) {
    case 22:
    case -8:
        console.log("Real");
        break;
    default:
        console.log("Bot")
        break;
}