import {DivComponent} from "../../common/div-component.js";
import {Card} from "../card/card.js";
import './card-list.css';


export class CardList extends DivComponent {
    constructor(appState, parentState) {
        super();
        this.appState = appState;
        this.parentState = parentState;
    }

    render() {
        if (this.parentState.loading) {
            this.el.classList.add('card_list__loader');
            this.el.innerHTML = `
                <span class="card_list__loader__text">L O A D I N G</span>
                <div class="card_list__loader__spinner"></div>`;
            return this.el;
        }
        const cardGrid = document.createElement("div");
        cardGrid.classList.add('card_grid');
        this.el.appendChild(cardGrid);
        for(const card of this.parentState.list) {
            cardGrid.appendChild(new Card(this.appState, card).render());
        }
        return this.el;
    }
}