import {AbstractView} from "../common/view.js";
import {Header} from "../components/header/header.js";
import {BookCard} from "../components/book-card/book-card.js";

export class CardView extends AbstractView {
    constructor(appState) {
        super();
        this.appState = appState;
        this.cardState = [];
        this.setTitle("Book");
    }

    fetchBook(key) {
        return {
            "author_key": [
                "OL234664A"
            ],
            "author_name": [
                "George R. R. Martin"
            ],
            "cover_edition_key": "OL7829767M",
            "cover_i": 9269962,
            "ebook_access": "borrowable",
            "edition_count": 131,
            "first_publish_year": 1996,
            "has_fulltext": true,
            "ia": [
                "buzveatesinsarki0000geor",
                "juegodetronos0000mart",
                "bwb_KU-426-196",
                "gameofthronesspe0000unse",
                "gameofthrones00mart_0",
                "letronedeferlint0000mart_p9k2",
                "canciondehieloyf0001geor",
                "ilgrandeinverno0000unse",
                "isbn_0553573403",
                "bwb_C0-CEK-605",
                "gameofthronesboo0000unse",
                "isbn_9780553573404_b8s3",
                "letrnedeferlintg0000mart",
                "isbn_0553573403_i1p5",
                "isbn_9780553573404_r7m9",
                "gameofthronesaso00geor_1",
                "juegodetronos0000geor",
                "gameofthrones0000mart_x2q2",
                "letronedefer0000mart_x8e2",
                "gameofthrones0000mart",
                "isbn_9780553573404",
                "gameofthrones00mart",
                "gameofthrones0000mart_t9y7",
                "graotron0000unse",
                "gameofthronesill0000mart",
                "gameofthronesaso00geor",
                "gameofthronesboo00mart",
                "gameofthrones0000mart_j5f5",
                "gameofthrones0001mart"
            ],
            "ia_collection_s": "americana;inlibrary;internetarchivebooks;printdisabled",
            "key": "/works/OL257943W",
            "language": [
                "ger",
                "pol",
                "dan",
                "ukr",
                "swe",
                "ind",
                "spa",
                "jpn",
                "ita",
                "srp",
                "chi",
                "por",
                "rus",
                "eng",
                "gle",
                "tur",
                "fre"
            ],
            "lending_edition_s": "OL35651104M",
            "lending_identifier_s": "buzveatesinsarki0000geor",
            "public_scan_b": false,
            "title": "A Game of Thrones"
        }
    }

    render({key}) {
        this.cardState = this.fetchBook(key);
        const main = document.createElement("div");
        main.classList.add("main");
        main.appendChild(new BookCard(this.appState, this.cardState).render());
        this.app.innerHTML = '';
        this.app.appendChild(main);
        this.renderHeader();
    }

    renderHeader() {
        this.app.prepend(new Header(this.appState).render());
    }
}