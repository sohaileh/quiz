import { NgModule } from '@angular/core';
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

// import { FormErrorMsgDirective } from 'src/app/Directives/formErrorMsg/form-error-msg.directive';








@NgModule({
  declarations: [
    AddQuizComponent,
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
    DirectivesModule
    
    

  ]
})
export class AdminModule { }
