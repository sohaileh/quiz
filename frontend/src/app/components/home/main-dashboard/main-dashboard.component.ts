import { ChangeDetectorRef, Component, OnInit, ViewChild } from "@angular/core";
import { HomeService } from "../services/home.service";
import { Router } from "@angular/router";
import { MediaObserver, MediaChange } from "@angular/flex-layout";
import { Observable, Subscription } from "rxjs";
import { PageEvent } from "@angular/material/paginator";
import { MatPaginator } from "@angular/material/paginator";
import { MatDialog,MatDialogRef,MAT_DIALOG_DATA } from "@angular/material/dialog";
import { QuizInfoComponent } from "../../quiz/quiz-info/quiz-info.component";
import { AuthService } from "../../auth/services/auth.service";
import Swal from "sweetalert2";
import { MatTableDataSource } from "@angular/material/table";
import { QuizTitleComponent } from "../../quiz/quiz-title/quiz-title.component";
import { QuizService } from "../../quiz/services/quiz.service";
import { RenameQuizTitleComponent } from "../../quiz/rename-quiz-title/rename-quiz-title.component";

export interface quizInterface {
  quizTitle: string;
  status:string;

}


@Component({
  selector: "app-main-dashboard",
  templateUrl: "./main-dashboard.component.html",
  styleUrls: ["./main-dashboard.component.scss"],
})
export class MainDashboardComponent implements OnInit {




  


  mediaSub: Subscription;
  public slides = [];
  userRole: any;
  quizDetails: any = [];

  public viewType: string = "list";
  public viewCol: number = 32;
  public view: any;
  layOutSm: any = "column";
  smallScreen: boolean = false;
  descriptionView: boolean = false;
  pageSlice: any = [];
  ItemsPerPage: any = 3;
  handleDescriptionView: boolean = false;
  displayedColumns :string[]= ['quizTitle','status','preview','action'];
  dataSource = new MatTableDataSource<quizInterface>(this.quizDetails);
  organizationId:any={}


  constructor(
    private authService: AuthService,
    private homeService: HomeService,
    private router: Router,
    public mediaObserver: MediaObserver,
    public dialog: MatDialog,
    private quizservice:QuizService,
  ) {}

  ngOnInit(): void {

 

    this.mediaSub = this.mediaObserver.media$.subscribe(
      (result: MediaChange) => {
        if (this.descriptionView && result.mqAlias == "xs") {
          this.layOutSm = "column";
          this.handleDescriptionView = false;
        }

        if (this.descriptionView && result.mqAlias == "sm") {
          this.layOutSm = "column";

          this.handleDescriptionView = false;
        }

        if (
          this.descriptionView &&
          (result.mqAlias == "md" ||
            result.mqAlias == "lg" ||
            result.mqAlias == "xl")
        ) {
          this.layOutSm = "row";
          this.viewCol = 100;
          this.handleDescriptionView = true;
        }
        this.authService.userDetails.subscribe((response: any) => {
          this.userRole = localStorage.getItem("userRole");
        });
      }
    );


    this.quizservice.newQuiz$.subscribe((res:any)=>{
  this.getOrganizationQuizzes()





})



    

    this.getOrganizationQuizzes();


  }

  getOrganizationQuizzes() {
    this.organizationId.userId=localStorage.getItem('userId')

    this.homeService.getOrganizationQuizzes(this.organizationId).subscribe(
      (res: any) => {
        this.quizDetails = res;
        this.dataSource = new MatTableDataSource<quizInterface>(this.quizDetails);



        this.pageSlice = this.quizDetails.slice(0, 3);
      },
      (err: any) => {},
      () => {}
    );
  }

  playQuiz(quiz: any) {
    this.homeService.checkIfPlayed(quiz).subscribe(
      (res: any) => {
        const played = res;
        if (!played) {
          this.dialog.open(QuizInfoComponent, {
            data: quiz,
            autoFocus: false,
          });
        } else {
          Swal.fire("You cannot play quiz Twice");
        }
      },

      (error) => {},
      () => {}
    );
  }

  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.quizDetails.length) {
      endIndex = this.quizDetails.length;
    }
    this.pageSlice = this.quizDetails.slice(startIndex, endIndex);
  }

  public changeViewType(viewType, viewCol, view, layOutSm?, descriptionView?) {
    this.viewType = viewType;
    this.viewCol = viewCol;
    this.view = view;
    this.layOutSm = layOutSm;
    this.descriptionView = descriptionView;

    if (descriptionView) {
      this.handleDescriptionView = true;
    } else {
      this.handleDescriptionView = false;
    }
    if (viewType == "grid") {
      this.ItemsPerPage = 4;
      this.pageSlice = this.quizDetails.slice(0, 4);
    } else {
      this.ItemsPerPage = 3;
      this.pageSlice = this.quizDetails.slice(0, 3);
    }
  }

  organizeQuiz(quizId) {
    this.router.navigate([`/quiz/organize-quiz/${quizId}`]);
  }

  ngOnDestroy() {
    this.mediaSub.unsubscribe();
  }



  openQuizTitle(): void {
    let dialogRef = this.dialog.open(QuizTitleComponent, {
      width:'40%',
     position:{
      top:'60px',
     }
    
    });
  }

 deleteQuiz(quiz:any)
 {
 const confirmDelete=confirm('Are you sure you want to delete this quiz ')
 if(confirmDelete)
 {
  this.homeService.deleteQuiz(quiz).subscribe((res=>{
    if(res)
    {
      this.getOrganizationQuizzes()
    }

   }))

 }
 } 


 renameQuizTitle(quiz:any)
 {
  let dialogRef = this.dialog.open(RenameQuizTitleComponent, {
    width:'40%',
   position:{
    top:'60px',
   },
   data:quiz,
  
  });

  

 }

 editQuiz(quiz:any)
 {
     const quizId=quiz._id
     this.router.navigate([`/admin/quiz/add-quiz/${quizId}`])
 }


}
  


   

