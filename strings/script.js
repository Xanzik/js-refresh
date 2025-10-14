const userName = "Lukas aka Terminator Demian";

console.log(`Name: ${userName.slice(0, userName.indexOf(" "))}
Surname: ${userName.slice(userName.lastIndexOf(" ") + 1, userName.length)}`);

const alphabet = 'abcdefghijklmnopqrstuvwxyz';

const num1 = `89103235356`;
const num2 = `+79103235356`;
const num3 = `+7(910)3235356`;
const num4 = `+7(910) 323-53-56`;
const num5 = `  +7(910) 323-53-56  `;

const num1Error = `89103235`;
const num2Error = `+7d910d323-53-56`;
const num3Error = `9+7103235356`;
const num4Error = `89103g35356`;

const isValidNumber = number => {
    number = number.trim().toLowerCase();
    console.log(number);

    if(number.length < 10) {
        return false;
    }

    for(let i = 0; i < number.length; i++) {
        let code = number.charCodeAt(i);
        if ((code >= 65 && code <= 90) || (code >= 97 && code <= 122)) {
            return false;
        }
    }

    if(Number(number.charAt(0)) === 8 || (String(number.charAt(0)) === '+' && String(number.charAt(1)) === '7')) {
        return true;
    }
    return false;
}

console.log(`Number is ${isValidNumber(num4Error)}`)

const card = '2342834503458353';

const maskCard = card => {
    return card.slice(card.length - 4).padStart(card.length, '*');
}