import { ObjectId } from 'mongoose';


export class groupDto{

    public groupName:String;
    public organizationId:ObjectId;
    public organizerId:ObjectId;
    public created:Date
} 
  

