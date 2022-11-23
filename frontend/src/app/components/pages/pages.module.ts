import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './contact/contact.component';
import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FaqComponent } from './faq/faq.component'; 
import { AboutUsComponent } from './about-us/about-us.component';
// import { ErrorPageComponent } from './error-page/error-page.component';
// import { FormErrorMsgDirective } from 'src/app/Directives/formErrorMsg/form-error-msg.directive';
import { NgxPaginationModule } from 'ngx-pagination';
import {MatStepperModule} from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import {MatTabsModule} from '@angular/material/tabs';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PagesRoutingModule,
    SharedModule,
    NgxPaginationModule,
    MatInputModule,
    MatStepperModule,
    MatTabsModule

  ],
  declarations: [
    // FormErrorMsgDirective,
    ContactComponent,
    FaqComponent,
    AboutUsComponent,
    // ErrorPageComponent,


  ]
})
export class PagesModule { }
