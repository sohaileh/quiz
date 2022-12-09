
import { doesNotThrow } from 'assert'
import * as mongoose from 'mongoose'

export const QuizSchema = new mongoose.Schema({
    quizTitle:String,
    status:{type:String,default:'In design'},
    organizationId:{type:mongoose.Schema.Types.ObjectId},
    eventName: String,
    organizationName: String,
    totalTime:Number,
    reward:String,
    description:String,
    startDate:{type:Date,default: Date.now},
    endDate:{type:Date,default: Date.now},
    questionBank: [
        {
            attempted:{type:Boolean},

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
