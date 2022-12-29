import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleSchema } from './schema/role.schema';
@Module({
  imports:[ MongooseModule.forFeature([
    { name: 'Roles', schema: RoleSchema },
  
  ]),],
  controllers: [RoleController],
  providers: [RoleService]
})
export class RoleModule {}
