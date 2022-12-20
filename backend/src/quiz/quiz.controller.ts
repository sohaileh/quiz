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
  Param,
  Req,
  Delete,
  Patch,
  CacheTTL,
  Put,
  Query,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/gaurds/auth.gaurd';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

import { QuizService } from './quiz.service';
import { Roles } from 'src/auth/authorization/decorator/roles.decorator';
import { RolesGuard } from 'src/auth/authorization/guard/roles.guard';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('organizer')
  @Post('submit-info')
  async submitInfo(@Body() body: any, @Res() res: any) {
    try {
      const createdQuiz = await this.quizService.submitInfo(body);
      res.status(HttpStatus.OK).json(createdQuiz);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('user')
  @Post('attempt-quiz')
  async attemptQuiz(@Body() body: any, @Res() res: any) {
    try {
      const question = await this.quizService.attemptQuiz(body);

      res.status(HttpStatus.OK).json({ question: question });
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).json(err.message);
    }
  }

  // @UseGuards(JwtAuthGuard)
  @Get('get-quiz-questions/:id')
  async getQuizQuestions(
    @Param() params: any,
    @Query() query,
    @Res() res: any,
    @Req() req,
  ) {
    try {
      const { id: quizId } = params;
      const { questionNumber } = query;
      // const { role } = req.user;
      const quizQuestions = await this.quizService.getQuizQuestions(
        quizId,

        questionNumber,
      );
      res.status(HttpStatus.OK).json(quizQuestions);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('getQuizzes')
  async getQuizzes(@Res() res: any, @Body() body:any) {
    try {
      const quizzes = await this.quizService.getOrganizationQuizzes(body);
      res.status(HttpStatus.OK).json(quizzes);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('get-quiz-time')
  async getQuizTime(@Res() res: any, @Body() body: any) {
    try {
      const quizTime = await this.quizService.getQuizTime(body);
      res.status(HttpStatus.OK).json(quizTime);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtAuthGuard)
  // @Roles('organizer')
  @Post('upload-file/:id')
  @UseInterceptors(FileInterceptor('file'))
  async addQuestionToQuiz(
    @UploadedFile() file,
    @Res() res: any,
    @Body() body: any,
    @Param() quizId: any,
  ) {
    try {
      const uploadFile = file;
      body.options = JSON.parse(body.options);
      const questionUploaded = await this.quizService.addQuestionToQuiz(
        body,
        file,
        quizId,
      );
      res.status(200).json(questionUploaded);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch('edit-question/:quizId/:questionId')
  @UseInterceptors(FileInterceptor('file'))
  async editQuestion(
    @UploadedFile() file,
    @Param() params: any,
    @Body() body: any,
    @Res() res: any,
  ) {
    try {
      body.options = JSON.parse(body.options);

      const editQuestion = await this.quizService.editQuestion(
        body,
        params,
        file,
      );

      res.status(HttpStatus.OK).json(editQuestion);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }
  @Patch('delete-question/:id')
  async deleteQuestion(
    @Body() body: any,
    @Res() res: any,
    @Param() quizId: any,
  ) {
    try {
      const deletedQuestion = await this.quizService.deleteQuestion(
        body,
        quizId,
      );

      res.status(HttpStatus.OK).json(deletedQuestion);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
  @Post('check-if-played')
  async checkIfPlayed(@Body() body: any, @Res() res: any) {
    try {
      const hasPlayed = await this.quizService.checkIfPlayed(body);
      res.status(HttpStatus.OK).json(hasPlayed);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('organizer')
  @Post('get-organization-users')
  async getOrganizationUsers(@Body() body: any, @Res() res: any) {
    try {
      const organizationUsers = await this.quizService.getOrganizationUsers(
        body,
      );
      res.status(200).json(organizationUsers);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('enter-quiz')
  async enterQuiz(@Res() res: any, @Body() body: any) {
    try {
      const totalEnteredTeams = await this.quizService.enterQuiz(body);
      res.status(200).json(totalEnteredTeams);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('quizzes-Played')
  async QuizzesPlayedByUser(@Body() body: any, @Res() res: any) {
    try {
      const quizzesPlayed = await this.quizService.QuizzesPlayedByUser(body);
      res.status(HttpStatus.OK).json(quizzesPlayed);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }
  @Post('quiz-title')
  async createQuizTitle(@Body() body: any, @Res() res: any) {
    try {
      const quizTitle = await this.quizService.createQuizTitle(body);

      res.status(HttpStatus.OK).json(quizTitle);
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).json(err.message);
    }
  }

  @Post('delete-quiz')
  async deleteQuiz(@Body() body: any, @Res() res: any) {
    try {
      const quizs = await this.quizService.deleteQuiz(body);

      res.status(HttpStatus.OK).json(quizs);
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).json(err.message);
    }
  }

  @Post('rename-quiz-title')
  async renameQuizTitle(@Body() body: any, @Res() res: any) {
    try {
      const quizs = await this.quizService.renameQuizTitle(body);

      res.status(HttpStatus.OK).json(quizs);
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).json(err.message);
    }
  }
  @Post('is-quiz-assigned')
  async isQuizAssigned(@Body() body: any, @Res() res) {
    try {
      const isQuizAssigned = await this.quizService.isQuizAssigned(body);
      res.status(HttpStatus.OK).json(isQuizAssigned);
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).json(err.message);
    }
  }
  @Patch('configure-general')
  async configure(@Body() body: any, @Res() res: any) {
    try {
      const configElements = await this.quizService.configure(body);

      res.status(HttpStatus.OK).json(configElements);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }
  @Get('get-configuration-details/:id')
  async getConfigurationDetails(@Body() body,@Res() res,@Param() quizId){
      try{
        const configurationDetails = await this.quizService.getConfigurationDetails(quizId)
      res.status(HttpStatus.OK).json(configurationDetails)
      }catch(err){
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);

      }
  }
}
