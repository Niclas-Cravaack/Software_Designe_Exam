export class AbstractBook 
{
  private _bookTitle: String;
  private _releaseYear: String;
  private _ISBN: String;
  private _authors: String;
  private _genre: String;
  constructor() 
  {
    this._bookTitle = "";
    this._releaseYear = "0";
    this._ISBN = "0";
    this._authors = "";
    this._genre ="none";
  }

  public getBookTitle(): String 
  {
    return this._bookTitle;
  }
  public setBookTitle(value: String) 
  {
    this._bookTitle = value;
  }

  public getReleaseYear(): String 
  {
    return this._releaseYear;
  }
  public setReleaseYear(value: String) 
  {
    this._releaseYear = value;
  }

  public getISBN(): String 
  {
    return this._ISBN;
  }
  public setISBN(value: String) 
  {
    this._ISBN = value;
  }

  public getAuthors(): String 
  {
    return this._authors;
  }
  public setAuthors(value: String) 
  {
    this._authors = value;
  }

  public getGenre()
  {
    return this._genre;
  }
  public setGenre(value : String)
  {
    this._genre=value;
  }
}