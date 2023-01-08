import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UserModelDto } from 'src/auth/dto/user.dto';
import { groupDto } from './dto/group.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class GroupService {
    constructor(
        @InjectModel('Groups') private readonly groupModel:Model<groupDto>,
    @InjectModel('Users') private readonly userModel: Model<UserModelDto>,

    ){}

    async generateHashedPassword(password) {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      return hashedPassword;
    }
    async createOrganizationGroup(groupDetails:any){
        try{
            const {organizationId,groupName}= groupDetails
            
            const organizer = await this.userModel.findOne({_id:organizationId})
            if(!organizer)
             throw new HttpException("Organizer does not exists", HttpStatus.BAD_REQUEST)
             const groupExists = await this.groupModel.exists({groupName:groupName,organizationId:organizationId})
             if(groupExists)
             throw new HttpException("Group exists", HttpStatus.BAD_REQUEST)
            const newGroup = await new this.groupModel(groupDetails)
            await newGroup.save()
            const organizationGroups = await this.groupModel.find({organizationId:organizationId})
            return organizationGroups
        }catch(err){
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
                
        }
    }
    async editGroup(groupDetails,organizationId,groupId){
        
    try{
      await this.groupModel.findOneAndUpdate({_id:groupId},groupDetails)
        const organizationGroups = await this.groupModel.find({organizationId:organizationId})
        return organizationGroups
    }catch(err){
    throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
    }
    async deleteGroup(groupId,organizationId){
        try{
            const organization = await this.userModel.findOne({_id:organizationId})
            if(!organization)
             throw new HttpException("Organizer does not exists", HttpStatus.BAD_REQUEST)
             await this.groupModel.findOneAndDelete({_id:new Types.ObjectId(groupId)})
             await this.userModel.deleteMany({groupId:new Types.ObjectId(groupId)})
             const organizationGroups = await this.groupModel.find({organizationId:organizationId})
             return organizationGroups
        }catch(err){
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST); 
        }
    }
    async addMembers(memberDetails,groupId){
        try{
            memberDetails.groupId= groupId
            const {emailAddress} = memberDetails
            const userExists = await this.userModel.exists({emailAddress:emailAddress})
            if(userExists)
      throw new HttpException('User exists', HttpStatus.BAD_REQUEST); 
            
      const password = memberDetails.password;
      memberDetails.password = await this.generateHashedPassword(password);
            const addUser = await new this.userModel(memberDetails)
            await addUser.save()
           const groupUsers = await this.userModel.find({groupId:groupId})
           return groupUsers
        }catch(err){
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST); 

        }
    }
    async getOrganizationGroups(organizationId){
        try{
            const organizations = await this.groupModel.find({organizationId:organizationId})
            return organizations
        }catch(err){
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST); 

        }
    }
    async getGroupMembers(groupId){
      try{
        const groupMembers = await this.userModel.find({groupId:groupId},{quizzesPlayed:0,assignedQuizzes:0,password:0})
        return groupMembers
      }catch(err){
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST); 
      }
    }
}
