import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { QuizService } from "../../quiz/services/quiz.service";
import { AdminService } from "../services/admin.service";

@Component({
  selector: "app-configure",
  templateUrl: "./configure.component.html",
  styleUrls: ["./configure.component.scss"],
})
export class ConfigureComponent implements OnInit {
  configureModel: any = {};
  configureForm: any;
  dateTime: Date;
  quizId: any = {};
  quizTitle = "";
  quizStatus = "";
  constructor(
    private adminService: AdminService,
    public formBuilder: FormBuilder,
    private quizService: QuizService
  ) {
    this.adminService.menu$.next(true);
    this.quizId = localStorage.getItem("quizId");
  }

  ngOnInit() {
    this.configureForm = this.formBuilder.group({
      quizTitle: [""],
      quizId:this.quizId,
      timeLimitPerQuestion: [0],
      quizTimeLimit: [0],
      randomizeQuestion: [false],
      // autoNumberQuestion: [""],
      questionPerPage: [1],
      maxAttempts: [''],
      redirectOnQuizCompletion: [""],
      time_check: [false],
      whole_check: [false],
      rand_check: [false],
      per_check: [true],
      retake_check: [false],
      redirect_check: [false],
      schedule_check: [false],
      from_date: [""],
      to_date: [""],
      from_time: [""],
      to_time: [""],
    });
    this.dateTime = new Date();
    this.adminService.getQuizQuestions(this.quizId).subscribe({
      next: (response: any) => {
        this.configureForm.patchValue({
          quizTitle:response.quizTitle
        })
        this.quizStatus = response.status;
        
      },
      error: (error) => {
        console.log(error.error.message);
      },
      complete: () => {},
    });
  }
  get configureFormControl() {
    return this.configureForm.controls;
  }

  configureQuiz() {
    this.configureModel = this.configureForm.getRawValue()
    this.quizService.configure(this.configureModel).subscribe({
      next: (response: any) => {
        this.adminService.quizQuestions$.next(response)
      },
      error: (error) => {
        console.log(error.error.message);
      },
      complete: () => {},
    });
  }
  setTimePerQuestion(event:any){
      if(event.target.checked){
        this.configureForm.patchValue({
          quizTimeLimit:'',
          questionPerPage:1,
          per_check:true
        })
        this.configureForm.get('whole_check').disable()
        this.configureForm.get('quizTimeLimit').disable()
        this.configureForm.get('questionPerPage').disable()
        this.configureForm.get('per_check').disable()
        

      }else{
        this.configureForm.get('whole_check').enable()
        this.configureForm.get('quizTimeLimit').enable()
        this.configureForm.get('questionPerPage').enable()
        this.configureForm.get('per_check').enable()
      }

  }
  setQuizTime(event:any){
      if(event.target.checked){
        this.configureForm.get('time_check').disable()
        this.configureForm.patchValue({
          time_check:false
        })

      }else{
        this.configureForm.get('time_check').enable()

      }
  }
  ngOnDestroy() {
    this.adminService.menu$.next(false);
  }
}
