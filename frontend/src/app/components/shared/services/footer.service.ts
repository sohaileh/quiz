import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FooterService {
  apiUrl = environment.apiUrl

  constructor(private http:HttpClient) { }

  // /api/Settings/FetchForBaseUrl

  FetchForBaseUrl(baseUrl: any) {
    let params = new HttpParams().set('baseUrl', baseUrl);
    return this.http.get(`${this.apiUrl}Settings/FetchForBaseUrl`, { params: params })
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
  FetchForCopyright(siteID: any){
    return this.http.get(`${this.apiUrl}Home/FetchForCopyright?siteID=${siteID}`)
  }
}
