import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddQuizComponent } from './add-quiz/add-quiz.component';
import { ConfigureComponent } from './configure/configure.component';

const routes: Routes = [
  {path:'quiz/add-quiz',component:AddQuizComponent},
  {path:'quiz/configure',component:ConfigureComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
