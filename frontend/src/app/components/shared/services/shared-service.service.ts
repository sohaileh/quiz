import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {

  serverUrl = environment.serverURL;
  constructor(private http: HttpClient) {}
  
  deleteQuiz(quiz:any)
  {
    return this.http.post(`${this.serverUrl}quiz/delete-quiz`,quiz)
  }
  
  deleteUser(user:any)
  {
    return this.http.post(`${this.serverUrl}auth/delete-user`,user)

  }

}
