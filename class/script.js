class User {
    #_login;
    #_password;

    constructor(login, password) {
        this.#login = login;
        this.#password = password;
    }

    set #login(login) {
        this.#_login = login;
    }

    get #login() {
        return this.#login;
    }

    set #password(password) {
        this.#_password = [...password].reverse().join('');
    }

    get #password() {
        return [...this.#_password].reverse().join('');
    }

    changePassword(oldPassword, newPassword) {
        if(this.isPasswordValid(oldPassword)) {
            this.#password = newPassword;
            return true;
        } else {
            console.log('error');
            return false;
        }
    }

    isPasswordValid(password) {
        return this.#password === password;
    }
}

const user = new User("Xanzik", "123");

user.changePassword('123', '123456');