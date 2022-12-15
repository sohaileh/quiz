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
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date, default: Date.now },
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
  totalQuestions: Number,
  createdAt: { type: Date, default: Date.now() },
  quizName: String,

  timeLimitPerQuestion: Number,

  quizTimeLimit: Number,

  randomizeQuestion: String,

  // autoNumberQuestion:Boolean,

  questionPerPage: Number,

  maxAttempts: Number,

  redirectOnQuizCompletion: String,

  time_check: Boolean,

  whole_check: Boolean,

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
