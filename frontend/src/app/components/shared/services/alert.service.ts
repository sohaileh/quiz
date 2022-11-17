import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private http: HttpClient) { }

error(){
  // console.log(window.location.port)
  // if(window.location.port)
   Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Something went wrong!',
 })
}

}
