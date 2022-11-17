import { Document } from "mongoose";
export interface quizModel extends Document {
    eventName: String;
    organizationName: String;
    totalTime:Number;
    reward:String;
    
    questionBank: [
        {
            type:String;
            marks:Number
            question: String,
            correctAnswer: String,
            options: [
                { option: String }
            ]
        }
    ],
    totalQuestions:Number;
    createdAt: Date
}