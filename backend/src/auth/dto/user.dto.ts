import {
  IsString,
  IsNotEmpty,
  IsEmail,
  MinLength,
  IsAlpha,
  IsEmpty,
} from 'class-validator';
import { isValidObjectId, ObjectId } from 'mongoose';
export class UserModelDto {
  //validates user registration
  @IsString()
  @IsNotEmpty()
  @IsAlpha()
  public firstName: string;

  @IsString()
  @IsNotEmpty()
  @IsAlpha()
  public lastName: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  public emailAddress: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  public password: string;

  @IsString()
  @IsNotEmpty()
  public organization: string;

  public created: Date;

  public organizationId: ObjectId;

  @IsString()
  @IsNotEmpty()
  public role: string;

  @IsEmpty()
  public quizzesPlayed: [];

  public assignedQuizzes: [];
}
