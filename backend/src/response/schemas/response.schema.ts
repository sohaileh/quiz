import * as mongoose from 'mongoose'
     
export const ResponseSchema = new mongoose.Schema({
    quizId: mongoose.Schema.Types.ObjectId,
    userId:mongoose.Schema.Types.ObjectId,
    response:[
        {
            answer:String,
            questionId:mongoose.Schema.Types.ObjectId,
        }
    ]
})