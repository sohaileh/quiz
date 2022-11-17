import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { ResultService } from './results.services';
@Controller('result')
export class ResultController {
  constructor(private resultService: ResultService) {}
  @Post('get-user-results')
  async getUseresults(@Body() body: any, @Res() res) {
    const userResults = await this.resultService.getUseresults(body);
    res.status(HttpStatus.OK).json(userResults);
  }

  @Post('get-user-result')
  async getUserResult(@Body() body: any, @Res() res: any) {
    const result = await this.resultService.getUserResult(body);
    res.status(200).json(result);
  }
}
