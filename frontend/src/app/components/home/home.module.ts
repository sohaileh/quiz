import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { HomeRoutingModule } from "./home-routing.module";
import { SwiperModule } from "swiper/angular";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MainDashboardComponent } from "./main-dashboard/main-dashboard.component";
import { MainCarouselComponent } from "./main-carousel/main-carousel.component";
import { MatDividerModule } from "@angular/material/divider";
import { MatIconModule } from "@angular/material/icon";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatDialogModule } from "@angular/material/dialog";
import { HomePageComponent } from './home-page/home-page.component';
import {MatTableModule} from '@angular/material/table';
import {MatMenuModule} from '@angular/material/menu';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  declarations: [MainDashboardComponent, MainCarouselComponent, HomePageComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SwiperModule,
    MatCardModule,
    FlexLayoutModule,
    MatDividerModule,
    MatIconModule,
    MatPaginatorModule,
    MatDialogModule,
    MatTableModule,
    MatMenuModule,
    MatSelectModule
  ],
})
export class HomeModule {}
