import {v4 as uuidv4} from "uuid";

export class AbstractPerson
{
    private _id: String;
    private _name: String;
    private _birthday: String
    private _password:String;
    
    constructor()
    {
        this._id = uuidv4();
        this._name = "";
        this._birthday = "";
        this._password="";
    }
    public getName(): String
    {
     return this._name;
   }
 
   public setName(value: String) 
   {
     this._name = value;
   }
 
   public getBirthday(): String
    {
     return this._birthday;
   }
   public setBirthday(value: String)
    {
     this._birthday = value;
   }
   public getID (): String
   {
        return this._id;
   }
   public setID() 
   {
        this._id = uuidv4();
   }
   public getPassword() : String
   {
     return this._password;
   }
   public setPassword(value :String)
   {
     this._password= value;
   }
}