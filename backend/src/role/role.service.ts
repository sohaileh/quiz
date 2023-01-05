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
         const userRoles=   await this.rolesModel.aggregate([
                {$group:{_id:'$role'}}
            ])
           return userRoles
        }catch(err){
      throw new HttpException(err, HttpStatus.BAD_REQUEST);

        }
       
    }
}
