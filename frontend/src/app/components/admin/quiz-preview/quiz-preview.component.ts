import { Component, OnInit } from "@angular/core";
import { AdminService } from "../services/admin.service";
import { ThemePalette } from "@angular/material/core";
import { ActivatedRoute, Router } from "@angular/router";
import { interval, Observable, Subscription, take, tap } from "rxjs";
import { SessionExpiryComponent } from "../../quiz/session-expiry/session-expiry.component";
import { MatDialog } from "@angular/material/dialog";
import { InfoDialogComponent } from "../../shared/info-dialog/info-dialog.component";
import { ConfirmationDialogComponent } from "../../shared/confirmation-dialog/confirmation-dialog.component";
@Component({
  selector: "app-quiz-preview",
  templateUrl: "./quiz-preview.component.html",
  styleUrls: ["./quiz-preview.component.scss"],
})
export class QuizPreviewComponent implements OnInit {
  quizDetails=[]
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
  studentId:any={}
  userId:any={}
  constructor(
    private adminService: AdminService,
    private route: ActivatedRoute,
    public router: Router,
    private dialog:MatDialog
  ) {}

  ngOnInit(): void {
    this.quizId = this.route.snapshot.paramMap.get("id");
    this.userId= this.route.snapshot.queryParams['userId']
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
          this.quizDetails=response
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
          if(response[0].time_check
            ){
            clearInterval(this.intervalId);
         this.timePerQuestionExists=true
            this.quizTime = response[0].timeLimitPerQuestion
            this.timer()
          }
            if(!response[0].time_check && !response[0].whole_check
            ){
            clearInterval(this.intervalId);
         this.timePerQuestionExists=true
            this.quizTime = this.quizQuestions[0].timeLimit
            this.timer()
          }
          this.questionNumber += response[0].questionPerPage
          
          if (this.quizQuestions.length == 0) this.submitStudentResponse();
        },
        error: (error) => {
         this.dialog.open(InfoDialogComponent,{
          data:error.error.message,
          disableClose: true
         })
          this.router.navigate([`/admin/quiz/add-quiz/${this.quizId}`])
        },
        complete: () => {},
      });
  }
  submitStudentResponse() {
    if(this.quizTimeEnded){
      this.submitting = true;
      this.finalResponse = {
        quizId: this.quizId,
        userId: this.userId,
        response: this.response,
      };
      this.adminService.submitStudentResponse(this.finalResponse).subscribe({
        next: (response: any) => {
          clearInterval(this.intervalId);
          this.submitting = false;
          this.responseSubmitted = true;
  
        },
        error: (error) => {
          this.submitting = false;
          this.router.navigate(['/home/dashboard'])
        },
        complete: () => {
          if(this.router.url.includes('admin')){
                    this.router.navigate([`/thank-you/${this.quizId}`],{queryParamsHandling:'preserve'})
            
                    }else{
                      this.router.navigate([`/thank-you/${this.quizId}`],{queryParamsHandling:'preserve'})
            
                    }
        },
      });
        }
        if(!this.quizTimeEnded){
          const dialogRef= this.dialog.open(ConfirmationDialogComponent,{
            data:'Are you sure you want to submit your Response.'
          });
          dialogRef.afterClosed().subscribe(({ confirmation }) => {
            if(confirmation){
              this.quizTimeEnded=true
              this.submitStudentResponse()
            }else{
              return
            }
         
      
          })
        }
    
  }

  removeCorrectAnswer(data) {
    data[0].questions.forEach((element) => {
      delete element.correctAnswer;
    });
    return data;
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
    this.dialog.closeAll()
  }

}
