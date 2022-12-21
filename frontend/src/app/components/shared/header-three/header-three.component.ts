import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from 'src/app/modals/product.model';
import { CartItem } from 'src/app/modals/cart-item';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';
import { AdminService } from '../../admin/services/admin.service';

@Component({
  selector: 'app-header-three',
  templateUrl: './header-three.component.html',
  styleUrls: ['./header-three.component.scss']
})
export class HeaderThreeComponent implements OnInit {

  public sidenavMenuItems:Array<any>;

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
  shoppingCartItems: CartItem[] = [];
  user: any={};
  dataSource: any;
  totalUsers: any;

  // @ViewChild(ProductLeftSidebarComponent,{static:false}) MenuItem:ProductLeftSidebarComponent
  constructor(private cartService: CartService, public router:Router,private adminService: AdminService) {
    this.cartService.getItems().subscribe(shoppingCartItems => this.shoppingCartItems = shoppingCartItems);
  }

  ngOnInit() {
    this.currency = this.currencies[0];
    this.flag = this.flags[0];
    this.getOrganizationUsers()
  }
  getOrganizationUsers() {
    this.user.organizationId = localStorage.getItem("userId");
    this.adminService.getOrganizationUsers(this.user).subscribe((res: any) => {
      this.totalUsers=res.length;
      // this.dataSource =res;
      // console.log(this.dataSource.filteredData.length)
    });
  }
  loggedUser(loggedUser: any) {
    throw new Error('Method not implemented.');
  }
  public changeCurrency(currency){
    this.currency = currency;
  }
  public changeLang(flag){
    this.flag = flag;
  }

}
