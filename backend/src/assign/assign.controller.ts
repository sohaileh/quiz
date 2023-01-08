import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { AssignService } from './assign.service';

@Controller('assign')
export class AssignController {
  constructor(private readonly assignService: AssignService) {}

  @Post('assign-quiz/:groupId/:organizationId')
  async assignQuizToGroup(@Body() body,@Param() param,@Res() res){
    console.log(param)
      try{
        const {groupId,organizationId}= param
        const quizAssigned  = await this.assignService.assignQuizToGroup(body,groupId,organizationId)
          res.status(HttpStatus.OK).json(quizAssigned)
      }catch(err){
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);

      }
  }
  @Get('get-assigned-group-quizzes/:groupId')
  async getAssignedGroupQuizzes(@Param() param ,@Res() res){
    try{
      const {groupId}= param
      const assignedQuizzes = await this.assignService.getAssignedGroupQuizzes(groupId)
      res.status(HttpStatus.OK).json(assignedQuizzes)
    }catch(err){
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }
}
