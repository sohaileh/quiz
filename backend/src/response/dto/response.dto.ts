import { IsArray, IsNotEmpty, IsNotEmptyObject, IsObject, IsString } from 'class-validator'
export class ResponseModelDto{
    @IsNotEmpty()
    @IsObject()
    public quizId:any;

    @IsNotEmpty()
    @IsString()
    public userID:String;

    @IsNotEmpty()
    @IsArray()
    public response:[];


}


