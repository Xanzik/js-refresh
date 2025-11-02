import {DivComponent} from "../../common/div-component.js";
import './book-card.css';


export class BookCard extends DivComponent {
    constructor(appState, cardState) {
        super();
        this.appState = appState;
        this.cardState = cardState;
    }

    render() {
        this.el.classList.add('book');
        this.el.innerHTML = `
            <h1 class="book__h1">${this.cardState.title}</h1>
            <div class="book__top">
                <img src="https://covers.openlibrary.org/b/olid/${this.cardState.cover_edition_key}-M.jpg" alt="Cover">
                <div class="book__info">
                    <div class="book__author">
                        Author: <span>${this.cardState.author_name ? this.cardState.author_name[0] : 'None'}</span>
                    </div>
                    <div class="book__category">
                        Category: <span>${this.cardState.category ? this.cardState.category : 'None'}</span>
                    </div>
                    <div class="book__publication">
                        First publication: <span>${this.cardState.first_publish_year}</span>
                    </div>
                    <div class="book__pages">
                        Book pages: <span>${this.cardState.pages ? this.cardState.pages : 'None'}</span>
                    </div>
                    <button class="book__button">Add to favorites</button>
                </div>
            </div>
            <div>
                <h2 class="book__h2">Description:</h2>
                <span class="book__description">${this.cardState.description ? this.cardState.description : 'None'}</span>
            </div>
            <div>
                <h2 class="book__h2">Tags:</h2>
                ${Array.isArray(this.cardState.tags) && this.cardState.tags.length > 0
                    ? this.cardState.tags.map(tag => `<span class="book__tag">${tag}</span>`).join('')
                    : `<span class="book__tag">None</span>`}
            </div>`;
        return this.el;
    }
}