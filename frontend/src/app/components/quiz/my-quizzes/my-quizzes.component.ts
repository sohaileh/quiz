import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { QuizService } from "../services/quiz.service";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { MatDialog } from "@angular/material/dialog";
import { DomSanitizer } from "@angular/platform-browser";
import { Router } from "@angular/router";

export interface My_Quizzes {
  event: string;
  organizer: string;
  score: string;
  attemptedOn: string;
  action: string;
}

@Component({
  selector: "app-my-quizzes",
  templateUrl: "./my-quizzes.component.html",
  styleUrls: ["./my-quizzes.component.scss"],
})
export class MyQuizzesComponent implements OnInit {
  result: any = [];

  bypassSecureUrl: any;
  uriSrc: any;

  displayedColumns: string[] = [
    "event",
    "organizer",
    "score",
    "attemptedOn",
    "action",
  ];
  dataSource = new MatTableDataSource<My_Quizzes>(this.result);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(
    private router: Router,
    private quizService: QuizService,
    private dialog: MatDialog,
    public domSanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.getUserQuizDetails();
  }

  getUserQuizDetails() {
    this.quizService.getUserQuizDetails().subscribe((res: any) => {
      this.result = res;
      console.log("resultdata", this.result);
      this.dataSource = new MatTableDataSource<My_Quizzes>(this.result);
      this.dataSource.paginator = this.paginator;
    });
  }

  generateCertificate() {
    const userId = localStorage.getItem("userId");
    this.router.navigate([
      `/quiz/generate-certificate/${this?.result[0]?.results?.output[0]?._id}/${userId}`,
    ]);
  }
}
