const usersObject = [
    { name:'Nick', age: 30 },
    { name:'Kate', age: 18 },
    { name:'Anna', age: 40 },
    { name:'Petr', age: 25 }
];

const sortUsers = users => users.sort((a, b) => a.age - b.age)

console.log(sortUsers(usersObject));

const users = [
    {
        name: 'Nick',
        surname: 'Dlut',
        age: 30,
        skills: ['Developer', 'DevOps']
    },
    {
        name: 'Kate',
        surname: 'Rossenberg',
        age: 18,
        skills: ['Design']
    },
];

const newUsers = users => users.map(user => {
    return {
        fullName :user.name + ' ' + user.surname,
        skillNum :user.skills.length,
    }
    }
);

console.log(newUsers(users));

const wallet = {
    balance: 0,
    operations: [],
    increaseOperation: function (reason, amount) {
        this.balance += amount;
        this.operations.push({reason: reason, sum: amount});
        return true;
    },
    decreaseOperation: function (reason, amount) {
        if(this.balance - amount >= 0) {
            this.balance -= amount;
            this.operations.push({reason: reason, sum: -amount});
            return true;
        }
        return false;
    },
    getOperationsCount: function () { 
        return this.operations.length;
    },
}
wallet.increaseOperation("increase", 100);
wallet.decreaseOperation("decrease", 200);
console.log(wallet.getOperationsCount());
console.log(wallet);

const warehouse = {
    goods: [],
    findGoodById: function (id) {
        return this.goods.find(good => good.id === id);
    },
    addGood: function (good) {
        if(this.findGoodById(good.id)) {
            return false;
        }
        this.goods.push(good);
    },
    getWeightKg: function () {
       return this.goods.reduce((acc, good) => {
            if(good?.weight?.kg) {
                return acc + good?.weight?.kg
            }
            return acc;
        }, 0);
    },
}

const car = {
    id: 1,
    weight: {
        kg: 1000,
    },
    brand: 'Ford',
}

const chair = {
    id: 2,
    weight: {
        kg: 2,
    },
}

const paper = {
    id: 3,
    weight: {},
    color: 'red'
}

warehouse.addGood(car);
warehouse.addGood(chair);
warehouse.addGood(paper);

console.log(warehouse.findGoodById(2));
console.log(warehouse.getWeightKg());
console.log(warehouse);