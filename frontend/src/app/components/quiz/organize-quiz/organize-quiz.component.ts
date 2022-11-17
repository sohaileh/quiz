import { Component,  OnInit,  } from "@angular/core";
import { FormBuilder,  FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { QuizService } from "../services/quiz.service";
import Swal from "sweetalert2";
@Component({
  selector: "app-organize-quiz",
  templateUrl: "./organize-quiz.component.html",
  styleUrls: ["./organize-quiz.component.scss"],
})
export class OrganizeQuizComponent implements OnInit {
  quizId: any;
  organizerId: any;

  organizeQuizForm: FormGroup;
  totalTeamsInQuiz: number;
  registerTeamForm: FormGroup;
  teamsDetail = [];
  organizationUsers = [];
  usermembers = [];
  teams: any = {};

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private quizService: QuizService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.quizId = this.route.snapshot.paramMap.get("quizId");
    this.organizerId = localStorage.getItem("userId");

    this.registerTeamForm = this.fb.group({
      teamName: [""],
      members: [""],
    });

    this.getOrganizationUsers();
  }

  addTeam() {
    const user1 = this.registerTeamForm.get("members").value;
    this.teamsDetail.push(this?.registerTeamForm?.value);
    if (
      user1.filter((element) => {
        this.organizationUsers.includes(element);
        const indexs = this.organizationUsers.indexOf(element);
        this.organizationUsers.splice(indexs, 1);
      })
    )
      this.registerTeamForm.reset();
  }

  registerTeams() {
    this.teams.quizId = this.quizId;
    this.teams = { quizId: this.quizId, organizerId: this.organizerId };
    this.teams.teamsDetail = this.teamsDetail;
    console.log("teams", this.teams);
    this.quizService.registerTeams(this.teams).subscribe((res) => {
      console.log("res of team created", res);
    });
  }

  getOrganizationUsers() {
    this.quizService.getOrganizationUsers(this.organizerId).subscribe(
      (res: []) => {
        this.organizationUsers = Object.keys(res).map((organizationUser) => {
          return res[organizationUser].emailAddress;
        });
      },
      (error) => {
        console.log(error);
        Swal.fire(error.error.message);
        this.router.navigate(["/home/dashboard"]);
      },
      () => {}
    );
  }
}
