import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

import { ProductLeftSidebarComponent } from './products/product-left-sidebar/product-left-sidebar.component';
import { MainDashboard } from './main-dashboard/main-dashboard.component';
import { HomeThreeComponent } from './home-three/home-three.component';
import { HomeFourComponent } from './home-four/home-four.component';
import { HomeFiveComponent } from './home-five/home-five.component';
import { FeaturedItemsComponent } from './featured-items/featured-items.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';

// Routes
const routes: Routes = [
  // { path: 'one', component: HomeComponent },
  { path: 'dashboard', component: MainDashboard },
  // { path: 'three', component: HomeThreeComponent },
  // { path: 'four', component: HomeFourComponent },
  // { path: 'five', component: HomeFiveComponent },
  { path: 'products', component: ProductLeftSidebarComponent },
  { path: 'details/:catalogItem/:productCategory', component: ProductDetailsComponent },
  { path: 'featuredItems', component: FeaturedItemsComponent },
  //  { path: 'details/:catalogItem/:productCategory', component: DetailsComponent}
  
  

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
