import { Component, OnInit } from '@angular/core';
import { FooterService } from '../services/footer.service';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  baseURL: any = "Quiz.com"
  logo: any;
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

  }
}



