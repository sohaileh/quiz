import { Component, OnInit } from "@angular/core";
import { Product } from "src/app/modals/product.model";
import { CartItem } from "src/app/modals/cart-item";
import { CartService } from "../services/cart.service";
import { FormControl } from "@angular/forms";
import { CommonService } from "../services/common.service";
import { NavigationEnd, NavigationStart, Router } from "@angular/router";
import { AuthService } from "../../auth/services/auth.service";

@Component({
  selector: "app-header-two",
  templateUrl: "./header-two.component.html",
  styleUrls: ["./header-two.component.scss"],
})
export class HeaderTwoComponent implements OnInit {
  public sidenavMenuItems: Array<any>;
  shoppingCartItems: CartItem[] = [];
  searchInput: FormControl;
  url: string;
  user: any = {};
  userId: any;
  firstName: any;
  lastName: any;
  firstCharacter: any;
  secondCharacter: any;
  enableProfile = null;
  constructor(
    public router: Router,
    private cartService: CartService,
    private commonservice: CommonService,
    private authService: AuthService
  ) {
    this.cartService
      .getItems()
      .subscribe(
        (shoppingCartItems) => (this.shoppingCartItems = shoppingCartItems)
      );
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.url = event.url;
      }
    });

  
  
  }
  ngOnInit() {
    this.searchInput = new FormControl();
    this.userId = localStorage.getItem("userId");
    this.authService.userDetails.subscribe((response: any) => {
      // this.firstName=response?.user?.firstName;
      //  this.lastName=response?.user?.lastName;
      //  this.enableProfile=response?.enableProfile
      this.firstName = localStorage.getItem("firstName");
      this.enableProfile = localStorage.getItem("enableProfile");
    });
  }
  logout() {
    this.router.navigate(["/auth/login"]);
    this.authService.logout();
  }
  changePassword() {
    this.router.navigate(["/register"]);
  }
  search() {
    this.commonservice.setSearch(this.searchInput.value);
    console.log(this.searchInput.value);
  }
  scroll(id: string) {
    let el = document.getElementById(id);
    el!.scrollIntoView();
  }
  

}
