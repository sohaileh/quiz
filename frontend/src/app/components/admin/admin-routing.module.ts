import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddQuizComponent } from './add-quiz/add-quiz.component';
import { QuizPreviewComponent } from './quiz-preview/quiz-preview.component';

const routes: Routes = [
  {path:'quiz/add-quiz',component:AddQuizComponent},
  {path:'quiz/quiz-preview',component:QuizPreviewComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
