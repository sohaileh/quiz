import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './my-account/login/login.component';
import { RegisterComponent } from './my-account/register/register.component';
import { ErrorPageComponent } from '../pages/error-page/error-page.component';
import { OauthComponent } from './my-account/oauth/oauth.component';
import { CallbackComponent } from './my-account/callback/callback.component';
const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'oauth/login',component:OauthComponent},
  {path:'oauth/callback',component:CallbackComponent},
  {path:'**',component:ErrorPageComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
