import * as mongoose from 'mongoose'
     
export const ResultSchema = new mongoose.Schema({
   
    userId:mongoose.Schema.Types.ObjectId,
    results:[
        {
            quizId: mongoose.Schema.Types.ObjectId,
           score:Number,
           totalCorrectAnswers:Number,
           totalQuestions:Number,
           totalPoints:Number,
           attempts:Number,
           playedOn:{type:Date,default:Date.now}
           
        }
    ],
    attempts:{type:Number,default:2}
})