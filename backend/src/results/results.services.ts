import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ResultModelDto } from './dto/result.dto';
import { UserModelDto } from 'src/auth/dto/user.dto';
import { ResponseModelDto } from 'src/response/dto/response.dto'; 
import { QuizModelDto } from 'src/quiz/dto/quiz.dto';

@Injectable()
export class ResultService {
  constructor(
    @InjectModel('Results') private readonly resultModel: Model<ResultModelDto>,
    @InjectModel('Quizs') private readonly quizModel: Model<QuizModelDto>,
  ) {}

  async getUseresults(param: any) {
const {id}= param
    const userId: any = new Types.ObjectId(id); 
    const userResults = await this.resultModel.aggregate([
      { $match: { userId: userId } },
      { $unwind: '$results' },
      {
        $lookup: {
          from: 'quizs',
          localField: 'results.quizId',
          foreignField: '_id',
          as: 'results.output',
        },
      },
      {
        $project: {
          'results.score': 1,
          'results.output.quizTitle': 1,
          'results.playedOn': 1,
          _id: 0,
          'results.output._id': 1,
        },
      },
    ]);

    return userResults;
  }

  async getUserResult(quizInfo: any) {
    const { userId, quizId } = quizInfo;
    const result = await this.resultModel.find(
      { userId: new Types.ObjectId(userId) },
      {
        _id: 0,
        results: { $elemMatch: { quizId: new Types.ObjectId(quizId) } },
      },
    );
    return result;
  }
  async getUserQuizResult(userDetails){
    try{
      const {userId,quizId}= userDetails
      const userResultDetails = await this.resultModel.findOne({userId:userId},{results:{$elemMatch:{quizId:quizId}}})
        const {quizTitle} = await this.quizModel.findOne({_id:quizId})
      const result={userResultDetails:userResultDetails,quizTitle:quizTitle}
      return result
    }catch(err){
    throw new HttpException(err.message, HttpStatus.BAD_REQUEST);

    }
  }
}
