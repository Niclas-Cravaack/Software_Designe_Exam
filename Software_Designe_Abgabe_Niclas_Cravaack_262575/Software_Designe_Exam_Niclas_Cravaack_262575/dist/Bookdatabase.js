"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bookdatabase = void 0;
const ConsoleHandling_1 = __importDefault(require("./classes/ConsoleHandling"));
const Book_1 = require("./classes/Book");
const NullBook_1 = require("./classes/NullBook");
const Authors_1 = require("./classes/Authors");
const FileHandler_1 = require("./classes/FileHandler");
const Admins_1 = require("./classes/Admins");
const uuid_1 = require("uuid");
class Bookdatabase {
    constructor() {
        this._books = [];
        this._authors = [];
        this._admins = [];
        this.booksLookedAt = 0;
        let fileHandler = new FileHandler_1.FileHandler();
        let booksJson = fileHandler.readArrayFile("../data/books.json");
        let authorsJson = fileHandler.readArrayFile("../data/authors.json");
        let adminsJson = fileHandler.readArrayFile("../data/admins.json");
        for (let book of booksJson) {
            this._books.push(new Book_1.Book(book));
        }
        for (let author of authorsJson) {
            this._authors.push(new Authors_1.Author(author));
        }
        for (let admin of adminsJson) {
            this._admins.push(new Admins_1.Admins(admin));
        }
    }
    showFunctionalities() {
        return __awaiter(this, void 0, void 0, function* () {
            let answer = yield ConsoleHandling_1.default.showPossibilities([
                "1. List all books with ISBN",
                "2. Search a books by ISBN",
                "3. Search a book by title",
                "4. Search a book by author",
                "5. admin functions"
            ], "Which function do you want to use? (default 1): ");
            this.handleAnswer(answer);
        });
    }
    handleAnswer(answer) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (answer) {
                case "1":
                    this.showAllBooksWithISBN();
                    break;
                case "2":
                    yield this.searchBookByISBN();
                    break;
                case "3":
                    yield this.searchBookByTitle();
                    break;
                case "4":
                    yield this.searchBookByAuthor();
                    break;
                case "5":
                    this.showAdminFunctionalities();
                    break;
                default:
                    this.showAllBooksWithISBN();
                    break;
            }
            yield this.showFunctionalitiesAgain();
        });
    }
    showAdminFunctionalities() {
        return __awaiter(this, void 0, void 0, function* () {
            let answer = yield ConsoleHandling_1.default.showPossibilities([
                "6. Add book to database",
                "7. Add author to database",
                "8. Add genre to database",
                "9 back to normal functions"
            ], "Which function do you want to use? (default 9): ");
            this.handleAdminsChoice(answer);
        });
    }
    handleAdminsChoice(answer) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (answer) {
                case "6":
                    this.addBookToDatabase();
                    break;
                case "7":
                    this.addAuthorToDatabase();
                    break;
                case "8":
                    console.log("update book");
                    ;
                    break;
                case "9":
                    this.showFunctionalities();
                    break;
                default:
                    this.showFunctionalities();
                    break;
            }
            yield this.showAdminFunctionalitiesAgain();
        });
    }
    //Functionalities
    //login admin
    adminLogin() {
        return __awaiter(this, void 0, void 0, function* () {
            // Plan B hardcoden
            let Loginname = yield ConsoleHandling_1.default.question("Loginname: ");
            let myID = yield ConsoleHandling_1.default.question("ID: ");
            let admin = this._admins[1];
            if (admin.getName() == Loginname && admin.getID() == myID) {
                this.showAdminFunctionalities();
            }
            else {
                console.log("You are not an administrator, you traitor!");
                this.showFunctionalities();
            }
        });
    }
    //All search functions
    //show all books
    showAllBooksWithISBN() {
        ConsoleHandling_1.default.printInput("\n");
        for (let index in this._books) {
            let book = this._books[index];
            let _index = Number.parseInt(index) + 1;
            ConsoleHandling_1.default.printInput(`${_index}. Book is ${book.getBookTitle()} \n with ISBN ${book.getISBN()} \n and release year ${book.getReleaseYear()}`);
        }
    }
    //search by title
    searchBookByTitle() {
        return __awaiter(this, void 0, void 0, function* () {
            let bookTitle = yield ConsoleHandling_1.default.question("Which book you are looking for? ");
            let book = this._books.filter((book) => book.getBookTitle().match(new RegExp(`${bookTitle}`, 'gi')))[0];
            book = book !== undefined ? book : new NullBook_1.NullBook();
            ConsoleHandling_1.default.printInput("\n");
            ConsoleHandling_1.default.printInput(book.getBookTitle().toString());
        });
    }
    //search by ISBN
    searchBookByISBN() {
        return __awaiter(this, void 0, void 0, function* () {
            let ISBN = yield ConsoleHandling_1.default.question("Which book you are looking for? ");
            let book = this._books.filter((book) => book.getISBN().match(new RegExp(`${ISBN}`, 'gi')))[0];
            book = book !== undefined ? book : new NullBook_1.NullBook();
            ConsoleHandling_1.default.printInput("\n");
            ConsoleHandling_1.default.printInput(book.getBookTitle().toString());
        });
    }
    //search by author
    searchBookByAuthor() {
        return __awaiter(this, void 0, void 0, function* () {
            let author = yield ConsoleHandling_1.default.question("Which book you are looking for? ");
            let book = this._books.filter((book) => book.getAuthors().match(new RegExp(`${author}`, 'gi')))[0];
            book = book !== undefined ? book : new NullBook_1.NullBook();
            ConsoleHandling_1.default.printInput("\n");
            ConsoleHandling_1.default.printInput(book.getBookTitle().toString());
        });
    }
    //All add functions
    //add book to database 
    addBookToDatabase() {
        return __awaiter(this, void 0, void 0, function* () {
            let newBookTitle = yield ConsoleHandling_1.default.question("Title of new book: ");
            let newISBN = yield ConsoleHandling_1.default.question("ISBN of new book (numbers and dashes): ");
            let newGenre = yield ConsoleHandling_1.default.question("Genre of new book: ");
            let newReleasYear = yield ConsoleHandling_1.default.question("Release year of new book: ");
            let authors = yield ConsoleHandling_1.default.question("authors of book (all authors in one line with spaces and comma): ");
            //this.checkAuthor();
            //Autor muss überprüft werden.
            let fileHandler = new FileHandler_1.FileHandler();
            let data = fileHandler.readFile("../data/books.json");
            let newBook = {
                book_title: newBookTitle,
                release_year: newReleasYear,
                ISBN: newISBN,
                genre: newGenre,
                authors: authors
            };
            data.push(newBook);
            fileHandler.writeFile("../data/books.json", data);
            console.log("Book added to list");
            this.showAdminFunctionalities();
        });
    }
    //Add author to database
    addAuthorToDatabase() {
        return __awaiter(this, void 0, void 0, function* () {
            let newAuthorsName = yield ConsoleHandling_1.default.question("Name of Author(Forname Lastname): ");
            let nameRegExp = new RegExp('{(\w+)(?:\s.*\w)?\s(\w+).*}');
            if (nameRegExp.test(newAuthorsName.toString())) {
                let newAmmountOfBooks = 0;
                let newBirthday = yield ConsoleHandling_1.default.question("Bithday of Author(dd-mm-yyyy): ");
                let newID = uuid_1.v4();
                let birthdayRegExp = new RegExp('{\^([0-2][0-9]|(3)[0-1])(\-)(((0)[0-9])|((1)[0-2]))(\-)\d{4}$}/i');
                if (birthdayRegExp.test(newBirthday.toString())) {
                    let fileHandler = new FileHandler_1.FileHandler();
                    let data = fileHandler.readFile("../data/authors.json");
                    let newAuthor = {
                        authors_name: newAuthorsName,
                        birhtday: newBirthday,
                        AmmountOfBooks: newAmmountOfBooks,
                        ID: newID
                    };
                    data.push(newAuthor);
                    fileHandler.writeFile("../data/authors.json", data);
                    console.log("Author added to list");
                    this.showAdminFunctionalities();
                }
                else {
                    console.log("Sorry the birthdate isnt valid");
                    this.showAdminFunctionalitiesAgain();
                }
            }
            else {
                console.log("Sorry thats not a name");
                this.showAdminFunctionalitiesAgain();
            }
        });
    }
    //Add genre to database
    addGenreToDatabase() {
        return __awaiter(this, void 0, void 0, function* () {
            let newGenre = yield ConsoleHandling_1.default.question("Genre: ");
            let fileHandler = new FileHandler_1.FileHandler();
            let data = fileHandler.readFile("../data/genres.json");
            let newBook = {
                genre: newGenre,
            };
            data.push(newBook);
            fileHandler.writeFile("../data/genres.json", data);
            console.log("Genre added to list");
            this.showAdminFunctionalities();
        });
    }
    //go back function admin
    showAdminFunctionalitiesAgain() {
        return __awaiter(this, void 0, void 0, function* () {
            let answer = yield ConsoleHandling_1.default.question("Want to use another administration function? ");
            switch (answer.toLowerCase()) {
                case "y":
                case "yes":
                    this.showAdminFunctionalities();
                    break;
                case "n":
                case "no":
                    this.showAdminFunctionalitiesAgain();
                    break;
                default:
                    this.showAdminFunctionalities();
                    break;
            }
        });
    }
    //go back fucntion regular User
    showFunctionalitiesAgain() {
        return __awaiter(this, void 0, void 0, function* () {
            let answer = yield ConsoleHandling_1.default.question("Want to use another function? ");
            switch (answer.toLowerCase()) {
                case "y":
                case "yes":
                    this.showFunctionalities();
                    break;
                case "n":
                case "no":
                    ConsoleHandling_1.default.closeConsole();
                    break;
                default:
                    this.showFunctionalities();
                    break;
            }
        });
    }
}
exports.Bookdatabase = Bookdatabase;
//# sourceMappingURL=Bookdatabase.js.map