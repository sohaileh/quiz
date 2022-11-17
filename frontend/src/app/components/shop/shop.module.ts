import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainCarouselComponent } from './main-carousel/main-carousel.component';
import { ProductsComponent } from './products/products.component';
import { ProductComponent } from './products/product/product.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { ProductDialogComponent } from './products/product-dialog/product-dialog.component';
import { ProductLeftSidebarComponent } from './products/product-left-sidebar/product-left-sidebar.component';
import { ProductVerticalComponent } from './products/product-vertical/product-vertical.component';
import { ShopRoutingModule } from './shop-routing.module';
import { SharedModule } from '../shared/shared.module';
// import { SwiperModule } from 'ngx-swiper-wrapper';
import { FlexLayoutModule } from '@angular/flex-layout';
import {NgxPaginationModule} from 'ngx-pagination';
// import { MainDashboard } from './main-dashboard/main-dashboard.component';
import { HomeThreeComponent } from './home-three/home-three.component';
// import { NgxStarsModule } from 'ngx-stars';
import { ProductCarouselComponent } from './../shop/home/product-carousel/product-carousel.component';
import { ProductCarouselTwoComponent } from './main-dashboard/product-carousel-two/product-carousel-two.component';
import { ProductCarouselThreeComponent } from './home-three/product-carousel-three/product-carousel-three.component';
import { BrandsComponent } from './widgets/brands/brands.component';
import { CategoriesComponent } from './widgets/categories/categories.component';
import { PopularProductsComponent } from './widgets/popular-products/popular-products.component';
import { HomeFourComponent } from './home-four/home-four.component';
import { ProductZoomComponent } from './products/product-details/product-zoom/product-zoom.component';
import { HomeFiveComponent } from './home-five/home-five.component';
import { LeftSidebarComponent } from './products/left-sidebar/left-sidebar.component';
import { FeaturedItemsComponent } from './featured-items/featured-items.component';
import {MatBadgeModule} from '@angular/material/badge';
import { NgxStarsModule } from 'ngx-stars';
import { ProductRatingComponent } from './products/product-rating/product-rating.component';
import { MainDashboard } from './main-dashboard/main-dashboard.component';
import { RedZoomModule } from 'ngx-red-zoom';
import { PriceComponent } from './products/price/price.component';
import { SwiperModule } from 'swiper/angular';


@NgModule({
  declarations: [

    HomeComponent,
    MainCarouselComponent,
    ProductsComponent,
    PriceComponent,
    ProductComponent,
    ProductDetailsComponent,
    ProductDialogComponent,
    ProductLeftSidebarComponent,
    ProductVerticalComponent,
    MainDashboard,
    HomeThreeComponent,
    LeftSidebarComponent,
    ProductCarouselComponent,
    ProductCarouselTwoComponent,
    ProductCarouselThreeComponent,
    BrandsComponent,
    CategoriesComponent,
    PopularProductsComponent,
    HomeFourComponent,
    ProductZoomComponent,
    HomeFiveComponent,
    FeaturedItemsComponent,
    ProductRatingComponent,
    
  ],
  imports: [
    CommonModule,
    ShopRoutingModule,
    SharedModule,
    SwiperModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    NgxPaginationModule,
    MatBadgeModule,

    NgxStarsModule,
    // NgxImageZoomModule.forRoot() // <-- Add this line
    RedZoomModule
  ],
  exports: [
    ProductDialogComponent,
    ProductZoomComponent,
    LeftSidebarComponent
  ]
})

export class ShopModule { }
