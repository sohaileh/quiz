import { Component, OnInit, Inject } from "@angular/core";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ActivatedRoute,Router } from "@angular/router";
import Swal from "sweetalert2";
import { QuizService } from "../services/quiz.service";
import { findIndex, interval, Subscription } from "rxjs";

@Component({
  selector: "app-attempt-team-quiz",
  templateUrl: "./attempt-team-quiz.component.html",
  styleUrls: ["./attempt-team-quiz.component.scss"],
})
export class AttemptTeamQuizComponent implements OnInit {
  allTeamsParicipated = false;
  teamQuizDetail: any = {};
  totalTeams: any = 0;
  teamsThatEntered:any=0
  subscription: Subscription;
  assignQuizToSelectedTeam:Subscription
  quizStarted=false
  team:any={}
  questionNo: number = 0;
  question: any = {};
  options: any = [];
  savedResponse: any = {};
  responses: any = [];

  warning=true;
  waitingForTurn=false;

  // handle round
breaktime:boolean= false
teamsOfTheQuiz =[]
totalroundsinQuiz:number
roundNumber=0
teamtoplayquiz:any={}
teamsthatplayedthisround=[] 
teamId:any;
play:boolean=false
totalTeamsplayed=1;
  teamIndex=0;
  totalQuestions = 0;
  mediaUrl: any;
  totalTime: any;
  minutes: any;
  seconds: number;
  remainSeconds: number;
  intervalId: any;

  // intervalId: NodeJS.Timeout;


  constructor(
    private dialog: MatDialog,
    private quizService: QuizService,
    private route: ActivatedRoute,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.teamQuizDetail.quizId = this.route.snapshot.params.quizId;
    this.teamQuizDetail.organizedQuizId =
      this.route.snapshot.params.organizedQuizId;
    this.teamQuizDetail.teamId = this.route.snapshot.params.teamId;
   this.getQuestion()
    this.getTotalTeamsInQuiz();

    this.subscription = interval(1200).subscribe(
      (res: any) => {
        if (this.teamsThatEntered < this.totalTeams) {

          this.quizService.enteredQuiz(this.teamQuizDetail).subscribe(
            (res: any) => {
              // console.log(res,"---")

              if(this.teamsThatEntered === this.totalTeams){

                    this.allTeamsParicipated = true;


              }
              this.teamsThatEntered = res
              // console.log('teamsentered',this.teamsThatEntered,this.totalTeams,'total teams')

               
            },
            (error) => {},
            () => {}
          );
        } else {
          // Swal.fire("login all teams");
          this.subscription.unsubscribe();

          this.getTeamsLoggedInForQuiz()
          this.warning=false;
          this.waitingForTurn=true;



        }
      },
      (error) => {
        Swal.fire(error.error.message);
      },
      () => {}
    );

  }

  getTotalTeamsInQuiz() {
    this.quizService.getTotalTeamsInQuiz(this.teamQuizDetail).subscribe(
      (res) => {
        this.totalTeams = res;
      },
      (error) => {},
      () => {}
    );
  }


  getTeamsLoggedInForQuiz(){

    this.teamtoplayquiz.quizId = this.route.snapshot.params.quizId;
    this.teamtoplayquiz.organizedQuizId =
      this.route.snapshot.params.organizedQuizId;
      this.quizService.teamToPlayQuiz(this.teamtoplayquiz).subscribe((res)=>{
        this.team=res;
        this.playnow()
  });


   }





   playnow()
  {


                if(this.route.snapshot.params.teamId === this.team[this.teamIndex].teamId)
                {
                        this.waitingForTurn=false;
                         this.play=true
                       this.allTeamsParicipated = true;
                       this.timer()


                    }
              

                  if(this.teamIndex<this.totalTeams)
                 {


                   this.assignQuizToSelectedTeam = interval(this.totalTime*60000).subscribe(
                          (res: any) => {
                            this.play=false
                       this.allTeamsParicipated = false;

                            this.teamIndex++;
                            

                           this.playnow()
                      
                            })
                 }
              
              else{
              this.assignQuizToSelectedTeam.unsubscribe();

               }
}








  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.assignQuizToSelectedTeam.unsubscribe();

  }


  getQuestion() {
    
    this.quizService.getQuestion(this.questionNo, this.route.snapshot.params.quizId).subscribe(
      (res: any) => {
        console.log(res,"nnnnnnn")
        this.question = res;

        this.options = res.question.questionBank[0].options;
        this.totalQuestions = res.question.totalQuestions;
        this.mediaUrl = res.question.questionBank[0].fileUrl;
        this.totalTime=res.question.totalTime
        this.questionNo++;
      },
      (error) => {
        Swal.fire(error.message);
        this.router.navigate(["/home/dashboard"]);
      }
    );
  }



  saveResponse() {
    this.savedResponse.questionId = this.question.question.questionBank[0]._id;
    this.responses.push(this.savedResponse);
    this.savedResponse = {};
    if (!(this.questionNo == this.totalQuestions)) this.getQuestion();
  }





  timer() {
    this.minutes = this.totalTime;

    this.seconds = this.minutes * 60;
    this.remainSeconds = 0;
    this.intervalId = setInterval(() => {
      this.seconds = this.seconds - 1;
      this.minutes = Math.floor(this.seconds / 60);
      this.remainSeconds = this.seconds % 60;
      console.log(this.seconds);
      if (this.seconds == 0) {
        // this.submitResponse();
        clearInterval(this.intervalId);
      }
    }, 1000);
  }


  
}
