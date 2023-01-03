import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Put,
  Res,
  UseFilters,
  Get,
  Param,
  Patch,
  HttpException,
} from '@nestjs/common';
import { FormExceptionFilter } from 'src/exceptions/FormExceptionFilter';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { UserModelDto } from './dto/user.dto';
import { OrganizationDto } from './dto/organization.dto';
import { userModel } from './models/user.model';
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
  async signup(@Res() res, @Body() body: userModel) {
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
    res.status(HttpStatus.OK).json(loggedUserDetails);
  }

  @Put('reset-user-passsword/:id')
  async resetUserPassword(@Res() res: any, @Body() body:any, @Param() param) {
    try {
      const {id:userId} = param
      const {password}= body
      const isUpdated = await this.authService.resetUserPassword(userId,password);
      res
        .status(HttpStatus.OK)
        .json({ message: 'Password Updated Successfully' });
    } catch (error: any) {
      res.status(HttpStatus.BAD_REQUEST).json({ message: error });
    }
  }

  @Post('get-user-quiz-details')
  async getUserQuizDetails(@Body() body: any, @Res() res: any) {
    const userQuizDetails = await this.authService.getUserQuizDetails(body);
    res.status(HttpStatus.OK).json(userQuizDetails);
  }

  @Get('get-organizations')
  async getOrganizations(@Res() res: any) {
    const organizations = await this.authService.getOrganizations();
    res.status(HttpStatus.OK).json(organizations);
  }

  @Post('assign-quizs')
  async assignQuizs(@Res() res, @Body() body: any) {
    try {
      await this.authService.assignQuizs(body);
      res
        .status(HttpStatus.CREATED)
        .json({ message: 'user created successfully' });
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('get-organization-users')
  async getOrganizationUsers(@Body() body: any, @Res() res: any) {
    try {
      const loggedUserDetails = await this.authService.getOrganizationUsers(
        body,
      );
      res.status(HttpStatus.OK).json(loggedUserDetails);
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).json(err.message);
    }
  }

  // @Post('register-organization')
  // async registerOrganization(@Res() res, @Body() body: OrganizationDto) {
  //   try {
  //     await this.authService.registerOrganization(body);
  //     res
  //       .status(HttpStatus.CREATED)
  //       .json({ message: 'user created successfully' });
  //   } catch (err) {
  //     res.status(HttpStatus.BAD_REQUEST).json(err.message);
  //   }
  // }

  @Post('delete-user')
  async deleteUser(@Body() body: any, @Res() res: any) {
    try {
      const userDeleted = await this.authService.deleteUser(body);
      res.status(HttpStatus.OK).json(userDeleted);
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).json(err.message);
    }
  }
  @Get('get-user-details/:id')
  async getUserDetails(@Param() userId,@Res() res){
    try{
      const userDetails = await this.authService.getUserDetails(userId)
      res.status(HttpStatus.OK).json(userDetails)
    }catch(err){
      res.status(HttpStatus.BAD_REQUEST).json(err.message);

    }
  }
  @Patch('edit-user-details')
  async editUserDetails(@Body() userModel:any,@Res() res){
    try{
    const editUser = await this.authService.editUserDetails(userModel)
    res.status(HttpStatus.OK).json({msg:'User updated'})

    }catch(err){
      res.status(HttpStatus.BAD_REQUEST).json(err.message);
    }

  }
}
