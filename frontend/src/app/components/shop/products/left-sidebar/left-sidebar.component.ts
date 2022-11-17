import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { CommonService } from 'src/app/components/shared/services/common.service';
import { SearchCategory } from 'src/app/modals/search-category';
import { HomePageService } from '../../services/home-page.service';


@Component({
  selector: 'left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.scss']
})
export class LeftSidebarComponent implements OnInit {
  @ViewChild(MatAccordion) accordion?: MatAccordion;
  baseURL: any = "kashmirsearch.com"
  headerDetails: any = []
  siteCatalog: any = localStorage.getItem("siteCatalog")
  siteID = localStorage.getItem(("siteId"))
  sectionDetails: any = []
  ROIproperties:any=[]
  brandDetails: any = []
  title2: any;
  title: string;
  aSection:any=2;
  categoryDetails: any = []
  SerachCategory = {} as SearchCategory


  @Output() categoryEvent = new EventEmitter<any>();
  constructor(private homePageService: HomePageService, private commonservice: CommonService) { }

  ngOnInit(): void {
    this.FetchCategories();
    this.FetchForBaseUrl();
    // this.FetchCategoriesForROI()
    // this.FetchCategories();
    this.FetchSections();
    this.FetchBrandsForSite();
  }
  FetchForBaseUrl() {
    this.homePageService.FetchForBaseUrl(this.baseURL).subscribe({
      next: (response: any) => {
        if (response.statusCode == 200) {
          this.headerDetails = response.data
        } else {
        }
      },
      complete: () => {
      },
      error: (err: any) => {
      }
    })
  }

  FetchCategories() {
   this.aSection=2
    this.homePageService.FetchCategories(this.aSection, this.siteCatalog).subscribe({
      next: (response: any) => {
        if (response.statusCode == 200) {
          this.categoryDetails = response.data
          this.title = this.categoryDetails[0].sectionX
        } else {
        }

      },
      complete: () => {
      },
      error: (err: any) => {
      }
    })
  }
  FetchCategoriesForROI() {
    this.aSection=39
     this.homePageService.FetchCategories(this.aSection, this.siteCatalog).subscribe({
       next: (response: any) => {
         if (response.statusCode == 200) {
           this.ROIproperties = response.data
           console.log(this.ROIproperties)
          //  this.title = this.categoryDetails[0].sectionX
         } else {
         }
 
       },
       complete: () => {
       },
       error: (err: any) => {
       }
     })
   }

  FetchSections() {
    this.homePageService.FetchSections(this.siteID).subscribe({
      next: (response: any) => {
        if (response.statusCode == 200) {
          this.sectionDetails = response.data
          this.title2 = this.sectionDetails[1].sectionX
        } else {
        }
      },
      complete: () => {
      },
      error: (err: any) => {
      }
    })
  }
  FetchBrandsForSite() {
    this.homePageService.FetchBrandsForSite(this.siteID).subscribe({
      next: (response: any) => {
        if (response.statusCode == 200) {
          this.brandDetails = response.data
        } else {
        }
      },
      complete: () => {
      },
      error: (err: any) => {
      }
    })
  }

  navigateToSearch(product: any) {
    this.SerachCategory.aProductCategory = product.productCategory
    this.SerachCategory.aPageNumber = 1
    this.SerachCategory.aPageSize = 16
    this.SerachCategory.aCatalog = this.siteCatalog
    this.commonservice.setSearchCategory(product.productCategory)
    this.categoryEvent.emit(this.SerachCategory)

  }
  scroll(id: string) {
    let el = document.getElementById(id);
    el?.scrollIntoView();
  }
}
