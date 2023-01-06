import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { format } from "path";
import { AdminService } from "../services/admin.service";
@Component({
  selector: "app-quiz-analyze",
  templateUrl: "./quiz-analyze.component.html",
  styleUrls: ["./quiz-analyze.component.scss"],
})
export class QuizAnalyzeComponent implements OnInit {
  quizId: any;
  selectedQuizId: any = {};
  totalAssignedUsers: number = 0;
  totalRespondents: number = 0;
  respondents: any = [];
  respondentsList: any = {};
  userList: any = [];
  playedOn = "not submitted";
  score = 0;

  quizPublishedDate: number = 0;
  dateObj: any = {};

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private adminservice: AdminService
  ) {}

  ngOnInit(): void {
    this.getUserList();
    this.getQuizPublishDate();
  }

  getUserList() {
    this.selectedQuizId.quizId = this.route.snapshot.paramMap.get("id");
    this.adminservice.getUserList(this.selectedQuizId).subscribe((res) => {
      console.log(res,"pppp")
      this.respondents = res;
      this.respondents.forEach((user) => {
        this.respondentsList.firstName = user.firstName;
        this.respondentsList.lastName = user.lastName;
        this.respondentsList.emailAddress = user.emailAddress;

        if (user.assignedQuizzes.output[0].results[0] === undefined) {
          this.respondentsList.score = this.score;
          this.respondentsList.playedOn = this.playedOn;
          this.userList.push(this.respondentsList);
          this.respondentsList = {};
        } else {
          this.totalRespondents++;
          this.respondentsList.score =
            user.assignedQuizzes.output[0].results[0].score;
          this.respondentsList.playedOn =
            user.assignedQuizzes.output[0].results[0].playedOn;
          this.userList.push(this.respondentsList);
          this.respondentsList = {};
        }
      });
      this.totalAssignedUsers = this.respondents.length;
    });
  }
  getQuizPublishDate() {
    this.selectedQuizId.quizId = this.route.snapshot.paramMap.get("id");
    this.adminservice
      .getQuizPublishDate(this.selectedQuizId)
      .subscribe((res) => {
        this.dateObj = res;
        this.quizPublishedDate = this.dateObj.createdAt;
      });
  }
}

