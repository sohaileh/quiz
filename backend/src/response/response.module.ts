import { Module } from '@nestjs/common';
import { ResponseService } from './response.service';
import { ResponseController } from './response.controller';
import { ResponseSchema } from './schemas/response.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { QuizSchema } from 'src/quiz/schemas/quiz.schema';
import { UserSchema } from 'src/auth/schemas/user.schema';
import { ResultSchema } from 'src/results/schema/result.schema';

@Module({
  imports:[
    MongooseModule.forFeature([
      {name:'Responses',schema:ResponseSchema},
      {name:'Quizs',schema:QuizSchema},
      {name:'Users',schema:UserSchema},
      {name:'Results',schema:ResultSchema}
    ])
  ] ,
  controllers: [ResponseController],
  providers: [ResponseService]
})
export class ResponseModule {}
