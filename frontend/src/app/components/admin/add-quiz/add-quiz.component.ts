import { Component, HostListener, OnInit } from "@angular/core";
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
  quizTitle=''
  quizData: any = {};
  quizDetails: any = {};
  quizId: any;
  quizQuestions = [];
  questionId: any = {};
  showButton=false
  constructor(
    private adminService: AdminService,
    private dialog:MatDialog,
    private route:ActivatedRoute
  ) {
    this.adminService.menu$.next(true)

  }

  ngOnInit(): void { 
    this.quizId= this.route.snapshot.paramMap.get('id')
    this.adminService.quizQuestions$.subscribe({
      next:(response:any)=>{
        this.quizQuestions = response?.questionBank;
        this.quizStatus= response?.status
        this.quizTitle = response?.quizTitle
        if(this.quizQuestions?.length > 1){
        this.showButton=true
        }else{
        this.showButton=false
        }
      }
    })
    this.getQuizQuestions();

  }

  getQuizQuestions() {
    this.adminService.getQuizQuestions(this.quizId).subscribe({
      next: (response: any) => {
        this.quizQuestions = response.questionBank;
        this.quizStatus= response.status
        this.quizTitle = response.quizTitle
        if(this.quizQuestions.length > 1)
          this.showButton=true
     
      },
      error: (error) => {},
      complete: () => {},
    });
  }

  editdialog(question) {
    question.quizId=this.quizId
    this.dialog.open(AddEditQuestionComponent,{
      data:question,
      width:'900px',
      height:'87%',
      disableClose: true
    })
  }

  deleteQuestion(question) {
    const confirmation = confirm("Are you sure you want to delete this question?")
    if(!confirmation)
    return
    this.adminService.deleteQuestion(question,this.quizId).subscribe({
      next: (response: any) => {
        this.quizQuestions = response.questionBank;
        if(this.quizQuestions.length > 1){
        this.showButton=true

        }else{
          this.showButton=false
        }
        this.quizStatus = response.status
        this.quizTitle= response.quizTitle
      },
      error: (error) => {},
      complete: () => {},
    });
  }
  

  addQuestionDialog(){
    this.dialog.open(AddEditQuestionComponent,{
      data:this.quizId,
      width:'900px',
      height:'87%' ,
      disableClose: true
    })
  }

  ngOnDestroy(){
    this.adminService.menu$.next(false)
  }
}
