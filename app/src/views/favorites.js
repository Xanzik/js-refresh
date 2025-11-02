import {AbstractView} from "../common/view.js";
import onChange from "on-change";
import {CardList} from "../components/card-list/card-list.js";
import {Header} from "../components/header/header.js";

export class FavoritesView extends AbstractView {
    constructor(appState) {
        super();
        this.appState = appState;
        this.appState = onChange(this.appState, this.appStateHook.bind(this));
        this.setTitle("Favorite books");
    }

    destroy() {
        onChange.unsubscribe(this.appState);
    }

    appStateHook(path) {
        if(path === 'favorites') {
            this.render();
        }
    }

    render() {
        const main = document.createElement("div");
        main.classList.add("main");
        main.innerHTML = `
            <h1 class="card__h1">Favorite books</h1>`;
        main.appendChild(new CardList(this.appState, { list: this.appState.favorites }).render());
        this.app.innerHTML = '';
        this.app.appendChild(main);
        this.renderHeader();
    }

    renderHeader() {
        // const header = new Header(this.appState).render();
        this.app.prepend(new Header(this.appState).render());
    }
}