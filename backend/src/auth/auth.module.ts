import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { OrganizationSchema } from './schemas/organization.schema';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from 'src/config/jwt.config';
import {JwtStrategy} from './strategy/jwt.strategy'
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './authorization/guard/roles.guard';
import { ResultSchema } from 'src/results/schema/result.schema';
import { HttpModule } from '@nestjs/axios';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Users', schema: UserSchema },
      {name:'Organization', schema:OrganizationSchema},
      {name:'Results',schema:ResultSchema}
    ]),
    JwtModule.registerAsync(jwtConfig),
   HttpModule,
  ],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy]
})
export class AuthModule { }
