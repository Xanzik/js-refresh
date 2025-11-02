class Enemy {
    #health;

    constructor(health) {
        this.health = health;
    }

    set health(health) {
        this.#health = health;
    }

    get health() {
        return this.#health;
    }

    attack(power) {
        this.health = this.#health - power;
    }
}

class Orc extends Enemy {
    constructor(health) {
        super(health);
    }

    attack(power) {
        if(Number((Math.random() * 100)) > 50) {
            this.health = this.health - power;
        }
    }
}

class Sword {
    #power;

    constructor(power) {
        this.#power = power;
    }

    set power(power) {
        this.#power = power;
    }

    get power() {
        return this.#power;
    }

    attack(enemy) {
        enemy.attack(this.power);
    }
}

const orc = new Orc(100);

const sword = new Sword(25);

sword.attack(orc);
sword.attack(orc);
sword.attack(orc);
