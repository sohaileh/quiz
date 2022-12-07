import { Component, OnInit,Inject } from '@angular/core';
import { MatDialog,MatDialogRef,MAT_DIALOG_DATA } from "@angular/material/dialog";
import { QuizService } from '../services/quiz.service';



@Component({
  selector: 'app-quiz-title',
  templateUrl: './quiz-title.component.html',
  styleUrls: ['./quiz-title.component.scss']
})
export class QuizTitleComponent implements OnInit {
  quizTitle:string;
  quiz:any={}

  constructor(
     public dialogRef: MatDialogRef<QuizTitleComponent>,
     @Inject(MAT_DIALOG_DATA) public data: any,
     private quizservice:QuizService
      ) {}
    

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }



  createQuizTitle()
  { 
    this.quiz.organizationId=localStorage.getItem('userId')
this.quiz.quizTitle=this.quizTitle;

this.quizservice.createQuizTitle(this.quiz).subscribe((res:any)=>{
  this.dialogRef.close();


})
  }

}
