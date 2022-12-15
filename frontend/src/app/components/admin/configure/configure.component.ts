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
      quizName: [""],
      quizId:this.quizId,
      timeLimitPerQuestion: [""],
      quizTimeLimit: [""],
      randomizeQuestion: [""],
      // autoNumberQuestion: [""],
      questionPerPage: [""],
      maxAttempts: [""],
      redirectOnQuizCompletion: [""],
      time_check: [""],
      whole_check: [""],
      rand_check: [""],
      per_check: [""],
      retake_check: [""],
      redirect_check: [""],
      schedule_check: [""],
      from_date: [""],
      to_date: [""],
      from_time: [""],
      to_time: [""],
    });
    this.dateTime = new Date();
    this.adminService.getQuizQuestions(this.quizId).subscribe({
      next: (response: any) => {
        this.quizTitle = response.quizTitle;
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
    this.configureModel = this.configureForm.value;
    console.log(this.configureModel)
    this.quizService.configure(this.configureModel).subscribe({
      next: (response: any) => {
        console.log(response);
      },
      error: (error) => {
        console.log(error.error.message);
      },
      complete: () => {},
    });
  }
  ngOnDestroy() {
    this.adminService.menu$.next(false);
  }
}
