import { ChangeDetectorRef, Component, OnInit, ViewChild ,HostListener,OnDestroy} from "@angular/core";
import { HomeService } from "../services/home.service";
import { NavigationStart, Router } from "@angular/router";
import { MediaObserver, MediaChange } from "@angular/flex-layout";
import {Subscription } from "rxjs";
import { PageEvent } from "@angular/material/paginator";
import { MatDialog} from "@angular/material/dialog";
import { QuizInfoComponent } from "../../quiz/quiz-info/quiz-info.component";
import { AuthService } from "../../auth/services/auth.service";
import { MatTableDataSource } from "@angular/material/table";
import { QuizTitleComponent } from "../../quiz/quiz-title/quiz-title.component";
import { QuizService } from "../../quiz/services/quiz.service";
import { RenameQuizTitleComponent } from "../../quiz/rename-quiz-title/rename-quiz-title.component";
import { DeleteDialogComponent } from "../../shared/delete-dialog/delete-dialog.component";
import { ToasterNotificationsService } from "../../shared/services/toaster-notifications.service";
import { ConfirmationDialogComponent } from "../../shared/confirmation-dialog/confirmation-dialog.component";
import { SharedServiceService } from "../../shared/services/shared-service.service";
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export interface quizInterface {
  quizTitle: string;
  status: string;
}
@Component({
  selector: "app-main-dashboard",
  templateUrl: "./main-dashboard.component.html",
  styleUrls: ["./main-dashboard.component.scss"],
})
export class MainDashboardComponent implements OnInit,OnDestroy {
  private unsubscriber : Subject<void> = new Subject<void>();

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
  displayedColumns: string[] = ['quizTitle', 'status', 'preview', 'analyze', 'action'];
  dataSource = new MatTableDataSource<quizInterface>(this.quizDetails);
  organizationId:any={}
  selectedRowIndex=-1
  showErrorModal: any;



  constructor(
    private authService: AuthService,
    private homeService: HomeService,
    private router: Router,
    public mediaObserver: MediaObserver,
    public dialog: MatDialog,
    private quizservice: QuizService,
    private sharedService:SharedServiceService,
    private ToasterNotificationsService:ToasterNotificationsService,
  ) { }

  

  ngOnInit(): void {
    this.quizservice.newQuiz$.subscribe((res: any) => {
      this.getOrganizationQuizzes()
    })

    this.getOrganizationQuizzes();

  
  history.pushState(null, '');

  fromEvent(window, 'popstate').pipe(
    takeUntil(this.unsubscriber)
  ).subscribe((_) => {
    history.pushState(null, '');
  });



  }
  ngOnDestroy(): void {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }
  



  getOrganizationQuizzes() {
    this.organizationId.userId = localStorage.getItem('userId')

    this.homeService.getOrganizationQuizzes(this.organizationId).subscribe(
      (res: any) => {
        this.quizDetails = res;
        this.dataSource = new MatTableDataSource<quizInterface>(this.quizDetails);



        this.pageSlice = this.quizDetails.slice(0, 3);
      },
      (err: any) => { },
      () => { }
    );
  }

  organizeQuiz(quizId) {
    this.router.navigate([`/quiz/organize-quiz/${quizId}`]);
  }

  openQuizTitle(): void {
    let dialogRef = this.dialog.open(QuizTitleComponent, {
      width: '600px',
      position: {
        top: '60px',
      }

    });
  }

  deleteQuiz(quiz: any) {
    const dialogRef= this.dialog.open(ConfirmationDialogComponent,{
      data:'Are you sure you want to delete this Quiz.',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(({ confirmation }) => {
        if(!confirmation)
        return
        this.sharedService.deleteQuiz(quiz).subscribe((res)=> {
         if(res){
          this.getOrganizationQuizzes();
          this.ToasterNotificationsService.showSuccess("Quiz deleted successfully");

         }
    
       })
    });
  }


  renameQuizTitle(quiz: any) {
    let dialogRef = this.dialog.open(RenameQuizTitleComponent, {
      width: '600px',
      position: {
        top: '60px',
      },
      data: quiz,

    }
    );
    
  }



 editQuiz(quiz:any)
 {
 
     const quizId=quiz._id
     localStorage.setItem('quizId',quizId)
     this.router.navigate([`/admin/quiz/add-quiz/${quizId}`])
 }
createQuizQuestion(quiz:any){
  const quizId=quiz._id;
  localStorage.setItem('quizId',quizId)
  this.router.navigate([`/admin/quiz/add-quiz/${quizId}`])
}

highlight(row){
 this.selectedRowIndex = row.id;
}

preview(quiz){
  const quizId =quiz._id
  const userId= localStorage.getItem('userId')
  localStorage.setItem('quizId',quizId)
  this.router.navigate([`/admin/quiz/quiz-preview/${quizId}`],{queryParams:{userId:userId}})
}
analyze(quiz)
{ 
  const quizId=quiz._id;
  this.router.navigate([`/quiz/quiz-analyze/${quizId}`])
}


}






