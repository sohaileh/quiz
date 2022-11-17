import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import {Product} from "../../modals/product.model";
import {CartItem} from "../../modals/cart-item";
import {ProductService} from "../shared/services/product.service";
import {CartService} from "../shared/services/cart.service";
import { Router, NavigationEnd } from '@angular/router';
import { SidebarMenuService } from '../shared/sidebar/sidebar-menu.service';
import { SidenavMenu } from '../shared/sidebar/sidebar-menu.model';
import { HomePageService } from '../shop/services/home-page.service';
import { AuthService } from '../auth/services/auth.service';
import { element } from 'protractor';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

firstName:any;
lastName:any;
enableProfile=null;
userRole=null
sidenav:SidenavMenu[]=[{
  displayName:'Home',
  iconName:'home',
  route:'/home/dashboard'
}]

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

  public banners = [];

  wishlistItems  :   Product[] = [];

  public url : any;

  navItems: SidenavMenu[] = [
    {
      displayName: 'Home',
      iconName: 'home',
      route:"/home/dashboard"
      // path:"/home/two"
      // children: [
      //   {
      //     displayName: 'Home-1',
      //     iconName: 'group',
      //     route: '/home/one'
      //   },
      //   {
      //     displayName: 'Home-2',
      //     iconName: 'speaker_notes',
      //     route: '/home/two',
      //   },
      //   {
      //     displayName: 'Home-3',
      //     iconName: 'feedback',
      //     route: '/home/three'
      //   }
      // ]
    },
    // {
    //   displayName: 'My Profile',
    //       iconName: 'user',
    //       // route:"/home/featuredItems"
    //       // route: '/home/products/all'
    // },
    // {
    //   displayName: 'Sign in',
    //   iconName: 'user',
    //   route:'/auth/login'
      
    // },
    // {
    //   displayName: 'Register',
    //   iconName: 'user-plus',
    //   route:'/auth/register'
      
    // },
    {
      displayName: 'Add Quiz',
      iconName: 'plus',
      route:'/admin/quiz/add-quiz'
      
    },
    {
      displayName: 'My Quizzes',
      iconName: 'plus',
      route:'/quiz/my-quizzes'
      
    },
    // {
    //   displayName: 'Winner Accouncement',
    //   iconName: 'fa-trophy',
    //   route:'/auth/register'
      
    // },
    // {
    //   displayName: 'Rest Of India',
    //   iconName: 'language',
     
    // },
   
  ];
  baseURL: any = "kashmirsearch.com"
  headerDetails: any = []
  site: Number = 57
  constructor(private authService:AuthService, public router: Router, private cartService: CartService,
     public sidenavMenuService:SidebarMenuService,private homePageService:HomePageService) {
    this.cartService.getItems().subscribe(shoppingCartItems => this.shoppingCartItems = shoppingCartItems);
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.url = event.url;
      }
    } )
  }

  ngAfterViewInit() {
  }

  ngOnInit() {
    this. FetchForBaseUrl();
    this.currency = this.currencies[0];
    this.flag = this.flags[0];

    this.authService.userDetails.subscribe((response:any)=>{
      // this.enableProfile= response.enableProfile;
      this.enableProfile= localStorage.getItem('enableProfile')
      this.userRole=localStorage.getItem('userRole')
      // this.firstName = localStorage.getItem('firstName')
      // this.lastName = localStorage.getItem('lastName')

      if(this.enableProfile){
        // this.firstName=response?.user?.firstName
        // this.lastName= response?.user?.lastName
        this.firstName= localStorage.getItem('firstName')
        this.lastName= localStorage.getItem('lastName')
      }else{
        this.firstName='';
        this.lastName='';
      }
      if(this.userRole=='admin'){
        this.sidenav=(this.navItems.filter((element)=> element?.route?.includes("admin")))
      }else{
        if(this.userRole === 'user'){
          this.sidenav=(this.navItems.filter((element)=>element?.route?.includes('quiz/my-quizzes')))
        }
      }

      if(this.userRole==null){
        this.sidenav = (this.navItems.filter((element)=>element?.route?.includes("home/dashboard")))
      }

    })
  }

  public changeCurrency(currency){
    this.currency = currency;
  }
  public changeLang(flag){
    this.flag = flag;
  }
  FetchForBaseUrl() {
    this.homePageService.FetchForBaseUrl(this.baseURL).subscribe({
      next: (response: any) => {
        if (response.statusCode == 200) {
          this.headerDetails = response.data
          this.site = this.headerDetails[0]?.site
          localStorage.setItem('siteId', response.data[0].site)
          localStorage.setItem('siteCatalog', response.data[0].siteCatalog)
        } else {
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

}
