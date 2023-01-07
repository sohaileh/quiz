import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';

import { MongooseModule } from '@nestjs/mongoose';
import { groupSchema } from './schema/group.schema';
import { UserSchema } from 'src/auth/schemas/user.schema';

@Module({
  imports:[MongooseModule.forFeature([
    {name:'Groups',schema:groupSchema},
    { name: 'Users', schema: UserSchema },

  ])],
  controllers: [GroupController],
  providers: [GroupService]
})
export class GroupModule {}
