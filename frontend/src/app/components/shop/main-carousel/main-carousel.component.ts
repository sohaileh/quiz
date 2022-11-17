import { Component, OnInit, Input } from '@angular/core';
// import { SwiperConfigInterface, SwiperPaginationInterface } from 'ngx-swiper-wrapper';
import { HomePageService } from '../services/home-page.service';

// import Swiper core and required modules
import SwiperCore, { SwiperOptions,Autoplay,Pagination } from 'swiper';
SwiperCore.use([Autoplay, Pagination]);
@Component({
  selector: 'app-main-carousel', 
  templateUrl: './main-carousel.component.html',
  styleUrls: ['./main-carousel.component.scss']
})
export class MainCarouselComponent implements OnInit {
  config: SwiperOptions = {
    autoplay:{ delay: 1000, disableOnInteraction: false }
  };
  siteID = localStorage.getItem(("siteId"))
  @Input('slides') slides: Array<any> = [];
  private pagination: any = {
    el: '.swiper-pagination',
    clickable: true
  };
  constructor(private homePageService: HomePageService) { }
  ngOnInit() {
    
  }

  ngAfterViewInit() {
    this.config = {
      slidesPerView: 1,
      spaceBetween: 0,
      keyboard: true,
      navigation: false,
      pagination: true,
      grabCursor: true,
      loop: false,
      preloadImages: false,
      lazy: true,
      autoplay: {
        delay: 1000,
        disableOnInteraction: false
      },
      speed: 500,
      effect: "slide"
    }
  }
}
