import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { BehaviorSubject, shareReplay } from "rxjs";


@Injectable({
  providedIn: "root",
})
export class AdminService {
  user: any = {};
  serverUrl = environment.serverURL;
  quizQuestions$= new BehaviorSubject(null)


  constructor(private http: HttpClient) {}

  saveQuestion(quizData: any,) {
    // let params = new HttpParams();
    const quizId= '634d1a062c20213f8f5a822b'
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

  getQuizQuestions(){
    const quizId = '634d1a062c20213f8f5a822b'
    return this.http.get(`${this.serverUrl}quiz/get-quiz-questions/${quizId}`).pipe(
      shareReplay()
    )
  }

  editQuestion(formdata:any,questionId){
    const quizId='634d1a062c20213f8f5a822b'
    return this.http.patch(`${this.serverUrl}quiz/edit-question/${quizId}/${questionId}`,formdata)
  }
  deleteQuestion(question){
    const quizId = '634d1a062c20213f8f5a822b'
    return this.http.patch(`${this.serverUrl}quiz/delete-question/${quizId}`,question)
  }


 
}
