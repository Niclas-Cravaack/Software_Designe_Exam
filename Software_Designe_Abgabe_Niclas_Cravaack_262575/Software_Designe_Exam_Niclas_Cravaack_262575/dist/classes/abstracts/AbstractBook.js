"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractBook = void 0;
class AbstractBook {
    constructor() {
        this._bookTitle = "";
        this._releaseYear = "0";
        this._ISBN = "0";
        this._authors = "";
        this._genre = "";
    }
    getBookTitle() {
        return this._bookTitle;
    }
    setBookTitle(value) {
        this._bookTitle = value;
    }
    getReleaseYear() {
        return this._releaseYear;
    }
    setReleaseYear(value) {
        this._releaseYear = value;
    }
    getISBN() {
        return this._ISBN;
    }
    setISBN(value) {
        this._ISBN = value;
    }
    getAuthors() {
        return this._authors;
    }
    setAuthors(value) {
        this._authors = value;
    }
    getGenre() {
        return this._genre;
    }
    setGenre(value) {
        this._genre = value;
    }
}
exports.AbstractBook = AbstractBook;
//# sourceMappingURL=AbstractBook.js.map