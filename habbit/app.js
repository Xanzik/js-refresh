'use strict';

let habbits = [];
let globalActiveHabbitId;
const HABBIT_KEY = 'HABBIT_KEY';

const page = {
    nav: document.querySelector('.nav-list'),
    content: {
        h1: document.querySelector('.content__h1'),
        progressValue: document.querySelector('.progress__value'),
        progressBar: document.querySelector('.progress__bar'),
        habits: document.querySelector('.habits'),
    },
}

function loadData() {
    const habbitsString = localStorage.getItem(HABBIT_KEY);
    const habbitArray = JSON.parse(habbitsString);
    if(Array.isArray(habbitArray)) {
        habbits = habbitArray;
    }
}

function saveData() {
    localStorage.setItem(HABBIT_KEY, JSON.stringify(habbits));
}

function rerenderMenu(activeHabbit) {
    page.nav.innerHTML = '';
    for (const habbit of habbits) {
        const existed = document.querySelector(`[nav-habbit-id="${habbit.id}"]`);
        if(!existed) {
            const element = document.createElement('li');
            element.setAttribute('nav-habbit-id', habbit.id);
            element.classList.add('nav-item');
            element.addEventListener('click', () => rerender(habbit.id));
            element.innerHTML = `<button class="button nav-button"><img src="images/icons/${habbit.icon}-icon.svg" alt="${habbit.icon}" class="icon"></button>`;
            if(habbit.id === activeHabbit.id) {
                element.classList.add('nav-item--active');
            }
            page.nav.appendChild(element);
            continue;
        }
        if(habbit.id === activeHabbit.id) {
            existed.classList.add('nav-item--active');
        } else {
            existed.classList.remove('nav-item--active');
        }
    }
}

function renderHead(activeHabbit) {
    page.content.h1.innerText = activeHabbit.name;
    page.content.progressBar.max = Number(activeHabbit.target);
    page.content.progressBar.value = activeHabbit.days.length;
    const progress = activeHabbit.days.length / activeHabbit.target > 1 
        ? 100 
        : activeHabbit.days.length / activeHabbit.target * 100;
    page.content.progressValue.innerText = progress.toFixed(0) + '%';
}

function renderContent(activeHabbit) {
    page.content.habits.innerHTML = '';
    for (const index in activeHabbit.days) {
        const element = document.createElement('li');
        element.classList.add('habits__item');
        element.innerHTML = `<div class="habits__day">Day ${Number(index) + 1}</div>
                            <span class="habits__text">${activeHabbit.days[index].comment}</span>
                            <button class="button habits__delete" onclick= "deleteDay(${Number(index)})">
                            <img src="images/icons/delete-icon.svg" alt="delete" class="habits__delete-icon">
                            </button>`;
        page.content.habits.appendChild(element);
    }
    const element = document.createElement('li');
    element.classList.add('habits__item');
    element.innerHTML = `<div class="habits__day">Day ${activeHabbit.days.length + 1}</div>
                         <form class="habits__comment" onsubmit= "addDay(event)">
                            <img src="images/icons/comment-icon.svg" alt="comment" class="habits__comment-icon">
                            <input name="comment" type="text" placeholder="Комментарий" class="input">
                            <button class="button button-primary button--ml-auto">Готово</button>
                         </form>`;
    page.content.habits.appendChild(element);
}

function rerender(activeHabbitId) {
    globalActiveHabbitId = activeHabbitId;
    const activeHabbit = habbits.find(habbit => habbit.id === activeHabbitId);
    if(!activeHabbit) {
        return;
    }
    rerenderMenu(activeHabbit);
    renderHead(activeHabbit);
    renderContent(activeHabbit);
}

function addDay(event) {
    event.preventDefault();
    const form = event.target;
    const data = new FormData(form);
    const comment = data.get('comment');
    form['comment'].classList.remove('error');
    if(!comment) {
        form['comment'].classList.add('error');
        return;
    }
    habbits = habbits.map(habbit => {
        if(habbit.id === globalActiveHabbitId) {
            return {
                ...habbit,
                days: habbit.days.concat([{ comment }])
            }
        }
        return habbit;
    })
    form['comment'].value = '';
    rerender(globalActiveHabbitId);
    saveData();
}

function deleteDay(index) {
    habbits = habbits.map(habbit => {
        if(habbit.id === globalActiveHabbitId) {
            habbit.days.splice(index, 1);
            return {
                ...habbit,
                days: habbit.days,
            }
        }
        return habbit;
    })
    rerender(globalActiveHabbitId);
    saveData();
}

(() => {
    loadData();
    rerender(habbits[0].id);
})();