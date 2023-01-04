import mongoose from "mongoose";
export const GradeSchema = new mongoose.Schema({ 
    grade: String,
    quizId: Number,
    minimumPercentage: Number
})