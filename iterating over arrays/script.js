const prices = [[100, 200], [120, 100], [200, 350]];

const positivePrices = prices
    .filter(price => price[1] - price[0] > 0)
    .map(price => (price[0] + price[1]) / 2);

console.log(positivePrices);

const arr = [1, 4, 4, 10];

const avg = arr.reduce((acc, el) => acc + el, 0) / arr.length;

console.log(avg)

const some = (arr, sought) => arr.find(el => el === sought) ? true : false;

console.log(some(arr, 3))