
import {IsNotEmpty,IsArray, IsString ,IsNumber} from 'class-validator'
import { ObjectId } from 'mongoose';
export class QuizModelDto{

public quizTitle:String;
public organizationId:ObjectId;
 public status:String;
    
@IsNotEmpty()
@IsString()
public eventName:string;

@IsNotEmpty()
@IsString()
organizationName: String;

@IsNotEmpty()
@IsNumber()
public totalTime:Number;

@IsNotEmpty()
@IsArray()
public questionBank:any[]

@IsNotEmpty()
@IsNumber()
public totalQuestions:Number;

@IsNotEmpty()
@IsString()
public description:String;
     

}

