import { Module } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { QuizController } from './quiz.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { QuizSchema } from './schemas/quiz.schema';
import { UserSchema } from 'src/auth/schemas/user.schema';
import { ResultSchema } from 'src/results/schema/result.schema';
import { OrganizeSchema } from 'src/organize/schemas/organize.schema';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.hostinger.in',
        port: '465',
        secure: true,
        auth: {
          user: 'info@scholarsservice.com',
          pass: 'Angular14.nodejs',
        },
      }
    }),
    MongooseModule.forFeature([
      { name: 'Quizs', schema: QuizSchema },
      { name: 'Users', schema: UserSchema },
      { name: 'Results', schema: ResultSchema },
      { name: 'Organizes', schema: OrganizeSchema },
    ]),
  ],
  controllers: [QuizController],
  providers: [QuizService],
})
export class QuizModule {}
