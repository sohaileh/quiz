import { Component, OnInit, Input, EventEmitter, Output, SimpleChanges } from '@angular/core';
import { CartService } from 'src/app/components/shared/services/cart.service';
import { ProductService } from 'src/app/components/shared/services/product.service';
import { WishlistService } from 'src/app/components/shared/services/wishlist.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Product } from 'src/app/modals/product.model';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';
import { map, take, takeLast, takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Output() onOpenProductDialog: EventEmitter<any> = new EventEmitter();
  @Input() product: Product;
  @Input() view: String;
  // view: string = "col-sm-12"
  wishlistItems: any;
  activeItems: any[];
  showFullName: boolean;
  constructor(private cartService: CartService, public productsService: ProductService,
    private wishlistService: WishlistService, private dialog: MatDialog, private router: Router) { }
 
    ngOnChanges(changes: SimpleChanges): void {
      this.view=changes.view.currentValue
       if (this.view === "col-sm-6") {
      this.showFullName = true;
    } else {
      this.showFullName = false;
    }
    // throw new Error('Method not implemented.');
  }





  ngOnInit() {
    this.getWishListItems()
    // let i = 1
    // this.productsService.getview().pipe(map((item) => {
    //   this.view = item
    // })).subscribe()
  }
  // Add to cart
  public addToCart(product: Product, quantity: number = 1) {
    this.cartService.addToCart(product, quantity);
  }
  // Add to wishlist
  public addToWishlist(product: Product) {
    this.wishlistService.addToWishlist(product);
    this.getWishListItems()
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
  getWishListItems(){
    this.wishlistItems= JSON.parse(localStorage.getItem("wishlistItem"))
    this.activeItems =[]
     this.wishlistItems?.forEach((item:any)=>{
       this.activeItems.push(item.catalogItem)
     })
    // console.log(this.activeItems)
  }
  switch(product:any){
    console.log("product",product)
    console.log("activeitems", this.activeItems)
    if(this.activeItems.includes(product.catalogItem)){
      
      this.wishlistService.removeFromWishlist(product)
      this.getWishListItems()
    }else{
      this.wishlistService.addToWishlist(product)
      this.getWishListItems()
    }
  }

}
