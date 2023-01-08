import { Module } from '@nestjs/common';
import { AssignService } from './assign.service';
import { AssignController } from './assign.controller';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { AssignSchema } from './schema/assign.schema';

@Module({
  imports:[MongooseModule.forFeature([
    {name:'Assigns',schema:AssignSchema}
  ])],
  controllers: [AssignController],
  providers: [AssignService]
})
export class AssignModule {}
