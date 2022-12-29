import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
  HttpException,
  UseGuards,
  Get,
  Param,
} from '@nestjs/common';
import { Roles } from 'src/auth/authorization/decorator/roles.decorator';
import { RolesGuard } from 'src/auth/authorization/guard/roles.guard';
import { JwtAuthGuard } from 'src/auth/gaurds/auth.gaurd';
import { ResponseModelDto } from './dto/response.dto';
import { ResponseService } from './response.service';

@Controller('response')
export class ResponseController {
  constructor(private readonly responseService: ResponseService) {}

  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles('user')
  @Post('submit')
  async submitResponse(@Res() res: any, @Body() body: any) {
    try {
      const { userId, quizId } = body;
      await this.responseService.saveResponse(body);
      res.status(HttpStatus.OK).json('Reponse Saved Successfully');
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }
  // @UseGuards(JwtAuthGuard)
  @Post('submit-student-response')
  async submitStudentResponse (@Body() body:any,@Res() res){
   try{
    const savedResponse = await this.responseService.submitStudentResponse(body)
    res.status(HttpStatus.OK).json(savedResponse)
   }catch(err){
    throw new HttpException(err.message, HttpStatus.BAD_REQUEST);

   }
  }

  @Get('get-user-quiz-response/:quizId/:userId')
  async getUserQuizResponse(@Res() res,@Param() params){
    try{
      const quizResponse = await this.responseService.getUserQuizResponse(params)
    res.status(HttpStatus.OK).json(quizResponse)
    }catch(err){
    throw new HttpException(err.message, HttpStatus.BAD_REQUEST);

    }
  }
}
