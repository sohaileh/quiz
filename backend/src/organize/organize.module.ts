import { Module } from '@nestjs/common';
import { OrganizeService } from './organize.service';
import { OrganizeController } from './organize.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OrganizeSchema } from './schemas/organize.schema';
import { UserSchema } from 'src/auth/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Organizes', schema: OrganizeSchema },
      { name: 'Users', schema: UserSchema },
      
    ]),
  ],
  controllers: [OrganizeController],
  providers: [OrganizeService],
})
export class OrganizeModule {}
