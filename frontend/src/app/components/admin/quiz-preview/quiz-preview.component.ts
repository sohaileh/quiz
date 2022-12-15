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
          this.quizQuestions = response.questionBank;
          this.quizTitle = response.quizTitle;
          this.totalQuestions = this.quizQuestions.length;
          this.questionNumber++;
          if (this.quizQuestions.length == 0) this.submitStudentResponse();
        },
        error: (error) => {
          alert(error.error.message)
          this.router.navigate([`/admin/quiz/add-quiz/${this.quizId}`])
        },
        complete: () => {},
      });
  }
  submitStudentResponse() {
    const userId = localStorage.getItem("userId");
    const confirmation = confirm(
      "Are you sure you want to submit your Response."
    );

    if (!confirmation) return;
    this.submitting = true;
    this.finalResponse = {
      quizId: this.quizId,
      userId: userId,
      response: this.response,
    };
    this.adminService.submitStudentResponse(this.finalResponse).subscribe({
      next: (response: any) => {
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
    data.questionBank.forEach((element) => {
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
}
