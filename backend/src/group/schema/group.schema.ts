import * as mongoose from 'mongoose';

export const groupSchema = new mongoose.Schema({
  groupName:{type:String},
  organizationId: { type: mongoose.Schema.Types.ObjectId },
  organizerId: { type: mongoose.Schema.Types.ObjectId },
  created:{type:Date,default:Date.now}
});
