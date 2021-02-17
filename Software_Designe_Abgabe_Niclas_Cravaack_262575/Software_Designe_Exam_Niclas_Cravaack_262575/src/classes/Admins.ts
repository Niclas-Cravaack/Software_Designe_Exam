import {AdminsDAO} from "../types/AdminsDAO.type"
import { AbstractPerson } from "./abstracts/AbstractPerson";

export class Admins extends AbstractPerson
{
    
    constructor(admin: AdminsDAO) 
    {
      super();
      this.setID();
      this.setName(admin.admins_name);
      this.setBirthday(admin.birthday);
           
    }
}