import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { GroupServiceService } from "../../services/group-service.service";

@Component({
  selector: "app-edit-group-dialog",
  templateUrl: "./edit-group-dialog.component.html",
  styleUrls: ["./edit-group-dialog.component.sass"],
})
export class EditGroupDialogComponent implements OnInit {
  group: any = {};
  newgroupTitle: any;
  groupId: any;
  constructor(
    public dialogRef: MatDialogRef<EditGroupDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private groupservice: GroupServiceService
  ) {}

  ngOnInit(): void {}
  onNoClick(): void {
    this.dialogRef.close();
  }

  renameGroup() {
    this.groupId = this.data._id;
    this.group.groupName = this.newgroupTitle;
  this.dialogRef.close({data:this.group})
  }
}
