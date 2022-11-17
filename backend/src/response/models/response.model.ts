import { Document } from "mongoose";

export interface responseModel extends Document{
    quizId:Object;
    userId:String;
    responses:[
        {
            response:String,
            questionId:String;
        }
    ]
}