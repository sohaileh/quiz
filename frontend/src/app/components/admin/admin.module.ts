import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AddQuizComponent } from './add-quiz/add-quiz.component';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatDialogModule} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import {TextFieldModule} from '@angular/cdk/text-field';
import {MatSelectModule} from '@angular/material/select';
import { DirectivesModule } from 'src/app/Directives/directives.module';
import { MatButtonModule } from '@angular/material/button';
import { ConfigureComponent } from './configure/configure.component';

// import { FormErrorMsgDirective } from 'src/app/Directives/formErrorMsg/form-error-msg.directive';
import { CKEditorModule } from 'ng2-ckeditor'
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule, MAT_RADIO_DEFAULT_OPTIONS} from '@angular/material/radio';
import { CustomPipesModule } from '../Pipes/Pipes.molule';
import { AddEditQuestionComponent } from './add-edit-question/add-edit-question.component';
import { QuizPreviewComponent } from './quiz-preview/quiz-preview.component';
import { AddUsersPageComponent } from './user/add-users-page/add-users-page.component';
import {MatTableModule} from '@angular/material/table';
import { MatDividerModule } from "@angular/material/divider";
import { AssignQuizComponent } from './user/assign-quiz/assign-quiz.component';
import { AssignQuizDialogComponent } from './assign-quiz-dialog/assign-quiz-dialog.component';
import { SharedModule } from '../shared/shared.module';
import { ResultComponent } from './result/result.component';




@NgModule({
  declarations: [
    AddQuizComponent,
    AddEditQuestionComponent,
    QuizPreviewComponent,
    ConfigureComponent,
    AddUsersPageComponent,
    AssignQuizComponent,
    AssignQuizDialogComponent,
    ResultComponent,
    // FormErrorMsgDirective
    
   
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    HttpClientModule,
    MatIconModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    FlexLayoutModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDialogModule,
    TextFieldModule,
    MatSelectModule,
    DirectivesModule,
    MatButtonModule,
    CKEditorModule,
    MatCheckboxModule,
    MatRadioModule,
    CustomPipesModule,
    MatTableModule,
    MatDividerModule,
    SharedModule
    
    

  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
 
})
export class AdminModule { }
