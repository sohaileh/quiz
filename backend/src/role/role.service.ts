import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { RoleModelDto } from './dto/role.dto';
import { RoleSchema } from './schema/role.schema';

@Injectable()
export class RoleService {
    constructor(
        @InjectModel('Roles') private readonly rolesModel: Model<RoleModelDto>,
    ){}

    async getRoles(){
        try{
            // const roles = await mongoose.model('roles',RoleSchema)
            // // console.log('roles',roles.schema.path('roles').schema.path('roles'))
            // console.log(roles.schema.path('roles'))
            const {roles} = await this.rolesModel.findOne({},{_id:0})
           return roles
            return
        }catch(err){
      throw new HttpException(err, HttpStatus.BAD_REQUEST);

        }
       
    }
}
