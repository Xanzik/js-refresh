const balance = 1000;
const bonusBalance = 111;
const isBanned = false;
const isExist = false;
const isSelling = true;

if(balance > 1000 || bonusBalance > 100) {
    if(isBanned) {
        console.log("Can't buy the game because banned.");
    } else if(isExist) {
        console.log("Can't buy the game because game already purchased.");
    } else if(!isSelling) {
        console.log("Game not selling.");
    } else {
        console.log("You can buy game.");
    }
} else {
    console.log("Can't buy the game because balance.");
}