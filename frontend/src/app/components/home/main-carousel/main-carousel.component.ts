import {
  Component,
  OnInit,
  Input,
  ViewEncapsulation,
  ViewChild,
} from "@angular/core";
import { SwiperComponent } from "swiper/angular";
import SwiperCore, { Autoplay, Pagination, Navigation, Swiper } from "swiper";

SwiperCore.use([Autoplay, Pagination, Navigation]);
@Component({
  selector: "app-main-carousel",
  templateUrl: "./main-carousel.component.html",
  styleUrls: ["./main-carousel.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class MainCarouselComponent implements OnInit {
  intervalId: any;
  constructor() {}

  ngOnInit(): void {}

  items = [
    {
      title: "../../../../assets/images/Home-image-1.jpg",
    },
    {
      title: "../../../../assets/images/Home-image-2.png",
    },
  ];

  setSwiperInstance(swiper: Swiper) {
    this.intervalId = setInterval(() => {
      swiper.slideNext();
    }, 3000);
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }
}
