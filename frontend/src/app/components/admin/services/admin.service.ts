import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { BehaviorSubject, Observable, shareReplay, Subject, tap } from "rxjs";


@Injectable({
  providedIn: "root",
})
export class AdminService {
  user: any = {};
  serverUrl = environment.serverURL;
  quizQuestions$= new BehaviorSubject(null)
 menu$ = new BehaviorSubject<boolean>(false)
 organizationUsers$ = new BehaviorSubject<number>(0) 

 public print = new Subject<string>();

  
 constructor(private http: HttpClient) {}

 saveQuestion(quizData: any,quizId) {
  return this.http.post(
    `${this.serverUrl}quiz/upload-file/${quizId}`,
    quizData
  );
}
passValue(data:any) {
  //passing the data as the next observable
  this.print.next(data);
}
  submitInfo(quizDetails: any) {
    return this.http.post(`${this.serverUrl}quiz/submit-info`, quizDetails);
  }

  getQuizQuestions(quizId:any,questionNumber?:any){
    return this.http.get(`${this.serverUrl}quiz/get-quiz-questions/${quizId}`,{params:{
      questionNumber:questionNumber
    }})
  }

  editQuestion(formdata:any,questionId,quizId){
    return this.http.patch(`${this.serverUrl}quiz/edit-question/${quizId}/${questionId}`,formdata)
  }
  deleteQuestion(question,quizId){
    return this.http.patch(`${this.serverUrl}quiz/delete-question/${quizId}`,question)
  }

  submitStudentResponse(finalResponse){
    return this.http.post(`${this.serverUrl}response/submit-student-response`,finalResponse)
  }

  getLoggedUser(user: any) {
    return this.http.post(`${this.serverUrl}auth/getLoggedUser`, user);
  }

  getOrganizationQuizzes(organizationId: any) {
  
    return this.http.post(`${this.serverUrl}quiz/getQuizzes`, organizationId)
  }

  assignQuizs(userModel: any) {
    return this.http.post(`${this.serverUrl}auth/assign-quizs`, userModel);
  }
  getOrganizationUsers(userModel: any) {
    return this.http.post(`${this.serverUrl}auth/get-organization-users`, userModel).pipe(
      tap((data:any)=>this.organizationUsers$.next(data))
    );
  }

  getConfigurationDetails(quizId){
      return this.http.get(`${this.serverUrl}quiz/get-configuration-details/${quizId}`)
  }
  
  getUserDetails(userId:any){
    return this.http.get(`${this.serverUrl}auth/get-user-details/${userId}`).pipe(
      shareReplay()
    )
  }
  editUserDetails(userModel:any){
    return this.http.patch(`${this.serverUrl}auth/edit-user-details`,userModel)
  }
  getRoles(){
    return this.http.get(`${this.serverUrl}role/get-roles`)
  }

  getUserResults(userId){
    return this.http.get(`${this.serverUrl}result/get-user-results/${userId}`)
  }
  resetPasswordUser(_id,password){
    const resetPassword={password:password}
    return this.http.put(`${this.serverUrl}auth/reset-user-passsword/${_id}`,resetPassword)
  }

  getUserQuizResult(userId,quizId){
    const userDetails={userId:userId,quizId:quizId}
    return this.http.post(`${this.serverUrl}result/get-user-quiz-result`,userDetails)
  }

  getUserList(quizId:any)
  {
    return this.http.post(`${this.serverUrl}auth/get-users-list`,quizId)
  }
  getQuizPublishDate(quizId:any)
  {
    return this.http.post(`${this.serverUrl}quiz/get-quiz-publish-date`,quizId)

  }
}
