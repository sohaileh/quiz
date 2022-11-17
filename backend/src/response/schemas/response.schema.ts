import * as mongoose from 'mongoose'
     
export const ResponseSchema = new mongoose.Schema({
    quizId: mongoose.Schema.Types.ObjectId,
    userId:String,
    responses:[
        {
            response:String,
            questionId:mongoose.Schema.Types.ObjectId,
        }
    ]
})