import {
  HttpException,
  HttpStatus,
  Injectable,
  Res,
  StreamableFile,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { QuizModelDto } from './dto/quiz.dto';
import { quizModel } from './models/quiz.model';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from 'src/firebase/firebaseApp';
import { UserModelDto } from 'src/auth/dto/user.dto';
import { Type } from 'class-transformer';
import { ResultModelDto } from 'src/results/dto/result.dto';
import { OrganizeModelDto } from 'src/organize/dto/organize.dto';

@Injectable()
export class QuizService {
  totalTeamsEnteredQuiz: any = 0;
  certificateGenerated: any = {};
  qIndex:number=0;
  // questionNumber:number=0;
  constructor(
    @InjectModel('Quizs') private readonly quizModel: Model<QuizModelDto>,
    @InjectModel('Users') private readonly userModel: Model<UserModelDto>,
    @InjectModel('Results') private readonly resultModel: Model<ResultModelDto>,
    @InjectModel('Organizes')
    private readonly organizeModel: Model<OrganizeModelDto>,
  ) { }

  async submitInfo(quiz: any) {
    try {
      const createdQuiz = await new this.quizModel(quiz);
      const newQuiz = createdQuiz.save();
      return newQuiz;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async attemptQuiz(quizData: any) {
    try {
      const { questionNo, quizId, userId } = quizData;
      let quizPlayed = { quizId: quizId };
      const questionNumber: number = questionNo;
      let question = await this.quizModel.findOne(
        { _id: quizId },
        { questionBank: { $slice: [questionNumber, 1] }, _id: 0 },
      );
      question.questionBank[0].correctAnswer = null;
      if (questionNo == 0)
        await this.userModel.updateOne(
          { _id: new Types.ObjectId(userId) },
          { $push: { quizzesPlayed: quizPlayed } },
        );
      return question;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
 }



 

  async getOrganizationQuizzes(organizationData:any) {
    try {
      const {userId}=organizationData;
      const quizzes = await this.quizModel.find({organizationId:userId}, { questionBank: 0 });
      return quizzes;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async getQuizTime(quizData: any) {
    try {
      const { quizId } = quizData;
      const quizTime = this.quizModel.find(
        { _id: quizId },
        { _id: 0, totalTime: 1 },
      );
      return quizTime;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async uploadFile(questionBank: any, file: any, quizId: any) {
    try {
      const { type } = questionBank;
      if (type == 'face-recognition' || type == 'video' || type == 'audio') {
        const mediaStorage = ref(
          storage,
          `${new Types.ObjectId(quizId)}/${file.originalname}`,
        );
        const bytes = new Uint8Array(file.buffer);
        await uploadBytes(mediaStorage, bytes);

        const fileUrl = await getDownloadURL(ref(mediaStorage));

        questionBank.fileUrl = fileUrl;
        await this.quizModel.updateOne(
          { _id: new Types.ObjectId(quizId) },
          { $push: { questionBank: questionBank } },
        );
        return;
      }
      await this.quizModel.updateOne(
        { _id: new Types.ObjectId(quizId) },
        { $push: { questionBank: questionBank } },
      );

      return;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async generateCertificate(certificateDetails) {
    try {
      const { userId, quizId } = certificateDetails;
      const userdetails = await this.userModel.find(
        { _id: new Types.ObjectId(userId) },
        { firstName: 1, lastName: 1, _id: 0 },
      );
      const quizDetails = await this.quizModel.find(
        { _id: new Types.ObjectId(quizId) },
        { eventName: 1, _id: 0, organizationName: 1 },
      );
      const result = await this.resultModel.find(
        { userId: new Types.ObjectId(userId) },
        {
          _id: 0,
          results: { $elemMatch: { quizId: new Types.ObjectId(quizId) } },
        },
      );

      this.certificateGenerated.userDetails = userdetails;
      this.certificateGenerated.quizDetails = quizDetails;
      this.certificateGenerated.playedOn = result[0].results[0].playedOn;

      return this.certificateGenerated;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async checkIfPlayed(user: any) {
    try {
      // console.log('user',user)
      const hasPlayed = await this.userModel.exists({
        _id: user.userId,
        'quizzesPlayed.quizId': new Types.ObjectId(user.quizId),
      });

      return hasPlayed;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async getOrganizationUsers(organizerId) {
    try {
      const organizer = await this.userModel.findOne({
        _id: organizerId,
        role: { $in: ['organizer', 'admin'] },
      });

      if (!organizer)
        throw new HttpException(
          'User is not present or cannot organize Quiz',
          HttpStatus.BAD_REQUEST,
        );

      const { organization } = organizer;

      const organizationUsersEmails = await this.userModel.find(
        { organization, role: 'user' },
        { emailAddress: 1, _id: 0 },
      );

      return organizationUsersEmails;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async enterQuiz(organizedQuizDetails) {
    try {
      const { teamId, quizId, organizedQuizId } = organizedQuizDetails;
      const { teamsParticipated } = await this.organizeModel.findOne(
        { _id: organizedQuizId },

      );
      return teamsParticipated.length;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }



  async getQuestionForTeams(quizData: any) {
    
    try {
  let  { questionNo, quizId, userId } = quizData;
      let quizPlayed = { quizId: quizId };
        
       const  question = await this.quizModel.findOne(
          { _id: quizId},{questionBank:{$elemMatch:{attempted:false},},totalTime:1,eventName:1,organizationName:1,_id:0},
        );
        if (questionNo == 0)
        {

        await this.userModel.updateOne(
          { _id: new Types.ObjectId(userId) },
          { $push: { quizzesPlayed: quizPlayed } },
        );
        }

        question.questionBank[0].correctAnswer = null;
        const{_id}=question.questionBank[0]._id;
        const questionId=_id
       const updatedquestion= await this.quizModel.findOneAndUpdate({_id:quizId,questionBank:{$elemMatch:{_id:new Types.ObjectId(questionId)},},},{$set:{"questionBank.$.attempted":true},},);

        return question;


      }
        
      
     
     catch (err) {

      throw new HttpException(err, HttpStatus.BAD_REQUEST);
        }


        



  }





  async createQuizTitle(quiz: any) {
    try {
      const createdQuizTitle = await new this.quizModel(quiz);
      const title = createdQuizTitle.save();
      return title;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }



  async deleteQuiz(quiz: any) {
    try {
      const updatedquiz = await  this.quizModel.deleteOne({_id:quiz._id},)
      return updatedquiz;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }


  async renameQuizTitle(quiz: any) {
    try {
      const{quizTitle}=quiz;
      const renameQuiz = await  this.quizModel.findOneAndUpdate({_id:quiz.quizId},{$set:{quizTitle:quizTitle}})
      return renameQuiz;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
















}
