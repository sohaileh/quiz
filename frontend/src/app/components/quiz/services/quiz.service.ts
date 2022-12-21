import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
// import { BehaviorSubject, Observable, of, pipe } from "rxjs";
import {tap } from "rxjs/operators";
import { BehaviorSubject, pipe,Observable, of} from "rxjs";
 

@Injectable({
  providedIn: "root",
})
export class QuizService {
  serverUrl = environment.serverURL;
  quizInfo: any = {};
  mediaInfo: any = {};
  quizTime: number = 0;
  user: any = {};
  userTeamDetails: any = {};
  userInfo: any = {};
  certificateDetails: any = {};
  organization: any = {};
  teamsEntered = new BehaviorSubject(null)
  public newQuiz$= new BehaviorSubject<any>({})





  constructor(private http: HttpClient) {}

  setQuizTime(quizTime: number) {
    this.quizTime = quizTime;
  }

  getQuestion(questionNo:any,quizId: any) {
    this.quizInfo.questionNo = questionNo;
    this.quizInfo.quizId = quizId;
    this.quizInfo.userId = localStorage.getItem("userId");
    //  console.log('quizInfo',this.quizInfo)
    return this.http.post(`${this.serverUrl}quiz/attempt-quiz`, this.quizInfo);
  }

  submitResponse(responses: any) {
    console.log("responses--service", responses);

    return this.http.post(`${this.serverUrl}response/submit`, responses);
  }

  getQuizTime(quizData: any) {
    return this.http.post(`${this.serverUrl}quiz/get-quiz-time`, quizData);
  }

  confirm(message?: string): Observable<boolean> {
    const confirmation = window.confirm(
      message || "Are you sure? Your changes will be lost."
    );
    if (confirmation) {
      sessionStorage.removeItem("allow-quiz");
      sessionStorage.removeItem("isSubmitted");
      return of(confirmation);
    } else {
      return of(confirmation);
    }
  }

  getUserQuizDetails() {
    this.user.userId = localStorage.getItem("userId");
    return this.http.post(
      `${this.serverUrl}result/get-user-results`,
      this.user
    );
  }

  getResult(userId: any, quizId: any) {
    this.userInfo.userId = userId;
    this.userInfo.quizId = quizId;

    console.log("userInfo", this.userInfo);

    return this.http.post(
      `${this.serverUrl}result/get-user-result`,
      this.userInfo
    );
  }

  generateCertificate(userId, quizId) {
    this.certificateDetails.userId = userId;
    this.certificateDetails.quizId = quizId;

    return this.http.post(
      `${this.serverUrl}quiz/generate-certificate`,
      this.certificateDetails
    );
  }

  getOrganizationUsers(organizationDetails:any) {
    // this.organization.organizerId = organizerId;
    return this.http.post(
      `${this.serverUrl}quiz/get-organization-users`,
      organizationDetails
    );
  }

  registerTeams(teams) {
    return this.http.post(
      `${this.serverUrl}organize/add-teams-for-quiz`,
      teams
    );
  }

  getUserTeamQuizDetails(userId) {
    this.userTeamDetails.userId = userId;
    return this.http.post(
      `${this.serverUrl}organize/get-user-team-quiz-details`,
      this.userTeamDetails
    );
  }

  generatePassword(organizedQuizDetails) {
    return this.http.post(
      `${this.serverUrl}organize/generate-password`,
      organizedQuizDetails
    );
  }

  confirmTeamPassword(teamDetails) {
    return this.http.post(
      `${this.serverUrl}organize/confirm-team-password`,
      teamDetails
    );
  }


  getTotalTeamsInQuiz(teamQuizDetail){
    return this.http.post(`${this.serverUrl}organize/get-total-teams-in-quiz`,teamQuizDetail)
  }

  enteredQuiz(entererdQuiz){
    return this.http.post(`${this.serverUrl}quiz/enter-quiz`,entererdQuiz)
  }

  teamToPlayQuiz(teamtoplayquiz)
  {
    return this.http.post(`${this.serverUrl}organize/team-To-Play-Quiz`,teamtoplayquiz)
  }


  getQuestionForTeams (questionNo:any,quizId: any) {
    this.quizInfo.questionNo = questionNo;
    this.quizInfo.quizId = quizId;
    this.quizInfo.userId = localStorage.getItem("userId");
    //  console.log('quizInfo',this.quizInfo)
    return this.http.post(`${this.serverUrl}quiz/get-question-for-teams`, this.quizInfo);
  }


  createQuizTitle(quizTitle:any)
  {
    return this.http.post(`${this.serverUrl}quiz/quiz-title`,quizTitle).pipe(
      tap((res) => 
      this.newQuiz$.next(res)
      

      ),
    )
  }

  renameQuizTitle(newquizTitle:any)
  {
    return this.http.post(`${this.serverUrl}quiz/rename-quiz-title`,newquizTitle).pipe(
      tap((res)=>this.newQuiz$.next(res))
    )

  }
  isQuizAssigned(quizModel:any){
      return this.http.post(`${this.serverUrl}quiz/is-quiz-assigned`,quizModel)
  }
  configure(quizModel: any) {

    console.log(quizModel);

    return this.http

      .patch(`${this.serverUrl}quiz/configure-general`, quizModel)

      // .pipe(tap((res) => this.newQuiz$.next(res)));

  }
  sendEmailInvitation(payload:any){
    console.log(payload)
    return this.http.post(`${this.serverUrl}quiz/sendEmailInvitation`,payload)
  }
}
