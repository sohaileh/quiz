import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { QuizRoutingModule } from "./quiz-routing.module";
import { AttemptQuizComponent } from "./attempt-quiz/attempt-quiz.component";
import { HttpClientModule } from "@angular/common/http";
import { MatIconModule } from "@angular/material/icon";
import { FormsModule } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { MatRadioModule } from "@angular/material/radio";
import { FlexLayoutModule } from "@angular/flex-layout";
import { QuizInfoComponent } from "./quiz-info/quiz-info.component";
import { MatDialogModule, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { QuizResultComponent } from "./quiz-result/quiz-result.component";
import { MyQuizzesComponent } from "./my-quizzes/my-quizzes.component";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { GenerateCertificateComponent } from "./generate-certificate/generate-certificate.component";
import { NgxPrintModule } from "ngx-print";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatDividerModule } from "@angular/material/divider";
import { OrganizeQuizComponent } from "./organize-quiz/organize-quiz.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { TeamsComponent } from "./my-quizzes/teams/teams.component";
import { AttemptTeamQuizComponent } from "./attempt-team-quiz/attempt-team-quiz.component";
import { TeamQuizInfoComponent } from "./team-quiz-info/team-quiz-info.component";
import { DirectivesModule } from "src/app/Directives/directives.module";
import { QuizTitleComponent } from './quiz-title/quiz-title.component';
import { RenameQuizTitleComponent } from './rename-quiz-title/rename-quiz-title.component';
import { RegisterQuizComponent } from './register-quiz/register-quiz.component';
import { PublishQuizComponent } from './publish-quiz/publish-quiz.component';
import { DialogComponent } from './dialog/dialog.component';
import { CKEditorModule } from 'ng2-ckeditor';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {MatTooltipModule} from '@angular/material/tooltip';
import { SessionExpiryComponent } from './session-expiry/session-expiry.component';
import { CustomPipesModule } from "../Pipes/Pipes.molule";
@NgModule({
  declarations: [
    AttemptQuizComponent,
    QuizInfoComponent,
    QuizResultComponent,
    MyQuizzesComponent,
    GenerateCertificateComponent,
    OrganizeQuizComponent,
    TeamsComponent,
    AttemptTeamQuizComponent,
    TeamQuizInfoComponent,
    QuizTitleComponent,
    RenameQuizTitleComponent,
    RegisterQuizComponent,
    PublishQuizComponent,
    DialogComponent,
    SessionExpiryComponent,
  ],
  imports: [
    CommonModule,
    QuizRoutingModule,
    HttpClientModule,
    MatIconModule,
    FormsModule,
    MatCardModule,
    MatRadioModule,
    FlexLayoutModule,
    MatDialogModule,
    MatCheckboxModule,
    MatTableModule,
    MatPaginatorModule,
    NgxPrintModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    DirectivesModule,
    CKEditorModule,
    ClipboardModule,
    MatTooltipModule,
    CustomPipesModule,
  ],
  providers: [{ provide: MAT_DIALOG_DATA, useValue: {} }],
})
export class QuizModule {}
