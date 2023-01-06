import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { ToasterNotificationsService } from "src/app/components/shared/services/toaster-notifications.service";
import { AdminService } from "../../services/admin.service";

@Component({
  selector: "app-reset-password",
  templateUrl: "./reset-password.component.html",
  styleUrls: ["./reset-password.component.scss"],
})
export class ResetPasswordComponent implements OnInit {
  userId: any = {};
  resetForm: FormGroup;
  hide=true
  constructor(
    public dialogRef: MatDialogRef<ResetPasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private adminService: AdminService,
    private toastr:ToasterNotificationsService,

  ) {}

  ngOnInit(): void {
    this.resetForm = this.fb.group({
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
    });
    const userId = this.route.snapshot.queryParamMap.get("id");
    this.adminService.getUserDetails(userId).subscribe({
      next: (response) => {
        this.userId = response;
        console.log(this.userId);
      },
    });

   
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  resetPasswordUser() {
    if(!this.resetForm.valid)
    return
    const {_id}=this.userId
    const password = this.resetForm.get('password').value
    this.adminService.resetPasswordUser(_id,password).subscribe({
      next:(response)=>{
        this.dialogRef.close()
        this.toastr.showSuccess("Password updated");
      },
      error:(error)=>{},
      complete:()=>{}
    })
  }
  public checkError = (controlName: string, errorName: string) => {
    return this.resetForm.controls[controlName].hasError(errorName);
  };
  get formError() {
    return this.resetForm.controls;
  }
}
