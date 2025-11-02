const pizzaTimer = time => {
    const hours = time / 3600000;
    const minutes = time / 60000;
    const seconds = time / 1000;

    const options = {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
    };

    const requiredTime = new Date(0, 0, 0, hours, minutes, seconds);

    let secondPassed = 1000;
    const interval = setInterval(() => {
        console.log(new Intl.DateTimeFormat(navigator.language, options).format(requiredTime - secondPassed));
        secondPassed += 1000;
    }, 1000);

    setTimeout(() => {
        clearInterval(interval);
        console.log(`Pizza Ready!`);
    }, time)
}

pizzaTimer(1000000);