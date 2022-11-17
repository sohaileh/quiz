import { ChangeDetectorRef, Component, OnInit, ViewChild } from "@angular/core";
import { HomeService } from "../services/home.service";
import { Router } from "@angular/router";
import { MediaObserver, MediaChange } from "@angular/flex-layout";
import { Observable, Subscription } from "rxjs";
import { PageEvent } from "@angular/material/paginator";
import { MatPaginator } from "@angular/material/paginator";
import { MatDialog } from "@angular/material/dialog";
import { QuizInfoComponent } from "../../quiz/quiz-info/quiz-info.component";
import { AuthService } from "../../auth/services/auth.service";
import Swal from "sweetalert2";

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

  constructor(
    private authService: AuthService,
    private homeService: HomeService,
    private router: Router,
    public mediaObserver: MediaObserver,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.mediaSub = this.mediaObserver.media$.subscribe(
      (result: MediaChange) => {
        console.log("size", result.mqAlias);
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
          console.log("userRole", this.userRole);
        });
      }
    );

    this.getQuizzes();
  }

  getQuizzes() {
    this.homeService.getQuizzes().subscribe(
      (res: any) => {
        this.quizDetails = res;
        console.log(this.quizDetails);

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
    console.log(event);
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
    console.log("quizid ", quizId);
    this.router.navigate([`/quiz/organize-quiz/${quizId}`]);
  }

  ngOnDestroy() {
    this.mediaSub.unsubscribe();
  }
}
