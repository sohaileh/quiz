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
  constructor(
    private quizService: QuizService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  quizDetails: any = {};
  ngOnInit(): void {
    this.quizDetails = this.data;
  }

  playQuiz() {
    this.router.navigate([`/quiz/attempt-quiz/${this.quizDetails._id}`]);
    sessionStorage.setItem("allow-quiz", "true");
    sessionStorage.setItem("isSubmitted", "true");
    this.quizService.setQuizTime(this.quizDetails?.totalTime);
    this.dialog.closeAll();
  }
}
