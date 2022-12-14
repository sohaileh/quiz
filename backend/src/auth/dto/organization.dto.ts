import {
    IsString,
    IsNotEmpty,
    IsEmail,
    MinLength,
    IsAlpha,
    IsNumber,
    
  } from 'class-validator';
  
  export class OrganizationDto {

    @IsString()
    @IsNotEmpty()
    @IsAlpha()
    public organizationName: string;
  

  
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    public emailAddress: string;
  
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    public password: string;
  
    @IsNumber()
    @IsNotEmpty()
    public contact: Number;
  
  }
  