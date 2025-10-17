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
    modal: {
        body: document.querySelector('.modal'),
        iconField: document.querySelector('.modal__form input[name="icon"]'),
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
    document.location.replace(document.location.pathname + '#' + activeHabbitId);
    rerenderMenu(activeHabbit);
    renderHead(activeHabbit);
    renderContent(activeHabbit);
}

function addDay(event) {
    event.preventDefault();
    const data = validateForm(event.target, ['comment']);
    if(!data) {
        return;
    }
    habbits = habbits.map(habbit => {
        if(habbit.id === globalActiveHabbitId) {
            return {
                ...habbit,
                days: habbit.days.concat([{ comment: data.comment }])
            }
        }
        return habbit;
    })
    resetForm(event.target, ['comment']);
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

function toogleModal() {
    if(page.modal.body.classList.contains('modal--hidden')) {
        page.modal.body.classList.remove('modal--hidden');
    } else {
        page.modal.body.classList.add('modal--hidden');
    }
}

function setIcon(context, icon) {
    page.modal.iconField.value = icon;
    const parentElement = context.parentElement;
    const activeIcon = document.querySelector('.modal-item--active');
    activeIcon.classList.remove('modal-item--active');
    parentElement.classList.add('modal-item--active');
}

function addHabbit(event) {
    event.preventDefault();
    const data = validateForm(event.target, ['icon', 'name','target']);
    if(!data) {
        return;
    }
    const id = habbits.length > 0 ? habbits.length + 1 : 1;
    habbits.push({
        id: id,
        icon: data.icon,
        name: data.name,
        target: data.target,
        days: [],
    });
    saveData();
    resetForm(event.target, ['name','target']);
    toogleModal();
    rerender(habbits[id - 1].id)
}

function validateForm(form, fields) {
    const formData = new FormData(form);
    const res = {};
    for(const field of fields) {
        const fieldValue = formData.get(field);
        form[field].classList.remove('error');
        if(!fieldValue) {
            form[field].classList.add('error');
        }
        res[field] = fieldValue;
    }
    let isValid = true;
    for (const field of fields) {
        if(!res[field]) {
            isValid = false;
        }
    }
    if(!isValid) {
        return;
    }
    return res;
}

function resetForm(form, fields) {
    for (const field of fields) {
        form[field].value = '';
    }
}

(() => {
    loadData();
    const hashId = Number(document.location.hash.replace('#', ''));
    const urlHabbit = habbits.find(habbit => Number(habbit.id) === hashId);
    if(urlHabbit) {
        rerender(urlHabbit.id);
    } else {
        rerender(habbits[0].id ? habbits[0].id : false);
    }
})();