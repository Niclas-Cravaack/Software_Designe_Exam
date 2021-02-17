import { BookDAO } from "../types/BookDAO.type";
import { AbstractBook } from "./abstracts/AbstractBook";

export class Book extends AbstractBook 
{
  

  constructor(book: BookDAO)
   {
    super();
    this.setBookTitle(book.book_title);
    this.setReleaseYear(book.release_year);
    this.setISBN(book.ISBN);
    this.setAuthors(book.authors);
    this.setGenre(book.genre)
  }
}