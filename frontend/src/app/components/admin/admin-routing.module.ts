import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddQuizComponent } from './add-quiz/add-quiz.component';
import { QuizPreviewComponent } from './quiz-preview/quiz-preview.component';
import { AddUsersPageComponent } from './user/add-users-page/add-users-page.component';
import { AssignQuizComponent } from './user/assign-quiz/assign-quiz.component';
import { ConfigureComponent } from './configure/configure.component';




const routes: Routes = [
  {path:'quiz/add-quiz/:id',component:AddQuizComponent},
  {path:'quiz/quiz-preview/:id',component:QuizPreviewComponent},
  {path:'add-users',component:AddUsersPageComponent},
  {path:'assign-quiz',component:AssignQuizComponent},
  {path:'quiz/configure/:id',component:ConfigureComponent}



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
