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
@NgModule({
  declarations: [MainDashboardComponent, MainCarouselComponent],
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
  ],
})
export class HomeModule {}
