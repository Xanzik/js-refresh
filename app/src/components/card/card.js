import {DivComponent} from "../../common/div-component.js";
import './card.css';


export class Card extends DivComponent {
    constructor(appState, cardState) {
        super();
        this.appState = appState;
        this.cardState = cardState;
    }

    toggleFavorite(event) {
        event.preventDefault();
        event.stopPropagation();
        const index = this.appState.favorites.findIndex(card => card.key === this.cardState.key);
        if(index !== -1) {
            this.appState.favorites.splice(index, 1);
        } else {
            this.appState.favorites.push(this.cardState);
        }
    }

    render() {
        this.el.classList.add('card');
        const existInFavorites = this.appState.favorites.find(
            b => b.key === this.cardState.key
        );
        this.el.innerHTML = `
        <a href="#book?key=${this.cardState.key}" class="card__link">
            <div class="card__image">
                <img src="https://covers.openlibrary.org/b/olid/${this.cardState.cover_edition_key}-M.jpg" alt="Cover">
            </div>
            <div class="card__info">
                <div class="card__tag">
                    ${this.cardState.subject ? this.cardState.subject[0] : 'None'}
                </div>
                <div class="card__name">
                    ${this.cardState.title}
                </div>
                <div class="card__author">
                    ${this.cardState.author_name ? this.cardState.author_name[0] : 'None'}
                </div>
                <div class="card__footer">
                    <button class="button__add ${existInFavorites ? 'button__active' : ''}">
                        ${existInFavorites 
                            ? '<img src="/static/favorites.svg" alt="" />' 
                            : '<img src="/static/favorite-white.svg" alt="" />'
                        }
                    </button>
                </div>
            </div>
        </a>
        `;
        this.el.querySelector('button').addEventListener('click', this.toggleFavorite.bind(this));
        return this.el;
    }
}