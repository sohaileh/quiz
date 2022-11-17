import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { CartItem } from 'src/app/modals/cart-item';
import { CartService } from '../../shared/services/cart.service';
import { CommonService } from '../../shared/services/common.service';

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.scss']
})
export class ViewCartComponent implements OnInit {

  public cartItems : Observable<CartItem[]> = of([]);
  public shoppingCartItems  : CartItem[] = [];
  config: any;
  constructor(private cartService: CartService,private commonservice:CommonService,
    private router:Router) { 
     
    }

  ngOnInit() {
    this.cartItems = this.cartService.getItems();
    this.cartItems.subscribe(shoppingCartItems => this.shoppingCartItems = shoppingCartItems);
    //pagination
    this.config = {
      itemsPerPage: 4,
      currentPage: 1,
      totalItems: this.shoppingCartItems.length
    };
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


    // Remove cart items
    public removeItem(item: CartItem) {
      this.cartService.removeFromCart(item);
      //pagination
      this.config = {
        itemsPerPage: 4,
        currentPage: 1,
        totalItems: this.shoppingCartItems.length
      };
    }


   // Increase Product Quantity
   public increment(product: any, quantity: number = 1) {
    this.cartService.updateCartQuantity(product,quantity);
  }

  // Decrease Product Quantity
  public decrement(product: any, quantity: number = -1) {
    this.cartService.updateCartQuantity(product,quantity);
  }
   // Get Total
   public getTotal(): Observable<number> {
    return this.cartService.getTotalAmount();
  }
  //pagination of cart
  pageChanged(event){
  this.config.currentPage = event;
}
}
