import { Inject, Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { forkJoin } from "rxjs";
import { AdminService } from "../../admin/services/admin.service";
import { QuizService } from "../services/quiz.service";
import { ThemePalette } from "@angular/material/core";

@Component({
  selector: "app-quiz-result",
  templateUrl: "./quiz-result.component.html",
  styleUrls: ["./quiz-result.component.scss"],
})
export class QuizResultComponent implements OnInit {
  color: ThemePalette = "primary";
  result: any[] = [];
  userId: any = {};
  quizTitle:any={}
  quizId: any = {};
  percentage: any;
  incorrectanswers: number;
  quizQuestions:any[]=[]
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private quizService: QuizService,
    private adminService:AdminService
  ) {}

  ngOnInit(): void {
 this.userId =  this.route.snapshot.queryParams['userId']
 this.quizId= this.route.snapshot.paramMap.get('id')
this.getResultInfo()
  }


  getResultInfo(){
    forkJoin({
      questions:this.adminService.getQuizQuestions(this.quizId),
      response:this.quizService.getUserQuizResponse(this.quizId,this.userId)
    }).subscribe({
      next:(res:any)=>{
        const {questions} = res
          const {response}= res
        this.quizTitle = questions.quizTitle
        this.quizQuestions = questions.questionBank
        this.quizQuestions.forEach(question => {
          const answer=  response.response.find((response)=>response.questionId ==question._id)
              if(answer)
              question.answer=answer.answer
        });
      },
      error:(error)=>{
      },
      complete:()=>{
      }
    })
  }
  redirect(){
    const accessToken = localStorage.getItem('accessToken')
     const {groups}  = JSON.parse(atob(accessToken.split('.')[1]))
    groups.map((group)=>{
      if(group.name=='ORGANIZER')
      this.router.navigate(['/home/dashboard'])
      else
      this.router.navigate([`/signin-quiz/${this.quizId}`])
    })
  }
  retakeTest(){
    this.userId =  this.route.snapshot.queryParams['userId']
    this.quizId= this.route.snapshot.paramMap.get('id')
    let attempts=3;
    this.quizService.retakeTest(this.userId, this.quizId,attempts).subscribe(
      (res: any) => {
        alert(res.response.message)
        this.router.navigate([`/signin-quiz/${this.quizId}`]);
      }
    );
  }
}
