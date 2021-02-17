"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Author = void 0;
const AbstractPerson_1 = require("./abstracts/AbstractPerson");
class Author extends AbstractPerson_1.AbstractPerson {
    constructor(author) {
        super();
        this.setID();
        this.setName(author.authors_name);
        this.setBirthday(author.birthday);
    }
}
exports.Author = Author;
//# sourceMappingURL=Authors.js.map