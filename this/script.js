const user = {
    name: "Пользователь",
    password: 12345678,
}

function removePassword(reset) {
    if(reset) {
        this.password = undefined;
    }
}

const resetPassword = removePassword.bind(user);

console.log(user.password);

resetPassword(true);

console.log(user.password);

function newUser() {
    const user = {
    balance: 0,
    operations: 0,
    increase(sum) {
        this.balance +=sum;
        this.operations++;
    },
    }
    return function() {
        return user;
    }
}

const newUser = newUser();