"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NullBook = void 0;
const AbstractBook_1 = require("./abstracts/AbstractBook");
class NullBook extends AbstractBook_1.AbstractBook {
    constructor() {
        super();
        this.setBookTitle("No book found with this title!");
        this.setReleaseYear("0");
        this.setISBN("0");
        this.setAuthors("");
    }
}
exports.NullBook = NullBook;
//# sourceMappingURL=NullBook.js.map