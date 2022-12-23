import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { AdminService } from "../../services/admin.service";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { AssignQuizDialogComponent } from "../../assign-quiz-dialog/assign-quiz-dialog.component";
import { map, tap } from "rxjs";

@Component({
  selector: "app-assign-quiz",
  templateUrl: "./assign-quiz.component.html",
  styleUrls: ["./assign-quiz.component.scss"],
})
export class AssignQuizComponent implements OnInit {
  assignQuizForm: FormGroup;
  userModel: any = {};
  organizationId: any = {};
  organizationQuizList: any = [];
  quizId: any = [];
  assignedQuizzes: any = [];
  // quizIdObject: any = {};
  quizIdObject: any = [];
  hide: Boolean = true;
  userAssignedQuiz: any = {};
  assignedQuizList: any = {};
  quizAllocatedToUser: any = [];
  disabled:boolean=true;
  totalQuizzes=[]
  userId:any={}
  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    public router: Router,
    private route: ActivatedRoute,
    private dialog:MatDialog
  ) {}

  ngOnInit(): void {
    this.assignQuizForm = this.fb.group({
      role: [""],
      password: [""],
      firstName: [""],
      lastName: [""],
      emailAddress: [" "],
      organization: [""],
    });
    
    this.getOrganizationQuizzes();
    this.userId = this.route.snapshot.queryParamMap.get('id')
    if(this.userId){
      console.log('this.userid',this.userId)
      this.adminService.getUserDetails(this.userId).subscribe({
        next:(response)=>{
          this.assignedQuizList= response
          this.quizAllocatedToUser=this.assignedQuizList.assignedQuizzes.map((data)=> data.quizTitle)
          this.assignQuizForm.patchValue(this.assignedQuizList);
        }
      })
    }
    
  }

  save() {
      this.quizIdObject.forEach((quiz,i)=>{
        this.assignedQuizzes.push({quizId:quiz._id,quizTitle:quiz.quizTitle})
      })
      this.quizIdObject={}
    this.userModel = this.assignQuizForm.value;
    this.userModel.assignedQuizzes = this.assignedQuizzes;
    this.userModel.organizationId = localStorage.getItem("userId");
    this.assignedQuizzes = [];
    this.adminService.assignQuizs(this.userModel).subscribe((res: any) => {
      if (res) {
        this.router.navigate(["/admin/user-dashboard"]);
      }
    });
  }

  getOrganizationQuizzes() {
    this.organizationId.userId = localStorage.getItem("userId");
    this.adminService
      .getOrganizationQuizzes(this.organizationId)
      .subscribe((res: any) => {
        this.totalQuizzes=res
        this.organizationQuizList = res.map((data)=>data.quizTitle)
      });
  }

  showPassword() {
    this.hide = !this.hide;
  }

  assignQuizDialog(){
    const dialogData = {available:this.organizationQuizList,assignedQuiz:this.quizAllocatedToUser}
    const dialogRef= this.dialog.open(AssignQuizDialogComponent,{
        width:'900px',
        maxHeight:'100%',
      disableClose: true,
      data:dialogData
      })
      dialogRef.afterClosed().subscribe(({Quizzes})=>{
          if(Quizzes)
          this.quizIdObject = this.totalQuizzes.filter((quiz)=> Quizzes.includes(quiz.quizTitle))
      })

  }

}