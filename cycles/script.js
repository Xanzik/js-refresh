const arr = ['!', 'JS', 'love', 'I'];
const str = [];

for(let i = arr.length - 1; i >= 0; i--) {
    str.push(arr[i]);
}

console.log(str.join(" "));

const balance = 100;

const operations = [1000, -700, 300, -500, 10000];

let endBalance = balance;

const isNegative = balance => balance < 0 ? false : true;

const avgIncome = operations => {
    let incomeCount = 0;
    let summary = 0;
    for(element of operations) {
        if(element > 0) {
            summary += element;
            incomeCount++;
        }
    }
    return summary / incomeCount;
}

const avgOutcome = operations => {
    let incomeCount = 0;
    let summary = 0;
    for(element of operations) {
        if(element < 0) {
            summary += element;
            incomeCount++;
        }
    }
    return summary / incomeCount;
}

const operationsCycle = operations => {
    for(element of operations) {
        endBalance += element;
        if(!isNegative(endBalance)) {
            console.log("error");
            break;
        }
    }
    return endBalance;
}

console.log(`End Balance: ${operationsCycle(operations)}`);
console.log(avgIncome(operations));
console.log(avgOutcome(operations));