import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserModelDto } from './dto/user.dto';
import { JwtService } from '@nestjs/jwt';
import { OrganizationDto } from './dto/organization.dto';
import { Types } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('Users') private readonly userModelDto: Model<UserModelDto>,
    @InjectModel('Organization') private readonly organizationModelDto:Model<OrganizationDto>,
    private readonly jwtService: JwtService,
  ) {}

  async login(authModel) {
    try {
      let payload;
      const { emailAddress, password } = authModel;
      const query = { emailAddress: emailAddress };

      const user = await this.userModelDto.findOne(query);

      if (user) {
        const userName = user.firstName + ' ' + user.lastName;
        payload = { userName: userName, sub: user._id, role: user.role };
      } else {
        throw new HttpException(
          'Incorrect Credentials',
          HttpStatus.UNAUTHORIZED,
        );
      }
      const passwordMatched = await bcrypt.compare(password, user.password);
      if (!passwordMatched)
        throw new HttpException(
          'Incorrect Credentials',
          HttpStatus.UNAUTHORIZED,
        );

      user.password = '';
      return {
        accessToken: this.jwtService.sign(payload),
        expiresIn: '100000',
        user,
      };
    } catch (err) {
      throw new HttpException(err, HttpStatus.UNAUTHORIZED);
    }
  }

  async signUp(userModel: UserModelDto) {
    try {
      const { emailAddress } = userModel;
      const userExists = await this.userModelDto.exists({
        emailAddress: emailAddress,
      });
      if (userExists)
        throw new HttpException('User Exists', HttpStatus.BAD_REQUEST);

      const salt = await bcrypt.genSalt();
      const password = userModel.password;
      const hashedPassword = await bcrypt.hash(password, salt);
      userModel.password = hashedPassword;

      const newUser = new this.userModelDto(userModel);
      newUser.save();
      return newUser;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async getLoggedUser(user: any) {
    const loggedUserDetails = await this.userModelDto.findOne(
      { _id: user.id },
      { password: 0, _id: 0 },
    );
    return loggedUserDetails;
  }

  async update(user: any) {
    try {
      console.log('user update', user);
      const isUpdatedUser = await this.userModelDto.findOneAndUpdate(
        { _id: user.id },
        { $set: { password: user.password } },
      );

      return;
    } catch (error: any) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async getUserQuizDetails(user) {
    const { userId } = user;

    const userQuizDetails = await this.userModelDto.aggregate([]);

    return userQuizDetails;
  }

  async getOrganizations() {
    const organizations = await this.userModelDto.aggregate([
      { $group: { _id: '$organization' } },
    ]);
    return organizations;
  }


  async registerOrganization(organizationModel:OrganizationDto) {
    try {
      const { emailAddress } = organizationModel;
      const userExists = await this.organizationModelDto.exists({
        emailAddress: emailAddress,
      });
      if (userExists)
        throw new HttpException('User Exists', HttpStatus.BAD_REQUEST);

      const newUser = new this.organizationModelDto(organizationModel);
      newUser.save();
      return newUser;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }





}
