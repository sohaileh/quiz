import { Component, OnInit, ViewChild, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { Product } from 'src/app/modals/product.model';
import { ProductService } from 'src/app/components/shared/services/product.service';
import { ActivatedRoute, NavigationExtras, Params, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CartService } from 'src/app/components/shared/services/cart.service';
import { ProductZoomComponent } from './product-zoom/product-zoom.component';
import { HomePageService } from '../../services/home-page.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Subject } from 'rxjs/internal/Subject';
import { map, takeUntil } from 'rxjs/operators';
import { LoaderService } from 'src/app/components/shared/services/loader.service';
import { CommonService } from 'src/app/components/shared/services/common.service';
//swiper
import SwiperCore, { SwiperOptions, Autoplay, Pagination, Keyboard } from 'swiper';
SwiperCore.use([Keyboard, Pagination]);


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  //swiper config
  config: SwiperOptions = {
    // observer: true,
    slidesPerView: 3,
    spaceBetween: 10,
    keyboard: true,
    navigation: true,
    pagination: false,
    grabCursor: true,
    loop: false,
    preloadImages: false,
    lazy: true,
    breakpoints: {
      480: {
        slidesPerView: 1
      },
      740: {
        slidesPerView: 2,
      },
      960: {
        slidesPerView: 3,
      },
      1280: {
        slidesPerView: 3,
      },


    }



  };

  public product: Product = {};
  public products: Product[] = [];
  public counter: number = 1;
  index: number;
  aCatalog: any = localStorage.getItem("siteCatalog")
  siteID = localStorage.getItem(("siteId"))
  sectionDetails: any = []
  section: any = 2
  items: any = []
  relatedItems: any = []
  catalogItem: any
  category: any
  itemDetails: any = {}
  address: any = []
  images: any = []
  match: any;
  desc: any;
  show: boolean = false
  description: string;
  hideText: boolean = true;
  flag: boolean = false
  model: any = {};
  productMainImage: any;
  cartDetails: any = {};

  private unsubscribeAll$: Subject<void> = new Subject();

  constructor(
    private homPageService: HomePageService,
    private activatedRoute: ActivatedRoute,
    private route: ActivatedRoute,
    public productsService: ProductService,
    public dialog: MatDialog,
    private router: Router,
    private cartService: CartService,
    public loaderService: LoaderService,
    private commonservice: CommonService) {
  }

  ngOnInit() {
    this.route.params.pipe(takeUntil(this.unsubscribeAll$)).subscribe(params => {
      this.loaderService.showLoader()
      this.catalogItem = params["catalogItem"]
      this.category = params["productCategory"]
      // this.hideImage = true;
      this.hideText = true;
      this.show = false;
      this.relatedItems = ""
      this.FetchCatalogItemFeaturedTop5();
      this.FetchForCatalogItemThumbnails();
      this.FetchSections();
      this.FetchForCatalogItem();
      this.FetchForCatalogItemAddress();
      this.FetchForRelatedItems();
      this.fetchForCatalogItemInStock();
      // var magnifier = document.getElementById("zoomImage");
      // if (magnifier) {
      //   magnifier.remove();
      // }
    });
    this.commonservice.getHome().pipe(map((featuredItem) => {
      if (featuredItem == true) {
        const navigationExtras: NavigationExtras = {
          queryParams: {
            action: "home"
          }
        }
        this.router.navigate(["/home/dashboard"], navigationExtras)
      }
    })).subscribe()

    this.commonservice.getFeatured().pipe(map((featuredItem) => {
      if (featuredItem == true) {
        const navigationExtras: NavigationExtras = {
          queryParams: {
            action: "featured"
          }
        }
        this.router.navigate(["/home/dashboard"], navigationExtras)
      }
    })).subscribe()

    this.commonservice.getProducts().pipe(map((featuredItem) => {
      if (featuredItem.details == true) {
        const navigationExtras: NavigationExtras = {
          queryParams: {
            action: "products"
          }
        }
        this.router.navigate(["/home/dashboard"], navigationExtras)
      }
    })).subscribe()

    this.commonservice.getROI().pipe(map((featuredItem) => {
      if (featuredItem.details == true) {
        const navigationExtras: NavigationExtras = {
          queryParams: {
            action: "ROI"
          }
        }
        this.router.navigate(["/home/dashboard"], navigationExtras)
      }
    })).subscribe()
  }





  // public openProductDialog(product, bigProductImageIndex) {
  //   let dialogRef = this.dialog.open(ProductZoomComponent, {
  //     data: { product, index: bigProductImageIndex },
  //     panelClass: 'product-dialog',
  //   });
  //   dialogRef.afterClosed().subscribe(product => {
  //     if (product) {
  //       this.router.navigate(['/products', product.id, product.name]);
  //     }
  //   });
  // }


  // public selectImage(index) {
  //   console.log(this.product)
  //   console.log(index)
  //   this.bigProductImageIndex = index;
  // }


  // Add to cart
  public buyNow(product: Product, quantity) {
    if (quantity > 0)
      this.cartService.addToCart(product, parseInt(quantity));
    this.router.navigate(['/pages/checkout']);
  }

  // public onMouseMove(e) {
  //   if (window.innerWidth >= 1280) {
  //     var image, offsetX, offsetY, x, y, zoomer;
  //     image = e.currentTarget;
  //     offsetX = e.offsetX;
  //     offsetY = e.offsetY;
  //     x = offsetX / image.offsetWidth * 100;
  //     y = offsetY / image.offsetHeight * 100;
  //     zoomer = this.zoomViewer.nativeElement.children[0];
  //     if (zoomer) {
  //       zoomer.style.backgroundPosition = x + '% ' + y + '%';
  //       zoomer.style.display = "block";
  //       zoomer.style.height = image.height + 'px';
  //       zoomer.style.width = image.width + 'px';
  //     }
  //   }
  // }

  // public onMouseLeave(event) {
  //   this.zoomViewer.nativeElement.children[0].style.display = "none";
  // }

  // public openZoomViewer() {
  //   this.dialog.open(ProductZoomComponent, {
  //     data: this.zoomImage,
  //     panelClass: 'zoom-dialog'
  //   });
  // }

  FetchSections() {
    this.homPageService.FetchSections(this.siteID).subscribe({
      next: (response: any) => {
        if (response.statusCode == 200) {
          this.sectionDetails = response.data
        } else {
          // alert(response.message)
          // Swal.fire({
          //   icon: 'error',
          //   title: 'Oops...',
          //   text: response.message,
          //   timer: 1500
          // })
        }
      },
      complete: () => {
      },
      error: (err: any) => {
        // Swal.fire({
        //   icon: 'error',
        //   title: 'Oops...',
        //   text: "Something Went Wrong",
        //   timer: 1500
        // })
      }
    })
  }

  FetchForCatalogItem() {
    this.loaderService.showLoader();
    this.homPageService.FetchForCatalogItem(this.catalogItem).subscribe({
      next: (response: any) => {
        if (response.statusCode == 200) {
          this.itemDetails = response.data[0]
          this.product.catalogItemX = this.itemDetails.catalogItemX;
          this.product.smallImage = this.itemDetails.smallImage;
          this.product.productCategory1 = this.itemDetails.productCategory1;
          this.description = this.itemDetails.catalogItemXX;
          this.productMainImage = `data:image/jpg;base64,${this.itemDetails.mediumImage}`;
          var details = this.itemDetails.catalogItemXX,
            delimiter = '.',
            start = 2,
            tokens = details.split(delimiter).slice(0, start),
            result = tokens.join(delimiter); // those.that
          if (result.includes("[MORE]")) {
            let MatchedString = result.substring(0, result.indexOf("[MORE]"));
            MatchedString = MatchedString.replaceAll("[b]", " ")
            MatchedString = MatchedString.replaceAll("[/b]", "")
            MatchedString = MatchedString.replaceAll("<br>", " ")
            MatchedString = MatchedString.replaceAll("<br/>", "")
          } else {
            this.desc = result
          }
          this.loaderService.hideLoader();
        } else {
          // Swal.fire({
          //   icon: 'error',
          //   title: 'Oops...',
          //   text: response.message,
          //   timer: 1500
          // })
        }
        delimiter = '.',
          start = this.description.length,
          tokens = details.split(delimiter).slice(0, start),
          result = tokens.join(delimiter); // those.that
        let MatchedString1 = result;
        MatchedString1 = MatchedString1.replaceAll('[b]', '')
        MatchedString1 = MatchedString1.replaceAll("[/b]", "")
        MatchedString1 = MatchedString1.replaceAll("<br>", " ")
        MatchedString1 = MatchedString1.replaceAll("<br/>", "")
        MatchedString1 = MatchedString1.replaceAll("[MORE]", "")
        this.description = MatchedString1
      },
      complete: () => {
        this.flag = true
        // this.magnify('myimage', 3);
      },
      error: (err: any) => {
        // Swal.fire({
        //   icon: 'error',
        //   title: 'Oops...',
        //   text: "Something Went Wrong",
        //   timer: 1500
        // })
      }
    })
  }

  FetchForCatalogItemAddress() {
    this.homPageService.FetchForCatalogItemAddress(this.catalogItem).subscribe({
      next: (response: any) => {
        if (response.statusCode == 200) {
          this.address = response.data[0]
        } else {
          // Swal.fire({
          //   icon: 'error',
          //   title: 'Oops...',
          //   text: response.message,
          //   timer: 1500
          // })
        }
      },
      complete: () => { },
      error: (err: any) => {
        // Swal.fire({
        //   icon: 'error',
        //   title: 'Oops...',
        //   text: "Something Went Wrong",
        //   timer: 1500
        // })
      }
    })
  }
  FetchForCatalogItemThumbnails() {
    this.loaderService.showLoader();
    this.homPageService.FetchForCatalogItemThumbnails(this.catalogItem).subscribe({
      next: (response: any) => {
        if (response.statusCode == 200) {
          this.images = response.data
        } else {
          // Swal.fire({
          //   icon: 'error',
          //   title: 'Oops...',
          //   text: response.message,
          //   timer: 1500
          // })
        }
        this.loaderService.hideLoader()
      },
      complete: () => { },
      error: (err: any) => {
        // Swal.fire({
        //   icon: 'error',
        //   title: 'Oops...',
        //   text: "Something Went Wrong",
        //   timer: 1500
        // })
      }
    })
  }

  FetchCatalogItemFeaturedTop5() {
    this.homPageService.FetchCatalogItemFeaturedTop5(this.aCatalog, this.section, this.catalogItem, this.category).subscribe({
      next: (response: any) => {
        if (response.statusCode == 200) {
          this.items = response.data
          this.show = true
          let string = this.items[0].catalogItemXX
          if (string.includes("[MORE]")) {
            let MatchedString = string.substring(0, string.indexOf("[MORE]"));
            MatchedString = MatchedString.replaceAll("[b]", " ")
            MatchedString = MatchedString.replaceAll("[/b]", "")
            MatchedString = MatchedString.replaceAll("<br>", " ")
            MatchedString = MatchedString.replaceAll("<br/>", "")
            this.match = MatchedString
          } else {
            var delimiter = '.',
              start = 3,
              tokens = string.split(delimiter).slice(0, start),
              result = tokens.join(delimiter);
            this.match = result
          }
        } else {
          // Swal.fire({
          //   icon: 'error',
          //   title: 'Oops...',
          //   text: response.message,
          //   timer: 1500
          // })
        }
      },
      complete: () => { },
      error: (err: any) => {
        // Swal.fire({
        //   icon: 'error',
        //   title: 'Oops...',
        //   text: "Something Went Wrong",
        //   timer: 1500
        // })
      }
    })
  }

  replaceImage(img: any) {
    this.productMainImage = `data:image/jpg;base64,${img}`;
  }

  // public openProductDialog(product:any) {
  //   this.dialog.open(ImageZoomComponent, {
  //     data: product,
  //     panelClass: 'zoom-dialog'
  //   });
  //   const dialogRef = this.dialog.open(ImageZoomComponent, {
  //     data: product,
  //     width: '640px',
  //     disableClose: true,

  //   });
  //   // dialogRef.afterClosed().subscribe(result => {
  //   //   this.getsubStages()
  //   // });
  // }

  showFull() {
    this.hideText = false
  }

  // magnify(imgID, zoom) {
  //   var img, glass, w, h, bw, src
  //   // src = `data:image/png;base64,${this.itemDetails.mediumImage}`
  //   img = document.getElementById(imgID);
  //   /*create magnifier glass:*/
  //   glass = document.createElement('DIV');
  //   glass.setAttribute('class', 'img-magnifier-glass');
  //   glass.setAttribute('id', 'zoomImage');
  //   /*insert magnifier glass:*/
  //   img.parentElement.insertBefore(glass, img);
  //   /*set background properties for the magnifier glass:*/
  //   glass.style.backgroundImage = "url('" + this.imgSrc + "')";
  //   glass.style.backgroundRepeat = 'no-repeat';
  //   glass.style.backgroundSize =
  //     img.width * zoom + 'px ' + img.height * zoom + 'px';
  //   bw = 3;
  //   w = glass.offsetWidth / 2;
  //   h = glass.offsetHeight / 2;
  //   /*execute a function when someone moves the magnifier glass over the image:*/
  //   glass.addEventListener('mousemove', moveMagnifier);
  //   glass.addEventListener('mouseout', mouseOut);
  //   img.addEventListener('mousemove', moveMagnifier);
  //   img.addEventListener('mouseout', mouseOut);
  //   /*and also for touch screens:*/
  //   glass.addEventListener('touchmove', moveMagnifier);
  //   img.addEventListener('touchmove', moveMagnifier);
  //   var magnifier = document.getElementById("zoomImage");
  //   if (magnifier) {
  //     magnifier.style.display = "none";
  //   }
  //   function mouseOut() {
  //     img = document.getElementById(imgID);
  //     img.style.position = 'relative';
  //     img.style.marginTop = '0';
  //     var magnifier = document.getElementById("zoomImage");
  //     if (magnifier) {
  //       magnifier.style.display = "none";
  //     }
  //   }
  //   function moveMagnifier(e) {
  //     img = document.getElementById(imgID);
  //     img.style.position = 'absolute';
  //     img.style.marginTop = '-28em';
  //     var magnifier = document.getElementById("zoomImage");
  //     if (magnifier) {
  //       magnifier.style.display = "block";
  //     }
  //     var pos, x, y;
  //     /*prevent any other actions that may occur when moving over the image*/
  //     e.preventDefault();
  //     /*get the cursor's x and y positions:*/
  //     pos = getCursorPos(e);
  //     x = pos.x;
  //     y = pos.y;
  //     /*prevent the magnifier glass from being positioned outside the image:*/
  //     if (x > img.width - w / zoom) {
  //       x = img.width - w / zoom;
  //     }
  //     if (x < w / zoom) {
  //       x = w / zoom;
  //     }
  //     if (y > img.height - h / zoom) {
  //       y = img.height - h / zoom;
  //     }
  //     if (y < h / zoom) {
  //       y = h / zoom;
  //     }
  //     /*set the position of the magnifier glass:*/
  //     glass.style.left = x - w + 'px';
  //     glass.style.top = y - h + 'px';
  //     /*display what the magnifier glass "sees":*/
  //     glass.style.backgroundPosition =
  //       '-' + (x * zoom - w + bw) + 'px -' + (y * zoom - h + bw) + 'px';

  //   }
  //   function getCursorPos(e) {
  //     var a,
  //       x = 0,
  //       y = 0;
  //     e = e || window.event;
  //     /*get the x and y positions of the image:*/
  //     a = img.getBoundingClientRect();
  //     /*calculate the cursor's x and y coordinates, relative to the image:*/
  //     x = e.pageX - a.left;
  //     y = e.pageY - a.top;
  //     /*consider any page scrolling:*/
  //     x = x - window.pageXOffset;
  //     y = y - window.pageYOffset;
  //     return { x: x, y: y };
  //   }
  // }

  FetchForRelatedItems() {
    this.model.catalogItem = this.catalogItem;
    this.homPageService.FetchForRelatedItems(this.model).subscribe({
      next: (response: any) => {
        if (response.statusCode == 200) {
          this.relatedItems = response.data
          this.show = true
        } else {
          // Swal.fire({
          //   icon: 'error',
          //   title: 'Oops...',
          //   text: response.message,
          //   timer: 1500
          // })
        }
      },
      complete: () => { },
      error: (err: any) => {
        // Swal.fire({
        //   icon: 'error',
        //   title: 'Oops...',
        //   text: "Something Went Wrong",
        //   timer: 1500
        // })
      }
    })
  }
  getCategory(category: any) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        action: "details.leftSideBar",
        aProductCategory: category.aProductCategory
      }
    }
    this.router.navigate(["/home/dashboard"], navigationExtras)
  }

  // items in stock
  fetchForCatalogItemInStock() {
    this.model.catalogItem = this.catalogItem;
    this.homPageService.FetchForCatalogItemInStock(this.model).subscribe({
      next: (response: any) => {
        if (response.statusCode == 200) {
          this.cartDetails = response.data[0];
       
          this.product = Object.assign(this.product, this.cartDetails);
          this.counter = this.product.defaultQuantity;
        } else {
          this.cartDetails ="";
          // Swal.fire({
          //   icon: 'error',
          //   title: 'Oops...',
          //   text: response.message,
          //   timer: 1500
          // })
        }
      },
      complete: () => { },
      error: (err: any) => {
        // Swal.fire({
        //   icon: 'error',
        //   title: 'Oops...',
        //   text: "Something Went Wrong",
        //   timer: 1500
        // })
      }
    })
  }

  // Add to cart
  public addToCart(product: Product, quantity) {
    if (quantity == 0) return false;
    this.cartService.addToCart(product, parseInt(quantity));
  }
 // increment cart
  public increment() {
    
    if(this.counter >= this.cartDetails.maximumQuantity){
     return
    }

    this.counter += 1;
  }
// decrement cart
  public decrement() {
    if(this.counter <= this.cartDetails.minimumQuantity){
      return
     }
    if (this.counter > 1) {
      this.counter -= 1;
    }
  }

}


