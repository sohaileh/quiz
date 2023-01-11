import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserModelDto } from './dto/user.dto';
import { JwtService } from '@nestjs/jwt';
import { OrganizationDto } from './dto/organization.dto';
import { Types } from 'mongoose';
import * as bcrypt from 'bcrypt';
import e, { response } from 'express';
import { ResultModelDto } from 'src/results/dto/result.dto';
import { HttpService } from '@nestjs/axios';
import { map, Observable } from 'rxjs';
import axios, { AxiosResponse } from "axios";
@Injectable()
export class AuthService {
  
  constructor(
    @InjectModel('Users') private readonly userModelDto: Model<UserModelDto>,
    @InjectModel('Organization')
    private readonly organizationModelDto: Model<OrganizationDto>,
    private readonly httpService:HttpService,
    private readonly jwtService: JwtService,
    @InjectModel('Results')
    private readonly resultModelDto: Model<ResultModelDto>,
  ) {}
  async oauthLogin(code: any, state: any, appId: string, appURL: string) {

    try{
     const response = await  axios.post(`${appURL}/exgsfsso/token`,{code,state,appId}) 
   const decode =  JSON.parse(Buffer.from(response.data.token_id.split('.')[1],'base64').toString())
     const accessToken = await this.jwtService.sign(decode)
     const tokens={gToken:response.data.token_id,accessToken:accessToken}
     return tokens
    }catch(err){
      throw new HttpException(err, HttpStatus.UNAUTHORIZED);

    }
  }
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

  async resetUserPassword(id, password) {
    try {
      const hashedPassword = await this.generateHashedPassword(password);
      await this.userModelDto.findOneAndUpdate(
        { _id: id },
        { $set: { password: hashedPassword } },
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
      if (userModel.role == 'Choose Role')
        throw new HttpException(
          'Choose a valid role for user',
          HttpStatus.BAD_REQUEST,
        );

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
      const loggedUserDetails = await this.userModelDto.find(
        { organizerId: users.organizerId },
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
      const organizerUsers = await this.userModelDto.find({organizerId:new Types.ObjectId(user.organizerId)})
      return organizerUsers
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

      delete userModel.password;
      const updateUser = await this.userModelDto.updateOne(
        { _id: userId },
        userModel,
      );
      return;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async getUserList(quiz: any) {
    try {
      const { quizId } = quiz;
      const userList = await this.userModelDto.aggregate([
        { $unwind: '$assignedQuizzes' },
        { $match: { 'assignedQuizzes.quizId': new Types.ObjectId(quizId) } },
        {
          $lookup: {
            from: 'results',
            let: { userID: '$_id' },

            pipeline: [
              {
                $project: {
                  results: {
                    $filter: {
                      input: '$results',
                      as: 'r',
                      cond: {
                        $and: [
                          { $eq: ['$userId', '$$userID'] },
                          { $eq: ['$$r.quizId', new Types.ObjectId(quizId)] },
                        ],
                      },
                    },
                  },
                },
              },

              { $project: { 'results.playedOn': 1, 'results.score': 1 } },
            ],

            as: 'assignedQuizzes.output',
          },
        },
      ]);
      return userList;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
  getClientId(){
    const gsfData={ClientId:process.env.ClientId}
    return gsfData
  }
}
