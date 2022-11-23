import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Put,
  Res,
  UseFilters,
  Get,
} from '@nestjs/common';
import { FormExceptionFilter } from 'src/exceptions/FormExceptionFilter';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { UserModelDto } from './dto/user.dto';

@UseFilters(FormExceptionFilter)
@Controller('auth')
export class AuthController {
  
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  async login(@Body() body: AuthDto, @Res() res: any) {
    try {
      const user = await this.authService.login(body);
      res.status(HttpStatus.OK).json(user);
    } catch (err: any) {
      res.status(HttpStatus.UNAUTHORIZED).json(err);
    }
  }

  @Post('sign-up')
  async signup(@Res() res, @Body() body: UserModelDto) {
    try {
      await this.authService.signUp(body);
      res
        .status(HttpStatus.CREATED)
        .json({ message: 'user created successfully' });
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).json(err.message);
    }
  }

  @Post('getLoggedUser')
  async getLoggedUser(@Res() res, @Body() body: any) {
    const loggedUserDetails = await this.authService.getLoggedUser(body);
    res.status(HttpStatus.OK).json({ loggedUserDetails: loggedUserDetails });
  }

  @Put('update')
  async update(@Res() res: any, @Body() body: any) {
    try {
      const isUpdated = await this.authService.update(body);
      res
        .status(HttpStatus.OK)
        .json({ message: 'Password Updated Successfully' });
    } catch (error: any) {
      res.status(HttpStatus.BAD_REQUEST).json({ message: error });
    }
  }

  @Post('get-user-quiz-details')
  async getUerQuizDetails(@Body() body: any, @Res() res: any) {
    const userQuizDetails = await this.authService.getUerQuizDetails(body);
    res.status(HttpStatus.OK).json(userQuizDetails);
  }

  @Get('get-organizations')
  async getOrganizations(@Res() res: any) {
    const organizations = await this.authService.getOrganizations();
    res.status(HttpStatus.OK).json(organizations);
  }
}
