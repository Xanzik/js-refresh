const hourPay = 80;
const hoursDay = 5;
const workDaysWeek = 5;
const hoursOrder = 40;

const leaveDays = 10;
const weekDays = 7;

const daysRequired = hoursOrder / workDaysWeek;

let offDays = 0;
let i = daysRequired;
while (i > 7) {
    i /= 7;
    offDays += 2;
}

const isEnough = leaveDays - offDays >= daysRequired;
const orderPrice = hoursOrder * hourPay;

console.log(isEnough);
console.log(orderPrice + '$');