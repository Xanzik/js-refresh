console.log(document.querySelectorAll(".one")[0].innerHTML);
console.log(document.querySelectorAll(".one")[1].innerText);
console.log(document.querySelector('#two').innerHTML);
console.log(document.querySelector('[user-id]').innerHTML);

function inputSubmit(e) {
    if(e.code == 'Enter') {
        const input = {
            value: document.querySelector(".input").value,
        }; 
        if(!input) {
            return;
        }
        localStorage.setItem("input", JSON.stringify(input));
    }
}

const page = {
    body: document.body,
}

function generateRandomString(length) {
    return Math.random().toString(36).substring(2, length + 2);
}

function createElements (number) {
    for(let i = 0; i < number; i++) {
        const el = document.createElement('div');
        el.classList.add('div');
        el.innerText = generateRandomString(10);
        page.body.appendChild(el);
    }
}

function search (value) {
    const [...divList] = document.getElementsByClassName('div');
    divList.forEach(el => {
        if(value === '') {
            el.style.color = 'black';
        } else if (el.innerText.includes(value)) {
            el.style.color = 'red';
        }
    });
}

const searchBar = document.createElement('input');
searchBar.placeholder = 'search';

searchBar.addEventListener('input', function () {
    search(this.value);
});

page.body.appendChild(searchBar);

createElements(5);