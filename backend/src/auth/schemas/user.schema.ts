import * as mongoose from 'mongoose';
export const UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    organization:String,
    emailAddress: String,
    quizzesPlayed:[
        {
            quizId:{type:mongoose.Schema.Types.ObjectId}
        }
    ],
    password: String,
    score:String,
    assignedQuizzes:[
        {
            quizId:{type:mongoose.Schema.Types.ObjectId}
        }
    ],
    role:{type:String,default:'student'}
})

