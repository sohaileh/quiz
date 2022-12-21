import * as mongoose from 'mongoose';

export const emailSchema = new mongoose.Schema({
  from: String,
  to: String,
  cc: String,
  subject: String,
  editor: String,
});
