
import { Document } from 'mongoose';
export interface userModel extends Document{
    firstName:String;
    lastName:String;
    emailAddress:String;
    password:String;
    role:String;
    quizzesPlayed:[];
}