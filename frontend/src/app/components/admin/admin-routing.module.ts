import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddQuizComponent } from './add-quiz/add-quiz.component';
import { QuizPreviewComponent } from './quiz-preview/quiz-preview.component';
import { AddUsersPageComponent } from './user/add-users-page/add-users-page.component';
import { AssignQuizComponent } from './user/assign-quiz/assign-quiz.component';
import { ConfigureComponent } from './configure/configure.component';
import { ResultComponent } from './result/result.component';
import { ProfileComponent } from './profile/profile.component';
import { UserResultComponent } from './user/user-result/user-result.component';
import { GradingComponent } from './grading/grading.component';
import { GroupProfileComponent } from './groups/group-profile/group-profile/group-profile.component';
import { QuizAnalyzeComponent } from './quiz-analyze/quiz-analyze.component';
import { GroupInfoComponent } from './groups/group-info/group-info/group-info.component';
import { AddMemberComponent } from './groups/add-member/add-member/add-member.component';
import { EditProfileComponent } from './groups/edit-profile/edit-profile.component';




const routes: Routes = [
  {path:'quiz/add-quiz/:id',component:AddQuizComponent},
  {path:'quiz/quiz-preview/:id',component:QuizPreviewComponent},
  {path:'user-dashboard',component:AddUsersPageComponent},
  {path:'edit-user',component:ProfileComponent},
  {path:'quiz/configure/:id',component:ConfigureComponent},
  {path:'add-users',component:AssignQuizComponent},
  {path: 'quiz/result/:id',component: ResultComponent},
  {path:'user-result',component:UserResultComponent},
  {path:'quiz/grading',component:GradingComponent},
  {path:'group-dashboard',component:GroupProfileComponent},
  {path:'group-info/:id',component:GroupInfoComponent},
  {path:'quiz/quiz-analyze/:id',component:QuizAnalyzeComponent},
  {path:'add-member/:id',component:AddMemberComponent},
  {path:'edit-member',component:EditProfileComponent}


]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
