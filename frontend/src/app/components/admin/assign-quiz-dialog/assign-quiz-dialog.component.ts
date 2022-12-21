import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-assign-quiz-dialog',
  templateUrl: './assign-quiz-dialog.component.html',
  styleUrls: ['./assign-quiz-dialog.component.scss']
})
export class AssignQuizDialogComponent implements OnInit {
  availableQuizzes=['abc','def']
assignedQuizzes=[]
selectedQuiz:any={}
selectedOption=false
selectedIndex:number
availableCliked=false
  constructor() { }

  ngOnInit(): void {
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
    this.availableQuizzes.splice(this.selectedIndex,1)
    this.selectedOption=false
    this.availableCliked=false
  }
  removeQuiz(){
    this.availableQuizzes.push(this.selectedQuiz)
    this.assignedQuizzes.splice(this.selectedIndex,1)
    this.selectedOption=false
  }
}
