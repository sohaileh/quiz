import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/modals/product.model';
import { ProductService } from 'src/app/components/shared/services/product.service';

@Component({
  selector: 'app-popular-products',
  templateUrl: './popular-products.component.html',
  styleUrls: ['./popular-products.component.scss']
})

export class PopularProductsComponent implements OnInit {
  @Input('product') product: Array<Product> = [];
  // public products: Product[];
  // public product            :   Product = {};
 
   constructor(private productService: ProductService) { }
 
   ngOnInit() {
    //  this.productService.getProducts().subscribe(product => this.products = product);
    // console.log(this.product)
   }
}
