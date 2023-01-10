import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Res, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/authorization/decorator/roles.decorator';
import { RolesGuard } from 'src/auth/authorization/guard/roles.guard';
import { JwtAuthGuard } from 'src/auth/gaurds/auth.gaurd';
import { AssignService } from './assign.service';

@Controller('assign')
export class AssignController {
  constructor(private readonly assignService: AssignService) {}

  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles('organizer')
  @Post('assign-quiz/:groupId/:organizerId/:organizationId')
  async assignQuizToGroup(@Body() body,@Param() param,@Res() res){
      try{
        const {groupId,organizationId,organizerId}= param
        const quizAssigned  = await this.assignService.assignQuizToGroup(body,groupId,organizerId,organizationId)
          res.status(HttpStatus.OK).json(quizAssigned)
      }catch(err){
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);

      }
  }
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles('organizer')
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
