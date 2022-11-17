import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/modals/product.model';
import { SearchBase } from 'src/app/modals/search-base';
import { SearchCategory } from 'src/app/modals/search-category';
import { HomePageService } from '../services/home-page.service';

@Component({
  selector: 'app-featured-items',
  templateUrl: './featured-items.component.html',
  styleUrls: ['./featured-items.component.sass']
})
export class FeaturedItemsComponent implements OnInit {
  public page: any = 1;
  aCatalog: any = localStorage.getItem("siteCatalog") || 52891
  siteID = localStorage.getItem(("siteId")) || 57
  itemsPerPage = 12
  totalItems: any
  totalRecords: any
  searchModel = {} as SearchBase
  ActiveTask: string = "Home"
  SerachCategory = {} as SearchCategory
  public animation: any;   // Animation
  public sortByOrder: string = '';   // sorting
  public tagsFilters: any[] = [];
  public viewType: string = 'grid';
  public viewCol: number = 25;
  public featuredItems: Product[] = [];
  featuredObj: any = {}
  public allItems: Product[] = [];
  constructor(private homePageService: HomePageService) { }

  ngOnInit(): void {
    this.FetchForFeatured() 
  }
  public changeViewType(viewType, viewCol) {
    this.viewType = viewType;
    this.viewCol = viewCol;
  }
  // Animation Effect fadeIn
  public fadeIn() {
    this.animation = 'fadeIn';
  }

  // Animation Effect fadeOut
  public fadeOut() {
    this.animation = 'fadeOut';
  }

  // Update tags filter
  public updateTagFilters(tags: any[]) {
    this.tagsFilters = tags;
    this.animation == 'fadeOut' ? this.fadeIn() : this.fadeOut(); // animation
  }



  // sorting type ASC / DESC / A-Z / Z-A etc.
  public onChangeSorting(val) {
    this.sortByOrder = val;
    this.animation == 'fadeOut' ? this.fadeIn() : this.fadeOut(); // animation
  }
  getCategory(category: any) {
    console.log(category)
    this.FetchForCategory(category)
  }
  FetchForCategory(category: any) {
    this.ActiveTask = "Category"
    this.SerachCategory = category
    // console.log(this.SerachCategory )
    this.page = this.SerachCategory.aPageNumber
    this.homePageService.FetchItemsForProductCategory(this.SerachCategory).subscribe({
      next: (response: any) => {
        if (response.statusCode == 200) {
          this.featuredItems = response.data.data
          this.totalRecords = response.data.totalRecords
          console.log(this.allItems)
          this.totalItems = response.data.totalRecords || 88
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

  FetchForFeatured() {
    this.ActiveTask = "Featured"
    this.featuredObj = {
      aSiteCatalog: this.aCatalog,
      aSection: "0",
      aPageNumber: this.page,
      aPageSize: this.itemsPerPage,
      systemUser: "0"
    }
    this.homePageService.FetchForFeatured(this.featuredObj).subscribe({
      next: (response: any) => {
        if (response.statusCode == 200) {
          this.featuredItems = response.data.data
          // this.totalRecords = response.data.totalRecords
          console.log(response)
          this.totalItems = response.data.totalRecords || 118
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

  public onPageChanged(event) {

    this.page = event;
    console.log(this.page)
    if (this.ActiveTask == "Featured") {
      this.FetchForFeatured()
    }else {
        this.SerachCategory.aPageNumber = this.page
        this.FetchForCategory(this.SerachCategory)
      }
      window.scrollTo(0, 0);}
}
