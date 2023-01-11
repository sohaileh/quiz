import { Component, OnInit, ViewChild } from "@angular/core";
import { Product } from "src/app/modals/product.model";
import { CartItem } from "src/app/modals/cart-item";
import { CartService } from "../services/cart.service";
import { ActivatedRoute, Router } from "@angular/router";
import { AdminService } from "../../admin/services/admin.service";
import { GroupServiceService } from "../../admin/groups/services/group-service.service";

@Component({
  selector: "app-header-three",
  templateUrl: "./header-three.component.html",
  styleUrls: ["./header-three.component.scss"],
})
export class HeaderThreeComponent implements OnInit {
  public sidenavMenuItems: Array<any>;

  public currencies = ["USD", "EUR"];
  public currency: any;
  public flags = [
    { name: "English", image: "assets/images/flags/gb.svg" },
    { name: "German", image: "assets/images/flags/de.svg" },
    { name: "French", image: "assets/images/flags/fr.svg" },
    { name: "Russian", image: "assets/images/flags/ru.svg" },
    { name: "Turkish", image: "assets/images/flags/tr.svg" },
  ];
  public flag: any;

  products: Product[];

  indexProduct: number;
  shoppingCartItems: CartItem[] = [];
  user: any = {};
  dataSource: any;
  totalUsers: any;
  userId: any={};
  emailAddress={}
  organizationId: string;
totalGroups:any;
  groupName: any;
  groupId:any;
  // @ViewChild(ProductLeftSidebarComponent,{static:false}) MenuItem:ProductLeftSidebarComponent
  constructor(
    private cartService: CartService,
    public router: Router,
    private adminService: AdminService,
    private route:ActivatedRoute,
    private groupService:GroupServiceService,
  
  ) {
    this.cartService
      .getItems()
      .subscribe(
        (shoppingCartItems) => (this.shoppingCartItems = shoppingCartItems)
      );
  }

  ngOnInit() {
    this.groupId=this.route.snapshot.queryParamMap.get("groupId")
    this.groupService.getGroup(this.groupId).subscribe((res:any)=>{
      for (const { groupName: n} of res) {
        this.groupName=n;
      }
    })
    this.currency = this.currencies[0];
    this.flag = this.flags[0];
    this.adminService.organizationUsers$.subscribe({
      next:(response:any)=>{
      this.totalUsers = response.length+1
      },
      error:(error)=>{},
      complete:()=>{}
    })
    this.getOrganizationUsers();
    this.userId = this.route.snapshot.queryParamMap.get('id')
    if(this.userId){
      this.adminService.getUserDetails(this.userId).subscribe({
        next:(resposne:any)=>{
            this.emailAddress = resposne.emailAddress
        }
      })
    }
   this.getGroups()
  }
  getLoggedUser() {
    this.user.id = this.userId;
    this.adminService.getLoggedUser(this.user).subscribe((res: any) => {
      this.loggedUser = res;
      this.getOrganizationUsers();
    });
  }

  getOrganizationUsers() {
    this.user.organizerId = localStorage.getItem("userId");
    this.adminService.getOrganizationUsers(this.user).subscribe((res: any) => {
      // res.push(this.loggedUser);
      this.totalUsers = res.length;
    });
  }
  loggedUser(loggedUser: any) {
    throw new Error("Method not implemented.");
  }
  public changeCurrency(currency) {
    this.currency = currency;
  }
  public changeLang(flag) {
    this.flag = flag;
  }
  getGroups() {
    this.organizationId = localStorage.getItem("userId");
    this.groupService.getGroups(this.organizationId).subscribe((res: any) => {
   this.totalGroups=res.length
    });
  }
}
