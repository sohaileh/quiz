
import { doesNotThrow } from 'assert'
import * as mongoose from 'mongoose'

export const QuizSchema = new mongoose.Schema({
    eventName: String,
    organizationName: String,
    totalTime:Number,
    reward:String,
    description:String,
    startDate:{type:Date,default: Date.now},
    endDate:{type:Date,default: Date.now},
    questionBank: [
        {
            type:{type:String,default:null},
            marks:{type:Number,default:0},
            question: String,
            fileUrl:{type:String,default:null},
            correctAnswer: String,
            options: [
                { option: String }
            ]
        }
    ],
    totalQuestions:Number,
    createdAt: { type: Date, default: Date.now() }
})
