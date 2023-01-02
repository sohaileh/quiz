import { Controller, Post, Body, Res, HttpStatus, UseGuards, Get, Param } from '@nestjs/common';
import { Roles } from 'src/auth/authorization/decorator/roles.decorator';
import { RolesGuard } from 'src/auth/authorization/guard/roles.guard';
import { JwtAuthGuard } from 'src/auth/gaurds/auth.gaurd';
import { ResultService } from './results.services';
@Controller('result')
export class ResultController {
  constructor(private resultService: ResultService) {}

  // @UseGuards(JwtAuthGuard,RolesGuard)
  // @Roles('user')
  @Get('get-user-results/:id')
  async getUseresults(@Body() body: any, @Res() res,@Param() param) {
    const userResults = await this.resultService.getUseresults(param);
    res.status(HttpStatus.OK).json(userResults);
  }

  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles('user')
  @Post('get-user-result')
  async getUserResult(@Body() body: any, @Res() res: any) {
    const result = await this.resultService.getUserResult(body);
    res.status(200).json(result);
  }
}
