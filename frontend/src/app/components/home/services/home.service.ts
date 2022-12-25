import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class HomeService {
  user: any = {};
  serverUrl = environment.serverURL;
  constructor(private http: HttpClient) {}

  getOrganizationQuizzes(organizationId:any) {
    return this.http.post(`${this.serverUrl}quiz/getQuizzes`,organizationId);
  }

  checkIfPlayed(quiz: any) {
    // console.log('quiz details',quiz)
    this.user.userId = localStorage.getItem("userId");
    this.user.quizId = quiz._id;
    return this.http.post(`${this.serverUrl}quiz/check-if-played`, this.user);
  }



}
