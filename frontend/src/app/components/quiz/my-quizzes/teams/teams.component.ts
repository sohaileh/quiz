import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { DomSanitizer } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { QuizService } from "../../services/quiz.service";
import { TeamQuizInfoComponent } from "../../team-quiz-info/team-quiz-info.component";



export interface My_Quizzes {
  teamName: string;
  created: Date;
  password: string;
  action: string;
  play: string;
}

@Component({
  selector: "app-teams",
  templateUrl: "./teams.component.html",
  styleUrls: ["./teams.component.sass"],
})
export class TeamsComponent implements OnInit {
  result: any = [];
  teamDetails: any = {};
  bypassSecureUrl: any;
  uriSrc: any;
  organizedQuizDetails: any = {};
  confirmTeamPassword: any = {};

  displayedColumns: string[] = [
    "teamName",
    "created",
    "password",
    "action",
    "play",
  ];
  dataSource = new MatTableDataSource<My_Quizzes>(this.result);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  constructor(
    private router: Router,
    private quizService: QuizService,
    private _dialog: MatDialog,
    public domSanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.getUserTeamQuizDetails();
  }

  getUserTeamQuizDetails() {
    const userId = localStorage.getItem("userId");
    this.quizService.getUserTeamQuizDetails(userId).subscribe((res: any) => {
      this.result = res;
      console.log("team data", res);
      this.dataSource = new MatTableDataSource<My_Quizzes>(this.result);
      this.dataSource.paginator = this.paginator;
    });
  }
  generatePassword(row) {
    this.organizedQuizDetails.memberInfo = row;
    this.organizedQuizDetails.memberInfo.userId =
      localStorage.getItem("userId");
    this.quizService.generatePassword(this.organizedQuizDetails).subscribe(
      (res: any) => {
        console.log(row.teamsDetail[0]?.password);
        row.teamsDetail[0].password = res.teamsDetail[0]?.password;
        console.log(row.teamsDetail[0].password);
      },
      (error) => {},
      () => {}
    );
  }

  playTeamQuiz(row:any) {
    console.log('dialog',row)
      this._dialog.open(TeamQuizInfoComponent,{
        data:row,
        autoFocus: false,
      })
  }
}
