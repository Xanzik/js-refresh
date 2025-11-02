import {AbstractView} from "../common/view.js";
import onChange from "on-change";
import {Header} from "../components/header/header.js";
import {Search} from "../components/search/search.js";
import {CardList} from "../components/card-list/card-list.js";
import {ArrowNavigation} from "../components/arrow-navigation/arrow-navigation.js";

export class MainView extends AbstractView {
    state = {
        list: [],
        numFound: 0,
        loading: false,
        searchQuery: undefined,
        offset: 0,
        currentPage: 1,
        limit: 6,
    };

    constructor(appState) {
        super();
        this.appState = appState;
        this.appState = onChange(this.appState, this.appStateHook.bind(this));
        this.state = onChange(this.state, this.stateHook.bind(this));
        this.setTitle("Book search");
    }

    destroy() {
        onChange.unsubscribe(this.appState);
        onChange.unsubscribe(this.state);
    }

    appStateHook(path) {
        if(path === 'favorites') {
            this.render();
        }
    }

    async loadList(q, offset, limit) {
        const res = await fetch(`https://openlibrary.org/search.json?q=${q}&offset=${offset}&limit=${limit}`);
        return res.json();
    }

    async stateHook(path) {
        if(path === 'searchQuery' || path === 'offset') {
            this.state.loading = true;
            const data = await this.loadList(this.state.searchQuery, this.state.offset, this.state.limit);
            this.state.loading = false;
            this.state.numFound = data.numFound;
            this.state.list = data.docs;
            this.render();
        }

        if(path === 'list' || path === 'loading') {
            this.render();
        }
    }

    render() {
        const main = document.createElement("div");
        main.classList.add("main");
        main.innerHTML = `
            <h1 class="card__h1">Books found - ${this.state.numFound ? this.state.numFound : 0}</h1>`;
        main.appendChild(new Search(this.state).render());
        main.appendChild(new CardList(this.appState, this.state).render());
        if(this.state.numFound > 0) {
            main.appendChild(new ArrowNavigation(this.state).render());
        }
        this.app.innerHTML = '';
        this.app.appendChild(main);
        this.renderHeader();
    }

    renderHeader() {
        this.app.prepend(new Header(this.appState).render());
    }
}