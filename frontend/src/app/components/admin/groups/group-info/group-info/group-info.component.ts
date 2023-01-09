import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { ConfirmationDialogComponent } from "src/app/components/shared/confirmation-dialog/confirmation-dialog.component";
import { SharedServiceService } from "src/app/components/shared/services/shared-service.service";
import { AssignQuizDialogComponent } from "../../../assign-quiz-dialog/assign-quiz-dialog.component";
import { AdminService } from "../../../services/admin.service";
import { GroupServiceService } from "../../services/group-service.service";

@Component({
  selector: "app-group-info",
  templateUrl: "./group-info.component.html",
  styleUrls: ["./group-info.component.scss"],
})
export class GroupInfoComponent implements OnInit {
  userResults: any;
  totalQuizzes: any;
  groupId: string;
  memberData: any = [];
  totalMembers: number;
  groupName: string;
  quizzesAssigned: number;
  organizationId: any = {};
  organizationQuizList = [];
  quizAllocatedToGroup: any = [];
  availableQuizzes=[]
  assignQuizzes=[]
assignedQuizzes=[]
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private groupservice: GroupServiceService,
    private dialog: MatDialog,
    private adminService: AdminService,
    private sharedService:SharedServiceService
  ) {}

  ngOnInit(): void {
    this.groupId = this.route.snapshot.paramMap.get("id");
    this.groupName = this.route.snapshot.queryParamMap.get("groupName");
    this.groupservice.getGroupMembers(this.groupId).subscribe((res: any) => {
      this.memberData = res;
      this.totalMembers = res?.length;
    });
    this.groupservice.getAssignedQuizes(this.groupId).subscribe((res: any) => {
      this.quizzesAssigned = res?.assignedQuizzes?.length;
      if(res?.assignedQuizzes)
      this.quizAllocatedToGroup = res.assignedQuizzes.map(
        (data) => data.quizTitle
      );
    });

    this.organizationId.userId = localStorage.getItem("userId");

    this.adminService.getOrganizationQuizzes(this.organizationId)
      .subscribe((res: any) => {
        
        this.totalQuizzes = res;
        this.organizationQuizList = res.map((data) => data.quizTitle);
      });
  }
  addMember() {
    this.router.navigateByUrl(`/admin/add-member/${this.groupId}`);
  }
  openDialog() {
    const dialogData = {
      available: this.organizationQuizList,
      groupId:this.groupId
      // assignedQuiz: this.quizAllocatedToGroup,
    }; 
   const dialogRef= this.dialog.open(AssignQuizDialogComponent,
      {
        data:dialogData,
        width: "900px",
        maxHeight: "100%",
        disableClose: true,
      }
  )
  dialogRef.afterClosed().subscribe(({ Quizzes })=>{
      this.assignQuizzes= this.totalQuizzes.filter((quiz) =>
     Quizzes.includes(quiz.quizTitle)
   );
   console.log('assign quiz',this.assignQuizzes)
    this.assignQuizzes.forEach((quiz,i)=>{
     this.assignedQuizzes.push({quizId:quiz._id,quizTitle:quiz.quizTitle})
   })
   
     this.groupservice.assignQuizzesToGroup(this.groupId,this.assignedQuizzes).subscribe({
       next:(response)=>{
         this.assignQuizzes=[]
         this.assignedQuizzes=[]
       }
     })
  
  
  })
    
}
editMember(userId:any,groupId:any){
  this.router.navigate([
    '/admin/edit-user'],{queryParams:{id:userId,groupId}});
}
deleteMember(userId:any){
  const dialogRef= this.dialog.open(ConfirmationDialogComponent,{
    data:'Are you sure you want to delete this Member.',
    disableClose: true
  });
  dialogRef.afterClosed().subscribe(({ confirmation }) => {
      if(!confirmation)
      return
      this.groupservice.deleteMember(userId).subscribe({
        next:(res:any)=>{
         this.memberData=res;
        },
        error:(error)=>{},
        complete:()=>{}
      })
  });

}
}
