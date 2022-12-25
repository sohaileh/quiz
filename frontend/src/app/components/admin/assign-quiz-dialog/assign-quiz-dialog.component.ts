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
availableCliked:boolean
alreadyAssignedQuizzes=[]
availableQuizzesExists:boolean
assignedQuizzesExists:boolean
  constructor(@Inject(MAT_DIALOG_DATA) public data:any,public dialogRef: MatDialogRef<AssignQuizDialogComponent>) { 
    
  }

  ngOnInit(): void {
    this.availableQuizzes=this.data.available.filter((quiz)=> !this.data.assignedQuiz.includes(quiz))
    this.assignedQuizzes=this.data.assignedQuiz
    this.alreadyAssignedQuizzes=[...this.data.assignedQuiz]
    if(this.availableQuizzes.length)
    this.availableQuizzesExists=true
    if(this.assignedQuizzes.length)
    this.assignedQuizzesExists=true
  }
  selectQuiz(event:any,index,available?:string){
    if(available && this.availableQuizzes.includes(event.target.value))
    this.availableCliked=true
    if(!available && this.assignedQuizzes.includes(event.target.value))
    this.availableCliked=false
    this.selectedOption=true
    this.selectedIndex=index
    this.selectedQuiz=event.target.value
  }
  assignQuiz(){ 
 if(typeof this.selectedQuiz == 'object')
   return
    this.assignedQuizzes.push(this.selectedQuiz)
    this.assignedQuizzesExists=true
    this.availableQuizzes.splice(this.selectedIndex,1)
    this.selectedOption=false
    this.availableCliked=false
    if(!this.availableQuizzes.length)
    this.availableQuizzesExists =false
 this.selectedQuiz={}
  }
  removeQuiz(){
    if(typeof this.selectedQuiz == 'object')
    return
    this.availableQuizzes.push(this.selectedQuiz)
    this.availableQuizzesExists=true
    this.assignedQuizzes.splice(this.selectedIndex,1)
    this.selectedOption=false
    if(!this.assignedQuizzes.length)
    this.assignedQuizzesExists=false
    this.selectedQuiz={}
  }
  assignQuizzes(){
    this.dialogRef.close({Quizzes:this.assignedQuizzes})
  }
  assignAlreadyAssignedQuizzes(){
    this.assignedQuizzes=[...this.alreadyAssignedQuizzes]
    this.dialogRef.close({Quizzes:this.alreadyAssignedQuizzes})
  }
}
