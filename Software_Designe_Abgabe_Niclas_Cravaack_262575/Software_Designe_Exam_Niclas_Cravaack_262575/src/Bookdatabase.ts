import ConsoleHandling from "./classes/ConsoleHandling";
import { Book } from "./classes/Book";
import { NullBook } from "./classes/NullBook";
import { Author } from "./classes/Authors";
import { FileHandler } from "./classes/FileHandler";
import { BookDAO } from "./types/BookDAO.type";
import { AuthorDAO } from "./types/AuthorDAO.type";
import { AbstractBook } from "./classes/abstracts/AbstractBook";
import { Admins } from "./classes/Admins";
import { AdminsDAO } from "./types/AdminsDAO.type";
import { v4 as uuidv4 } from "uuid";
import { AbstractPerson } from "./classes/abstracts/AbstractPerson";


export class Bookdatabase {
  private _books: Book[] = [];
  private _authors: Author[] = [];
  private _admins: Admins[] = [];
  public booksLookedAt: number = 0;

  constructor() {
    let fileHandler = new FileHandler();
    let booksJson: BookDAO[] = fileHandler.readArrayFile("../data/books.json");
    let authorsJson: AuthorDAO[] = fileHandler.readArrayFile("../data/authors.json");
    let adminsJson: AdminsDAO[] = fileHandler.readArrayFile("../data/admins.json")

    for (let book of booksJson) {
      this._books.push(new Book(book));
    }

    for (let author of authorsJson) {
      this._authors.push(new Author(author));
    }
    for (let admin of adminsJson) {
      this._admins.push(new Admins(admin));
    }
  }

  public async showFunctionalities(): Promise<void> {
    let answer: String = await ConsoleHandling.showPossibilities(
      [
        "1. List all books with ISBN",
        "2. Search a books by ISBN",
        "3. Search a book by title",
        "4. Search a book by author",
        "5. how many books did i look at?",
        "6. admin functions"
      ],
      "Which function do you want to use? (default 1): ");

    this.handleAnswer(answer);
  }

  public async handleAnswer(answer: String) {
    switch (answer) {
      case "1":
        this.showAllBooksWithISBN();
        break;
      case "2":
        await this.searchBookByISBN();
        break;
      case "3":
        await this.searchBookByTitle();
        break;
      case "4":
        await this.searchBookByAuthor();
        break;
      case "5":
        this.howManyBooksDidILookAt();
        this.showFunctionalities();
        break;
      case "6":
        this.adminLogin();
        break;
      default:
        this.showAllBooksWithISBN();
        break;
    }
    await this.showFunctionalitiesAgain();
  }

  public async showAdminFunctionalities(): Promise<void> {
    let answer: String = await ConsoleHandling.showPossibilities(
      [
        "7. Add book to database",
        "8. Add author to database",
        "9. Add genre to database",
        "10 back to normal functions"

      ],
      "Which function do you want to use? (default 10): ");

    this.handleAdminsChoice(answer);
  }

  public async handleAdminsChoice(answer: String) {
    switch (answer) {
      case "7":
        this.addBookToDatabase();
        break;
      case "8":
        this.addAuthorToDatabase();
        break;
      case "9":
        this.addGenreToDatabase();
        break;
      case "10":
        this.showFunctionalities();
        break;
      default:
        this.showFunctionalities();
        break;
    }
    await this.showAdminFunctionalitiesAgain();
  }



  //Functionalities

  //books looked at
  public howManyBooksDidILookAt() {
    console.log("You looked at " + this.booksLookedAt + " books")
  }

  //login admin
  public async adminLogin() {
    // Plan B hardcoden
    let loginname: String = await ConsoleHandling.question("Loginname: ")
    let password: String = await ConsoleHandling.question("password: ")
    // let admin : AbstractPerson = this._admins.filter((loginname) => admin.getName().match(new RegExp(`${loginname}`, 'gi')))[0];
    // if(admin !== undefined)
    // {
    //   let admin : AbstractPerson = this._admins.filter((password) => admin.getPassword().match(new RegExp(`${password}`,'gi')))[0];
    //   if(admin !== undefined)
    //   {
    //     this.showAdminFunctionalities();
    //   }
    // }
    // else
    // {
    //   console.log("your not an administrator, you traitor")
    //   this.showAdminFunctionalities();
    // }
    if (loginname == "Bob" && password == "1234") {
      this.showAdminFunctionalities();
    }
    else {
      console.log("You are not an administrator, you traitor!")
      this.showFunctionalities();
    }

  }
  //All search functions
  //show all books
  public showAllBooksWithISBN(): void {
    ConsoleHandling.printInput("\n")

    let lastIndex: number = 0;
    for (let index in this._books) {
      let book: Book = this._books[index];
      let _index: number = Number.parseInt(index) + 1;

      ConsoleHandling.printInput("\n")
      ConsoleHandling.printInput(`Book is: ${book.getBookTitle()} \n with ISBN: ${book.getISBN()} \n and release year: ${book.getReleaseYear()} \n Genre is: ${book.getGenre()} \n author is: ${book.getAuthors()}`);

      lastIndex = _index;
    }
    this.booksLookedAt = this.booksLookedAt + lastIndex;
  }
  //search by title
  public async searchBookByTitle(): Promise<void> {
    let bookTitle: String = await ConsoleHandling.question("Which title are you looking for? ")
    let book: AbstractBook = this._books.filter((book) => book.getBookTitle().match(new RegExp(`${bookTitle}`, 'gi')))[0];
    this.booksLookedAt += 1;
    book = book !== undefined ? book : new NullBook();

    ConsoleHandling.printInput("\n")
    ConsoleHandling.printInput(`Book is: ${book.getBookTitle()} \n with ISBN: ${book.getISBN()} \n and release year: ${book.getReleaseYear()} \n Genre is: ${book.getGenre()} \n author is: ${book.getAuthors()}`);

  }
  //search by ISBN
  public async searchBookByISBN(): Promise<void> {
    let ISBN: String = await ConsoleHandling.question("Which ISBN are you looking for? ")
    let book: AbstractBook = this._books.filter((book) => book.getISBN().match(new RegExp(`${ISBN}`, 'gi')))[0];
    this.booksLookedAt += 1;

    book = book !== undefined ? book : new NullBook();

    ConsoleHandling.printInput("\n")
    ConsoleHandling.printInput(`Book is: ${book.getBookTitle()} \n with ISBN: ${book.getISBN()} \n and release year: ${book.getReleaseYear()} \n Genre is: ${book.getGenre()} \n author is: ${book.getAuthors()}`);
  }
  //search by author
  public async searchBookByAuthor(): Promise<void> {
    let author: String = await ConsoleHandling.question("Which author are you looking for? ")
    let book: AbstractBook = this._books.filter((book) => book.getAuthors().match(new RegExp(`${author}`, 'gi')))[0];

    this.booksLookedAt += 1;

    book = book !== undefined ? book : new NullBook();

    ConsoleHandling.printInput("\n")
    ConsoleHandling.printInput(`Book is: ${book.getBookTitle()} \n with ISBN: ${book.getISBN()} \n and release year: ${book.getReleaseYear()} \n Genre is: ${book.getGenre()} \n author is: ${book.getAuthors()}`);
  }

  //All add functions
  //add book to database 
  public async addBookToDatabase() {
    let newBookTitle: String = await ConsoleHandling.question("Title of new book: ");

    let newISBN: String = await ConsoleHandling.question("ISBN of new book (xxx-x-xxx-xxxxx-x): ")
    let ISBNRegExp: RegExp = /^([0-9][0-9][0-9])(\-)([0-9](\-)([0-9][0-9][0-9](\-)([0-9][0-9][0-9][0-9][0-9])(\-)([0-9])))/
    if (ISBNRegExp.test(`${newISBN}`)) {
      let newGenre: String = await ConsoleHandling.question("Genre of new book: ")

      let newReleasYear: String = await ConsoleHandling.question("Release year of new book (xxxx): ")
      let YearRegExp: RegExp = /^([0-9][0-9][0-9][0-9])/

      if (YearRegExp.test(`${newReleasYear}`)) {
        let authors: String = await ConsoleHandling.question("authors of book (forname lastname): ")
        let author: AbstractPerson = this._authors.filter((author) => author.getName().match(new RegExp(`${authors}`, 'gi')))[0];

        if (author == undefined) {
          await this.addAuthorToDatabase();

        }
        let fileHandler = new FileHandler();
        let data = fileHandler.readFile("../data/books.json");

        let newBook =
        {
          book_title: newBookTitle,
          release_year: newReleasYear,
          ISBN: newISBN,
          genre: newGenre,
          authors: authors
        }

        data.push(newBook);
        fileHandler.writeFile("../data/books.json", data)

        console.log("Book added to list")

        this.showAdminFunctionalities();
      }
      else {
        console.log("not a real Year");
        this.showAdminFunctionalitiesAgain();
      }
    }
    else {
      console.log("not a real ISBN");
      this.showAdminFunctionalitiesAgain();
    }

  }

  //Add author to database
  public async addAuthorToDatabase() {
    let newAuthorsName: String = await ConsoleHandling.question("Name of Author(Forname Lastname): ");
    let nameRegExp: RegExp = /(\w+)(?:\s.*\w)?\s(\w+).*/;
    if (nameRegExp.test(`${newAuthorsName}`)) {

      let fileHandler = new FileHandler();
      let data = fileHandler.readFile("../data/authors.json");

      let newID: String = uuidv4();
      let newBirthday: String = await ConsoleHandling.question("Bithday of Author(dd-mm-yyyy): ")

      let birthdayRegExp: RegExp = /^([0-2][0-9]|(3)[0-1])(\-)(((0)[0-9])|((1)[0-2]))(\-)\d{4}$/
      if (birthdayRegExp.test(`${newBirthday}`)) {



        let newAuthor =
        {
          authors_name: newAuthorsName,
          birhtday: newBirthday,
          ID: newID
        }

        data.push(newAuthor);
        fileHandler.writeFile("../data/authors.json", data)

        console.log("Author added to list")

      
      }
      else {
        console.log("Sorry the birthdate isnt valid")
        this.showAdminFunctionalitiesAgain();
      }
    }
    else {
      console.log("Sorry thats not a name")
      this.showAdminFunctionalitiesAgain();
    }
  }

  //Add genre to database
  public async addGenreToDatabase() {
    let fileHandler = new FileHandler();
    let data = fileHandler.readFile("../data/genres.json");

    let newGenre: String = await ConsoleHandling.question("Genre: ");

    let newBook =
    {
      genre: newGenre,

    }

    data.push(newBook);
    fileHandler.writeFile("../data/genres.json", data)

    console.log("Genre added to list")

    this.showAdminFunctionalities();

  }

  //go back function admin
  public async showAdminFunctionalitiesAgain(): Promise<void> {
    let answer: String = await ConsoleHandling.question("Want to use another administration function? ");
    switch (answer.toLowerCase()) {
      case "y":
      case "yes":
        this.showAdminFunctionalities();
        break;
      case "n":
      case "no":
        ConsoleHandling.closeConsole();
        break;
      default:
        this.showAdminFunctionalities();
        break;
    }
  }
  //go back fucntion regular User
  public async showFunctionalitiesAgain(): Promise<void> {
    let answer: String = await ConsoleHandling.question("Want to use another function? ");
    switch (answer.toLowerCase()) {
      case "y":
      case "yes":
        this.showFunctionalities();
        break;
      case "n":
      case "no":
        ConsoleHandling.closeConsole()
        break;
      default:
        this.showFunctionalities();
        break;
    }
  }
}