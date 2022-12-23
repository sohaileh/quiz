import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-assign-quiz-dialog',
  templateUrl: './assign-quiz-dialog.component.html',
  styleUrls: ['./assign-quiz-dialog.component.scss']
})
export class AssignQuizDialogComponent implements OnInit {
  availableQuizzes=[]
assignedQuizzes=[]
selectedQuiz:any={}
selectedOption=false
selectedIndex:number
availableCliked=false
availableQuizzesExists:boolean
assignedQuizzesExists:boolean
  constructor(@Inject(MAT_DIALOG_DATA) public data:any,public dialogRef: MatDialogRef<AssignQuizDialogComponent>) { 
    
  }

  ngOnInit(): void {
    this.availableQuizzes=this.data.available.filter((quiz)=> !this.data.assignedQuiz.includes(quiz))
    this.assignedQuizzes=this.data.assignedQuiz
    if(this.availableQuizzes.length)
    this.availableQuizzesExists=true
    if(this.assignedQuizzes.length)
    this.assignedQuizzesExists=true
  }
  selectQuiz(event:any,index,available?:string){
    if(available)
    this.availableCliked=true
    this.selectedOption=true
    this.selectedIndex=index
    this.selectedQuiz=event.target.value
   
  }
  assignQuiz(){
  
    this.assignedQuizzes.push(this.selectedQuiz)
    this.assignedQuizzesExists=true
    this.availableQuizzes.splice(this.selectedIndex,1)
    this.selectedOption=false
    this.availableCliked=false
    if(!this.availableQuizzes.length)
    this.availableQuizzesExists =false
    console.log('assigned quizzes',this.assignedQuizzes)
 
  }
  removeQuiz(){
    this.availableQuizzes.push(this.selectedQuiz)
    this.availableQuizzesExists=true
    this.assignedQuizzes.splice(this.selectedIndex,1)
    this.selectedOption=false
    if(!this.assignedQuizzes.length)
    this.assignedQuizzesExists=false
  }
  assignQuizzes(){
    this.dialogRef.close({Quizzes:this.assignedQuizzes})
  }
}
