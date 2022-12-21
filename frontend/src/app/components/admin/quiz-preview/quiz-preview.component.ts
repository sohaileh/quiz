import { Component, OnInit } from "@angular/core";
import { AdminService } from "../services/admin.service";
import { ThemePalette } from "@angular/material/core";
import { ActivatedRoute, Router } from "@angular/router";
import { interval, Observable, Subscription, take, tap } from "rxjs";

@Component({
  selector: "app-quiz-preview",
  templateUrl: "./quiz-preview.component.html",
  styleUrls: ["./quiz-preview.component.scss"],
})
export class QuizPreviewComponent implements OnInit {
  quizQuestions = [];
  color: ThemePalette = "primary";
  quizId: any;
  questionsAnswered = 0;
  totalQuestions = 0;
  response = [];
  answers: any = {};
  quizTitle = "";
  finalResponse: any = {};
  mediaUrl = "";
  submitting = false;
  questionNumber = 0;
  optionSelected = false;
  responseSubmitted = false;
  redirectTime: Observable<number>;
  redirectingIn = 5;
  intervalSubscription: Subscription;
  showRedirectTime: number;
  questionsPerPage:number
  totalQuizQuestions:number
  minutes: number = 0;
  seconds: number = 0;
  remainSeconds: number = 0;
  quizTime: number;
  intervalId: any;
  timePerQuestionExists:boolean
  quizTimeEnded=false
  questionSequenceStartAT:number
  sequencedQuestion=false
  constructor(
    private adminService: AdminService,
    private route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.quizId = this.route.snapshot.paramMap.get("id");
    this.getQuizQuestions();
  }

  optionChanged(event: any, question) {
    this.optionSelected = true;
    const answer = event.value;
    this.answers = { answer: answer, questionId: question._id };
    const questionExixts = this.response.findIndex(
      (answer) => answer.questionId === this.answers.questionId
    );
    if (questionExixts !== -1) {
      this.response.splice(questionExixts, 1);
      this.response.push(this.answers);
      return;
    }
    this.questionsAnswered++;
    this.response.push(this.answers);
  }

  getQuizQuestions() {
    this.adminService
      .getQuizQuestions(this.quizId, this.questionNumber)
      .pipe(tap((data) => this.removeCorrectAnswer(data)))
      .subscribe({
        next: (response: any) => {
          this.optionSelected = false;
          this.quizQuestions = response[0].questions;
          this.quizTitle = response[0].quizTitle;
          this.totalQuizQuestions = response[0].totalQuestions
          this.questionSequenceStartAT=this.totalQuestions
          this.totalQuestions += response[0].questionPerPage
          this.questionsPerPage= response[0].questionPerPage
          if(this.questionNumber==0)
          if(response[0].whole_check){
            this.quizTime = response[0].quizTimeLimit
            this.timer()
          }
          if(response[0].questionSequence)
          this.sequencedQuestion=true
          if(response[0].time_check){
            clearInterval(this.intervalId);
         this.timePerQuestionExists=true
            this.quizTime = this.quizQuestions[0].timeLimit
            this.timer()
          }
          this.questionNumber += response[0].questionPerPage
          
          if (this.quizQuestions.length == 0) this.submitStudentResponse();
        },
        error: (error) => {
          console.log('message',error)
          alert(error.error.message)
          this.router.navigate([`/admin/quiz/add-quiz/${this.quizId}`])
        },
        complete: () => {},
      });
  }
  submitStudentResponse() {
    const userId = localStorage.getItem("userId");
    if(!this.quizTimeEnded){
      const confirmation = confirm(
        "Are you sure you want to submit your Response."
      );
  
      if (!confirmation) return;
    }
    
    this.submitting = true;
    this.finalResponse = {
      quizId: this.quizId,
      userId: userId,
      response: this.response,
    };
    this.adminService.submitStudentResponse(this.finalResponse).subscribe({
      next: (response: any) => {
        clearInterval(this.intervalId);
        this.submitting = false;
        this.responseSubmitted = true;
        this.redirectTime = interval(1000);
        this.redirect();
      },
      error: (error) => {
        this.submitting = false;
        this.router.navigate(['/home/dashboard'])
      },
      complete: () => {},
    });
  }
  removeCorrectAnswer(data) {
    data[0].questions.forEach((element) => {
      delete element.correctAnswer;
    });
    return data;
  }
  redirect() {
    this.intervalSubscription = this.redirectTime.pipe(take(6)).subscribe({
      next: (resposne) => {
        this.showRedirectTime = this.redirectingIn - resposne;
      },
      error: (error) => {},
      complete: () => {
        this.router.navigate(["/home/dashboard"]);
      },
    });
  }

  redirectToDashboard(){
    this.intervalSubscription.unsubscribe()
    this.router.navigate(["/home/dashboard"]);
  }
  timer() {
    this.minutes = this.quizTime;
    this.seconds = this.minutes * 60;
    this.remainSeconds = 0;
    this.intervalId = setInterval(() => {
      this.seconds = this.seconds - 1;
      this.minutes = Math.floor(this.seconds / 60);
      this.remainSeconds = this.seconds % 60;
      if (this.seconds == 0) {
        console.log(this.totalQuestions,this.totalQuizQuestions,this.timePerQuestionExists)
        if(this.timePerQuestionExists && ( this.totalQuestions < this.totalQuizQuestions) ){
              this.getQuizQuestions()
        }else{
          this.quizTimeEnded=true
          this.submitStudentResponse();
          clearInterval(this.intervalId);
        }
       
      }
    }, 1000);
  }
  ngOnDestroy() {
    clearInterval(this.intervalId);
  }
}
