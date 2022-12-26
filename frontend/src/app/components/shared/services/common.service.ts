import { Injectable } from '@angular/core';

import {Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  public searchData = new Subject<any>()
  public featuredObj =  new Subject<any>()
  public productObj = new Subject<any>()
  public ROIObj = new Subject<any>()
  public homeObj = new Subject<any>()
  public obj = new Subject<any>()
  constructor() { }


  setSearch(search: any) {
    this.searchData.next(search)
  }

  getSearch() {
    return this.searchData.asObservable()
  }
  setHome(homeItem: any) {
    this.homeObj.next(homeItem)
  }
  getHome() {
    return this.homeObj.asObservable()
  }
  setFeatured(featuredItem: any) {
    this.featuredObj.next(featuredItem)
  }
  getFeatured(): Observable<any> {
    return this.featuredObj.asObservable()
  }
  setProducts(productsItem: any) {
    this.productObj.next(productsItem)
  }
  getProducts() {
    return this.productObj.asObservable()
  }
  setROI(ROIItem: any) {
    this.ROIObj.next(ROIItem)
  }
  getROI() {
    return this.ROIObj.asObservable()
  }
  setSearchCategory(objec: any) {
    this.obj.next(objec)

  }
  getSearchCategory() {
    return this.obj.asObservable()
  }
  
}

