"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admins = void 0;
const AbstractPerson_1 = require("./abstracts/AbstractPerson");
class Admins extends AbstractPerson_1.AbstractPerson {
    constructor(admin) {
        super();
        this.setID();
        this.setName(admin.admins_name);
        this.setBirthday(admin.birthday);
    }
}
exports.Admins = Admins;
//# sourceMappingURL=Admins.js.map