import { Inject, Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { QuizService } from "../services/quiz.service";
import { interval, Observable, take } from "rxjs";

@Component({
  selector: "app-quiz-info",
  templateUrl: "./quiz-info.component.html",
  styleUrls: ["./quiz-info.component.scss"],
})
export class QuizInfoComponent implements OnInit {
  id: any;
  totalQuestions: any;
  totalTime: any;
  startDate: any;
  endDate: any;
  eventName: any;
  subscriber: any;
  ready: boolean = false;
  checked: boolean = false;
  message: any;
  terms:any;
  quizId: any;
  timerStarted=false
  timerStarting:boolean
  redirectingIn = 3;
  redirectTime: Observable<number>;
  showRedirectTime: number;
  studentattempts:boolean=true
  constructor(
    private quizService: QuizService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  quizDetails: any = {};
  ngOnInit(): void {
    this.data = this.quizService.getData();  
    this.message=this.data[0].message;
    this.quizId=this.route.snapshot.params.id
  }
  attemptQuiz(){
    this.studentattempts=true
    this.timerStarting=true
    this.redirectTime = interval(1000);
    this.redirect()
  }
  redirect() {
    this.redirectTime.pipe(take(4)).subscribe({
          next: (resposne) => {
          this.timerStarted=true
          this.timerStarting=false
            this.showRedirectTime = this.redirectingIn - resposne;
          },
          error: (error) => {},
          complete: () => {
    this.router.navigate([`/student/quiz-attempt/${this.quizId}`],{queryParamsHandling:'preserve',skipLocationChange:true});

          },
        });
      }
 
}
