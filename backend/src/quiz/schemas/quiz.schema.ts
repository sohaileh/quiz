import { doesNotThrow } from 'assert';
import * as mongoose from 'mongoose';

export const QuizSchema = new mongoose.Schema({
  quizTitle: String,
  status: { type: String, default: 'In design' },
  organizationId: { type: mongoose.Schema.Types.ObjectId },
  eventName: String,
  organizationName: String,
  totalTime: Number,
  reward: String,
  description: String,
  questionBank: [
    {
      attempted: { type: Boolean },

      type: { type: String, default: null },
      marks: { type: Number, default: 0 },
      fileName: { type: String, default: null },
      timeLimit: { type: Number, default: 1 },
      question: String,
      fileUrl: { type: String, default: null },
      correctAnswer: String,
      options: [{ option: String }],
    },
  ],
  totalQuestions: {type:Number,default:0},
  createdAt: { type: Date, default: Date.now() },
  quizName: String,

  timeLimitPerQuestion: Number,

  quizTimeLimit: Number,

  randomizeQuestion: String,

  // autoNumberQuestion:Boolean,

  questionPerPage: {type:Number,default:1},

  maxAttempts: Number,

  redirectOnQuizCompletion: String,

  time_check: {type:Boolean,default:false},

  whole_check: {type:Boolean,default:false},

  rand_check: Boolean,

  per_check: Boolean,

  retake_check: Boolean,

  redirect_check: Boolean,

  schedule_check: Boolean,

  from_date: Date,

  to_date: Date,

  from_time: String,

  to_time: String,
});
