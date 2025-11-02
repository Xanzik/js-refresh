const USDRate = 0.012348;

const convertCurrency = (value, initialCurrency, targetCurrency) => {
    const options = {
        style: 'currency',
        currency: `${targetCurrency}`,
    }
    if(initialCurrency === 'RUB' && targetCurrency === 'USD') {
        return new Intl.NumberFormat("en-US", options).format(value * USDRate);
    }
    if(initialCurrency === 'USD' && targetCurrency === 'RUB') {
        return new Intl.NumberFormat("ru-RU", options).format(value / USDRate);
    }
    return false;
}