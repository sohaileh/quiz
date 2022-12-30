import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ResponseModelDto } from './dto/response.dto';
import { QuizModelDto } from 'src/quiz/dto/quiz.dto';
import { UserModelDto } from 'src/auth/dto/user.dto';
import { ResultModelDto } from 'src/results/dto/result.dto';

@Injectable()
export class ResponseService {
  resultOfUser: any = {};
  results: any = {};

  constructor(
    @InjectModel('Responses')
    private readonly responseModel: Model<ResponseModelDto>,
    @InjectModel('Quizs') private readonly quizModel: Model<QuizModelDto>,
    @InjectModel('Users') private readonly userModel: Model<UserModelDto>,
    @InjectModel('Results') private readonly resultModel: Model<ResultModelDto>,
  ) {}

  async saveResponse(response: any) {
    try {
      let totalCorrectAnswers = 0;
      let marksObtained = 0;
      let totalMarks = 0;
      let totalQuestions = 0;
      const saveResponse = await new this.responseModel(response);
      await saveResponse.save();

      const quizId: any = new Types.ObjectId(response.quizId);
      const questionId: any = new Types.ObjectId(response.responses.questionId);

      const result = await this.responseModel.aggregate([
        { $match: { quizId: quizId, userId: response.userId } },
        { $unwind: '$responses' },
        {
          $lookup: {
            from: 'quizs',
            let: { questionId: '$responses.questionId' },
            pipeline: [
              { $match: { _id: quizId } },
              {
                $project: {
                  questionBank: {
                    $filter: {
                      input: '$questionBank',
                      as: 'questions',
                      cond: { $eq: ['$$questions._id', '$$questionId'] },
                    },
                  },
                  _id: 0,
                },
              },
              {
                $project: {
                  'questionBank.correctAnswer': 1,
                  _id: 0,
                  'questionBank.marks': 1,
                },
              },
            ],
            as: 'responses.output',
          },
        },
      ]);

      result.forEach((element) => {
        if (
          element.responses.response ==
          element.responses.output[0].questionBank[0].correctAnswer
        ) {
          marksObtained += element.responses.output[0].questionBank[0].marks;
          totalMarks += element.responses.output[0].questionBank[0].marks;
          totalQuestions++;
          totalCorrectAnswers++;
        } else {
          totalQuestions++;
          totalMarks += element.responses.output[0].questionBank[0].marks;
        }
      });

      this.resultOfUser.userId = response.userId;
      this.results.quizId = response.quizId;
      this.results.totalCorrectAnswers = totalCorrectAnswers;
      this.results.score = marksObtained;
      this.results.totalMarks = totalMarks;
      this.results.totalQuestions = totalQuestions;
      this.resultOfUser.results = this.results;

      const userExits = await this.resultModel.findOne({
        userId: response.userId,
      });
      console.log('userExists', userExits);

      if (!userExits) {
        const userResult = await new this.resultModel(this.resultOfUser);
        await userResult.save();
      } else {
        const updateUser = await this.resultModel.updateOne(
          { userId: response.userId },
          { $push: { results: this.results } },
        );
      }

      return;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async submitStudentResponse(finalResponse){
    try{
      let totalCorrectAnswers = 0;
      let pointsObtained = 0;
      let totalPoints = 0;
      let totalQuestions = 0;
         const response = await  new this.responseModel(finalResponse)
              await response.save()
              
              const quizId = new Types.ObjectId(finalResponse.quizId)
              const userId = new Types.ObjectId(finalResponse.userId)
        const result = await this.responseModel.aggregate([
          { $match: { quizId: quizId, userId: userId } },
          { $unwind: '$response' },
          {
            $lookup: {
              from: 'quizs',
              let: { questionId: '$response.questionId' },
              pipeline: [
                { $match: { _id: quizId } },
                {
                  $project: {
                    questionBank: {
                      $filter: {
                        input: '$questionBank',
                        as: 'questions',
                        cond: { $eq: ['$$questions._id', '$$questionId'] },
                      },
                    },
                    _id: 0,
                  },
                },
                {
                  $project: {
                    'questionBank.correctAnswer': 1,
                    _id: 0,
                    'questionBank.points': 1,
                  },
                },
              ],
              as: 'response.output',
            },
          },
        ]);
        result.forEach((element) => {
          if (
            element.response.answer ==
            element.response.output[0].questionBank[0].correctAnswer
          ) {
            pointsObtained += element.response.output[0].questionBank[0].points;
            totalPoints += element.response.output[0].questionBank[0].points;
            totalQuestions++;
            totalCorrectAnswers++;
          } else {
            totalQuestions++;
            totalPoints += element.response.output[0].questionBank[0].points;
          }
        });
  
        this.resultOfUser.userId = finalResponse.userId;
        this.results.quizId = response.quizId;
        this.results.totalCorrectAnswers = totalCorrectAnswers;
        this.results.score = pointsObtained;
        this.results.totalPoints = totalPoints;
        this.results.totalQuestions = totalQuestions;
        this.resultOfUser.results = this.results;

        const userExits = await this.resultModel.findOne({
          userId: userId,
        });
  
        if (!userExits) {
          const userResult = await new this.resultModel(this.resultOfUser);
          await userResult.save();
        } else {
          const updateUser = await this.resultModel.updateOne(
            { userId: userId },
            { $push: { results: this.results } },
          );
        }
  
        return;
    }catch(err){
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
  async getUserQuizResponse(params){
    try{
      const {quizId,userId}= params
        const response  = await this.responseModel.findOne({quizId:quizId,userId:userId})

      return response
    }catch(err){
      throw new HttpException(err, HttpStatus.BAD_REQUEST);

    }
  }
}
