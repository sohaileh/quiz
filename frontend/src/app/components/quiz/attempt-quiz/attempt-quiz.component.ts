import { Component, OnInit } from "@angular/core";
import Swal from "sweetalert2";
import { Observable, Subject, takeUntil } from "rxjs";
import { QuizService } from "../services/quiz.service";
import { ActivatedRoute, Router } from "@angular/router";
import { HostListener } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { QuizResultComponent } from "../quiz-result/quiz-result.component";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-attempt-quiz",
  templateUrl: "./attempt-quiz.component.html",
  styleUrls: ["./attempt-quiz.component.scss"],
})
export class AttemptQuizComponent implements OnInit {
  questionNo: number = 0;
  question: any = {};
  options: any = [];
  savedResponse: any = {};
  responses: any = [];
  finalResponse: any = {};
  totalQuestions = 0;
  quizId: any = {};
  minutes: number = 0;
  seconds: number = 0;
  remainSeconds: number = 0;
  quizTime: number;
  intervalId: any;
  quizData: any = {};
  // result:any={}
  media: any;
  mediaUrl: any;

  url: any;
  imageSrc: any;
  // mediaLoading:boolean

  private destroy$ = new Subject();
  constructor(
    public domSanitizer: DomSanitizer,
    private quizService: QuizService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.quizId = this.route.snapshot.params.id;

    this.getQuizTime();
    this.getQuestion();

    if (!sessionStorage.getItem("allow-quiz")) {
      this.router.navigate(["/home/dashboard"]);
    }
  }

  @HostListener("window:beforeunload", ["$event"]) unloadHandler(event: Event) {
    event.returnValue = false;
  }

  canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
    if (
      !(
        sessionStorage.getItem("isSubmitted") &&
        sessionStorage.getItem("allow-quiz")
      )
    ) {
      return true;
    } else {
      return this.quizService.confirm("Changes cannot be saved before submit?");
    }
  }

  getQuizTime() {
    this.quizData.quizId = this.quizId;
    this.quizService.getQuizTime(this.quizData).subscribe(
      (res: any) => {
        this.quizTime = res[0].totalTime;
        this.timer();
      },
      (err: any) => {},
      () => {}
    );
  }

  timer() {
    this.minutes = this.quizTime;

    this.seconds = this.minutes * 60;
    this.remainSeconds = 0;
    this.intervalId = setInterval(() => {
      this.seconds = this.seconds - 1;
      this.minutes = Math.floor(this.seconds / 60);
      this.remainSeconds = this.seconds % 60;
      console.log(this.seconds);
      if (this.seconds == 0) {
        this.submitResponse();
        clearInterval(this.intervalId);
      }
    }, 1000);
  }

  saveResponse() {
    this.savedResponse.questionId = this.question.question.questionBank[0]._id;
    this.responses.push(this.savedResponse);
    this.savedResponse = {};
    if (!(this.questionNo == this.totalQuestions)) this.getQuestion();
  }

  getQuestion() {
    // this.mediaLoading=true
    this.quizService.getQuestion(this.questionNo, this.quizId).subscribe(
      (res: any) => {
        this.question = res;

        this.options = res.question.questionBank[0].options;
        this.totalQuestions = res.question.totalQuestions;
        this.mediaUrl = res.question.questionBank[0].fileUrl;

        this.questionNo++;
      },
      (error) => {
        Swal.fire(error.message);
        this.router.navigate(["/home/dashboard"]);
      }
    );
  }

  submitResponse() {
    sessionStorage.removeItem("allow-quiz");
    sessionStorage.removeItem("isSubmitted");
    clearInterval(this.intervalId);
    this.saveResponse();
    (this.finalResponse.quizId = this.quizId),
      (this.finalResponse.userId = localStorage.getItem("userId"));
    this.finalResponse.responses = this.responses;
    this.quizService
      .submitResponse(this.finalResponse)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (res: any) => {
          // this.result=res
          const userId = localStorage.getItem("userId");
          this.router.navigate([`/quiz/result/${userId}/${this.quizId}`]);
        },
        (error: any) => {
          Swal.fire(error);
        },
        () => {}
      );
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
    this.destroy$.unsubscribe();
  }
}
