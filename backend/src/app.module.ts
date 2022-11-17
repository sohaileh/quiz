import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuizModule } from './quiz/quiz.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ResponseModule } from './response/response.module';
import {ConfigModule} from '@nestjs/config'
import { ResultModule } from './results/results.module';
import { OrganizeModule } from './organize/organize.module';

@Module({
  imports: [QuizModule, AuthModule, ResponseModule,ResultModule,
  MongooseModule.forRoot('mongodb://localhost:27017/QuizDB'),
  ConfigModule.forRoot({
    isGlobal:true
  }),
  OrganizeModule,
  
],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
