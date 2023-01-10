import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ToasterNotificationsService } from "src/app/components/shared/services/toaster-notifications.service";
import { GroupServiceService } from "../services/group-service.service";

@Component({
  selector: "app-group-title-dialog",
  templateUrl: "./group-title-dialog.component.html",
  styleUrls: ["./group-title-dialog.component.scss"],
})
export class GroupTitleDialogComponent implements OnInit {
  quizTitle: string;
  quiz: any = {};
  organizerId: string;
  groupName: any;
  constructor(
    public dialogRef: MatDialogRef<GroupTitleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private groupservice: GroupServiceService,
    private toastr:ToasterNotificationsService,

  ) {}

  ngOnInit(): void {
   
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  createGroup() {
    this.organizerId = localStorage.getItem("userId");
    this.groupservice.createGroup(this.organizerId,this.groupName).subscribe((res:any)=>{
      this.dialogRef.close({groups:res});
      
    },(error)=>{
      this.toastr.showError(error.error.message);
    })
  }
}
