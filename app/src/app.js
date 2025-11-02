'use strict';

import {MainView} from "./views/main.js";
import {FavoritesView} from "./views/favorites.js";
import {CardView} from "./views/card.js";

class App {
    routes = [
        { path: "", view: MainView },
        { path: "#favorites", view: FavoritesView },
        { path: '#book', view: CardView, }
    ];
    appState = {
        favorites: [],
    };

    constructor() {
        window.addEventListener('hashchange', this.route.bind(this));
        this.route();
    }

    route() {
        if (this.currentView) {
            this.currentView.destroy();
        }

        const hashPath = location.hash.split('?')[0];

        const route = this.routes.find(r => r.path === hashPath);

        if (!route) {
            console.error('Route not found:', hashPath);
            return;
        }

        this.currentView = new route.view(this.appState);

        const queryString = location.hash.split('?')[1] || '';
        const params = new URLSearchParams(queryString);
        const key = params.get('key');
        this.currentView.render({ key });
    }
}

new App();