import { AbstractBook } from "./abstracts/AbstractBook";

export class NullBook extends AbstractBook 
{
  constructor() 
  {
    super();
    this.setBookTitle("No book found with this title!");
    this.setReleaseYear("0");
    this.setISBN("0");
    this.setAuthors("");
    this.setGenre("none")
  }
}