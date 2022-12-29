import * as mongoose from 'mongoose';

export const RoleSchema = new mongoose.Schema({
    roles:{
        type:Array<String>,
        default:'student',
    }
})
