import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from 'src/app/components/shared/confirmation-dialog/confirmation-dialog.component';
import { SharedServiceService } from 'src/app/components/shared/services/shared-service.service';
import { ToasterNotificationsService } from 'src/app/components/shared/services/toaster-notifications.service';
import { AdminService } from '../../../services/admin.service';
import { GroupTitleDialogComponent } from '../../group-title-dialog/group-title-dialog.component';

export interface groupInterface {
  groupName: string;
  organisationName: string;
  created: Date;
  action:any
}
@Component({
  selector: 'app-group-profile',
  templateUrl: './group-profile.component.html',
  styleUrls: ['./group-profile.component.scss']
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

  getUserInfo(user: any) {
    const id = user._id;
    this.router.navigate([
      '/admin/edit-user'],{queryParams:{id}});
  }

  openDialog() {

let dialogRef = this.dialog.open(GroupTitleDialogComponent, {
  width: '600px',
  position: {
    top: '60px',
  }

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
}
