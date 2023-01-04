import { Document } from "mongoose";
export interface gradeModel extends Document {
    grade: String;
    quizId:Number;
    minimumPercentage:Number;
    

}