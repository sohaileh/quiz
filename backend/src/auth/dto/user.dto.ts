import {
  IsString,
  IsNotEmpty,
  IsEmail,
  MinLength,
  IsAlpha,
  IsEmpty,
} from 'class-validator';

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
  @MinLength(3)
  public organization: string;

 @IsString()
 @IsNotEmpty()
  public role: string;

  @IsEmpty()
  public quizzesPlayed:[]
}
