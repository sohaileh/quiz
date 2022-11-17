import { IsNotEmpty, IsArray, IsString, IsNumber } from 'class-validator';
import { ObjectId } from 'mongoose';
export class OrganizeModelDto {
  @IsNotEmpty()
  public organizerId: ObjectId;

  @IsNotEmpty()
  public quizId: ObjectId;

  @IsNotEmpty()
  @IsArray()
  public teamsDetail: any[];

  public teamsParticipated:any[];
  public createdAt: Date
}
