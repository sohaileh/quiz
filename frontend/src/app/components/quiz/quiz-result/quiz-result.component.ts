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
    this.quizId= this.route.snapshot.paramMap.get('id')
this.getResultInfo()
  }


  getResultInfo(){
 this.userId =  this.route.snapshot.queryParams['userId']
    forkJoin({
      questions:this.adminService.getQuizQuestions(this.quizId),
      response:this.quizService.getUserQuizResponse(this.quizId,this.userId)
    }).subscribe({
      next:(res:any)=>{
        const {questions} = res
          const {response}= res
        this.quizQuestions = questions.questionBank
        this.quizQuestions.forEach(question => {
          const answer=  response.response.find((response)=>response.questionId ==question._id)
              if(answer)
              question.answer=answer.answer
        });
        console.log('resone', this.quizQuestions)
      },
      error:(error)=>{
        console.log('error',error)
      },
      complete:()=>{
        console.log('complete')
      }
    })
  }
}
