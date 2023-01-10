import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import * as moment from "moment";
import { shareReplay, tap } from "rxjs/operators";
import { BehaviorSubject, pipe } from "rxjs";
@Injectable({
  providedIn: "root",
})
export class AuthService {
  user: any = {};
  serverUrl = environment.serverURL;
  loggedUserDetail: any = {};
  enableProfile = "true";
  public userDetails = new BehaviorSubject<any>({});

  constructor(private http: HttpClient) {}

  register(userModel: any) {
    if(!userModel.role)
    userModel.role='admin'
    return this.http.post(`${this.serverUrl}auth/sign-up`, userModel);
  }

  login(authModel: any) {
    return this.http.post(`${this.serverUrl}auth/login`, authModel).pipe(
      tap((res) => this.setSession(res)),
      shareReplay()
    );
  }

  private setSession(authResult) {
    this.loggedUserDetail = authResult;
    localStorage.setItem("enableProfile", this.enableProfile);
    localStorage.setItem("userRole", this.loggedUserDetail.user.role);
    localStorage.setItem("firstName", this.loggedUserDetail.user.firstName);
    localStorage.setItem("lastName", this.loggedUserDetail.user.lastName);

    this.userDetails.next(this.loggedUserDetail);
    const expiresAt = moment().add(authResult.expiresIn, "minutes");
    localStorage.setItem("accessToken", authResult.accessToken);
    localStorage.setItem("expires_at", authResult.expiresIn);
  }

  logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("expires_at");
    localStorage.removeItem("userRole");
    localStorage.removeItem("enableProfile");
    localStorage.removeItem("userId");
    // this.loggedUserDetail.enableProfile= false;
    this.userDetails.next(this.loggedUserDetail);
  }
  public isLoggedIn() {
    // return moment().isBefore(this.getExpiration());
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) return true;
    else return false;
  }
  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  getLoggedUser(userId: any) {
    return this.http.post(`${this.serverUrl}auth/getLoggedUser`, userId);
  }

  update(user: any) {
    return this.http.put(`${this.serverUrl}auth/update`, user);
  }

  getOrganizations() {
    return this.http.get(`${this.serverUrl}auth/get-organizations`).pipe(
      shareReplay()
    )
  }

  ouathLogin(){
    return this.http.get(`${this.serverUrl}auth/oauth/login`)
  }

  getToken(code,state){
    return this.http.get(`${this.serverUrl}auth/oauth/get-token`,{params: {code: code, state: state}}).pipe(
      tap((data)=>{this.setToken(data)})
    )

  }

  setToken(data){
    const accessToken = data?.data?.accessToken
    const gToken= data?.data?.gToken
    localStorage.setItem('gToken',gToken)
    localStorage.setItem('accessToken',accessToken)
    const {user_id:userId,org_id:organizationId} = JSON.parse(atob(accessToken.split('.')[1]))
    localStorage.setItem('userId',userId)
    localStorage.setItem('organizationId',organizationId)

  }
  getGsfUrl(){
    return this.http.get(`${this.serverUrl}auth/get-gsf-url`)
  }
}
