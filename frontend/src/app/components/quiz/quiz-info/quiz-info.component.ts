import { Inject, Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { QuizService } from "../services/quiz.service";

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
    this.router.navigate([`/student/quiz-attempt/${this.quizId}`],{queryParamsHandling:'preserve'});
  }
 
}
