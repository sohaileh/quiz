import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserModelDto } from './dto/user.dto';
import { JwtService } from '@nestjs/jwt';
import { OrganizationDto } from './dto/organization.dto';
import { Types } from 'mongoose';
import * as bcrypt from 'bcrypt';
import e from 'express';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('Users') private readonly userModelDto: Model<UserModelDto>,
    @InjectModel('Organization')
    private readonly organizationModelDto: Model<OrganizationDto>,
    private readonly jwtService: JwtService,
  ) {}
  async generateHashedPassword(password) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }
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

  async signUp(userModel: any) {
    try {
      const { emailAddress } = userModel;
      const userExists = await this.userModelDto.exists({
        emailAddress: emailAddress,
      });
      if (userExists)
        throw new HttpException('User Exists', HttpStatus.BAD_REQUEST);

      const password = userModel.password;
      userModel.password = await this.generateHashedPassword(password);

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
      { password: 0, assignedQuizzes: 0, quizzesPlayed: 0 },
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

  async registerOrganization(organizationModel: OrganizationDto) {
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

  async assignQuizs(userModel: any) {
    try {
      if(userModel.role=='Choose Role')
      throw new HttpException('Choose a valid role for user', HttpStatus.BAD_REQUEST);
      
      const { emailAddress } = userModel;
      const userExists = await this.userModelDto.exists({
        emailAddress: emailAddress,
      });
      
      if(userExists)
      throw new HttpException('User Exists', HttpStatus.BAD_REQUEST);
     
        const password = userModel.password;
        userModel.password = await this.generateHashedPassword(password);

        const newUser = new this.userModelDto(userModel);
        newUser.save();
        return newUser;
    
      // } else {
      //   const quizAssigned = await this.userModelDto.updateOne(
      //     { emailAddress: emailAddress },
      //     { $set: { assignedQuizzes: userModel.assignedQuizzes } },
      //   );
      //   return;
      // }
   
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async getOrganizationUsers(users: any) {
    try {
      const loggedUserDetails = this.userModelDto.find(
        { organizationId: users.organizationId },
        { password: 0 },
      );
      return loggedUserDetails;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async deleteUser(user: any) {
    try {
      const userDeleted = await this.userModelDto.deleteOne({ _id: user._id });
      return userDeleted;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
  async getUserDetails(userId) {
    try {
      const { id } = userId;
      const userDetails = await this.userModelDto.findOne(
        { _id: id },
        { password: 0, organizationId: 0 },
      );
      return userDetails;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
  async editUserDetails(userModel: any) {
    try {
      const { userId } = userModel;

      delete userModel.password
      const updateUser = await this.userModelDto.updateOne(
        { _id: userId,role:'student'},
        userModel,
      );
      return;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
}
