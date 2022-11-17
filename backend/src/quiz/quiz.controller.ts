import {
  Controller,
  Res,
  Body,
  Get,
  Post,
  HttpStatus,
  HttpException,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  StreamableFile,
  UploadedFiles,
  Param,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/gaurds/auth.gaurd';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

import { QuizService } from './quiz.service';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post('submit-info')
  async submitInfo(@Body() body: any, @Res() res: any) {
    try {
      const createdQuiz = await this.quizService.submitInfo(body);
      res.status(HttpStatus.OK).json(createdQuiz);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('attempt-quiz')
  async attemptQuiz(@Body() body: any, @Res() res: any) {
    try {
      const question = await this.quizService.attemptQuiz(body);

      res.status(HttpStatus.OK).json({ question: question });
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).json(err.message);
    }
  }

  @Get('getQuizzes')
  async getQuizzes(@Res() res: any) {
    try {
      const quizzes = await this.quizService.getQuizzes();
      res.status(HttpStatus.OK).json(quizzes);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('get-quiz-time')
  async getQuizTime(@Res() res: any, @Body() body: any) {
    try {
      const quizTime = await this.quizService.getQuizTime(body);
      res.status(HttpStatus.OK).json(quizTime);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('upload-file/:id')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file,
    @Res() res: any,
    @Body() body: any,
    @Param() quizId: any,
  ) {
    try {
      const uploadFile = file;
      body.options = JSON.parse(body.options);
      console.log('parsed object', body);
      await this.quizService.uploadFile(body, file, quizId);
      res.status(200).json({ message: 'File Uploaded Successfully' });
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('generate-certificate')
  async generateCertificate(@Body() body: any, @Res() res: any) {
    try {
      const certificateGenerated = await this.quizService.generateCertificate(
        body,
      );
      res.status(200).json(certificateGenerated);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('check-if-played')
  async checkIfPlayed(@Body() body: any, @Res() res: any) {
    try {
      const hasPlayed = await this.quizService.checkIfPlayed(body);
      res.status(HttpStatus.OK).json(hasPlayed);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('get-organization-users')
  async getOrganizationUsers(@Body() body: any, @Res() res: any) {
    try {
      const { organizerId } = body;
      const organizationUsers = await this.quizService.getOrganizationUsers(
        organizerId,
      );
      res.status(200).json(organizationUsers);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('enter-quiz')
  async enterQuiz(@Res() res:any,@Body() body:any){
    try{
        const totalEnteredTeams = await this.quizService.enterQuiz(body)
        res.status(200).json(totalEnteredTeams)
    }catch(err){
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);

    }
  }
}
