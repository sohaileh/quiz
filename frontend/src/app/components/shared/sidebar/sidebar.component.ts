import { Component, OnInit, HostBinding, Input } from '@angular/core';
import { SidebarMenuService } from './sidebar-menu.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { SidenavMenu } from './sidebar-menu.model';
import { Router } from '@angular/router';
import { HomePageService } from '../../shop/services/home-page.service';
import { CommonService } from '../services/common.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({ transform: 'rotate(0deg)' })),
      state('expanded', style({ transform: 'rotate(180deg)' })),
      transition('expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ])
  ]
})
export class SidebarComponent implements OnInit {
  expanded: boolean;
  sectionDetails: any = []
  site = 57
  // @HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;
  @Input() item: SidenavMenu;
  @Input() depth: number;

  constructor(private sidenavMenuService: SidebarMenuService, public router: Router,
    private homePageService: HomePageService,private commonservice: CommonService) {
    // console.log("item:",this.item)
    if (this.depth === undefined) {
      this.depth = 0;
    }
  }

  ngOnInit() {
    // this.FetchSections()
    this.sidenavMenuService.currentUrl.subscribe((url: string) => {
      if (this.item.route && url) {
        // console.log(`Checking '/${this.item.route}' against '${url}'`);
        this.expanded = url.indexOf(`/${this.item.route}`) === 0;
        // this.ariaExpanded = this.expanded;
        // console.log(`${this.item.route} is expanded: ${this.expanded}`);
      }
    });
  }
  onItemSelected(item: SidenavMenu) {
    // console.log(item)
    if (item.displayName == "Home") {
      this.getHome();
    } else if (item.displayName == "Featured") {
      this.getFeatured();
    } else if (item.displayName == "Products") {
      this.getProducts()
    } else {
      this.getROI();
    }


    if (!item.children || !item.children.length) {
      this.router.navigate([item.route]);
    }
    if (item.children && item.children.length) {
      this.expanded = !this.expanded;
    }

  }

  getFeatured() {
    var featuredObj = {
       aSiteCatalog: localStorage.getItem("siteCatalog") || 52891,
       aSection: 0,
       aPageNumber: 1,
       aPageSize: 12,
       systemUser: 0
     }
     this.commonservice.setFeatured(featuredObj)
   }
   getProducts(){
     var productObj = {
       aSiteCatalog: localStorage.getItem("siteCatalog") || 52891,
       aSection: 2,
       aPageNumber: 1,
       aPageSize: 12,
       systemUser: 0,
       activeTask:"Products"
     }
     this.commonservice.setProducts(productObj)
   }
   getROI(){
     var ROIObj = {
       aSiteCatalog: localStorage.getItem("siteCatalog") || 52891,
       aSection: 39,
       aPageNumber: 1,
       aPageSize: 12,
       systemUser: 0,
       activeTask:"ROI"
     }
     this.commonservice.setROI(ROIObj)
   }
   getHome(){
     var homeObj = {
       aPageNumber: 1,
       activeTask:"Home"
     }
     
     this.commonservice.setHome(homeObj)
   }







  FetchSections() {
    this.homePageService.FetchSections(this.site).subscribe({
      next: (response: any) => {
        if (response.statusCode == 200) {
          this.sectionDetails = []
          this.sectionDetails = response.data
          // console.log(this.sectionDetails)
        } else {
          // alert(response.message)
          // Swal.fire({
          //   icon: 'error',
          //   title: 'Oops...',
          //   text: response.message,
          //   timer: 1500
          // })
        }
      },
      complete: () => {
        // console.log("complete block")
      },
      error: (err: any) => {
        console.log(err)
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
