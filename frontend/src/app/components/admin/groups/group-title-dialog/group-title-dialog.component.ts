import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { GroupServiceService } from "../services/group-service.service";

@Component({
  selector: "app-group-title-dialog",
  templateUrl: "./group-title-dialog.component.html",
  styleUrls: ["./group-title-dialog.component.scss"],
})
export class GroupTitleDialogComponent implements OnInit {
  quizTitle: string;
  quiz: any = {};
  organizationId: string;
  groupName: any;
  constructor(
    public dialogRef: MatDialogRef<GroupTitleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private groupservice: GroupServiceService
  ) {}

  ngOnInit(): void {
   
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  createGroup() {
    this.organizationId = localStorage.getItem("userId");
    this.groupservice.createGroup(this.organizationId,this.groupName).subscribe((res:any)=>{
      this.dialogRef.close({groups:res});
      
    })
  }
}
