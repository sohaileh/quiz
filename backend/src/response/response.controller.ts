import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { ResponseModelDto } from './dto/response.dto';
import { ResponseService } from './response.service';

@Controller('response')
export class ResponseController {
  constructor(private readonly responseService: ResponseService) {}

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
}
