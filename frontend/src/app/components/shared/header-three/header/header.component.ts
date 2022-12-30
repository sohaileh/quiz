import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from 'src/app/modals/product.model';
import { CartItem } from 'src/app/modals/cart-item';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/components/admin/services/admin.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  
quizId:any;
showMenu: boolean;
  
  constructor(private router:Router, private adminService:AdminService) {
    this.adminService.menu$.subscribe({
      next:(response)=>{
        this.showMenu=response
        this.quizId= localStorage.getItem('quizId')
      }
     })
  }
  
  ngOnInit() {
   
  }
 passPrint(event:any){
  // console.log(event)
    this.adminService.passValue(event);
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
