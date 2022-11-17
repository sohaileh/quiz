import {
  Controller,
  Post,
  Body,
  Res,
  Get,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { OrganizeService } from './organize.service';

@Controller('organize')
export class OrganizeController {
  constructor(private readonly organizeService: OrganizeService) {}

  @Post('add-teams-for-quiz')
  async registerTeams(@Body() body: any, @Res() res: any) {
    try {
      const teamsCreted = await this.organizeService.registerTeams(body);

      res.status(HttpStatus.OK).json('Quiz organized successfully');
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('get-user-team-quiz-details')
  async getUserTeamQuizDetails(@Body() body: any, @Res() res: any) {
    try {
      const userTeamQuizDetails =
        await this.organizeService.getUserTeamQuizDetails(body);
      res.status(HttpStatus.OK).json(userTeamQuizDetails);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }
  @Post('generate-password')
  async generatePassword(@Body() body: any, @Res() res: any) {
    try {
      const { memberInfo } = body;
      const password = await this.organizeService.generatePassword(memberInfo);
      res.status(HttpStatus.OK).json(password);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

   @Post('confirm-team-password')
  async confirmTeamPassword(@Body() body: any, @Res() res: any) {
    try {
      const isMember = await this.organizeService.confirmTeamPassword(body);
      res.status(HttpStatus.OK).json(isMember);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }  
  }

  @Post('get-total-teams-in-quiz')
  async getTotalTeamsInQuiz(@Body() body:any,@Res() res:any){
    try{
        const totalTeams = await this.organizeService.getTotalTeamsInQuiz(body)
        res.status(HttpStatus.OK).json(totalTeams)
    }catch(err){
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);

    }
  }


  @Post('team-To-Play-Quiz')
  async teamToPlayQuiz (@Body() body:any,@Res() res:any){
    try{
        const teamToPlay = await this.organizeService.teamToPlayQuiz(body)
        res.status(HttpStatus.OK).json(teamToPlay)
    }catch(err){
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);

    }
  }

}
