import { Inject, Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { QuizService } from "../services/quiz.service";

@Component({
  selector: "app-quiz-result",
  templateUrl: "./quiz-result.component.html",
  styleUrls: ["./quiz-result.component.scss"],
})
export class QuizResultComponent implements OnInit {
  result: any[] = [];
  userId: any = {};
  quizId: any = {};
  percentage: any;
  incorrectanswers: number;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private quizService: QuizService
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.params.userId;
    this.quizId = this.route.snapshot.params.quizId;
    this.getResult();
  }

  getResult() {
    this.quizService.getResult(this.userId, this.quizId).subscribe(
      (res: any) => {
        this.result = res[0].results;

        this.incorrectanswers =
          this.result[0].totalQuestions - this.result[0].totalCorrectAnswers;
        this.percentage =
          (this.result[0].score * 100) / this.result[0].totalMarks;
        console.log("result", this.result);
      },
      (error: any) => {},
      () => {}
    );
  }
}
