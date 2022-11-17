import { Module } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { QuizController } from './quiz.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { QuizSchema } from './schemas/quiz.schema';
import { UserSchema } from 'src/auth/schemas/user.schema';
import { ResultSchema } from 'src/results/schema/result.schema';
import { OrganizeSchema } from 'src/organize/schemas/organize.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Quizs', schema: QuizSchema },
      { name: 'Users', schema: UserSchema },
      { name: 'Results', schema: ResultSchema },
      {name:'Organizes',schema:OrganizeSchema},
    ]),
  ],
  controllers: [QuizController],
  providers: [QuizService],
})
export class QuizModule {}
