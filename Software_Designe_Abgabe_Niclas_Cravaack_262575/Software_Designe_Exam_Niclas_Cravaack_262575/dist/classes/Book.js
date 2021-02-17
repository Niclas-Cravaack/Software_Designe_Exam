"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const AbstractBook_1 = require("./abstracts/AbstractBook");
class Book extends AbstractBook_1.AbstractBook {
    constructor(book) {
        super();
        this.setBookTitle(book.book_title);
        this.setReleaseYear(book.release_year);
        this.setISBN(book.ISBN);
        this.setAuthors(book.authors);
        this.setGenre(book.genre);
    }
}
exports.Book = Book;
//# sourceMappingURL=Book.js.map