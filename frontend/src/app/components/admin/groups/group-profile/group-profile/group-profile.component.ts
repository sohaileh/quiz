import { SelectionModel } from "@angular/cdk/collections";
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { ConfirmationDialogComponent } from "src/app/components/shared/confirmation-dialog/confirmation-dialog.component";
import { SharedServiceService } from "src/app/components/shared/services/shared-service.service";
import { ToasterNotificationsService } from "src/app/components/shared/services/toaster-notifications.service";
import { AdminService } from "../../../services/admin.service";
import { EditGroupDialogComponent } from "../../edit-group-dialog/edit-group-dialog/edit-group-dialog.component";
import { GroupTitleDialogComponent } from "../../group-title-dialog/group-title-dialog.component";
import { GroupServiceService } from "../../services/group-service.service";

export interface groupInterface {
  groupName: string;
  organisationName: string;
  created: Date;
  action: any;
}
@Component({
  selector: "app-group-profile",
  templateUrl: "./group-profile.component.html",
  styleUrls: ["./group-profile.component.scss"],
})
export class GroupProfileComponent implements OnInit {
  userDetails: any = [];
  checked: boolean = false;
  searchData: string;
  search: boolean = true;
  quizTitle: string;
  userId: string;
  user: any = {};
  existingUser: any = {};
  selectedQuiz: any = {};
  loggedUser: any = {};
  displayedColumns: string[] = [
    "groupName",
    "organisationName",
    "created",
    "action",
  ];
  dataSource = new MatTableDataSource<groupInterface>(this.userDetails);
  selection = new SelectionModel<groupInterface>(true, []);
  organizationId: string;

  constructor(
    private router: Router,
    private adminService: AdminService,
    private dialog: MatDialog,
    private groupservice: GroupServiceService,
    private toastr: ToasterNotificationsService
  ) {}

  ngOnInit(): void {
    this.userId = localStorage.getItem("userId");
    this.getGroups();
  }
  searchShow() {
    this.search = false;
  }

  assignQuizToUser() {
    this.router.navigate(["/admin/add-users"]);
  }
  getGroups() {
    this.organizationId = localStorage.getItem("userId");
    this.groupservice.getGroups(this.organizationId).subscribe((res: any) => {
      this.dataSource = new MatTableDataSource<groupInterface>(res);
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  checkboxLabel(row?: groupInterface): string {
    if (!row) {
      return `${this.isAllSelected() ? "deselect" : "select"} all`;
    }
    return `${this.selection.isSelected(row) ? "deselect" : "select"} row ${
      row.groupName + 1
    }`;
  }

  openDialog() {
    let dialogRef = this.dialog.open(GroupTitleDialogComponent, {
      width: "600px",
      position: {
        top: "60px",
      },
    });
    // dialogRef.afterClosed().subscribe(({ confirmation }) => {
    //     if(!confirmation)
    //     return
    //     this.sharedService.deleteUser(user).subscribe((res)=> {
    //       if(res){
    //     this.getLoggedUser();
    //     this.toastr.showSuccess("User deleted successfully");
    //       }
    //    })
    // });
  }
  renameGroup(group: any) {
    let dialogRef = this.dialog.open(EditGroupDialogComponent, {
      width: "600px",
      position: {
        top: "60px",
      },
      data: group,
    });
    dialogRef.afterClosed().subscribe(({ data }) => {
      this.groupservice.renameGroup(data, group._id).subscribe((res: any) => {
        this.dataSource = new MatTableDataSource<groupInterface>(res);
      });
    });
  }
  getGroupMembers(members:any){
    console.log(members)
  }
}
