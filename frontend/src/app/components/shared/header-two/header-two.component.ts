import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/modals/product.model';
import { CartItem } from 'src/app/modals/cart-item';
import { CartService } from '../services/cart.service';
import { FormControl } from '@angular/forms';
import { CommonService } from '../services/common.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { AdminService } from '../../admin/services/admin.service';

@Component({
  selector: 'app-header-two',
  templateUrl: './header-two.component.html',
  styleUrls: ['./header-two.component.scss']
})
export class HeaderTwoComponent implements OnInit {
  public sidenavMenuItems:Array<any>;
  shoppingCartItems: CartItem[] = [];
  searchInput:FormControl
  url: string;
  user:any={}
  userId:any
  firstName:any;
  lastName:any;
  firstCharacter:any;
  secondCharacter:any;
  enableProfile= null
  quizId:any
  showMenu:boolean
  

  constructor(public router:Router,private authService:AuthService,private route:ActivatedRoute,private adminService:AdminService) {
    // this.cartService.getItems().subscribe(shoppingCartItems => this.shoppingCartItems = shoppingCartItems);
    // this.router.events.subscribe((event) => {
    //   if (event instanceof NavigationEnd) {
    //     this.url = event.url;   
    //   }

    // }
    //  )
    this.adminService.menu$.subscribe({
      next:(response)=>{
        this.showMenu=response
        this.quizId= localStorage.getItem('quizId')
      }
     })
    
     
   }

  ngOnInit() {
    this.searchInput=new FormControl()
    this.userId=localStorage.getItem('userId');
    this.authService.userDetails.subscribe((response:any)=>{
              this.firstName= localStorage.getItem('firstName')
              this.enableProfile= localStorage.getItem('enableProfile')
    })
  
  
  }


logout()
{
  this.router.navigate(['/auth/login'])
this.authService.logout()

}  

changePassword(){
  this.router.navigate(['/register'])
}



  // search(){
  // this.commonservice.setSearch(this.searchInput.value)
  // console.log(this.searchInput.value)
  // }
  scroll(id: string) {
    let el = document.getElementById(id);
    el!.scrollIntoView();
  }

  create(){
    this.router.navigate([`/admin/quiz/add-quiz/${this.quizId}`])
  }
  configure(){
    this.router.navigate([`/admin/quiz/configure/${this.quizId}`])
  }
  preview(){
    const userId = localStorage.getItem('userId')
    this.router.navigate([`admin/quiz/quiz-preview/${this.quizId}`],{queryParams:{userId:userId}})
  }
  publish(){
    this.router.navigate([`quiz/publish-quiz/${this.quizId}`])
  }

}
