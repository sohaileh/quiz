import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from 'src/app/modals/product.model';
import { CartItem } from 'src/app/modals/cart-item';
import { ProductService } from '../../shared/services/product.service';
import { CartService } from '../../shared/services/cart.service';
import { HomePageService } from '../services/home-page.service';
import { ProductLeftSidebarComponent } from '../products/product-left-sidebar/product-left-sidebar.component';
import { LoaderService } from '../../shared/services/loader.service';
import { CommonService } from '../../shared/services/common.service';
import { map } from 'rxjs/operators';
import { SearchCategory } from 'src/app/modals/search-category';
import { AlertService } from '../../shared/services/alert.service';

@Component({
  selector: 'app-home-two',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.scss']
})
export class MainDashboard implements OnInit {
  products: Product[];
  public banners = [];
  SerachCategory = {} as SearchCategory
  shoppingCartItems: CartItem[] = [];
  wishlistItems: Product[] = [];

  public featuredProducts: Array<Product>;
  public onSaleProducts: Array<Product>;
  public topRatedProducts: Array<Product>;
  public newArrivalsProducts: Array<Product>;

  showCarousel: boolean = false;
  @ViewChild(ProductLeftSidebarComponent, { static: false }) MenuItem: ProductLeftSidebarComponent
  public slides = [];
  siteID = localStorage.getItem(("siteId"))
  productSlide: any = []
  newSlide: any = []
  constructor(private productService: ProductService, private cartService: CartService,
    private homePageService: HomePageService, public loaderService: LoaderService,
    private commonservice: CommonService,private alertservice: AlertService) {


  }

  ngOnInit() {
    this.cartService.getItems().subscribe(shoppingCartItems => this.shoppingCartItems = shoppingCartItems);
    this.FetchBannerImages();
    this.commonservice.getProducts().pipe(map(() => {
      this.FetchForSectionImages();
    })).subscribe()
    this.commonservice.getFeatured().pipe(map(() => {
      this.FetchBannerImages();
    })).subscribe()
    this.commonservice.getHome().pipe(map(() => {
      this.FetchBannerImages();
    })).subscribe()
    this.commonservice.getSearchCategory().pipe(map((featuredItem) => {
      this.SerachCategory = featuredItem
      this.FetchForProductCategoryImages()
    })).subscribe()
    this.commonservice.getROI().pipe(map(() => {
      this.FetchBannerImages();
    })).subscribe()
  }


  FetchBannerImages() {
    this.loaderService.showLoader()
    this.slides = []
    this.homePageService.FetchBannerImages(this.siteID).subscribe({
      next: (response: any) => {
        if (response.statusCode == 200) {
          this.slides.push("data:image/jpg;base64," + response.data[0].bannerImage, "data:image/jpg;base64," + response.data[0].homepageImage1, "data:image/jpg;base64," + response.data[0].homepageImage2)
          this.showCarousel = true
          this.loaderService.hideLoader();
        } else {
        }
      },
      complete: () => {
      },
      error: (err: any) => {
        this.alertservice.error()
      }
    })
  }


  FetchForSectionImages() {
    this.slides = []
    this.loaderService.showLoader()
    var obj = {
      "siteID": this.siteID,
      "section": 2,
      "systemUser": 0
    }

    this.homePageService.FetchForSectionImages(obj).subscribe({
      next: (response: any) => {
        if (response.statusCode == 200) {
          this.slides.push("data:image/jpg;base64," + response.data[0].sectionImage1)
          this.showCarousel = true
          this.loaderService.hideLoader();
        } else {
        }
      },
      complete: () => {
      },
      error: (err: any) => {
        this.alertservice.error()
      }
    })
  }



  FetchForProductCategoryImages() {
    this.loaderService.showLoader()
    this.slides = []
    var obj = {
      "siteID": this.siteID,
      "systemUser": 0,
      "aProductCategory": this.SerachCategory
    }
    this.homePageService.FetchForProductCategoryImages(obj).subscribe({
      next: (response: any) => {
        if (response.statusCode == 200) {
          this.slides.push("data:image/jpg;base64," + response.data[0].productCategoryImage,
            "data:image/jpg;base64," + response.data[0].categoryImage1, "data:image/jpg;base64," + response.data[0].categoryImage2,
            "data:image/jpg;base64," + response.data[0].categoryImage3, "data:image/jpg;base64," + response.data[0].categoryImage4)
          this.slides = this.slides.filter(element => {
            return element !== "data:image/jpg;base64,null";
          });
          this.showCarousel = true
          this.loaderService.hideLoader();
        } else {
        }
      },
      complete: () => {
      },
      error: (err: any) => {
        this.alertservice.error()
      }
    })
  }
}
