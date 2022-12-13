import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";
import { HttpClientModule, HttpRequest ,HTTP_INTERCEPTORS} from '@angular/common/http';
import { MainComponent } from './components/main/main.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './components/shared/shared.module';
import { BlockUIModule } from 'ng-block-ui';
import { BlockUIHttpModule} from 'ng-block-ui/http';
import { AdminModule } from './components/admin/admin.module';
import { MatRadioModule } from '@angular/material/radio';
import { QuizModule } from './components/quiz/quiz.module';
import { AuthModule } from './components/auth/auth.module';
import { HomeModule } from './components/home/home.module';
import { ErrorPageComponent } from './components/pages/error-page/error-page.component';
// import { CanActivateGuard } from './guards/can-activate.guard';
// import { CanDeactivateGuard } from './guards/can-deactivate.guard';
import { AuthInterceptor } from './components/auth/interceptors/auth.interceptor';
// import { FormErrorMsgDirective } from 'src/app/Directives/formErrorMsg/form-error-msg.directive';
import {ToastrModule} from 'ngx-toastr'

import { ClipboardModule } from 'ngx-clipboard';
@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ErrorPageComponent,
    // FormErrorMsgDirective
    
  ],
  imports: [
    BrowserModule,
    AdminModule,
    NgxSpinnerModule,
    SharedModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatRadioModule,
    QuizModule,
    AuthModule,
    HomeModule,
    ClipboardModule,
    ToastrModule.forRoot(),
    BlockUIModule.forRoot({delayStart:1,delayStop:3,message:"Loading..."}),
    BlockUIHttpModule.forRoot({requestFilters:[BlockUIFilterFuntion]})
  ],
  exports:[ErrorPageComponent],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
function BlockUIFilterFuntion(request:HttpRequest<any>) {
  const url =request.urlWithParams;
  return new RegExp("Notification/\\d+/count$").test(url) 
}