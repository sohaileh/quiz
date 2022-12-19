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
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from 'firebase/storage';
import { storage } from 'src/firebase/firebaseApp';
import { UserModelDto } from 'src/auth/dto/user.dto';
import { Type } from 'class-transformer';
import { ResultModelDto } from 'src/results/dto/result.dto';
import { OrganizeModelDto } from 'src/organize/dto/organize.dto';

@Injectable()
export class QuizService {
  totalTeamsEnteredQuiz: any = 0;
  certificateGenerated: any = {};
  totalQuestion = [];
  constructor(
    @InjectModel('Quizs') private readonly quizModel: Model<QuizModelDto>,
    @InjectModel('Users') private readonly userModel: Model<UserModelDto>,
    @InjectModel('Results') private readonly resultModel: Model<ResultModelDto>,
    @InjectModel('Organizes')
    private readonly organizeModel: Model<OrganizeModelDto>,
  ) {}

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

  async getQuizzes() {
    try {
      const quizzes = await this.quizModel.find({}, { questionBank: 0 });
      return quizzes;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async getOrganizationQuizzes(organizationData: any) {
    try {
      const { userId } = organizationData;
      const quizzes = await this.quizModel.find(
        { organizationId: userId },
        { questionBank: 0 },
      );
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

  async uploadFiletoFirebase(mediaStorage, file) {
    const bytes = new Uint8Array(file.buffer);
    await uploadBytes(mediaStorage, bytes)
      .then(() => console.log('file uploaded successfully'))
      .catch(() => {
        console.error('File not uploaded');
      });

    return;
  }

  async deleteFileFromFirebase(mediaStorage) {
    deleteObject(mediaStorage)
      .then(() => {
        console.log('file deleted successfully');
      })
      .catch((error) => {
        console.log(error);
      });

    return;
  }

  async addQuestionToQuiz(questionBank: any, file: any, quizId: any) {
    try {
      if (
        !(
          questionBank.type &&
          questionBank.marks !== 'null' &&
          questionBank.timeLimit !== 'null' &&
          questionBank.question &&
          questionBank.correctAnswer !== 'undefined' &&
          questionBank.correctAnswer !== ''
        )
      )
        throw new HttpException(
          'Please Fill all fields',
          HttpStatus.BAD_REQUEST,
        );

      if (questionBank.options.length == 1)
        throw new HttpException(
          'Atleast Two Options are required',
          HttpStatus.BAD_REQUEST,
        );

      let options = [];
      questionBank.options.forEach((option) => {
        options.push(option.option);
      });
      let uniqueOptions = new Set(options);
      if (uniqueOptions.size < options.length)
        throw new HttpException(
          'Options cannot be same',
          HttpStatus.BAD_REQUEST,
        );
      if (!quizId)
        throw new HttpException(
          'Something went wrong Please try later',
          HttpStatus.BAD_REQUEST,
        );

      const { type } = questionBank;
      if (type == 'Choose Question Type')
        throw new HttpException(
          'Fill Valid question Type',
          HttpStatus.BAD_REQUEST,
        );
      if (type == 'face-recognition' || type == 'video' || type == 'audio') {
        const mediaStorage = ref(
          storage,
          `${new Types.ObjectId(quizId)}/${file.originalname}`,
        );
        await this.uploadFiletoFirebase(mediaStorage, file);

        const fileUrl = await getDownloadURL(ref(mediaStorage));
        questionBank.fileUrl = fileUrl;
        questionBank.fileName = file.originalname;
        await this.quizModel.updateOne(
          { _id: new Types.ObjectId(quizId) },
          
          {
            $push:{questionBank:questionBank},
            $inc:{'totalQuestions':1}
          }
        
        );
        const questions = await this.quizModel.findOne(
          { _id: new Types.ObjectId(quizId) },
          { questionBank: 1, status: 1, quizTitle: 1 },
        );
        return questions;
      }
      await this.quizModel.updateOne(
        { _id: new Types.ObjectId(quizId) },
        {
          $push:{questionBank:questionBank},
          $inc:{'totalQuestions':1}
        }
       

      );
      const questions = await this.quizModel.findOne(
        { _id: new Types.ObjectId(quizId) },
        { questionBank: 1, status: 1, quizTitle: 1 },
      );

      return questions;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async getQuestionForTeams(quizData: any) {
    try {
      let { questionNo, quizId, userId } = quizData;
      let quizPlayed = { quizId: quizId };

      const question = await this.quizModel.findOne(
        { _id: quizId },
        {
          questionBank: { $elemMatch: { attempted: false } },
          totalTime: 1,
          eventName: 1,
          organizationName: 1,
          _id: 0,
        },
      );
      if (questionNo == 0) {
        await this.userModel.updateOne(
          { _id: new Types.ObjectId(userId) },
          { $push: { quizzesPlayed: quizPlayed } },
        );
      }

      question.questionBank[0].correctAnswer = null;
      const { _id } = question.questionBank[0]._id;
      const questionId = _id;
      const updatedquestion = await this.quizModel.findOneAndUpdate(
        {
          _id: quizId,
          questionBank: { $elemMatch: { _id: new Types.ObjectId(questionId) } },
        },
        { $set: { 'questionBank.$.attempted': true } },
      );

      return question;
    } catch (err) {
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
      const updatedquiz = await this.quizModel.deleteOne({ _id: quiz._id });
      return updatedquiz;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async renameQuizTitle(quiz: any) {
    try {
      const { quizTitle } = quiz;
      const renameQuiz = await this.quizModel.findOneAndUpdate(
        { _id: quiz.quizId },
        { $set: { quizTitle: quizTitle } },
      );
      return renameQuiz;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async editQuestion(body, params, file) {
    try {
      const { type } = body;
      const { quizId, questionId } = params;
      if (
        !(
          body.type &&
          body.marks !== 'null' &&
          body.timeLimit !== 'null' &&
          body.question &&
          body.correctAnswer !== 'undefined' &&
          body.correctAnswer !== ''
        )
      )
        throw new HttpException(
          'Please Fill all fields',
          HttpStatus.BAD_REQUEST,
        );

      if (body.options.length == 1)
        throw new HttpException(
          'Atleast Two Options are required',
          HttpStatus.BAD_REQUEST,
        );

      let options = [];
      body.options.forEach((option) => {
        options.push(option.option);
      });
      let uniqueOptions = new Set(options);

      if (uniqueOptions.size < options.length)
        throw new HttpException(
          'Options cannot be same',
          HttpStatus.BAD_REQUEST,
        );

      if (!quizId)
        throw new HttpException(
          'Something went wrong Please try later',
          HttpStatus.BAD_REQUEST,
        );

      if (type == 'face-recognition' || type == 'video' || type == 'audio') {
        // if question is of media type and want file updation as well
        if (file) {
          const question = await this.quizModel.find(
            { _id: new Types.ObjectId(quizId) },
            {
              questionBank: {
                $elemMatch: { _id: new Types.ObjectId(questionId) },
              },
            },
          );
          const fileName = question[0].questionBank[0].fileName;
          // editing face-recognition/audio/video --> any similar types
          if (fileName) {
            const mediaStorage = ref(
              storage,
              `${new Types.ObjectId(quizId)}/${fileName}`,
            );

            await this.deleteFileFromFirebase(mediaStorage);
          }

          const uploadFileRef = ref(
            storage,
            `${new Types.ObjectId(quizId)}/${file.originalname}`,
          );
          await this.uploadFiletoFirebase(uploadFileRef, file);

          const fileUrl = await getDownloadURL(ref(uploadFileRef));

          body.fileUrl = fileUrl;
          body.fileName = file.originalname;

          const updatedQuestion = await this.quizModel.updateOne(
            {
              _id: new Types.ObjectId(quizId),
              'questionBank._id': new Types.ObjectId(questionId),
            },
            {
              $set: { 'questionBank.$': body },
            },
          );

          const quizQuestions = await this.quizModel.findOne(
            { _id: quizId },
            { questionBank: 1, status: 1, quizTitle: 1 },
          );

          return quizQuestions;
        } else {
          //if mcq to face-recognition/video/audio but file not uploaded
          const question = await this.quizModel.find(
            { _id: new Types.ObjectId(quizId) },
            {
              questionBank: {
                $elemMatch: { _id: new Types.ObjectId(questionId) },
              },
            },
          );
          if (!question[0].questionBank[0].fileName)
            throw new HttpException(
              'Please upload file',
              HttpStatus.BAD_REQUEST,
            );

          // file type audio/video/face-recognition,dont want to update file but other info about question
          await this.quizModel.updateOne(
            {
              _id: new Types.ObjectId(quizId),
              'questionBank._id': new Types.ObjectId(questionId),
            },
            {
              $set: {
                'questionBank.$.question': body.question,
                'questionBank.$.type': body.type,
                'questionBank.$.timeLimit': body.timeLimit,
                'questionBank.$.options': body.options,
                'questionBank.$.marks': body.marks,
                'questionBank.$.correctAnswer': body.correctAnswer,
              },
            },
          );
        }

        const quizQuestions = await this.quizModel.findOne(
          { _id: quizId },
          { questionBank: 1, status: 1, quizTitle: 1 },
        );

        return quizQuestions;
      }

      // file type to mcq delete file on firebase first

      const question = await this.quizModel.find(
        { _id: new Types.ObjectId(quizId) },
        {
          questionBank: {
            $elemMatch: { _id: new Types.ObjectId(questionId) },
          },
        },
      );

      if (question[0].questionBank[0].fileName) {
        const fileName = question[0].questionBank[0].fileName;

        const mediaStorage = ref(
          storage,
          `${new Types.ObjectId(quizId)}/${fileName}`,
        );

        await this.deleteFileFromFirebase(mediaStorage);
      }
      // update mcq
      await this.quizModel.updateOne(
        {
          _id: new Types.ObjectId(quizId),
          'questionBank._id': new Types.ObjectId(questionId),
        },
        {
          $set: {
            'questionBank.$.question': body.question,
            'questionBank.$.type': body.type,
            'questionBank.$.timeLimit': body.timeLimit,
            'questionBank.$.options': body.options,
            'questionBank.$.marks': body.marks,
            'questionBank.$.correctAnswer': body.correctAnswer,
          },
        },
      );
      const quizQuestions = await this.quizModel.findOne(
        { _id: quizId },
        { questionBank: 1, status: 1, quizTitle: 1 },
      );

      return quizQuestions;
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

  async getOrganizationUsers(organizationDetails) {
    try {
      if (organizationDetails.organizationName) {
        const organizationUsersEmails = await this.userModel.find(
          { organization: organizationDetails.organizationName, role: 'user' },
          { emailAddress: 1, _id: 0 },
        );
        return organizationUsersEmails;
      }
      const organizer = await this.userModel.findOne({
        _id: organizationDetails.organizerId,
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
      const { teamsParticipated } = await this.organizeModel.findOne({
        _id: organizedQuizId,
      });
      return teamsParticipated.length;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async QuizzesPlayedByUser(user: any) {
    try {
      const { userId } = user;
      const { quizzesPlayed } = await this.userModel.findOne(
        { _id: userId },
        { 'quizzesPlayed.quizId': 1, _id: 0 },
      );

      return quizzesPlayed;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async deleteQuestion(question, quizId) {
    try {
      if (!(question._id && quizId))
        throw new HttpException(
          'Please Fill all fields',
          HttpStatus.BAD_REQUEST,
        );
      const { type, _id: questionId } = question;
      if (type == 'face-recognition' || type == 'video' || type == 'audio') {
        const question = await this.quizModel.find(
          { _id: new Types.ObjectId(quizId) },
          {
            questionBank: {
              $elemMatch: { _id: new Types.ObjectId(questionId) },
            },
          },
        );
        const fileName = question[0].questionBank[0].fileName;

        const mediaStorage = ref(
          storage,
          `${new Types.ObjectId(quizId)}/${fileName}`,
        );

        await this.deleteFileFromFirebase(mediaStorage);
      }

      const deletedQuestion = await this.quizModel.updateOne(
        { _id: new Types.ObjectId(quizId) },
        {
           $pull: { questionBank: { _id: new Types.ObjectId(question._id) } },
          $inc:{'totalQuestions':-1}
      },
      );
      const updatedQuiz = await this.quizModel.findOne(
        {
          _id: new Types.ObjectId(quizId),
        },
        { questionBank: 1, status: 1, quizTitle: 1 },
      );

      return updatedQuiz;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async getQuizQuestions(quizId: any, questionNumber: any) {
    try {
      if (questionNumber == 'undefined') {
        const quizQuestions = await this.quizModel.findOne(
          { _id: new Types.ObjectId(quizId) },
          { questionBank: 1, status: 1, quizTitle: 1 },
        );
        return quizQuestions;
      }
      if (questionNumber == 0) {
        const questionsLength = await this.quizModel.find(
          { _id: quizId },
          { questionBank: 1 },
        );
        if (questionsLength[0].questionBank.length === 0)
          throw new HttpException(
            'Questions not added yet',
            HttpStatus.BAD_REQUEST,
          );
      }
      const questions = await this.quizModel.aggregate([
        { $match: { _id: new Types.ObjectId(quizId) } },
        {
          $project: {
            questionPerPage: 1,
            quizTitle: 1,
            time_check:1,
            totalQuestions:1,
            whole_check:1,
            quizTimeLimit:1,
            status: 1,
            questions: {
              $slice: [
                '$questionBank',
                parseInt(questionNumber),
                '$questionPerPage',
              ],
            },
          },
        },
      ]);
      return questions;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
  async isQuizAssigned(userData) {
    try {
      const { emailAddress, quizId } = userData;
      const userExists = await this.userModel.exists({
        emailAddress: emailAddress,
      });
      if (!userExists)
        throw new HttpException('User does not exists', HttpStatus.BAD_REQUEST);
      const quizExists = await this.quizModel.exists({ _id: quizId });
      if (!quizExists)
        throw new HttpException(
          'Quiz has been removed',
          HttpStatus.BAD_REQUEST,
        );
      const quizAssigned = await this.userModel.find(
        {
          emailAddress: emailAddress,
        },
        {
          assignedQuizzes: {
            $elemMatch: { quizId: new Types.ObjectId(quizId) },
          },
        },
      );
      if (!quizAssigned[0].assignedQuizzes.length)
        throw new HttpException(
          'Quiz has not been assigned to you ',
          HttpStatus.BAD_REQUEST,
        );
      return quizAssigned[0].assignedQuizzes;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
  async configure(quiz: any) {
    try {
      const { quizId } = quiz;
    await this.quizModel.findOneAndUpdate(
        { _id: quizId },
        quiz,
      );

      const questions = await this.quizModel.findOne(
        { _id: new Types.ObjectId(quizId) },
        { questionBank: 1, status: 1, quizTitle: 1 },
      );
      return questions;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
}
