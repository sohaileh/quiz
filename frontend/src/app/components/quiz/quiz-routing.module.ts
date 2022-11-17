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
  {path:'team-quiz/:quizId/:organizedQuizId/:teamId',component:AttemptTeamQuizComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuizRoutingModule {}
