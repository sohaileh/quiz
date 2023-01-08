import * as mongoose from 'mongoose';

export const AssignSchema = new mongoose.Schema({
    groupId:{type: mongoose.Schema.Types.ObjectId},
    assignedQuizzes:[{
        quizId:{type: mongoose.Schema.Types.ObjectId}
    }],
    organizationId:{type:mongoose.Schema.Types.ObjectId}
})
