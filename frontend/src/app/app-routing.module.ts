import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { CanActivateGuard } from './guards/can-activate.guard';

const appRoutes: Routes = [

 
  {
    path: '',
    redirectTo: 'home/home-page',
    pathMatch: 'full'
  },
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./components/home/home.module').then(m=>m.HomeModule)
      },
      {
        path:'admin',
        loadChildren:()=> import('./components/admin/admin.module').then(m=>m.AdminModule)
      },
        // {
        //   path: 'home',
        //     loadChildren: () => import('./components/shop/shop.module').then(m=>m.ShopModule)
        // },

      // {
      //   path: 'pages',
      //   loadChildren: () => import('./components/pages/pages.module').then(m => m.PagesModule)

      // },
      // {
      //   path: 'blog',
      //   loadChildren: () => import('./components/blog/blog.module').then(m => m.BlogModule)
      // },

      {
        path:'quiz',
        loadChildren:()=>import('./components/quiz/quiz.module').then(m=>m.QuizModule),
        canActivate:[CanActivateGuard]
      },
      {
        path:'auth',
        loadChildren:()=>import('./components/auth/auth.module').then(m=>m.AuthModule)
      },
    
    ]}]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
