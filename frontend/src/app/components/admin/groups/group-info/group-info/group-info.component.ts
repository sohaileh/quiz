import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
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
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private groupservice: GroupServiceService,
    private dialog: MatDialog,
    private adminService: AdminService
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
    this.dialog.open(AssignQuizDialogComponent),
      {
        width: "900px",
        maxHeight: "100%",
        disableClose: true,
      };
  }
}
