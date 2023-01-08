import { Body, Controller, HttpException, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { AssignService } from './assign.service';

@Controller('assign')
export class AssignController {
  constructor(private readonly assignService: AssignService) {}

  @Post('assign-quiz/:groupId/:organizationId')
  async assignQuizToGroup(@Body() body,@Param() param,@Res() res){
      try{
        const {groupId,organizationId}= param
        const quizAssigned  = await this.assignService.assignQuizToGroup(body,groupId,organizationId)
          res.status(HttpStatus.OK).json(quizAssigned)
      }catch(err){
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);

      }
  }
}
