import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { AdminService } from "../../services/admin.service";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { AssignQuizDialogComponent } from "../../assign-quiz-dialog/assign-quiz-dialog.component";
import { InfoDialogComponent } from "src/app/components/shared/info-dialog/info-dialog.component";
import { ToasterNotificationsService } from "src/app/components/shared/services/toaster-notifications.service";
import { ResetPasswordComponent } from "../reset-password/reset-password.component";
import { GroupServiceService } from "../../groups/services/group-service.service";

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
  // quizIdObject: any = {};
  quizIdObject: any = [];
  hide: Boolean = true;
  userAssignedQuiz: any = {};
  assignedQuizList: any = {};
  quizAllocatedToUser: any = [];
  disabled: boolean = true;
  totalQuizzes = [];
  editQuizAssign = [];
  userId: any = {};
  dialogOpened = false;
  roles: string[];
  passwordError=false
  groupId: any;
  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    public router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private toatr: ToasterNotificationsService,
    private groupservice:GroupServiceService
  ) {}

  ngOnInit(): void {
    this.groupId=this.route.snapshot.queryParamMap.get("groupId")
    if(this.groupId){
      this.assignQuizForm = this.fb.group({
        password: [
          "",
          [
            Validators.required,
            Validators.pattern(
              "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
            ),
            Validators.minLength(8),
          ],
        ],
        firstName: ["", Validators.required],
        lastName: ["", Validators.required],
        emailAddress: [
          "",
          [
            Validators.required,
            Validators.email,
            Validators.required,
            Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$"),
          ],
        ],
        organization: ["",[Validators.required]],
      });
    }else{
    this.assignQuizForm = this.fb.group({
      role: ["Choose Role",[this.validateRole()]],
      password: [
        "",
        [
          Validators.required,
          Validators.pattern(
            "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
          ),
          Validators.minLength(8),
        ],
      ],
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      emailAddress: [
        "",
        [
          Validators.required,
          Validators.email,
          Validators.required,
          Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$"),
        ],
      ],
      organization: ["",[Validators.required]],
    });
  }
    this.getOrganizationQuizzes();
    this.userId = this.route.snapshot.queryParamMap.get("id");
    
   
    if (this.userId) {
      this.assignQuizForm.get("password").disable();
      this.adminService.getUserDetails(this.userId).subscribe({
        next: (response) => {
          this.assignedQuizList = response;
          this.quizAllocatedToUser = this.assignedQuizList.assignedQuizzes.map(
            (data) => data.quizTitle
          );
          this.assignQuizForm.patchValue(this.assignedQuizList);
        },
      });
    }
    this.getRoles();
  }

  save() {
    if (!this.dialogOpened && this.userId)
      this.assignedQuizzes = [...this.assignedQuizList.assignedQuizzes];
    else
      this.quizIdObject.forEach((quiz, i) => {
        this.assignedQuizzes.push({
          quizId: quiz._id,
          quizTitle: quiz.quizTitle,
        });
      });
    this.quizIdObject = [];
    this.userModel = this.assignQuizForm.value;
    this.userModel.assignedQuizzes = this.assignedQuizzes;
    this.userModel.organizationId = localStorage.getItem("userId");
    this.assignedQuizzes = [];
  }

  saveUserDetails() {
    if (!this.assignQuizForm.valid) {
      this.assignQuizForm.markAllAsTouched()
      return;
    }
    this.save();
    
     if(this.groupId){
      this.groupservice.saveMemberDetails(this.groupId,this.assignQuizForm.value).subscribe((res)=>{
        if(res){
          this.router.navigate([`/admin/group-info`],{queryParamsHandling:"merge"});
          this.toatr.showSuccess("Member added successfully");
        }
       
      })
    }else{
    this.adminService.assignQuizs(this.userModel).subscribe({
      next: (response) => {
        if (response) {
          this.router.navigate(["/admin/user-dashboard"]);
          this.toatr.showSuccess("User added successfully");
        }
      },
      error: (error) => {
        this.toatr.showError(error.error.message);
      },
      complete: () => {
        this.assignQuizForm.clearValidators();
      },
    });
  }
}
  editUserDetails() {
    this.save();
    if (!this.assignQuizForm.valid) {
      this.assignQuizForm.markAllAsTouched()
      return;
    }

    this.userModel.userId = this.userId;
    this.adminService.editUserDetails(this.userModel).subscribe({
      next: (reponse) => {
        if (this.groupId) {
          this.router.navigate([`/admin/group-info`],{queryParamsHandling:"merge"});
          this.toatr.showSuccess("Member edited successfully");
        }else{
          this.router.navigate(["/admin/user-dashboard"]);
          this.toatr.showSuccess("User edited successfully");
        }
      },
      error: (error) => {
        this.toatr.showError(error.error.message);
      },
      complete: () => {
        this.assignQuizForm.clearValidators();
      },
    });
  }

  getOrganizationQuizzes() {
    this.organizationId.userId = localStorage.getItem("userId");
    this.adminService
      .getOrganizationQuizzes(this.organizationId)
      .subscribe((res: any) => {
        this.totalQuizzes = res;
        this.organizationQuizList = res.map((data) => data.quizTitle);
      });
  }

  assignQuizDialog() {
    this.dialogOpened = true;
    const dialogData = {
      available: this.organizationQuizList,
      assignedQuiz: this.quizAllocatedToUser,
    }; 
    const dialogRef = this.dialog.open(AssignQuizDialogComponent, {
      width: "900px",
      maxHeight: "100%",
      disableClose: true,
      data: dialogData,
    });
    dialogRef.afterClosed().subscribe(({ Quizzes }) => {
      this.quizIdObject = this.totalQuizzes.filter((quiz) =>
        Quizzes.includes(quiz.quizTitle)
      );
      this.quizAllocatedToUser = this.quizIdObject.map(
        (data) => data.quizTitle
      );
    });
  }
  public checkError = (controlName: string, errorName: string) => {
    return this.assignQuizForm.controls[controlName].hasError(errorName);
  };
  get formError() {
    return this.assignQuizForm.controls;
  }
  getRoles() {
    this.adminService.getRoles().subscribe({
      next: (response: any) => {
        this.roles = response;
      },
      error: (error) => {},
      complete: () => {},
    });
  }

  resetPassword(quiz: any) {
    let dialogRef = this.dialog.open(ResetPasswordComponent, {
      width: "600px",
      position: {
        top: "60px",
      },
      data: quiz,
    });
  }

  validateRole():ValidatorFn{
    return (control:AbstractControl):ValidationErrors|null=>{
        const role = control.value
        return role =='Choose Role'?{invalidRole:true} :null
    }
  }
}
