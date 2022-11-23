import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { CommonService } from '../services/common.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  siteID = localStorage.getItem(("siteId"))
  sectionDetails: any = []
  userRole:any;
  myQuiz=false

  
  constructor( private commonservice: CommonService,
    private authService:AuthService,
    private router: Router) {
  }

  ngOnInit() {
    this.authService.userDetails.subscribe((response:any)=>{
        this.userRole= localStorage.getItem('userRole')
        console.log('userRole',this.userRole)
        if(this.userRole=='user'){
          this.myQuiz=true
        }else{
          if(this.userRole===null){
            this.myQuiz=false
          }
        }
    })
  }

  openMegaMenu() {
    let pane = document.getElementsByClassName('cdk-overlay-pane');
    [].forEach.call(pane, function (el) {
      if (el.children.length > 0) {
        if (el.children[0].classList.contains('mega-menu')) {
          el.classList.add('mega-menu-pane');
        }
      }
    });
  }
  getHome() {
    var details = true
    // this.commonservice.setHome(details)
    this.router.navigate(['/home/dashboard'])
  }

  getFeatured() {
    var details = true
    this.commonservice.setFeatured(details)
  }
  getMenuItems(menuItem: any) {
    if (menuItem == "Products") {
      this.getProducts();
    } else {
      this.getROI();
    }
  }


  getProducts() {
    var obj = {
      details: true,
      activeTask: "Products",
      aSection: 2
    }
    this.commonservice.setProducts(obj)

  }
  getROI() {
    var obj = {
      details: true,
      activeTask: "ROI",
      aSection: 39,
    }
    this.commonservice.setROI(obj)
  }

}
