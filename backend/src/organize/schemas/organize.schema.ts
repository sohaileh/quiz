import * as mongoose from 'mongoose';

export const OrganizeSchema = new mongoose.Schema({
  organizerId: { type: mongoose.Schema.Types.ObjectId },
  quizId: { type: mongoose.Schema.Types.ObjectId },
  teamsParticipated:[{
    
    teamId:{type:mongoose.Schema.Types.ObjectId},
    order:{type:Number},
    play:{type:Boolean,default:false}
  }],

  teamsDetail: [
    {
      teamName: String,
      members: [],
      password:{type:String,default:''},
      attempted:{type:Boolean,default:false}
    },
  ],

  createdAt: { type: Date, default: Date.now() },
});
