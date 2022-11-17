import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from 'src/app/components/shared/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product, ColorFilter } from 'src/app/modals/product.model';
import { HomePageService } from '../../services/home-page.service';
import { SearchCategory } from 'src/app/modals/search-category';
import { SearchBase } from 'src/app/modals/search-base';
import { CommonService } from 'src/app/components/shared/services/common.service';
import { map } from 'rxjs/operators';
import { LoaderService } from 'src/app/components/shared/services/loader.service';
import { ProductComponent } from '../product/product.component';


@Component({
  selector: 'app-product-left-sidebar',
  templateUrl: './product-left-sidebar.component.html',
  styleUrls: ['./product-left-sidebar.component.scss']
})
export class ProductLeftSidebarComponent implements OnInit {
  public sidenavOpen: boolean = true;
  public animation: any;   // Animation
  public sortByOrder: string = '';   // sorting
  public page: any = 1;
  public tagsFilters: any[] = [];
  public viewType: string = 'grid';
  public viewCol: number = 25;
  public view:any
  public colorFilters: ColorFilter[] = [];
  search = false
  public items: Product[] = [];
  public allItems: Product[] = [];
  public products: Product[] = [];
  public tags: any[] = [];
  public colors: any[] = [];
  aCatalog: any = localStorage.getItem("siteCatalog") || 52891
  siteID = localStorage.getItem(("siteId")) || 57
  itemsPerPage = 16
  totalItems: any
  totalRecords: any
  baseURL: any = "kashmirsearch.com"
  headerDetails: any = []
  siteCatalog: any = localStorage.getItem("siteCatalog")
  sectionDetails: any = []
  brandDetails: any = []
  title: any
  title2: any
  menuDetails: any;
  aSection = 2
  categoryDetails: any = []
  searchModel = {} as SearchBase
  ActiveTask: string = "Home"
  featured: any = {}
  featuredItems: any = []
  SerachCategory = {} as SearchCategory
  featuredObj: any = {}
  homeObj: any = {}
  action: any
  aProductCategory:any
  constructor(private productService: ProductService, private route: ActivatedRoute,
    private homePageService: HomePageService, private commonservice: CommonService, public loaderService: LoaderService) {
    this.action = this.route.snapshot.queryParamMap.get("action")
    this.aProductCategory = this.route.snapshot.queryParamMap.get("aProductCategory")

  }

  // Get current product tags
  public getTags(products) {
    var uniqueBrands = []
    var itemBrand = Array();
    products.map((product, index) => {
      if (product.tags) {
        product.tags.map((tag) => {
          const index = uniqueBrands.indexOf(tag);
          if (index === -1) uniqueBrands.push(tag);
        })
      }
    });
    for (var i = 0; i < uniqueBrands.length; i++) {
      itemBrand.push({ brand: uniqueBrands[i] })
    }
    this.tags = itemBrand
  }

  // Get current product colors
  public getColors(products) {
    var uniqueColors = []
    var itemColor = Array();
    products.map((product, index) => {
      if (product.colors) {
        product.colors.map((color) => {
          const index = uniqueColors.indexOf(color);
          if (index === -1) uniqueColors.push(color);
        })
      }
    });
    for (var i = 0; i < uniqueColors.length; i++) {
      itemColor.push({ color: uniqueColors[i] })
    }
    this.colors = itemColor
  }

  ngOnInit() {
    if (this.action === null) {
      this.FetchItemsForHome()
    }
    this.FetchItemsForRecomendeditems()
    if (this.action === "featured") {
      this.FetchForFeatured()
    } else if (this.action === "products") {
      this.featuredObj.aSection = 2,
        this.featuredObj.activeTask = "Products",
        this.FetchForProducts(this.featuredObj)
    } else if (this.action === "home") {
      this.FetchItemsForHome()
    } else if (this.action === "ROI") {
      this.featuredObj.aSection = 39,
        this.featuredObj.activeTask = "ROI",
        this.FetchForProducts(this.featuredObj)
    } else if (this.action === "details.leftSideBar") {
      this.featuredObj = {}
      this.featuredObj.aCatalog = this.siteCatalog
      this.featuredObj.aPageNumber = 1
      this.featuredObj.aPageSize = this.itemsPerPage
      this.featuredObj.aProductCategory = this.aProductCategory
      this.FetchForCategory(this.featuredObj)
    } else { }
    this.commonservice.getHome().pipe(map(() => {
      this.FetchItemsForHome()
    })).subscribe()
    this.commonservice.getFeatured().pipe(map(() => {
      this.FetchForFeatured()
    })).subscribe()
    this.commonservice.getProducts().pipe(map((ROIItem) => {
      this.FetchForProducts(ROIItem)
    })).subscribe()
    this.commonservice.getROI().pipe(map((ROIItem) => {
      this.FetchForProducts(ROIItem)
    })).subscribe()
    this.commonservice.getSearch().pipe(map((text) => {
      this.FetchForSearch(text)
    })).subscribe()
  }

  FetchItemsForHome() {
    this.ActiveTask = "Home"
    if (this.search == true) {
      this.page = this.page
    } else {
      this.page = 1
    }
    this.homePageService.FetchItemsForHome(this.aCatalog, this.page, this.itemsPerPage).subscribe({
      next: (response: any) => {
        this.ActiveTask = "Home"
        if (response.statusCode == 200) {
          this.allItems = response.data.data
          this.totalRecords = response.data.totalRecords
          this.totalItems = response.data.totalRecords || 88
        } else {
        }
      },
      complete: () => {
      },
      error: (err: any) => {
      }
    })
  }

  public changeViewType(viewType, viewCol, view) {
    this.viewType = viewType;
    this.viewCol = viewCol;
    this.view=view
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
  // Initialize filetr Items
  public filterItems(): Product[] {
    return this.items.filter((item: Product) => {
      const Colors: boolean = this.colorFilters.reduce((prev, curr) => { // Match Color
        if (item.colors) {
          if (item.colors.includes(curr.color)) {
            return prev && true;
          }
        }
      }, true);
      const Tags: boolean = this.tagsFilters.reduce((prev, curr) => { // Match Tags
        if (item.tags) {
          if (item.tags.includes(curr)) {
            return prev && true;
          }
        }
      }, true);
      return Colors && Tags; // return true
    });

  }

  public onPageChanged(event) {
    this.page = event;
    if (this.ActiveTask == "Home") {
      this.search = true
      this.FetchItemsForHome()
      this.search = false
    } else if (this.ActiveTask == "Featured") {
      this.search = true
      this.FetchForFeatured();
      this.search = false
    } else if (this.ActiveTask == "Search") {
      this.search = true
      this.FetchForSearch(this.searchModel)
      this.search = false
    } else if (this.ActiveTask == "Products") {
      this.search = true
      this.FetchForProducts(this.featuredObj)
      this.search = false
    } else if (this.ActiveTask == "ROI") {
      this.search = true
      this.FetchForProducts(this.featuredObj)
      this.search = false
    } else {
      this.SerachCategory.aPageNumber = this.page
      this.FetchForCategory(this.SerachCategory)
    }
    // window.scrollTo(0, 0);
  }


  FetchItemsForRecomendeditems() {
    var page = 7
    var PerPage = 4
    this.homePageService.FetchItemsForHome(this.aCatalog, page, PerPage).subscribe({
      next: (response: any) => {
        if (response.statusCode == 200) {
          this.menuDetails = response.data.data
        } else {
        }
      },
      complete: () => {
      },
      error: (err: any) => {
      }
    })
  }


  getCategory(category: any) {
    this.FetchForCategory(category)
  }
  FetchForCategory(category: any) {
    this.loaderService.showLoader();
    this.ActiveTask = "Category"
    this.SerachCategory = category
    this.page = this.SerachCategory.aPageNumber
    this.homePageService.FetchItemsForProductCategory(this.SerachCategory).subscribe({
      next: (response: any) => {
        if (response.statusCode == 200) {
          this.allItems = response.data.data
          this.totalRecords = response.data.totalRecords
          this.totalItems = response.data.totalRecords
        } else {
        }
        this.loaderService.hideLoader();
      },
      complete: () => {

      },
      error: (err: any) => {
      }
    })
  }
  FetchForSearch(search: any) {
    this.loaderService.showLoader();
    this.ActiveTask = "Search"
    this.searchModel.hintX = search
    this.searchModel.siteCatalog = this.siteCatalog
    this.searchModel.pageSize = this.itemsPerPage
    if (this.search == true) {
      this.searchModel.pageNumber = this.page
    } else {
      this.page = 1
      this.searchModel.pageNumber = this.page
    }
    this.homePageService.FetchForSearch(this.searchModel).subscribe({
      next: (response: any) => {
        if (response.statusCode == 200) {
          this.allItems = response.data.data
          this.totalRecords = response.data.totalRecords
          this.totalItems = response.data.totalRecords
        } else {
        }
        this.loaderService.hideLoader();
      },
      complete: () => {
      },
      error: (err: any) => {
      }
    })
  }

  FetchForFeatured() {
    this.loaderService.showLoader();
    this.ActiveTask = "Featured"
    this.featuredObj = {
      aSiteCatalog: localStorage.getItem("siteCatalog") || 52891,
      aSection: 0,
      aPageNumber: 1,
      aPageSize: 16,
      systemUser: 0,
    }
    if (this.search == true) {
      this.featuredObj.aPageNumber = this.page
    } else {
      this.page = 1
      this.featuredObj.aPageNumber = this.page
    }
    this.homePageService.FetchForFeatured(this.featuredObj).subscribe({
      next: (response: any) => {
        if (response.statusCode == 200) {
          this.allItems = response.data.data
          this.totalItems = response.data.totalRecords
          this.totalRecords = response.data.totalRecords || 118
        } else {
        }
        this.loaderService.hideLoader();
      },
      complete: () => {

      },
      error: (err: any) => {
      }
    })
  }

  FetchForProducts(product: any) {
    this.loaderService.showLoader();
    var productItem = {
      aSiteCatalog: localStorage.getItem("siteCatalog") || 52891,
      aSection: product.aSection,
      aPageNumber: 1,
      aPageSize: 16,
      systemUser: 0,
      activeTask: product.activeTask,
    }
    this.ActiveTask = productItem.activeTask
    this.featuredObj = productItem
    if (this.search == true) {
      this.featuredObj.aPageNumber = this.page
    } else {
      this.featuredObj.aPageNumber = 1
      this.page = this.featuredObj.aPageNumber
    }
    this.homePageService.FetchForSection(this.featuredObj).subscribe({
      next: (response: any) => {
        if (response.statusCode == 200) {
          this.allItems = response.data.data
          this.totalItems = response.data.totalRecords
          this.totalRecords = response.data.totalRecords || 1022
        } else {
        }
        this.loaderService.hideLoader();
      },
      complete: () => {
      },
      error: (err: any) => {
      }
    })
  }


}


