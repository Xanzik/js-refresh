import {DivComponent} from "../../common/div-component.js";
import './arrow-navigation.css';


export class ArrowNavigation extends DivComponent {
    constructor(state) {
        super();
        this.state = state;
    }

    togglePage(direction) {
        if(direction === 'next') {
            this.state.currentPage++;
        }
        if(direction === 'prev') {
            if(this.state.currentPage > 1) {
                this.state.currentPage--;
            }
        }

        this.state.offset = (this.state.currentPage - 1) * this.state.limit;
    }

    render() {
        this.el.classList.add('arrow-navigation');
        this.el.innerHTML = `
        <button class="arrow-navigation__button arrow-navigation__button--left">
            <img src="/static/arrow.svg" alt="Previous page" class="arrow-navigation__arrow arrow-navigation__arrow--left">
            <span class="arrow-navigation__text">Previous page</span>
        </button>
        <button class="arrow-navigation__button arrow-navigation__button--right">
            <span class="arrow-navigation__text">Next page</span>
            <img src="/static/arrow.svg" alt="Next page" class="arrow-navigation__arrow arrow-navigation__arrow--right">
        </button>
        `;
        this.el.querySelector('.arrow-navigation__button--left').addEventListener('click', this.togglePage.bind(this, 'prev'));
        this.el.querySelector('.arrow-navigation__button--right').addEventListener('click', this.togglePage.bind(this, 'next'));
        return this.el;
    }
}