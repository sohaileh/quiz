import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { AdminService } from "../../services/admin.service";
import { SelectionModel } from "@angular/cdk/collections";
import { MatDialog} from "@angular/material/dialog";
import { ConfirmationDialogComponent } from "src/app/components/shared/confirmation-dialog/confirmation-dialog.component";
import { SharedServiceService } from "src/app/components/shared/services/shared-service.service";
import { ToasterNotificationsService } from "src/app/components/shared/services/toaster-notifications.service";

export interface usersInterface {
  firstName: string;
  lastName: string;
  emailAddress: string;
  role: string;
  created: Date;
}

@Component({
  selector: "app-add-users-page",
  templateUrl: "./add-users-page.component.html",
  styleUrls: ["./add-users-page.component.scss"],
})
export class AddUsersPageComponent implements OnInit {
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
    "selectRole",
    "firstName",
    "lastName",
    "emailAddress",
    "role",
    "created",
    "action",
  ];
  dataSource = new MatTableDataSource<usersInterface>(this.userDetails);
  selection = new SelectionModel<usersInterface>(true, []);

  constructor(private router: Router, private adminService: AdminService,private dialog:MatDialog,private sharedService:SharedServiceService,private toastr:ToasterNotificationsService) {}

  ngOnInit(): void {
    this.userId = localStorage.getItem("userId");
    this.getLoggedUser();
  }
  searchShow() {
    this.search = false;
  }

  assignQuizToUser() {
    this.router.navigate(["/admin/add-users"]);
  }
  getLoggedUser() {
    this.user.id = this.userId;
    this.adminService.getLoggedUser(this.user).subscribe((res: any) => {
      this.loggedUser = res;
      this.getOrganizationUsers();
    });
  }

  getOrganizationUsers() {
    this.user.organizationId = localStorage.getItem("userId");
    this.adminService.getOrganizationUsers(this.user).subscribe((res: any) => {
      res.push(this.loggedUser);
      this.dataSource = new MatTableDataSource<usersInterface>(res);
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

  checkboxLabel(row?: usersInterface): string {
    if (!row) {
      return `${this.isAllSelected() ? "deselect" : "select"} all`;
    }
    return `${this.selection.isSelected(row) ? "deselect" : "select"} row ${
      row.firstName + 1
    }`;
  }

  getUserInfo(user: any) {
    const id = user._id;
    this.router.navigate([
      '/admin/edit-user'],{queryParams:{id}});
  }

  deleteUser(user: any) {
    console.log('user',user)
const dialogRef= this.dialog.open(ConfirmationDialogComponent,{
  data:'Are you sure you want to delete this user.',
  disableClose: true
});
dialogRef.afterClosed().subscribe(({ confirmation }) => {
    if(!confirmation)
    return
    this.sharedService.deleteUser(user).subscribe((res)=> {
      if(res){
    this.getLoggedUser();
    this.toastr.showSuccess("User deleted successfully");
      }

   })
});

}
}
