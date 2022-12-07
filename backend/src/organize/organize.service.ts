import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { OrganizeModelDto } from './dto/organize.dto';
import { UserModelDto } from 'src/auth/dto/user.dto';
import { Equals, equals } from 'class-validator';
@Injectable()
export class OrganizeService {
  public order=0;
  public teamIndex=0;
  constructor(
    @InjectModel('Organizes')
    private readonly organizeModel: Model<OrganizeModelDto>,
    @InjectModel('Users')
    private readonly userModel: Model<UserModelDto>,
  ) {}

  async registerTeams(teams) {
    try {
      teams.teamsDetail.forEach((team) => {
        team.password = Math.floor(100000 + Math.random() * 900000);
      });
      const quizOrganized = new this.organizeModel(teams);
      await quizOrganized.save();
      return;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async getUserTeamQuizDetails(userDetails: any) {
    try {
      const { userId } = userDetails;
      const user = await this.userModel.findOne({ _id: userId });
      if (!user)
        throw new HttpException('User not Found', HttpStatus.NOT_FOUND);

      const emailAddress = user.emailAddress;

      const teamQuizDetails = await this.organizeModel.find(
        {},
        {
          quizId: 1,
          organizerId: 1,
          createdAt: 1,
          teamsDetail: {
            $elemMatch: { members: { $in: [`${emailAddress}`] } },
          },
        },
      );

      teamQuizDetails.forEach((team) => {
        team.teamsDetail[0].password = '';
      });

      return teamQuizDetails;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async generatePassword(memberInfo) {
    try {
      const { userId, _id } = memberInfo;

      const user = await this.userModel.findOne({ _id: userId });

      if (!user)
        throw new HttpException('User not Found', HttpStatus.NOT_FOUND);

      const emailAddress = user.emailAddress;

      let teamQuizDetails: any = await this.organizeModel.findOne(
        { _id },
        {
          quizId: 1,
          organizerId: 1,
          createdAt: 1,
          teamsDetail: {
            $elemMatch: { members: { $in: [`${emailAddress}`] } },
          },
        },
      );

      return teamQuizDetails;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async confirmTeamPassword({
    quizOrganizedId,
    quizId,
    teamName,
    member,
    password,
    userId,
  }) {
    try {
      if (
        !quizOrganizedId ||
        !quizId ||
        !teamName ||
        !member ||
        !password ||
        !userId
      )
        throw new HttpException(
          'All fields are required',
          HttpStatus.NOT_FOUND,
        );
      const user = await this.userModel.findOne({ _id: userId });
      if (!user)
        throw new HttpException('User not Found', HttpStatus.NOT_FOUND);

      const { teamsDetail } = await this.organizeModel.findOne(
        { _id: quizOrganizedId, quizId: quizId },
        {
          _id: 0,
          teamsDetail: {
            $elemMatch: {
              teamName: `${teamName}`,
              members: { $in: [`${member}`] },
            },
          },
        },
      );

      if (teamsDetail.length == 0)
        throw new HttpException(
          'Seems you are not part of this Quiz',
          HttpStatus.BAD_REQUEST,
        );

      if (teamsDetail[0].attempted)
        throw new HttpException(
          'You have Already Attempted quiz',
          HttpStatus.BAD_REQUEST,
        );

      const updatedQuiz = await this.organizeModel.updateOne(
        {
          _id: quizOrganizedId,
          quizId: quizId,
          teamsDetail: {
            $elemMatch: {
              teamName: `${teamName}`,
              members: { $in: [`${member}`] },
            },
          },
        },
        { $set: { 'teamsDetail.$.attempted': true } },
      );

      if (password !== teamsDetail[0].password)
        throw new HttpException(
          'Seems you are not part of this Quiz',
          HttpStatus.BAD_REQUEST,
        );

      if (user.emailAddress !== member)
        throw new HttpException(
          'Join from your own account',
          HttpStatus.UNAUTHORIZED,
        );

      return true;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async getTotalTeamsInQuiz({ quizId, organizedQuizId, teamId }) {
    this.order++;
    const teams:any={}
    teams.teamId=teamId
     teams.order=this.order
     
    try {
      const { teamsParticipated,teamsDetail } = await this.organizeModel.findOneAndUpdate(
        {
          _id: organizedQuizId,
          quizId: quizId,
        },



         {$push:{
          teamsParticipated:teams
          // {
          //   "teamId":teamId,
          //  "order":this.order
            
          // }
          }
        }
        
      
    
    

        
      //   {
      //     teamsParticipated: { $nin :[teamId] },
        
      //  $push: { teamsParticipated:teamId } ,
            
        
      //   },
      
      );
    
      
      return teamsDetail.length
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }


  

  async  teamToPlayQuiz(teamData:any)
  {
    const {organizedQuizId,quizId}=teamData

    try{
      const team=await this.organizeModel.findOne({teamData})

const teamDetail=team.teamsParticipated
return teamDetail


 

    }


    
    catch(err)
    {
        throw new HttpException(err,HttpStatus.BAD_REQUEST)
    }
  
  }
}
