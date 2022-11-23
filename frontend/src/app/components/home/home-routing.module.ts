import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';

const routes: Routes = [
  { path: 'home-page', component: HomePageComponent },
  { path: 'dashboard', component: MainDashboardComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
