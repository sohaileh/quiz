import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { LoaderService } from '../../shared/services/loader.service';
import { validateAllFormFields } from 'src/app/utils/validateform';
import { HomePageService } from '../../shop/services/home-page.service';
import { map } from 'rxjs';
import { CommonService } from '../../shared/services/common.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-business-regis',
  templateUrl: './business-regis.component.html',
  styleUrls: ['./business-regis.component.scss']
})
export class BusinessRegisComponent implements OnInit {
  BusinessRegistrationForm: FormGroup
  sectionDetails: any = []
  showProducts: Boolean = false
  imageNames: any = []
  site = localStorage.getItem(("siteId"))
  images: any = []
  names: any = []
  aSection: any;
  categoryDetails: any = []
  hearAboutArr = ["Google", "GreaterKashmir", "Friend", "Other Business", "Other"]
  siteCatalog: any = localStorage.getItem("siteCatalog")
  ipAddress: any

  constructor(private router: Router, public loaderService: LoaderService,
    private homePageService: HomePageService, private commonservice: CommonService, private http: HttpClient) {
  }


  ngOnInit(): void {
    this.http.get("http://api.ipify.org/?format=json").subscribe((res: any) => {
      this.ipAddress = res.ip;
      console.log(this.ipAddress)
      // this.ipAddress=JSON.stringify(IP);
    });

    this.createForm();
    this.FetchSectionsForSite();
    this.commonservice.getHome().pipe(map((featuredItem) => {
      if (featuredItem == true) {
        const navigationExtras: NavigationExtras = {
          queryParams: {
            action: "home"
          }
        }
        this.router.navigate(["/home/dashboard"], navigationExtras)
      }
    })).subscribe()

    this.commonservice.getFeatured().pipe(map((featuredItem) => {
      if (featuredItem == true) {
        const navigationExtras: NavigationExtras = {
          queryParams: {
            action: "featured"
          }
        }
        this.router.navigate(["/home/dashboard"], navigationExtras)
      }
    })).subscribe()

    this.commonservice.getProducts().pipe(map((featuredItem) => {
      console.log(featuredItem)
      if (featuredItem.details == true) {
        const navigationExtras: NavigationExtras = {
          queryParams: {
            action: "products"
          }
        }
        this.router.navigate(["/home/dashboard"], navigationExtras)
      }
    })).subscribe()

    this.commonservice.getROI().pipe(map((featuredItem) => {
      if (featuredItem.details == true) {
        const navigationExtras: NavigationExtras = {
          queryParams: {
            action: "ROI"
          }
        }
        this.router.navigate(["/home/dashboard"], navigationExtras)
      }
    })).subscribe()

  }

  getSections() {
    if (this.BusinessRegistrationForm.value.section === "Products") {
      this.showProducts = true
      this.aSection = 2
      this.FetchCategories();
    }
    else if (this.BusinessRegistrationForm.value.section == "UpcomingEvents") {
      this.showProducts = false
      this.categoryDetails = [{ "productCategoryX": "Events across India" }]
    }
    else if (this.BusinessRegistrationForm.value.section == "Blog") {
      this.showProducts = false
      this.categoryDetails = [{ "productCategoryX": "What's new on Blog" }]
    } else {
      this.showProducts = true
      this.aSection = 39
      this.FetchCategories();
    }
  }
  createForm() {
    this.BusinessRegistrationForm = new FormGroup({
      BusinessName: new FormControl(null, []),
      BusinessType: new FormControl(null, []),
      section: new FormControl(null, []),
      AddressLine1: new FormControl(null, []),
      City: new FormControl(null, []),
      Zip: new FormControl(null, []),
      State: new FormControl(null, []),
      BusinessDesciption: new FormControl(null, []),
      ContactName: new FormControl(null, []),
      PhoneNumber: new FormControl(null, []),
      EmailAdrees: new FormControl(null, []),
      Website: new FormControl(null, []),
      HearaboutUs: new FormControl(null, []),
    })

  }
  FetchSectionsForSite() {
    var systemUser = 0
    this.homePageService.FetchSectionsForSite(this.site, systemUser).subscribe({
      next: (response: any) => {
        if (response.statusCode == 200) {
          this.sectionDetails = response.data
        } else {
        }
      },
      complete: () => {
      },
      error: (err: any) => {
      }
    })
  }
  registerBusiness() {
    validateAllFormFields(this.BusinessRegistrationForm)
    var formData: any = new FormData();
    Object.keys(this.BusinessRegistrationForm.controls).forEach(formControlName => {
      formData.append(formControlName, this.BusinessRegistrationForm.get(formControlName).value);
      formData.append('SystemUser', 0);
      formData.append('Site', this.site);
      formData.append('IpAddress', this.ipAddress);
      formData.append('Image1', this.images[0]);
      formData.append('Image2', this.images[1]);
      formData.append('Image3', this.images[2]);
      formData.append('Image4', this.images[3]);
    });
    if (!this.BusinessRegistrationForm.valid) {
      return
    } else {
      this.loaderService.showLoader();
      this.homePageService.OnlineSubmission(formData).subscribe({
        next: (response: any) => {
          if (response.statusCode == 200) {
            console.log(response)
            alert(response.message)
            this.BusinessRegistrationForm.reset()
            this.images = []
            this.imageNames = []
          } else {
            console.log(response)
            alert(response.message)
            this.BusinessRegistrationForm.reset()
            this.images = []
            this.imageNames = []
          }
          this.loaderService.hideLoader();
        },
        complete: () => {
        },
        error: (err: any) => {
          console.log(err)
        }
      })
    }
  }
  getCategory(category: any) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        action: "details.leftSideBar",
        aProductCategory: category.aProductCategory
      }
    }
    this.router.navigate(["/home/dashboard"], navigationExtras)
  }
  getBase64(event: any) {
    let _that = this;
    const files = event.target.files
    if (files.length > 4) {
      alert('You are only allowed to upload a maximum of 4 files at a time');
      return;
    } else {
      if (!files.length) return;
      for (var i = 0; i < event.target.files.length; i++) {
        let file = event.target.files[i];
        this.imageNames.push(file.name)
        _that.images.push(file)
      }
    }
  }
  remove(name: any) {
    for (var i in this.imageNames) {
      if (name === this.imageNames[i]) {
        this.imageNames.splice(i, 1)
        this.images.splice(i, 1);
      }
    }
  }

  FetchCategories() {
    this.homePageService.FetchCategories(this.aSection, this.siteCatalog).subscribe({
      next: (response: any) => {
        if (response.statusCode == 200) {
          this.categoryDetails = response.data
        } else {
        }
      },
      complete: () => {
      },
      error: (err: any) => {
      }
    })
  }

}