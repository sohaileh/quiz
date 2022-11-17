import { Component, OnInit, Input, Output, EventEmitter, ViewChild, SimpleChanges, SimpleChange } from '@angular/core';
import { Product } from 'src/app/modals/product.model';
import { CartService } from 'src/app/components/shared/services/cart.service';
import { ProductService } from 'src/app/components/shared/services/product.service';
import { WishlistService } from 'src/app/components/shared/services/wishlist.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProductDialogComponent } from '../../products/product-dialog/product-dialog.component';
import SwiperCore, { SwiperOptions, Keyboard, Pagination, Navigation, Virtual, Autoplay } from 'swiper';
import { first } from 'rxjs';

SwiperCore.use([Keyboard, Pagination, Navigation, Virtual, Autoplay,]);
@Component({
  selector: 'app-product-carousel-three',
  templateUrl: './product-carousel-three.component.html',
  styleUrls: ['./product-carousel-three.component.scss']
})
export class ProductCarouselThreeComponent implements OnInit {
  config = {
    slidesPerView: 4,
    spaceBetween: 1,
    navigation: true,
    keyboard: {
      enabled: true
    },
    virtual: true,
    grabCursor: true,
    loop: false,
    lazy: true,
    

  };
  @Output() onOpenProductDialog: EventEmitter<any> = new EventEmitter();
  // @Input('product') product: Array<Product> = [];
 @Input() product:[];
 
  constructor(private cartService: CartService, private productsService: ProductService, private wishlistService: WishlistService, private dialog: MatDialog, private router: Router) { 
  
  }
  // @ViewChild(SwiperDirective) directiveRef: SwiperDirective;

  
  
  
  ngOnInit() {
    
    
  
  }
  ngOnChanges(changes: SimpleChanges) {
    if(!changes.product.firstChange && changes.product.currentValue.length <= 4 ){
      // console.log(changes.product.currentValue.length)
      this.config.slidesPerView = changes.product.currentValue.length - 1 ;
        this.config.spaceBetween =1;
    }
  }
  // ngOnDestroy(){
  //   this.ngOnChanges.complete();
  // }
  // Add to cart
  public addToCart(product: Product, quantity: number = 1) {
    this.cartService.addToCart(product, quantity);
  }

  // Add to wishlist
  public addToWishlist(product: Product) {
    this.wishlistService.addToWishlist(product);
  }

  // Add to compare
  public addToCompare(product: Product) {
    this.productsService.addToCompare(product);
  }


  public openProductDialog(product) {
    let dialogRef = this.dialog.open(ProductDialogComponent, {
      data: product,
      panelClass: 'product-dialog',
    });
    dialogRef.afterClosed().subscribe(product => {
      if (product) {
        this.router.navigate(['/products', product.id, product.name]);
      }
    });
  }
  scroll(id: string) {
    let el = document.getElementById(id);
    el!.scrollIntoView();
  }
}
function ngOnDestroy() {
  throw new Error('Function not implemented.');
}

