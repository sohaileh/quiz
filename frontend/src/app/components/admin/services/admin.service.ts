import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class AdminService {
  user: any = {};
  serverUrl = environment.serverURL;
  constructor(private http: HttpClient) {}

  saveQuestion(quizData: any, quizId) {
    let params = new HttpParams();
    // params = params.append('quizId', quizId);
    console.log("quizData", quizData);
    return this.http.post(
      `${this.serverUrl}quiz/upload-file/${quizId}`,
      quizData
    );
    // return this.http.post(`${this.serverUrl}quiz/upload-file`,quizData,{params: params})
  }

  submitInfo(quizDetails: any) {
    return this.http.post(`${this.serverUrl}quiz/submit-info`, quizDetails);
  }
}
