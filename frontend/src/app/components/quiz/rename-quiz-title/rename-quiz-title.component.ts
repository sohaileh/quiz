import { Component, OnInit,Inject } from '@angular/core';
import { MatDialog,MatDialogRef,MAT_DIALOG_DATA } from "@angular/material/dialog";
import { QuizService } from '../services/quiz.service';
@Component({
  selector: 'app-rename-quiz-title',
  templateUrl: './rename-quiz-title.component.html',
  styleUrls: ['./rename-quiz-title.component.scss']
})
export class RenameQuizTitleComponent implements OnInit {
  newquizTitle:string;
  quiz:any={}

  constructor( public dialogRef: MatDialogRef<RenameQuizTitleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private quizservice:QuizService,

) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  renameQuizTitle()
  { 
    this.quiz.quizId=this.data._id
    this.quiz.quizTitle=this.newquizTitle;


this.quizservice.renameQuizTitle(this.quiz).subscribe((res:any)=>{
  this.dialogRef.close();


})
  }



}
