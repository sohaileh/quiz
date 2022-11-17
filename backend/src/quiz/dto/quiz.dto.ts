
import {IsNotEmpty,IsArray, IsString ,IsNumber} from 'class-validator'
export class QuizModelDto{
    
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

