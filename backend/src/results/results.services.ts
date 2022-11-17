import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ResultModelDto } from './dto/result.dto';
import { UserModelDto } from 'src/auth/dto/user.dto';
@Injectable()
export class ResultService {
  constructor(
    @InjectModel('Results') private readonly resultModel: Model<ResultModelDto>,
  ) {}

  async getUseresults(user: any) {
    const userId: any = new Types.ObjectId(user.userId);
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
          'results.output.eventName': 1,
          'results.output.organizationName': 1,
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
}
