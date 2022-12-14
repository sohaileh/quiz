import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddQuizComponent } from './add-quiz/add-quiz.component';
import { QuizPreviewComponent } from './quiz-preview/quiz-preview.component';
import { ConfigureComponent } from './configure/configure.component';



const routes: Routes = [
  {path:'quiz/add-quiz/:id',component:AddQuizComponent},
  {path:'quiz/quiz-preview/:id',component:QuizPreviewComponent},
  {path:'quiz/configure/:id',component:ConfigureComponent}
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
