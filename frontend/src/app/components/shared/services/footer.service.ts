import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FooterService {
  apiUrl = environment.apiUrl

  constructor(private http:HttpClient) { }


}
