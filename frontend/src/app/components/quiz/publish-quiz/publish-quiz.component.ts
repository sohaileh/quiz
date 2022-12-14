import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute, Route, Router, UrlSerializer } from "@angular/router";
import { DOCUMENT } from "@angular/common";
import { HomeService } from "../../home/services/home.service";
import { DialogComponent } from "../../quiz/dialog/dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { AdminService } from "../../admin/services/admin.service";
import { Clipboard } from '@angular/cdk/clipboard';
import { MatSnackBar } from "@angular/material/snack-bar";
@Component({
  selector: "app-publish-quiz",
  templateUrl: "./publish-quiz.component.html",
  styleUrls: ["./publish-quiz.component.scss"],
})
export class PublishQuizComponent implements OnInit {
  publishForm: FormGroup;
  value: any;
  url: any;
  id: any;
  quizStatus: any;
  quizId:any={}
  constructor(
    fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private adminService: AdminService,
    private snackBar: MatSnackBar,
    private clipboard: Clipboard
  ) {
    this.publishForm = fb.group({
      quizLink: new FormControl(false),
      urlLink: new FormControl(""),
    });
    this.adminService.menu$.next(true)
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.adminService.quizQuestions$.subscribe({
      next: (response: any) => {
        // this.quizQuestions = response.questionBank;
        this.quizStatus = response.status;
      },
    });
    this.getQuizQuestions();
  }

  getQuizQuestions() {
    this.quizId = localStorage.getItem('quizId')
    this.adminService.getQuizQuestions(this.quizId).subscribe({
      next: (response: any) => {
        // this.quizQuestions = response.questionBank;
        this.quizStatus = response?.status;
      },
      error: (error) => {},
      complete: () => {},
    });
  }
  copyText(){
    alert("copied to clipboard");
  }
  publishQuiz() {
    this.url = `localhost:4200/register-quiz/${this.id}`;
  }
  openDialog(event: any) {
    if (event.target.checked == true) {
      event.target.checked = false;
      this.dialog.open(DialogComponent, {
        width: "75%",
        data: { callback: this.callBack.bind(this), defaultValue: this.url },
      });
    }
  }
 
  callBack(name: string) {
    this.url = name;
  }
  ngOnDestroy(){
    this.adminService.menu$.next(false)
  }
}
