"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileHandler = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class FileHandler {
    constructor() {
    }
    readFile(pathToFile) {
        let jsonRaw = fs_1.default.readFileSync(path_1.default.resolve(__dirname, "../" + pathToFile));
        let json = JSON.parse(jsonRaw.toString());
        return json;
    }
    readArrayFile(pathToFile) {
        return this.readFile(pathToFile);
    }
    readObjectFile(pathToFile) {
        return this.readFile(pathToFile);
    }
    writeFile(pathToFile, dataToWrite) {
        fs_1.default.writeFileSync(path_1.default.resolve(__dirname, '../' + pathToFile), JSON.stringify(dataToWrite, null, 2));
    }
}
exports.FileHandler = FileHandler;
//# sourceMappingURL=FileHandler.js.map