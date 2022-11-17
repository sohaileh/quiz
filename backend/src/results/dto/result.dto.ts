import { IsArray, IsNotEmpty, IsNotEmptyObject, IsObject, IsString } from 'class-validator'
export class ResultModelDto{
  
  
    public userID:String;

    public results:any[];

   public score:Number;
   public totalCorrectAnswers:Number;
   public totalQuestions:Number;
   public totalMarks:Number;
   

}
