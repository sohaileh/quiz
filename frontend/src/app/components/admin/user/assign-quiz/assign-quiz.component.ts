import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { AdminService } from "../../services/admin.service";
import { Router } from "@angular/router";
@Component({
  selector: "app-assign-quiz",
  templateUrl: "./assign-quiz.component.html",
  styleUrls: ["./assign-quiz.component.scss"],
})
export class AssignQuizComponent implements OnInit {
  assignQuizForm: FormGroup;
  userModel: any = {};
  quizModel: any = {};
  quiz: any = {};
  organizationId: any = {};
  organizationQuizList: any = [];
  quizId: any;
  quizIdObject:any={}
  assignedQuizzes: any = [];

  constructor(private fb: FormBuilder, private adminService: AdminService,private router:Router) {}

  ngOnInit(): void {
    this.assignQuizForm = this.fb.group({
      role: [""],
      password: [""],
      firstName: [""],
      lastName: [""],
      emailAddress: [" "],
      organization: [""],
    });
    this.getOrganizationQuizzes();
  }
  assignQuiz() {
 this.quizIdObject.quizId=this.quizId
    this.assignedQuizzes.push(this.quizIdObject);
    this.quizIdObject={};
  }

  save() {
    this.userModel = this.assignQuizForm.value;
    this.userModel.assignedQuizzes = this.assignedQuizzes;
    this.userModel.organizationId = localStorage.getItem("userId");
    this.assignedQuizzes=[];
    this.adminService.assignQuizs(this.userModel).subscribe((res:any)=>{
      if(res)
      {
        this.router.navigate(['/add-users'])
      }
    })
  }

  getOrganizationQuizzes() {
    this.organizationId.userId = localStorage.getItem("userId");

    this.adminService
      .getOrganizationQuizzes(this.organizationId)
      .subscribe((res: any) => {
        this.organizationQuizList = res;
      });
  }
}
