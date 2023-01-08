import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { assignModelDto } from './dto/assign.dto';
@Injectable()
export class AssignService {
    constructor(@InjectModel('Assigns') private readonly assignModel:Model<assignModelDto>){}

async assignQuizToGroup(body,groupId,organizationId){
    try{
        const assignDetails={assignedQuizzes:body.assignedQuizzes,groupId:groupId,organizationId:organizationId}
        const assignQuiz = await new this.assignModel(assignDetails)
        await assignQuiz.save()
        return 'assigned quiz'
    }catch(err){
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
}
async getAssignedGroupQuizzes(groupId){
    try{
      const assignedQuizzes = await this.assignModel.findOne({groupId:groupId},{assignedQuizzes:1})
      return assignedQuizzes
    }catch(err){
    throw new HttpException(err.message, HttpStatus.BAD_REQUEST); 
    }
  }
}

