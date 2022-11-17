import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class HomePageService {
  apiUrl = environment.apiUrl
  constructor(private http: HttpClient) { }
  FetchForBaseUrl(baseUrl: any) {
    let params = new HttpParams().set('baseUrl', baseUrl);
    return this.http.get(`${this.apiUrl}Settings/FetchForBaseUrl`, { params: params })
  }
  FetchItemsForHome(catalog: any, page: any, pageSize: any) {
    let params = new HttpParams();
    params = params.append('aCatalog', catalog)
    params = params.append('aPageNumber', page)
    params = params.append('aPageSize', pageSize)
    return this.http.get(`${this.apiUrl}Home/FetchItemsForHome`, { params: params })
  }
  FetchSections(siteID: any) {
    let params = new HttpParams().set('siteID', siteID);
    return this.http.get(`${this.apiUrl}Home/FetchSections`, { params: params })
  }
  FetchBrandsForSite(siteID: any) {
    let params = new HttpParams().set('siteID', siteID);
    return this.http.get(`${this.apiUrl}Home/FetchBrandsForSite`, { params: params })
  }
  FetchCategories(aSection: any, siteCatalog: any) {
    let params = new HttpParams();
    params = params.append('aSection', aSection)
    params = params.append('siteCatalog', siteCatalog)
    return this.http.get(`${this.apiUrl}Home/FetchCategories`, { params: params })
  }
  fetchFooterAddress(siteID: any) {
    return this.http.get(`${this.apiUrl}Home/FetchFotterAddress?siteID=${siteID}`)
  }
  fetchFooter(siteID: any) {
    return this.http.get(`${this.apiUrl}Home/FetchFotter?siteID=${siteID}`)
  }
  FetchExternalLinks(siteID: any) {
    return this.http.get(`${this.apiUrl}Home/FetchExternalLinks?siteID=${siteID}`)
  }
  FetchForSearch(model: any) {
    let params = new HttpParams();
    params = params.append('siteCatalog', model?.siteCatalog)
    params = params.append('hintX', model?.hintX)
    params = params.append('pageNumber', model?.pageNumber)
    params = params.append('pageSize', model?.pageSize)
    return this.http.get(`${this.apiUrl}Home/FetchForSearch`, { params: params })
  }
  FetchItemsForProductCategory(model: any) {
    let params = new HttpParams();
    params = params.append('aCatalog', model?.aCatalog)
    params = params.append('aProductCategory', model?.aProductCategory)
    params = params.append('aPageNumber', model?.aPageNumber)
    params = params.append('aPageSize', model?.aPageSize)
    return this.http.get(`${this.apiUrl}Home/FetchItemsForProductCategory`, { params: params })
  }

  FetchBannerImages(siteID:any) {
    let params = new HttpParams().set('siteID',siteID);
    return this.http.get(`${this.apiUrl}Home/FetchBannerImages`,{ params: params })
  }
  FetchForCatalogItem(catalogItem:any){
    let params = new HttpParams().set('catalogItem',catalogItem);
    return this.http.get(`${this.apiUrl}Home/FetchForCatalogItem`,{ params: params })
  }
  FetchForCatalogItemAddress(catalogItem:any){
    let params = new HttpParams().set('catalogItem',catalogItem);
    return this.http.get(`${this.apiUrl}Home/FetchForCatalogItemAddress`,{ params: params })
  }
  FetchForCatalogItemThumbnails(catalogItem:any){
    let params = new HttpParams().set('catalogItem',catalogItem);
    return this.http.get(`${this.apiUrl}Home/FetchForCatalogItemThumbnails`,{ params: params })
  }
  FetchCatalogItemFeaturedTop5(siteCatalog:any,section:any,catalogItem:any,category:any){
    let params = new HttpParams();
    params=params.append('siteCatalog',siteCatalog)
    params=params.append('section',section)
    params=params.append('catalogItem',catalogItem)
    params=params.append('category',category)
    return this.http.get(`${this.apiUrl}Home/FetchCatalogItemFeaturedTop5`,{ params: params })
  }
  FetchForFeatured(model: any){
    let params = new HttpParams();
    params = params.append('aSiteCatalog', model?.aSiteCatalog)
    params = params.append('aSection', model?.aSection)
    params = params.append('aPageNumber', model?.aPageNumber)
    params = params.append('aPageSize', model?.aPageSize)
    params = params.append('systemUser', model?.systemUser)
    return this.http.get(`${this.apiUrl}Home/FetchForFeatured`, { params: params })
  }
  FetchForRelatedItems(model: any){
    return this.http.get(`${this.apiUrl}Home/FetchCatalogForRealtedItems`, { params: model })
  }
  FetchForSection(model: any){
    let params = new HttpParams();
    params = params.append('aSiteCatalog', model?.aSiteCatalog)
    params = params.append('aSection', model?.aSection)
    params = params.append('aPageNumber', model?.aPageNumber)
    params = params.append('aPageSize', model?.aPageSize)
    params = params.append('systemUser', model?.systemUser)
    return this.http.get(`${this.apiUrl}Home/FetchForSection`, { params: params })
  }
  FetchForSectionImages(model:any){
    let params = new HttpParams();
    params = params.append('siteID', model?.siteID)
    params = params.append('section', model?.section)
    params = params.append('systemUser', model?.systemUser)
    return this.http.get(`${this.apiUrl}Home/FetchForSectionImages`, { params: params })
  }
  FetchForProductCategoryImages(model:any) {
    let params = new HttpParams();
    params = params.append('siteID', model?.siteID)
    params = params.append('systemUser', model?.systemUser)
    params = params.append('aProductCategory', model?.aProductCategory)
    return this.http.get(`${this.apiUrl}Home/FetchForProductCategoryImages`, { params: params })
  }
  SystemUser(model){
    return this.http.post(`${this.apiUrl}Accounts/SystemUser`, model)
  }
  Login(model:any){
    return this.http.post(`${this.apiUrl}Accounts/Login`, model)
  }
  ForgotPassword(model:any){
    let params = new HttpParams();
    params = params.append('systemUser', model?.systemUser)
    params = params.append('site', model?.site)
    params = params.append('email', model?.email)
    params = params.append('siteX', model?.siteX)
    params = params.append('baseUrl', model?.baseUrl)
    return this.http.post(`${this.apiUrl}Accounts/ForgotPassword`, null ,{ params: params })
  }
  FetchSectionsForSite(siteID,systemUser){
    let params = new HttpParams();
    params = params.append('siteID', siteID)
    params = params.append('systemUser',systemUser)
    return this.http.get(`${this.apiUrl}Home/FetchSectionsForSite`, { params: params })
  }
  OnlineSubmission(model:any){
    return this.http.post(`${this.apiUrl}Accounts/OnlineSubmission`, model)
  }
  FetchForCatalogItemInStock(model: any){
    return this.http.get(`${this.apiUrl}Cart/FetchForCatalogItemInStockOnly`, { params: model })
  }
}
