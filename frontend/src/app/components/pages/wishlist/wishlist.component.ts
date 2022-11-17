import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from 'src/app/modals/product.model';
import { CartService } from '../../shared/services/cart.service';
import { CommonService } from '../../shared/services/common.service';
import { WishlistService } from '../../shared/services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {

  public product        :   Observable<Product[]> = of([]);
  wishlistItems  :   Product[] = [];
  wishListModel:any
  page = 2;
  config:any
  constructor(private cartService: CartService, private wishlistService: WishlistService,
    private commonservice:CommonService,
    private router:Router) {
    this.product = this.wishlistService.getProducts();
    this.product.subscribe(products => this.wishlistItems = products);
    this.config={
      itemsPerPage:3,
      currentPage:1,
      totalItems:this.wishlistItems.length
    }
  }

  ngOnInit() {
    console.log(this.wishlistItems)

    this.commonservice.getHome().pipe(map((featuredItem) => {
      // console.log(featuredItem)
       if(featuredItem==true){
         const navigationExtras:NavigationExtras={
           queryParams:{
             action:"home"
           }
         }
         this.router.navigate(["/home/dashboard"],navigationExtras)
       }
     })).subscribe()

     this.commonservice.getFeatured().pipe(map((featuredItem) => {
      if(featuredItem==true){
        const navigationExtras:NavigationExtras={
          queryParams:{
            action:"featured"
          }
        }
        this.router.navigate(["/home/dashboard"],navigationExtras)
      }
    })).subscribe()

    this.commonservice.getProducts().pipe(map((featuredItem) => {
      console.log(featuredItem)
       if(featuredItem.details==true){
         const navigationExtras:NavigationExtras={
           queryParams:{
             action:"products"
           }
         }
         this.router.navigate(["/home/dashboard"],navigationExtras)
       }
     })).subscribe()

     this.commonservice.getROI().pipe(map((featuredItem) => {
      console.log(featuredItem)
       if(featuredItem.details==true){
         const navigationExtras:NavigationExtras={
           queryParams:{
             action:"ROI"
           }
         }
         this.router.navigate(["/home/dashboard"],navigationExtras)
       }
     })).subscribe()
  }

   // Add to cart
 public addToCart(product: Product,  quantity: number = 1) {
  if (quantity > 0)
   this.cartService.addToCart(product,quantity);
   this.wishlistService.removeFromWishlist(product);
}

// Remove from wishlist
public removeItem(product: Product) {
 this.wishlistService.removeFromWishlist(product);
 this.config={
  itemsPerPage:3,
  currentPage:1,
  totalItems:this.wishlistItems.length
}
}
clearAll(){
  this.wishlistService.clearAll()
  this.wishlistItems=[]
}
onPageChange(event: any) {
  this.config.currentPage=event
  // this.page = event;
  // this.wishListModel.pageNumber = this.page
  // }
}
}
