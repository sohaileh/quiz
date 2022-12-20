
import {IsNotEmpty,IsArray, IsString ,IsNumber, IsBoolean, IsDate} from 'class-validator'
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
@IsNotEmpty()

@IsString()

public quizName: String;



@IsNotEmpty()

@IsNumber()

public timeLimitPerQuestion: Number;



@IsNotEmpty()

@IsString()

public randomizeQuestion: String;



@IsNotEmpty()

@IsBoolean()

public time_check: Boolean;

// @IsNotEmpty()

// @IsBoolean()

// autoNumberQuestion: Boolean;

@IsNotEmpty()

@IsDate()

public from_date: Date;

@IsNotEmpty()

@IsDate()

public to_date: Date;



@IsNotEmpty()

@IsDate()

public from_time: string;



@IsNotEmpty()

@IsDate()

public to_time: string;



@IsNotEmpty()

@IsBoolean()

public whole_check: Boolean;

@IsNotEmpty()

@IsBoolean()

public rand_check: Boolean;

@IsNotEmpty()

@IsBoolean()

public per_check: Boolean;

@IsNotEmpty()

@IsBoolean()

public retake_check: Boolean;

@IsNotEmpty()

@IsBoolean()

public redirect_check: Boolean;



@IsNotEmpty()

@IsBoolean()

public schedule_check: Boolean;



@IsNotEmpty()

@IsNumber()

questionPerPage: Number;



@IsNotEmpty()

@IsNumber()

public maxAttempts: Number;



@IsNotEmpty()

@IsString()

public redirectOnQuizCompletion: String;



@IsNotEmpty()

@IsNumber()

public quizTimeLimit: Number;


}

