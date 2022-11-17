import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
isLoading:boolean=false
  constructor() { }



  showLoader(){
    this.isLoading=true
  }
  hideLoader(){

    this.isLoading=false
  }
}
