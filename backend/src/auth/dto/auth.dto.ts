import {IsNotEmpty, IsString} from 'class-validator'

export class AuthDto{
    @IsString()
    @IsNotEmpty()
    public emailAddress:String

    @IsString()
    @IsNotEmpty()
    public password:String
}