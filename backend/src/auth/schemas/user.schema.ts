import * as mongoose from 'mongoose';
export const UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    organization:String,
    emailAddress: String,
    organizationId:{type:mongoose.Schema.Types.ObjectId},
    quizzesPlayed:[
        {
            quizId:{type:mongoose.Schema.Types.ObjectId}
        }
    ],
    password: String,
    score:String,
    created:{type:Date,default:Date.now},
    role:{type:String,default:'student'},
    assignedQuizzes:[{
        quizId:{type:mongoose.Schema.Types.ObjectId}


    }]


})

