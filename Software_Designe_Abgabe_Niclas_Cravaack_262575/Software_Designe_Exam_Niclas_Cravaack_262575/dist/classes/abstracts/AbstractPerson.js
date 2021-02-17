"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractPerson = void 0;
const uuid_1 = require("uuid");
class AbstractPerson {
    constructor() {
        this._id = uuid_1.v4();
        this._name = "";
        this._birthday = "";
    }
    getName() {
        return this._name;
    }
    setName(value) {
        this._name = value;
    }
    getBirthday() {
        return this._birthday;
    }
    setBirthday(value) {
        this._birthday = value;
    }
    getID() {
        return this._id;
    }
    setID() {
        this._id = uuid_1.v4();
    }
}
exports.AbstractPerson = AbstractPerson;
//# sourceMappingURL=AbstractPerson.js.map