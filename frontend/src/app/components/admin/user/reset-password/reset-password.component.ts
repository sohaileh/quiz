import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { AdminService } from "../../services/admin.service";

@Component({
  selector: "app-reset-password",
  templateUrl: "./reset-password.component.html",
  styleUrls: ["./reset-password.component.scss"],
})
export class ResetPasswordComponent implements OnInit {
  userId: any = {};
  resetForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<ResetPasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.queryParamMap.get("id");
    this.adminService.getUserDetails(userId).subscribe({
      next: (response) => {
        this.userId = response;
        console.log(this.userId.password);
      },
    });

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
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  resetPasswordUser() {
    console.log("he");
  }
}
