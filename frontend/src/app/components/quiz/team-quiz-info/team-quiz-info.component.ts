import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { Route, Router } from "@angular/router";
import { validateAllFormFields } from "src/app/utils/validateform";
import Swal from "sweetalert2";
import { QuizService } from "../services/quiz.service";
@Component({
  selector: "app-team-quiz-info",
  templateUrl: "./team-quiz-info.component.html",
  styleUrls: ["./team-quiz-info.component.scss"],
})
export class TeamQuizInfoComponent implements OnInit {
  confirmTeamForm: FormGroup;
  teamDetails: any = {};
  constructor(
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private fb: FormBuilder,
    private quizService: QuizService
  ) {}

  ngOnInit(): void {
    this.confirmTeamForm = this.fb.group({
      teamName: [""],
      member: [""],
      password: [""],
    });
  }

  confirmTeamPassword() {
    validateAllFormFields(this.confirmTeamForm);

    if (!this.confirmTeamForm.valid) return;
    this.teamDetails = this.confirmTeamForm.value;
    this.teamDetails.quizOrganizedId = this.data._id;
    this.teamDetails.quizId = this.data.quizId;
    this.teamDetails.userId= localStorage.getItem('userId')
    this.quizService.confirmTeamPassword(this.teamDetails).subscribe(
      (res: any) => {
        console.log("password confirmed", res);
        
        
         this.router.navigate([`/quiz/team-quiz/${this.data.quizId}/${this.data._id}/${this.data.teamsDetail[0]._id}`]);
          this.dialog.closeAll();
      
        
      },
      (error) => {
        Swal.fire(error.error.message);
      },
      () => {}
    );
    
  }
}
