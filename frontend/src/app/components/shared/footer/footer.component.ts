import { Component, OnInit } from '@angular/core';
import { FooterService } from '../services/footer.service';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  baseURL: any = "kashmirsearch.com"
  logo: any;
  siteID:number=57
  Legal: any = { "title": "LEGAL", "items": [] }
  Resources: any = { "title": "RESOURCES", "items": [] }
  address: any = {}
  copyRight:any
  CustomerSupport: any = {
    title: "CUSTOMER SUPPORT", items: [{
     name: "", link: ""
   }]
 }
  constructor(private footerService:FooterService) { }

  ngOnInit() {
    this.FetchForBaseUrl()
    this.fetchFooter()
    this.fetchFooterAddress()
    this.FetchExternalLinks()
    this.FetchForCopyright()
  }
  FetchForBaseUrl() {
    this.footerService.FetchForBaseUrl(this.baseURL).subscribe((response:any)=>{
      this.logo=response.data[0].logoFileName1
    })
  }

  fetchFooterAddress() {
    this.footerService.fetchFooterAddress(this.siteID).subscribe((response: any) => {
      this.address = response.data[0]
    })
  }

  fetchFooter() {
      this.footerService.fetchFooter(this.siteID).subscribe((response: any) => {
      let temp = response.data
      this.Legal.items = temp
    })
  }
  FetchExternalLinks() {
    this.footerService.FetchExternalLinks(this.siteID).subscribe((response: any) => {
      let temp = response.data
      this.Resources.items = response.data
    })
  }

  FetchForCopyright(){
    this.footerService.FetchForCopyright(this.siteID).subscribe((response: any)=>{
      this.copyRight=response.data[0].copyright
      
    })
  }




}



