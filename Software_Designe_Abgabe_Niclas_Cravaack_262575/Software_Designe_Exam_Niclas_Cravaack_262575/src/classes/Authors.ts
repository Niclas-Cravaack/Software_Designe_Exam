import { AuthorDAO } from "../types/AuthorDAO.type";
import { AbstractPerson } from "./abstracts/AbstractPerson";

export class Author extends AbstractPerson
 {
   
  constructor(author: AuthorDAO) 
  {
    super()
    this.setID()
    this.setName(author.authors_name);
    this.setBirthday(author.birthday);
    
  }
}
