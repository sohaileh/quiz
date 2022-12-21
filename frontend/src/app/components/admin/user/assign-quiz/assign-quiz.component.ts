import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { AdminService } from "../../services/admin.service";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { AssignQuizDialogComponent } from "../../assign-quiz-dialog/assign-quiz-dialog.component";

@Component({
  selector: "app-assign-quiz",
  templateUrl: "./assign-quiz.component.html",
  styleUrls: ["./assign-quiz.component.scss"],
})
export class AssignQuizComponent implements OnInit {
  assignQuizForm: FormGroup;
  userModel: any = {};
  organizationId: any = {};
  organizationQuizList: any = [];
  quizId: any = [];
  assignedQuizzes: any = [];
  quizIdObject: any = {};
  hide: Boolean = true;
  userAssignedQuiz: any = {};
  assignedQuizList: any = {};
  quizAllocatedToUser: any = [];
  disabled:boolean=true;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog:MatDialog
  ) {}

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
    this.userAssignedQuiz = this.route.snapshot.paramMap.getAll("existingUser");
    this.assignedQuizList = JSON.parse(this.userAssignedQuiz);
    this.quizAllocatedToUser = this.assignedQuizList.assignedQuizzes;
    this.assignQuizForm.patchValue(this.assignedQuizList);
  }

  save() {
    this.quizId.forEach((element) => {
      this.quizIdObject.quizId = element._id;
      this.quizIdObject.quizTitle = element.quizTitle;
      this.assignedQuizzes.push(this.quizIdObject);
      this.quizIdObject = {};
    });

    this.userModel = this.assignQuizForm.value;
    this.userModel.assignedQuizzes = this.assignedQuizzes;
    this.userModel.organizationId = localStorage.getItem("userId");
    this.assignedQuizzes = [];
    this.adminService.assignQuizs(this.userModel).subscribe((res: any) => {
      if (res) {
        this.router.navigate(["/admin/add-users"]);
      }
    });
  }

  getOrganizationQuizzes() {
    this.organizationId.userId = localStorage.getItem("userId");
    this.adminService
      .getOrganizationQuizzes(this.organizationId)
      .subscribe((res: any) => {
        this.organizationQuizList = res;
      });
  }

  showPassword() {
    this.hide = !this.hide;
  }

  assignQuizDialog(){
      this.dialog.open(AssignQuizDialogComponent,{
        width:'900px',
        maxHeight:'87%',
      disableClose: true
      })
  }

}
