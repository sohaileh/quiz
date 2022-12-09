import { Component,  OnInit,  } from "@angular/core";
import { FormBuilder,  FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { QuizService } from "../services/quiz.service";
import Swal from "sweetalert2";
import { AuthService } from "../../auth/services/auth.service";
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: "app-organize-quiz",
  templateUrl: "./organize-quiz.component.html",
  styleUrls: ["./organize-quiz.component.scss"],
})

export class OrganizeQuizComponent implements OnInit {
  quizId: any;
  organizerId: any;
  organizationDetails:any={}
  organizeQuizForm: FormGroup;
  totalTeamsInQuiz: number;
  registerTeamForm: FormGroup;
  teamsDetail = [];
  organizationUsers = [];
  usermembers = [];
  teams: any = {};
  organizations:any[]=[]

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private quizService: QuizService,
    private router: Router,
    private authService:AuthService,
    private toast: ToastrService,
  ) {}

  ngOnInit(): void {
    this.quizId = this.route.snapshot.paramMap.get("quizId");
    this.organizerId = localStorage.getItem("userId");

    this.registerTeamForm = this.fb.group({
      teamName: [""],
      members: [""],
      organizationName:['']
    });
    if(localStorage.getItem('userRole')==='organizer')
    this.getOrganizationUsers();
    if(localStorage.getItem('userRole')==='admin')
      this.authService.getOrganizations().subscribe((res:any)=>{
            console.log('organizatiions',res)
          this.organizations = res
      },(error)=>{

      },()=>{})
  }

  addTeam() {
    const user1 = this.registerTeamForm.get("members").value;
    console.log('selected users', this.registerTeamForm.get("members").value)
    this.teamsDetail.push(this?.registerTeamForm?.value);
    if (
      user1.filter((element) => {
        this.organizationUsers.includes(element);
        const indexs = this.organizationUsers.indexOf(element);
        this.organizationUsers.splice(indexs, 1);
      })
    )
      this.registerTeamForm.patchValue({
        teamName:'',
        members:''
      });
  }

  registerTeams() {
    // this.teams.quizId = this.quizId;
    this.teams = { quizId: this.quizId, organizerId: this.organizerId};
    this.teams.teamsDetail = this.teamsDetail;
    this.quizService.registerTeams(this.teams).subscribe((res) => {

      this.toast.success(`Quiz organized Successfully`, `Organize Quiz`, {
        progressBar: true,
        closeButton: true,
      });
    },(error)=>{
      Swal.fire(error.error.msg)
    },()=>{});
  }

  getOrganizationUsers() {
    this.organizationDetails={organizerId:this.organizerId,organizationName:this.registerTeamForm.get('organizationName').value}
    this.quizService.getOrganizationUsers(this.organizationDetails).subscribe(
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
