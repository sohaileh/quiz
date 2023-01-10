import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AuthRoutingModule } from "./auth-routing.module";
import { MyAccountComponent } from "./my-account/my-account.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { MatInputModule } from "@angular/material/input";
import { MatTabsModule } from "@angular/material/tabs";
import { LoginComponent } from "./my-account/login/login.component";
import { RegisterComponent } from "./my-account/register/register.component";
import { FlexLayoutModule } from "@angular/flex-layout";
// import { FormErrorMsgDirective } from 'src/app/Directives/formErrorMsg/form-error-msg.directive';
import { MatRadioModule } from "@angular/material/radio";
import { DirectivesModule } from "src/app/Directives/directives.module";
import { MatSelectModule } from "@angular/material/select";
import { ForgotPasswordComponent } from "./my-account/forgot-password/forgot-password.component";
import { OauthComponent } from './my-account/oauth/oauth.component';
import { CallbackComponent } from './my-account/callback/callback.component';

@NgModule({
  declarations: [
    MyAccountComponent,
    LoginComponent,
    RegisterComponent,
    // FormErrorMsgDirective,
    ForgotPasswordComponent,
    OauthComponent,
    CallbackComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MatInputModule,
    MatTabsModule,
    FlexLayoutModule,
    DirectivesModule,
    MatRadioModule,
    MatSelectModule,
  ],
})
export class AuthModule { }
