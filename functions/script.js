function toPower(num, power) {
    const res = num ** power;
    return res;
}

console.log(toPower(2, 3));

const toPowerArrow = (num, power) => num ** power;

console.log(toPowerArrow(2, 3));

const credit = (age, isWorking) => {
    if(age > 24) {
        if(isWorking) {
            return 500;
        }
        return 100;
    }
    return 0;
}

const isEnough = (money, price) => money >= price ? true : false;

const isCanBuy = (age, isWorking, money, price) => {
    money += credit(age, isWorking);
    return isEnough(money, price);
}

console.log(isCanBuy(24, true, 2000, 2000));