const weatherMap = new Map([
    ['London', 10],
    ['Moscow', 7],
    ['Paris', 14],
]);

const keys = [...weatherMap.keys()];
const values = [...weatherMap.values()];
weatherMap.clear();

for(let i = 0; i < keys.length; i++) {
    weatherMap.set(values[i], keys[i]);
}

const reverseWeatherMap = new Map([...weatherMap].map(el => el.reverse()));