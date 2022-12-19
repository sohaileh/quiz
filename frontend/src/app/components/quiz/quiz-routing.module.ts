import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AttemptQuizComponent } from "./attempt-quiz/attempt-quiz.component";
import { QuizInfoComponent } from "./quiz-info/quiz-info.component";
import { CanDeactivateGuard } from "src/app/guards/can-deactivate.guard";
import { MyQuizzesComponent } from "./my-quizzes/my-quizzes.component";
import { GenerateCertificateComponent } from "./generate-certificate/generate-certificate.component";
import { QuizResultComponent } from "./quiz-result/quiz-result.component";
import { OrganizeQuizComponent } from "./organize-quiz/organize-quiz.component";
import { AttemptTeamQuizComponent } from "./attempt-team-quiz/attempt-team-quiz.component";
import { AddQuizComponent } from "../admin/add-quiz/add-quiz.component";
import { TeamsComponent } from "./my-quizzes/teams/teams.component";
import { QuizTitleComponent } from "./quiz-title/quiz-title.component";
import { PublishQuizComponent } from "./publish-quiz/publish-quiz.component";
import { RegisterQuizComponent } from "./register-quiz/register-quiz.component";
import { CanActivateGuard } from "src/app/guards/can-activate.guard";

const routes: Routes = [
  {
    path: "attempt-quiz/:id",
    component: AttemptQuizComponent,
    canDeactivate: [CanDeactivateGuard],
  },
  { path: "quiz-info", component: QuizInfoComponent },
  { path: "my-quizzes", component: MyQuizzesComponent },
  {
    path: "generate-certificate/:quizId/:userId",
    component: GenerateCertificateComponent,
  },
  { path: "result/:userId/:quizId", component: QuizResultComponent },
  { path: "organize-quiz/:quizId", component: OrganizeQuizComponent },
  {path:'team-quiz/:quizId/:organizedQuizId/:teamId',component:AttemptTeamQuizComponent},
  { path: "teams", component: TeamsComponent },
  { path: "quiz-title", component: QuizTitleComponent },
  {path:"publish-quiz/:id",component:PublishQuizComponent},
  {path:"register-quiz/:id",component:RegisterQuizComponent,canActivate:[CanActivateGuard]}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuizRoutingModule {}
