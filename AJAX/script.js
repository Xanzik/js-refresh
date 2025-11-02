const page = {
    body: document.querySelector('.body'),
}

const avgPrice = products => (products.reduce((acc, product) => acc + product.price, 0) / products.length).toFixed(2);

const request = new XMLHttpRequest();
request.open('GET', 'https://dummyjson.com/products');
request.send();

request.addEventListener('load', function() {
    const data = JSON.parse(this.responseText);
    const products = data.products;
    console.log(avgPrice(products));
});

const errCheck = res => {
    if(!res.ok) {
        throw new Error(`${res.status}`);
    }
}

fetch('https://dummyjson.com/products/categoriess')
    .then(response => {
        errCheck(response);
        return response.json();
    })
    .then(response => {
        const element = document.createElement('select');
        element.innerHTML = `<option value="">--Please choose an option--</option>`;
        response.forEach(category => element.innerHTML += `<option value="${category.slug}">${category.name}</option>`);
        page.body.appendChild(element);
    })
    .catch(err => console.log(err));

function myFetch(url) {
    return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();
        request.open('GET', url);
        request.send();

        request.addEventListener('load', function() {
            if(this.status > 400) {
                reject(new Error(this.status));
            }
            resolve(this);
        });

        request.addEventListener('error', function() {
            reject(new Error(this.status));
        });
    });
}

myFetch('https://dummyjson.com/products')
    .then(res => console.log(res))
    .catch(err => console.error(err));

const key = 'bdc_78f3bf0306d74663b23d26041fcfabee';

function getMyLocation() {
    navigator.geolocation.getCurrentPosition(getUserCity);
}

async function getUserCity(pos) {
    const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${pos.coords.latitude}&longitude=${pos.coords.longitude}`);
    const {city} = await response.json();
    return city;
}

const url = `https://bored.api.lewagon.com/api/activity`;

const getActivity = async (url) => {
    const res = await fetch(url);
    return res.json();
}

const generateIdeas = async (count=3) => {
    try {
        const requests = Array.from({ length: count }, () => getActivity(url));
        const data = await Promise.all(requests);
        // const [...responses] = await Promise.all(requests);
        // const data = await Promise.all(responses.map(response => response.json()));
        return data;
    } catch(e) {
        console.error(e);
    }
}

const displayIdeas = async () => {
    const data = await generateIdeas();
    data.forEach(obj => {
        const element = document.createElement(`div`);
        element.innerHTML = `<span class="accessibility">Accessibility: ${obj.accessibility}</span>
        <span class="activity">Activity: ${obj.activity}</span>
        <span class="key">Key: ${obj.key}</span>
        <span class="link">Link: ${obj.link}</span>
        <span class="participants">Participants: ${obj.participants}</span>
        <span class="price">Price: ${obj.price}</span>
        <span class="type">Type: ${obj.type}</span>`;
        page.body.appendChild(element);
    });
}

displayIdeas();