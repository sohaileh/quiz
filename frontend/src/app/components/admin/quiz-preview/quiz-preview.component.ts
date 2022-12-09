import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { ThemePalette } from "@angular/material/core";


@Component({
  selector: 'app-quiz-preview',
  templateUrl: './quiz-preview.component.html',
  styleUrls: ['./quiz-preview.component.scss']
})
export class QuizPreviewComponent implements OnInit {
  quizQuestions=[]
  color:ThemePalette='primary'
  
  constructor(private adminService:AdminService) { }

  ngOnInit(): void {

    this.adminService.getQuizQuestions().subscribe({
      next:(response:any)=>{
        this.quizQuestions = response.questionBank;
        console.log('preview questions',this.quizQuestions)
      },
      error:(error)=>{
        console.log(error.error.message)
      },
      complete:()=>{}
    })
  }

}
