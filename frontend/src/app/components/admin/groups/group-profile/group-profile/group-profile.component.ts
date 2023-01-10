import { SelectionModel } from "@angular/cdk/collections";
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { HomeService } from "src/app/components/home/services/home.service";
import { ConfirmationDialogComponent } from "src/app/components/shared/confirmation-dialog/confirmation-dialog.component";
import { SharedServiceService } from "src/app/components/shared/services/shared-service.service";
import { ToasterNotificationsService } from "src/app/components/shared/services/toaster-notifications.service";
import { AssignQuizDialogComponent } from "../../../assign-quiz-dialog/assign-quiz-dialog.component";
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
  organizerId:any={}
  loggedUser: any = {};
  displayedColumns: string[] = [
    "organisationCode",
    "groupName",
    "created",
    "action",
  ];
  dataSource = new MatTableDataSource<groupInterface>(this.userDetails);
  selection = new SelectionModel<groupInterface>(true, []);
  organizationId: any;
  organisation: any = {};
  organizationQuizList = [];
  quizAllocatedToGroup: any = [];
  availableQuizzes=[];
  assignQuizzes=[];
assignedQuizzes=[];
totalQuizzes: any;
  quizzesAssigned: any;
  constructor(
    private router: Router,
    private adminService: AdminService,
    private dialog: MatDialog,
    private groupservice: GroupServiceService,
    private toastr: ToasterNotificationsService,
    private homeService:HomeService
  ) { }

  ngOnInit(): void {
    this.userId = localStorage.getItem("userId");
    this.getGroups();
    // this.groupId = this.route.snapshot.paramMap.get("id");
    // this.groupName = this.route.snapshot.queryParamMap.get("groupName");
    // this.groupservice.getGroupMembers(this.groupId).subscribe((res: any) => {
    //   this.memberData = res;
    //   this.totalMembers = res?.length;
    // });
    // this.groupservice.getAssignedQuizes(this.groupId).subscribe((res: any) => {
    //   this.quizzesAssigned = res?.assignedQuizzes?.length;
    //   if(res?.assignedQuizzes)
    //   this.quizAllocatedToGroup = res.assignedQuizzes.map(
    //     (data) => data.quizTitle
    //   );
    // });
    this.organisation.userId = localStorage.getItem("userId");
    
    this.adminService.getOrganizationQuizzes(this.organisation)
      .subscribe((res: any) => {
        this.totalQuizzes = res;
        this.organizationQuizList = res.map((data) => data.quizTitle);
      });
  }
  
  searchShow() {
    this.search = false;
  }

  assignQuizToUser() {
    this.router.navigate(["/admin/add-users"]);
  }
  getGroups() {
    this.organizerId = localStorage.getItem("userId");
    this.groupservice.getGroups(this.organizerId).subscribe((res: any) => {
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
    return `${this.selection.isSelected(row) ? "deselect" : "select"} row ${row.groupName + 1
      }`;
  }

  openDialog() {
    let dialogRef = this.dialog.open(GroupTitleDialogComponent, {
      width: "600px",
      position: {
        top: "60px",
      },
    });
    dialogRef.afterClosed().subscribe(({ groups }) => {
      this.dataSource = new MatTableDataSource<groupInterface>(groups);

    });
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
  getGroupMembers(group:any){
   this.router.navigate([`/admin/group-info`],{queryParams:{groupId:group._id,groupName:group.groupName}});
  }
  deleteGroup(groupDetails){
    const dialogRef= this.dialog.open(ConfirmationDialogComponent,{
      data:'Are you sure you want to delete this group.',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(({ confirmation }) => {
        if(!confirmation)
        return
        this.groupservice.deleteGroup(groupDetails).subscribe({
          next:(res:any)=>{
            this.dataSource = new MatTableDataSource<groupInterface>(res);
          },
          error:(error)=>{},
          complete:()=>{}
        })
    });

  }
  assignQuiz(group:any) {
    const dialogData = {
      available: this.organizationQuizList,
      groupId:group._id
    }; 
   const dialogRef= this.dialog.open(AssignQuizDialogComponent,
      {
        data:dialogData,
        width: "900px",
        maxHeight: "100%",
        disableClose: true,
      }
  )
  dialogRef.afterClosed().subscribe(({ Quizzes,cancel })=>{
    if(cancel){
      this.assignQuizzes= this.totalQuizzes.filter((quiz) =>
      Quizzes.includes(quiz.quizTitle)
    );
     this.assignQuizzes.forEach((quiz,i)=>{
      this.assignedQuizzes.push({quizId:quiz._id,quizTitle:quiz.quizTitle})
    })
      this.groupservice.assignQuizzesToGroup(group._id,this.assignedQuizzes).subscribe({
       
        next:(response)=>{
        
          this.assignQuizzes=[]
          this.assignedQuizzes=[]
        }
      })
    }
 
  })
    
}
}
