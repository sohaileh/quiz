import * as mongoose from 'mongoose';
export const OrganizationSchema = new mongoose.Schema({
    organizationName: String,
    emailAddress:String,
    password: String,
    contact:Number,
})
