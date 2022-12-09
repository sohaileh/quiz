import { Component, HostListener, OnInit, ViewChild } from "@angular/core";


import { AdminService } from "../services/admin.service";
import { ThemePalette } from "@angular/material/core";
import { MatDialog } from "@angular/material/dialog";
import { AddEditQuestionComponent } from "../add-edit-question/add-edit-question.component";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-add-quiz",
  templateUrl: "./add-quiz.component.html",
  styleUrls: ["./add-quiz.component.scss"],
})
export class AddQuizComponent implements OnInit {
  color: ThemePalette = "primary";
  quizStatus=''
  quizData: any = {};
  quizDetails: any = {};
  quizId: any;
  quizQuestions = [];
  questionId: any = {};
  constructor(
    private adminService: AdminService,
    private dialog:MatDialog,
    private route:ActivatedRoute
  ) {}

  ngOnInit(): void {
    // this.quizId= this.route.snapshot.paramMap.get('id')
    this.adminService.quizQuestions$.subscribe({
      next:(response:any)=>{
        this.quizQuestions = response.questionBank;
        this.quizStatus= response.status
      }
    })
    this.getQuizQuestions();
  }

  getQuizQuestions() {
    this.adminService.getQuizQuestions().subscribe({
      next: (response: any) => {
        this.quizQuestions = response.questionBank;
        this.quizStatus= response.status
      },
      error: (error) => {},
      complete: () => {},
    });
  }

  editdialog(question) {
    this.dialog.open(AddEditQuestionComponent,{
      data:question,
      width:'900px',
      height:'87%'
    })
  }

  deleteQuestion(question) {
    const confirmation = confirm("Are you sure you want to delete this question?")
    if(!confirmation)
    return
    this.adminService.deleteQuestion(question).subscribe({
      next: (response: any) => {
        this.quizQuestions = response.questionBank;
        this.quizStatus = response.status
      },
      error: (error) => {},
      complete: () => {},
    });
  }
  

  addQuestionDialog(){
    this.dialog.open(AddEditQuestionComponent,{
      width:'900px',
      height:'87%'
      
    })
  }
}
