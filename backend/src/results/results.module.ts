import { Module } from '@nestjs/common';
import { ResultController } from './results.controllers';
import { ResultService } from './results.services';
import { MongooseModule } from '@nestjs/mongoose';
import { ResultSchema } from './schema/result.schema';
import { QuizSchema } from 'src/quiz/schemas/quiz.schema';

@Module({
  imports:[
    MongooseModule.forFeature([
      {name:'Results',schema:ResultSchema},
      {name:'Quizs',schema:QuizSchema}
    ])
  ] ,
  controllers: [ResultController],
  providers: [ResultService]
})
export class ResultModule {}
