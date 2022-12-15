import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from 'src/app/modals/product.model';
import { CartItem } from 'src/app/modals/cart-item';
import { CartService } from '../services/cart.service';
import { AdminService } from '../../admin/services/admin.service';

@Component({
  selector: 'app-header-four',
  templateUrl: './header-four.component.html',
  styleUrls: ['./header-four.component.scss']
})
export class HeaderFourComponent implements OnInit {

  public currencies = ['USD', 'EUR'];
  public currency:any;
  public flags = [
    { name:'English', image: 'assets/images/flags/gb.svg' },
    { name:'German', image: 'assets/images/flags/de.svg' },
    { name:'French', image: 'assets/images/flags/fr.svg' },
    { name:'Russian', image: 'assets/images/flags/ru.svg' },
    { name:'Turkish', image: 'assets/images/flags/tr.svg' }
  ]
  public flag:any;

  products: Product[];
  indexProduct: number;
  public sidenavMenuItems:Array<any>;
  shoppingCartItems: CartItem[] = [];
  quizId: any;
  quizTitle: any;
  quizStatus: any;
  // @ViewChild(ProductLeftSidebarComponent,{static:false}) MenuItem:ProductLeftSidebarComponent
  constructor(private cartService: CartService, private adminService:AdminService) {
    this.cartService.getItems().subscribe(shoppingCartItems => this.shoppingCartItems = shoppingCartItems);
   }

  ngOnInit() {
    this.currency = this.currencies[0];
    this.flag = this.flags[0];
    this.quizId= localStorage.getItem('quizId')
    this.adminService.getQuizQuestions(this.quizId).subscribe({
      next:(response:any)=>{
        this.quizTitle=response.quizTitle
        this.quizStatus= response.status
      },
      error:(error)=>{
        console.log(error.error.message)
      },
      complete:()=>{}
    })
  }
  public changeCurrency(currency){
    this.currency = currency;
  }
  public changeLang(flag){
    this.flag = flag;
  }

}
